import {DataTypes, Model} from "sequelize";
import {sequelize} from "./index";

interface BaseLocalUserAttributes {
    id: bigint | null,
    email: string,
    name: string,
    nick_name: string,
    password: string
    profile_image_url: string,
    provider: string
}

export class BaseLocalUser extends Model<BaseLocalUserAttributes> {
    public readonly id! : number | null;
    public email!: string;
    public name!: string;
    public nick_name!: string;
    public password!: string;
    public profile_image_url!: string;
    public provider! : string;
    public readonly createdAt! : Date;
    public readonly updatedAt! : Date;
}

BaseLocalUser.init({
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
    nick_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    profile_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    modelName: 'BaseLocalUser',
    tableName: 'base_local_users',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp'
});