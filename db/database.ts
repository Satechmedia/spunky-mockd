import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('==== Database Connected ====');
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
  }
};

