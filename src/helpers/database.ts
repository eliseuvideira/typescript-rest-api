import mongoose from 'mongoose';

abstract class Database {
  public static async connect() {
    try {
      if (!Database.getUri()) {
        throw new Error('env variable `MONGODB_URI` cannot be empty or null');
      }
      const uri: string = Database.getUri() as string;
      await mongoose.connect(uri, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async disconnect() {
    await mongoose.disconnect();
  }

  private static getUri(): string | undefined {
    if (process.env.NODE_ENV === 'test') {
      return process.env.MONGODB_URI_TEST;
    }
    return process.env.MONGODB_URI;
  }
}

export default Database;
