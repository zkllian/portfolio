import { defineConfig } from "drizzle-kit";
import path from "path";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set, ensure a Postgres database is provisioned");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
