import '@testing-library/jest-dom';

import React from 'react';
import { render } from '@testing-library/react';

import { Comment } from './Comment';

jest.mock('src/hooks/useStories/useStories');

describe('Story component', () => {
  const comment = {
    by: 'norvig',
    id: 2921983,
    kids: [],
    parent: 2921506,
    text: 'hello',
    time: 1314211127,
    type: 'comment',
  };

  test('should render text and the author', () => {
    const { getByText } = render(<Comment {...comment} />);

    expect(getByText(comment.text)).toBeInTheDocument();
    expect(getByText(comment.by)).toBeInTheDocument();
  });
});
