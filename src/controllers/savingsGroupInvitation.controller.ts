import { Response } from "express";
import User from "../models/user.model";
import SavingsGroupInvitation from "../models/savingsGroupInvitation.model";
import { isValidUser, isValidGroup } from "../functions/utils";
import { IUserAuthRequest } from '../interfaces/user.interface';
import SavingsGroup from "../models/savingsGroup.model";
const url = require('url');

export const sendInvitation = async (request: IUserAuthRequest, response: Response): Promise<Response> => {
    const { group_id } = request.params;
    const { invitee_email } = request.body;
    const { id } = request.authUser;
    var receiver_id: any = null;

    if(await isValidUser(id) === false){
          return response.status(404).json({ message: 'User does not exist!' });
      }

    if(await isValidUser(invitee_email) === false){
        return response.status(404).json({ message: 'Invitee is unregistered!' });
    }

      if(await isValidGroup(group_id) !== true){
        return response.status(404).json({ message: 'Group does not exist!' });
    }

    try {
        const user = await User.findOne(
          {
            where: { email: invitee_email}
          }
        );
        if (user){
            receiver_id = user.dataValues.id;
        }
        
      } catch (error) {
        return response.status(404).json({ message: 'Invitee does not exist!' });
      }

      try {
        const invitations = await SavingsGroupInvitation.count(
          {
            where: { sender_id: id}
          }
        );
        if (invitations >= 4){
            return response.status(400).json({ message: 'You are not allowed to send more than 4 invitations!' });
        }
        
      } catch (error) {
        return response.status(404).json({ message: 'Invitee does not exist!' });
      }

      try {
        const invitationSent = await SavingsGroupInvitation.findOne(
            {
              where: { 
                sender_id: id,
                group_id: group_id,
                receiver_id: receiver_id,
            }
            }
          );
          if (invitationSent){
            return response.status(400).json({ message: 'Invitee has already been invited!' });
          }
    } catch (error) {
        return response.status(400).json({ message: 'Unable to find the invitation already sent!' });
    }

      const data = {
        sender_id: parseInt(id),
        receiver_id: parseInt(receiver_id),
        status: 1,
        group_id: parseInt(group_id)
    }

      try {
        const savingsGroup = await SavingsGroupInvitation.create(data);
        return response.status(201).json({
          message: 'Invitation sent successfully', 
          view_invation_link: 'http://' +request.headers.host+'/api/savings/view_invitation/'+savingsGroup.dataValues.id 
      });
      } catch (error) {
        return response.status(400).json({ error: 'Unable to send this invite!' });
      } 
    }

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