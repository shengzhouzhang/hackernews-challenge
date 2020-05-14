import { Request, Response } from 'express';
import { fetchCommentsByStoryId } from '../services/hackernews';

export const comments = async (req: Request, res: Response) => {
  const { storyId } = req.params;
  const comments = await fetchCommentsByStoryId(storyId);
  res.json(comments);
};