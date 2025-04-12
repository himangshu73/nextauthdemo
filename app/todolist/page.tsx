"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { todolistSchema } from "@/schemas/todolistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BiCircle, BiCheckCircle } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import SignIn from "@/components/sign-in";
import { MdDeleteOutline, MdOutlineDeleteOutline } from "react-icons/md";

type Task = {
  _id: string;
  task: string;
  isCompleted: boolean;
};

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
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
    fetchTasks();
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/todo/showtask");
      setTasks(response.data.tasks || []);
      setCompletedTasks(response.data.completedTasks || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (
    taskId: string,
    currentState: boolean
  ) => {
    try {
      await axios.put("/api/todo/updatetask", {
        taskId,
        isCompleted: !currentState,
      });
      toast("Task Status Updated");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete("/api/todo/delete", { data: { taskId } });
      toast("Task Deleted Successfully");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  if (status === "unauthenticated") {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        <SignIn />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        Loading
      </div>
    );
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
            className="flex gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a task"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="shrink-0">
              Add Task
            </Button>
          </form>
        </div>
      </Form>
      <div className="bg-white rounded-md shadow-md p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">To Do List</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400 italic text-center">
            No tasks yet. Add one!
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex gap-2 p-2 items-center justify-between rounded hover:bg-gray-100 transition"
              >
                <div className="flex items-center">
                  <BiCircle
                    onClick={() =>
                      toggleTaskCompletion(task._id, task.isCompleted)
                    }
                    className="cursor-pointer mr-2 hover:text-blue-500 transition"
                  />

                  {task.task}
                </div>
                <div>
                  <MdDeleteOutline
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-md shadow-md p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
        {completedTasks.length === 0 ? (
          <p className="text-gray-400 italic text-center">
            No tasks completed yet!
          </p>
        ) : (
          <ul className="space-y-2">
            {completedTasks.map((task) => (
              <li
                key={task._id}
                className="flex gap-2 p-2 items-center justify-between line-through text-gray-400 rounded hover:bg-gray-100 transition"
              >
                <div className="flex items-center">
                  <BiCheckCircle
                    onClick={() =>
                      toggleTaskCompletion(task._id, task.isCompleted)
                    }
                    className="cursor-pointer mr-2 hover:text-blue-500 transition"
                  />
                  {"  "}
                  {task.task}
                </div>
                <div>
                  <MdDeleteOutline
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
