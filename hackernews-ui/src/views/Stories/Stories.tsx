import React from 'react';

import { useStories } from '../../hooks/useStories/useStories';
import { App } from '../../components/App/App';
import { Story } from '../../components/Story/Story';

export const Stories = () => {
  const { data, error, loading } = useStories();
  
  if (loading) {
    return (<App>loading...</App>)
  }

  if (error) {
    return (<App>something went wrong</App>)
  }

  return (
    <App>
      {
        data?.stories.map(({ id, title, descendants, time, by, score }) => (
          <Story 
            key={`story-${id}`}
            id={id}
            title={title} 
            descendants={descendants} 
            time={time}
            by={by}
            score={score}
          />
        ))
      }
    </App>
  )
};