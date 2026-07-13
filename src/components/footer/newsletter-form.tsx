"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <Button type="submit" disabled={isSubmitting} className="shrink-0">
          {isSubmitting ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      {errors.email ? (
        <p className="text-xs text-destructive">{errors.email.message}</p>
      ) : isSubmitSuccessful ? (
        <p className="text-xs text-success">Thank you for subscribing.</p>
      ) : null}
    </form>
  );
}

export { NewsletterForm };
