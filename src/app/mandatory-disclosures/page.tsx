import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import PageBanner from "@/app/components/about/PageBanner";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/app/lib/seo";

const pageTitle = "Mandatory Disclosures";
const pageDescription =
  "Access official documents and information published by TYS University under mandatory disclosures.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/mandatory-disclosures",
  },
};

const documents = [
  {
    title: "Application Form for Teaching Faculty",
    fileName: "application form for teaching faculty_COMPLETE.docx",
    description: "Application form for candidates applying for teaching faculty positions.",
  },
  {
    title: "Important Instructions for Filling the Application Form",
    fileName: "Important Instructions for filling the application form.docx",
    description: "Instructions to review before completing the application form.",
  },
  {
    title: "Vacant Seat List for TYS University",
    fileName: "vacant seat list for TYSU_18.08.2026.docx",
    description: "Latest published vacant seat list for TYS University.",
  },
];

export default function MandatoryDisclosuresPage() {
  const schema = [
    webPageJsonLd({
      name: pageTitle,
      description: pageDescription,
      path: "/mandatory-disclosures",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: pageTitle, path: "/mandatory-disclosures" },
    ]),
  ];

  return (
    <>
      <JsonLd id="mandatory-disclosures-page-jsonld" data={schema} />
      <PageBanner
        eyebrow="TYS University"
        title="Mandatory Disclosures"
        description={pageDescription}
      />

      <main className="bg-[#F5F1EA] px-5 py-16 sm:px-8 md:py-24 lg:px-10">
        <section className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6B1E23]">
              Official Documents
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#171717] md:text-4xl">
              Documents and notices
            </h2>
            <p className="mt-4 text-base leading-8 text-gray-600">
              Select a document below to open it in a new tab or download it for your reference.
            </p>
          </div>

          <div className="grid gap-4">
            {documents.map((document, index) => {
              const documentHref = `/mandatory-discloser/${encodeURIComponent(document.fileName)}`;

              return (
                <article
                  key={document.fileName}
                  className="group flex flex-col gap-5 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(20,17,12,0.06)] transition hover:-translate-y-0.5 hover:border-[#F2B90D] sm:flex-row sm:items-center sm:p-6"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#6B1E23] text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-1 size-5 shrink-0 text-[#6B1E23]" />
                      <div>
                        <h3 className="text-lg font-bold leading-snug text-[#171717]">
                          {document.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {document.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={documentHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#F2B90D] px-5 py-3 text-sm font-bold text-[#0B1B3F] transition hover:bg-[#6B1E23] hover:text-white"
                  >
                    Open document
                    <ExternalLink className="size-4" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
