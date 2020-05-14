import { renderHook } from '@testing-library/react-hooks'; 

import { fetchStoryWithCache } from '../services/bff';

import { useStories } from './useStories';

jest.mock('../services/bff');

describe('useComments', () => {
  const stories = [
    {
      "by" : "dhouston",
      "descendants" : 71,
      "id" : 8863,
      "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
      "score" : 111,
      "time" : 1175714200,
      "title" : "My YC app: Dropbox - Throw away your USB drive",
      "type" : "story",
      "url" : "http://www.getdropbox.com/u/2/screencast.html"
    }
  ];

  beforeEach(() => {
    (fetchStoryWithCache as jest.Mock).mockReset();
  });

  test('should load stories', async () => {
    (fetchStoryWithCache as jest.Mock).mockResolvedValueOnce(stories);
    const { result, waitForNextUpdate } = renderHook(() => useStories());

    expect(fetchStoryWithCache).toHaveBeenCalledTimes(1);
    expect(fetchStoryWithCache).toHaveBeenLastCalledWith();

    expect(result.current.data).toEqual(null);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(null);

    await waitForNextUpdate();
    
    expect(result.current.data?.stories).toEqual(stories);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(null);
  });

  test('should return error', async () => {
    const error = new Error('test');
    (fetchStoryWithCache as jest.Mock).mockRejectedValue(error);
    const { result, waitForNextUpdate } = renderHook(() => useStories());

    expect(fetchStoryWithCache).toHaveBeenCalledTimes(1);
    expect(fetchStoryWithCache).toHaveBeenLastCalledWith();
    
    expect(result.current.data).toEqual(null);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(null);

    await waitForNextUpdate();
    
    expect(result.current.data).toEqual(null);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(error);
  });
});