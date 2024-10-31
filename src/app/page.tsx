"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Scheduler from "@/utils/Scheduler";
import { useState } from "react";
import { Clock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const taskSchedulerFormSchema = z.object({
  start_time: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .refine((val) => val >= 0 && val <= 23, "Must be between 0 and 23")
  ),
  end_time: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .refine((val) => val >= 0 && val <= 23, "Must be between 0 and 23")
  ),
});

const Home: React.FC = () => {
  const [scheduler] = useState(() => new Scheduler());

  const { toast } = useToast();

  const formatTime = (hour: number): string => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  const taskSchedulerForm = useForm<z.infer<typeof taskSchedulerFormSchema>>({
    resolver: zodResolver(taskSchedulerFormSchema),
    defaultValues: {
      start_time: 0,
      end_time: 0,
    },
  });

  function onSubmit(data: z.infer<typeof taskSchedulerFormSchema>) {
    const startTime = data.start_time;
    const endTime = data.end_time;

    if (startTime >= endTime) {
      toast({
        variant: "destructive",
        description: "End time must be after start time",
        className: "bg-red-400",
      });
      return;
    }

    if (startTime < 0 || endTime > 23) {
      toast({
        variant: "destructive",
        description: "Times must be between 0 and 23",
        className: "bg-red-400",
      });
      return;
    }

    const success = scheduler.addEvent({
      start_time: startTime,
      end_time: endTime,
    });

    if (success) {
      taskSchedulerForm.reset();
      toast({
        description: "Task added succesfully",
        className: "bg-green-500",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Event overlaps with existing events",
        className: "bg-red-400",
      });
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full bg-gray-900">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Daily Event Scheduler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...taskSchedulerForm}>
              <form
                onSubmit={taskSchedulerForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-row w-full gap-4 p-2">
                  <FormField
                    control={taskSchedulerForm.control}
                    name="start_time"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Start Time (0-23)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={taskSchedulerForm.control}
                    name="end_time"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>End Time (0-23)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Event
                </Button>
              </form>
            </Form>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Scheduled Events</h3>

              {/* Timeline visualization */}
              <div className="relative h-12 bg-gray-100 rounded-lg mb-4">
                {scheduler.events.map((event, index) => (
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
                {scheduler.events.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No events scheduled
                  </p>
                ) : (
                  scheduler.events.map((event, index) => (
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
    </>
  );
};

export default Home;
