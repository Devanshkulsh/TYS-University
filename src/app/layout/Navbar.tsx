"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ExternalLink,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import RecruitmentMarquee from "@/app/components/shared/RecruitmentMarquee";

const tollFreeNumber = "18008901705";
const tollFreeDisplay = "1800 890 1705";
const tollFreeLabel = `Toll Free No.: ${tollFreeDisplay}`;
const supportDeskNumber = "+919194798070";
const supportDeskDisplay = "+91 9194798070";
const supportDeskLabel = `Support Desk: ${supportDeskDisplay}`;

const utilityLinks = [
  // { label: "CAREER", href: "/career" },
  { label: "RECRUITMENT", href: "/recruitment" },
  { label: "BLOGS", href: "#blogs" },
  { label: "CONTACT US", href: "#contact" },
];

type NavItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    };

const navItems: NavItem[] = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "ABOUT",
    links: [
      { label: "About TYS University", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      {
        label: "Message from the Chancellor",
        href: "/about/message-from-chancellor",
      },
    ],
  },
  {
    label: "PROGRAMS",
    links: [
      { label: "All Programs", href: "/programs" },
      { label: "Undergraduate Programs", href: "/programs#undergraduate" },
      { label: "Postgraduate Programs", href: "/programs#postgraduate" },
      { label: "Doctoral Programs", href: "/programs#doctoral" },
      { label: "Diploma Programs", href: "/programs#diploma" },
    ],
  },
  {
    label: "ACADEMICS",
    links: [
      { label: "Academic Calendar", href: "/academic-calendar" },
      { label: "Departments", href: "#departments" },
      { label: "Examinations", href: "#examinations" },
    ],
  },
  {
    label: "ADMISSIONS",
    links: [
      { label: "Apply Now", href: "#apply" },
      { label: "Course Fees", href: "#course-fees" },
      { label: "Scholarships", href: "#scholarships" },
    ],
  },
  {
    label: "CAMPUS LIFE",
    links: [
      { label: "Infrastructure", href: "#infrastructure" },
      { label: "Clubs and Societies", href: "#clubs" },
      { label: "Hostel Life", href: "#hostel" },
    ],
  },
  {
    label: "PLACEMENTS",
    links: [
      { label: "Placement Overview", href: "#placements" },
      { label: "Recruiters", href: "#recruiters" },
      { label: "Student Success", href: "#success" },
    ],
  },
  {
    label: "RESEARCH & INNOVATION",
    links: [
      { label: "Research Centers", href: "#research" },
      { label: "Innovation Lab", href: "#innovation" },
      { label: "Publications", href: "#publications" },
    ],
  },
];

const socialLinks = [
  { label: "f", name: "Facebook", href: "https://www.facebook.com/" },
  { label: "X", name: "X", href: "https://x.com/" },
  { label: "in", name: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "ig", name: "Instagram", href: "https://www.instagram.com/" },
  { label: "yt", name: "YouTube", href: "https://www.youtube.com/" },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const activeNav = navItems.find(
    (item): item is Extract<NavItem, { links: { label: string; href: string }[] }> =>
      item.label === activeMenu && "links" in item,
  );
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenus = () => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (query.length > 0) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        `${query} TYS University`,
      )}`;
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "text-black"
          : "text-white md:[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
      }`}
    >
      <RecruitmentMarquee />

      <div
        className={`border-b backdrop-blur-md transition-colors duration-300 ${
          isScrolled
            ? "border-black/10 bg-[#F4F1EC]"
            : "border-white/15 bg-black/18"
        }`}
      >
        <div className="mx-auto flex max-w-480 items-center justify-between p-3 md:h-20 md:px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2 md:gap-3">
            <Image
              src="/tys-logo-2.png"
              alt="TYS University logo"
              width={1050}
              height={276}
              className="h-10 w-auto shrink-0 object-contain md:h-14"
              priority
            />

            <span
              className={`hidden items-center gap-2 rounded-full border px-2.5 py-1 shadow-[0_10px_24px_rgba(0,0,0,0.18)] sm:flex ${
                isScrolled
                  ? "border-[#D4A96A]/45 bg-white/92"
                  : "border-white/20 bg-black/25"
              }`}
            >
              <Image
                src="/feature-image/20+.png"
                alt="20 plus years educational legacy"
                width={40}
                height={40}
                className="h-8 w-8 shrink-0 object-contain md:h-10 md:w-10"
              />
              <span className="leading-none">
                <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B2C2C] md:text-[10px]">
                  Legacy
                </span>
                <span
                  className={`mt-0.5 block text-[10px] font-extrabold uppercase tracking-[0.12em] md:text-[11px] ${
                    isScrolled ? "text-black/80" : "text-white"
                  }`}
                >
                  20+ Years
                </span>
              </span>
            </span>
          </Link>

          <div className="ml-auto mr-4 hidden items-center gap-4 text-[11px] font-medium tracking-wide xl:flex">
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-accent ${
                  link.label === "RECRUITMENT"
                    ? "rounded-full bg-accent px-3 py-1.5 font-bold text-foreground shadow-sm hover:bg-white hover:text-foreground"
                    : isScrolled
                      ? "text-black/85"
                      : "text-white/95"
                }`}
                onClick={closeMenus}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <div
              className={`hidden items-center gap-3 2xl:flex ${
                isScrolled ? "text-black/85" : "text-white/95"
              }`}
            >
              <a
                href="https://wa.me/911800121288800"
                className="text-xs transition-colors hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                Whatsapp
              </a>
              <a
                href={`tel:${tollFreeNumber}`}
                aria-label={`Call toll free number ${tollFreeDisplay}`}
                className="transition-colors hover:text-accent"
              >
                <Phone size={14} />
              </a>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="min-w-4 text-center text-sm font-bold transition-colors hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href={`tel:${tollFreeNumber}`}
              aria-label={`Call toll free number ${tollFreeDisplay}`}
              className="hidden h-12 items-center justify-between rounded bg-primary px-4 text-white transition hover:bg-accent hover:text-foreground lg:flex"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white">
                  <Phone size={14} />
                </span>
                <span>
                  <span className="block text-[10px]">Toll Free No.</span>
                  <span className="block text-sm font-extrabold leading-tight">
                    {tollFreeDisplay}
                  </span>
                </span>
              </span>
            </a>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary text-white transition hover:bg-accent hover:text-foreground md:hidden"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <button
              type="button"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              aria-expanded={isSearchOpen}
              className="hidden shrink-0 flex-col items-center gap-0.5 transition-colors hover:text-accent sm:flex"
              onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              <span className="text-[10px]">Search</span>
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`hidden border-t backdrop-blur-md transition-colors duration-300 md:block ${
          isScrolled
            ? "border-black/10 bg-[#F4F1EC]"
            : "border-white/15 bg-black/18"
        }`}
      >
        <div className="mx-auto flex h-11.25 max-w-480 items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = item.label === activeMenu;

            return (
              <div
                key={item.label}
                className="flex h-full shrink-0 items-center border-r border-white/20"
              >
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className={`flex h-full items-center gap-1 px-3 text-[10px] font-bold tracking-[0.6px] transition-colors hover:text-accent lg:px-4 lg:text-xs ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={isActive}
                    className={`flex h-full items-center gap-1 px-3 text-[10px] font-bold tracking-[0.6px] transition-colors hover:text-accent lg:px-4 lg:text-xs ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                    onClick={() =>
                      setActiveMenu((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isActive ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {activeNav ? (
          <div
            className={`border-t shadow-2xl ${
              isScrolled
                ? "border-black/10 bg-[#F4F1EC]"
                : "border-white/10 bg-(--primary)/96"
            }`}
          >
            <div className="mx-auto grid max-w-480 grid-cols-3 gap-3 px-8 py-5">
              {activeNav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`rounded px-4 py-3 text-sm font-semibold transition hover:border-(--accent)/70 hover:bg-(--accent)/15 ${
                    isScrolled
                      ? "border border-black/10 bg-black/3 text-black"
                      : "border border-white/10 bg-white/5 text-white"
                  }`}
                  onClick={closeMenus}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </nav>

      {isSearchOpen ? (
        <form
          className={`border-t px-3 py-4 shadow-2xl ${
            isScrolled
              ? "border-black/10 bg-[#F4F1EC]"
              : "border-white/10 bg-(--primary)/96"
          }`}
          onSubmit={handleSearch}
        >
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search TYS University"
              className="h-11 flex-1 rounded border border-white/15 bg-white px-4 text-sm text-foreground outline-none focus:border-accent"
              autoFocus
            />
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded bg-accent px-4 text-sm font-bold text-foreground transition hover:bg-white"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </form>
      ) : null}

      {isMobileMenuOpen ? (
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto border-t border-black/10 bg-[#F4F1EC] px-4 py-5 text-black shadow-2xl lg:hidden">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl border  bg-white px-4 py-3 shadow-sm">
              <Image
                src="/feature-image/20+.png"
                alt="20 plus years educational legacy"
                width={52}
                height={52}
                className="h-12 w-12 shrink-0 object-contain"
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B2C2C]">
                  Educational Legacy
                </p>
                <p className="mt-1 text-sm font-extrabold text-black">
                  20+ Years of Excellence
                </p>
              </div>
            </div>

            <a
              href="#apply"
              className="rounded bg-accent px-4 py-3 text-center text-sm font-bold text-foreground transition hover:bg-white"
              onClick={closeMenus}
            >
              Apply Now
            </a>
            <a
              href={`tel:${tollFreeNumber}`}
              className="rounded border border-white/15 px-4 py-3 text-center text-sm font-bold transition hover:border-accent"
              onClick={closeMenus}
            >
              {tollFreeLabel}
            </a>
            <a
              href={`tel:${supportDeskNumber}`}
              className="rounded border border-white/15 px-4 py-3 text-center text-sm font-bold transition hover:border-accent"
              onClick={closeMenus}
            >
              {supportDeskLabel}
            </a>
          </div>

          <div className="mt-5 grid gap-2">
            {navItems.map((item) => (
              "href" in item ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded border border-white/10 px-4 py-3 text-sm font-bold transition hover:border-accent"
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              ) : (
                <details key={item.label} className="rounded border border-white/10">
                  <summary className="cursor-pointer px-4 py-3 text-sm font-bold">
                    {item.label}
                  </summary>
                  <div className="grid gap-1 border-t border-black/10 bg-black/3 p-2">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="rounded px-3 py-2 text-sm text-black/80 transition hover:bg-black/5 hover:text-black"
                        onClick={closeMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </details>
              )
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded border px-3 py-2 text-xs font-semibold transition hover:border-accent ${
                  link.label === "RECRUITMENT"
                    ? "border-accent bg-accent text-foreground hover:bg-white"
                    : "border-white/10"
                }`}
                onClick={closeMenus}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded border border-white/10 px-3 py-2 text-xs font-bold transition hover:border-accent"
              >
                {link.name}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
