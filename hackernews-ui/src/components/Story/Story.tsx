import React from 'react';

import { Author } from '../Author/Author';
import { Link } from '../Link/Link';
import { Time } from '../Time/Time';

import styles from './Story.module.css';

interface Props {
  id: number;
  title: string;
  descendants: number;
  time: number;
  by: string;
  score: number;
}

export const Story = ({ id, title, time, by, score, descendants }: Props) => {
  return (
    <div className={styles.story}>
      <Link className={styles.title} to={`/story/${id}`}>
        {title}
      </Link>
      <div className={styles.score}>{score} points</div>
      <Author>{`by ${by}`}</Author>
      <Time>{time}</Time>
      <div className={styles.descendants}>{descendants} comments</div>
    </div>
  );
};
