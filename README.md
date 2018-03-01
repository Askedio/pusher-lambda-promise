# pusher-lambda-promise
A basic pusher trigger for AWS Lambda using promises.

Related to https://github.com/pusher/pusher-http-node/issues/67

```javascript

  require('pusher-lambda-promise')({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER
  })('update', 'private-channel', {
    status: 'status'
  }).then((results) => {
    cb(null, data);
  }).catch((error) => {
    cb(error);
  });

```
