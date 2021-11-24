const express = require('express');
const app = express();
const helmet = require('helmet');
//Set maxAge variable:
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// Hide X-Powered-By: Express
app.use(helmet.hidePoweredBy());
// Mitigate the Risk of Clickjacking
app.use(helmet.frameguard({
    action: "deny"
  })
);
// Mitigate the Risk of Cross Site Scripting (XSS) Attacks
app.use(helmet.xssFilter());
// Avoid Inferring the Response MIME Type
app.use(helmet.noSniff());
// Prevent IE from Opening Untrusted HTML
app.use(helmet.ieNoOpen());
// Ask Browsers to Access Your Site via HTTPS Only
app.use(helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: 'true'
  })
);
// Disable DNS Prefetching
app.use(helmet.dnsPrefetchControl());
// Disable Client-Side Caching
app.use(helmet.noCache());
// Set a Content Security Policy
app.use(helmet.contentSecurityPolicy({
    useDefaults: false,
    directives:{
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com']
    },
  })
)

/***********************************************/

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
