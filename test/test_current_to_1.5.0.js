const path = require('path');
require('protobufjs/src/parse').defaults.keepCase = true;

const assert = require('chai').assert;

const ProtoBuf = require('protobufjs');
const Protocol15 = ProtoBuf.loadSync(path.join(__dirname, '/backward/v1.5.0/Index.proto')).lookup('limitd');

const Protocol = require('../index');


describe('compatibility with 1.5.0', function () {

  it('v1.5.0 should be able to deserialize', function () {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'take': {
        conformant: false,
        remaining: 10,
        reset: 20,
        limit: 30
      }
    });

    const decoded = Protocol15.Response.decode(buffer).toJSON();

    assert.equal(decoded.request_id, 'abcdefg');

    assert.equal(decoded['.limitd.TakeResponse.response'].conformant, false);
    assert.equal(decoded['.limitd.TakeResponse.response'].remaining, 10);
    assert.equal(decoded['.limitd.TakeResponse.response'].reset, 20);
    assert.equal(decoded['.limitd.TakeResponse.response'].limit, 30);
  });


  it('v1.5.0 should be able to deserialize a ping request', function() {
    const buffer = Protocol.Request.encode({
      'id':     '1234',
      'type':   '',
      'key':    '',
      'method': 'PING',
    });

    const decoded = Protocol15.Request.decode(buffer).toJSON();

    assert.equal(decoded.type, '');
    assert.equal(decoded.key, '');
  });


  it('v1.5.0 should be able to deserialize an status response', function() {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'status': {
        items: [ { instance: 'a', reset: 0 , remaining: 1} ]
      }
    });

    const decoded = Protocol15.Response.decode(buffer).toJSON();

    assert.equal(decoded['.limitd.StatusResponse.response'].items[0].reset, 0);
  });


  it('v1.5.0 should be able to deserialize a put response', function() {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'put': {remaining: 0, reset: 0, limit: 0}
    });

    const decoded = Protocol15.Response.decode(buffer).toJSON();

    assert.equal(decoded['.limitd.PutResponse.response'].reset, 0);
  });


  it('v1.5.0 should be able to deserialize a put response', function() {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'take': { conformant: false, delayed: false, remaining: 0, reset: 0, limit: 0 }
    });

    const decoded = Protocol15.Response.decode(buffer).toJSON();

    assert.equal(decoded['.limitd.TakeResponse.response'].delayed, undefined);
    assert.equal(decoded['.limitd.TakeResponse.response'].remaining, 0);
    assert.equal(decoded['.limitd.TakeResponse.response'].reset, 0);
    assert.equal(decoded['.limitd.TakeResponse.response'].limit, 0);
  });

});
