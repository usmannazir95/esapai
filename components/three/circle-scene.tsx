import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, extend } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import { Center } from '@react-three/drei';
import { SVG_DATA_URI } from '@/constants/svg-circle-constant';

// Extend Three.js types if necessary (though SVGLoader is usually handled by useLoader)
extend({ ExtrudeGeometry: THREE.ExtrudeGeometry });

interface SvgShapeProps {
    shape: THREE.Shape;
    color: string;
    index: number;
}

const ExtrudedShape: React.FC<SvgShapeProps> = ({ shape, color, index }) => {
    // Extrusion settings
    const extrudeSettings = useMemo(() => ({
        depth: 20, // Thickness of the 3D model
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelSegments: 5,
        steps: 2,
    }), []);

    // Material props for a nice plastic/metallic look
    const materialProps = {
        color: color,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
    };

    return (
        <mesh
            position={[0, 0, index * 2]} // Slight z-offset to prevent z-fighting between overlapping layers
            castShadow
            receiveShadow
        >
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial {...materialProps} />
        </mesh>
    );
};

export const CircleScene: React.FC = () => {
    // Load and parse the SVG Data URI
    const svgData = useLoader(SVGLoader, SVG_DATA_URI);

    const shapes = useMemo(() => {
        return svgData.paths.flatMap((path, pathIndex) => {
            // SVGLoader's createShapes creates shapes including holes logic
            const pathShapes = SVGLoader.createShapes(path);

            // Determine color from SVG fill or default to the detailed green/white
            // Note: SVGLoader parses colors as hex or style strings.
            let fillColor = path.userData?.style.fill;

            if (fillColor === undefined || fillColor === 'none') {
                // Default fallback - use the green color from the SVG
                fillColor = "#00A551";
            }

            // We normalize colors for Three.js
            return pathShapes.map((shape, shapeIndex) => ({
                shape,
                color: fillColor,
                key: `${pathIndex}-${shapeIndex}`
            }));
        });
    }, [svgData]);

    return (
        <Center>
            {/* 
        SVG coordinates start top-left (Y goes down). 
        Three.js starts center/bottom-left (Y goes up).
        We scale Y by -1 to flip it correctly.
        We scale down by 0.01 to make it manageable in the scene units.
      */}
            <group scale={[0.01, -0.01, 0.01]}>
                {shapes.map((item, i) => (
                    <ExtrudedShape
                        key={item.key}
                        shape={item.shape}
                        color={item.color as string}
                        index={i}
                    />
                ))}
            </group>
        </Center>
    );
};
