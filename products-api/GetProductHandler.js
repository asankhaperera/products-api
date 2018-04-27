let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Request to return product with id: ' + event['pathParameters']['id']);

	ddb.get({
		TableName: 'products',
		Key: { 
			'id': event['pathParameters']['id'] 
		}, Expected: {
			'id' : {
				Value: event['pathParameters']['id']
			}
		}
	}, function (err, data) {
		if (err) {
			console.log('Product not found for id: ' + event['pathParameters']['id'] + ' : ' + err);
			let response = {
				"statusCode": 404,
				"body": 'Product with id: ' + event['pathParameters']['id'] + ' not found.'
			}
			callback(null, response);
		} else {
			console.log('x Successfully returning product with id: ' + event['pathParameters']['id']);
			let response = {
				"statusCode": 200,
				"body": JSON.stringify(data.Item)
			}
			callback(null, response);
		}
	});
}