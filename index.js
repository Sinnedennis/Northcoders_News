const app = require('./server');
const PORT = require('./config').PORT[process.env.NODE_ENV] || 3000;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`); // eslint-disable-line
});