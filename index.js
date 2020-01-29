const axios = require('axios');
const md5 = require('md5');
const sha256 = require('js-sha256');
const qs = require('qs');

function Pusher(settings) {
    this.AUTH_VERSION = '1.0';
    this.TIMEOUT = settings.timeout || 5 * 1000;
    this.appId = settings.appId;
    this.key = settings.key;
    this.secret = settings.secret;
    this.cluster = settings.cluster;
}

const trigger = function(name, channel, data, socketId = null) {
    const body = {
        name,
        channel,
        data: JSON.stringify(data),
        ...socketId && { socket_id: socketId },
    };
    
    return this.dispatch(body);
};

const triggerBatch = function(data) {

    const mappedData = data.map((event) => {
        event.data = JSON.stringify(event.data);
        return event;
    });

    const batch = {
        batch: mappedData,
    };

    return this.dispatch(batch, 'batch_events');
};

const dispatch = function(body, type = 'events') {
    const timestamp = Math.round(Date.now() / 1000);

    const params = {
        auth_key: this.key,
        auth_timestamp: timestamp,
        auth_version: this.AUTH_VERSION,
        body_md5: md5(JSON.stringify(body))
    };

    const path = `/apps/${this.appId}/${type}`;

    const queryString = qs.stringify(params);

    return axios.post(`http://api-${this.cluster}.pusher.com${path}?${queryString}&auth_signature=${sha256.hmac(this.secret, ['POST', path, queryString].join('\n'))}`, body);
};

Pusher.prototype.trigger = trigger;
Pusher.prototype.triggerBatch = triggerBatch;
Pusher.prototype.dispatch = dispatch;

module.exports = Pusher;