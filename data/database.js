import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'prueba',
  'dev',
  'sistema',
  {
    dialect: 'mysql',
  }
);

const Persona = sequelize.define('persona',{
  cedula: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  nacimiento: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  telefonos: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  hobbies: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

sequelize.sync();

export default sequelize.models;