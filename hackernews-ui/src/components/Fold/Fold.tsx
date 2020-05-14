import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';

import styles from './Fold.module.css';

interface Props {
  className?: string;
  isFolded?: boolean;
  count: number;
  onClick: (event: SyntheticEvent) => void;
}

export const Fold = ({ className, onClick, isFolded = false, count }: Props) => (
  <button className={classNames(styles.fold, className)} onClick={onClick}>
    {`[${isFolded ? `${count} more` : ' - '}]`}
  </button>
);
