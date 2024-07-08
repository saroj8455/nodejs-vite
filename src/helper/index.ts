import mongoose from 'mongoose';

export const API_KEY = 'secret_token';

export const connectToDB = async (url: string) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`Sucessfully Connect to : `, conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
