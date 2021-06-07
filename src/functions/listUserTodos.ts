import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamo";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid: user_id } = event.pathParameters;

  const response = await document.scan({
    TableName: 'todos',
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      '#user_id': 'user_id'
    },
    ExpressionAttributeValues: {
      ':user_id': user_id
    }
  }).promise();

  const todos = response.Items

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}