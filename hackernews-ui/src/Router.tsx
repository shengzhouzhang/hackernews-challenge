import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { Stories } from 'src/views/Stories/Stories';
import { Comments } from 'src/views/Comments/Comments';

import 'src/App.css';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/story/:storyId" >
        <Comments />
      </Route>
      <Route path="/" >
        <Stories />
      </Route>
    </Switch>
  </BrowserRouter>
);