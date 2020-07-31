import { AddAccountRepository } from '@/data/protocols/add-account-repository';
import { AddAccountModel } from '@/domain/usecases/add-account';
import { AccountModel } from '@/domain/models/account';
import { MongoHelper } from '../helpers/mongo-helpers';

export class AccountMongoRepository implements AddAccountRepository {
  private parseAccount(account: any): AccountModel {
    const { _id: id, ...rest } = account;
    const parsedAccount = { ...rest, id };
    return parsedAccount;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    const parsedAccount = this.parseAccount(account);
    return parsedAccount;
  }
}
