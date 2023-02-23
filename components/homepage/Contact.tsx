import React from "react";
import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

function Contact({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:blahblah@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };
  const contact_box: string = ` bg-custom-bg2 rounded-lg px-6 py-4 transition-all text-custom-t2 placeholder-custom-t4
  outline-none focus:ring focus:border-custom-t2`;

  // focus:border-custom-t2 border-2  hover:border-custom-t4

  return (
    <div className="h-3/4 grid grid-cols-1 items-center justify-center ">
      {/* <div className="flex flex-col space-y-10"> */}
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
    </div>
    // </div>
  );
}

export default Contact;
