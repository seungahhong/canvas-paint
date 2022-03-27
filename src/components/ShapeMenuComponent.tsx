import React, { useMemo } from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';

import {
  GLOBAL_MENU_TYPE,
  LINE_WIDTH_TYPE,
  LINE_CAP_TYPE,
  LINE_JOIN_TYPE,
  SHAPE_TYPE,
} from '../constants';
import { ViewProps } from '../types';
import { Section, BoxWrapper, Container } from './base/Common';

const ShapeMenuComponent = ({ meta, handleGlobalSetting }: ViewProps) => {
  const isVisible = useMemo<boolean>(
    () =>
      meta.globalState.type === SHAPE_TYPE.RECT ||
      meta.globalState.type === SHAPE_TYPE.TRIANGLE ||
      meta.globalState.type === SHAPE_TYPE.CIRCLE ||
      meta.globalState.type === SHAPE_TYPE.LINE,
    [meta],
  );

  const handleLineChange = (
    event: React.ChangeEvent<HTMLSelectElement> | undefined,
  ) => {
    switch (event?.target.name) {
      case 'Line Width':
        handleGlobalSetting(
          GLOBAL_MENU_TYPE.SHAPE.LINE.WIDTH,
          event?.target.value,
        );
        break;
      case 'Line Cap':
        handleGlobalSetting(
          GLOBAL_MENU_TYPE.SHAPE.LINE.CAP,
          event?.target.value,
        );
        break;
      case 'Line Join':
        handleGlobalSetting(
          GLOBAL_MENU_TYPE.SHAPE.LINE.JOIN,
          event?.target.value,
        );
        break;
    }
  };

  return (
    <Container style={{ display: isVisible ? 'flex' : 'none' }}>
      <Section>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native1"
            style={{ width: '150px' }}
          >
            Line Width
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={LINE_WIDTH_TYPE.TWO_LINE_WIDTH}
              inputProps={{
                name: 'Line Width',
                id: 'uncontrolled-native1',
              }}
              onChange={handleLineChange}
            >
              <option value={LINE_WIDTH_TYPE.TWO_LINE_WIDTH}>2mm</option>
              <option value={LINE_WIDTH_TYPE.FOUR_LINE_WIDTH}>4mm</option>
              <option value={LINE_WIDTH_TYPE.SIX_LINE_WIDTH}>6mm</option>
              <option value={LINE_WIDTH_TYPE.EIGHT_LINE_WIDTH}>8mm</option>
              <option value={LINE_WIDTH_TYPE.TEN_LINE_WIDTH}>10mm</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native2"
            style={{ width: '150px' }}
          >
            Line Cap
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={LINE_CAP_TYPE.BUTT}
              inputProps={{
                name: 'Line Cap',
                id: 'uncontrolled-native2',
              }}
              onChange={handleLineChange}
            >
              <option value={LINE_CAP_TYPE.BUTT}>butt</option>
              <option value={LINE_CAP_TYPE.ROUND}>round</option>
              <option value={LINE_CAP_TYPE.SQUARE}>squre</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native3"
            style={{ width: '150px' }}
          >
            Line Join
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={LINE_JOIN_TYPE.MITER}
              inputProps={{
                name: 'Line Join',
                id: 'uncontrolled-native3',
              }}
              onChange={handleLineChange}
            >
              <option value={LINE_JOIN_TYPE.BEVEL}>bevel</option>
              <option value={LINE_JOIN_TYPE.ROUND}>round</option>
              <option value={LINE_JOIN_TYPE.MITER}>miter</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
      </Section>
    </Container>
  );
};

export default ShapeMenuComponent;
