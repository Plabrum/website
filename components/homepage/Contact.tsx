import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

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
  const [formInProgress, setFormInProgress] = useState<boolean>(false);
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
    setFormInProgress(false);
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setFormInProgress(true);
    if (!executeRecaptcha) {
      console.log("captcha not ready");
      return;
    }
    const token = await executeRecaptcha();
    const captchaFormData = {
      token: token,
      ...formData,
    };
    //Todo: make this with axios and remove the ugly .then methods
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

  const contact_box: string = `border border-custom-t2 bg-custom-bg3 rounded-lg px-6 py-4 transition-all text-custom-t1 placeholder-custom-t4
  outline-none focus:ring `;

  // focus:border-custom-t2 border-2  hover:border-custom-t4

  return (
    <div className="relative h-3/4 flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 mx-auto sm:w-1/2 w-3/4 max-w-[800px] appearance-none"
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
          className={contact_box + " col-span-2  min-h-[150px]"}
        />

        <button
          type="submit"
          disabled={formInProgress}
          className="col-span-2 flex  h-14 bg-custom-t4  items-center justify-center rounded-md "
        >
          <div className="  ">
            {formInProgress ? (
              <FaSpinner className="mx-auto animate-spin w-6 h-6" />
            ) : (
              <p className=" text-custom-t1 dont-bold text-sm uppercase tracking-[4px]">
                Submit
              </p>
            )}
          </div>
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
      <div className="text-xs text-custom-t4 mt-2 sm:w-1/2 w-3/4 max-w-[650px] text-center">
        <span>{"This site is protected by reCAPTCHA and the Google "}</span>
        <a
          className="underline text-custom-t5"
          href="https://policies.google.com/privacy"
        >
          {"Privacy Policy"}
        </a>
        {" and "}
        <a
          className="underline text-custom-t5"
          href="https://policies.google.com/terms"
        >
          {"Terms of Service"}
        </a>
        {" apply."}
      </div>
    </div>
  );
}

export default Contact;
