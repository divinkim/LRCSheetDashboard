import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: "mysql://root:AhssrI4626I@vps101055.serveur-vps.net:3306/lrc_sheet_database",
  },
});
