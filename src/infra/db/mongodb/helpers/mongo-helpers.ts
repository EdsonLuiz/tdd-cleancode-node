import { MongoClient } from 'mongodb';

export const MongoHelper = {
  connection: {} as MongoClient,
  async connect(uri: string | undefined): Promise<void> {
    this.connection = await MongoClient.connect(uri || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  async disconnect(): Promise<void> {
    await this.connection.close();
  },
};
