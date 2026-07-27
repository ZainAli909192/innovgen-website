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
    id: "as-pillai",
    name: "A.S. Pillai",
    title: "Founder & Chief Executive Officer",
    description:
      "A.S. Pillai leads InnovGen's strategic direction, building trusted technology partnerships and sustainable growth for clients.",
    imageUrl: "/heads/AS_Pillai_Founder_CEO.png",
    imageAlt: "A.S. Pillai, InnovGen Founder and Chief Executive Officer",
    status: "approved",
  },
  {
    id: "nayef-bin-bouta-al-harsoosi",
    name: "Nayef bin Bouta Al Harsoosi",
    title: "Founder & Chief Operating Officer",
    description:
      "Nayef aligns operations, delivery discipline, and client experience to turn InnovGen's strategy into dependable outcomes.",
    imageUrl: "/heads/Nayef_bin_Bouta_Al_Harsoosi_founder_COO.png",
    imageAlt: "Nayef bin Bouta Al Harsoosi, InnovGen Founder and Chief Operating Officer",
    status: "approved",
  },
  {
    id: "nagaraj-sheshadri",
    name: "Nagaraj Sheshadri",
    title: "Business Head",
    description:
      "Nagaraj guides business development and client relationships, connecting enterprise needs with practical technology solutions.",
    imageUrl: "/heads/Nagaraj_sheshadri_business_head.png",
    imageAlt: "Nagaraj Sheshadri, InnovGen Business Head",
    status: "approved",
  },
];
