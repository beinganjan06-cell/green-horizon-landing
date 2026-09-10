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
      { property: "og:image", content: "https://id-preview--88bf90aa-c301-4c8c-bad7-338ba2fc04ca.lovable.app/__l5e/assets-v1/ac5ef38a-e983-495c-b9fb-99d76cb94753/rural-hero.jpg" },
      { name: "twitter:image", content: "https://id-preview--88bf90aa-c301-4c8c-bad7-338ba2fc04ca.lovable.app/__l5e/assets-v1/ac5ef38a-e983-495c-b9fb-99d76cb94753/rural-hero.jpg" },
    ],
  }),
  component: ImpactLanding,
});
