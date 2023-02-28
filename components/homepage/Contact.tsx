import React, { useCallback, useRef, useState } from "react";
import {
  EnvelopeIcon,
  MapIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

function Contact({}: Props) {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [emailResponse, setEmailResponse] = useState<string | null>(null);
  // const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  // const recaptchaRef = useRef<any>();

  function onError(e: any, backend: boolean) {
    const errorLoc: string = backend ? "Backend" : "Frontend";
    const error_message: string = e.error;
    setEmailResponse(error_message);
    console.log("Error", e);
  }
  function onSuccess(data: any) {
    setEmailResponse("success");
    reset();
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (!executeRecaptcha) {
      console.log("captcha not ready");
      return;
    }
    const token = await executeRecaptcha();
    const captchaFormData = {
      token: token,
      ...formData,
    };

    const response = fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(captchaFormData),
    })
      .then((response) => {
        if (response?.ok) {
          response.json().then((data) => onSuccess(data));
        } else {
          response.json().then((data) => onError(data, true));
        }
      })
      .catch((error) => {
        onError(error, false);
      });
  };

  const contact_box: string = ` bg-custom-bg2 rounded-lg px-6 py-4 transition-all text-custom-t2 placeholder-custom-t4
  outline-none focus:ring focus:border-custom-t2`;

  // focus:border-custom-t2 border-2  hover:border-custom-t4

  return (
    <div className="relative h-3/4 flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 mx-auto sm:w-1/2 w-3/4 appearance-none"
      >
        <input
          {...register("name")}
          placeholder="Name"
          className={contact_box + " sm:col-span-1 col-span-2"}
          type="text"
        />
        <input
          {...register("email")}
          placeholder="Email"
          className={contact_box + " sm:col-span-1 col-span-2"}
          type="email"
        />

        <input
          {...register("subject")}
          placeholder="Subject"
          autoComplete="off"
          className={contact_box + " col-span-2"}
          type="text"
        />
        <textarea
          {...register("message")}
          placeholder="Message"
          autoComplete="off"
          className={contact_box + " col-span-2"}
        />

        <button
          type="submit"
          className="col-span-2 bg-custom-t4 py-5 uppercase tracking-[4px] px-10 rounded-md  text-custom-t1 dont-bold text-sm"
        >
          Submit
        </button>
      </form>
      {emailResponse ? (
        <div
          className={
            "flex flex-row md:w-1/2 mt-4 justify-self-center text-white px-6 py-4 rounded items-center justify-between " +
            (emailResponse === "success" ? "bg-blue-500" : "bg-red-400")
          }
        >
          <span className=" ">
            {emailResponse === "success"
              ? "Success! Contact message has been sent!"
              : `Error submitting contact form: ${emailResponse}`}
          </span>
          <button className="" onClick={() => setEmailResponse(null)}>
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Contact;
