// We use the first method in our README.md file which is 
// 1. Deploy a Proxy manually

// This script we will write will do the upgrade in a manual way.
// hardhat deploy comes with an API to make it easy to upgrade or Box contract
// we will do it the manual way i.e upgrade it the manual way

const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    // Here we get the Box ABI, However we are going to load it at the transparentProxy address
    // This way ethers knows we are going to call all of our functions in our transparentProxy address
    // But the proxyBoxV1 will have the abi of Box
    // Which is what we want 
    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    const versionV1 = await proxyBoxV1.version()
    console.log(versionV1.toString())

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    // Here we get the BoxV2 ABI, However we are going to load it at the transparentProxy address
    // This way ethers knows we are going to call all of our functions in our transparentProxy address
    // But the proxyBoxV2 will have the abi of BoxV2
    // Which is what we want 
    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const versionV2 = await proxyBoxV2.version()
    console.log(versionV2.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// yarn hardhat run scripts/upgrade-box.js --network localhost
// yarn run v1.22.19
// warning package.json: No license field
// $ /home/shadow-walker/hardhat-upgrades-fcc/node_modules/.bin/hardhat run scripts/upgrade-box.js --network localhost
// 1
// 2
// Done in 16.95s.
