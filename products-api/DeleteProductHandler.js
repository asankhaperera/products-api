let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
	
	console.log('Request to delete product with id: ' + event['pathParameters']['id']);

	ddb.delete({
		TableName: 'products',
		Key: { 'id': event['pathParameters']['id'] },
		Expected: {
			Exists: true
		}
	}, function (err, data) {
		if (err) {
			console.log('Product not found for id: ' + event['pathParameters']['id']);
			let response = {
				"statusCode": 404,
				"body": 'Product with id: ' + event['pathParameters']['id'] + ' not found.'
			}
			callback(null, response);
		} else {
			console.log('Successfully deleted product with id: ' + event['pathParameters']['id']);
			let response = {
				"statusCode": 204
			}
			callback(null, response);
		}
	});
}