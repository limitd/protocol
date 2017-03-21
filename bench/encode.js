const Benchmark = require('benchmark');
const suite     = new Benchmark.Suite();
const Response  = require('../messages/Response').Response;
const PBF       = require('pbf');
const toBuffer  = require('typedarray-to-buffer');

const response = {
  request_id: 'abcdefg',
  'take': {
    conformant: false,
    remaining: 10,
    reset: 20,
    limit: 30
  }
};

const array = new Uint8Array(32);

const poolSize = 1024 * 5000;
var pool = new Uint8Array(poolSize);

suite
.add('Encoding with reallocs', function() {
  const pbf = new PBF();
  Response.write(response, pbf);
  return toBuffer(pbf.finish());
})
.add('Encoding with an starting size', function() {
  const pbf = new PBF(32);
  Response.write(response, pbf);
  return toBuffer(pbf.finish());
})
.add('Encoding on an existing array and copy to buffer', function() {
  const pbf = new PBF(array);
  Response.write(response, pbf);
  //this copy the array into a new buffer iterating over
  return new Buffer(pbf.finish());
})
.add('Encoding using a pool', function() {
  const pbf = new PBF(pool);
  Response.write(response, pbf);

  const view = pbf.finish();

  //remove the used part of the pool
  pool = pool.subarray(view.length);
  if (pool.length < 32) {
    // console.log('allocating pool', pool.length);
    pool = new Uint8Array(poolSize);
  }

  //convert the ArrayBufferView to buffer.
  return toBuffer(view);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
