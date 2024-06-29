"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type FormDataWithToken = FormData & {
  token: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const token = await recaptchaRef.current?.executeAsync();
      console.log("Token is", token);

      if (token) {
        const dataWithToken: FormDataWithToken = { ...data, token };
        await sendEmail(dataWithToken);
        alert("Form submitted successfully");
      } else {
        alert("Error getting token");
      }
    } catch (error) {
      console.error("Error in onSubmit", error);
      alert("There was an error submitting the form");
    }
  };

  const onChange = () => {
    // on captcha change
  };

  const asyncScriptOnLoad = () => {
    console.log("Google recaptcha loaded");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className="form-input"
          id="name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className="form-input"
          id="email"
          {...register("email", { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Type your message"
          className="form-input"
          id="message"
          {...register("message", { required: true })}
        ></textarea>
      </div>
      <div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6LeDQgMqAAAAANHCuTSPBsZn-FQRzmn_ePDzOou7"
        onChange={onChange}
        asyncScriptOnLoad={asyncScriptOnLoad}
      />
    </form>
  );
};

export default Contact;
