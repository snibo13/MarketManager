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
  .post(async function (req, res) {
    await FundManagerModel.create(req.body);
  })


router.route('/user/:id')
  .get(async function(req, res) {
    await FundManagerModel.create(req.params.id)
  })
  .delete(async function(req, res) {
    await FundManagerModel.remove({id: req.params.id});
    return true;
  })

router.route('/fund/:id/prices')
  .post(async function (req, res) {
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
     .on("data", async function(data) {
       // data['_id'] = new mongoose.Types.ObjectId();
       prices.push(PriceModel.create(data));
     })
     //Add the prices to the Fund once all prices are processed
     .on("end", async function() {
       let Fund = await FundModel.findByID(req.params.id);
       await Fund.prices.push(prices);
       helpers.processData(prices);
       Fund.returns = processed[0];
       Fund.riskAdjustedReturns = processed[1];
       await Fund.save();
       return Fund;
     });
  });

router.route('/fund/:id')
  .get(async function (req, res) {
    return await FundModel.findById(req.params.id);
  })

  .delete(function (req, res) {
    FundModel.remove({id: req.params.id});
    return true;
  });

router.route('/fund')
  .post(async function (req, res) {
    return await FundModel.create(req.body);
  })

server.use(fileUpload());
server.use('/api', router);

server.listen(PORT,() => {
  console.log(`Server running @ ${PORT}`);
});
