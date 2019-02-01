const path = require('path');
require('protobufjs/src/parse').defaults.keepCase = true;

const assert = require('chai').assert;

const ProtoBuf = require('protobufjs');
const Protocol205 = ProtoBuf.loadSync(path.join(__dirname, '/backward/v2.0.5/Index.proto')).lookup('limitd');

const Protocol = require('../index');


describe('compatibility with 2.0.5', function () {

  it('v2.0.5 should be able to deserialize', function () {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'take': {
        conformant: false,
        remaining: 10,
        reset: 20,
        limit: 30
      }
    });

    const decoded = Protocol205.Response.decode(buffer).toJSON();

    assert.equal(decoded.request_id, 'abcdefg');

    assert.equal(decoded.take.conformant, false);
    assert.equal(decoded.take.remaining, 10);
    assert.equal(decoded.take.reset, 20);
    assert.equal(decoded.take.limit, 30);
  });


  it('v2.0.5 should be able to deserialize a ping request', function() {
    const buffer = Protocol.Request.encode({
      'id':     '1234',
      'type':   '',
      'key':    '',
      'method': 'PING',
    });

    const decoded = Protocol205.Request.decode(buffer).toJSON();

    assert.equal(decoded.type, '');
    assert.equal(decoded.key, '');
  });


  it('v2.0.5 should be able to deserialize an status response', function() {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'status': {
        items: [ { instance: 'a', reset: 0 , remaining: 1} ]
      }
    });

    const decoded = Protocol205.Response.decode(buffer).toJSON();

    assert.equal(decoded.status.items[0].reset, 0);
  });


  it('v2.0.5 should be able to deserialize a put response', function() {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'put': {remaining: 0, reset: 0, limit: 0}
    });

    const decoded = Protocol205.Response.decode(buffer).toJSON();

    assert.equal(decoded.put.reset, 0);
  });


  it('v2.0.5 should be able to deserialize a take response', function() {
    const buffer = Protocol.Response.encode({
      request_id: 'abcdefg',
      'take': { conformant: false, delayed: false, remaining: 0, reset: 0, limit: 0 }
    });

    const decoded = Protocol205.Response.decode(buffer).toJSON();

    assert.equal(decoded.take.delayed, undefined);
    assert.equal(decoded.take.remaining, 0);
    assert.equal(decoded.take.reset, 0);
    assert.equal(decoded.take.limit, 0);
  });

});
