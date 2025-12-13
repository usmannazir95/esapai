import { ProductHaloFlowNode } from './product-halo-flow';

// ============================================================================
// CONSTANTS
// ============================================================================

export const DEFAULT_ICON_PROPS = { size: 14, className: "text-[#13F584]" };

export const PATH_CONSTANTS = {
    INITIAL_STRAIGHT_RATIO: 0.08,
    DIAGONAL_LENGTH_RATIOS: {
        FIRST: 0.3,    // Longest segment (1st line)
        SECOND: 0.3,    // Medium segment (2nd line)
    },
    ANGLE_BASE: -35,
    ANGLE_INCREMENT: 0,
    SECOND_LINE_EXTENSION_RATIO: 0.5,
    FOURTH_LINE_STRAIGHT_RATIO: 0.4,
    FOURTH_LINE_ZIGZAG_RATIO: 0.35,
} as const;

export const LAYOUT_CONSTANTS = {
    CENTER_X: 600,
    CENTER_Y: 400,
    RADIUS: 250,
    Y_SPACING: 100,
    NODE_SIZE: 48,
    NODE_HALF_SIZE: 24,
    CENTER_NODE_SCALE: 0.6,
    CENTER_NODE_BASE_SIZE: 300,
    CENTER_NODE_OUTER_RADIUS: 140,
    NODE_OFFSET_MAX: 35,
    RADII: [300, 350, 350, 300], // Index 0, 1, 2 (mirrored 1), 3 (mirrored 0)
} as const;

export const EDGE_ANIMATION = {
    BAR_SIZE: 25,
    GAP_MIN: 60,
    GAP_MAX: 160,
    DURATION_MIN: 1.5,
    DURATION_MAX: 3.0,
    DELAY_MAX: 5,
    PULSE_MIN: 2,
    PULSE_MAX: 5,
    WIDTH: 2.5,
    BASE_OPACITY: 0.1,
    GLOW_OPACITY: 0.9,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generates a deterministic random number from a seed string
 */
export const seededRandom = (seed: string, min: number, max: number): number => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash = hash & hash;
    }
    const normalized = Math.abs(hash) / 2147483647;
    return min + normalized * (max - min);
};

/**
 * Generates deterministic offset based on node ID or index
 * For symmetry, we should use the index or a shared identifier for left/right pairs
 */
export const getNodeOffset = (seed: string, maxOffset: number = 30): { x: number; y: number } => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash = hash & hash;
    }
    const normalizedX = (Math.abs(hash) % 1000) / 1000;
    const normalizedY = (Math.abs(hash * 7) % 1000) / 1000;
    return {
        x: (normalizedX - 0.5) * maxOffset,
        y: (normalizedY - 0.5) * maxOffset,
    };
};

/**
 * Extracts connection index from edge ID (e.g., "edge-center-l1" -> 0)
 */
export const extractConnectionIndex = (edgeId: string): number => {
    const match = edgeId.match(/([lr])(\d)/);
    return match ? parseInt(match[2], 10) - 1 : 0;
};

/**
 * Flips an SVG path string horizontally around a center X coordinate
 */
export const flipPath = (path: string, centerX: number): string => {
    return path.replace(/([ML])\s*(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (match, command, x, y) => {
        const xNum = parseFloat(x);
        const newX = centerX - (xNum - centerX);
        return `${command} ${newX},${y}`;
    });
};

// ============================================================================
// PATH GENERATION
// ============================================================================

/**
 * Generates the initial straight segment (Always Right Side)
 */
export const generateInitialStraightSegment = (
    currentX: number,
    currentY: number
): { x: number; y: number; path: string } => {
    // Use fixed RADIUS for deterministic length
    const straightLength = LAYOUT_CONSTANTS.RADIUS * PATH_CONSTANTS.INITIAL_STRAIGHT_RATIO;
    const straightX = currentX + straightLength;
    return {
        x: straightX,
        y: currentY,
        path: ` L ${straightX},${currentY}`,
    };
};

/**
 * Calculates the upward angle (Always Right Side)
 */
export const calculateUpwardAngle = (connectionIndex: number): number => {
    return PATH_CONSTANTS.ANGLE_BASE + (connectionIndex * PATH_CONSTANTS.ANGLE_INCREMENT);
};

/**
 * Helper to map connection index (0..3) to the Y-spacing multiplier (-1.5..1.5)
 */
export const indexToYOffsetIndex = (index: number): number => {
    return index - 1.5;
};

/**
 * Generates the upward diagonal segment (Always Right Side)
 */
export const generateDiagonalSegment = (
    currentX: number,
    currentY: number,
    connectionIndex: number,
    targetY?: number // Optional target Y for dynamic calculation (index 1 and mirrored index 2)
): { x: number; y: number; path: string } => {
    // Determine if we should use dynamic calculation (only for index 1 and 2 - mirrored of 1)
    const isDynamic = (connectionIndex === 1 || connectionIndex === 2) && targetY !== undefined;

    if (isDynamic && targetY !== undefined) {
        // Use fixed diagonal length but adjust to reach near targetY
        const effectiveIndex = 1; // Both use index 1's base angle
        const baseAngleVal = Math.abs(PATH_CONSTANTS.ANGLE_BASE + (effectiveIndex * PATH_CONSTANTS.ANGLE_INCREMENT));

        // For Index 1: Upward (negative angle)
        // For Index 2 (mirrored): Downward (positive angle)
        const angleSign = connectionIndex === 1 ? -1 : 1;
        const angleDeg = baseAngleVal * angleSign;
        const angleRad = (angleDeg * Math.PI) / 180;

        // Use the same fixed diagonal length as before
        const diagLengthRatio = PATH_CONSTANTS.DIAGONAL_LENGTH_RATIOS.SECOND;
        const standardDx = LAYOUT_CONSTANTS.RADIUS;
        const yOffsetIndex = indexToYOffsetIndex(1);
        const standardDy = Math.abs(yOffsetIndex * LAYOUT_CONSTANTS.Y_SPACING);
        const standardDistance = Math.sqrt(standardDx * standardDx + standardDy * standardDy);
        const diagLength = standardDistance * diagLengthRatio;

        // Calculate end point using fixed length and angle
        const diagX = currentX + Math.cos(angleRad) * diagLength;
        const diagY = currentY + Math.sin(angleRad) * diagLength;

        return {
            x: diagX,
            y: diagY,
            path: ` L ${diagX},${diagY}`,
        };
    }

    // Standard static calculation (for Index 0 and 3 - mirrored of 0)
    const baseAngle = PATH_CONSTANTS.ANGLE_BASE + (connectionIndex === 3 ? 0 : connectionIndex * PATH_CONSTANTS.ANGLE_INCREMENT);
    const diagLengthRatio =
        (connectionIndex === 0 || connectionIndex === 3) ? PATH_CONSTANTS.DIAGONAL_LENGTH_RATIOS.FIRST :
            PATH_CONSTANTS.DIAGONAL_LENGTH_RATIOS.SECOND;

    const standardDx = LAYOUT_CONSTANTS.RADIUS;
    const yOffsetIndex = indexToYOffsetIndex(connectionIndex === 3 ? 0 : connectionIndex);
    const standardDy = Math.abs(yOffsetIndex * LAYOUT_CONSTANTS.Y_SPACING);

    const standardDistance = Math.sqrt(standardDx * standardDx + standardDy * standardDy);
    const diagLength = standardDistance * diagLengthRatio;

    // For index 3 (mirrored 0), flip the angle vertically
    const angleMultiplier = connectionIndex === 3 ? -1 : 1;
    const finalAngle = calculateUpwardAngle(connectionIndex === 3 ? 0 : connectionIndex) * angleMultiplier;
    const angleRad = (finalAngle * Math.PI) / 180;

    const diagX = currentX + Math.cos(angleRad) * diagLength;
    const diagY = currentY + Math.sin(angleRad) * diagLength;

    return {
        x: diagX,
        y: diagY,
        path: ` L ${diagX},${diagY}`,
    };
};

/**
 * Generates path for 2nd connection (index 1) - horizontal line to target
 * Diagonal has fixed length, so we need horizontal then vertical adjustment if needed
 */
export const generateSecondConnectionPath = (
    currentX: number,
    currentY: number,
    targetX: number,
    targetY: number
): string => {
    // Go horizontal to targetX, then vertical to targetY if needed
    return ` L ${targetX},${currentY} L ${targetX},${targetY}`;
};

/**
 * Generates path for 3rd connection (index 2) - horizontal line to target
 * Mirror of 2nd connection
 */
export const generateThirdConnectionPath = (
    currentX: number,
    currentY: number,
    targetX: number,
    targetY: number
): string => {
    // Go horizontal to targetX, then vertical to targetY if needed
    return ` L ${targetX},${currentY} L ${targetX},${targetY}`;
};

/**
 * Generates path for 1st connection (index 0) - Horizontal -> Angle -> Small Horizontal
 * (Always Right Side)
 */
export const generateFirstConnectionPath = (
    currentX: number,
    currentY: number,
    targetX: number,
    targetY: number
): string => {
    // Length of the final small horizontal line connecting to the icon
    const finalSmallLineLength = 30;

    // Calculate the X position for the start of the final small line
    // Right side: x2 is to the left of targetX
    const x2 = targetX - finalSmallLineLength;

    // Calculate x1 based on ratio of distance between currentX and x2
    // This ensures the line always goes forward (x1 is between currentX and x2)
    const distToCover = x2 - currentX;
    const h1Length = distToCover * 0.85;
    const x1 = currentX + h1Length;

    // Path construction:
    // 1. Horizontal to x1 (at currentY)
    // 2. Angle to x2 (at targetY)
    // 3. Horizontal to targetX (at targetY)

    return ` L ${x1},${currentY} L ${x2},${targetY} L ${targetX},${targetY}`;
};

/**
 * Generates path for 4th connection (index 3) - mirrored version of 1st connection (vertically opposite)
 */
export const generateFourthConnectionPath = (
    currentX: number,
    currentY: number,
    targetX: number,
    targetY: number
): string => {
    // Length of the final small horizontal line connecting to the icon
    const finalSmallLineLength = 30;

    // Calculate the X position for the start of the final small line
    const x2 = targetX - finalSmallLineLength;

    // Calculate x1 based on ratio of distance between sourceX and x2
    const distToCover = x2 - currentX;
    const h1Length = distToCover * 0.85;
    const x1 = currentX + h1Length;

    // Path construction (mirrored from 1st connection):
    // 1. Horizontal to x1 (at sourceY)
    // 2. Angle to x2 (at targetY) - downward instead of upward
    // 3. Horizontal to targetX (at targetY)

    return ` L ${x1},${currentY} L ${x2},${targetY} L ${targetX},${targetY}`;
};

/**
 * Generates path for first three connections (0, 1, 2)
 * Index 2 is now a vertical mirror of index 1
 */
export const generateFirstThreeConnectionsPath = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    connectionIndex: number,
    seg2Ratio: number,
    seg3Ratio: number
): string => {
    let path = `M ${sourceX},${sourceY}`;
    let currentX = sourceX;
    let currentY = sourceY;

    // Initial straight segment
    const initial = generateInitialStraightSegment(currentX, currentY);
    path += initial.path;
    currentX = initial.x;
    currentY = initial.y;

    // Angled diagonal segment
    // Pass targetY for index 1 and 2 (mirrored) to ensure dynamic calculation
    const diagonal = generateDiagonalSegment(
        currentX,
        currentY,
        connectionIndex,
        (connectionIndex === 1 || connectionIndex === 2) ? targetY : undefined
    );
    path += diagonal.path;
    currentX = diagonal.x;
    currentY = diagonal.y;

    // Connection-specific paths
    if (connectionIndex === 1) {
        path += generateSecondConnectionPath(currentX, currentY, targetX, targetY);
    } else if (connectionIndex === 2) {
        path += generateThirdConnectionPath(currentX, currentY, targetX, targetY);
    } else {
        path += generateFirstConnectionPath(currentX, currentY, targetX, targetY);
    }

    return path;
};

/**
 * Calculates segment ratios based on connection index
 */
export const calculateSegmentRatios = (connectionIndex: number, variation: number) => {
    let seg1Ratio: number, seg2Ratio: number, seg3Ratio: number;

    if (connectionIndex === 1 || connectionIndex === 3) {
        seg1Ratio = 0.35 + (variation * 0.25);
        seg2Ratio = 0.3 + ((1 - variation) * 0.25);
        seg3Ratio = 0.2 + (variation * 0.2);
    } else if (connectionIndex === 0) {
        seg1Ratio = 0.25 + (variation * 0.2);
        seg2Ratio = 0.2 + ((1 - variation) * 0.2);
        seg3Ratio = 0.15 + (variation * 0.15);
    } else {
        seg1Ratio = 0.15 + (variation * 0.15);
        seg2Ratio = 0.1 + ((1 - variation) * 0.15);
        seg3Ratio = 0.08 + (variation * 0.12);
    }

    return { seg1Ratio, seg2Ratio, seg3Ratio };
};

/**
 * Generates legacy zigzag path patterns (fallback for edge cases)
 */
export const generateLegacyZigZagPath = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    variation: number,
    connectionIndex: number
): string => {
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _patternType = Math.floor(variation * 4);
    const { seg1Ratio, seg2Ratio } = calculateSegmentRatios(connectionIndex, variation);

    let path = `M ${sourceX},${sourceY}`;
    let currentX = sourceX;
    let currentY = sourceY;

    // Pattern implementations (simplified - these are fallbacks)
    const isHorizontalFirst = Math.abs(dx) > Math.abs(dy);

    if (isHorizontalFirst) {
        const h1X = currentX + dx * seg1Ratio;
        path += ` L ${h1X},${currentY}`;
        currentX = h1X;

        const v1Y = currentY + dy * seg2Ratio;
        path += ` L ${currentX},${v1Y}`;
        currentY = v1Y;

        path += ` L ${targetX},${targetY}`;
    } else {
        const v1Y = currentY + dy * seg1Ratio;
        path += ` L ${currentX},${v1Y}`;
        currentY = v1Y;

        const h1X = currentX + dx * seg2Ratio;
        path += ` L ${h1X},${currentY}`;
        currentX = h1X;

        path += ` L ${targetX},${targetY}`;
    }

    return path;
};

/**
 * Main path generation function - routes to appropriate generator based on connection index
 * Index 0: Original pattern
 * Index 1: Original pattern with horizontal ending
 * Index 2: Vertical mirror of index 1 with horizontal ending
 * Index 3: Vertical mirror of index 0
 */
export const generateZigZagPath = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    variation: number = 0.5,
    connectionIndex: number = 0
): string => {
    const centerX = LAYOUT_CONSTANTS.CENTER_X;
    const isLeft = targetX < centerX;

    // Normalize coordinates to Right Side
    const normSourceX = isLeft ? centerX + (centerX - sourceX) : sourceX;
    const normTargetX = isLeft ? centerX + (centerX - targetX) : targetX;

    let path = "";

    // First connection (0) - special angled pattern
    if (connectionIndex === 0) {
        const { seg2Ratio, seg3Ratio } = calculateSegmentRatios(connectionIndex, variation);
        path = generateFirstThreeConnectionsPath(
            normSourceX,
            sourceY,
            normTargetX,
            targetY,
            connectionIndex,
            seg2Ratio,
            seg3Ratio
        );
    }
    // Second connection (1) - horizontal ending
    else if (connectionIndex === 1) {
        const { seg2Ratio, seg3Ratio } = calculateSegmentRatios(connectionIndex, variation);
        path = generateFirstThreeConnectionsPath(
            normSourceX,
            sourceY,
            normTargetX,
            targetY,
            connectionIndex,
            seg2Ratio,
            seg3Ratio
        );
    }
    // Third connection (2) - vertical mirror of second connection with horizontal ending
    else if (connectionIndex === 2) {
        const { seg2Ratio, seg3Ratio } = calculateSegmentRatios(1, variation);
        path = generateFirstThreeConnectionsPath(
            normSourceX,
            sourceY,
            normTargetX,
            targetY,
            2, // Pass 2 to use mirrored angle calculation
            seg2Ratio,
            seg3Ratio
        );
    }
    // Fourth connection (3) - vertical mirror of first connection (index 0)
    else if (connectionIndex === 3) {
        // Use the mirrored path for index 0
        let mirrorPath = `M ${normSourceX},${sourceY}`;
        let currentX = normSourceX;
        let currentY = sourceY;

        // Initial straight segment
        const initial = generateInitialStraightSegment(currentX, currentY);
        mirrorPath += initial.path;
        currentX = initial.x;
        currentY = initial.y;

        // Angled diagonal segment (using index 3 for mirrored angle)
        const diagonal = generateDiagonalSegment(currentX, currentY, 3);
        mirrorPath += diagonal.path;
        currentX = diagonal.x;
        currentY = diagonal.y;

        // Use the mirrored fourth connection path
        mirrorPath += generateFourthConnectionPath(currentX, currentY, normTargetX, targetY);
        path = mirrorPath;
    }
    // Fallback to legacy patterns
    else {
        path = generateLegacyZigZagPath(normSourceX, sourceY, normTargetX, targetY, variation, connectionIndex);
    }

    // If originally Left, flip the generated path
    if (isLeft) {
        return flipPath(path, centerX);
    }

    return path;
};

// ============================================================================
// LAYOUT CALCULATION
// ============================================================================

/**
 * Calculates handle positions for center node based on node positions
 */
export const calculateHandlePositions = (
    leftNodes: ProductHaloFlowNode[],
    rightNodes: ProductHaloFlowNode[],
    centerX: number,
    centerY: number,
    radius: number,
    ySpacing: number
): Array<{ id: string; angle: number }> => {
    const handlePositions: Array<{ id: string; angle: number }> = [];

    // Left nodes
    leftNodes.forEach((item, index) => {
        // Standard uniform positioning
        const effectiveIndex = index - 1.5;
        const yOffset = effectiveIndex * ySpacing;
        // Use index-based seed for symmetry
        const offset = getNodeOffset(`node-offset-${index}`, LAYOUT_CONSTANTS.NODE_OFFSET_MAX);

        // Use variable radius based on index
        const radius = LAYOUT_CONSTANTS.RADII[index] || LAYOUT_CONSTANTS.RADIUS;

        const nodeX = centerX - radius + offset.x;
        const nodeY = centerY + yOffset + offset.y;
        const dx = nodeX - centerX;
        const dy = nodeY - centerY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        handlePositions.push({
            id: `handle-left-${item.id}`,
            angle: angle,
        });
    });

    // Right nodes
    rightNodes.forEach((item, index) => {
        // Standard uniform positioning
        const effectiveIndex = index - 1.5;
        const yOffset = effectiveIndex * ySpacing;
        // Use index-based seed for symmetry
        const offset = getNodeOffset(`node-offset-${index}`, LAYOUT_CONSTANTS.NODE_OFFSET_MAX);

        // Use variable radius based on index
        const radius = LAYOUT_CONSTANTS.RADII[index] || LAYOUT_CONSTANTS.RADIUS;

        // Invert X offset for right side to mirror left side
        const nodeX = centerX + radius - offset.x;
        const nodeY = centerY + yOffset + offset.y;
        const dx = nodeX - centerX;
        const dy = nodeY - centerY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        handlePositions.push({
            id: `handle-right-${item.id}`,
            angle: angle,
        });
    });

    return handlePositions;
};

/**
 * Calculates node position with special handling for 2nd and 3rd connections
 */
export const calculateNodePosition = (
    centerX: number,
    centerY: number,
    radius: number,
    index: number,
    ySpacing: number,
    nodeId: string,
    isLeft: boolean
): { x: number; y: number } => {
    // Standard uniform positioning
    const effectiveIndex = index - 1.5;
    const yOffset = effectiveIndex * ySpacing;

    // Use index-based seed for symmetry
    const offset = getNodeOffset(`node-offset-${index}`, LAYOUT_CONSTANTS.NODE_OFFSET_MAX);

    // Use variable radius based on index
    const effectiveRadius = LAYOUT_CONSTANTS.RADII[index] || LAYOUT_CONSTANTS.RADIUS;

    let nodeX: number;
    if (isLeft) {
        const baseX = centerX - effectiveRadius - LAYOUT_CONSTANTS.NODE_HALF_SIZE;
        nodeX = baseX + offset.x;
    } else {
        const baseX = centerX + effectiveRadius - LAYOUT_CONSTANTS.NODE_HALF_SIZE;
        nodeX = baseX - offset.x; // Invert X offset for right side
    }

    const nodeY = centerY + yOffset + offset.y - LAYOUT_CONSTANTS.NODE_HALF_SIZE;

    return { x: nodeX, y: nodeY };
};