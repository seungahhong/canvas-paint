import { Property } from '../../types';

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  scale: number,
  props: Property,
): void => {
  const cx1 = x1 * scale;
  const cy1 = y1 * scale;
  const cx2 = x2 * scale;
  const cy2 = y2 * scale;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx1, cy1);
  ctx.lineWidth = props.line.width;
  ctx.lineCap = props.line.cap;
  ctx.lineJoin = props.line.join;
  ctx.strokeStyle = props.color;
  ctx.lineTo(cx2, cy2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};
