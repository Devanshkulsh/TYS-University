import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "./lib/seo";

const lastModified = new Date("2026-06-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/hero/hero1.webp"),
        absoluteUrl("/hero/hero2.webp"),
        absoluteUrl("/about/college_gate.webp"),
      ],
    },
    {
      url: `${siteUrl}/programs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [absoluteUrl("/logo.png")],
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl("/logo.png")],
    },
    {
      url: `${siteUrl}/about/mission-vision`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      images: [absoluteUrl("/logo.png")],
    },
    {
      url: `${siteUrl}/about/message-from-chancellor`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      images: [absoluteUrl("/logo.png")],
    },
    {
      url: `${siteUrl}/mandatory-disclosures`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl("/logo.png")],
    },
    {
      url: `${siteUrl}/career`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl("/careers/image1.jpeg")],
    },
  ];
}
