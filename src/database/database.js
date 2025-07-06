import Sequelize from "sequelize";

export const sequelize = new Sequelize("prueba", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

export async function connect() {
    try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
    } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    }
}