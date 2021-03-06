export const SHAPE_TYPE = {
  RECT: 'RECT',
  TRIANGLE: 'TRIANGLE',
  CIRCLE: 'CIRCLE',
  LINE: 'LINE',
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
};

export const GLOBAL_MENU_TYPE = {
  TYPE: 'SHAPE',
  SHAPE: {
    OUTLINE: 'OUTLINE',
    COLOR: 'COLOR',
    GRADIENT: 'GRADIENT',
    LINE: {
      WIDTH: 'WIDTH',
      CAP: 'CAP',
      JOIN: 'JOIN',
    },
  },
  TEXT: {
    VALUE: 'VALUE',
    SIZE: 'SIZE',
    NAME: 'NAME',
    ALIGN: 'ALIGN',
    BASELINE: 'BASELINE',
    DIRECTION: 'DIRECTION',
  },
  IMAGE: 'IMAGE',
};

export const LINE_WIDTH_TYPE = {
  TWO_LINE_WIDTH: 2,
  FOUR_LINE_WIDTH: 4,
  SIX_LINE_WIDTH: 6,
  EIGHT_LINE_WIDTH: 8,
  TEN_LINE_WIDTH: 10,
};

export const LINE_CAP_TYPE = {
  BUTT: 'butt',
  ROUND: 'round',
  SQUARE: 'square',
};

export const LINE_JOIN_TYPE = {
  BEVEL: 'bevel',
  ROUND: 'round',
  MITER: 'miter',
};

export const TEXT_FONT = {
  ARIAL: 'Arial',
  VERDANA: 'Verdana',
  HELVETICA: 'Helvetica',
  TAHOMA: 'Tahoma',
  TREBUCHET: 'Trebuchet MS',
};

export const TEXT_ALIGN = {
  START: 'start',
  END: 'end',
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
};

export const TEXT_BASELINE = {
  ALPHABETIC: 'alphabetic',
  BOTTOM: 'bottom',
  HANGING: 'hanging',
  IDEOGRAPHIC: 'ideographic',
  MIDDLE: 'middle',
  TOP: 'top',
};

export const TEXT_DIRECTION = {
  INHERIT: 'inherit',
  LTR: 'ltr',
  RTL: 'rtl',
};

export const MENU_HEIGHT = 150;
