"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function WaitlistForm({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setMessage("Thanks! We’ll be in touch shortly.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@company.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={status === "submitting"} className="sm:self-end">
            {status === "submitting" ? "Joining…" : "Join Waitlist"}
          </Button>
        </div>
        {message && (
          <p className={`mt-2 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </form>
    </Form>
  );
}
