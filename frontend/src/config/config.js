import dotenv from "dotenv";
dotenv.config();

const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
};

export default config;
