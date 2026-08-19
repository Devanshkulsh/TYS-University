import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/app/components/about/PageBanner";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/app/lib/seo";

const pageTitle = "Advertisement for Recruitment of teachers 2026";
const pageDescription =
  "Advertisement for recruitment of teachers at Thakur Yugraj Singh University in 2026.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  const schema = [
    webPageJsonLd({
      name: pageTitle,
      description: pageDescription,
      path: "/career",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Career", path: "/career" },
    ]),
  ];

  return (
    <>
      <JsonLd id="career-page-jsonld" data={schema} />
      <PageBanner
        eyebrow="Career Opportunities"
        title={pageTitle}
        description="Explore the latest recruitment announcement from TYS University."
      />

      <main className="bg-[#F5F1EA] px-5 py-16 sm:px-8 md:py-24 lg:px-10">
        <section className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6B1E23]">
              Recruitment Advertisement
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight text-[#171717] md:text-3xl">
              {pageTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-[0_18px_60px_rgba(20,17,12,0.1)] sm:p-5">
            <Image
              src="/careers/image1.jpeg"
              alt={pageTitle}
              width={1600}
              height={1200}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="h-auto w-full rounded-xl object-contain"
              priority
            />
          </div>
        </section>
      </main>
    </>
  );
}
