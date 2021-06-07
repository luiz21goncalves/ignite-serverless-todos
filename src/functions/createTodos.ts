import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamo";
import {v4 as uuid} from 'uuid';

type ICreateTodo = {
  title: String;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid: user_id } = event.pathParameters;
  const { title, deadline }: ICreateTodo = JSON.parse(event.body)
  const id = uuid()

  await document.put({
    TableName: 'todos',
    Item: {
      id,
      user_id,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      id,
      user_id,
      title,
      done: false,
      deadline: new Date(deadline),
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}
