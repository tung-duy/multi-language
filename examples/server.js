const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { join } = require('path');
require('../dist').multiLanguageBe(app, join(__dirname, 'locales'));

app.get('/', (req, res) => {
  req.i18n.changeLanguage("vi"); // will not load that!!! assert it was preloaded
  var translation = req.t("test");

  res.json({ translation });
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})