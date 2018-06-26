var qiniu = require('qiniu')

module.exports = function() {
    var accessKey = 'dFIqIEYglpzIuTReJl5NLk-G1BYc0C1hUglg8C8J';
    var secretKey = 'MBwbITxHV8CQsthUsZwa1u6SZRuQhKRp7wMQ6DUe';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var options = {
        scope: 'public',
        returnBody:  '{"key": $(key), "hash": $(etag), "url": "http://p6ysctecz.bkt.clouddn.com/$(key)"}',
        expires: 10000000,
        deadline: Math.round(new Date().getTime()/1000)+3600,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    return uploadToken
}