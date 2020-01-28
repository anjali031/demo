const express = require('express');
const app = express();
const path = require('path');
const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
}
app.use(express.static(__dirname + 'dist/deploy'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/deploy/src/index.html'));
});

app.listen(process.env.PORT || 8080);