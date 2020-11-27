import { AddAccountRepository } from '@/data/protocols/add-account-repository';
import { AddAccountModel } from '@/domain/usecases/add-account';
import { AccountModel } from '@/domain/models/account';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    const parsedAccount = MongoHelper.map(account);
    return parsedAccount;
  }
}
