const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var FundManagerSchema = new Schema({
  "Name" : String,
  "Address" : String,
  "Email"   : String,
  "Password" : String,
  "Salt" :  String
});

var FundManagerModel = mongoose.model("Fund Manager", FundManagerSchema);
exports.FundManagerModel = FundManagerModel;


var SchemeSchema = new Schema({
  "Name" : String,
  "Fund Manager" : FundManagerSchema,
  "Established" : Date,
  "Funds" : [FundSchema]
});

var SchemeModel = mongoose.model("Scheme", SchemeSchema);
exports.SchemeModel = SchemeModel;


var PriceSchema = new Schema({
  "Price": Decimal128,
  "Date": Date
});

var PriceModel = mongoose.model("Price", PriceSchema);
exports.PriceModel = PriceModel;

var FundSchema = new Schema({
  "Fund Type": {
    type: String,
    enum: ["EQUITY","BALANCED","FIXED INCOME","MONEY MARKET", "OTHER"]
  },
  "Returns": {
    "Month": Decimal128,
    "Year": Decimal128,
    "3 Year": Decimal128,
    "5 Year": Decimal128,
    "10 Year": Decimal128,
    "All Time": Decimal128,
  },
  "Risk Adjusted Returns": {
    "Month": Decimal128,
    "Year": Decimal128,
    "3 Year": Decimal128,
    "5 Year": Decimal128,
    "10 Year": Decimal128,
    "All Time": Decimal128,
  },
  "Prices" : [PriceSchema],
  "Distribution Percentages" : {
   "Shares": Number,
   "corporate bonds": Number,
   "treasury bonds": Number,
   "treasury notes": Number,
   "municipal/ government bonds": Number,
   "treasury bills": Number,
   "preference shares": Number,
   "commercial papers": Number,
   "Fixed bank deposits": Number,
   "Fixed Non-bank deposits": Number,
   "Cash": Number,
   "Other funds": Number,
   "Alternative investments": Number,
  }
});

var FundModel = mongoose.model("Fund", FundSchema);
exports.FundModel = FundModel;
