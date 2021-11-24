const {expect} = require('chai');

describe("My Metamask and web3 Contract connection", async () => {
    before(async () => {
        Helloworld = await ethers.getContractFactory("Helloworld");
        helloworld = await Helloworld.deploy('Hello world');

        await helloworld.deployed();
    })


    it("Initial return Hello world", async () => {
        expect((await helloworld.readMesage()).toString()).to.equal("Hello world")
    })

    it("Retrieve returns the previous value that was stored", async () => {
        await helloworld.updateMessage("Learning metamask");
        expect((await helloworld.readMesage()).toString()).to.equal("Learning metamask")
    })
})