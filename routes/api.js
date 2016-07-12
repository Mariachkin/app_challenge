var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('../data/db');
var User       = require('../data/models/user_model')


var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//create a new user
router.post('/user',function(req, res) {

  var user = new User({
      _id        : mongoose.Types.ObjectId(),
      first_name : req.body.first_name,
      last_name  : req.body.last_name,
      email      : req.body.email
  })
      .save()
      .then(()=>{
        res.status(200).json({msg:'User was created'});
      })
      .catch((err)=>{
        console.log('Error: ',err)
        res.status(500).json({msg:'no user was created...'})
      })
});

//get all users
router.get('/users',function(req, res) {
  User.find().exec()
      .then((users)=>{
          if(users){
             res.json(users)
          }else{
            res.json({msg:'no users for you'})
          }
      })
      .catch((err)=>{
          console.log('Error: ',err)
          res.status(500).json({msg:'no users for you'})
      })
  //res.json({msg:'main route'});
});
router.get('/user/:id',function(req, res) {
    User.findById(req.params.id)
        .exec()
        .then((user)=>{
            if(user){
                res.json(user);
            }else{
                res.json({msg:'user not found'})
            }
        })
        .catch((err)=>{
            console.log('Error: ',err)
            res.status(500).json({msg:'db internal error'})
        })

});
//update user
router.put('/user/:id',function(req, res) {
    User.findOneAndUpdate(  {_id:req.params.id},
        {
            first_name : req.body.first_name,
            last_name  : req.body.last_name,
            email      : req.body.email
        })
        .exec()
        .then((numAffected)=>{

            res.status(200).json({msg:'OK'})

        })
        .catch((err)=>{
            console.log('Error: ',err)
            res.status(500).json({msg:'db internal error'})
        })
});
module.exports = router;
