let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
	
	console.log('Starting delete product handler ' + event['pathParameters']['id']);
	
	ddb.delete({
		TableName: 'products',
		Key: { 'id': id }
	}, function (err, data) {
		if (err) {
			console.log('Error at delete product handler');
			callback(null, 'Error deleteing product ' + err);
		} else {
			console.log('Successfully completed delete product handler.');
			let response = {
				"statusCode": 204
			}
			callback(null, response);
		}
	});
}