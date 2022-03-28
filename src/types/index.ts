export interface Meta {
  scale: number;
  globalState: Property;
  datas: any;
}

export interface Property {
  type: string;
  outline: boolean;
  color: string;
  gradient: boolean;

  line: {
    width: number;
    cap: CanvasLineCap;
    join: CanvasLineJoin;
  };

  text: {
    value: string;
    size: number;
    name: string;
    align: CanvasTextAlign;
    baseline: CanvasTextBaseline;
    direction: CanvasDirection;
  };

  image: HTMLImageElement;
}

export type ViewProps = {
  meta: Meta;
  handleGlobalSetting: (type: string, value: any) => void;
};
