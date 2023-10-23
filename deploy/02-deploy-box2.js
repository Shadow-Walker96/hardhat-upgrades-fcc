const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")

const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")

    const boxv2 = await deploy("BoxV2", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Be sure to check out the hardhat-deploy examples to use UUPS proxies!
    // https://github.com/wighawag/template-ethereum-contracts

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...............")
        await verify(boxv2.address, [])
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "boxv2"]


// yarn hardhat deploy
// yarn run v1.22.19
// warning package.json: No license field
// $ /home/shadow-walker/hardhat-upgrades-fcc/node_modules/.bin/hardhat deploy
// Nothing to compile
// ----------------------------------------------------
// deploying "BoxProxyAdmin" (tx: 0xb759af2aba468d0e4b1db7c00df37de30d6861e5af7a5a8974654dc045e56a74)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 886443 gas
// deploying "Box_Implementation" (tx: 0xe222c72fbcecf9cbdd714d8a11f75f1a44f5a7f9c7881787e8a471784186471a)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 148423 gas
// deploying "Box_Proxy" (tx: 0x3e89eaa8d7a06c718ab6eac4f0c332170a3791ee89bd62888d196fbc5987bd0a)...: deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 544341 gas
// ----------------------------------------------------
// ----------------------------------------------------
// deploying "BoxV2" (tx: 0x7497cab4af9606ade0a1f39e9d2f209f4ef9bba76886425881be9137d75a1562)...: deployed at 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 with 198595 gas
// ----------------------------------------------------
// Done in 18.20s.
