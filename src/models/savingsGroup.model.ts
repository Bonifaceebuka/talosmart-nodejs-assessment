import { DataTypes, Model } from 'sequelize';
import {db_connect} from '../config/database';
import {IcreateSavingsGroup} from '../interfaces/savingsGroup.interface';
import User from "./user.model";

export default class savingsGroup extends Model<IcreateSavingsGroup> {}

savingsGroup.init(
	{
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		group_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        group_creator: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
		group_description: {
            type: DataTypes.STRING,
            allowNull: true
        }
	},
	{
		sequelize: db_connect,
        timestamps: true,
		tableName: 'savings_groups',
	}
);

savingsGroup.belongsTo(User, { foreignKey: { name: 'group_creator' } });