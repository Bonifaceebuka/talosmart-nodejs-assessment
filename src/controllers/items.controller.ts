import { Response } from "express";
import User from "../models/user.model";
import { isValidUser } from "../functions/utils";
import { IUserAuthRequest } from '../interfaces/user.interface';
import item from "../models/item.model";
const url = require('url');

    export const viewInvitation = async (request: IUserAuthRequest, response: Response): Promise<Response> => {
        const { invitation_id } = request.params;
        const { id } = request.authUser;
    
        if(await isValidUser(id) === false){
              return response.status(404).json({ message: 'User does not exist!' });
          }
    
          try {
            const invitations = await SavingsGroupInvitation.findOne(
             {
                    include: [
                    {
                        model: SavingsGroup,
                        attributes: ['id','group_name','group_description'],
                        required: true,
                        include: [{
                                model: User,
                                attributes: ['email','id'],
                                required: true
                            }],
                    }
                ],
                where: { 
                    receiver_id: id,
                    id: invitation_id
                },
                attributes: ['id']
             }
            );

            if (!invitations){
                return response.status(400).json({ message: 'Invalid invitation link!' });
            }
            return response.status(200).json({ 
                data: invitations,
                actions: {
                    accept_invitation:'http://' +request.headers.host+'/api/savings/act_on_invitation/'+invitations.dataValues.id+'?action=accept',
                    decline_invitation:'http://' +request.headers.host+'/api/savings/act_on_invitation/'+invitations.dataValues.id+'?action=decline',
                }
             });
            
          } catch (error) {
            return response.status(404).json({ message: 'Internal server error!' });
          }

        }

        
        export const acceptOrDecline = async (request: IUserAuthRequest, response: Response): Promise<any> => {
            const { invitation_id } = request.params;
            const { id } = request.authUser;
            const queryStrings = url.parse(request.url, true).query;
            const action = queryStrings.action
    
            if(await isValidUser(id) === false){
                  return response.status(404).json({ message: 'User does not exist!' });
              }
        
              try {
                const invitations = await SavingsGroupInvitation.findOne(
                 {
                    where: { 
                        receiver_id: id,
                        id: invitation_id,
                        status: 0
                    },
                    attributes: ['id']
                 }
                );
    
                if (!invitations){
                    return response.status(400).json({ message: 'Invalid invitation link!' });
                }
                
                if(action && action ==='accept'){
                    try {
                        await SavingsGroupInvitation.update({
                            status: 1,
                          },{
                            where: {
                                id: invitations.dataValues.id
                            }
                        });

                        return response.status(200).json({ message: 'Invitation accepted successfully' });
                    } catch (error) {
                        return response.status(404).json({ message: 'Internal server error, Unable to decline this invation!' });
                    }
                }
                else if(action ==='decline'){
                    try {
                        await SavingsGroupInvitation.destroy({
                            where: {
                                id: invitations.dataValues.id
                            }
                        });

                        return response.status(200).json({ message: 'Invitation declined successfully' });
                    } catch (error) {
                        return response.status(404).json({ message: 'Internal server error, Unable to decline this invation!' });
                    }
                }
                
              } catch (error) {
                return response.status(404).json({ message: 'Internal server error!' });
              }
    
            }