import React from 'react';
import classNames from 'classnames';

import styles from './Author.module.css';

interface Props {
  className?: string;
  children: string;
}

export const Author = ({ className, children }: Props) => (
  <div className={classNames(styles.author, className)}>{children}</div>
);
