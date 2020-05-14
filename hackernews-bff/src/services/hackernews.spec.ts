import { fetch } from 'src/services/fetch';
import { fetchStories, fetchCommentsByStoryId } from './hackernews';

jest.mock('./fetch');

const story = {
  by: 'dhouston',
  descendants: 71,
  id: 8863,
  kids: new Array(30).fill(8952),
  score: 111,
  time: 1175714200,
  title: 'My YC app: Dropbox - Throw away your USB drive',
  type: 'story',
  url: 'http://www.getdropbox.com/u/2/screencast.html',
};

const comment = {
  by: 'norvig',
  id: 2921983,
  kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
  parent: 2921506,
  text:
    "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  time: 1314211127,
  type: 'comment',
};

describe('fetchStories', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  test('should fetch top 10 stories', async () => {
    (fetch as jest.Mock).mockReturnValueOnce(Promise.resolve({ json: () => new Array(20).fill(8863) }));
    (fetch as jest.Mock).mockReturnValue(Promise.resolve({ json: () => story }));

    const expectd = new Array(10).fill(story);
    const result = await fetchStories();

    expect(fetch).toHaveBeenCalledTimes(11);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://hacker-news.firebaseio.com/v0/topstories.json');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://hacker-news.firebaseio.com/v0/item/8863.json');
    expect(result).toEqual(expectd);
  });
});

describe('fetchCommentsByStoryId', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  test('should fetch 20 comments', async () => {
    (fetch as jest.Mock).mockReturnValueOnce(Promise.resolve({ json: () => story }));
    (fetch as jest.Mock).mockReturnValue(Promise.resolve({ json: () => comment }));

    const expectd = new Array(20).fill(comment);
    const result = await fetchCommentsByStoryId('8863');

    expect(fetch).toHaveBeenCalledTimes(21);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://hacker-news.firebaseio.com/v0/item/8863.json');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://hacker-news.firebaseio.com/v0/item/8952.json');
    expect(result).toEqual(expectd);
  });
});
