const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { join } = require('path');
const { setLanguageBe } = require('../dist');
require('../dist').multiLanguageBe(app, join(__dirname, 'locales'));

app.use(setLanguageBe);

app.get('/', (req, res) => {
  var translation = req.t("test");
  res.json({ translation });
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})