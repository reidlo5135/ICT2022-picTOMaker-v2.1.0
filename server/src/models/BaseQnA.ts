import {DataTypes, Model} from "sequelize";
import {sequelize} from "./index";

interface BaseQnAAttributes {
    id: bigint | null,
    email: string,
    name: string,
    provider: string,
    qna: string
}

export class BaseQnA extends Model<BaseQnAAttributes> {
    public readonly id!: number | null;
    public email!: string;
    public name!: string;
    public provider!: string;
    public qna!: string;
}

BaseQnA.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qna: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    modelName: 'BaseQnA',
    tableName: 'base_user_qna_ts',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp'
});