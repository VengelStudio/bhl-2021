class TimeManager {
  private currentTime: Date;
  private readonly tick_size_in_mins = 10;

  constructor(initialDateTime: Date) {
    this.currentTime = initialDateTime;
  }

  public tick() {
    const before = this.currentTime;
    before.setMinutes(before.getMinutes() + this.tick_size_in_mins);
    const after = new Date(before);

    this.currentTime = after;
  }

  public getTime() {
    return this.currentTime;
  }
}

const initialTime: TimeManager = new TimeManager(new Date());

export default initialTime;
