import express from 'express';
import cors from 'cors';

import { stories } from 'src/routes/stories';
import { comments } from 'src/routes/comments';

const app = express();
const port = 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.get('/', stories);
app.get('/story/:storyId/comments', comments);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
