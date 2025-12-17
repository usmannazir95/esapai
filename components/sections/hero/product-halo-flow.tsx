"use client";

import React, { useMemo } from 'react';
import ReactFlow, {
  type Edge,
  type EdgeProps,
  Handle,
  type Node,
  type NodeProps,
  Position,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  BaseEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Server, Database, Shield, Zap, Cpu, Globe, Activity, Lock, Layers } from 'lucide-react';
import {
  DEFAULT_ICON_PROPS,
  PATH_CONSTANTS,
  LAYOUT_CONSTANTS,
  EDGE_ANIMATION,
  seededRandom,
  getNodeOffset,
  extractConnectionIndex,
  generateZigZagPath,
  calculateHandlePositions,
  calculateNodePosition
} from './product-halo-flow-utils';

// ============================================================================
// TYPES
// ============================================================================

export interface ProductHaloFlowNode {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ProductHaloFlowProps {
  leftNodes?: ProductHaloFlowNode[];
  rightNodes?: ProductHaloFlowNode[];
  centerNode?: {
    id?: string;
    title?: string;
    icon?: React.ReactNode;
  };
  haloScale?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_LEFT_NODES: ProductHaloFlowNode[] = [
  { id: 'l1', title: 'Real-time Processing', icon: <Activity {...DEFAULT_ICON_PROPS} /> },
  { id: 'l2', title: 'Cloud Infrastructure', icon: <Server {...DEFAULT_ICON_PROPS} /> },
  { id: 'l3', title: 'Data Security', icon: <Shield {...DEFAULT_ICON_PROPS} /> },
  { id: 'l4', title: 'Global Network', icon: <Globe {...DEFAULT_ICON_PROPS} /> },
];

const DEFAULT_RIGHT_NODES: ProductHaloFlowNode[] = [
  { id: 'r1', title: 'High Performance', icon: <Zap {...DEFAULT_ICON_PROPS} /> },
  { id: 'r2', title: 'Smart Processing', icon: <Cpu {...DEFAULT_ICON_PROPS} /> },
  { id: 'r3', title: 'Encrypted Storage', icon: <Lock {...DEFAULT_ICON_PROPS} /> },
  { id: 'r4', title: 'Database Management', icon: <Database {...DEFAULT_ICON_PROPS} /> },
];

const DEFAULT_CENTER = {
  id: 'center',
  title: 'ESAP AI Platform',
  icon: <Layers size={32} className="text-[#13F584]" />,
};


// ============================================================================
// EDGE COMPONENT
// ============================================================================

const GlowEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
}) => {
  const filterId = `glow-filter-${id}`;
  
  // Generate path
  const edgePath = useMemo(() => {
    const connectionIndex = extractConnectionIndex(id);
    // Use connectionIndex as seed for variation to ensure symmetry between left and right
    // e.g. "edge-center-l1" and "edge-center-r1" will both use index 0
    const variation = seededRandom(`edge-variation-${connectionIndex}`, 0, 1);
    return generateZigZagPath(sourceX, sourceY, targetX, targetY, variation, connectionIndex);
  }, [id, sourceX, sourceY, targetX, targetY]);

  // Animation configuration
  const config = useMemo(() => {
    const gap = Math.floor(seededRandom(id, EDGE_ANIMATION.GAP_MIN, EDGE_ANIMATION.GAP_MAX));
    const dashArrayString = `${EDGE_ANIMATION.BAR_SIZE} ${gap}`;
    const totalLen = EDGE_ANIMATION.BAR_SIZE + gap;
    const durationVal = seededRandom(id + '-dur', EDGE_ANIMATION.DURATION_MIN, EDGE_ANIMATION.DURATION_MAX);
    const delayVal = seededRandom(id + '-delay', 0, EDGE_ANIMATION.DELAY_MAX);
    const pulseVal = seededRandom(id + '-pulse', EDGE_ANIMATION.PULSE_MIN, EDGE_ANIMATION.PULSE_MAX);
    
    return {
      dashArray: dashArrayString,
      totalLength: totalLen,
      duration: `${durationVal}s`,
      delay: `-${delayVal}s`,
      width: EDGE_ANIMATION.WIDTH,
      pulseDuration: `${pulseVal}s`,
    };
  }, [id]);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: `rgba(19, 245, 132, ${EDGE_ANIMATION.BASE_OPACITY})`,
          strokeWidth: 2,
          fill: 'none',
          ...style,
        }}
      />

      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="#13F584"
        strokeWidth={config.width}
        strokeOpacity={EDGE_ANIMATION.GLOW_OPACITY}
        strokeDasharray={config.dashArray}
        filter={`url(#${filterId})`}
        style={{ pointerEvents: 'none' }}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to={-config.totalLength}
          dur={config.duration}
          begin={config.delay}
          repeatCount="indefinite"
          calcMode="linear"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.8;1;0.8;0.6;1;0.9"
          dur={config.pulseDuration}
          repeatCount="indefinite"
        />
      </path>
    </>
  );
};

// ============================================================================
// NODE COMPONENTS
// ============================================================================

const NODE_BASE_STYLE = "product-card rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 group relative bg-black/40 backdrop-blur-md border border-white/10";
const NODE_HOVER_STYLE = "hover:shadow-[0_0_30px_-5px_rgba(19,245,132,0.3)] hover:border-[#13F584]/50 hover:scale-105";

const LeftNode: React.FC<NodeProps<ProductHaloFlowNode>> = ({ data }) => {
  return (
    <div className={`${NODE_BASE_STYLE} ${NODE_HOVER_STYLE}`} title={data.title}>
      <Handle
        type="target"
        position={Position.Right}
        className="w-3 h-3 bg-[#13F584] border-2 border-[#13F584] opacity-0! group-hover:opacity-100! transition-opacity"
        style={{ right: 0 }}
      />
      <div className="flex items-center justify-center">
        <div className="text-[#13F584] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(19,245,132,0.3)]">
          {data.icon || <div className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

const RightNode: React.FC<NodeProps<ProductHaloFlowNode>> = ({ data }) => {
  return (
    <div className={`${NODE_BASE_STYLE} ${NODE_HOVER_STYLE}`} title={data.title}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-[#13F584] border-2 border-[#13F584] opacity-0! group-hover:opacity-100! transition-opacity"
        style={{ left: 0 }}
      />
      <div className="flex items-center justify-center">
        <div className="text-[#13F584] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(19,245,132,0.3)]">
          {data.icon || <div className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

const CenterNode: React.FC<NodeProps<{ title: string; icon?: React.ReactNode; handlePositions?: Array<{ id: string; angle: number }>; haloScale?: number }>> = ({ data }) => {
  const scale = data.haloScale || LAYOUT_CONSTANTS.CENTER_NODE_SCALE;
  const scaledHaloSize = LAYOUT_CONSTANTS.CENTER_NODE_BASE_SIZE * scale;
  const scaledOuterRadius = LAYOUT_CONSTANTS.CENTER_NODE_OUTER_RADIUS * scale;
  const nodeHalfSize = scaledHaloSize / 2;
  const handles = data.handlePositions || [];
  
  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: `${scaledHaloSize}px`, height: `${scaledHaloSize}px` }} 
      title={data.title}
    >
      {handles.map((handle) => {
        const angleRad = (handle.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * scaledOuterRadius;
        const y = Math.sin(angleRad) * scaledOuterRadius;
        const left = nodeHalfSize + x;
        const top = nodeHalfSize + y;
        
        return (
          <Handle
            key={handle.id}
            id={handle.id}
            type="source"
            position={Position.Top}
            className="opacity-0!"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
            }}
          />
        );
      })}
      <div className="relative z-10 flex items-center justify-center">
        {data.icon}
      </div>
    </div>
  );
};

// ============================================================================
// LAYOUT CALCULATION
// ============================================================================

/**
  };
};

/**
 * Creates all nodes and edges for the flow
 */
const createFlowElements = (
  leftNodes: ProductHaloFlowNode[],
  rightNodes: ProductHaloFlowNode[],
  centerNode: { id?: string; title?: string; icon?: React.ReactNode },
  haloScale: number = LAYOUT_CONSTANTS.CENTER_NODE_SCALE
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  const { CENTER_X, CENTER_Y, RADIUS, Y_SPACING } = LAYOUT_CONSTANTS;
  
  // Calculate handle positions
  const handlePositions = calculateHandlePositions(
    leftNodes,
    rightNodes,
    CENTER_X,
    CENTER_Y,
    RADIUS,
    Y_SPACING
  );
  
  // Center node
  const centerNodeSize = LAYOUT_CONSTANTS.CENTER_NODE_BASE_SIZE * haloScale;
  const centerNodeHalfSize = centerNodeSize / 2;
  nodes.push({
    id: centerNode.id || 'center',
    type: 'centerNode',
    position: { x: CENTER_X - centerNodeHalfSize, y: CENTER_Y - centerNodeHalfSize },
    data: {
      title: centerNode.title,
      icon: centerNode.icon,
      handlePositions: handlePositions,
      haloScale: haloScale,
    },
    draggable: false,
  });
  
  // Left nodes
  leftNodes.forEach((item, index) => {
    const position = calculateNodePosition(
      CENTER_X,
      CENTER_Y,
      RADIUS,
      index,
      Y_SPACING,
      item.id,
      true
    );
    
    nodes.push({
      id: item.id,
      type: 'leftNode',
      position,
      data: item,
      draggable: false,
    });
    
    edges.push({
      id: `edge-center-${item.id}`,
      source: centerNode.id || 'center',
      sourceHandle: `handle-left-${item.id}`,
      target: item.id,
      type: 'glowEdge',
      animated: false,
    });
  });
  
  // Right nodes
  rightNodes.forEach((item, index) => {
    const position = calculateNodePosition(
      CENTER_X,
      CENTER_Y,
      RADIUS,
      index,
      Y_SPACING,
      item.id,
      false
    );
    
    nodes.push({
      id: item.id,
      type: 'rightNode',
      position,
      data: item,
      draggable: false,
    });
    
    edges.push({
      id: `edge-center-${item.id}`,
      source: centerNode.id || 'center',
      sourceHandle: `handle-right-${item.id}`,
      target: item.id,
      type: 'glowEdge',
      animated: false,
    });
  });
  
  return { nodes, edges };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ProductHaloFlow: React.FC<ProductHaloFlowProps> = ({
  leftNodes = DEFAULT_LEFT_NODES,
  rightNodes = DEFAULT_RIGHT_NODES,
  centerNode = DEFAULT_CENTER,
  haloScale = LAYOUT_CONSTANTS.CENTER_NODE_SCALE,
}) => {
  const nodeTypes = useMemo(() => ({
    leftNode: LeftNode,
    rightNode: RightNode,
    centerNode: CenterNode,
  }), []);

  const edgeTypes = useMemo(() => ({
    glowEdge: GlowEdge,
  }), []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    return createFlowElements(leftNodes, rightNodes, centerNode, haloScale);
  }, [leftNodes, rightNodes, centerNode, haloScale]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="product-halo-flow w-full h-full relative">
      <style dangerouslySetInnerHTML={{__html: `
        .product-halo-flow .react-flow__attribution { display: none; }
        .product-halo-flow .react-flow__pane { cursor: default; }
        .product-halo-flow .react-flow__viewport { pointer-events: none; }
        .product-halo-flow .react-flow__node { pointer-events: auto; }
        .product-halo-flow .react-flow__minimap,
        .product-halo-flow .react-flow__controls {
          display: none !important;
        }
      `}} />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.1, minZoom: 0.5, maxZoom: 1.5 }}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        elementsSelectable={false}
        snapToGrid={true}
        className="bg-transparent"
      />
    </div>
  );
};
