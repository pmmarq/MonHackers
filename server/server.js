const express = require('express');
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger();

const bodyParser = require('body-parser');

const port = 5000;
const appBaseUrl = '/gh6';

const app = express();
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`${appBaseUrl}/services`, require('./routes'));
app.use(`/`, express.static(path.join(__dirname, '../deploy')));
app.get('/*', (req, res) => {
  res.sendFile((path.join(__dirname, '../deploy/index.html')), {title: 'GlobalHack VI' });
});
var server = app.listen(port, function() {

    logger.info('Started listening on port', port);
});

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.emit('server event', { foo: 'bar' });
    socket.on('client event', function (data) {
        console.log(data);
    });
});