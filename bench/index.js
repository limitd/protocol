const Protocol = require('../');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const response = {
  request_id: 'abcdefg',
  'take': {
    conformant: false,
    remaining: 10,
    reset: 20,
    limit: 30
  }
};

const request = {
  id:     'abcdefg',
  method: 'TAKE',
  type:   'foo',
  key:    'bar',
  count:  2
};

const encodedRequest = Protocol.Request.encode(request);

const encodedResponse = Protocol.Response.encode(response);

suite
.add('Response.decode', function() {
  Protocol.Response.decode(encodedResponse);
})
.add('Response.encode', function() {
  Protocol.Response.encode(response);
})
.add('Request.decode', function() {
  Protocol.Request.decode(encodedRequest);
})
.add('Request.encode', function() {
  Protocol.Request.encode(request);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 'async': true });
