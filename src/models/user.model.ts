import { DataTypes, Model } from 'sequelize';
import {db_connect} from '../config/database';
import {InewUser} from '../interfaces/user.interface';

export default class User extends Model<InewUser> {}

User.init(
	{
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
		password: {
            type: DataTypes.STRING,
            allowNull: false
        }
	},
	{
		sequelize: db_connect,
        timestamps: true,
		tableName: 'users',
	}
);
