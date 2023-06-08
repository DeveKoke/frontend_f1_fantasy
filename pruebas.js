
// const selectedDrivers = ['Driver1', 'Driver2', 'Driver3'];
// const driversSelected = { driver1: "", driver2: "", driver3: "" };

// selectedDrivers.forEach((items))

const driversObjetc = { driver1: "", driver2: "", driver3: "" };
const driversArr = ['ver', 'per', 'lec'];

driversArr.forEach((driver, index) => {
  const driverIndex = index + 1;
  const driverKey = `driver${driverIndex}`;
  driversObjetc[driverKey] = driver;
});

console.log(driversObjetc);
