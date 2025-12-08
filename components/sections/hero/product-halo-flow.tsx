"use client";

import React, { useMemo } from 'react';
// React Flow component with animated glow bars

import ReactFlow, {
  type Edge,
  type EdgeProps,
  Handle,
  type Node,
  type NodeProps,
  Position,
  useNodesState,
  useEdgesState,
  getBezierPath,
  ConnectionMode,
  BaseEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Server, Database, Shield, Zap, Cpu, Globe, Activity, Lock, Layers } from 'lucide-react';

// --- Types ---

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
}

// --- Icons / Default Data ---

const defaultIconProps = { size: 20, className: "text-[#13F584]" };

const DEFAULT_LEFT_NODES: ProductHaloFlowNode[] = [
  { id: 'l1', title: 'Data Ingestion', description: 'Real-time stream processing', icon: <Database {...defaultIconProps} /> },
  { id: 'l2', title: 'Security', description: 'Enterprise-grade encryption', icon: <Shield {...defaultIconProps} /> },
  { id: 'l3', title: 'Compute', description: 'Distributed processing', icon: <Cpu {...defaultIconProps} /> },
  { id: 'l4', title: 'Network', description: 'Global low-latency edge', icon: <Globe {...defaultIconProps} /> },
];

const DEFAULT_RIGHT_NODES: ProductHaloFlowNode[] = [
  { id: 'r1', title: 'Analytics', description: 'Predictive insights', icon: <Activity {...defaultIconProps} /> },
  { id: 'r2', title: 'Protection', description: 'Threat mitigation', icon: <Lock {...defaultIconProps} /> },
  { id: 'r3', title: 'Integration', description: 'API gateway connection', icon: <Layers {...defaultIconProps} /> },
  { id: 'r4', title: 'Delivery', description: 'Content optimization', icon: <Zap {...defaultIconProps} /> },
];

const DEFAULT_CENTER = {
  id: 'center',
  title: 'Core Engine',
  icon: <Server size={48} className="text-[#13F584]" />,
};

// --- Custom Edge Component ---

const GlowEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Unique ID for the filter to avoid conflicts if multiple flows exist
  const filterId = `glow-filter-${id}`;

  // Deterministic "random" function using edge ID as seed
  const seededRandom = (seed: string, min: number, max: number): number => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    const normalized = Math.abs(hash) / 2147483647; // Normalize to 0-1
    return min + normalized * (max - min);
  };

  // Randomize configuration for Cyberpunk feel, but keep bar sizes CONSTANT
  // Bar size must be smaller than outer circle diameter (280px when scale=1.0)
  const config = useMemo(() => {
    // Smaller bar size - must be less than outer circle diameter (280px)
    const barSize = 25; 
    
    // Deterministic randomization based on edge ID
    const gap = Math.floor(seededRandom(id, 60, 160)); // 60px - 160px gap
    const dashArrayString = `${barSize} ${gap}`;
    const totalLen = barSize + gap;
    
    // Randomize duration for speed variance (some connections are faster)
    const durationVal = seededRandom(id + '-dur', 1.5, 3.0); // 1.5s - 3.0s
    const delayVal = seededRandom(id + '-delay', 0, 5); // 0s - 5s
    const pulseVal = seededRandom(id + '-pulse', 2, 5); // 2s - 5s
    
    return {
      dashArray: dashArrayString,
      totalLength: totalLen,
      duration: `${durationVal}s`,
      // Negative delay allows the animation to start "in progress" at random points
      delay: `-${delayVal}s`, 
      width: 2.5, // Slightly thinner width
      // Randomize opacity pulse duration
      pulseDuration: `${pulseVal}s` 
    };
  }, [id]);

  return (
    <>
      {/* Definitions for Glow Filter */}
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

      {/* Base Path (Static subtle line) */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: 'rgba(19, 245, 132, 0.1)', // Very subtle base
          strokeWidth: 2,
          fill: 'none',
          ...style,
        }}
      />

      {/* Animated Glow Overlay */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="#13F584"
        strokeWidth={config.width}
        strokeOpacity={0.9}
        strokeDasharray={config.dashArray}
        filter={`url(#${filterId})`}
        style={{
          pointerEvents: 'none',
        }}
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
        {/* Secondary animation for opacity/flicker effect */}
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

// --- Custom Node Components ---

// Shared styles for icon-only nodes - reduced size
const nodeBaseStyle = "product-card rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 group relative bg-black/40 backdrop-blur-md border border-white/10";
const nodeHoverStyle = "hover:shadow-[0_0_30px_-5px_rgba(19,245,132,0.3)] hover:border-[#13F584]/50 hover:scale-105";

const LeftNode: React.FC<NodeProps<ProductHaloFlowNode>> = ({ data }) => {
  return (
    <div className={`${nodeBaseStyle} ${nodeHoverStyle}`} title={data.title}>
      {/* Receives FROM center now (Target) */}
      <Handle
        type="target"
        position={Position.Right}
        className="w-3 h-3 bg-[#13F584] border-2 border-[#13F584] opacity-0! group-hover:opacity-100! transition-opacity"
        style={{ right: -6 }}
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
    <div className={`${nodeBaseStyle} ${nodeHoverStyle}`} title={data.title}>
      {/* Receives FROM center (Target) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-[#13F584] border-2 border-[#13F584] opacity-0! group-hover:opacity-100! transition-opacity"
        style={{ left: -6 }}
      />
      
      <div className="flex items-center justify-center">
        <div className="text-[#13F584] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(19,245,132,0.3)]">
          {data.icon || <div className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

const CenterNode: React.FC<NodeProps<{ title: string; icon?: React.ReactNode }>> = ({ data }) => {
  // Outer circle radius from InteractiveProductIconHalo: 140px (in 300x300 viewBox)
  // When scale=1.0, the component is 300px, so radius = 140px
  // Center node is 128px (w-32), so its center is at 64px from each edge
  // To position handles on outer circle: offset = outerRadius - nodeHalfSize = 140 - 64 = 76px
  const outerCircleRadius = 140; // pixels (matches InteractiveProductIconHalo outer ring radius)
  const nodeHalfSize = 64; // w-32 / 2 = 64px
  const handleOffset = outerCircleRadius - nodeHalfSize; // 76px offset from node edge
  
  return (
    <div className="relative w-32 h-32 flex items-center justify-center" title={data.title}>
        {/* Handles positioned on outer circle - Left side */}
        {/* Position.Left places handle at left edge, we offset it further left by handleOffset */}
        <Handle 
          id="source-left" 
          type="source" 
          position={Position.Left} 
          className="opacity-0!" 
          style={{ 
            left: -handleOffset, // -76px from left edge = on outer circle
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        {/* Handles positioned on outer circle - Right side */}
        {/* Position.Right places handle at right edge, we offset it further right by handleOffset */}
        <Handle 
          id="source-right" 
          type="source" 
          position={Position.Right} 
          className="opacity-0!" 
          style={{ 
            right: -handleOffset, // -76px from right edge = on outer circle
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        {/* Content - Can be InteractiveProductIconHalo or simple icon */}
        <div className="relative z-10 flex items-center justify-center">
           {data.icon}
        </div>
    </div>
  );
};

// --- Main Component ---

export const ProductHaloFlow: React.FC<ProductHaloFlowProps> = ({
  leftNodes = DEFAULT_LEFT_NODES,
  rightNodes = DEFAULT_RIGHT_NODES,
  centerNode = DEFAULT_CENTER,
}) => {
  // Define Node Types
  const nodeTypes = useMemo(() => ({
    leftNode: LeftNode,
    rightNode: RightNode,
    centerNode: CenterNode,
  }), []);

  // Define Edge Types
  const edgeTypes = useMemo(() => ({
    glowEdge: GlowEdge,
  }), []);

  // Calculate Layout and Initial State
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const centerX = 600;
    const centerY = 400;
    const radius = 350;
    const ySpacing = 140; // Spacing between vertical nodes

    // 1. Center Node
    nodes.push({
      id: centerNode.id || 'center',
      type: 'centerNode',
      position: { x: centerX - 64, y: centerY - 64 }, // Offset by half width/height (w-32=128px)
      data: { title: centerNode.title, icon: centerNode.icon },
      draggable: false,
    });

    // 2. Left Nodes
    leftNodes.forEach((item, index) => {
      // Calculate Y offset: (index - 1.5) centers 4 items
      const yOffset = (index - 1.5) * ySpacing;
      
      nodes.push({
        id: item.id,
        type: 'leftNode',
        // w-16 is 64px, half is 32.
        position: { x: centerX - radius - 32, y: centerY + yOffset - 32 }, 
        data: item,
        draggable: false,
      });

      // Edge: Center -> Left (Reversed direction)
      edges.push({
        id: `edge-center-${item.id}`,
        source: centerNode.id || 'center',
        sourceHandle: 'source-left', // Connect to left side of center node
        target: item.id,
        // targetHandle is implicit since there is only one handle on LeftNode
        type: 'glowEdge',
        animated: false, 
      });
    });

    // 3. Right Nodes
    rightNodes.forEach((item, index) => {
      const yOffset = (index - 1.5) * ySpacing;
      nodes.push({
        id: item.id,
        type: 'rightNode',
        // w-16 is 64px, half is 32.
        position: { x: centerX + radius - 32, y: centerY + yOffset - 32 },
        data: item,
        draggable: false,
      });

      // Edge: Center -> Right (Standard direction)
      edges.push({
        id: `edge-center-${item.id}`,
        source: centerNode.id || 'center',
        sourceHandle: 'source-right', // Connect to right side of center node
        target: item.id,
        type: 'glowEdge',
        animated: false,
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [leftNodes, rightNodes, centerNode]);

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
        preventScrolling={true}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        elementsSelectable={false}
        snapToGrid={true}
        className="bg-transparent"
      />
    </div>
  );
};

