import Link from "next/link";

const recruitmentText = "Advertisement for Recruitment of teachers 2026";

function MarqueeGroup() {
  return (
    <span className="flex min-w-screen shrink-0 items-center justify-around gap-12 px-6 py-2.5 sm:gap-24 sm:px-12 sm:py-2.5">
      <span aria-hidden="true" className="text-[11px] sm:text-sm">
        •
      </span>
      <span>{recruitmentText}</span>
      <span aria-hidden="true" className="text-[11px] sm:text-sm">
        •
      </span>
      <span>{recruitmentText}</span>
    </span>
  );
}

export default function RecruitmentMarquee() {
  return (
    <div className="overflow-hidden border-b border-[#2D1011] bg-[#5A1F22] text-white">
      <Link
        href="/recruitment"
        aria-label={recruitmentText}
        className="block overflow-hidden font-semibold leading-none"
      >
        <span className="recruitment-marquee-track flex w-max">
          <MarqueeGroup />
          <span aria-hidden="true">
            <MarqueeGroup />
          </span>
        </span>
      </Link>
    </div>
  );
}
