import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export const connectDB = async () => {
  try {
    console.log("Attempting MongoDB connection...");

    // Check if using in-memory database for development
    if (process.env.NODE_ENV === "development" || !process.env.MONGO_URI) {
      console.log("🔧 Starting in-memory MongoDB for development...");
      
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      await mongoose.connect(mongoUri);
      console.log(`✓ In-Memory MongoDB Ready on ${mongoUri}`);
      console.log("⚠️  Data will be reset when server restarts");
      return;
    }

    // Use Atlas MongoDB with debug logging
    const mongoUri = process.env.MONGO_URI;
    console.log("Connecting to Atlas MongoDB...");
    console.log("URI Hosts:", mongoUri?.split("@")[1] || "Not set");
    
    // Enable Mongoose debug logging
    mongoose.set('debug', (coll, method, query, doc) => {
      console.log(`[MongoDB] ${coll}.${method}`, JSON.stringify(query));
    });
    
    console.log("Initiating connection with 90 second timeout...");
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 90000,
      socketTimeoutMS: 90000,
      connectTimeoutMS: 90000,
      family: 4, // Use IPv4 only
      retryWrites: true,
      w: "majority",
      maxPoolSize: 5,
      minPoolSize: 1,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Failed:`);
    console.error(`  Type: ${error.name}`);
    console.error(`  Code: ${error.code}`);
    console.error(`  Message: ${error.message}`);
    
    if (error.message.includes("ENOTFOUND")) {
      console.error("\n→ DNS resolution issue. Check your network/DNS settings");
    } else if (error.message.includes("authentication failed")) {
      console.error("\n→ Wrong username or password in .env");
    } else if (error.message.includes("timed out")) {
      console.error("\n→ Connection timeout. Possible causes:");
      console.error("   • Firewall blocking MongoDB");
      console.error("   • ISP blocking MongoDB ports");
      console.error("   • VPN/proxy interference");
      console.error("   • Try disabling VPN if enabled");
    }
    
    console.error("\nQuick fix: Switch to development mode:");
    console.error("  $env:NODE_ENV='development'; npm run dev");
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.disconnect();
};