type Event = {
  start_time: number;
  end_time: number;
};

class Scheduler {
  public events: Event[];

  constructor() {
    this.events = [];
  }

  addEvent({ start_time, end_time }: Event): boolean {
    // Validate input
    if (start_time >= end_time || start_time < 0 || end_time > 23) {
      return false;
    }

    // Check for overlaps
    for (const event of this.events) {
      if (!(end_time <= event.start_time || start_time >= event.end_time)) {
        return false;
      }
    }

    // Add event if no overlaps
    this.events.push({ start_time, end_time });
    // Sort events by start time
    this.events.sort((a, b) => a.start_time - b.start_time);
    return true;
  }

  getEvents() {
    return this.events;
  }
}

export default Scheduler;
