import React from 'react';

import roadSrc from './assets/road-autumn.jpg';
import styles from './styles.pcss';

export const Landscape = ({ children }) => (
  <div className={styles.container} style={{ backgroundImage: `url('${roadSrc}')` }}>
    {children}
  </div>
);
