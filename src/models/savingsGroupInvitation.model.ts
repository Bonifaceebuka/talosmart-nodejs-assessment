import { DataTypes, Model } from 'sequelize';
import {db_connect} from '../config/database';
import {IcreateSavingsGroupInvitation} from '../interfaces/savingsGroupInvitation.interface';
import User from "./user.model";
import SavingsGroup from "./savingsGroup.model";

export default class savingsGroupInvitation extends Model<IcreateSavingsGroupInvitation> {}

savingsGroupInvitation.init(
	{
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		status: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	},
	{
		sequelize: db_connect,
        timestamps: true,
		tableName: 'savings_groups_invites',
	}
);

savingsGroupInvitation.belongsTo(User, { foreignKey: { name: 'sender_id' } });
savingsGroupInvitation.belongsTo(User, { foreignKey: { name: 'receiver_id' } });
savingsGroupInvitation.belongsTo(SavingsGroup, { foreignKey: { name: 'group_id' } });