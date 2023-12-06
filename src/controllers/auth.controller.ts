import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from "../models/user.model";
import { jwtConfig as config } from "../config";
import { isValidUser } from "../functions/utils";

export const signUp = async (request: Request, response: Response): Promise<Response> => {
  const { email, password } = request.body;
  if(await isValidUser(email) === true){
      return response.status(404).json({ message: 'User email already exists!' });
  }

  const passwordSalt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(password, passwordSalt);

  const data = {
      email: email,
      password: hashedPassword
  }
  try {
    const user = await User.create(data);
    return response.status(201).json({
      message: 'Account Created', 
      data: user
  });
  } catch (error) {
    return response.status(400).json({ error: 'Unable to create your account!' });
  }
 
  
}

///Login Logic
export const signIn = async (request: Request, response: Response): Promise<Response> => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ where: {email: email},
      attributes: ['id', 'email','password']
    }
      );
    if (user) {
      if(await bcrypt.compare(password, user.dataValues.password)){
        const token = loginWebToken(user);
        return response.status(200).json({
          success: true,
          token: `Bearer ${token}`,
          message: "You are now logged in.",
        });
      }
      else{
        return response
          .status(400)
          .json({ error: "Invalid login details!", success: false });
      } 
      }
      return response
            .status(400)
            .json({ error: "Invalid login details!", success: false });
    
  } catch (error) {
    return response
            .status(500)
            .json({ error: "Internal server error!", success: false });
  }
};

const loginWebToken = (user: any) => {
    // ////////////////////////////////////////////////////
    // // Creating the JWT(Json Web Token)
    // ////////////////////////////////////////////////////
  if(user.id){
     const token = jwt.sign(
      {
        id: user.id.toString()
      },
      config.secret,
      { expiresIn: config.tokenLiveSpan }
    );

    return token;
  }
}
