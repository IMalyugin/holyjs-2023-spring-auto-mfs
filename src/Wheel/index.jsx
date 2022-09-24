import React from 'react';

import wheelSrc from './assets/wheel-white.png';
import styles from './styles.pcss';


export const Wheel = ({ className }) => (
  <div className={`${styles.component} ${className}`}>
    <img src={wheelSrc} alt="" />
  </div>
);
