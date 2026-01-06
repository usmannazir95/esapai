"use client";

import React, { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { Center } from '@react-three/drei';
import { SVG_DATA_URI } from '@/constants/svg-logo-data';

interface ExtrudedShapeProps {
    shape: THREE.Shape;
    color: string;
    index: number;
    depth?: number;
}

const ExtrudedShape: React.FC<ExtrudedShapeProps> = ({
    shape,
    color,
    index,
    depth = 20
}) => {
    const extrudeSettings = useMemo(() => ({
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelSegments: 5,
        steps: 2,
    }), [depth]);

    const materialProps = {
        color: color,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
    };

    return (
        <mesh
            position={[0, 0, index * 2]}
            castShadow
            receiveShadow
        >
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial {...materialProps} />
        </mesh>
    );
};

interface Logo3DSceneProps {
    depth?: number;
}

const Logo3DScene: React.FC<Logo3DSceneProps> = ({ depth = 20 }) => {
    const svgData = useLoader(SVGLoader, SVG_DATA_URI);

    const shapes = useMemo(() => {
        return svgData.paths.flatMap((path, pathIndex) => {
            const pathShapes = SVGLoader.createShapes(path);

            let fillColor = path.userData?.style.fill;

            if (fillColor === undefined || fillColor === 'none') {
                fillColor = "#00A551";
            }

            return pathShapes.map((shape, shapeIndex) => ({
                shape,
                color: fillColor,
                key: `${pathIndex}-${shapeIndex}`
            }));
        });
    }, [svgData]);

    return (
        <Center>
            <group scale={[1, -1, 1]}>
                {shapes.map((item, i) => (
                    <ExtrudedShape
                        key={item.key}
                        shape={item.shape}
                        color={item.color as string}
                        index={i}
                        depth={depth}
                    />
                ))}
            </group>
        </Center>
    );
};

export interface Logo3DProps {
    /** Scale of the logo (default: 1) */
    scale?: number;
    /** Depth/thickness of extrusion (default: 20) */
    depth?: number;
    /** Float animation speed (default: 2) */
    floatSpeed?: number;
    /** Float animation intensity (default: 0.5) */
    floatIntensity?: number;
    /** Rotation animation intensity (default: 0.2) */
    rotationIntensity?: number;
    /** Whether to auto-rotate (default: true) */
    autoRotate?: boolean;
}

const FloatingGroup: React.FC<{
    children: React.ReactNode;
    floatSpeed: number;
    floatIntensity: number;
    rotationIntensity: number;
    autoRotate: boolean;
}> = ({ children, floatSpeed, floatIntensity, rotationIntensity, autoRotate }) => {
    const groupRef = React.useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Floating motion (scale-independent)
        groupRef.current.position.y = Math.sin(t * floatSpeed) * floatIntensity;

        // Subtle rotation
        if (autoRotate) {
            groupRef.current.rotation.y = Math.sin(t * 0.5) * rotationIntensity;
            groupRef.current.rotation.x = Math.sin(t * 0.3) * rotationIntensity * 0.5;
        }
    });

    return <group ref={groupRef}>{children}</group>;
};

export const Logo3D: React.FC<Logo3DProps> = ({
    scale = 1,
    depth = 20,
    floatSpeed = 2,
    floatIntensity = 0.5,
    rotationIntensity = 0.2,
    autoRotate = true,
}) => {
    return (
        <group scale={[scale, scale, scale]}>
            <FloatingGroup
                floatSpeed={floatSpeed}
                floatIntensity={floatIntensity}
                rotationIntensity={rotationIntensity}
                autoRotate={autoRotate}
            >
                <Suspense fallback={null}>
                    <Logo3DScene depth={depth} />
                </Suspense>
            </FloatingGroup>
        </group>
    );
};

export default Logo3D;
