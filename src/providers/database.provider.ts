import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async () => {

    const dbUri = process.env.MONGODB_URI;
    console.log(`Attempting connection to ${dbUri}`);

    return {
      uri: dbUri,
      useNewUrlParser: true,
    };
  },
});
