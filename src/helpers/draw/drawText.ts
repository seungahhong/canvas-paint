import { Property } from '../../types';

export const drawFillText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  scale: number,
  props: Property,
) => {
  props;
  ctx.save();
  ctx.textBaseline = 'top';
  ctx.font = `${40 * scale}px Arial`;
  ctx.fillStyle = props.color;
  ctx.fillText(text, x * scale, y * scale);
  ctx.restore();
};

export const drawStrokeText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  scale: number,
  props: Property,
) => {
  props;
  ctx.save();
  ctx.textBaseline = 'top';
  ctx.font = `${40 * scale}px Arial`;
  ctx.strokeStyle = props.color;
  ctx.strokeText(text, x * scale, y * scale);
  ctx.restore();
};
