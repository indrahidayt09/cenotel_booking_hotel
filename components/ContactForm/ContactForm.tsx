"use client";
import { useActionState } from "react";
import { ContactMessage } from "@/lib/action";
import clsx from "clsx";

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(ContactMessage, null);
  return (
    <div className="bg-slate-200 p-10 rounded-xl shadow-md border border-slate-50">
      {state?.message && (
        <div
          className="p-4 mb-6 text-sm text-white rounded-lg bg-blue-500"
          role="alert"
        >
          <div className="font-medium">{state.message}</div>
        </div>
      )}

      <form action={formAction}>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* NAME */}
          <div>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg placeholder-slate-400 outline-none text-slate-700 transition"
              placeholder="Name*"
            />
            <p
              className="text-sm text-red-600 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.error?.name}
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              className="outline-none w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg placeholder-slate-400 text-slate-700 transition"
              placeholder="asepexample@gmail.com*"
            />
            <p
              className="text-sm text-red-600 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.error?.email}
            </p>
          </div>

          {/* SUBJECT */}
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg placeholder-slate-400 outline-none text-slate-700 transition"
              placeholder="Subject*"
            />
            <p
              className="text-sm text-red-600 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.error?.subject}
            </p>
          </div>

          {/* MESSAGE */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              rows={5}
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg placeholder-slate-400 outline-none text-slate-700 transition"
              placeholder="Your Message*"
            ></textarea>
            <p
              className="text-sm text-red-600 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.error?.message}
            </p>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className={clsx(
            "w-full py-3 font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition",
            {
              "bg-slate-400 text-slate-600 cursor-progress": isPending,
            }
          )}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
