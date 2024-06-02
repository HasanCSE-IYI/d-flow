import { useCallback, useEffect } from 'react'
import ELK from 'elkjs/lib/elk.bundled.js'
import {
  Edge,
  Node,
  useReactFlow,
  useStoreApi,
} from 'reactflow'
import { cloneDeep } from 'lodash'

export const AUTO_LAYOUT_OFFSET = {
  x: -42,
  y: 243,
}
const layoutOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.layered.spacing.nodeNodeBetweenLayers': '60',
  'elk.spacing.nodeNode': '40',
  'elk.layered.nodePlacement.strategy': 'SIMPLE',
}

const elk = new ELK()

export const getLayoutedNodes = async (
  nodes: Node[],
  edges: Edge[],
  options: { [key: string]: any } = {}
) => {
  const isHorizontal = options["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      width: 150,
      height: 50,
    })),
    edges: cloneDeep(edges),
  };

  const layoutedGraph = await elk.layout(graph as any);
  const layoutedNodes = nodes.map((node) => {
    const layoutedNode = layoutedGraph.children?.find(
      (lgNode) => lgNode.id === node.id
    );

    return {
      ...node,
      position: {
        x: (layoutedNode?.x ?? 0) + AUTO_LAYOUT_OFFSET.x,
        y: (layoutedNode?.y ?? 0) + AUTO_LAYOUT_OFFSET.y,
      },
    };
  });

  return {
    layoutedNodes,
  };
};

export const useNodesLayout = () => {
  const store = useStoreApi()
  const reactflow = useReactFlow()


  const handleNodesLayout = useEffect( () => {
  
  const handleNodes =async () => {
     const {
      getNodes,
      edges,
      setNodes,
    } = store.getState()
    const { setViewport } = reactflow
    const nodes = getNodes()
    const {
      layoutedNodes,
    } = await getLayoutedNodes(nodes, edges)

    setNodes(layoutedNodes)
    const zoom = 0.7
    setViewport({
      x: 0,
      y: 0,
      zoom,
    })
    
   }

   handleNodes()
   
  }, [store, reactflow, ])

  return {
    handleNodesLayout,
  }
}