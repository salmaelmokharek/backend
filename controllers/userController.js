const User = require('./../models/user')
const Order = require('./../models/order')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.user = async(req, res) => {
  try {
     const result = await User.find()
     res.json({
      success : true,
      users : result
     })
      
    } catch (error) {
      res.status(500).json({
        success : false,
        error
      })
    }
  }

exports.register = async (req,res) =>{
  let {name, email, password, address, city, country, phone, isAdmin} = req.body

  const user = new User({
    name, 
    email, 
    password: bcrypt.hashSync(password, 10),  //hashed password
    address, 
    city, 
    country, 
    phone,
    isAdmin
  })

  try{
    const result = await user.save()
    res.status(201).json({
      success : true,
      user : result
    })

  }catch(err){
    res.status(500).json({
      success : false,
      err 
    })

  }

}

exports.login = async (req,res) => {

  const {email, password} = req.body
  const user =  await User.findOne({email}, 'name email password')

  if (!user) {
    return res.status(404).json({
      success : false,
      messege : "Email or Password is Wrong !"
    })
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    const secret = process.env.SECRET_KEY

    const token =  jwt.sign({
      userId: user._id,
      username: user.name,
      isAdmin : user.isAdmin
    },secret, {expiresIn: '1day'})
    return res.status(200).json({
      success : true,
      message : "User is Authentificated",
      user : user.name,
      token

    })   
  }
  res.status(400).json({
    success : false,
    message : "Email or Password is Wrong !"
  })
}


exports.userOrders = async (req, res) => {
  let {id} = req.params

  try {
      
     const myOrders = await Order.find({user: id}, '-user')
                                 .populate({ path: 'orderItems', populate: {
                                  path: 'product', populate: {
                                      path: 'category',
                                      select: '-_id label'
                                  }
                                  ,select: 'title description'
                                 }})
    
    const total = myOrders.reduce((cumul, order) => cumul + order.total, 0)
    
     res.json({
      total,
      success: true,
      orders: myOrders
     })

  } catch (error) {
      res.status(500).json({ success: false });
  }

}