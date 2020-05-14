import { Request, Response } from 'express';
import { fetchCommentsByStoryId } from '../services/hackernews';

export const comments = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const comments = await fetchCommentsByStoryId(storyId);
    res.json(comments);
  } catch (error) {
    console.error('failed to fetch comments', error);
    res.status(500).json({
      error: 'failed to fetch comments',
    });
  }
};