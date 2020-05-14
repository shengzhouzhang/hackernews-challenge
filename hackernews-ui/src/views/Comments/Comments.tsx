import React from 'react';
import { useParams } from 'react-router-dom';

import { useComments } from '../../hooks/useComments/useComments';
import { App } from '../../components/App/App';
import { Comment } from '../../components/Comment/Comment';
import { Link } from '../../components/Link/Link';

export const Comments = () => {
  const { storyId } = useParams();
  
  
  const { data, error } = useComments(storyId);

  if(error) {
    return (<App>Something went wrong</App>);
  }

  return (
    <App>
      <Link to="/">&lt;&lt; back</Link>
      {
        data?.comments.map((comment) => (
          <Comment
            key={`comment-${comment.id}`}
            {...comment}
          />
        ))
      }
    </App>
  )
};