const { ethers } = require("ethers");
const { calculateManagementFee } = require("./calculateManagementFee");
const { contractAddresses } = require("./consts");

async function main() {
  // ------------------------------------------- start of controllers -----------------------------------------------------

  // controll if fee is direct
  const entranceFeeIsDirect = true;
  const exitFeeIsDirect = false;

  const managementFee = calculateManagementFee(1);

  // ------------------------------------------- end of controllers -----------------------------------------------------

  //this constant
  const feeData = [
    {
      enable: true,
      address: contractAddresses.ManagementFee, //managmentFee
      encodeParam: ["uint128", "address"],
      data: [managementFee, "0x1f9090aae28b8a3dceadf281b0f12828e676c326"],
    },

    {
      enable: true,
      address: contractAddresses.PerformanceFee, //performanceFee
      encodeParam: ["uint128", "address"],
      data: [
        ethers.toBigInt("400"),
        "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
      ],
    },

    {
      enable: true,
      address: entranceFeeIsDirect
        ? contractAddresses.EntranceRateDirectFee
        : contractAddresses.EntranceRateBurnFee,
      encodeParam: entranceFeeIsDirect ? ["uint128", "address"] : ["uint128"],
      data: entranceFeeIsDirect
        ? [ethers.toBigInt("500"), "0x1f9090aae28b8a3dceadf281b0f12828e676c326"]
        : [ethers.toBigInt("500")],
    },

    {
      enable: true,
      address: exitFeeIsDirect
        ? contractAddresses.ExitRateDirectFee
        : contractAddresses.ExitRateBurnFee,
      encodeParam: exitFeeIsDirect
        ? ["uint128", "uint128", "address"]
        : ["uint128", "uint128"],
      data: exitFeeIsDirect
        ? [
            ethers.toBigInt("600"),
            ethers.toBigInt("700"),
            "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
          ]
        : [ethers.toBigInt("600"), ethers.toBigInt("700")],
    },
  ];

  let fees = [];

  // Settings fee data
  let settingsData = [];

  for (let index = 0; index < feeData.length; index++) {
    if (feeData[index].enable) {
      const encoding = ethers.AbiCoder.defaultAbiCoder().encode(
        feeData[index].encodeParam,
        feeData[index].data
      );
      fees.push(feeData[index].address);
      settingsData.push(encoding);
    }
  }

  // Encode call arguments
  const callArgs = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address[]", "bytes[]"],
    [fees, settingsData]
  );

  console.log("Encoded Call Args:", callArgs);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
