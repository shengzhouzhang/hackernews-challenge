import { useState, useEffect } from 'react';
import { Story } from 'src/types/story';

import { fetchStoryWithCache } from 'src/services/bff';

interface Response {
  data: {
    stories: Story[],
  } | null,
  error: Error | null,
  loading: boolean,
}

export const useStories = (): Response => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetchStoryWithCache()
      .then((stories) => {
        setStories(stories);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data: !loading && !error ? { stories } : null, loading, error };
};