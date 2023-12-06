import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from "../models/user.model";
import { jwtConfig as config } from "../config";
import { isValidUser } from "../functions/utils";

///Signup logic
export const signUp = async (request: Request, response: Response): Promise<Response> => {
  const { email, password } = request.body;
  if(await isValidUser(email) === true){
      return response.status(404).json({ 
        status_code: 400,
        message: 'User email already exists!',
        data: null
       });
  }

  /// Password encryption logic
  const passwordSalt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(password, passwordSalt);

  const data = {
      email: email,
      password: hashedPassword
  }
  try {
    const user = await User.create(data);
    return response.status(201).json({
      status_code: 201,
      message: 'Account Created', 
      data: user
  });
  } catch (error) {
    return response.status(400).json({ 
      status_code: 400,
      message: 'Unable to create your account!',
      data: null
     });
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
          status_code: 200,
          data: `Bearer ${token}`,
          message: "You are now logged in.",
        });
      }
      else{
        return response
          .status(400)
          .json({ 
            status_code: 400,
            message: "Invalid login details!", 
            data: null });
      } 
      }
      return response
            .status(400)
            .json({ 
              status_code: 400,
              message: "Invalid login details!", 
              data: null });
    
  } catch (error) {
    return response
            .status(500)
            .json({ 
              status_code: 500,
              message: "Internal server error!", 
              data: null });
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
