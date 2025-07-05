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
import { magicEmailSchema } from "@/schemas/magicEmail";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignInPage = () => {
  const [submit, setSubmit] = useState(false);
  const [magicLink, setMagicLink] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const magicForm = useForm<z.infer<typeof magicEmailSchema>>({
    resolver: zodResolver(magicEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setSubmit(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      if (!result) {
        toast.error("No response from server");
        return;
      }

      if (result.error) {
        const errorMessage =
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error;
        toast.error(errorMessage);
        console.error("Login failed:", result.error);
      } else if (result?.ok) {
        toast.success("Signed in successfully");
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmit(false);
    }
  }

  async function onMagicSubmit(values: z.infer<typeof magicEmailSchema>) {
    if (cooldown > 0) {
      toast.warning(`Please wait ${cooldown}s before sending again.`);
      return;
    }

    try {
      setMagicLink(true);
      const response = await signIn("email", {
        email: values.email,
        redirect: false,
        callbackUrl,
      });

      setCooldown(30);

      if (response?.ok) {
        toast.success("Check your email for a magic link!");
        magicForm.reset();
      } else {
        toast.error(response?.error || "Failed to send magic link.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setMagicLink(false);
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
              {submit ? "Signing In" : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 space-y-4">
          <h3 className="text-center text-gray-500 text-sm">
            Or sign in with magic link
          </h3>
          <Form {...magicForm}>
            <form
              onSubmit={magicForm.handleSubmit(onMagicSubmit)}
              className="space-y-4"
            >
              <FormField
                control={magicForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={cooldown > 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {magicLink
                  ? "Sending Magic Link"
                  : cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : "Send Magic Link"}
              </Button>
            </form>
          </Form>
        </div>

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
