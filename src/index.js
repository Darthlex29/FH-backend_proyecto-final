import express from "express";
import { PORT } from "./config/config.js";
import app from "./app.js";
import { sequelize, connect } from "./database/database.js";
import "./models/user.model.js";
import "./models/note.model.js";
import "./models/category.model.js";
import { setupAssociations } from "./database/associations.js"

async function main() {
  await connect();

  setupAssociations();

  await sequelize.sync({ alter: true });
  console.log("📦 Models synchronized with the database.");

  const server = app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });

  server.on("error", (err) => {
    console.error(`❌ Error starting server: ${err.message}`);
  });
  
}

main();
