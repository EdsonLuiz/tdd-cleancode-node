import supertestRequest from 'supertest';
import app from '@/main/config/app';

describe('SignUp Routes', () => {
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
