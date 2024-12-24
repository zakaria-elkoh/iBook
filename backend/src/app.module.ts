import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { DynamoDBModule } from './dynamodb/dynamodb.module';

@Module({
  imports: [BooksModule, DynamoDBModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
