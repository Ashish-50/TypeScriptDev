import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Todo extends Model {
    public id!: string;
    public text!: string;
}
export default Todo;

Todo.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
