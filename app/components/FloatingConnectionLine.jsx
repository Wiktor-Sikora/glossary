import React from 'react';
import { getStraightPath } from 'reactflow';

export default function FloatingConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  style = {},
}) {

  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  const connectionStyle = {
    stroke: '#fff',
    strokeWidth: 2,
    ...style,
  };

  return (
    <path
      style={connectionStyle}
      className="react-flow__edge-path react-flow__connection-line"
      d={edgePath}
    />
  );
}