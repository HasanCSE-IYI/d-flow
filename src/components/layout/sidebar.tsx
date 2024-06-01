
import React, { DragEvent, useCallback } from 'react';


export function Sidebar() {
  const onDragStart = useCallback((nodeData: any) => (event: DragEvent) => {
    const dataString = JSON.stringify(nodeData);
    event.dataTransfer.setData('application/reactflow', dataString);
  },[])

  return (
    <div className={"sidebar"}>
      <div className={"sidebarLabel"}>You can drag nodes from the sidebar and drop them on another node</div>
      <div>
        <div onDragStart={onDragStart({})} draggable className={"sidebarNode"}>
          Node A
        </div>
        <div onDragStart={onDragStart} draggable className={"sidebarNode"}>
          Node B
        </div>
        <div onDragStart={onDragStart} draggable className={"sidebarNode"}>
          Node C
        </div>
      </div>
    </div>
  );
}

