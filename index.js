const Request  = require('./messages/Request').Request;
const Response = require('./messages/Response').Response;
const PBF      = require('pbf');

var responseEncodingLength = 32;
var requestEncodingLength = 32;

module.exports = {
  Response: {
    decode(buffer) {
      const pbf = new PBF(buffer);
      return Response.read(pbf);
    },
    encode(obj) {
      const pbf = new PBF(responseEncodingLength);
      Response.write(obj, pbf);
      const result = new Buffer(pbf.finish());
      const length = Math.ceil(result.length / 16) * 16;
      responseEncodingLength = Math.max(length, responseEncodingLength);
      return result;
    }
  },
  Request: {
    decode(buffer) {
      const pbf = new PBF(buffer);
      return Request.read(pbf);
    },
    encode(obj) {
      const pbf = new PBF(requestEncodingLength);
      Request.write(obj, pbf);

      const result = new Buffer(pbf.finish());
      const length = Math.ceil(result.length / 16) * 16;
      responseEncodingLength = Math.max(length, requestEncodingLength);

      return result;
    }
  }
};
