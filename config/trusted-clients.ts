export type TrustedClient = {
  name: string;
  logoPath?: string;
};

export type TrustedClientGroup = {
  title: string;
  clients: readonly TrustedClient[];
};

export const trustedClientGroups = [
  {
    title: "Hospitality & Hotels",
    clients: [
      { name: "Hilton Hotels" },
      { name: "Radisson Hotels" },
      { name: "One&Only Royal Mirage Dubai", logoPath: "/clients%20logos/oagis.png" },
      { name: "Holiday Inn" },
      { name: "ibis Styles" },
      { name: "Grand Mercure Hotels & Resorts" },
      { name: "S-Hotel Group" },
      { name: "Golden Tulip Hotels & Resorts" },
      { name: "Miramar Al Aqah Beach Resort", logoPath: "/clients%20logos/jaz-miramar-al-aqah-brown.svg" },
    ],
  },
  {
    title: "Healthcare",
    clients: [
      { name: "National Ambulance" },
      { name: "American Hospital Dubai" },
    ],
  },
  {
    title: "Education",
    clients: [
      { name: "Heriot-Watt University Dubai" },
      { name: "Abu Dhabi Indian School", logoPath: "/clients%20logos/adis-new-logo-3.webp" },
      { name: "BITS Pilani Dubai Campus", logoPath: "/clients%20logos/bits-dubai-campus-color-1.png.webp" },
      { name: "University of Khorfakkan" },
      { name: "University of Kalba" },
      { name: "Arab Maritime Academy" },
    ],
  },
  {
    title: "Government & Public Sector",
    clients: [
      { name: "Government of Ajman" },
      { name: "Ajman Executive Council" },
      { name: "Fujairah Free Zone Authority" },
      { name: "Creative City Media Free Zone", logoPath: "/clients%20logos/creativecity.png" },
      { name: "Dubai Media Incorporated", logoPath: "/clients%20logos/digital-dubai-gov-logo.png" },
      { name: "Al Bayan Newspaper", logoPath: "/clients%20logos/albayan.svg" },
    ],
  },
  {
    title: "Real Estate & Investment",
    clients: [
      { name: "Arada", logoPath: "/clients%20logos/arada-logo.svg" },
      { name: "Scope Investment" },
    ],
  },
  {
    title: "Manufacturing & Industrial",
    clients: [
      { name: "GMG" },
      { name: "Al Ghurair Iron & Steel (Al Ghallaf)" },
      { name: "Aditya Birla Star Cement", logoPath: "/clients%20logos/adita.webp" },
      { name: "Real Pack" },
      { name: "Menasco" },
      { name: "Fantco", logoPath: "/clients%20logos/fantco-logo.png" },
      { name: "DuPod" },
      { name: "Valtrans" },
    ],
  },
  {
    title: "Logistics & Marine",
    clients: [
      { name: "ATS Logistics" },
      { name: "Terminals Holding" },
      { name: "Al Boom Marine" },
      { name: "Parkonic", logoPath: "/clients%20logos/parkonic-logo.svg" },
    ],
  },
  {
    title: "Retail & Consumer",
    clients: [
      { name: "Choithrams" },
      { name: "Aswaaq", logoPath: "/clients%20logos/aswaaq-logo.png" },
      { name: "KIKO Milano" },
      { name: "McDonald's", logoPath: "/clients%20logos/McDonalds_Logo.png" },
    ],
  },
  {
    title: "Food Services",
    clients: [{ name: "Capital Catering" }],
  },
  {
    title: "Technology & Software",
    clients: [{ name: "Ellucian", logoPath: "/clients%20logos/ellucian.svg" }],
  },
  {
    title: "Printing & Media",
    clients: [
      { name: "MASAR Printing & Publishing" },
      { name: "CMS Printing Press" },
      { name: "Seed Group" },
    ],
  },
  {
    title: "Other Organizations",
    clients: [
      { name: "Rolls-Royce", logoPath: "/clients%20logos/rolls_royals.png" },
      { name: "Asgar Ali Al Alai Made Est." },
    ],
  },
] as const satisfies readonly TrustedClientGroup[];

export const featuredTrustedClients: readonly (TrustedClient & { sector: string })[] = trustedClientGroups
  .flatMap((group) => (group.clients as readonly TrustedClient[]).map((client) => ({ ...client, sector: group.title })))
  .filter((client) => client.logoPath)
  .slice(0, 12);

export const trustedClientGroupsWithLogos: readonly TrustedClientGroup[] = trustedClientGroups
  .map((group) => ({
    title: group.title,
    clients: (group.clients as readonly TrustedClient[]).filter((client) => client.logoPath),
  }))
  .filter((group) => group.clients.length > 0);
