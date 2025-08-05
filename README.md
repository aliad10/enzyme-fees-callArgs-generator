
# 🧮 Enzyme Vault Fee Encoder

This project generates ABI-encoded `callArgs` used to configure **fees** during Enzyme Vault creation.

It supports encoding of:

* Management Fee
* Performance Fee
* Entrance Fee (burn or direct)
* Exit Fee (burn or direct)

---

## ⚙️ Configuration

Edit the flags in `index.js` to control how fees are applied:

```js
const entraceFeeAllocation = feeAllocationList.MANAGER_OR_OTHERS;
const exitFeeAllocation = feeAllocationList.VAULT;
```

Change percentage values and recipient in `consts.js`:

```js
const performanceFeeAmount = ethers.toBigInt("400"); // 4%
const entranceFeeAmount = ethers.toBigInt("500");   // 5%
const recipientAddress = "0x...";                   // Fee recipient
```

Management fee is calculated with `calculateManagementFee(1)` representing **1% annually**, scaled to per-second.

---

## 📦 Output

Running the script will print the ABI-encoded `callArgs`:

```bash
Encoded Call Args: 0x...
```

This value is passed into Enzyme’s `FundDeployer.createNewFund(...)` as the fee configuration input.

---

## 🏗️ Project Structure

```
.
├── index.js                    # Main script (run this)
├── consts.js                   # Contract addresses and fee settings
├── calculateManagementFee.js  # Converts % per year to scaled per-second rate
```

---

## 🚀 Run the Script

```bash
npm install
node index.js
```

---

## 🛠️ Contract Addresses (Arbitrum)

All Enzyme fee contracts used are deployed on Arbitrum. You can modify them in `consts.js` if needed.

---

## 📜 License

MIT

