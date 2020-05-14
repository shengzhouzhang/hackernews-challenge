import { fetch } from './fetch';
import { Story } from '../types/story';
import { Comment } from '../types/comment';

const URI = 'https://hacker-news.firebaseio.com/v0';

export const fetchItem = <T>(id: string): Promise<T> =>
  fetch(`${URI}/item/${id}.json`).then((response) => response.json());

export const fetchStories = (): Promise<Story[]> =>
  fetch(`${URI}/topstories.json`)
    .then((response) => response.json())
    .then((ids: number[]) => ids.slice(0, 10))
    .then((ids) => Promise.all(ids.map((id) => fetchItem<Story>(id.toString()))));

export const fetchComment = <T>(id: string, isEnough: boolean): Promise<T | null> =>
  isEnough ? Promise.resolve(null) : fetchItem(id);

export const fetchCommentsAndKids = async (ids: number[] = [], counter = { value: 20 }): Promise<Comment[]> => {
  const comments = ids.slice(0, 20).map((id) =>
    fetchComment<Comment>(id.toString(), counter.value-- <= 0).then(async (comment: Comment | null) => {
      if (comment !== null) {
        comment.comments = comment.kids ? await fetchCommentsAndKids(comment.kids, counter) : undefined;
      }
      return comment;
    }),
  );

  return await Promise.all(comments).then((comments) => {
    return comments.filter((item) => item !== null) as Comment[];
  });
};

export const fetchCommentsByStoryId = (storyId: string): Promise<Comment[]> =>
  fetchItem<Story>(storyId).then(({ kids }) => fetchCommentsAndKids(kids));
