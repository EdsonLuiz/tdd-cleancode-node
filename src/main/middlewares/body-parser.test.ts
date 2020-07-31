import supertestRequest from 'supertest';
import app from '@/main/config/app';

describe('Body parser middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test_body_parser', (request, response) => {
      response.send(request.body);
    });
    await supertestRequest(app)
      .post('/test_body_parser')
      .send({ name: 'specific_name' })
      .expect({ name: 'specific_name' });
  });
});
