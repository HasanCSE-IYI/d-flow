"use client";

import { useNodesLayout } from "@/helper/useLayout";
import { useFlow } from "@/hooks/useFlow";

import ReactFlow, { Background, Controls, MarkerType, MiniMap } from "reactflow";

import "reactflow/dist/style.css";

const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};

export default function App() {
  const {
    nodes,
    setNodes,
    onNodesChange,
    onEdgesChange,
    edges,
    nodeTypes,
    setEdges,
    onNodeClick,
    onDrop,
    onDragOver,
  } = useFlow();
  console.log({ nodes, edges });

  useNodesLayout();

  return (
    <div style={{ height: "100vh" }} className="w-full">
      <ReactFlow
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        // newly added edges get these options automatically
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls />
        <MiniMap />
        <Background  gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
