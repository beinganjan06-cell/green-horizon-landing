import { createFileRoute } from "@tanstack/react-router";
import { ImpactLanding } from "@/components/impact-landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rooted Impact — Behaviour Change for Resilience" },
      { name: "description", content: "Research, communication and action helping communities build a fairer, climate-ready future." },
      { property: "og:title", content: "Rooted Impact — Behaviour Change for Resilience" },
      { property: "og:description", content: "Research, communication and action helping communities build a fairer, climate-ready future." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactLanding,
});
