import React from 'react';
import { SHAPE_TYPE } from '../../constants';
import { drawLine } from '../../helpers/draw/drawLine';
import {
  drawRect,
  drawTriangle,
  drawCircle,
} from '../../helpers/draw/drawShape';
import { drawText } from '../../helpers/draw/drawText';

class CanvasView {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D | null;
  scale: number;

  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.canvas = canvasRef.current as HTMLCanvasElement;
    this.canvas.width = this.canvas.getBoundingClientRect().width;
    this.canvas.height = this.canvas.getBoundingClientRect().height;
    this.scale = window.devicePixelRatio || 1;

    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext('2d');
  }

  destory() {
    this.ctx = null;
  }

  setScale(scale: number) {
    this.scale = scale;
  }

  clear() {
    if (this.ctx) {
      this.canvas.width = this.canvas.getBoundingClientRect().width;
      this.canvas.height = this.canvas.getBoundingClientRect().height;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  draw(datas: []) {
    if (this.ctx) {
      datas.forEach((data: any) => {
        switch (data.type) {
          case SHAPE_TYPE.RECT:
            {
              const { x1, y1, x2, y2, props } = data;
              if (this.ctx) {
                drawRect(this.ctx, x1, y1, x2 - x1, y2 - y1, this.scale, props);
              }
            }
            break;
          case SHAPE_TYPE.TRIANGLE:
            {
              const { x1, y1, x2, y2, props } = data;
              if (this.ctx) {
                drawTriangle(
                  this.ctx,
                  x1,
                  y2,
                  (x2 - x1) / 2 + x1,
                  y1,
                  x2,
                  y2,
                  this.scale,
                  props,
                );
              }
            }
            break;
          case SHAPE_TYPE.CIRCLE:
            {
              const { x1, y1, x2, y2, props } = data;
              if (this.ctx) {
                drawCircle(this.ctx, x1, y1, x2, y2, this.scale, props);
              }
            }
            break;
          case SHAPE_TYPE.LINE:
            {
              const { x1, y1, x2, y2, props } = data;
              if (this.ctx) {
                drawLine(this.ctx, x1, y1, x2, y2, this.scale, props);
              }
            }
            break;
          case SHAPE_TYPE.TEXT:
            {
              const { x1, y1, props } = data;
              if (this.ctx) {
                drawText(this.ctx, props.text.value, x1, y1, this.scale, props);
              }
            }
            break;
        }
      });
    }
  }
}

export default CanvasView;
