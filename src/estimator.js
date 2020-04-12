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
  // Currently Infected
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  // Infections By Requested Time
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);
  // Severe Cases By Requested Time
  impact.severeCasesByRequestedTime = parseInt((0.15 * impact.infectionsByRequestedTime), 10);
  severeImpact.severeCasesByRequestedTime = parseInt((0.15 * severeImpact.infectionsByRequestedTime), 10);
  // Hospital Beds by Requested Time
  impact.hospitalBedsByRequestedTime = parseInt((0.35 * input.totalHospitalBeds), 10)
   - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = parseInt((0.35 * input.totalHospitalBeds), 10)
   - severeImpact.severeCasesByRequestedTime;
  // Cases for ICU and Ventilators
  impact.casesForICUByRequestedTime = parseInt((0.05 * impact.infectionsByRequestedTime), 10);
  severeImpact.casesForICUByRequestedTime = parseInt((0.05 * severeImpact.infectionsByRequestedTime), 10);
  impact.casesForVentilatorsByRequestedTime = parseInt((0.02 * impact.infectionsByRequestedTime), 10);
  severeImpact.casesForVentilatorsByRequestedTime = parseInt((0.02 * severeImpact.infectionsByRequestedTime), 10);
  // Dollars in flight
  impact.dollarsInFlight = impact.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
   * (input.region.avgDailyIncomeInUSD * duration);
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime
   * input.region.avgDailyIncomePopulation * (input.region.avgDailyIncomeInUSD * duration);
  // Output
  return { data: input, impact, severeImpact };
};

export default covid19ImpactEstimator;
