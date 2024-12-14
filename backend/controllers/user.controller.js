import User from '../models/user.model.js'
import Notification from '../models/notification.model.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
export const getUserProfile = async (req, res) => {
  const { name } = req.params
  try {
    const user = await User.findOne({ name }).select('-password')
    console.log(req.user)
    if (!user) {
      return res.status(404).json('User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error in getuserprofile')
    res.status(500).json('Internal server error')
  }
}
export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    if (id === req.user._id.toString()) {
      return res.status(401).json({ error: 'Cant follow yourself' })
    }
    const usertomodify = await User.findById(id)
    const currentuser = await User.findById(req.user._id)

    if (!usertomodify || !currentuser) {
      console.log('error in cant finding the user')
      return res.status(404).json({ error: 'Cant find the user' })
    }

    const isfollowing = currentuser.following.includes(id)

    if (isfollowing) {
      //unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
      res.status(200).json('User unfollowed successfully')
    } else {
      //follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

      const notification = new Notification({
        from: req.user._id,
        to: id,
        type: 'follow'
      })
      await notification.save()
      res.status(200).json('User followed successfully')
    }
  } catch (error) {
    console.error('Error in follo unfollow user', error)
    res.status(500).json('Internal server error')
  }
}

export const getSuggestedUsers = async (req, res) => {
  try {
    const userid = req.user._id
    const user = await User.findById(userid).select('following')
    const followingpeople = user.following
    const allusers = await User.find({
      _id: {
        $nin: [userid, ...followingpeople]
      }
    })
      .select('-password')
      .limit(4)
    res.status(200).json(allusers)
  } catch (error) {
    console.log('Error in getsuggestedusers', error)
    res.status(500).json('Internal server error')
  }
}
export const updateUser = async (req, res) => {
  const { name, email, currentpassword, newpassword } = req.body
  const userid = req.user._id
  try {
    const user = await User.findById(userid)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (
      (!currentpassword && newpassword) ||
      (currentpassword && !newpassword)
    ) {
      return res.status(404).json({ message: 'Passwords not found' })
    }
    if (currentpassword && newpassword) {
      const isMatch = await bcrypt.compare(user.password, currentpassword)
      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect password' })
      }
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newpassword, salt)
    }
    user.name = name || user.name
    user.email = email || user.email
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    console.log('Error in updateuser', error)
    res.status(500).json('Internal server error')
  }
}
export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).json(users)


    } catch (error) {
        console.log('Error in getallusers',error)
        res.status(500).json("Internal server error") 
    }
}