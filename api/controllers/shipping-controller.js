const shippo = require('shippo')(process.env.SHIPPO_TEST);

module.exports.validate = (req, res) => {
  shippo.address.create({
    "name":req.body.name, 
    "company":req.body.company,
    "street1":req.body.street1,
    "city":req.body.city,
    "state":req.body.state,
    "zip":req.body.zip,
    "country":req.body.country,
    "validate": true
  }, function(err, address) {
    if (err) {
      console.log("shippo error" , err)
    } else {
      res.json(address)
    }
  });
};

module.exports.address = (req, res) => {
  shippo.address.list()
  .then((address) => res.json(address))
  .catch((e)=>next(e))
};

module.exports.create = (req, res) => {
  let parcel = {
    "object_state":"VALID",
    "object_created": "2013-12-11T19:38:09.729Z",
    "object_updated": "2013-12-11T19:38:09.729Z",
    "object_id": "fcd9c72b564d4bfa8c03299ed6545132",
    "object_owner": "shippotle@goshippo.com",
    "template": null,
    "length": "20",
    "width": "15",
    "height": "12",
    "distance_unit": "in",
    "weight": "5",
    "mass_unit": "lb",
    "metadata": "Customer ID 123456",
    "extra": {},
    "test": true
  };
  
  //MAKE SURE TO SAVE THIS IN ENV VARIABLES
  let addressFrom = {
      "object_created": "2019-05-23T19:00:50.837Z",
      "object_updated": "2019-05-23T19:00:50.919Z",
      "object_id": "7d64dc3fcf854fc2b9101822db657a6f",
      "is_complete": true,
      "validation_results": {},
      "object_owner": "sebasgrossmann@gmail.com",
      "name": "sebastian grossmann",
      "company": "",
      "street_no": "",
      "street1": "1616 s bayshore drive",
      "street2": "",
      "street3": "",
      "city": "Miami",
      "state": "FL",
      "zip": "33133",
      "country": "US",
      "longitude": null,
      "latitude": null,
      "phone": "",
      "email": "",
      "is_residential": null,
      "metadata": "",
      "test": true
  };
    // Create shipment object
  let shipment = shippo.shipment.create( {
    "address_from": addressFrom,
    // "address_from": process.env.address_from,
    "address_to": req.body,
    "parcels": parcel,
    "async": true
  })
    .then((shipment) => res.status(200).json(shipment))
    .catch((e) => console.log(e))
};