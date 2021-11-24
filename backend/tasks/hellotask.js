task("read-value", "Prints hello world to the screem")
  .addParam("contract", "The contract address")
  .setAction(async (taskArgs) => {
      const myHelloworldAddress = taskArgs.contract;
      const MyContract = await ethers.getContractFactory("Helloworld");

      const accounts = await ethers.getSigners();
      const signer = accounts[0];
      const helloworldContract = await new ethers.Contract(myHelloworldAddress, MyContract.interface, signer);

      let result = await helloworldContract.readMesage();


    console.log("The current stored value is: "+ result);
  });

  task("set-value", "Set the value of the message")
  .addParam("contract", "The contract address")
  .addParam("value", "Add New Message")
  .setAction(async (taskArgs) => {
      const myHelloworldAddress = taskArgs.contract;
      const value = taskArgs.value;
      const MyContract = await ethers.getContractFactory("Helloworld");

      const accounts = await ethers.getSigners();
      const signer = accounts[0];
      const myHelloworldContract = await new ethers.Contract(myHelloworldAddress, MyContract.interface, signer);

      let result = await myHelloworldContract.updateMessage(value);


    console.log("New value set to: "+ value);
  });