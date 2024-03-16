import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../db';

class User extends Model{
    public id!: string;
    public full_name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};
export default User;

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
},{
    timestamps: true,
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})