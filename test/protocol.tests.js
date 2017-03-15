const assert = require('chai').assert;
const Protocol = require('../index');


describe('protocol', function () {
  describe('response', function(){
    it('should be able to encode/decode a take response', function () {
      const encoded = Protocol.Response.encode({
        request_id: 'abcdefg',
        'take': {
          conformant: false,
          remaining: 10,
          reset: 20,
          limit: 30
        }
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Response.decode(encoded);

      assert.equal(decoded.request_id, 'abcdefg');
      assert.equal(decoded.body, 'take');
      assert.equal(decoded.take.conformant, false);
      assert.equal(decoded.take.remaining, 10);
      assert.equal(decoded.take.reset, 20);
      assert.equal(decoded.take.limit, 30);
    });

    it('should be able to encode/decode an error response', function () {
      const encoded = Protocol.Response.encode({
        request_id: 'abcdefg',
        'error': {
          type: 'UNKNOWN_BUCKET_TYPE'
        }
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Response.decode(encoded);

      assert.equal(decoded.request_id, 'abcdefg');
      assert.equal(decoded.body, 'error');
      assert.equal(decoded.error.type, 'UNKNOWN_BUCKET_TYPE');
    });
  });

  describe('request', function(){
    it('should be able to encode/decode TAKE', function () {
      const encoded = Protocol.Request.encode({
        id:     'abcdefg',
        method: 'TAKE',
        type:   'foo',
        key:    'bar',
        count:  2
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Request.decode(encoded);

      assert.equal(decoded.id,     'abcdefg');
      assert.equal(decoded.method, 'TAKE');
      assert.equal(decoded.type,   'foo');
      assert.equal(decoded.key,    'bar');
      assert.equal(decoded.count,  2);
    });

    it('should be able to encode/decode a PUT', function () {
      const encoded = Protocol.Request.encode({
        id:     'abcdefg',
        method: 'PUT',
        type:   'foo',
        key:    'bar',
        count:  2
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Request.decode(encoded);

      assert.equal(decoded.id,     'abcdefg');
      assert.equal(decoded.method, 'PUT');
      assert.equal(decoded.type,   'foo');
      assert.equal(decoded.key,    'bar');
      assert.equal(decoded.count,  2);
    });
  });
});
