const Big = require("big.js");
const math = require("mathjs");
const { ethers } = require("ethers");

const calculateManagementFee = (percentage) => {
  // Given values
  let x = Big(percentage).div(100); // Convert percentage to decimal

  // Calculate effective management fee rate (k)
  let k = x.div(Big(1).plus(x));

  // Number of seconds in a year
  let N = math.bignumber(365 * 24 * 60 * 60); // Total seconds in a year

  // Calculate scaledPerSecondRate (f)
  let base = Big(1).plus(k).toString(); // Convert to string for math.js compatibility
  let fractionalExponent = math.bignumber(1).div(N);
  let f = math.pow(math.bignumber(base), fractionalExponent); // Use math.js for fractional power

  // Apply scaling factor of 10**27
  let scalingFactor = math.bignumber(10).pow(27);
  let scaledPerSecondRate = math.multiply(f, scalingFactor);

  // Convert to a full number string without scientific notation
  return ethers.toBigInt(
    scaledPerSecondRate.toFixed().toString().split(".")[0].toString()
  );
};

module.exports = {
  calculateManagementFee,
};
