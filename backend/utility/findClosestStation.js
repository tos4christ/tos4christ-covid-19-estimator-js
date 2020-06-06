/* Function to find the closest firestation to the accident location */
function findClosestStation(accidentLocation, fireStation) {
  let closestStation;
  let min = Infinity;
  fireStation.reduce((init, next) => {
    const latDiff = Math.abs(accidentLocation.lat - next.lat);
    const lngDiff = Math.abs(accidentLocation.lon - next.lon);
    const tempMin = latDiff > lngDiff ? lngDiff : latDiff;
    if (tempMin < min) {
      min = tempMin;
      closestStation = next.nameOfUnit;
    }
    return tempMin;
  }, {});
  return closestStation;
}

/* Function to find the optimal route between the closest firestation and the accident location */
// function optimalRoute() {

// }

export default findClosestStation;
