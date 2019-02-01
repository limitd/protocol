const path = require('path');

const assert = require('chai').assert;

const Protocol205 = require('./backward/v2.0.5/index');

const Protocol = require('../index');


describe('compatibility with 2.0.5', function () {
	describe('when the message was encoded with current', () => {
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

			const decoded = Protocol205.Response.decode(buffer);

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

			const decoded = Protocol205.Request.decode(buffer);

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

			const decoded = Protocol205.Response.decode(buffer);

			assert.equal(decoded.status.items[0].reset, 0);
		});


		it('v2.0.5 should be able to deserialize a put response', function() {
			const buffer = Protocol.Response.encode({
				request_id: 'abcdefg',
				'put': {remaining: 0, reset: 0, limit: 0}
			});

			const decoded = Protocol205.Response.decode(buffer);

			assert.equal(decoded.put.reset, 0);
		});


		it('v2.0.5 should be able to deserialize a take response', function() {
			const buffer = Protocol.Response.encode({
				request_id: 'abcdefg',
				'take': { conformant: false, remaining: 0, reset: 0, limit: 0 }
			});

			const decoded = Protocol205.Response.decode(buffer);

			assert.equal(decoded.take.remaining, 0);
			assert.equal(decoded.take.reset, 0);
			assert.equal(decoded.take.limit, 0);
		});

	});

	describe('when the message was encoded with v2.05', () => {
		it('current should be able to deserialize', function () {
			const buffer = Protocol205.Response.encode({
				request_id: 'abcdefg',
				'take': {
					conformant: false,
					remaining: 10,
					reset: 20,
					limit: 30
				}
			});

			const decoded = Protocol.Response.decode(buffer);

			assert.equal(decoded.request_id, 'abcdefg');

			assert.equal(decoded.take.conformant, false);
			assert.equal(decoded.take.remaining, 10);
			assert.equal(decoded.take.reset, 20);
			assert.equal(decoded.take.limit, 30);
		});


		it('current should be able to deserialize a ping request', function() {
			const buffer = Protocol205.Request.encode({
				'id':     '1234',
				'type':   '',
				'key':    '',
				'method': 'PING',
			});

			const decoded = Protocol.Request.decode(buffer);

			assert.equal(decoded.type, '');
			assert.equal(decoded.key, '');
		});


		it('current should be able to deserialize an status response', function() {
			const buffer = Protocol205.Response.encode({
				request_id: 'abcdefg',
				'status': {
					items: [ { instance: 'a', reset: 0 , remaining: 1} ]
				}
			});

			const decoded = Protocol.Response.decode(buffer);

			assert.equal(decoded.status.items[0].reset, 0);
		});


		it('current should be able to deserialize a put response', function() {
			const buffer = Protocol205.Response.encode({
				request_id: 'abcdefg',
				'put': {remaining: 0, reset: 0, limit: 0}
			});

			const decoded = Protocol.Response.decode(buffer);

			assert.equal(decoded.put.reset, 0);
		});


		it('current should be able to deserialize a take response', function() {
			const buffer = Protocol205.Response.encode({
				request_id: 'abcdefg',
				'take': { conformant: false, remaining: 0, reset: 0, limit: 0 }
			});

			const decoded = Protocol.Response.decode(buffer);

			assert.equal(decoded.take.remaining, 0);
			assert.equal(decoded.take.reset, 0);
			assert.equal(decoded.take.limit, 0);
		});
	});
});
