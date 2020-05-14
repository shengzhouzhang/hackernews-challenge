import { Request, Response } from 'express';

import { fetchStories } from '../services/hackernews';

export const stories = async (req: Request, res: Response) => {
  const stories = await fetchStories();
  res.json(stories);
};