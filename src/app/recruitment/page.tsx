import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import PageBanner from "@/app/components/about/PageBanner";
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
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6B1E23]">
                Official Advertisement
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#171717] md:text-3xl">
                {pageTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#6B1E23] px-5 py-3 text-sm font-bold text-[#6B1E23] transition hover:bg-[#6B1E23] hover:text-white"
              >
                Open PDF
                <ExternalLink className="size-4" />
              </a>
              <a
                href={pdfPath}
                download
                className="inline-flex items-center gap-2 rounded-full bg-[#F2B90D] px-5 py-3 text-sm font-bold text-[#0B1B3F] transition hover:bg-[#6B1E23] hover:text-white"
              >
                Download PDF
                <Download className="size-4" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_60px_rgba(20,17,12,0.1)] sm:p-4">
            <iframe
              src={pdfPath}
              title={pageTitle}
              className="h-[70vh] min-h-[560px] w-full rounded-xl border border-black/10"
            />
          </div>
        </section>
      </main>
    </>
  );
}
