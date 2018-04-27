let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Request to list all products');

	ddb.scan({
		TableName: 'products'
	}, function (err, data) {
		if (err) {
			console.log('Error listing products : ' + err);
			let response = {
				"statusCode": 500,
				"body": 'Error listing products : ' + err
			}
			callback(null, response);
		} else {
			console.log('Returning list of available products');
			callback(null, data.Items);
		}
	});
}