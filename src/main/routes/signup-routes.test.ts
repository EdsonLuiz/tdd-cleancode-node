import supertestRequest from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('Should return an account on success', async () => {
    await supertestRequest(app)
      .post('/api/signup')
      .send({
        name: 'valid_name',
        email: 'valid_name@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      })
      .expect(200);
  });
});
