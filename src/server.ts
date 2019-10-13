import http from 'http';
import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      // tslint:disable-next-line: no-console
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line: no-console
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr: any = server.address();
  // tslint:disable-next-line: no-console
  console.log(`Listening on port ${addr.port}`);
};

const startDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('env variable `MONGODB_URI` cannot be empty or null');
    }
    const uri: string = process.env.MONGODB_URI as string;
    await mongoose.connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw err;
  }
};

const startServer = async () => {
  try {
    await startDatabase();
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (err) {
    throw err;
  }
};

startServer().catch((err) => {
  console.error(err);
});
