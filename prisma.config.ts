import { defineConfig, env } from "prisma/config";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: env("DATABASE_URL"),
  },
});
