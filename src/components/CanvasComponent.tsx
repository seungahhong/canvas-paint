import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import CanvasView from './CanvasView';
import { Meta } from '../types';

const Section = styled.section({
  backgroundColor: 'yellow',
  height: '100%',
});

const Canvas = styled.canvas({
  width: '100%',
  height: '100%',
  border: '1px solid #d3ded3',
});

type Props = {
  meta: Meta;
  handleMouse: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const CanvasComponent = ({ meta, handleMouse }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasView = useRef<CanvasView>();

  useEffect(() => {
    canvasView.current = new CanvasView(canvasRef);
    canvasView.current.init();

    return () => {
      if (canvasView.current) {
        canvasView.current.destory();
      }
    };
  }, []);

  useEffect(() => {
    const { scale, datas } = meta;
    setTimeout(() => {
      if (canvasView.current) {
        canvasView.current.clear();
        canvasView.current.setScale(scale);
        canvasView.current.draw(datas);
      }
    });
  }, [meta, canvasView]);

  return (
    <Section
      onMouseDown={handleMouse}
      onMouseMove={handleMouse}
      onMouseUp={handleMouse}
    >
      <Canvas ref={canvasRef} />
    </Section>
  );
};

export default CanvasComponent;
