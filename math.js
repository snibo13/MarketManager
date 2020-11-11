function geometricMean(datapoints) {
  let val = datapoints[0] + 1;
  for(let i = 1; i < datapoints.length; i++) {
    let temp = datapoints[i] + 1;
    val *= temp;
  }
  return Math.pow(val, 1/datapoints.length);
}

function arithmeticMean(datapoints) {
  let val = initialValue;
  for (let i = 0; i < datapoints.length; i++) {
    val += datapoints[i];
  }
  return val/datapoints.length;
}

function stdDev(datapoints) {
  let mean = arithmeticMean(datapoints);
  let variance = 0;
  for (let i = 0; i < datapoints.length; i++) {
    let diff = Math.abs(datapoints[i] - mean);
    variance += diff * diff;
  }
  return Math.sqrt(variance);
}

function undoGeometric(val, points) {
  return Math.pow(val, points);
}

function calculateDates() {
  let present = new Date();
  let oneMonth = new Date();
  oneMonth.setMonth(present.getMonth() + 1);
  let twoMonth = oneMonth;
  twoMonth.setMonth(present.getMonth() + 1);
  let threeMonth = oneMonth;
  threeMonth.setMonth(oneMonth.getMonth() + 2);
  let oneYear = new Date();
  oneYear.setYear(present.getYear() + 1);
  let threeYear = oneYear;
  threeYear.setYear(oneYear.getYear() + 2);
  let tenYear = threeYear;
  tenYear.setYear(threeYear.getYear() + 7);
  return[present, oneMonth, threeMonth, oneYear, threeYear, tenYear];
}
