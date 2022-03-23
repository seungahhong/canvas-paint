import { useCallback, useEffect, useRef, useState } from 'react';
import CanvasComponent from '../components/CanvasComponent';
import MenuComponent from '../components/MenuComponent';
import { SHAPE_TYPE, GLOBAL_MENU_TYPE, LINE_WIDTH_TYPE } from '../constants';
import { Meta } from '../types';

const RootDispatcherEvents = ['resize', 'wheel'];

const CanvasContainer = () => {
  const activeMouseFlag = useRef<boolean>(false);
  const [meta, setMeta] = useState<Meta>({
    scale: 1,
    globalState: {
      shape: {
        type: SHAPE_TYPE.RECT,
        outline: false,
        color: '#000000',
        line: {
          width: LINE_WIDTH_TYPE.TWO_LINE_WIDTH,
          cap: 'butt',
          join: 'miter',
        },
      },
    },
    datas: [
      {
        type: SHAPE_TYPE.RECT,
        x1: 2,
        y1: 2,
        x2: 100,
        y2: 100,
        animation: {
          xdirection: 'forward',
          ydirection: 'forward',
        },
        props: { outline: false },
      },
      {
        type: SHAPE_TYPE.FILLTEXT,
        x1: 110,
        y1: 50,
        value: 'FillText',
        animation: {
          direction: 'forward',
        },
        props: { outline: false },
      },
      {
        type: SHAPE_TYPE.STROKETEXT,
        x1: 200,
        y1: 50,
        value: 'StrokeText',
        animation: {
          direction: 'forward',
        },
        props: { outline: false },
      },
    ],
  });

  const bindEvent = useCallback(() => {
    const RootEventDispatcher = (e: Event) => {
      switch (e.type) {
        case 'resize':
        case 'wheel':
          {
            if (
              e.type !== 'wheel' ||
              (e.type === 'wheel' && (e as WheelEvent).ctrlKey)
            ) {
              setMeta((prev) => ({
                ...prev,
                scale: window.devicePixelRatio || 1,
              }));
            }
          }
          break;
      }
    };

    RootDispatcherEvents.forEach((event: string) => {
      window.addEventListener(
        event,
        RootEventDispatcher,
        event === 'wheel' ? { passive: false } : {},
      );
    });
  }, []);

  const unBindEvent = useCallback(() => {
    RootDispatcherEvents.forEach((event: string) => {
      window.removeEventListener(event, () => {
        return;
      });
    });
  }, []);

  const handleMouse = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch (event.type) {
      case 'mousedown':
        {
          if (
            activeMouseFlag.current ||
            meta.globalState.shape.type === SHAPE_TYPE.NONE
          ) {
            return;
          }

          setMeta((prev) => ({
            ...prev,
            datas: [
              ...prev.datas,
              {
                type: prev.globalState.shape.type,
                x1: event.clientX,
                y1: event.clientY - 150,
                x2: event.clientX,
                y2: event.clientY - 150,
                props: {
                  outline: meta.globalState.shape.outline,
                  color: meta.globalState.shape.color,
                  line: {
                    width: meta.globalState.shape.line.width,
                    cap: meta.globalState.shape.line.cap,
                    join: meta.globalState.shape.line.join,
                  },
                },
              },
            ],
          }));
          activeMouseFlag.current = true;
        }
        break;
      case 'mouseup':
        {
          if (
            !activeMouseFlag.current ||
            meta.globalState.shape.type === SHAPE_TYPE.NONE
          ) {
            return;
          }

          console.log(meta);
          setMeta((prev) => ({
            ...prev,
            datas: prev.datas.map((data: any, index: number) => {
              if (index === prev.datas.length - 1) {
                return {
                  ...data,
                  x2: event.clientX,
                  y2: event.clientY - 150,
                  props: {
                    outline: meta.globalState.shape.outline,
                    color: meta.globalState.shape.color,
                    line: {
                      width: meta.globalState.shape.line.width,
                      cap: meta.globalState.shape.line.cap,
                      join: meta.globalState.shape.line.join,
                    },
                  },
                };
              }

              return data;
            }),
          }));
          activeMouseFlag.current = false;
        }
        break;
      case 'mousemove': {
        if (
          !activeMouseFlag.current ||
          meta.globalState.shape.type === SHAPE_TYPE.NONE
        ) {
          return;
        }

        setMeta((prev) => ({
          ...prev,
          datas: prev.datas.map((data: any, index: number) => {
            if (index === prev.datas.length - 1) {
              return {
                ...data,
                x2: event.clientX,
                y2: event.clientY - 150,
                props: {
                  outline: meta.globalState.shape.outline,
                  color: meta.globalState.shape.color,
                  line: {
                    width: meta.globalState.shape.line.width,
                    cap: meta.globalState.shape.line.cap,
                    join: meta.globalState.shape.line.join,
                  },
                },
              };
            }

            return data;
          }),
        }));
      }
    }
  };

  const animation = () => {
    setMeta((prev) => ({
      ...prev,
      datas: prev.datas.map((data: any, index: number) => {
        if (index === 0) {
          const time = Math.floor(Math.random() * 5);
          const xdirection =
            data.animation.xdirection === 'reverse' && data.x1 < 0
              ? 'forward'
              : data.animation.xdirection === 'forward' &&
                data.x1 > window.innerWidth
              ? 'reverse'
              : data.animation.xdirection;
          const x1 = xdirection === 'forward' ? data.x1 + time : data.x1 - time;

          const ydirection =
            data.animation.ydirection === 'reverse' && data.y1 < 0
              ? 'forward'
              : data.animation.ydirection === 'forward' &&
                data.y1 > window.innerHeight - 150
              ? 'reverse'
              : data.animation.ydirection;
          const y1 = ydirection === 'forward' ? data.y1 + time : data.y1 - time;

          return {
            ...data,
            x1,
            y1,
            x2: x1 + 100,
            y2: y1 + 100,
            animation: {
              ...animation,
              xdirection,
              ydirection,
            },
          };
        }
        return data;
      }),
    }));
    requestAnimationFrame(animation);
  };

  useEffect(() => {
    bindEvent();
    animation();

    return () => {
      unBindEvent();
    };
  }, []);

  const handleGlobalSetting = (type: string, value: any) => {
    switch (type) {
      case GLOBAL_MENU_TYPE.SHAPE.TYPE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            shape: {
              ...prev.globalState.shape,
              type: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.OUTLINE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            shape: {
              ...prev.globalState.shape,
              outline: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.COLOR:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            shape: {
              ...prev.globalState.shape,
              color: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.LINE.WIDTH:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            shape: {
              ...prev.globalState.shape,
              line: {
                ...prev.globalState.shape.line,
                width: value,
              },
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.LINE.CAP:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            shape: {
              ...prev.globalState.shape,
              line: {
                ...prev.globalState.shape.line,
                cap: value,
              },
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.LINE.JOIN:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            shape: {
              ...prev.globalState.shape,
              line: {
                ...prev.globalState.shape.line,
                join: value,
              },
            },
          },
        }));
        break;
    }
  };

  return (
    <>
      <MenuComponent meta={meta} handleGlobalSetting={handleGlobalSetting} />
      <CanvasComponent meta={meta} handleMouse={handleMouse} />
    </>
  );
};

export default CanvasContainer;
