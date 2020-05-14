import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';

import { Story } from './Story';

describe('Story component', () => {
  const story = {
    "by" : "dhouston",
    "descendants" : 71,
    "id" : 8863,
    "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
    "score" : 111,
    "time" : 1175714200,
    "title" : "My YC app: Dropbox - Throw away your USB drive",
    "type" : "story",
    "url" : "http://www.getdropbox.com/u/2/screencast.html"
  };

  test('should render id, title, time, by, score, and descendants', () => {
    const { getByText } = render(<BrowserRouter><Story {...story} /></BrowserRouter>);

    expect(getByText(story.title)).toBeInTheDocument();
    expect(getByText(`${story.score} points`)).toBeInTheDocument();
    expect(getByText(`by ${story.by}`)).toBeInTheDocument();
    expect(getByText(`${story.descendants} comments`)).toBeInTheDocument();
  });
});