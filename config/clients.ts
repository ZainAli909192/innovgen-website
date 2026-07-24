export type ClientMark = {
  id: string;
  name: string;
  alt: string;
  imageAlt: string;
  imageUrl: string;
  imageSourceUrl: string;
  displayPriority: number;
  websiteUrl?: string;
  logoPath?: string;
  status: "placeholder" | "approved";
};

export const clientMarks: readonly ClientMark[] = [
  {
    id: "public-sector",
    name: "Public Sector",
    alt: "Temporary public-sector client mark pending approval",
    imageAlt: "Classical civic building representing public-sector technology",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=82",
    imageSourceUrl:
      "https://unsplash.com/photos/low-angle-photography-of-gray-concrete-building-S7JiY_R0Q1E",
    displayPriority: 1,
    status: "placeholder",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    alt: "Temporary financial-services client mark pending approval",
    imageAlt: "Modern glass towers representing financial services",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82",
    imageSourceUrl:
      "https://unsplash.com/photos/low-angle-photography-of-high-rise-building-during-daytime-eWqOgJ-lfiI",
    displayPriority: 2,
    status: "placeholder",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    alt: "Temporary healthcare client mark pending approval",
    imageAlt: "Healthcare professional using modern digital systems",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=82",
    imageSourceUrl:
      "https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-using-macbook-pro-L8tWZT4CcVQ",
    displayPriority: 3,
    status: "placeholder",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    alt: "Temporary enterprise client mark pending approval",
    imageAlt: "Contemporary collaborative enterprise workspace",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82",
    imageSourceUrl:
      "https://unsplash.com/photos/photo-of-dining-table-and-chairs-GWe0dlVD9e0",
    displayPriority: 4,
    status: "placeholder",
  },
  {
    id: "technology",
    name: "Technology",
    alt: "Temporary technology client mark pending approval",
    imageAlt: "Detailed circuit board representing advanced technology",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=82",
    imageSourceUrl:
      "https://unsplash.com/photos/macro-photography-of-black-circuit-board-w7ZyuGYNpRQ",
    displayPriority: 5,
    status: "placeholder",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    alt: "Temporary infrastructure client mark pending approval",
    imageAlt: "Large-scale construction representing modern infrastructure",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=82",
    imageSourceUrl:
      "https://unsplash.com/photos/two-person-standing-on-gray-tile-paving-hGV2TfOh0ns",
    displayPriority: 6,
    status: "placeholder",
  },
];
