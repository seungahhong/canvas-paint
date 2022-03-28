import React, { useMemo } from 'react';
import { TextField, InputLabel } from '@mui/material';

import { GLOBAL_MENU_TYPE, SHAPE_TYPE } from '../constants';
import { ViewProps } from '../types';
import { Section, BoxWrapper, Container } from './base/Common';

const ImageMenuComponent = ({ meta, handleGlobalSetting }: ViewProps) => {
  const isVisible = useMemo<boolean>(
    () => meta.globalState.type === SHAPE_TYPE.IMAGE,
    [meta],
  );

  const handleImageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const img = new Image();
      img.onload = () => {
        handleGlobalSetting(GLOBAL_MENU_TYPE.IMAGE, img);
      };

      img.src = URL.createObjectURL(files[0] as any);
    }
  };

  return (
    <Container style={{ display: isVisible ? 'flex' : 'none' }}>
      <Section>
        <BoxWrapper width="500px">
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native1"
            style={{ width: '150px' }}
          >
            Image Loader
          </InputLabel>
          <TextField
            name="upload-photo"
            type="file"
            onChange={handleImageChange}
            inputProps={{
              accept: 'image/png, image/jpeg, image/gif',
            }}
          />
        </BoxWrapper>
      </Section>
    </Container>
  );
};

export default ImageMenuComponent;
