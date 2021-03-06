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
import ImageMenuComponent from './ImageMenuComponent';
import { useAtom } from 'jotai';
import { shapeLength } from '../states';

const MenuComponent = ({ meta, handleGlobalSetting }: ViewProps) => {
  const [shapeType, setShapeType] = useState<string>(meta.globalState.type);
  const [shapeColor, setShapeColor] = useState<string>(meta.globalState.color);
  const [shapeOutlineSelected, setShapeOutlineSelected] = useState<boolean>(
    meta.globalState.outline,
  );
  const [gradientSelected, setGradientSelected] = useState<boolean>(
    meta.globalState.gradient,
  );
  const [length] = useAtom(shapeLength);

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

  const handleGradientChange = () => {
    setGradientSelected(!gradientSelected);
    handleGlobalSetting(GLOBAL_MENU_TYPE.SHAPE.GRADIENT, !gradientSelected);
  };

  return (
    <Container style={{ height: `${MENU_HEIGHT}px` }}>
      <Section>
        <BoxWrapper>
          <FormControl fullWidth>
            <InputLabel>??????</InputLabel>
            <Select
              value={shapeType}
              defaultValue={SHAPE_TYPE.RECT}
              label="SHAPE"
              onChange={handleShapeChange}
            >
              <MenuItem value={SHAPE_TYPE.RECT}>?????????</MenuItem>
              <MenuItem value={SHAPE_TYPE.TRIANGLE}>?????????</MenuItem>
              <MenuItem value={SHAPE_TYPE.CIRCLE}>???</MenuItem>
              <MenuItem value={SHAPE_TYPE.LINE}>???</MenuItem>
              <MenuItem value={SHAPE_TYPE.TEXT}>?????????</MenuItem>
              <MenuItem value={SHAPE_TYPE.IMAGE}>?????????</MenuItem>
            </Select>
          </FormControl>
        </BoxWrapper>
        <BoxWrapper>
          <p>????????? ??????: {length}</p>
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
        <BoxWrapper>
          <span>Gradient</span>
          <ToggleButton
            value="check"
            selected={gradientSelected}
            style={{ height: '30px', width: '30px' }}
            onChange={handleGradientChange}
          >
            <CheckIcon />
          </ToggleButton>
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
      <ImageMenuComponent
        meta={meta}
        handleGlobalSetting={handleGlobalSetting}
      />
    </Container>
  );
};

export default MenuComponent;
