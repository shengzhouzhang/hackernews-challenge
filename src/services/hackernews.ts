import { Story } from 'src/types/story';
import { Comment } from 'src/types/comment';

export const fetchItem = <T>(id: string): Promise<T> => 
  fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(response => response.json());

export const fetchComment = <T>(id: string, isEnough: boolean): Promise<T | null> => 
  isEnough ? Promise.resolve(null) : fetchItem(id);

export const fetchStories = (): Promise<Story[]> => 
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => response.json())
    .then((ids: number[]) => ids.slice(0, 10))
    .then((ids) => Promise.all(ids.map((id) => fetchItem<Story>(id.toString()))));

export const fetchComments = async (ids: number[] = [], counter = { value: 20 }): Promise<Comment[]> => {
  const comments = ids.slice(0, 20).map((id) => 
      fetchComment<Comment>(id.toString(), counter.value-- <= 0)
        .then(async (comment: Comment | null) => {
          if(comment !== null) {
            comment.comments = comment.kids ? await fetchComments(comment.kids, counter) : undefined;
          }
          return comment;
        })
      );

  return await Promise.all(comments)
    .then(comments => {
      return comments.filter(item => item !== null) as Comment[]
    });
}

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

  const data = await fetchItem<Story>(id)
    .then(({ kids }) => fetchComments(kids));

  comments.set(id, data);
  return data;
}