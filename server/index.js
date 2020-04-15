const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router);

port = 3001;
app.listen(port, () => {
  console.log(`listening on ${port}`); // eslint-disable-line no-console
});