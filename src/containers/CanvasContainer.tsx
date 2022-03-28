import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import CanvasComponent from '../components/CanvasComponent';
import MenuComponent from '../components/MenuComponent';
import { GLOBAL_MENU_TYPE, MENU_HEIGHT } from '../constants';
import { metaAtom } from '../states';

const RootDispatcherEvents = ['resize', 'wheel'];

const CanvasContainer = () => {
  const activeMouseFlag = useRef<boolean>(false);
  const [meta, setMeta] = useAtom(metaAtom);

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
                width: window.innerWidth,
                height: window.innerHeight,
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
          if (activeMouseFlag.current) {
            return;
          }

          setMeta((prev) => ({
            ...prev,
            datas: [
              ...prev.datas,
              {
                type: prev.globalState.type,
                x1: event.clientX,
                y1: event.clientY - MENU_HEIGHT,
                x2: event.clientX,
                y2: event.clientY - MENU_HEIGHT,
                props: {
                  outline: meta.globalState.outline,
                  color: meta.globalState.color,
                  gradient: meta.globalState.gradient,
                  line: {
                    width: meta.globalState.line.width,
                    cap: meta.globalState.line.cap,
                    join: meta.globalState.line.join,
                  },
                  text: {
                    ...meta.globalState.text,
                  },
                  image: meta.globalState.image,
                },
              },
            ],
          }));
          activeMouseFlag.current = true;
        }
        break;
      case 'mouseup':
        {
          if (!activeMouseFlag.current) {
            return;
          }

          setMeta((prev) => ({
            ...prev,
            datas: prev.datas.map((data: any, index: number) => {
              if (index === prev.datas.length - 1) {
                return {
                  ...data,
                  x2: event.clientX,
                  y2: event.clientY - MENU_HEIGHT,
                  props: {
                    outline: meta.globalState.outline,
                    color: meta.globalState.color,
                    gradient: meta.globalState.gradient,
                    line: {
                      width: meta.globalState.line.width,
                      cap: meta.globalState.line.cap,
                      join: meta.globalState.line.join,
                    },
                    text: {
                      ...meta.globalState.text,
                    },
                    image: meta.globalState.image,
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
        if (!activeMouseFlag.current) {
          return;
        }

        setMeta((prev) => ({
          ...prev,
          datas: prev.datas.map((data: any, index: number) => {
            if (index === prev.datas.length - 1) {
              return {
                ...data,
                x2: event.clientX,
                y2: event.clientY - MENU_HEIGHT,
                props: {
                  outline: meta.globalState.outline,
                  color: meta.globalState.color,
                  gradient: meta.globalState.gradient,
                  line: {
                    width: meta.globalState.line.width,
                    cap: meta.globalState.line.cap,
                    join: meta.globalState.line.join,
                  },
                  text: {
                    ...meta.globalState.text,
                  },
                  image: meta.globalState.image,
                },
              };
            }

            return data;
          }),
        }));
      }
    }
  };

  let count = 0;
  const animation = () => {
    count = count === 50 ? 0 : count + 1;
    setMeta((prev) => ({
      ...prev,
      datas: prev.datas.map((data: any, index: number) => {
        if (index >= 0 && index <= 4) {
          const time = Math.floor(Math.random() * 5);
          const xdirection =
            data.animation.xdirection === 'reverse' && data.x1 < 0
              ? 'forward'
              : data.animation.xdirection === 'forward' &&
                data.x2 > window.innerWidth
              ? 'reverse'
              : data.animation.xdirection;
          const x1 = xdirection === 'forward' ? data.x1 + time : data.x1 - time;

          const ydirection =
            data.animation.ydirection === 'reverse' && data.y1 < 0
              ? 'forward'
              : data.animation.ydirection === 'forward' &&
                data.y2 > window.innerHeight - MENU_HEIGHT
              ? 'reverse'
              : data.animation.ydirection;
          const y1 = ydirection === 'forward' ? data.y1 + time : data.y1 - time;

          return {
            ...data,
            x1,
            y1,
            x2: x1 + 50,
            y2: y1 + 50,
            animation: {
              ...animation,
              xdirection,
              ydirection,
            },
          };
        }

        if (index >= 5 && index <= 6) {
          const x1 =
            index === 5
              ? window.innerWidth / 2 - 300
              : window.innerWidth / 2 + 100;
          const y1 = (window.innerHeight - MENU_HEIGHT) / 2;
          return {
            ...data,
            x1,
            y1,
            x2: x1 + 50,
            y2: y1 + 50,
            props: {
              ...data.props,
              color:
                count === 0
                  ? `#${Math.floor(Math.random() * 16777215).toString(16)}`
                  : data.props.color,
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
      case GLOBAL_MENU_TYPE.TYPE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            type: value,
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.OUTLINE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            outline: value,
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.COLOR:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            color: value,
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.GRADIENT:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            gradient: value,
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.LINE.WIDTH:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            line: {
              ...prev.globalState.line,
              width: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.LINE.CAP:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            line: {
              ...prev.globalState.line,
              cap: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.SHAPE.LINE.JOIN:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            line: {
              ...prev.globalState.line,
              join: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.TEXT.VALUE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            text: {
              ...prev.globalState.text,
              value: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.TEXT.SIZE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            text: {
              ...prev.globalState.text,
              size: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.TEXT.NAME:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            text: {
              ...prev.globalState.text,
              name: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.TEXT.ALIGN:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            text: {
              ...prev.globalState.text,
              align: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.TEXT.BASELINE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            text: {
              ...prev.globalState.text,
              baseline: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.TEXT.DIRECTION:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            text: {
              ...prev.globalState.text,
              direction: value,
            },
          },
        }));
        break;
      case GLOBAL_MENU_TYPE.IMAGE:
        setMeta((prev) => ({
          ...prev,
          globalState: {
            ...prev.globalState,
            image: value,
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
