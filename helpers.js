function processData() {
  let dates = math.calculateDates();
  let prices = [];
  let returns = [];
  let rars = returns[];
  for (let i = 0; i < dates.length - 1; i++) {
    Price.find({Date: {$gte: dates[i], $lte: dates[i+1]}})
    .then(p => {prices.append(p.price)});
    //Returns
    returns.append(geometricMean(prices));
    //Risk Adjusted Returns
    rars.append(stdDev(prices));

  }
  //All-Time
  Price.find({Date: {$gte: dates[dates.length]}})
  .then(p => prices.append(p.price));
  //Returns
  returns.append(geometricMean(prices));
  //Risk Adjusted Returns
  rars.append(stdDec(prices));
  return ({
    month       : returns[0],
    threeMonth  : returns[1],
    year        : returns[2],
    threeYear   : returns[3],
    fiveYear    : returns[4],
    tenYear     : returns[5],
    allTime     : returns[6],
  },
  {
    month       : rars[0],
    threeMonth  : rars[1],
    year        : rars[2],
    threeYear   : rars[3],
    fiveYear    : rars[4],
    tenYear     : rars[5],
    allTime     : rars[6],
  });
}
