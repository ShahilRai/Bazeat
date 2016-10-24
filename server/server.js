import Express from 'express';
import ExpressStrompath from 'express-stormpath';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
// import IntlWrapper from '../client/modules/Intl/IntlWrapper';
// import twilio from 'twilio';
import nodeMailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();
// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  // app.use(webpackHotMiddleware(compiler));
}

console.log(__dirname)
app.use('/css', Express.static(path.resolve(__dirname, '../client/css')));
// app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/javascript', Express.static(path.resolve(__dirname, '../client/javascript')));
// React And Redux Setup
// import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
// import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import users from './routes/user.routes';
import producers from './routes/producer.routes';
import orders from './routes/order.routes';
import products from './routes/product.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use('/api', posts);
app.use('/api', users);
app.use('/api', producers);
app.use('/api', orders);
app.use('/api/producers', products);
app.use(ExpressStrompath.init(app, {
  expand: {
    customData: true
  }
}));

// let client = new twilio.RestClient(process.env.TwilioSid, process.env.TwilioToken);

// client.sms.messages.create({
//     to:'+917840827410',
//     from:'+16318134710',
//     body:'ahoy hoy! Testing Twilio and node.js'
// }, function(error, message) {
//     // The HTTP request to Twilio will run asynchronously. This callback
//     // function will be called when a response is received from Twilio
//     // The "error" variable will contain error information, if any.
//     // If the request was successful, this value will be "falsy"
//     if (!error) {
//         // The second argument to the callback will contain the information
//         // sent back by Twilio for the request. In this case, it is the
//         // information about the text messsage you just sent:
//         console.log('Success! The SID for this SMS message is:');
//         console.log(message.sid);

//         console.log('Message sent on:');
//         console.log(message.dateCreated);
//     } else {
//         console.log(error);
//         console.log('Oops! There was an error.');
//     }
// });

app.on('ExpressStrompath.ready', () => {
  // console.log('Stormpath Ready');
});

// const transport = nodeMailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: process.env.MandrilKey
//   }
// }));

// transport.sendMail({
//   from: 'sender@example.com',
//   to: 'user@example.com',
//   subject: 'Hello',
//   html: '<p>How are you?</p>'
// },
// function (err, info) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(info);
//   }
// });


// Render Initial HTML
// const renderFullPage = (html, initialState) => {
//   const head = Helmet.rewind();

//   // Import Manifests
//   const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
//   const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

//   return `
//     <!doctype html>
//     <html>
//       <head>
//         ${head.base.toString()}
//         ${head.title.toString()}
//         ${head.meta.toString()}
//         ${head.link.toString()}
//         ${head.script.toString()}

//         ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
//         <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
//         <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
//       </head>
//       <body>
//         <div id="root">${html}</div>
//         <script>
//           window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
//           ${process.env.NODE_ENV === 'production' ?
//           `//<![CDATA[
//           window.webpackManifest = ${JSON.stringify(chunkManifest)};
//           //]]>` : ''}
//         </script>
//         <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
//         <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
//       </body>
//     </html>
//   `;
// };

// const renderError = err => {
//   const softTab = '&#32;&#32;&#32;&#32;';
//   const errTrace = process.env.NODE_ENV !== 'production' ?
//     `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
//   return renderFullPage(`Server Error${errTrace}`, {});
// };

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/html/index.html'));
});

// Server Side Rendering based on routes matched by React-router.
// app.use((req, res, next) => {
//   match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
//     if (err) {
//       return res.status(500).end(renderError(err));
//     }

//     if (redirectLocation) {
//       return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     }

//     if (!renderProps) {
//       return next();
//     }

//     const store = configureStore();

//     return fetchComponentData(store, renderProps.components, renderProps.params)
//       .then(() => {
//         const initialView = renderToString(
//           <Provider store={store}>
//             <IntlWrapper>
//               <RouterContext {...renderProps} />
//             </IntlWrapper>
//           </Provider>
//         );
//         const finalState = store.getState();

//         res
//           .set('Content-Type', 'text/html')
//           .status(200)
//           .end(renderFullPage(initialView, finalState));
//       })
//       .catch((error) => next(error));
//   });
// });

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
