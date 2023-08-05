import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useAuth } from '../AuthContext';
// import { userEvent } from "@testing-library/user-event/dist/types/setup";

export default function ContactUs() {
  const {user}  = useAuth();
  const form = useRef();
  const [formStatus, setFormStatus] = React.useState("Send");

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    emailjs
      .sendForm("service_tfsl5gj", "template_afwt2gf", form.current, "qpxSDyA1PykJtbR_N")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setFormStatus("Submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full names"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
              value={user.username}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value = {user.email}
              required
              // pattern="^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+1234567890"
              required
              pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
              title="Phone number must be in the format +1234567890"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Message"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-opacity-50"
          >
            {formStatus}
          </button>
        </form>
      </div>
    </div>
  );
}
