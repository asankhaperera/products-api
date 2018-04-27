let AWS = require('aws-sdk');
var uuid = require('uuid');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Request to create a product with: ' + JSON.stringify(event));

	ddb.put({
		TableName: 'products',
		Item: {
			'id': uuid.v1(),
			'name': event.name,
			'price': event.price
		}
	}, function (err, data) {
		if (err) {
			console.log('Error creating a product' + err);
			callback(null, 'Error creating product ' + err);
		} else {
			console.log('Successfully created product handler');
			callback(null, 'Created product ' + event.name);
		}
	});
}