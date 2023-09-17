"use client";

import React, { SyntheticEvent, useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Toggle from "./Toggle";
import { JWT } from "google-auth-library";

type ContactForm = {
  firstName: string;
  lastName: string;
  phone: string;
  allergies_preferences: string;
  speech: boolean;
};

type SpreadsheetRow = {
  Förnamn: string;
  Efternamn: string;
  Telefon: string;
  "Allergier/preferenser": string;
  "Önskar hålla tal": string;
};

const ContactForm = () => {
  const initialForm: ContactForm = {
    firstName: "",
    lastName: "",
    phone: "",
    allergies_preferences: "",
    speech: false
  };

  const [form, setForm] = useState(initialForm);
  const [requestStatus, setRequestStatus] = React.useState<
    "idle" | "pending" | "error" | "success"
  >("idle");

  // Config variables
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;

  const GOOGLE_SERVICE_ACCOUNT_EMAIL =
    process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY =
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  // console.log("serviceAccountAuth", serviceAccountAuth);
  // GoogleSpreadsheet Initialize
  const doc = new GoogleSpreadsheet(
    "1CY-t9kOsbRXQCmQymhcEtdjUgue_Y_pz_RoRXJeo5XE",
    serviceAccountAuth
  );

  // Append Function
  const appendSpreadsheet = async (row: SpreadsheetRow) => {
    // loads document properties and worksheets

    try {
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];

      await sheet.addRow(row);
    } catch (error) {
      setRequestStatus("error");
      console.error("Error: ", error);
    }
  };

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      form.firstName !== "" &&
      form.lastName !== "" &&
      form.phone !== "" &&
      form.allergies_preferences !== ""
    ) {
      // Data add for append
      const newRow = {
        Förnamn: form.firstName,
        Efternamn: form.lastName,
        Telefon: form.phone,
        "Allergier/preferenser": form.allergies_preferences,
        "Önskar hålla tal": form.speech ? "Ja" : "Nej"
      };

      appendSpreadsheet(newRow);
    }
  };

  return (
    <div className=" bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          RSVP
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        action="#"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={submitForm}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Förnamn
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Efternamn
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Telefonnummer
            </label>
            <div className="mt-2.5">
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="allergies_preferences"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Allergier / matpreferenser
            </label>
            <div className="mt-2.5">
              <textarea
                name="allergies_preferences"
                id="allergies_preferences"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={form.allergies_preferences}
                onChange={e =>
                  setForm({ ...form, allergies_preferences: e.target.value })
                }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Toggle
              enabled={form.speech}
              setEnabled={e => setForm({ ...form, speech: !form.speech })}
              text="Jag önskar hålla tal."
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Skicka anmälan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
