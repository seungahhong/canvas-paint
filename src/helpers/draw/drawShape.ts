import { Property } from '../../types';

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  scale: number,
  props: Property,
): void => {
  const cx = x * scale;
  const cy = y * scale;
  const cw = w * scale;
  const ch = h * scale;

  ctx.save();
  ctx.lineWidth = 0;

  if (props && props.outline === true) {
    ctx.strokeStyle = props.color;
    ctx.lineWidth = props.line.width;
    ctx.lineCap = props.line.cap;
    ctx.lineJoin = props.line.join;
    ctx.strokeRect(cx, cy, cw, ch);
  } else {
    ctx.fillStyle = props.color;
    ctx.fillRect(cx, cy, cw, ch);
  }

  ctx.restore();
};

export const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  scale: number,
  props: Property,
): void => {
  const cx1 = x1 * scale;
  const cy1 = y1 * scale;
  const cx2 = x2 * scale;
  const cy2 = y2 * scale;
  const cx3 = x3 * scale;
  const cy3 = y3 * scale;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx1, cy1);
  ctx.lineTo(cx2, cy2);
  ctx.lineTo(cx3, cy3);
  ctx.lineTo(cx1, cy1);
  if (props && props.outline === true) {
    ctx.strokeStyle = props.color;
    ctx.lineWidth = props.line.width;
    ctx.lineCap = props.line.cap;
    ctx.lineJoin = props.line.join;
    ctx.stroke();
  } else {
    ctx.fillStyle = props.color;
    ctx.fill();
  }

  ctx.closePath();
  ctx.restore();
};

export const drawCircle = (
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
  ctx.arc(
    cx1 + (cx2 - cx1) / 2,
    cy1 + (cy2 - cy1) / 2,
    Math.abs(cy2 - cy1) / 2,
    0,
    Math.PI * 2,
    true,
  );

  if (props && props.outline === true) {
    ctx.strokeStyle = props.color;
    ctx.lineWidth = props.line.width;
    ctx.lineCap = props.line.cap;
    ctx.lineJoin = props.line.join;
    ctx.stroke();
  } else {
    ctx.fillStyle = props.color;
    ctx.fill();
  }

  ctx.closePath();
  ctx.restore();
};
