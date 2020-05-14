import React, { useState, useCallback, SyntheticEvent, Fragment } from 'react';
import { Author } from 'src/components/Author/Author';
import { Time } from 'src/components/Time/Time';
import { Fold } from 'src/components/Fold/Fold';

import styles from './Comment.module.css';

interface Props {
  id: number,
  text: string,
  by: string,
  time: number,
  kids?: number[],
  comments?: Props[],
}

export const Comment = ({ text, by, time, comments = [] }: Props) => {
  const [ isFolded, setIsFolded ] = useState(false);

  const handleClick = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    setIsFolded(!isFolded);
  }, [isFolded]);

  return (
    <div className={styles.comment}>
      <Author>{by}</Author>
      <Time>{time}</Time>
      <Fold
        onClick={handleClick} 
        isFolded={isFolded} 
        count={1 + comments.length}
      />
      {
        !isFolded ? (
          <Fragment>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
            <div className={styles.kids}>
              {
                comments.map((comment) => (
                  <Comment
                    key={`comment-${comment.id}`}
                    {...comment}
                  />
                ))
              }
            </div>
          </Fragment>
        ) : null
      }
    </div>
  );
}