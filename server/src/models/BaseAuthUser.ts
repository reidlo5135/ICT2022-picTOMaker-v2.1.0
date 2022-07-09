import {DataTypes, Model} from "sequelize";
import {sequelize} from "./index";


interface BaseAuthUserAttributes {
    id: bigint | null,
    email: string,
    name: string,
    picture: string,
    provider: string,
    role: string
}

export class BaseAuthUser extends Model<BaseAuthUserAttributes> {
    public readonly id! : number | null;
    public email!: string;
    public name!: string;
    public picture!: string;
    public provider! : string;
    public role!: string;
    public readonly createdAt! : Date;
    public readonly updatedAt! : Date;
}

BaseAuthUser.init({
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
    picture: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    modelName: 'BaseAuthUser',
    tableName: 'base_auth_users',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp'
});