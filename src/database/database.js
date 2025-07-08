import Sequelize from "sequelize";


export const sequelize = new Sequelize(
  "prueba_dhr2", // nombre de la base de datos
  "prueba_dhr2_user", // usuario
  "iJJajFDoKe7MrjL8Letuo8DKSmEH4d5L", // contraseña
  {
    host: "dpg-d1lisi95pdvs73c1clng-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false,
      },
    },
  }
);

/*
export const sequelize = new Sequelize("prueba", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});
*/

export async function connect() {
    try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
    } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    }
}