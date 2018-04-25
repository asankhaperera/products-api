let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	ddb.scan({
		TableName: 'products',
		ExpressionAttributeValues: {},
		FilterExpression: ''
	}, function (err, data) {
		if (err) {
			console.log('Error at list product handler');
			callback(null, 'Error listing products ' + err);
		} else {
			console.log('Successfully completed list product handler');
			callback(null, data.Items);
		}
	});
}