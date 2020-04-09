const covid19ImpactEstimator = (data) => {
  const input = { ...data };
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
    requestedTime = duration / 3;
  }
  // Currently Infected
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  // Infections By Requested Time
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);
  // Severe Cases By Requested Time
  impact.severeCasesByRequestedTime = (0.15 * impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = (0.15 * severeImpact.infectionsByRequestedTime);
  // Hospital Beds by Requested Time
  impact.hospitalBedsByRequestedTime = (0.35 * input.totalHospitalBeds)
   - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = (0.35 * input.totalHospitalBeds)
   - severeImpact.severeCasesByRequestedTime;
};

export default covid19ImpactEstimator;
