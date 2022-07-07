module.exports = (sequelize, DataTypes) => {
    const BaseAuthUser = sequelize.define('base_auth_user', {
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
            type: DataTypes.ENUM('KAKAO', '카카오 사용자'),
            allowNull: false
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

    return BaseAuthUser;
}