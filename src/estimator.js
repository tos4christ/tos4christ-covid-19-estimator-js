const covid19ImpactEstimator = (data) => {
    const input = {...data};
    const impact = {};
    const severeImpact = {};
    let duration, requestedTime = 0;
    if (input.periodType === "days") {
        duration = input.timeToElapse;
    } else if (input.periodType === "weeks") {
        duration = input.timeToElapse * 7;
    } else if (input.periodType === "months") {
        duration = input.timeToElapse * 30;
    }
    impact.currentlyInfected = input.reportedCases * 10;
    severeImpact.currentlyInfected = input.reportedCases * 50;

    if (duration >= 3) {
        requestedTime = duration / 3
    }
    impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, requestedTime);
    severImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, requestedTime);
};

export default covid19ImpactEstimator;
