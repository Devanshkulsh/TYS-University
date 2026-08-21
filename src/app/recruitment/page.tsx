import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import PageBanner from "@/app/components/about/PageBanner";
import RecruitmentApplicationForm from "@/app/components/recruitment/RecruitmentApplicationForm";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/app/lib/seo";

const pageTitle = "Advertisement for Recruitment of teachers 2026";
const pdfPath = "/careers/ADVERTISEMENT%20FOR%20RECRUITMENT%20OF%20TEACHERS%202026.pdf";

export const metadata: Metadata = {
  title: "Recruitment Advertisement 2026",
  description: pageTitle,
  alternates: {
    canonical: "/recruitment",
  },
};

export default function RecruitmentPage() {
  const schema = [
    webPageJsonLd({
      name: pageTitle,
      description: pageTitle,
      path: "/recruitment",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Recruitment", path: "/recruitment" },
    ]),
  ];

  return (
    <>
      <JsonLd id="recruitment-page-jsonld" data={schema} />
      <PageBanner
        eyebrow="Recruitment"
        title={pageTitle}
        description="View the official recruitment advertisement issued by TYS University."
      />

      <main className="bg-[#F5F1EA] px-5 py-12 sm:px-8 md:py-20 lg:px-10">
        <section className="mx-auto max-w-6xl">
          <RecruitmentApplicationForm />

          <div className="mt-12 overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_60px_rgba(20,17,12,0.1)]">
            <div className="flex flex-col gap-5 border-b border-black/10 bg-white px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Official Advertisement
                </p>
                <h2 className="mt-2 font-display text-2xl font-black text-foreground md:text-3xl">
                  {pageTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-foreground/62">
                  Review the official recruitment advertisement before printing
                  or saving the completed application form.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-primary px-5 py-3 font-display text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                >
                  Open PDF
                  <ExternalLink className="size-4" />
                </a>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-display text-sm font-bold text-[#0B1B3F] transition hover:bg-primary hover:text-white"
                >
                  Download PDF
                  <Download className="size-4" />
                </a>
              </div>
            </div>

            <div className="p-2 sm:p-4">
            <iframe
              src={pdfPath}
              title={pageTitle}
              className="h-[70vh] min-h-[560px] w-full rounded-xl border border-black/10"
            />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
