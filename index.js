const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const forge = require('forge');
const bodyParser = require('body-parser');
const {FundModel, FundManagerModel, PriceModel} = require('./schema.js');
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

server.use(cors());
server.use(express.static(path.join(__dirname, 'public')));
//View engine




const PORT = 1111;

router.route('/user')
  .post(async function (req, res) {
    var genRandomString = function(length){
      return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    };
    var md = forge.md.sha256.create();
    var salt = genRandomString(16);
    req.body.salt = salt;
    md.update(req.body.password + salt);
    req.body.password = md.digest().toHex();
    return await FundManagerModel.create(req.body);
  })
  .get(async function (req, res) {
    await FundManagerModel.where({"email": req.body.email}).findOne(
      function(err, doc) {
        if (err) return -1;
        var md = forge.md.sha256.create();
        md.update(req.body.password + doc.salt);
        if (doc.password != md.digest().toHex())
        {
          return -2;
        }
        return doc.id;
      }
    )
  })


router.route('/user/:id')
  .get(async function(req, res) {
    return await FundManagerModel.create(req.params.id)
  })
  .delete(async function(req, res) {
    await FundManagerModel.remove({id: req.params.id});
    //TODO: Error triggering
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
    // Returns the appropriate Fund as a mongoose document (JSON)
    return await FundModel.findById(req.params.id, (err, model) => {return model});
  })

  .delete(function (req, res) {
    FundModel.remove({id: req.params.id});
    return true;
  });

router.route('/fund')
  .post(async function (req, res) {
    return await FundModel.create(req.body);
  });

  router.route('/funds')
  .get(async function (req, res) {
    return await FundModel.find();
  });


var frontEnd = express.Router();

frontEnd.route('/')
.get(function(req, res) {
  res.status(200).sendFile(path.join(__dirname, './public/index.html'));
})

frontEnd.route('/signup')
  .get(function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './public/signup.html'));
  });

frontEnd.route('/signin')
  .get(function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './public/signin.html'));
  });


frontEnd.route('/scheme/:id')
  .get(async function(req, res) {
    res.status(200).sendFile(path.join(__dirname, './public/scheme.html'));
  });

frontEnd.route('/fund/:id')
  .get(async function(req, res) {
    //Return React page with data from api call
    res.status(200).sendFile(path.join(__dirname, './public/fund.html'));
  })

frontEnd.route('/search')
  .get(function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './public/search.html'));
  });


frontEnd.route('/upload')
  .get(function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './public/upload.html'));
  });


server.use(fileUpload());
server.use('/api', router);
server.use('', frontEnd)

server.listen(PORT,() => {
  console.log(`Server running @ ${PORT}`);
});
