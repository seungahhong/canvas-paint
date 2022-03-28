import { atom } from 'jotai';
import { LINE_WIDTH_TYPE, MENU_HEIGHT, SHAPE_TYPE } from '../constants';
import { Meta } from '../types';

export const metaAtom = atom<Meta>({
  scale: 1,
  globalState: {
    type: SHAPE_TYPE.RECT,
    outline: false,
    color: '#000000',
    gradient: false,
    line: {
      width: LINE_WIDTH_TYPE.TWO_LINE_WIDTH,
      cap: 'butt',
      join: 'miter',
    },
    text: {
      value: 'hello',
      size: 50,
      name: 'Arial',
      align: 'left',
      baseline: 'alphabetic',
      direction: 'inherit',
    },
    image: new Image(),
  },
  datas: [
    {
      type: SHAPE_TYPE.CIRCLE,
      x1: 2,
      y1: 2,
      x2: 52,
      y2: 52,
      animation: {
        xdirection: 'forward',
        ydirection: 'forward',
      },
      props: {
        outline: false,
        color: 'coral',
      },
    },
    {
      type: SHAPE_TYPE.CIRCLE,
      x1: 600,
      y1: 600,
      x2: 650,
      y2: 650,
      animation: {
        xdirection: 'forward',
        ydirection: 'reverse',
      },
      props: {
        outline: false,
        color: 'AliceBlue',
      },
    },
    {
      type: SHAPE_TYPE.CIRCLE,
      x1: 400,
      y1: 200,
      x2: 450,
      y2: 250,
      animation: {
        xdirection: 'reverse',
        ydirection: 'forward',
      },
      props: { outline: false, color: 'Cyan' },
    },
    {
      type: SHAPE_TYPE.CIRCLE,
      x1: 800,
      y1: 200,
      x2: 850,
      y2: 250,
      animation: {
        xdirection: 'reverse',
        ydirection: 'forward',
      },
      props: { outline: false, color: 'BlueViolet' },
    },
    {
      type: SHAPE_TYPE.CIRCLE,
      x1: 150,
      y1: 0,
      x2: 250,
      y2: 50,
      animation: {
        xdirection: 'reverse',
        ydirection: 'forward',
      },
      props: { outline: false, color: 'DarkOrange' },
    },
    {
      type: SHAPE_TYPE.TEXT,
      x1: window.innerWidth / 2 - 100,
      y1: (window.innerHeight - MENU_HEIGHT) / 2,
      props: {
        outline: false,
        color: '#00BFFF',
        text: {
          value: 'FillText',
          size: 40,
          name: 'Arial',
          align: 'left',
          baseline: 'alphabetic',
          direction: 'inherit',
        },
      },
    },
    {
      type: SHAPE_TYPE.TEXT,
      x1: window.innerWidth / 2 + 100,
      y1: (window.innerHeight - MENU_HEIGHT) / 2,
      props: {
        outline: true,
        color: '#2F4F4F',
        text: {
          value: 'StrokeText',
          size: 40,
          name: 'Arial',
          align: 'left',
          baseline: 'alphabetic',
          direction: 'inherit',
        },
      },
    },
  ],
});

export const shapeLength = atom((get) => get(metaAtom).datas.length);
