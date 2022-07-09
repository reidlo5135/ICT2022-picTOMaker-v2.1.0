import {DataTypes, Model} from "sequelize";
import {sequelize} from "./index";
import {BaseLocalUser} from "./BaseLocalUser";

interface BaseAccessTokenAttributes {
    id: bigint | null,
    access_token: string,
    expires_in: number,
    provider: string,
    refresh_token: string,
    refresh_token_expires_in: number,
    token_type: string
}

export class BaseAuthUserToken extends Model<BaseAccessTokenAttributes> {
    public readonly id! : number | null;
    public access_token! : string;
    public expires_in! : number;
    public provider! : string;
    public refresh_token! : string;
    public refresh_token_expires_in! : number;
    public token_type! : string;
    public readonly createdAt! : Date;
    public readonly updatedAt! : Date;
}

BaseAuthUserToken.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    access_token : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    expires_in : {
        type: DataTypes.INTEGER,
        defaultValue: 21599
    },
    provider : {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    refresh_token_expires_in : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token_type: {
        type: DataTypes.STRING,
        defaultValue: 'bearer'
    }
}, {
    modelName: 'BaseAuthUserToken',
    tableName: 'base_auth_tokens',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp'
});