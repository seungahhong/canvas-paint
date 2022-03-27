import { Property } from '../../types';

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  scale: number,
  props: Property,
) => {
  const cx = x * scale;
  const cy = y * scale;

  ctx.save();

  ctx.textBaseline = props.text.baseline;
  ctx.textAlign = props.text.align;
  ctx.direction = props.text.direction;
  ctx.font = `${props.text.size * scale}px ${props.text.name}`;

  if (props && props.outline === true) {
    ctx.strokeStyle = props.color;
    ctx.strokeText(text, cx, cy);
  } else {
    ctx.fillStyle = props.color;
    ctx.fillText(text, cx, cy);
  }

  ctx.strokeStyle = 'red';
  const msText = ctx.measureText(text);
  ctx.beginPath();
  ctx.moveTo(x - 10, cy);
  ctx.lineTo(x + msText.width + 10, cy);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
};
