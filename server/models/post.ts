export default function (sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Post;
}