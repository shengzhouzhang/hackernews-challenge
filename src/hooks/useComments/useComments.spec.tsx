import { renderHook } from '@testing-library/react-hooks'; 

import { fetchCommentsWithCache } from 'src/services/hackernews';

import { useComments } from './useComments';

jest.mock('src/services/hackernews');

describe('useComments', () => {
  const storyId = 8863;
  const comments = [
    {
      "by" : "norvig",
      "id" : 2921983,
      "kids" : [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ],
      "parent" : 2921506,
      "text" : "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
      "time" : 1314211127,
      "type" : "comment"
    }
  ];

  beforeEach(() => {
    (fetchCommentsWithCache as jest.Mock).mockReset();
  });

  test('should load comments', async () => {
    (fetchCommentsWithCache as jest.Mock).mockResolvedValueOnce(comments);
    const { result, waitForNextUpdate } = renderHook(() => useComments(storyId));

    expect(fetchCommentsWithCache).toHaveBeenCalledTimes(1);
    expect(fetchCommentsWithCache).toHaveBeenLastCalledWith('8863');

    expect(result.current.data).toEqual(null);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(null);

    await waitForNextUpdate();
    
    expect(result.current.data?.comments).toEqual(comments);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(null);
  });

  test('should return error', async () => {
    const error = new Error('test');
    (fetchCommentsWithCache as jest.Mock).mockRejectedValue(error);
    const { result, waitForNextUpdate } = renderHook(() => useComments(storyId));

    expect(fetchCommentsWithCache).toHaveBeenCalledTimes(1);
    expect(fetchCommentsWithCache).toHaveBeenLastCalledWith('8863');
    
    expect(result.current.data).toEqual(null);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(null);

    await waitForNextUpdate();
    
    expect(result.current.data).toEqual(null);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(error);
  });
});