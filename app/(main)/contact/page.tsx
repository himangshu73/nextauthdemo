"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/schemas/contactSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Contact() {
  const [submit, setSubmit] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    try {
      setSubmit(true);
      const response = await axios.post("/api/contact", values);
      toast.success(response.data.message);
      form.reset();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || "Something went wring. Try again.";
      toast.error(message);
    } finally {
      setSubmit(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-8 rounded-2xl shadow-md max-w-md w-full"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Contact Me!
          </h1>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message here..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-sm bg-blue-600 hover::bg-blue700 text-white py-2 text-lg transition-all cursor-pointer"
          >
            {submit ? (
              <>
                <span className="animate-spin mr-2">↻</span>Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
