"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignInPage = () => {
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setSubmit(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      toast("Signed In Successfully");
      router.push("/");
      setSubmit(false);
    } else {
      toast("Incorrect Email or Password.");
      setSubmit(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rouned-2xl shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="●●●●●●●●" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg transition-all cursor-pointer"
            >
              {submit ? "Submitting" : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-black hover:bg-gray-800 text-white py-2 text-lg"
        >
          Sign in with Github
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
