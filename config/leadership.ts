export type LeadershipProfile = {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  status: "placeholder" | "approved";
};

export const leadershipProfiles: readonly LeadershipProfile[] = [
  {
    id: "executive-profile-01",
    name: "Maya Rahman",
    title: "Chief Executive Officer",
    description:
      "Maya aligns InnovGen's strategy, partnerships, and delivery culture around practical transformation and long-term client value.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=84",
    imageAlt: "Placeholder portrait for InnovGen chief executive profile",
    status: "placeholder",
  },
  {
    id: "executive-profile-02",
    name: "Daniel Okafor",
    title: "Chief Technology Officer",
    description:
      "Daniel guides platform architecture, engineering quality, cloud strategy, and responsible adoption of emerging technologies.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=84",
    imageAlt: "Placeholder portrait for InnovGen chief technology profile",
    status: "placeholder",
  },
  {
    id: "executive-profile-03",
    name: "Layla Hassan",
    title: "Chief Operating Officer",
    description:
      "Layla shapes the operating systems, multidisciplinary teams, and delivery practices that turn strategy into dependable outcomes.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=84",
    imageAlt: "Placeholder portrait for InnovGen chief operating profile",
    status: "placeholder",
  },
];
