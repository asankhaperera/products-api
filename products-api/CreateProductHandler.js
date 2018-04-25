let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Starting create product handler');
	let product = JSON.parse(payload);

	ddb.put({
		TableName: 'products',
		Item: {
			'name': product.name,
			'price': product.price
		}
	}, function (err, data) {
		if (err) {
			console.log('Error at create product handler');
			callback(null, 'Error creating product ' + product);
		} else {
			console.log('Successfully completed create product handler');
			callback(null, 'Created product ' + product);
		}
	});
}