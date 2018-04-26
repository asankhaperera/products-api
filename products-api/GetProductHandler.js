let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Starting get product handler ' + event['pathParameters']['id']);

	ddb.get({
		TableName: 'products',
		Key: { 'id': event['pathParameters']['id'] }
	}, function (err, data) {
		if (err) {
			console.log('Error at get product handler');
			callback(null, 'Error getting product ' + err);
		} else {
			console.log('Successfully completed get product handler. Returning ' + JSON.stringify(data.Item));
			let response = {
				"statusCode": 200,
				"body": JSON.stringify(data.Item)
			}
			callback(null, response);
		}
	});
}