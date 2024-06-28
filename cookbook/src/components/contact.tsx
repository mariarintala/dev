"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import type { AppProps } from "next/app";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  const handleClick = async ($event: any) => {
    $event.preventDefault();
    try {
      recaptchaRef.current.reset();
      const token = await recaptchaRef.current.executeAsync();
      console.log("token is ", token);
      if (token) {
        alert("Form submitted");
      } else {
        alert("Error getting token");
      }
    } catch (error) {
      console.log("error in handleClick ", error);
    }
  };

  const recaptchaRef: any = React.createRef();

  const onChange = () => {
    // on captcha change
  };

  const asyncScriptOnLoad = () => {
    console.log("Google recaptcha loaded");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label htmlFor="name" className="">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className=""
          id="name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="">
        <label htmlFor="email" className="">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className=""
          id="email"
          {...register("email", { required: true })}
        />
      </div>
      <div className="">
        <label htmlFor="message" className="">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Type your message"
          className=""
          id="message"
          {...register("message", { required: true })}
        ></textarea>
      </div>
      <div>
        <button className="" onClick={handleClick}>
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
