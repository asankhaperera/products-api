let AWS = require('aws-sdk');
var uuid = require('uuid');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Starting create product handler ' + JSON.stringify(event));

	ddb.put({
		TableName: 'products',
		Item: {
			'id': uuid.v1(),
			'name': event.name,
			'price': event.price
		}
	}, function (err, data) {
		if (err) {
			console.log('Error at create product handler');
			callback(null, 'Error creating product ' + err);
		} else {
			console.log('Successfully completed create product handler');
			callback(null, 'Created product ' + event.name);
		}
	});
}