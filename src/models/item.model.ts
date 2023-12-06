import { DataTypes, Model } from 'sequelize';
import {db_connect} from '../config/database';
import {IcreateItem} from '../interfaces/item.interface';

export default class item extends Model<IcreateItem> {}

item.init(
	{
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
		logo: {
            type: DataTypes.STRING,
            allowNull: false
        },
		description: {
            type: DataTypes.STRING,
            allowNull: false
        },
		slogan: {
            type: DataTypes.STRING,
            allowNull: false
        },
		online_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
		price_start: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
		price_end: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
		delivery_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
		terms_and_condition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        how_to_redeem: {
            type: DataTypes.STRING,
            allowNull: false
        },
		network_fees: {
            type: DataTypes.STRING,
            allowNull: false
        }
	},
	{
		sequelize: db_connect,
        timestamps: true,
		tableName: 'items',
	}
);