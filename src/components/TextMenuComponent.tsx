import React, { useMemo, useState } from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';
import {
  GLOBAL_MENU_TYPE,
  SHAPE_TYPE,
  TEXT_ALIGN,
  TEXT_BASELINE,
  TEXT_DIRECTION,
  TEXT_FONT,
} from '../constants';
import { ViewProps } from '../types';
import { Section, BoxWrapper, Container } from './base/Common';

const TextMenuComponent = ({ meta, handleGlobalSetting }: ViewProps) => {
  const [textSize, setTextSize] = useState<number>(meta.globalState.text.size);
  const [textValue, setTextValue] = useState<string>(
    meta.globalState.text.value,
  );

  const isVisible = useMemo<boolean>(
    () => meta.globalState.type === SHAPE_TYPE.TEXT,
    [meta],
  );

  const handleTextValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTextValue(event.target.value);
    handleGlobalSetting(GLOBAL_MENU_TYPE.TEXT.VALUE, event.target.value);
  };

  const handleTextSizeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const size = Number(event.target.value);
    setTextSize(size);
    handleGlobalSetting(GLOBAL_MENU_TYPE.TEXT.SIZE, size);
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLSelectElement> | undefined,
  ) => {
    switch (event?.target.name) {
      case 'Text Name':
        handleGlobalSetting(GLOBAL_MENU_TYPE.TEXT.NAME, event?.target.value);
        break;
      case 'Text Align':
        handleGlobalSetting(GLOBAL_MENU_TYPE.TEXT.ALIGN, event?.target.value);
        break;
      case 'Text BaseLine':
        handleGlobalSetting(
          GLOBAL_MENU_TYPE.TEXT.BASELINE,
          event?.target.value,
        );
        break;
      case 'Text Direction':
        handleGlobalSetting(
          GLOBAL_MENU_TYPE.TEXT.DIRECTION,
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
            Text Value
          </InputLabel>
          <Input fullWidth value={textValue} onChange={handleTextValueChange} />
        </BoxWrapper>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native2"
            style={{ width: '150px' }}
          >
            Text Name
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={TEXT_FONT.ARIAL}
              inputProps={{
                name: 'Text Name',
                id: 'uncontrolled-native2',
              }}
              onChange={handleTextChange}
            >
              <option value={TEXT_FONT.ARIAL}>{TEXT_FONT.ARIAL}</option>
              <option value={TEXT_FONT.VERDANA}>{TEXT_FONT.VERDANA}</option>
              <option value={TEXT_FONT.HELVETICA}>{TEXT_FONT.HELVETICA}</option>
              <option value={TEXT_FONT.TAHOMA}>{TEXT_FONT.TAHOMA}</option>
              <option value={TEXT_FONT.TREBUCHET}>{TEXT_FONT.TREBUCHET}</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native3"
            style={{ width: '150px' }}
          >
            Text Align
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={TEXT_ALIGN.START}
              inputProps={{
                name: 'Text Align',
                id: 'uncontrolled-native2',
              }}
              onChange={handleTextChange}
            >
              <option value={TEXT_ALIGN.START}>{TEXT_ALIGN.START}</option>
              <option value={TEXT_ALIGN.END}>{TEXT_ALIGN.END}</option>
              <option value={TEXT_ALIGN.LEFT}>{TEXT_ALIGN.LEFT}</option>
              <option value={TEXT_ALIGN.RIGHT}>{TEXT_ALIGN.RIGHT}</option>
              <option value={TEXT_ALIGN.CENTER}>{TEXT_ALIGN.CENTER}</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
      </Section>
      <Section>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native1"
            style={{ width: '150px' }}
          >
            Text Size
          </InputLabel>
          <TextField
            fullWidth
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={textSize}
            onChange={handleTextSizeChange}
            variant="outlined"
            size="small"
            label="number"
          />
        </BoxWrapper>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native4"
            style={{ width: '250px' }}
          >
            Text BaseLine
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={TEXT_BASELINE.ALPHABETIC}
              inputProps={{
                name: 'Text BaseLine',
                id: 'uncontrolled-native4',
              }}
              onChange={handleTextChange}
            >
              <option value={TEXT_BASELINE.ALPHABETIC}>
                {TEXT_BASELINE.ALPHABETIC}
              </option>
              <option value={TEXT_BASELINE.BOTTOM}>
                {TEXT_BASELINE.BOTTOM}
              </option>
              <option value={TEXT_BASELINE.HANGING}>
                {TEXT_BASELINE.HANGING}
              </option>
              <option value={TEXT_BASELINE.IDEOGRAPHIC}>
                {TEXT_BASELINE.IDEOGRAPHIC}
              </option>
              <option value={TEXT_BASELINE.MIDDLE}>
                {TEXT_BASELINE.MIDDLE}
              </option>
              <option value={TEXT_BASELINE.TOP}>{TEXT_BASELINE.TOP}</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
        <BoxWrapper>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native5"
            style={{ width: '250px' }}
          >
            Text Direction
          </InputLabel>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={TEXT_DIRECTION.INHERIT}
              inputProps={{
                name: 'Text Direction',
                id: 'uncontrolled-native5',
              }}
              onChange={handleTextChange}
            >
              <option value={TEXT_DIRECTION.INHERIT}>
                {TEXT_DIRECTION.INHERIT}
              </option>
              <option value={TEXT_DIRECTION.LTR}>{TEXT_DIRECTION.LTR}</option>
              <option value={TEXT_DIRECTION.RTL}>{TEXT_DIRECTION.RTL}</option>
            </NativeSelect>
          </FormControl>
        </BoxWrapper>
      </Section>
    </Container>
  );
};

export default TextMenuComponent;
