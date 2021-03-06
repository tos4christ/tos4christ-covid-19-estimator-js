const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
  let duration;
  let requestedTime = 0;
  if (input.periodType === 'days') {
    duration = input.timeToElapse;
  } else if (input.periodType === 'weeks') {
    duration = input.timeToElapse * 7;
  } else if (input.periodType === 'months') {
    duration = input.timeToElapse * 30;
  }
  if (duration >= 3) {
    requestedTime = parseInt((duration / 3), 10);
  }
  // CHALLENGE 1
  // Currently Infected
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  // Infections By Requested Time
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);
  // CHALLENGE 2
  // Severe Cases By Requested Time
  impact.severeCasesByRequestedTime = Math.ceil((0.15 * impact.infectionsByRequestedTime));
  const sCBRT = 0.15 * severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = Math.ceil((sCBRT));
  // Hospital Beds by Requested Time
  impact.hospitalBedsByRequestedTime = Math.ceil((0.35 * input.totalHospitalBeds))
   - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.ceil((0.35 * input.totalHospitalBeds))
   - severeImpact.severeCasesByRequestedTime;
  // CHALLENGE 3
  // Cases for ICU and Ventilators
  impact.casesForICUByRequestedTime = Math.floor((0.05 * impact.infectionsByRequestedTime));
  const sCFICUBRT = 0.05 * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = Math.floor((sCFICUBRT));
  const iCFVBRT = 0.02 * impact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = Math.floor((iCFVBRT));
  const sCFVBRT = 0.02 * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor((sCFVBRT));
  // Dollars in flight
  impact.dollarsInFlight = Math.floor((input.region.avgDailyIncomePopulation
   * input.region.avgDailyIncomeInUSD * impact.infectionsByRequestedTime) / duration);
  severeImpact.dollarsInFlight = Math.floor((severeImpact.infectionsByRequestedTime
   * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD) / duration);
  // Output
  return { data: input, impact, severeImpact };
};

export default covid19ImpactEstimator;
