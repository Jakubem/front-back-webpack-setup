const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

const PORT = 5500;

app.use(express.static('dist/public'))

// send error page
app.use(function(req, res, next) {
  if(res.status(404)){
    res.send(
        '404'
    );
  }
});

// start server on specified port
http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});