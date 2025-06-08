import { useReactFlow, getStraightPath } from 'reactflow';


export default function FloatingEdge({ id, source, target, data = {}, style = {}, algorithmKey }) {
  const { getNode } = useReactFlow();


  const sourceNode = getNode(source);
  const targetNode = getNode(target);

  if (!sourceNode || !targetNode) return null;

  const sourceX = sourceNode.position.x + sourceNode.width / 2;
  const sourceY = sourceNode.position.y + sourceNode.height / 2;
  const targetX = targetNode.position.x + targetNode.width / 2;
  const targetY = targetNode.position.y + targetNode.height / 2;

  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  const dx = sourceX - targetX;
  const dy = sourceY - targetY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const unitX = dx / len;
  const unitY = dy / len;

  const size = 6;
  const arrowX = midX;
  const arrowY = midY;

  const points = [
    `${arrowX},${arrowY}`,
    `${arrowX - unitY * size + unitX * size},${arrowY + unitX * size + unitY * size}`,
    `${arrowX + unitY * size + unitX * size},${arrowY - unitX * size + unitY * size}`,
  ].join(' ');

  const strokeColor = style?.stroke ?? '#fff';

  const weight = data.weight ?? 1;

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: strokeColor,
          strokeWidth: 2,
          ...style,
        }}
      />
      <polygon points={points} fill={strokeColor} />

      {algorithmKey === "a-star" ? (
          <text
            x={midX}
            y={midY - 10}
            textAnchor="middle"
            fill={strokeColor}
            fontSize="12"
            fontWeight="bold"
            pointerEvents="none"
          >
            {weight}
          </text>
        ): null}
    </>
  );
}
