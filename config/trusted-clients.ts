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
      { name: "Hilton Hotels" , logoPath: "/clients%20logos/hilton.png" },
      { name: "Radisson Hotels" , logoPath: "/clients%20logos/radisson.png" },
      { name: "Oagis", logoPath: "/clients%20logos/oagis.png" },

      { name: "One&Only Royal Mirage Dubai", logoPath: "/clients%20logos/one.png" },
      { name: "Holiday Inn" },
      { name: "ibis Styles" },
      { name: "Grand Mercure Hotels & Resorts" },
      { name: "S-Hotel Group" , logoPath: "/clients%20logos/shotel.png" },
      { name: "Miramar Al Aqah Beach Resort", logoPath: "/clients%20logos/jaz-miramar-al-aqah-brown.svg" },
            { name: "Golden Tulip Hotels & Resorts" , logoPath: "/clients%20logos/MIRAMER.png" },

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
      { name: "University of Kalba", logoPath: "/clients%20logos/kalaba.png" },
      { name: "Arab Maritime Academy" },
    ],
  },
  {
    title: "Government & Public Sector",
    clients: [
      { name: "Government of Ajman" , logoPath: "/clients%20logos/ajman.png" },
      {name:"Real Park", logoPath: "/clients%20logos/real.png"},
      { name: "Ajman Executive Council" },
      { name: "Fujairah Free Zone Authority", logoPath: "/clients%20logos/fujraish.png" },
      { name: "Creative City Media Free Zone", logoPath: "/clients%20logos/creativecity.png" },
      { name: "Dubai Media Incorporated", logoPath: "/clients%20logos/digital-dubai-gov-logo.png" },
      { name: "Al Bayan Newspaper", logoPath: "/clients%20logos/albayan.svg" },
      { name: "ATS Logistics", logoPath: "/clients%20logos/ats_logo.png" },
      { name: "American Hospital", logoPath: "/clients%20logos/american_hospital.png" },
      { name: "Al Boom Marine", logoPath: "/clients%20logos/Al_boom.png" },
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
      { name: "Menasco" , logoPath: "/clients%20logos/menasco.png" },
    
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
      { name: "Kiko Milano" , logoPath: "/clients%20logos/kiko.png" },
      { name: "McDonald's", logoPath: "/clients%20logos/McDonalds_Logo.png" },
       { name: "Aswaaq", logoPath: "/clients%20logos/aswaaq-logo.png" },
 
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
      { name: "MASAR Printing & Publishing" , logoPath: "/clients%20logos/media.png" },
      { name: "CMS Printing Press" , logoPath: "/clients%20logos/cms.png" },
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

/**
 * The logo directory is intentionally presented as one collective client wall
 * on the Clients route. Grouping remains available above for data management
 * and future filtering without making the public experience category-led.
 */
export const trustedClientsWithLogos: readonly TrustedClient[] = trustedClientGroups
  .flatMap((group) => group.clients as readonly TrustedClient[])
  .filter((client) => client.logoPath);

export const homeFeaturedTrustedClients: readonly TrustedClient[] = [
  { name: "Hilton Hotels", logoPath: "/clients%20logos/hilton.png" },
  { name: "Radisson Hotels", logoPath: "/clients%20logos/radisson.png" },
  { name: "One&Only Royal Mirage Dubai", logoPath: "/clients%20logos/one.png" },
  { name: "S-Hotel Group", logoPath: "/clients%20logos/shotel.png" },
  { name: "Miramar Al Aqah Beach Resort", logoPath: "/clients%20logos/jaz-miramar-al-aqah-brown.svg" },
  { name: "Golden Tulip Hotels & Resorts", logoPath: "/clients%20logos/MIRAMER.png" },
  { name: "Fujairah Free Zone Authority", logoPath: "/clients%20logos/fujraish.png" },
  { name: "Creative City Media Free Zone", logoPath: "/clients%20logos/creativecity.png" },
  { name: "Dubai Media Incorporated", logoPath: "/clients%20logos/digital-dubai-gov-logo.png" },
  { name: "Al Bayan Newspaper", logoPath: "/clients%20logos/albayan.svg" },
  { name: "ATS Logistics", logoPath: "/clients%20logos/ats_logo.png" },
  { name: "Menasco", logoPath: "/clients%20logos/menasco.png" },
  { name: "Parkonic", logoPath: "/clients%20logos/parkonic-logo.svg" },
  { name: "McDonald's", logoPath: "/clients%20logos/McDonalds_Logo.png" },
  { name: "Rolls-Royce", logoPath: "/clients%20logos/rolls_royals.png" },
  { name: "Abu Dhabi Indian School", logoPath: "/clients%20logos/adis-new-logo-3.webp" },
  { name: "BITS Pilani Dubai Campus", logoPath: "/clients%20logos/bits-dubai-campus-color-1.png.webp" },
  { name: "University of Kalba", logoPath: "/clients%20logos/kalaba.png" },
  { name: "American Hospital", logoPath: "/clients%20logos/american_hospital.png" },
] as const;
