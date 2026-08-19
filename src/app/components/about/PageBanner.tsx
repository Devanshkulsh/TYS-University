type PageBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageBanner({
  eyebrow,
  title,
  description,
}: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B1B3F] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_15%,rgba(107,30,35,0.55),transparent_32%),linear-gradient(135deg,#07142f_0%,#0B1B3F_48%,#142859_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 -top-28 -z-10 size-80 rounded-full bg-[#F2B90D]/10 blur-3xl sm:size-96"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-36 -left-28 -z-10 size-96 rounded-full bg-[#6B1E23]/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-20 top-1/2 size-72 -translate-y-1/2 rounded-full border border-white/[0.04]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-8 top-1/2 size-52 -translate-y-1/2 rounded-full border border-[#F2B90D]/10"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <path
          d="M-100 120C180 -20 420 210 720 90C1020 -30 1220 40 1540 190"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.05"
          strokeWidth="2"
        />

        <path
          d="M-120 360C180 210 460 480 780 330C1060 200 1250 240 1540 410"
          fill="none"
          stroke="#F2B90D"
          strokeOpacity="0.07"
          strokeWidth="2"
        />
      </svg>

      <div className="relative mx-auto flex min-h-[430px] w-full max-w-7xl items-center px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-40 md:min-h-[540px] md:pb-24 md:pt-52 lg:px-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-0.5 w-9 shrink-0 rounded-full bg-[#F2B90D] sm:w-12"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F2B90D] sm:text-xs sm:tracking-[0.3em]">
              {eyebrow}
            </p>
          </div>

          <h1 className="mt-5 max-w-[920px] text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.04]">
            {title}
          </h1>

          <div
            aria-hidden="true"
            className="mt-6 h-0.5 w-20 rounded-full bg-[#6B1E23] sm:w-28"
          />

          <p className="mt-6 max-w-3xl text-base font-normal leading-7 text-white/70 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            {description}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#6B1E23] via-[#F2B90D] to-[#6B1E23]"
      />
    </section>
  );
}
