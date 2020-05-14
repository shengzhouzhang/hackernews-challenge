import React, { ReactNode } from 'react';
import style from './App.module.css';

interface Props {
  children: ReactNode,
}

export const App = ({ children }: Props) => (
  <div className={style.app}>
    <div className={style.content}>{ children }</div>
  </div>
);