import express from 'express';
import { stories } from './routes/stories';
import { comments } from './routes/comments';

const app = express();
const port = 8080;

app.get('/', stories);
app.get('/story/:storyId/comments', comments);

app.listen(port, () => {
  console.log( `server started at http://localhost:${port}` );
});