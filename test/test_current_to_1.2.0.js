var protocol       = require('./protocol');
var assert         = require('chai').assert;
var  v1_2_protocol = require('./backward/v1.2.0/test/protocol.js');

var Request      = protocol.Request;
var Response     = protocol.Response;
var TakeResponse = protocol.TakeResponse;

describe.only('compatibility with 1.2.0', function () {

  it('should be able to deserialize a Response with the redundant type', function () {
    var response = new v1_2_protocol.Response({
      request_id: 'foobar',
      type: v1_2_protocol.Response.Type.TAKE
    });

    var v1_2_message = response.encode().toBuffer();

    var decoded = Response.decode(v1_2_message);

    console.dir(decoded);
  });

});