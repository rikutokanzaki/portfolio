'use client';

import { Input } from "@/components/elements/Input";
import { Textarea } from "@/components/elements/Textarea";
import { Button } from "@/components/elements/Button";
import { useState } from "react";
import { isValidEmail } from "@/utils/validateString";
import { sendMessage } from "@/services/sendMessage";

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
    <form noValidate onSubmit={handleSubmit} className="p-8 w-full mx-auto bg-(--background) border-2 border-white rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.35)] flex flex-col gap-8">
      <div className="mx-auto w-1/3 min-w-60 text-center border-b-2 border-dashed">
        <h2 className="mb-2 text-xl">Send me a message</h2>
      </div>

      <div className="flex flex-col gap-5">
        <div className="w-4/5 flex flex-col">
          <div className="w-full max-w-50">
            <label htmlFor="name">Your name</label>
            <Input
              type="text"
              id="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          {nameError && (
            <p className="w-full text-red-600">{nameError}</p>
          )}
        </div>

        <div className="w-4/5 flex flex-col">
          <div className="w-full max-w-50">
            <label htmlFor="email">Your email address</label>
            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </div>
          {emailError && (
            <p className="w-full text-red-600">{emailError}</p>
          )}
        </div>

        <div>
          <label htmlFor="message">Message</label>
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
        <p className={submitStatus === "error" ? "text-red-600" : "text-[#22c55e]"}>{submitMessage}</p>
      )}
    </form>
  );
}
