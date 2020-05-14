import React from 'react';
import { useParams } from 'react-router-dom';
import { useComments } from 'src/hooks/useComments/useComments';
import { App } from 'src/components/App/App';
import { Comment } from 'src/components/Comment/Comment';
import { Link } from 'src/components/Link/Link';

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