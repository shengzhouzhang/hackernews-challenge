import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { useStories } from 'src/hooks/useStories/useStories';
import { Stories } from './Stories';

jest.mock('src/hooks/useStories/useStories');

describe('Stories component', () => {
  const stories = [
    {
      by: 'dhouston',
      descendants: 71,
      id: 8863,
      kids: [ 8952 ],
      score: 111,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    },
  ];

  test('should render title, by, score, and comments', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: { stories },
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>,
    );

    expect(getByText(stories[0].title)).toBeInTheDocument();
    expect(getByText(`${stories[0].score} points`)).toBeInTheDocument();
    expect(getByText(`by ${stories[0].by}`)).toBeInTheDocument();
    expect(getByText(`${stories[0].descendants} comments`)).toBeInTheDocument();
  });

  test('should render loading status', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const { getByText } = render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>,
    );

    expect(getByText('loading...')).toBeInTheDocument();
  });

  test('should render error status', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error('test'),
    });

    const { getByText } = render(
      <BrowserRouter>
        <Stories />
      </BrowserRouter>,
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});
