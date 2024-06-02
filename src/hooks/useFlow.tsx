import CustomNode from "@/components/nodes/custom-node";
import { nanoid } from "nanoid";
import {
  DragEvent,
  DragEventHandler,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Edge,
  Node,
  NodeMouseHandler,
  NodeTypes,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

export const initialNodes: Node[] = [
  {
    type: "custom",
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges: Edge[] = [
  // {
  //   id: '1->2',
  //   source: '1',
  //   target: '2',
  // },
];

export type NodeData = {
  label: string;
};
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

export const useFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { getNode, getEdges, screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const createConnection = useCallback(
    (sourceId: string) => {
      // create an incremental ID based on the number of elements already in the graph
      // const targetId: string = `${nodes.length + 1}`;
      const id = nanoid();

      const targetNode: Node<NodeData> = {
        id,
        data: { label: `Node ${id}` },
        position: { x: 0, y: 0 }, // no need to pass a position as it is computed by the layout hook
        type: "custom",
      };

      const connectingEdge: Edge = {
        id: `${sourceId}->${id}`,
        source: sourceId,
        target: id,
      };

      setNodes((nodes) => nodes.concat([targetNode]));
      setEdges((edges) => edges.concat([connectingEdge]));
    },
    [setEdges, setNodes]
  );

  const reactFlowBounds: any =
    reactFlowWrapper?.current?.getBoundingClientRect();

  // this function is called once the node from the sidebar is dropped onto a node in the current graph
  const onDrop: DragEventHandler = useCallback(
    (evt: DragEvent<HTMLDivElement>) => {
      // make sure that the event target is a DOM element
      const position = screenToFlowPosition({
        x: evt.clientX,
        y: evt.clientY,
      }) || { x: 0, y: 0 };
      console.log({ position });
      if (evt.target instanceof Element) {
        // from the target element search for the node wrapper element which has the node id as attribute
        const targetId = evt.target
          .closest(".react-flow__node")
          ?.getAttribute("data-id");
        console.log({ targetId });
        if (!targetId) {
          // now we can create a connection to the drop target node
          const id = nanoid();
          if (!position) return;
          const targetNode: Node<NodeData> = {
            id,
            data: { label: `Node ${id}` },
            position,
            type: "custom",
          };
          setNodes((nodes) => nodes.concat([targetNode]));
        } else {
          createConnection(targetId);
        }
      }
    },
    [createConnection, reactFlowInstance, setNodes]
  );

  // this function is called when a node in the graph is clicked
  // enables a second possibility to add nodes to the canvas
  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: Node<NodeData>
  ) => {
    console.log({ node });
    // on click, we want to add create a new node connection the clicked node
    createConnection(node.id);
  };

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onDrop,
    onNodeClick,
    nodeTypes,
    onDragOver,
  };
};
