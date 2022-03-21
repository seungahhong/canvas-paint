import { useCallback, useEffect, useRef, useState } from 'react';
import CanvasComponent from '../components/CanvasComponent';
import MenuComponent from '../components/MenuComponent';
import { SHAPE_TYPE, GLOBAL_MENU_TYPE } from '../constants';
import { Meta } from '../types';

const RootDispatcherEvents = ['resize', 'wheel'];

const CanvasContainer = () => {
  const activeMouseFlag = useRef<boolean>(false);
  const [meta, setMeta] = useState<Meta>({
    scale: 1,
    globalState: {
      shape: {
        type: SHAPE_TYPE.NONE,
        outline: false,
        color: '#000000',
      },
    },
    datas: [
      {
        type: SHAPE_TYPE.FILLTEXT,
        x1: 110,
        y1: 50,
        value: 'FillText',
        props: { outline: false },
      },
      {
        type: SHAPE_TYPE.STROKETEXT,
        x1: 200,
        y1: 50,
        value: 'StrokeText',
        props: { outline: false },
      },
      {
        type: SHAPE_TYPE.RECT,
        x1: 2,
        y1: 2,
        x2: 100,
        y2: 100,
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
                },
              };
            }

            return data;
          }),
        }));
      }
    }
  };

  useEffect(() => {
    bindEvent();

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
