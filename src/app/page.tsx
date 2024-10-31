"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Scheduler from "@/utils/Scheduler";
import { useState } from "react";
import { Clock } from "lucide-react";

const Home: React.FC = () => {
  const [scheduler] = useState(() => new Scheduler());
  const [events, setEvents] = useState<Event[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [error, setError] = useState("");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    // const start = parseInt(startTime);
    // const end = parseInt(endTime);

    // Input validation
    // if (isNaN(start) || isNaN(end)) {
    //   setError("Please enter valid numbers for start and end times");
    //   return;
    // }

    if (startTime >= endTime) {
      setError("End time must be after start time");
      return;
    }

    if (startTime < 0 || endTime > 23) {
      setError("Times must be between 0 and 23");
      return;
    }

    const success = scheduler.addEvent({
      start_time: startTime,
      end_time: endTime,
    });

    if (success) {
      setEvents(scheduler.getEvents());
      setStartTime(0);
      setEndTime(0);
      setError("");
    } else {
      setError("Event overlaps with existing events");
    }
  };

  const formatTime = (hour: number): string => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-900">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Daily Event Scheduler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Start Time (0-23)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Enter start time"
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  End Time (0-23)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="Enter end time"
                  className="w-full"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Add Event
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Scheduled Events</h3>

            {/* Timeline visualization */}
            <div className="relative h-12 bg-gray-100 rounded-lg mb-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="absolute h-full bg-blue-500 opacity-75 rounded"
                  style={{
                    left: `${(event.start_time / 24) * 100}%`,
                    width: `${
                      ((event.end_time - event.start_time) / 24) * 100
                    }%`,
                  }}
                />
              ))}
            </div>

            {/* Time markers */}
            <div className="flex justify-between text-sm text-gray-500">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>

            {/* Event list */}
            <div className="mt-6 space-y-2">
              {events.length === 0 ? (
                <p className="text-gray-500 text-center">No events scheduled</p>
              ) : (
                events.map((event, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    {formatTime(event.start_time)} -{" "}
                    {formatTime(event.end_time)}
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
