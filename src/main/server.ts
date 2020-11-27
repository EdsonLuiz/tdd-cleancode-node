import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers';
import env from '@/main/config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('@/main/config/app')).default;
    app.listen(env.port, () => console.log(`🚀 Server is running on http://localhost:${env.port}`));
  })
  .catch(console.error);
