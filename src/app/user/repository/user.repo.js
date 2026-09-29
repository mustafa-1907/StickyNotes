import {User} from '../model/user.model.js'

export const updateVerify = async(email,updatedData  )=>{
   return await User.findOneAndUpdate({email:email},updatedData,{returnDocument : "after"})

}

export const updateUser = async(id,updatedData  )=>{
   return await User.findOneAndUpdate({_id : id},updatedData,{returnDocument : "after"})

}

export const deleteUserById = async(id)=>{
   return await User.deleteOne({_id : id})
}

export const getUserById = async(id)=>{
   return await User.findOne({_id:id});
}