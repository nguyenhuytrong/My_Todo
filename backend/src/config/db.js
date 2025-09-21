import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Debug log 
    console.log("MongoDB URI from .env:", process.env.MONGODB_CONNECTIONSTRING);
    
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Failed to connect database:", error);
  }
};
