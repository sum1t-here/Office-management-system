import mongoose from 'mongoose';

mongoose.set('strictQuery', false); // strict mode disabled

const connectionTodb = async () => {
  try {
    // Connect to the MongoDB database using the MONGO_URI environment variable
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log a success message
    if (connection) {
      console.log(`Mongo DB connected successfully at ${connection.host}`);
    }
  } catch (error) {
    // If there is an error while connecting, log the error and terminate the process
    console.log(error);
    process.exit(1); // terminate the process if not connected
  }
};

export default connectionTodb;
