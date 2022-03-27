import { Property } from '../../types';

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  scale: number,
  props: Property,
): void => {
  if (props.image != null) {
    const cx1 = x1 * scale;
    const cy1 = y1 * scale;
    const cx2 = x2 * scale;
    const cy2 = y2 * scale;

    ctx.save();
    ctx.drawImage(props.image, cx1, cy1, cx2 - cx1, cy2 - cy1);
    ctx.restore();
  }
};
