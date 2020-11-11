const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var FundManagerSchema = new Schema({
  name      : String,
  address   : String,
  email     : String,
  password  : String,
  salt      :  String
});

var FundManagerModel = mongoose.model("Fund Manager", FundManagerSchema);
exports.FundManagerModel = FundManagerModel;


var PriceSchema = new Schema({
  price : Number,
  date  : Date
});

var PriceModel = mongoose.model("Price", PriceSchema);
exports.PriceModel = PriceModel;

var FundSchema = new Schema({
  fundType: {
    type: String,
    enum: ["EQUITY","BALANCED","FIXED INCOME","MONEY MARKET", "OTHER"]
  },
  returns: {
    month       : Number,
    threeMonth  : Number,
    year        : Number,
    threeYear   : Number,
    fiveYear    : Number,
    tenYear     : Number,
    allTime     : Number
  },
  riskAdjustedReturns: {
    month       : Number,
    threeMonth  : Number,
    year        : Number,
    threeYear   : Number,
    fiveYear    : Number,
    tenYear     : Number,
    allTime     : Number
  },
  prices : [PriceSchema],
  distributionPercentages : {
   shares                   : Number,
   corporateBonds           : Number,
   treasuryBonds            : Number,
   treasuryNotes            : Number,
   municipalBonds           : Number,
   treasuryBills            : Number,
   preferenceShares         : Number,
   commercialPapers         : Number,
   fixedBankDeposits        : Number,
   fixedNonBankDeposits     : Number,
   cash                     : Number,
   otherFunds               : Number,
   alternativeInvestments   : Number,
  }
});

var FundModel = mongoose.model("Fund", FundSchema);
exports.FundModel = FundModel;


var SchemeSchema = new Schema({
  name        : String,
  fundManager : FundManagerSchema,
  established : Date,
  funds       : [FundSchema]
});

var SchemeModel = mongoose.model("Scheme", SchemeSchema);
exports.SchemeModel = SchemeModel;
