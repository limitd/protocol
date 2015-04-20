var protocol = require('./protocol');
var assert = require('chai').assert;

var Request = protocol.Request;
var Response = protocol.Response;
var TakeResponse = protocol.TakeResponse;

describe('protocol', function () {

  it('should be able to serialize a Request', function () {
    var request = new Request({
      'id':     'foobar',
      'type':   'bucket1',
      'key':    '123',
      'method': Request.Method.TAKE,
    });
    request.encodeDelimited().toBuffer();
  });

  it('should contain all request methods', function () {
    var methods = Object.keys(Request.Method);
    assert.include(methods, 'TAKE');
    assert.include(methods, 'WAIT');
    assert.include(methods, 'PUT');
  });

  it('should be able to serialize a Response', function () {

    var response = new Response({
      request_id: 'foobar',
      type: Response.Type.TAKE
    });

    var takeResponse = new TakeResponse({
      conformant: true,
      delayed:    false,
      remaining:  1,
      reset:      12345,
      limit:      10
    });

    takeResponse.encodeDelimited().toBuffer();
  });

});