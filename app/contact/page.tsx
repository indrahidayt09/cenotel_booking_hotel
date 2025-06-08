import ContactForm from "@/components/ContactForm/ContactForm";
import Header from "@/components/Header-/Header";

import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";

const ContactPage = () => {
  return (
    <div>
      <Header title="Contact" subtitle="lorem ipsum dolor sit amet" />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info Section */}
          <div>
            <h1 className="text-lg text-blue-500 font-medium mb-3">
              Contact Us
            </h1>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-700 mb-6">
              Let Us Assist You
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Need help with a reservation, question, or special request? Fill
              out the form below and we’ll get back to you shortly.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-5 items-start">
                <div className="bg-slate-200 text-slate-700 p-3 rounded-md shadow-sm">
                  <IoMailOutline className="size-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-1">
                    Email
                  </h4>
                  <p className="text-blue-500  text-sm">example@gmail.com</p>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <div className="bg-slate-200 text-slate-700 p-3 rounded-md shadow-sm">
                  <IoCallOutline className="size-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-1">
                    Phone Number
                  </h4>
                  <p className="text-blue-500  text-sm">+62 3994 3434 343</p>
                </div>
              </li>
              <li className="flex gap-5 items-start">
                <div className="bg-slate-200 text-slate-700 p-3 rounded-md shadow-sm">
                  <IoLocationOutline className="size-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-700 mb-1">
                    Location
                  </h4>
                  <p className="text-blue-500 text-sm">
                    Street Road 2025 Regency
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
