import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';

import { useComments } from '../../hooks/useComments/useComments';

import { Comments } from './Comments';

jest.mock('../../hooks/useComments/useComments');

describe('Comments component', () => {
  const comments = [{
    "by" : "norvig",
    "id" : 2921983,
    "kids" : [ ],
    "parent" : 2921506,
    "text" : "hello",
    "time" : 1314211127,
    "type" : "comment"
  }];

  test('should render back button, text and the author', () => {
    (useComments as jest.Mock).mockReturnValue({ data: { comments }, loading: false, error: null });

    const { getByText } = render(<BrowserRouter><Comments /></BrowserRouter>);

    expect(getByText('<< back')).toBeInTheDocument();
    expect(getByText(comments[0].text)).toBeInTheDocument();
    expect(getByText(comments[0].by)).toBeInTheDocument();
  });

  test('should render loading status', () => {
    (useComments as jest.Mock).mockReturnValue({ data: null, loading: true, error: null });

    const { getByText } = render(<BrowserRouter><Comments /></BrowserRouter>);
    
    expect(getByText('loading...')).toBeInTheDocument();
  });

  test('should render error status', () => {
    (useComments as jest.Mock).mockReturnValue({ data: null, loading: false, error: new Error('test') });

    const { getByText } = render(<BrowserRouter><Comments /></BrowserRouter>);
    
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});