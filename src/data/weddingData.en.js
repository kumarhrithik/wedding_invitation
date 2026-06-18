// ─────────────────────────────────────────────────────────────────────────────
// weddingData.en.js  —  English language data
// ─────────────────────────────────────────────────────────────────────────────

export const coupleNames = {
  groom:       "Hrithik",
  bride:       "Chanda",
  groomFamily: "Gupta Family",
  brideFamily: "Gupta Family",
};

export const weddingDate = "2026-06-24T00:00:00+05:30";

// ─── Invitation ───────────────────────────────────────────────────────────────

export const invitationData = {
  meta: { code: "EN", label: "English" },

  invocation:   "॥ Shri Ganeshaya Namah ॥",
  subtitle:     "With the blessings of Lord Shiva & Goddess Parvati",
  sectionLabel: "We joyfully invite you",
  heading:      "You Are Cordially Invited",
  salutation:   "The families of both sides joyfully announce the auspicious union of",

  groom: {
    honorific:       "Chiranjeevi",
    firstName:       "Hrithik Kumar",
    fullName:        "Hrithik Kumar",
    fatherHonorific: "Shri",
    fatherName:      "Ashok G. Gupta",
    motherHonorific: "Smt.",
    motherName:      "Kumari Smita Gupta",
    familyName:      "Gupta Family",
    village:         "Jaynagar, Madhubani, Bihar",
    lineageNote:     "",
  },

  bride: {
    honorific:       "Ayushmati",
    firstName:       "Chanda Shrishta",
    fullName:        "Chanda Shrishta",
    fatherHonorific: "Shri",
    fatherName:      "Girish Kumar Gupta",
    motherHonorific: "Smt.",
    motherName:      "Bharti Devi",
    familyName:      "Gupta Family",
    village:         "Birpur, Supaul, Bihar",
    lineageNote:     "",
  },

  body: [
    "Your presence, blessings, and warmth will make this sacred occasion truly unforgettable. We welcome you with open arms and a joyful heart.",
    "Kindly grace us with your presence across all three days of celebration — from the sacred Matkor & Haldi to the joyous Baraat & Saat Phere — and bless the newlyweds as they begin their divine journey together.",
  ],

  auspiciousNote: "Vivah Panchami Muhurat — 22 to 24 June 2026",

  dateBlock: {
    label:    "Wedding Dates",
    dates:    "22 – 24 June 2026",
    venue:    "Marwadi Vivah Bhawan",
    location: "Jaynagar, Madhubani, Bihar",
  },

  footer: {
    // groomSide:      "Gupta Family",
    // brideSide:      "Gupta Family (Bride's Side)",
    nimantrak:      "Hosts",
    nimantrakNames: "Gupta Family",
  },
};

// ─── Events ───────────────────────────────────────────────────────────────────

export const eventsStatic = [
  {
    id:         "matkor",
    icon:       "🌿",
    color:      "#E8B96A",
    bgGradient: "linear-gradient(135deg, #4A3000 0%, #8B6000 50%, #4A3000 100%)",
    audioSrc:   `${process.env.PUBLIC_URL}/audio/Navrai Maajhi English Vinglish 320 Kbps.mp3`,
  },
  {
    id:         "sangeet",
    icon:       "🎶",
    color:      "#C9963A",
    bgGradient: "linear-gradient(135deg, #3A0A20 0%, #6B1A2A 50%, #3A0A20 100%)",
    audioSrc:   `${process.env.PUBLIC_URL}/audio/Mehendi Mashup 2021_ Aishwarya.mp3`,
  },
  {
    id:         "baraat swagat and saat-phere",
    icon:       "🐎",
    color:      "#9B2C3E",
    bgGradient: "linear-gradient(135deg, #1A0A2E 0%, #3D1A5C 50%, #1A0A2E 100%)",
    audioSrc:   `${process.env.PUBLIC_URL}/audio/Kalaavathi-Video-Lyrical-Sarkaru-Vaari-Paata-Mahesh-Babu-Keerthy-Suresh-Thaman-S-Parasura.mp3`,
  },
  // {
  //   id:         "saat-phere",
  //   icon:       "🔥",
  //   color:      "#C9963A",
  //   bgGradient: "linear-gradient(135deg, #2C1000 0%, #6B3A00 50%, #2C1000 100%)",
  //   audioSrc:   "/audio/Kalaavathi-Video-Lyrical-Sarkaru-Vaari-Paata-Mahesh-Babu-Keerthy-Suresh-Thaman-S-Parasura.mp3",
  // },
  {
    id:         "reception",
    icon:       "✨",
    color:      "#E8B96A",
    bgGradient: "linear-gradient(135deg, #0D1A0D 0%, #1A3A1A 50%, #0D1A0D 100%)",
    audioSrc:   `${process.env.PUBLIC_URL}/audio/Sajh Dhaj Ke Mausam 320 Kbps.mp3`,
  },
];

export const eventsData = [
  {
    title:       "Matkor & Haldi",
    date:        "22nd June",
    time:        "05:00 PM Onwards",
    audioLabel:  "Folk Dhol Beats",
    description: "The auspicious Matkor ritual — gathering sacred earth — followed by the joyous Haldi ceremony where turmeric and blessings are showered upon the couple. The evening procession brings the families together in song and celebration.",
    dateTag:     "22–24 June 2026",
    locationTag: "Jaynagar, Madhubani, Bihar",
  },
  {
    title:       "Sangeet & Mehendi",
    date:        "23rd June",
    time:        "07:00 PM onwards",
    audioLabel:  "Sangeet Melodies",
    description: "An evening of music, dance, and artistry. Henna patterns weave stories of love on the bride's hands as the night fills with classical melodies and festive songs that bind both families as one.",
    dateTag:     "22–24 June 2026",
    locationTag: "Marwadi Vivah Bhawan, Jaynagar, Madhubani, Bihar",
  },
  {
    title:       "Baraat and Saat Phere",
    date:        "24th June",
    time:        "08:00 AM",
    audioLabel:  "Baraat Dhol",
    description: "The groom's grand procession — a magnificent spectacle of music, dance, and jubilation — arrives to herald the union. Dhol beats echo as family and friends usher in a new chapter. Seven sacred vows, seven circles of fire. In this most profound moment, two souls become one — witnessed by the sacred flame, blessed by the universe, bound for eternity.",
    dateTag:     "22–24 JUNE 2026",
    locationTag: "Marwadi Vivah Bhawan, Jaynagar, Madhubani, Bihar",
  },
  // {
  //   title:       "",
  //   date:        "24th February",
  //   time:        "12:00 PM",
  //   audioLabel:  "Vedic Mantras",
  //   description: "Seven sacred vows, seven circles of fire. In this most profound moment, two souls become one — witnessed by the sacred flame, blessed by the universe, bound for eternity.",
  //   dateTag:     "22–24 Feb 2026",
  //   locationTag: "Jaynagar, Madhubani, Bihar",
  // },
  {
    title:       "Wedding Reception",
    date:        "24th June",
    time:        "7:00 PM",
    audioLabel:  "Classical Shehnai",
    description: "A grand evening of celebration as Mr. & Mrs. Gupta welcome their guests. Revel in the joy of the newly wed couple amidst an evening of elegance, warmth, and festivity.",
    dateTag:     "22–24 JUNE 2026",
    locationTag: "Marwadi Vivah Bhawan, Jaynagar, Madhubani, Bihar",
  },
];

export function getEvents() {
  return eventsStatic.map((staticFields, i) => ({
    ...staticFields,
    ...eventsData[i],
  }));
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

export const scheduleData = [
  {
    date: "22nd June, Monday",
    items: [
      { time: "Morning",  event: "Matkor Ceremony", note: "Sacred earth ritual" },
      { time: "05:00 PM Onwards",  event: "Haldi Ceremony",  note: "Followed by procession" },
    ],
  },
  {
    date: "23rd June, Tuesday",
    items: [
      { time: "07:00 PM",  event: "Sangeet Night",   note: "Music & dance celebration" },
      { time: "08:00 PM",  event: "Mehendi",          note: "Henna & festivities" },
    ],
  },
  {
    date: "24th June, Wednesday",
    items: [
      { time: "08:00 AM",  event: "Baraat Swagat",     note: "Groom arrival" },
      { time: "10:00 AM", event: "Varmala and Saat Phere",      note: "Wedding ceremony" },
      { time: "07:00 PM",  event: "Wedding Reception",          note: "Dinner & celebration" },
    ],
  },
];

// ─── Section Labels ───────────────────────────────────────────────────────────

export const sectionLabels = {
  events: {
    label:    "Celebrations Await",
    title:    "The Wedding Events",
    subtitle: "Tap on each event to immerse yourself in its story",
  },
  schedule: {
    label: "At a Glance",
    title: "Complete Schedule",
  },
};

// ─── Photos ───────────────────────────────────────────────────────────────────

export const photos = [
  { id: "p2", src: `${process.env.PUBLIC_URL}/photos/6.jpeg`, caption: "" },
  { id: "p4", src: `${process.env.PUBLIC_URL}/photos/5.jpeg`, caption: "" },
  { id: "p1", src: `${process.env.PUBLIC_URL}/photos/2.jpeg`, caption: "" },
];

// ─── Venue ────────────────────────────────────────────────────────────────────

export const venue = {
  name:        "Marwadi Vivah Bhavan",
  address:     "NH-105, In Front Of Sarwdevmayi Mata Temple, Jaynagar, Madhubani, Bihar — 847226",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.897085180806!2d86.13998295298046!3d26.58767756866333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec25a427843dcb%3A0xb4d7e4dd90118335!2sSarwdevmayi%20Mata%20Temple!5e0!3m2!1sen!2sin!4v1778737566525!5m2!1sen!2sin",
  mapUrl:      "https://maps.app.goo.gl/ppWDCLgkjg47fN719",
  // phone:       "+91 98765 43210",
  // email:       "wedding@arjunpriya2025.com",
};

// ─── Contact Section Labels ───────────────────────────────────────────────────

export const contactLabels = {
  sectionLabel:     "We Would Love to See You",
  title:            "RSVP & Connect",
  body:             "Your presence means the world to us. We will be overjoyed to celebrate this special day with you.",
  namePlaceholder:  "Enter your full name",
  nameLabel:        "Your Name",
  attendingLabel:   "Attending?",
  messageLabel:       "Message / Blessings",
  messagePlaceholder: "Share your wishes for the couple…",
  submitLabel:        "Send My RSVP",
  sendingLabel:       "Sending…",
  successMessage:     "✨ Thank you! We look forward to celebrating with you.",
};

// ─── Footer Nav ───────────────────────────────────────────────────────────────

export const footerNav = [
  { label: "Events",   href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery",  href: "#photos" },
  { label: "Venue",    href: "#venue" },
  { label: "RSVP",     href: "#contact" },
];

export const footerCredit = "Made with ❤️ for a day that lasts forever";

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Events",   href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery",  href: "#photos" },
  { label: "Venue",    href: "#venue" },
];

export const navRsvpLabel = "RSVP";

// ─── Venue Section Labels ─────────────────────────────────────────────────────

export const venueLabels = {
  sectionLabel:      "Where We Celebrate",
  title:             "The Venue",
  contactTitle:      "Contact",
  directionsBtn:     "Get Directions",
};

// ─── Hero Section Labels ──────────────────────────────────────────────────────

export const heroLabels = {
  invocation:    "✦ With the blessings of the divine ✦",
  tagline:       "Joyfully invite you to celebrate their union",
  dateText:      "22 – 24\u00A0June\u00A02026",
  locationText:  "Jaynagar, Madhubani, Bihar",
  ctaLabel:      "Explore the Celebrations",
  countdownUnits: ["Days", "Hours", "Mins", "Secs"],
  bentoTags:     ["22–24 June 2026", "Jaynagar, Madhubani"],
};

// ─── Scroll Reveal Text ───────────────────────────────────────────────────────

// export const scrollRevealText =
//   "Two souls bound by love and the ancient traditions of Mithila — " +
//   "celebrating Matkor, Haldi, Sangeet, and Saat Phere across three " +
//   "sacred days, woven together by family, colour, music, and the " +
//   "eternal promise of a new beginning.";

export const scrollRevealEyebrow = "A Celebration of Love";

// ─── Photos Section Labels ────────────────────────────────────────────────────

export const photosLabels = {
  sectionLabel: "Moments & Memories",
  title:        "Photo Gallery",
  subtitle:     "Scroll to journey through the celebration",
};