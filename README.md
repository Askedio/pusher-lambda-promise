# pusher-lambda-promise
A basic pusher trigger for AWS Lambda using promises.

Related to https://github.com/pusher/pusher-http-node/issues/67

# Installation

```javascript
npm install --save pusher-lambda-promise
```


# Usage
Require the module, pass settings and data.

```javascript
require('pusher-lambda-promise')({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER
})('update', 'private-channel', {
    status: 'status'
}).then((results) => {
    console.log(results);
}).catch((error) => {
    console.error(results);
});
```
