const Protocol = require('../');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const requestLong = {
  id:     2000,
  method: 'TAKE',
  type:   'aaaabfdadasaaaabfdadasaaaabfdadasaaaabfdadasaaaabfdadasaaaabfdadas',
  key:    'barbarbarbarbarbarbarbarbarbar',
  count:  2
};

const encodedRequest = Protocol.Request.encode(requestLong);

suite
.add('Request.decode', function() {
  return Protocol.Request.decode(encodedRequest);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 'async': true });
