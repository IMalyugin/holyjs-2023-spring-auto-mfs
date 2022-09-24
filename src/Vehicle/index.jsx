import React from 'react';

import { Wheel } from '../Wheel';

import carSrc from './assets/car-yellow.png';
import styles from './styles.pcss';

export const Vehicle = () => (
  <div className={styles.component}>
    <div className={styles.mainframe}>
      <img src={carSrc}  alt="" />
    </div>
    <Wheel className={`${styles.wheel} ${styles.front}`} />
    <Wheel className={`${styles.wheel} ${styles.back}`} />
  </div>
);
