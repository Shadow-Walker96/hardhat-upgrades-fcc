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

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    // Be sure to check out the hardhat-deploy examples to use UUPS proxies!
    // https://github.com/wighawag/template-ethereum-contracts

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying.........................")
        await verify(box.Address, [])
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "box"]

// yarn hardhat deploy
// yarn run v1.22.19
// warning package.json: No license field
// $ /home/shadow-walker/hardhat-upgrades-fcc/node_modules/.bin/hardhat deploy
// Nothing to compile
// ----------------------------------------------------
// deploying "BoxProxyAdmin" (tx: 0x494a6233107c88e268115085a96d88d83665454edb90128b7e5254be4f28f09d)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 886443 gas
// deploying "Box_Implementation" (tx: 0x923cc073552caab1834d4807f96ec7a4f149e253c09590b2079e84dd8fe5297f)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 148423 gas
// deploying "Box_Proxy" (tx: 0x3e89eaa8d7a06c718ab6eac4f0c332170a3791ee89bd62888d196fbc5987bd0a)...: deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 544341 gas
// ----------------------------------------------------
// Done in 20.03s.




