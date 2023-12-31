import User from "../models/user.model";

const isValidUser = async function (data: number | string) {
    if(typeof data === "number"){
     return  await findUserById(data)
    }
    else{
     return await findUserByEmail(data)
    }   
  };

  const findUserByEmail = async function (email: string): Promise<boolean | null>{
    try {
        const user = await User.findOne(
          {
            where: { email: email}
          }
        );
        if (user) return true; //User already exists
        return false;
      } catch (error) {
        return null;
      }
  }

  const findUserById = async function (id: number) : Promise<boolean | null>{
    try {
        const user = await User.findByPk(id);
        if (user) return true; //User already exists
        return false;
      } catch (error) {
        return null;
      }
  }

  export {
    isValidUser
  }