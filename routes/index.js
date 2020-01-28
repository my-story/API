const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.json({message: "/ESTE EL COMIENZO DE ALGO GRANDE" });
});

module.exports = router;
