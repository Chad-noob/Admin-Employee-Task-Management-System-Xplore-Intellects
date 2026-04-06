import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
      return;
    } catch (error) {
      console.warn(`MongoDB connection failed: ${error.message}`);
      console.warn('Falling back to an in-memory MongoDB instance for local development.');
    }
  }

  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri('taskflow-pro');
  await mongoose.connect(memoryUri);
  console.log('In-memory MongoDB connected');
};

export default connectDB;