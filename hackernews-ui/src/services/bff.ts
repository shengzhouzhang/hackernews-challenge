import { Story } from '../types/story';
import { Comment } from '../types/comment';

const BFF_URI = 'http://localhost:3001';

export const fetchStories = (): Promise<Story[]> => 
  fetch(BFF_URI).then(response => response.json());

export const fetchCommentsByStoryId = (id: string): Promise<Comment[]> => 
  fetch(`${BFF_URI}/story/${id}/comments`).then(response => response.json());

let stories: Story[] | undefined = undefined;

export const fetchStoryWithCache = async (): Promise<Story[]> => {

  if(stories === undefined) {
    const data = await fetchStories();
    stories = data;
  }

  return stories;
}

const comments = new Map<string, Comment[]>();
  
export const fetchCommentsWithCache = async (id: string): Promise<Comment[]> => {
  const existing = comments.get(id);

  if(existing !== undefined) {
    return existing;
  }

  const data = await fetchCommentsByStoryId(id);

  comments.set(id, data);
  return data;
}