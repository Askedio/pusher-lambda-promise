# pusher-lambda-promise
A basic pusher trigger for AWS Lambda using promises.

Related to https://github.com/pusher/pusher-http-node/issues/67

# Installation

```javascript
npm install --save pusher-lambda-promise
```


# Usage
Require the module, and initialize Pusher with settings.

```javascript
const Pusher = require('pusher-lambda-promise');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER
});
```

Trigger single event

```javascript
pusher.trigger('update', 'private-channel', {
    foo: 'foo',
    bar: 'bar'
}).then((results) => {
    console.log(results);
}).catch((error) => {
    console.error(error);
});
```

Trigger batch events

```javascript
const batch = [
    {
        foo: 'foo',
        bar: 'bar'
    },
    {
        foo: 'foo',
        bar: 'bar'
    }
];

pusher.trigger(batch)
.then((results) => {
    console.log(results);
}).catch((error) => {
    console.error(error);
});
```