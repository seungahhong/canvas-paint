import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  SelectChangeEvent,
  Divider,
  NativeSelect,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Color, ColorPicker } from 'material-ui-color';
import {
  SHAPE_TYPE,
  GLOBAL_MENU_TYPE,
  LINE_WIDTH_TYPE,
  LINE_CAP_TYPE,
  LINE_JOIN_TYPE,
} from '../constants';
import { Meta } from '../types';

const Container = styled.div({
  display: 'flex',
  height: '150px',
});

const Section = styled.section({
  padding: '20px',
  boxSizing: 'border-box',
});

const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: colume;
  align-items: center;
  width: 200px;
  margin-bottom: 10px;

  span {
    display: inline-block;
    margin-right: 10px;
  }
`;

type Props = {
  meta: Meta;
  handleGlobalSetting: (type: string, value: any) => void;
};

const MenuComponent = ({ meta, handleGlobalSetting }: Props) => {
  const [shapeType, setShapeType] = useState<string>(
    meta.globalState.shape.type,
  );
  const [shapeOutlineSelected, setShapeOutlineSelected] = useState<boolean>(
    meta.globalState.shape.outline,
  );
  const [shapeColor, setShapeColor] = useState<string>(
    meta.globalState.shape.color,
  );

  const handleShapeChange = (event: SelectChangeEvent<string>) => {
    setShapeType(event.target.value);
    handleGlobalSetting(GLOBAL_MENU_TYPE.SHAPE.TYPE, event.target.value);
  };

  const handleOutlineChange = () => {
    setShapeOutlineSelected(!shapeOutlineSelected);
    handleGlobalSetting(GLOBAL_MENU_TYPE.SHAPE.OUTLINE, !shapeOutlineSelected);
  };

  const handleColorChange = (color: Color) => {
    setShapeColor(color.css.backgroundColor as string);
    handleGlobalSetting(
      GLOBAL_MENU_TYPE.SHAPE.COLOR,
      color.css.backgroundColor,
    );
  };

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
    <Container>
      <Section>
        <BoxWrapper>
          <FormControl fullWidth>
            <InputLabel>도형</InputLabel>
            <Select
              value={shapeType}
              defaultValue={SHAPE_TYPE.RECT}
              label="SHAPE"
              onChange={handleShapeChange}
            >
              <MenuItem value={SHAPE_TYPE.RECT}>사각형</MenuItem>
              <MenuItem value={SHAPE_TYPE.TRIANGLE}>삼각형</MenuItem>
              <MenuItem value={SHAPE_TYPE.CIRCLE}>원</MenuItem>
              <MenuItem value={SHAPE_TYPE.LINE}>선</MenuItem>
            </Select>
          </FormControl>
        </BoxWrapper>
      </Section>
      <Section>
        <BoxWrapper>
          <span>Outline</span>
          <ToggleButton
            value="check"
            selected={shapeOutlineSelected}
            style={{ height: '30px', width: '30px' }}
            onChange={handleOutlineChange}
          >
            <CheckIcon />
          </ToggleButton>
        </BoxWrapper>
        <BoxWrapper>
          <span>Color</span>
          <ColorPicker
            defaultValue="#000"
            value={shapeColor}
            onChange={handleColorChange}
          />
        </BoxWrapper>
      </Section>
      <Section
        style={{ display: shapeType === SHAPE_TYPE.LINE ? 'block' : 'none' }}
      >
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native1"
            style={{ width: '100px' }}
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
              style={{ flex: 1 }}
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
            style={{ width: '100px' }}
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
              style={{ flex: 1 }}
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
            style={{ width: '100px' }}
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
              style={{ flex: 1 }}
            >
              <option value={LINE_JOIN_TYPE.BEVEL}>bevel</option>
              <option value={LINE_JOIN_TYPE.ROUND}>round</option>
              <option value={LINE_JOIN_TYPE.MITER}>miter</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
      </Section>
      <Divider orientation="vertical" flexItem />
    </Container>
  );
};

export default MenuComponent;
