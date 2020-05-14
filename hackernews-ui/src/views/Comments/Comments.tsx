import React from 'react';
import { useParams } from 'react-router-dom';

import { useComments } from '../../hooks/useComments/useComments';
import { App } from '../../components/App/App';
import { Comment } from '../../components/Comment/Comment';
import { Link } from '../../components/Link/Link';

export const Comments = () => {
  const { storyId } = useParams();
  const { data, error, loading } = useComments(storyId);

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
      { loading ? (<div>loading...</div>) : null }
      { !!error ? (<div>Something went wrong</div>) : null }
    </App>
  )
};