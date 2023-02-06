import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { TransactionsType, Transactions } from "./types";

const TableName = "VitusPay-Resources_Transactions_dev";

export interface DynamodbRepository {
  getTransactions: () => Promise<TransactionsType>;
}

export function initDynamoDbRepository(): DynamodbRepository {
  // =============
  // Refactor Note
  // =============
  // The region should be dynamic in the future
  const dbClient = new DynamoDBClient({ region: "us-east-1" });
  const documentClient = DynamoDBDocumentClient.from(dbClient);

  return {
    getTransactions: getTransactions(documentClient),
  };
}

function getTransactions(client: DynamoDBDocumentClient) {
  return async () => {
    const { Items } = await client.send(
      new QueryCommand({ TableName, Limit: 10 })
    );

    return Transactions.parse(Items);
  };
}
