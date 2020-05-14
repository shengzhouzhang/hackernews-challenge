import { Request, Response } from 'express';

import { fetchStories } from 'src/services/hackernews';

export const stories = async (req: Request, res: Response): Promise<void> => {
  try {
    const stories = await fetchStories();
    res.json(stories);
  } catch (error) {
    console.error('failed to fetch stories', error);
    res.status(500).json({
      error: 'failed to fetch stories',
    });
  }
};
