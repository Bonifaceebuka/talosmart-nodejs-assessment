import { Response } from "express";
import SavingsGroup from "../models/savingsGroup.model";
import { isValidUser } from "../functions/utils";
import { IUserAuthRequest } from '../interfaces/user.interface';

export const newSavingsGroup = async (request: IUserAuthRequest, response: Response): Promise<Response> => {
  const { group_name, group_description} = request.body;
  const { id } = request.authUser;

  if(await isValidUser(id) !== true){
        return response.status(404).json({ message: 'User does not exist!' });
    }

  const data = {
      group_name: group_name,
      group_description: group_description,
      group_creator: id
  }
  try {
    const savingsGroup = await SavingsGroup.create(data);
    return response.status(201).json({
      message: 'Savings group created', 
      data: savingsGroup
  });
  } catch (error) {
    return response.status(400).json({ error: 'Unable to create savings group!' });
  } 
}