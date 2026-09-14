'use client';

import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { Textarea } from "@/components/elements/Textarea";
import { sendMessage } from "@/lib/sendMessage";
import { isValidEmail } from "@/utils/validateString";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((current) => ({ ...current, name: value }));

    if (nameError && value.trim()) {
      setNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((current) => ({ ...current, email: value }));

    if (emailError && value) {
      setEmailError("");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((current) => ({ ...current, message: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatus("");
    setSubmitMessage("");

    if (!formData.name.trim()) {
      setNameError("Please enter your name.");
      setSubmitStatus("error");
      setSubmitMessage("Please check your input and try again.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setEmailError("The email address format is invalid. (ex: name@example.com)")
      setSubmitStatus("error");
      setSubmitMessage("Please check your input and try again.");
      return
    }

    setNameError("");
    setEmailError("");
    setIsSubmitting(true);

    try {
      const response = await sendMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setNameError("");
        setEmailError("");
        setSubmitStatus("success");
        setSubmitMessage("Your message has been sent successfully.");
      } else {
        const data = response.data as { error?: string };
        setSubmitStatus("error");

        if (data.error === "All fields are required") {
          setNameError("Please enter your name.");
          setSubmitMessage("Please fill in all required fields.");
        }
        if (data.error === "Invalid email address") {
          setEmailError("The email address format is invalid. (ex: name@example.com)");
          setSubmitMessage("The email address format is invalid.");
        }

        if (data.error && data.error !== "All fields are required" && data.error !== "Invalid email address") {
          setSubmitMessage(data.error);
        }

        if (!data.error) {
          setSubmitMessage("Failed to send message. Please try again.");
        }
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      setSubmitStatus("error");
      setSubmitMessage("A network error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="glass-panel mx-auto flex w-full min-w-0 flex-col gap-5 rounded-[1.75rem] p-5 sm:p-6">
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.4em] text-emerald-300/70 uppercase">
          contact
        </p>
        <h2 className="text-2xl tracking-[0.12em] text-white sm:text-3xl">
          Send me a message
        </h2>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-full max-w-xl">
            <label htmlFor="name" className="mb-2 block font-mono text-sm tracking-[0.18em] text-white/72">
              Your name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          {nameError && (
            <p className="w-full max-w-xl text-sm text-red-300">{nameError}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full max-w-xl">
            <label htmlFor="email" className="mb-2 block font-mono text-sm tracking-[0.18em] text-white/72">
              Your email address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </div>
          {emailError && (
            <p className="w-full max-w-xl text-sm text-red-300">{emailError}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="mb-2 block font-mono text-sm tracking-[0.18em] text-white/72">
            Message
          </label>
          <Textarea
            name="message"
            id="message"
            placeholder="Tell me about what you need."
            value={formData.message}
            onChange={handleMessageChange}
          />
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </div>

      {submitStatus !== "" && (
        <p className={submitStatus === "error" ? "text-red-300" : "text-emerald-300"}>{submitMessage}</p>
      )}
    </form>
  );
}
