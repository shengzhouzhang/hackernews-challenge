import { useState, useEffect } from 'react';
import { Comment } from '../types/comment';

import { fetchCommentsWithCache } from '../services/bff';

interface Response {
  data: {
    comments: Comment[],
  } | null,
  error: Error | null,
  loading: boolean,
}

export const useComments = (id: number): Response => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchCommentsWithCache(id.toString())
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { data: !loading && !error ? { comments } : null, loading, error };
};