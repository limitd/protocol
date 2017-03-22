const Request  = require('./messages/Request').Request;
const Response = require('./messages/Response').Response;
const PBF      = require('pbf');

const responseDecodingBuffer = new Uint8Array(128);
const requestDecodingBuffer = new Uint8Array(128);

module.exports = {
  Response: {
    decode(buffer) {
      const pbf = new PBF(buffer);
      return Response.read(pbf);
    },
    encode(obj) {
      const pbf = new PBF(responseDecodingBuffer);
      Response.write(obj, pbf);
      return new Buffer(pbf.finish());
    }
  },
  Request: {
    decode(buffer) {
      const pbf = new PBF(buffer);
      return Request.read(pbf);
    },
    encode(obj) {
      const pbf = new PBF(requestDecodingBuffer);
      Request.write(obj, pbf);
      return new Buffer(pbf.finish());
    }
  }
};
