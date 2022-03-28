import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Container = styled.div({
  display: 'flex',
});

export const Section = styled.section({
  padding: '20px',
  boxSizing: 'border-box',
});

export const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: colume;
  align-items: center;
  width: ${(props) => (props.width ? `${props.width}` : '200px')};
  margin-bottom: 10px;

  span {
    display: inline-block;
    margin-right: 10px;
  }
`;
