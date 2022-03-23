export interface Meta {
  scale: number;
  globalState: { shape: Property };
  datas: any;
}

export interface Property {
  type: string;
  outline: boolean;
  color: string;

  line: {
    width: number;
    cap: CanvasLineCap;
    join: CanvasLineJoin;
  };
}
