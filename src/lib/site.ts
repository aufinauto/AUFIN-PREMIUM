export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iconcars.cz";

export const NAP = {
  name: "ICONcars",
  legalName: "Dejvetech s.r.o.",
  phone: "+420704901148",
  phoneDisplay: "+420 704 901 148",
  email: "zakaznik.iconcars@gmail.com",
  showroom: {
    name: "Partnerský showroom — SilverCars",
    streetAddress: "Rohanské nábřeží 693/10",
    addressLocality: "Praha 8",
    postalCode: "186 00",
    addressCountry: "CZ",
  },
} as const;
