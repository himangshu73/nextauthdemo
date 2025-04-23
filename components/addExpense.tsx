"use client";

import { itemSchema } from "@/schemas/addItem";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SignIn from "./sign-in";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

type Props = {
  onClose: () => void;
};

const AddExpense = ({ onClose }: Props) => {
  const { status } = useSession();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemName: "",
      quantity: undefined,
      unit: "KG",
      price: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof itemSchema>) => {
    try {
      const response = await axios.post("api/expense/additem", values);
      toast(response.data.message);

      // Reset fields manually
      form.reset({
        itemName: "",
        quantity: undefined,
        unit: "KG",
        price: undefined,
      });
    } catch (error) {
      console.error(error);
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
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8"
      >
        <Form {...form}>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add Expense
          </h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Item Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-wrap gap-3"
                    >
                      {["KG", "LTR", "PC"].map((unit) => (
                        <FormItem
                          key={unit}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={unit} id={unit} />
                          </FormControl>
                          <FormLabel
                            htmlFor={unit}
                            className="text-sm font-medium"
                          >
                            {unit}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-1/3 transition-colors cursor-pointer"
              >
                Submit
              </Button>
              <Button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 w-1/3 transition-colors cursor-pointer"
              >
                Close
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddExpense;
