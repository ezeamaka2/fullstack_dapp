async function main() {
    // We get the contract to deploy
    const Helloworld = await ethers.getContractFactory("Helloworld");
    const helloworld = await Helloworld.deploy('Hello world');
  
    console.log("MyFirstContract deployed to:", helloworld.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });