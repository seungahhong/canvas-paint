import './reset.css';
import { injectGlobal } from '@emotion/css';
import React from 'react';
import CanvasContainer from './containers/CanvasContainer';

injectGlobal`
  html,
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  #root {
    height: 100%;
  }
`;

function App() {
  return <CanvasContainer />;
}

export default App;
