class Building {
  public test_incremented_number = 0;

  public tick() {
    this.test_incremented_number = this.test_incremented_number + 1;
  }

  public getTestIncrementedNumber() {
    return this.test_incremented_number;
  }
}

// starting values here
const defaultBuilding: Building = new Building();

export default defaultBuilding;
