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
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Color, ColorPicker } from 'material-ui-color';
import { SHAPE_TYPE, GLOBAL_MENU_TYPE } from '../constants';
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

  return (
    <Container>
      <Section>
        <BoxWrapper>
          <FormControl fullWidth>
            <InputLabel>도형</InputLabel>
            <Select
              value={shapeType}
              label="SHAPE"
              onChange={handleShapeChange}
            >
              <MenuItem value={SHAPE_TYPE.RECT}>사각형</MenuItem>
              <MenuItem value={SHAPE_TYPE.TRIANGLE}>삼각형</MenuItem>
              <MenuItem value={SHAPE_TYPE.CIRCLE}>원</MenuItem>
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
    </Container>
  );
};

export default MenuComponent;
