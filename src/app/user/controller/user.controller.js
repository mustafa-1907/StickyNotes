import * as userService from '../service/user.service.js'
// ** update

export const updateUser = async (req, res, next) => {

    try{
        const id = req.query.id
        console.log(id)
        const token = req.cookies["access_token"]
        console.log('req.cokkie :',typeof  req.cookies['access_token']);
        const updatedData = req.body
        const updatedUser = await userService.updateUser(updatedData,token, id)

       return  res.status(200).json({
            message: 'user updated successfully.',
            success: true,
            data: updatedUser,
        })
    }catch(err){
        next(err)
    }

}

export const deleteUserById = async(req,res,next)=>{
    try{
        const id = req.query.id
        const token = req.cookies["access_token"];
        await userService.deleteUserById(token,id)
        return res.status(200).json({
            message: 'user deleted successfully.',
            success: true,
        })
    }catch(error){
        next(error)
    }
}

export const getUserById = async(req,res,next)=>{
    try{
        const id = req.params.id
        const token = req.cookies["access_token"];
        const user = await userService.getUserById(token,id)
        return res.status(200).json({
            message: 'User Data retrieved successfully.',
            success: true,
            data: user,
        })
    }catch(err){
        next(err)
    }
}