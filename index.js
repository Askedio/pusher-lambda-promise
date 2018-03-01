'use strict';

const request = require('request');
const md5 = require('md5');
const sha256 = require('js-sha256');

module.exports = (settings) => {
    const AUTH_VERSION = '1.0';
    const TIMEOUT = settings.timeout || 5 * 1000;
    const PATH = `/apps/${settings.appId}/events`;

    const toOrderedArray = (map) => {
        return Object.keys(map).map(function (key) {
            return [key, map[key]];
        }).sort(function (a, b) {
            return a[0] > b[0];
        }).map(function (pair) {
            return pair[0] + "=" + pair[1];
        });
    };

    return (name, channel, data) => {
        const timestamp = Math.round(Date.now() / 1000);

        const body = {
            name,
            channel,
            data: JSON.stringify(data),
        };

        const params = {
            auth_key: settings.key,
            auth_timestamp: timestamp,
            auth_version: AUTH_VERSION,
            body_md5: md5(JSON.stringify(body))
        };

        const queryString = toOrderedArray(params).join('&');

        return new Promise((resolve, reject) => {
            request({
                uri: `http://api-${settings.cluster}.pusher.com/apps/${settings.appId}/events?${queryString}&auth_signature=${sha256.hmac(settings.secret, ['POST', PATH, queryString].join('\n'))}`,
                method: 'POST',
                body: body,
                json: true,
                timeout: TIMEOUT
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                resolve({
                    response,
                    body
                });
            });
        });
    };
};