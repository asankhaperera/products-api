let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Starting get product handler ' + JSON.stringify(event));

	ddb.get({
		TableName: 'products',
		Key: { 'id': event.path }
	}, function (err, data) {
		if (err) {
			console.log('Error at get product handler');
			callback(null, 'Error getting product ' + err);
		} else {
			console.log('Successfully completed get product handler');
			callback(null, data.Items);
		}
	});
}