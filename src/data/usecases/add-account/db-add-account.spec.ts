import { DbAddAccount } from '@/data/usecases/add-account/db-add-account';

describe('DbAddAccount usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'));
      }
    }

    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mial.com',
      password: 'valid_password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
