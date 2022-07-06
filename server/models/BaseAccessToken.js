module.exports = (sequelize, DataTypes) => {
    const BaseAccessToken = sequelize.define('base_access_token', {
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
        },
        createdAt: {
            type:DataTypes.DATEONLY,
            defaultValue: new Date()
        },
        updatedAt: {
            type:DataTypes.DATEONLY,
            defaultValue: new Date()
        }
    });

    return BaseAccessToken;
}