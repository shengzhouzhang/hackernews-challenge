import React from 'react';
import classNames from 'classnames';
import fromNow from 'fromnow';

import styles from './Time.module.css';

interface Props {
  className?: string;
  children: number;
}

export const Time = ({ className, children }: Props) => (
  <div className={classNames(styles.time, className)}>{fromNow(children * 1000, { zero: false, max: 1 })} ago</div>
);
