const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'https://cutt.ly/VZcVXeE'
      },
      healthScore: {
        type: DataTypes.INTEGER
      },
      dietss: {
        type: DataTypes.ARRAY(DataTypes.STRING) 
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSONB)  
      }
      
    },
    { timestamps: false }
  );
};
