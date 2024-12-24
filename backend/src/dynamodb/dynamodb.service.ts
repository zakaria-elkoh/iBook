import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: process.env.AWS_REGION,
    });
  }

  // Create
  async createItem(tableName: string, item: Record<string, any>): Promise<any> {
    const params = {
      TableName: tableName,
      Item: item,
    };
    return this.dynamoDB.put(params).promise();
  }

  // Read: Get a single item
  async getItem(tableName: string, key: Record<string, any>): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
    };
    return this.dynamoDB.get(params).promise();
  }

  // Read: Scan table (retrieve all items)
  async scanTable(tableName: string): Promise<any> {
    const params = {
      TableName: tableName,
    };
    return this.dynamoDB.scan(params).promise();
  }

  // Update
  async updateItem(
    tableName: string,
    key: Record<string, any>,
    updateExpression: string,
    expressionAttributeValues: Record<string, any>,
  ): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression, // e.g., "set #name = :name"
      ExpressionAttributeValues: expressionAttributeValues, // e.g., { ":name": "John" }
      ReturnValues: 'UPDATED_NEW',
    };
    return this.dynamoDB.update(params).promise();
  }

  // Delete
  async deleteItem(tableName: string, key: Record<string, any>): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
    };
    return this.dynamoDB.delete(params).promise();
  }
}
