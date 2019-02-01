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

const requestShort = {
  id:     2000,
  method: 'TAKE',
  type:   'ip',
  key:    'foo',
  count:  2
};

const requestShortWithStringID = {
  id:     '2000',
  method: 'TAKE',
  type:   'ip',
  key:    'foo',
  count:  2
};

const requestShortWithBigID = {
  id:     'aaaaa-a-aa-ddasdsoadoaso-dsadsadsa',
  method: 'TAKE',
  type:   'ip',
  key:    'foo',
  count:  2
};

suite
.add('Request.encode (short)', function() {
  Protocol.Request.encode(requestShort);
})
.add('Request.encode (short with string id)', function() {
  Protocol.Request.encode(requestShortWithStringID);
})
.add('Request.encode (with big id)', function() {
  Protocol.Request.encode(requestShortWithBigID);
})
.add('Request.encode (long)', function() {
  Protocol.Request.encode(requestLong);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 'async': true });
