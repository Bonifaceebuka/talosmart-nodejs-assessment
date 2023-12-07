import { Response } from "express";
import { IUserAuthRequest } from '../interfaces/user.interface';
import item from "../models/item.model";

/// This function returns the list of 12 registered items
export const listItems = async (request: IUserAuthRequest, response: Response): Promise<Response> => {

  try {

    const items = await item.findAll({
      limit: 12,
      attributes: ['id', 'logo', 'title'],
      order: [
        ['createdAt', 'DESC']
      ]
    });
    return response.status(200).json({
      status_code: 200,
      data: items
    });

  } catch (error) {
    return response.status(400).json({
      status_code: 400,
      message: 'Internal server error!',
      data: null
     });
  }

}

/// This function returns the details of selected ID of an item

export const showDetails = async (request: IUserAuthRequest, response: Response): Promise<any> => {
  const { item_id } = request.params;

  if (+item_id !== parseInt(item_id)) {
    return response.status(400).json({ 
      status_code: 400,
      message: 'Invlid item ID!', 
      data: null });
  }

  try {
    const itemDetails = await item.findOne(
      {
        where: {
          id: item_id
        },
        attributes: ['id',
          'title',
          'description',
          'slogan',
          'online_status',
          'price_start',
          'price_end',
          'delivery_type',
          'terms_and_condition',
          'how_to_redeem',
          'network_fees',
          'logo']
      }
    );

    if (!itemDetails) {
      return response.status(404).json({ 
        status_code: 400,
        message: 'Item not found!',
        data: null
       });
    }

    return response.status(200).json({
      status_code: 200,
      data: itemDetails,
    });

  } catch (error) {
    return response.status(400).json({ 
      status_code: 400,
      message: 'Internal server error!',
      data: null
     });
  }

}