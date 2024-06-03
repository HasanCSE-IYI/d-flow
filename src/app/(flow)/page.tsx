"use client";

import { useFlow } from "@/hooks/useFlow";
import { EdgeType } from "@/types";
import { nanoid } from "nanoid";
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
  type: "simplebezier",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#FF0072",
  },
  pathOptions: { offset: 5 },
  // label: "marker size and color",
  style: {
    strokeWidth: 2,
    stroke: "#FF0072",
  },
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
    edgeTypes,
    onDrop,
    onDragOver,
  } = useFlow();
  console.log({ nodes, edges });

  // useNodesLayout();

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => {
        const edge: Edge = {
          ...params,
          id: nanoid(),
          type: EdgeType.BRIDGE,
          animated: true,
          style: {
            stroke: "#f36",
            strokeWidth: 1,
            strokeOpacity: 1,
          },

          target: params.target as string,
          source: params.source as string,
        };
        return addEdge(edge, eds);
      }),
    [setEdges]
  );

  return (
    <div style={{ height: "100vh" }} className="w-full">
      <ReactFlow
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
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
