import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.RAILWAY_DATABASE_URL) {
  throw new Error("RAILWAY_DATABASE_URL is not set, ensure the Railway Postgres database is provisioned");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.RAILWAY_DATABASE_URL,
  },
});
