import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'hello world'
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}