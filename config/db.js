const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://buglogger:k8QkFyUDgnBUV6x8@cluster0.bnjny.mongodb.net/buglogger?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = connectDB;
