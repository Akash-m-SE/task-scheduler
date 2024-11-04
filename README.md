
# Task Scheduler

A simple scheduling application built with Next.js, TypeScript, Tailwind CSS, ShadCN, and Zod for event validation. This app manages and displays daily events within a 24-hour period, ensuring no overlap between scheduled times.
## Features

**Add Events:** Users can add new events by specifying a start and end time.

**Event Overlap Validation:** The `addEvent` method in the `Scheduler` class ensures that no two events overlap.

**Retrieve Events:** Users can view all scheduled events in a clear and organized layout.

**User Interface:** A visually appealing and intuitive UI designed with Tailwind CSS, displaying events in a timeline format.

**Input Validation:** Input validation is implemented using Zod to prevent invalid time entries.
## Implementation Details

## Scheduler Class

- **Events Storage:** The class maintains a list of events.

- **Add Event:** The `addEvent` method checks for overlaps before adding a new event.
    - If there's an overlap with an existing event, the method returns false, and the event is not added.
    - If no overlap exists, the method returns true, and the event is successfully added.

- **Get Events:** The getEvents method returns the list of all added events.
## Deployment

You can access the live version of task-scheduler app here: [Live Demo](https://task-scheduler-nu.vercel.app/)



## Installation

**1.** Git Clone the Repository

**2.** Navigate to the directory where the repository was downloaded

```
cd task-scheduler
```

**3.** Install the Dependencies

```
pnpm install
```


**4.** Start the application in development mode

```
pnpm run dev
```

**5.** Access your application via port - http://localhost:3000
## Tech Stack

**Language:** TypeScript

**Frontend:** Next.js, HTML, Tailwind CSS, ShadCN, Zod

**Validation:** Zod

**Component Library:** ShadCN

**Deployment:** Vercel