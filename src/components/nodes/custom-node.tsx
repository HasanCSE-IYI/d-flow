
"use client"
import React, { useState, DragEvent } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import cx from 'classnames';



function CustomNode({ data, sourcePosition, targetPosition }: NodeProps) {
  const [isDropzoneActive, setDropzoneActive] = useState<boolean>(false);

  const onDrop = () => {
    setDropzoneActive(false);
  };

  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  const onDragEnter = () => {
    setDropzoneActive(true);
  };

  const onDragLeave = () => {
    setDropzoneActive(false);
  };

  const className = cx("node", { ["nodeDropzone"]: isDropzoneActive });

  return (
    <div
      className={className}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      
      <Handle className={"handle"} type="target" position={targetPosition || Position.Top} />
      <Handle className={"handle"} type="source" position={sourcePosition || Position.Bottom} />
      {data.label}
    </div>
  );
}

export default CustomNode;
