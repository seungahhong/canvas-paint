import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Divider,
  ToggleButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Color, ColorPicker } from 'material-ui-color';
import { SHAPE_TYPE, GLOBAL_MENU_TYPE, MENU_HEIGHT } from '../constants';
import { ViewProps } from '../types';
import { BoxWrapper, Container, Section } from './base/Common';
import ShapeMenuComponent from './ShapeMenuComponent';
import TextMenuComponent from './TextMenuComponent';

const MenuComponent = ({ meta, handleGlobalSetting }: ViewProps) => {
  const [shapeType, setShapeType] = useState<string>(meta.globalState.type);
  const [shapeColor, setShapeColor] = useState<string>(meta.globalState.color);
  const [shapeOutlineSelected, setShapeOutlineSelected] = useState<boolean>(
    meta.globalState.outline,
  );

  const handleShapeChange = (event: SelectChangeEvent<string>) => {
    setShapeType(event.target.value);
    handleGlobalSetting(GLOBAL_MENU_TYPE.TYPE, event.target.value);
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

  return (
    <Container style={{ height: `${MENU_HEIGHT}px` }}>
      <Section>
        <BoxWrapper>
          <FormControl fullWidth>
            <InputLabel>형태</InputLabel>
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
              <MenuItem value={SHAPE_TYPE.TEXT}>텍스트</MenuItem>
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
      <Divider orientation="vertical" flexItem />
      <ShapeMenuComponent
        meta={meta}
        handleGlobalSetting={handleGlobalSetting}
      />
      <TextMenuComponent
        meta={meta}
        handleGlobalSetting={handleGlobalSetting}
      />
    </Container>
  );
};

export default MenuComponent;
