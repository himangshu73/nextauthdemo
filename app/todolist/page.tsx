"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { todolistSchema } from "@/schemas/todolistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BiCircle } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const TodoList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const form = useForm<z.infer<typeof todolistSchema>>({
    resolver: zodResolver(todolistSchema),
    defaultValues: {
      todo: "",
    },
  });
  const { data, status } = useSession();
  const userId = data?.user._id;

  async function onSubmit(values: z.infer<typeof todolistSchema>) {
    try {
      const response = await axios.post("/api/todo/add", {
        task: values.todo,
        userId,
      });
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
    form.reset();
  }

  return (
    <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center bg-gray-100 px-4 gap-2">
      <Form {...form}>
        <div className="bg-white rounded-md shadow-md p-8 max-w-md w-full space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            To Do List
          </h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex gap-4"
          >
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Enter a task" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Add Task</Button>
          </form>
        </div>
      </Form>
      <div className="bg-white rounded-md shadow-md p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">To Do List</h2>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex gap-2 items-center">
              <BiCircle /> {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
