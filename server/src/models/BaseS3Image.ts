import {DataTypes, Model} from "sequelize";
import {sequelize} from "./index";

interface BaseS3ImageAttributes {
    id: bigint | null,
    email: string,
    file_name: string,
    extension: string,
    file_url: string,
    provider: string
}

export class BaseS3Image extends Model<BaseS3ImageAttributes> {
    public readonly id! : number | null;
    public email!: string;
    public file_name!: string;
    public extension!: string;
    public file_url!: string;
    public provider! : string;
    public readonly createdAt! : Date;
    public readonly updatedAt! : Date;
}

BaseS3Image.init({
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
    file_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    modelName: 'BaseS3Image',
    tableName: 'base_s3_image_ts',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp'
});