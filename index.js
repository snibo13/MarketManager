const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const schemas = require('./schema.js');
const csv = require('fast-csv');


const MONGO_URL = 'mongodb://localhost/ghana';

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to Db");
  }
);

mongoose.connection.on('error', err => console.error(err));


var router = express.Router();

const server = new express();
const PORT = 1111;

router.route('/user')
  .post(function(req, res) {
    await FundManagerModel.create(req.body);
  })


router.route('/user/:id')
  .get(function(req, res) {
    await FundManagerModel.create(req.params.id)
  })
  .delete(function(req, res) {
    await FundManagerModel.remove({id: req.params.id});
    return true;
  })

router.route('/fund/:id/prices')
  .post(function (req, res) {
    if (!req.files)
      return res.status(400).send("No files uploaded");

    var fundFile = req.files.file;
    var prices = [];
    //Parse CSV to String
    csv
     .fromString(fundFile.data.toString(),{
       headers: true,
       ignoreEmpty: true
     })
     //Generate price objects from the data
     .on("data", function(data) {
       // data['_id'] = new mongoose.Types.ObjectId();
       prices.push(PriceModel.create(data));
     })
     //Add the prices to the Fund once all prices are processed
     .on("end", function() {
       let Fund = await FundMode.findByID(req.params.id);
       await Fund.prices.push(prices);
       await Fund.save();
       helpers.processData(prices);
       return Fund;
     });
  });

router.route('/fund/:id')
  .get(function (req, res) {
    return await FundModel.findById(req.params.id);
  });

  .delete(function (req, res) {
    FundModel.remove({id: req.params.id});
    return true;
  });

router.route('/fund')
  .post(function (req, res) {
    return await FundModel.create(req.body);
  })

server.use(fileupload());
server.use('/api', route);

server.listen(PORT,() => {
  console.log(`Server running @ ${PORT}`);
});
