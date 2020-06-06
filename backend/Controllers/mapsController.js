/* eslint-disable linebreak-style */
/* locs would be replaced by the coordinates sent to the server from the client */
// const locs = { lat: 6.3445645, lng: 3.4533255 };
/* firestations would be stored and pulled from the database, this is just a mock */
const fireStations = [
  { Lekki: { lat: 6.4355376, lng: 3.4829765 } },
  { Ajah: { lat: 6.4682876, lng: 3.5719866 } },
  { Ikeja: { lat: 6.6004382, lng: 3.3513756 } },
  { Ikorodu: { lat: 6.6144343, lng: 3.5094988 } },
  { Epe: { lat: 6.5854286, lng: 3.9566465 } },
  { Sangotedo: { lat: 6.4727703, lng: 3.6309526 } }
];

/* Function to find the closest firestation to the accident location */
function findClosestStation(accidentLocation) {
  let closestStation;
  let min = Infinity;
  fireStations.reduce((init, next) => {
    const station = Object.keys(next);
    const latDiff = Math.abs(accidentLocation.lat - next[station].lat);
    const lngDiff = Math.abs(accidentLocation.lng - next[station].lng);
    const tempMin = latDiff > lngDiff ? lngDiff : latDiff;
    if (tempMin < min) {
      min = tempMin;
      closestStation = station;
    }
    return tempMin;
  }, {});
  return closestStation;
}

/* Function to find the optimal route between the closest firestation and the accident location */
// function optimalRoute() {

// }

const mapsApi = (req, res) => {
  // Coordinates of the accident location
  const { accidentLocation } = req.body;
  const closestStation = findClosestStation(accidentLocation);
  res.json({
    closestStation,
    optimalRouteCoords: []
  });
};

/* This is to manually test the function and see that it works */
// const cs = findClosestStation(locs);
// console.log(cs);

/* This controller would be exported to the routes module to be used in the maps logic */
export default mapsApi;
