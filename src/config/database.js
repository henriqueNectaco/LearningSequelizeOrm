require('dotenv').config();
module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
};