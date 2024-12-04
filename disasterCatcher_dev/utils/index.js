import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import gridfsStream from "gridfs-stream";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";    

dotenv.config()

export const dbConnection = async () => {
  
  const uri = process.env.MONGODB_URI;
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  try{
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.log("DB Error : ", error);
  } finally {
    await client.close();
  }
}