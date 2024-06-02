"use client";

import { useFlow } from "@/hooks/useFlow";
import { useCallback } from "react";

import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.Arrow },
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

  // useNodesLayout();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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
        nodeOrigin={[0.5, 0.5]}
        // onNodeClick={onNodeClick}
        // newly added edges get these options automatically
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
