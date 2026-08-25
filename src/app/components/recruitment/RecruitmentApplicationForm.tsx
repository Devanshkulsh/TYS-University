"use client";

import { type FormEvent, useRef, useState } from "react";
import { CheckCircle2, Download, FileUp, Printer, Trash2 } from "lucide-react";

type SubmitStatus = "idle" | "submitting" | "saved" | "cleared" | "error";
type FileUploadData = {
  name: string;
  size: number;
  type: string;
};
type ApplicationDataValue =
  | FormDataEntryValue
  | FileUploadData
  | Record<string, string>[];

const educationRows = [
  "10th or Equivalent",
  "12th or Equivalent",
  "UG or Equivalent",
  "PG or Equivalent",
  "UGC NET / SLET",
  "Ph.D. / D.Phil. / LL.D.",
  "Others, if any",
];

const educationColumns = [
  { key: "board", label: "Board / University" },
  { key: "year", label: "Year" },
  { key: "subjects", label: "Subjects" },
  { key: "roll", label: "Roll No." },
  { key: "marks", label: "Marks Obtained" },
  { key: "total", label: "Total Marks" },
  { key: "grade", label: "Grade" },
  { key: "division", label: "Division" },
  { key: "encl", label: "Encl. No." },
];

const instructions = [
  "Applicants must meet the minimum essential educational qualifications as prescribed by UGC norms.",
  "Qualifications and other conditions for teaching posts shall be in accordance with UGC regulations on minimum qualifications for appointment of teachers and other academic staff in universities.",
  "Mere fulfilling the eligibility criteria does not guarantee an interview call; shortlisting is at the discretion of the appointing authority.",
  "The advertisement number, post applied for, and Pin Code must be clearly mentioned in the application form.",
  "Incomplete applications or those not on the prescribed format will be rejected.",
  "The university reserves the right to fill or not fill any advertised post, correct the advertisement, cancel it at any stage, or require a separate application per post.",
  "SC/ST/OBC/EWS candidates must submit a valid U.P. Government certificate in the prescribed format, issued within twelve months prior to the closing date.",
  "Candidates employed in a private university/college must submit a No Objection Certificate from their employer.",
  "Concealment of facts, false documents, misleading information, or canvassing will result in disqualification.",
  "Interview letters and other notices will be sent only by email; please check the official website regularly.",
  "Hard copy of the emailed application, with all enclosures, must be sent by speed post to the Registrar, TYSU, Fatehpur, U.P., Pin-212601, on or before 26 August 2026.",
  "No TA/DA will be given for appearing in the interview.",
];

const fieldClass =
  "min-h-11 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-secondary focus:ring-3 focus:ring-secondary/10";
const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[0.04em] text-primary";

function SectionTitle({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mt-10 flex items-center gap-3 border-b-2 border-primary pb-2 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-primary">
      <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs text-[#0B1B3F]">
        {number}
      </span>
      {children}
    </h3>
  );
}

function TextField({
  id,
  label,
  placeholder,
  required = false,
  className = "",
}: {
  id: string;
  label: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={id}>
        {label} {required && <span className="text-red-700">*</span>}
      </label>
      <input
        id={id}
        name={id}
        className={fieldClass}
        placeholder={placeholder}
        type="text"
        required={required}
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  hint,
  required = false,
}: {
  id: string;
  label: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="md:col-span-2">
      <label className={labelClass} htmlFor={id}>
        {label} {required && <span className="text-red-700">*</span>}
        {hint && (
          <span className="mt-1 block text-xs font-medium normal-case tracking-normal text-foreground/55">
            {hint}
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        className={`${fieldClass} min-h-20 resize-y`}
        required={required}
      />
    </div>
  );
}

function FileField({
  id,
  label,
  hint,
  accept = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  required = false,
}: {
  id: string;
  label: React.ReactNode;
  hint?: string;
  accept?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label} {required && <span className="text-red-700">*</span>}
        {hint && (
          <span className="mt-1 block text-xs font-medium normal-case tracking-normal text-foreground/55">
            {hint}
          </span>
        )}
      </label>
      <div className="flex min-h-11 items-center gap-3 rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-foreground transition focus-within:border-secondary focus-within:ring-3 focus-within:ring-secondary/10">
        <FileUp className="size-4 shrink-0 text-secondary" aria-hidden="true" />
        <input
          id={id}
          name={id}
          className="w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.04em] file:text-white hover:file:bg-secondary"
          type="file"
          accept={accept}
          required={required}
        />
      </div>
    </div>
  );
}

export default function RecruitmentApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const collectData = () => {
    const form = formRef.current;
    if (!form) return null;

    const formData = new FormData(form);
    const data: Record<string, ApplicationDataValue> = {};

    for (const [key, value] of formData.entries()) {
      if (!key.startsWith("education.")) {
        data[key] =
          value instanceof File
            ? {
                name: value.name,
                size: value.size,
                type: value.type,
              }
            : value;
      }
    }

    data.education = educationRows.map((standard, rowIndex) => {
      const row: Record<string, string> = { standard };
      educationColumns.forEach((column) => {
        row[column.key] =
          formData.get(`education.${rowIndex}.${column.key}`)?.toString() ?? "";
      });
      return row;
    });

    return data;
  };

  const downloadBackup = (data: Record<string, ApplicationDataValue>) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const candidateName =
      data.nameEn?.toString().trim().replace(/\s+/g, "_") || "candidate";
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `TYSU_Recruitment_Application_${candidateName}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    const form = formRef.current;
    if (!form) return;

    if (!form.reportValidity()) {
      setStatus("error");
      setMessage("Please complete the required fields before saving.");
      return;
    }

    const data = collectData();
    if (!data) return;

    setStatus("submitting");
    setMessage("Submitting application...");

    try {
      const response = await fetch("/api/recruitment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => null)) as {
        result?: string;
        message?: string;
      } | null;

      if (!response.ok || result?.result !== "success") {
        throw new Error(
          result?.message ?? "Google Sheets rejected the submission.",
        );
      }

      downloadBackup(data);
      setStatus("saved");
      setMessage(
        "Application submitted to Google Sheets. A JSON backup has also been saved.",
      );
    } catch (error) {
      console.error("Recruitment application submission failed:", error);
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not submit to Google Sheets. Please try again.",
      );
    }
  };

  const handlePrint = () => {
    formRef.current?.reportValidity();
    window.print();
  };

  const handleClear = () => {
    formRef.current?.reset();
    setStatus("cleared");
    setMessage("Form cleared.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSave();
  };

  return (
    <section id="application-form" className="mx-auto mt-12 max-w-6xl">
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_22px_70px_rgba(20,17,12,0.12)]">
        <div className="border-b-4 border-accent bg-[linear-gradient(135deg,#5a1f22_0%,#05498b_100%)] px-5 py-8 text-center text-white sm:px-8">
          <p className="font-display text-xl font-semibold sm:text-2xl">
            Thakur Yugraj Singh University, Fatehpur (U.P.)
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            Application Form
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/78 sm:text-sm">
            Recruitment of Teachers 2026
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="px-5 py-8 sm:px-8">
          <SectionTitle number={1}>Post Details</SectionTitle>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <TextField
              id="post"
              label="Post Applied For"
              placeholder="Professor / Associate Professor / Assistant Professor"
              required
            />
            <div>
              <TextField
                id="department"
                label="Department"
                placeholder="Type department name"
                required
              />
              <p className="mt-2 text-xs leading-5 text-foreground/62">
                Note: not every department has an opening at every level. Confirm
                against the vacancy chart before applying.
              </p>
            </div>
            <TextField
              id="faculty"
              label="Faculty / School"
              placeholder="e.g. Faculty of Science"
            />
            <TextField
              id="advtNo"
              label="Advertisement No."
              placeholder="TYSU/Reg.(Gen Admin)/2026/17"
            />
          </div>

          <SectionTitle number={2}>Personal Details</SectionTitle>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <TextField id="nameEn" label="1. Name of Candidate (in English)" required />
            <TextField
              id="nameHi"
              label="2. Name of Candidate (in Hindi)"
              placeholder="Type name in Hindi"
            />
            <TextField id="dob" label="3. Date of Birth" placeholder="DD/MM/YYYY" required />
            <TextField
              id="gender"
              label="4. Gender"
              placeholder="Male / Female / Transgender"
            />
            <TextField id="nationality" label="5. Nationality" placeholder="Indian" />
            <TextField
              id="aadhar"
              label="6. Aadhar Number"
              placeholder="12-digit Aadhar number"
            />
            <TextField id="pan" label="7. PAN Number" placeholder="ABCDE1234F" />
            <TextField
              id="marital"
              label="8. Marital Status"
              placeholder="Married / Unmarried / Widow"
            />
            <TextField id="fatherHusband" label="11. Father's / Husband's Name" />
            <TextField id="motherName" label="12. Mother's Name" />
            <div>
              <TextField
                id="category"
                label="10. Category"
                placeholder="UR / OBC / SC / ST / EWS"
              />
              <p className="mt-2 text-xs leading-5 text-foreground/62">
                SC/ST/OBC/EWS candidates must attach a valid U.P. Government
                certificate issued within 12 months of the closing date.
              </p>
            </div>
            <TextField id="domicile" label="15. Domicile" placeholder="U.P. / Non U.P." />
            <TextField
              id="disabled"
              label="13(i). Whether Differently Abled"
              placeholder="Yes / No"
            />
            <div>
              <TextField
                id="disabilityType"
                label="13(ii). Disability Type"
                placeholder="Specify type, if applicable"
              />
              <p className="mt-2 text-xs leading-5 text-foreground/62">
                4% horizontal reservation applies to differently-abled candidates
                as per rules.
              </p>
            </div>
          </div>

          <SectionTitle number={3}>Contact Details</SectionTitle>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <TextAreaField
              id="permAddress"
              label="16. Permanent Address (with Pin Code)"
              required
            />
            <TextAreaField
              id="mailAddress"
              label="17. Postal / Mailing Address (with Pin Code)"
              hint="Leave blank if same as permanent address"
            />
            <TextField id="email" label="18. Email ID" placeholder="name@example.com" required />
            <TextField
              id="whatsapp"
              label="19. WhatsApp Number"
              placeholder="+91 10-digit number"
              required
            />
          </div>

          <SectionTitle number={4}>Present Employment</SectionTitle>
          <div className="mt-5 grid gap-5 md:grid-cols-4">
            <TextField
              id="presentEmployment"
              label="9(i). Present Employment"
              placeholder="Institution / Organisation name, or N/A"
            />
            <TextField
              id="dateOfAppointment"
              label="9(ii). Date of Appointment"
              placeholder="DD/MM/YYYY"
            />
            <TextField
              id="natureOfAppointment"
              label="Nature of Appointment"
              placeholder="Regular / Part Time / Contractual / N/A"
            />
            <TextField
              id="salary"
              label="Salary in Rs. (per month)"
              placeholder="Amount in INR"
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-foreground/62">
            Candidates currently employed at a private university/college must
            attach a No Objection Certificate (NOC) from their employer.
          </p>

          <SectionTitle number={5}>Educational Qualification</SectionTitle>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-xs">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="w-10 px-2 py-3 text-left font-bold uppercase">
                    Sr.
                  </th>
                  <th className="px-2 py-3 text-left font-bold uppercase">
                    Standard
                  </th>
                  {educationColumns.map((column) => (
                    <th
                      key={column.key}
                      className="px-2 py-3 text-left font-bold uppercase"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {educationRows.map((standard, rowIndex) => (
                  <tr key={standard} className="even:bg-[#F9F6EF]">
                    <td className="border border-black/10 px-2 py-2 font-bold">
                      {rowIndex + 1}
                    </td>
                    <td className="whitespace-nowrap border border-black/10 px-2 py-2 font-bold">
                      {standard}
                    </td>
                    {educationColumns.map((column) => (
                      <td key={column.key} className="border border-black/10 p-1">
                        <input
                          aria-label={`${standard} ${column.label}`}
                          name={`education.${rowIndex}.${column.key}`}
                          className="min-h-9 w-full bg-transparent px-2 py-1 text-xs outline-none focus:bg-[#F5F1EA]"
                          type="text"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <TextField id="phdTopic" label="21. Topic of Ph.D. / D.Phil. / LL.D." />
          </div>

          <SectionTitle number={6}>Declarations & Verification</SectionTitle>
          <div className="mt-5 divide-y divide-dashed divide-black/15">
            {[
              {
                id: "q22",
                question:
                  "22. Was your Ph.D. obtained from a foreign university/institution ranked among the top 500 in the world by QS, THE, or ARWU (Shanghai)?",
                placeholder: "Yes / No / N/A",
              },
              {
                id: "q23",
                question:
                  "23. Has any FIR been filed against you in any police station, or is any case pending in any court of law against you?",
                placeholder: "Yes / No",
              },
              {
                id: "q24",
                question:
                  "24. During previous employment, was any punishment/penalty awarded, or is any vigilance enquiry pending as on the date of application?",
                placeholder: "Yes / No",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="grid gap-4 py-4 lg:grid-cols-[1fr_minmax(220px,320px)] lg:items-center"
              >
                <label className="text-sm leading-6 text-foreground/78" htmlFor={item.id}>
                  {item.question}
                </label>
                <input
                  id={item.id}
                  name={item.id}
                  className={fieldClass}
                  placeholder={item.placeholder}
                  type="text"
                />
              </div>
            ))}
          </div>

          <div className="mt-5">
            <FileField
              id="cvResume"
              label="Upload CV / Resume"
              hint="Accepted formats: PDF, DOC, or DOCX"
              required
            />
          </div>

          <div className="mt-5 border border-black/10 border-l-4 border-l-accent bg-[#F9F6EF] p-5 text-sm leading-7 text-foreground/75">
            <p className="font-display font-bold text-primary">
              Declaration by the Candidate
            </p>
            <p className="mt-3">
              I hereby declare that I have carefully read the advertisement
              published by Thakur Yugraj Singh University, Fatehpur, Uttar
              Pradesh. I certify that the information furnished above is correct
              to the best of my knowledge and that I meet all norms of the
              advertisement for the post applied for.
            </p>
            <p className="mt-3">
              If any information furnished by me is found incorrect, false,
              unsupported by documents, or not meeting the eligibility criteria,
              my candidature is liable to be rejected at any stage of the
              selection process.
            </p>
            <div className="mt-4">
              <TextField
                id="declareAgree"
                label="Declaration Confirmation"
                placeholder="Type: I agree"
                required
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <TextField id="signDate" label="Date" placeholder="DD/MM/YYYY" />
            <TextField id="signPlace" label="Place" />
            <div>
              <p className={labelClass}>Candidate Signature</p>
              <div
                className="flex min-h-24 items-end justify-center rounded-md border border-dashed border-black/25 bg-white px-3 py-3 text-xs font-semibold uppercase tracking-[0.04em] text-foreground/50"
                aria-label="Blank space for candidate physical signature"
              >
                Signature
              </div>
            </div>
          </div>

          <div className="mt-10 border border-black/10 bg-[#FBFAF6] p-5 text-sm leading-7 text-foreground/70">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-primary">
              Important Instructions
            </h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              {instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3 print:hidden">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-display text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-secondary"
            >
              <Download className="size-4" />
              {status === "submitting" ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-md border border-secondary px-5 py-3 font-display text-sm font-extrabold uppercase tracking-[0.04em] text-secondary transition hover:bg-secondary hover:text-white"
            >
              <Printer className="size-4" />
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-2 rounded-md border border-red-800 px-5 py-3 font-display text-sm font-extrabold uppercase tracking-[0.04em] text-red-800 transition hover:bg-red-800 hover:text-white"
            >
              <Trash2 className="size-4" />
              Clear Form
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 flex items-center justify-center gap-2 text-center text-sm font-bold print:hidden ${
                status === "error" ? "text-red-700" : "text-green-700"
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {status !== "error" && <CheckCircle2 className="size-4" />}
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
