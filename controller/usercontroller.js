const userData = require("../models").User;

const getAllUsers = async (req , res) => {
  await userData.findAll()
  .then((users) => {
    if(users.length > 0) {
      res.status(200).json(users)
    }
    else {
      res.status(404).json("No Users found")
    }
  })
  .catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

const getByUserId = async (req, res) => {
  await userData.findOne({ where: { id: req.params.id }})
  .then(user => {
    if ( user != null) {
      res.status(200).json(user);
    }else {
      res.status(404).json("No User found");
    }
  }).catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

const addUser = async (req , res) => {
  await userData.fineOne({ where: { 
    username: req.body.username
  }})
  .then(user => {
      if (user != null) {
          res.status(400).json("User already exists")
      } else {
          userData.create(req.body).then(_ => {
              res.status(201).json("User created successfully")
          })
      }
  }).catch(err => {
      res.status(500).json("Error:" + err.message)
  })
}
  
  const editUser = async (req , res) => {
    await userData.findOne({ where: { id: req.params.id }})
    .then(user => {
      if ( user != null) {
        userData.update(req.body, { where: { id: user.id }})
        .then(_ => res.status(200).json("User updated Successfully"))
      } else {
        res.status(404).json("User Not Found")
      }
    }).catch(err => {
      res.status(500).json("Error:" + err.message)
    })
  }
  
  const deleteUser = async (req , res) => {
    await userData.findOne({ where: { id: req.params.id}})
    .then(user => {
      if (user != null) {
        userData.destroy({ where: { id: req.params.id}})
        .then(_ => res.status(200).json("User Delete Successfully"))
      } else {
        res.status(404).json("User Not Found")
      }
    }).catch(err => {
      res.status(500).json("Error:" + err.message)
    })
  }
  
  module.exports = {
    getAllUsers,
    getByUserId,
    addUser,
    editUser,
    deleteUser
  }