
const express    = require('express');
const router     = express.Router();
let shippo = require('shippo')(process.env.shippo_test);


router.post('/validate',(req,res,next)=>{
  console.log(req.body)
  shippo.address.create({
    "name":req.body.name, 
    "company":req.body.company,
    "street1":req.body.street1,
    "city":req.body.city,
    "state":req.body.state,
    "zip":req.body.zip,
    "country":req.body.country,
    // "email":req.body.email,
    "validate": true
  }, function(err, address) {
    if(err){
      console.log("shippo error" , err)
    }else{
      console.log(address)
      res.json(address)
    }
  });

})


module.exports = router