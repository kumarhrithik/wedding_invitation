// ─────────────────────────────────────────────────────────────────────────────
// weddingData.js  —  Single source of truth for the entire wedding website.
//
// 🔴 Search "Dummy" to find every placeholder that needs a real value.
//
// BILINGUAL STRATEGY
// ──────────────────
// All user-facing text lives in language-keyed objects:
//   invitationData.en / invitationData.hi
//   eventsData.en[]   / eventsData.hi[]
//   scheduleData.en[] / scheduleData.hi[]
//
// Non-translatable data (audio, colors, gradients, map URLs, photos) stays
// flat since it doesn't change between languages.
//
// The active language key ("en" | "hi") is managed in App.js and passed
// down as props — no extra library needed.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Global (language-independent) ──────────────────────────────────────────

export const coupleNames = {
  groom:       "Hrithik",
  bride:       "Chanda",
  groomFamily: "Gupta Family",
  brideFamily: "Gupta Family",
};

export const weddingDate = "2026-02-24T00:00:00+05:30";

// ─────────────────────────────────────────────────────────────────────────────
// INVITATION DATA  (bilingual)
// ─────────────────────────────────────────────────────────────────────────────

export const invitationData = {

  en: {
    meta: { code: "EN", label: "English" },

    invocation:   "॥ Shri Ganeshaya Namah ॥",
    subtitle:     "With the blessings of Lord Shiva & Goddess Parvati",
    sectionLabel: "We joyfully invite you",
    heading:      "You Are Cordially Invited",
    salutation:   "The families of both sides joyfully announce the auspicious union of",

    groom: {
      honorific:       "Chi.",   // Chiranjeevi — "Long-lived"; traditional groom prefix
      firstName:       "Hrithik",
      fullName:        "Dummy Groom Full Name",                   // 🔴 DUMMY
      fatherHonorific: "Shri",
      fatherName:      "Dummy Father Full Name (Groom Side)",     // 🔴 DUMMY
      motherHonorific: "Smt.",
      motherName:      "Dummy Mother Full Name (Groom Side)",     // 🔴 DUMMY
      familyName:      "Gupta Family",
      village:         "Jaynagar, Madhubani, Bihar",
      lineageNote:     "",   // e.g. "Kashyap Gotra" — leave blank to hide
    },

    bride: {
      honorific:       "Sau.",  // Saubhagyavati — "Ever-auspicious"; traditional bride prefix
      firstName:       "Chanda",
      fullName:        "Dummy Bride Full Name",                   // 🔴 DUMMY
      fatherHonorific: "Shri",
      fatherName:      "Dummy Father Full Name (Bride Side)",     // 🔴 DUMMY
      motherHonorific: "Smt.",
      motherName:      "Dummy Mother Full Name (Bride Side)",     // 🔴 DUMMY
      familyName:      "Gupta Family",
      village:         "Madhubani, Bihar",
      lineageNote:     "",   // e.g. "Shandilya Gotra"
    },

    body: [
      "Your presence, blessings, and warmth will make this sacred occasion truly unforgettable. We welcome you with open arms and a joyful heart.",
      "Kindly grace us with your presence across all three days of celebration — from the sacred Matkor & Haldi to the joyous Baraat & Saat Phere — and bless the newlyweds as they begin their divine journey together.",
    ],

    auspiciousNote: "Vivah Panchami Muhurat — 22 to 24 February 2026",

    dateBlock: {
      label:    "Wedding Dates",
      dates:    "22 – 24 February 2026",
      venue:    "Shri Ram Vivah Mandap",
      location: "Jaynagar, Madhubani, Bihar",
    },

    footer: {
      groomSide:      "Gupta Family (Groom's Side)",
      brideSide:      "Gupta Family (Bride's Side)",
      nimantrak:      "Hosts",
      nimantrakNames: "Dummy Host Name 1, Dummy Host Name 2",    // 🔴 DUMMY
    },
  },

  hi: {
    meta: { code: "HI", label: "हिन्दी" },

    invocation:   "॥ श्री गणेशाय नमः ॥",
    subtitle:     "श्री शिव-पार्वती की असीम कृपा से",
    sectionLabel: "आपको सादर आमंत्रित किया जाता है",
    heading:      "शुभ विवाह निमंत्रण",
    salutation:   "दोनों परिवारों की ओर से हर्षपूर्वक सूचित किया जाता है इस मंगल विवाह का",

    groom: {
      honorific:       "चि.",      // चिरंजीवी — वर के नाम के पूर्व पारम्परिक शुभाशीर्वाद
      firstName:       "हृतिक",
      fullName:        "Dummy Groom Full Name (Hindi)",           // 🔴 DUMMY — देवनागरी में लिखें
      fatherHonorific: "श्री",
      fatherName:      "Dummy Father Full Name (वर पक्ष)",       // 🔴 DUMMY
      motherHonorific: "श्रीमती",
      motherName:      "Dummy Mother Full Name (वर पक्ष)",       // 🔴 DUMMY
      familyName:      "गुप्ता परिवार",
      village:         "जयनगर, मधुबनी, बिहार",
      lineageNote:     "",   // उदा. "कश्यप गोत्र"
    },

    bride: {
      honorific:       "सौ.",      // सौभाग्यवती — वधू के नाम के पूर्व पारम्परिक शुभाशीर्वाद
      firstName:       "चाँदा",
      fullName:        "Dummy Bride Full Name (Hindi)",           // 🔴 DUMMY — देवनागरी में लिखें
      fatherHonorific: "श्री",
      fatherName:      "Dummy Father Full Name (वधू पक्ष)",      // 🔴 DUMMY
      motherHonorific: "श्रीमती",
      motherName:      "Dummy Mother Full Name (वधू पक्ष)",      // 🔴 DUMMY
      familyName:      "गुप्ता परिवार",
      village:         "मधुबनी, बिहार",
      lineageNote:     "",   // उदा. "शाण्डिल्य गोत्र"
    },

    body: [
      "आपकी उपस्थिति, आशीर्वाद और स्नेह इस पवित्र अवसर को सदा स्मरणीय बना देगा। आपका हार्दिक स्वागत एवं अभिनंदन है।",
      "इस तीन दिवसीय उत्सव में — मटकोर एवं हल्दी से लेकर बारात व सात फेरों तक — सहपरिवार पधारकर नवदम्पती को आशीर्वाद प्रदान करें।",
    ],

    auspiciousNote: "शुभ विवाह मुहूर्त — २२ से २४ फ़रवरी २०२६",

    dateBlock: {
      label:    "विवाह तिथि",
      dates:    "२२ – २४ फ़रवरी २०२६",
      venue:    "श्री राम विवाह मंडप",
      location: "जयनगर, मधुबनी, बिहार",
    },

    footer: {
      groomSide:      "गुप्ता परिवार (वर पक्ष)",
      brideSide:      "गुप्ता परिवार (वधू पक्ष)",
      nimantrak:      "निमंत्रक",
      nimantrakNames: "Dummy Host Name 1, Dummy Host Name 2",    // 🔴 DUMMY — परिवारजन के नाम
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// EVENTS DATA  (bilingual)
//
// Non-text fields (id, icon, color, bgGradient, audioSrc) are shared and
// stored separately in eventsStatic[].  The Events component merges them.
//
// Each language array must have the same length and order as eventsStatic.
// ─────────────────────────────────────────────────────────────────────────────

// Language-independent fields — audio, colors, icon, id
export const eventsStatic = [
  {
    id:         "matkor",
    icon:       "🌿",
    color:      "#E8B96A",
    bgGradient: "linear-gradient(135deg, #4A3000 0%, #8B6000 50%, #4A3000 100%)",
    audioSrc:   "/audio/Navrai Maajhi English Vinglish 320 Kbps.mp3",
  },
  {
    id:         "sangeet",
    icon:       "🎶",
    color:      "#C9963A",
    bgGradient: "linear-gradient(135deg, #3A0A20 0%, #6B1A2A 50%, #3A0A20 100%)",
    audioSrc:   "/audio/Mehendi Mashup 2021_ Aishwarya.mp3",
  },
  {
    id:         "baraat",
    icon:       "🐎",
    color:      "#9B2C3E",
    bgGradient: "linear-gradient(135deg, #1A0A2E 0%, #3D1A5C 50%, #1A0A2E 100%)",
    audioSrc:   "/audio/Sajh Dhaj Ke Mausam 320 Kbps.mp3",
  },
  {
    id:         "saat-phere",
    icon:       "🔥",
    color:      "#C9963A",
    bgGradient: "linear-gradient(135deg, #2C1000 0%, #6B3A00 50%, #2C1000 100%)",
    audioSrc:   "/audio/Kalaavathi-Video-Lyrical-Sarkaru-Vaari-Paata-Mahesh-Babu-Keerthy-Suresh-Thaman-S-Parasura.mp3",
  },
  {
    id:         "reception",
    icon:       "✨",
    color:      "#E8B96A",
    bgGradient: "linear-gradient(135deg, #0D1A0D 0%, #1A3A1A 50%, #0D1A0D 100%)",
    audioSrc:   "/audio/Gujju Pataka Satyaprem Ki Katha 320 Kbps.mp3",
  },
];

export const eventsData = {

  en: [
    {
      title:       "Matkor & Haldi",
      date:        "22nd February",
      time:        "Morning & Evening",
      audioLabel:  "Folk Dhol Beats",
      description: "The auspicious Matkor ritual — gathering sacred earth — followed by the joyous Haldi ceremony where turmeric and blessings are showered upon the couple. The evening procession brings the families together in song and celebration.",
      dateTag:     "22–24 Feb 2026",
      locationTag: "Jaynagar, Madhubani, Bihar",
    },
    {
      title:       "Sangeet & Mehendi",
      date:        "23rd February",
      time:        "6:00 PM onwards",
      audioLabel:  "Sangeet Melodies",
      description: "An evening of music, dance, and artistry. Henna patterns weave stories of love on the bride's hands as the night fills with classical melodies and festive songs that bind both families as one.",
      dateTag:     "22–24 Feb 2026",
      locationTag: "Jaynagar, Madhubani, Bihar",
    },
    {
      title:       "Baraat",
      date:        "24th February",
      time:        "9:00 AM",
      audioLabel:  "Baraat Dhol",
      description: "The groom's grand procession — a magnificent spectacle of music, dance, and jubilation — arrives to herald the union. Dhol beats echo as family and friends usher in a new chapter.",
      dateTag:     "22–24 Feb 2026",
      locationTag: "Jaynagar, Madhubani, Bihar",
    },
    {
      title:       "Saat Phere",
      date:        "24th February",
      time:        "12:00 PM",
      audioLabel:  "Vedic Mantras",
      description: "Seven sacred vows, seven circles of fire. In this most profound moment, two souls become one — witnessed by the sacred flame, blessed by the universe, bound for eternity.",
      dateTag:     "22–24 Feb 2026",
      locationTag: "Jaynagar, Madhubani, Bihar",
    },
    {
      title:       "Reception",
      date:        "24th February",
      time:        "7:00 PM",
      audioLabel:  "Classical Shehnai",
      description: "A grand evening of celebration as Mr. & Mrs. Gupta welcome their guests. Revel in the joy of the newly wed couple amidst an evening of elegance, warmth, and festivity.",
      dateTag:     "22–24 Feb 2026",
      locationTag: "Jaynagar, Madhubani, Bihar",
    },
  ],

  hi: [
    {
      title:       "मटकोर और हल्दी",
      date:        "२२ फ़रवरी",
      time:        "प्रातः एवं सायंकाल",
      audioLabel:  "लोक ढोल बीट्स",
      description: "शुभ मटकोर विधि — जिसमें पवित्र मिट्टी एकत्र की जाती है — उसके बाद आनंदमय हल्दी समारोह होता है, जहाँ युगल पर हल्दी और आशीर्वाद की वर्षा होती है। सांध्यकालीन शोभायात्रा दोनों परिवारों को गीत और उल्लास में एक साथ लाती है।",
      dateTag:     "२२–२४ फ़रवरी २०२६",
      locationTag: "जयनगर, मधुबनी, बिहार",
    },
    {
      title:       "संगीत और मेहंदी",
      date:        "२३ फ़रवरी",
      time:        "सायं ६:०० बजे से",
      audioLabel:  "संगीत की स्वरलहरियाँ",
      description: "संगीत, नृत्य और कला से सजी एक शाम। दुल्हन के हाथों पर मेहंदी प्रेम की कहानियाँ रचती है, जबकि रात शास्त्रीय धुनों और उत्सवी गीतों से गूँजती है — जो दोनों परिवारों को एक सूत्र में बाँधते हैं।",
      dateTag:     "२२–२४ फ़रवरी २०२६",
      locationTag: "जयनगर, मधुबनी, बिहार",
    },
    {
      title:       "बारात",
      date:        "२४ फ़रवरी",
      time:        "प्रातः ९:०० बजे",
      audioLabel:  "बारात ढोल",
      description: "दूल्हे की भव्य बारात — संगीत, नृत्य और उल्लास का एक अद्भुत दृश्य — विवाह की शुरुआत का उद्घोष करती है। ढोल की गूँज में परिवारजन और मित्र एक नए अध्याय का स्वागत करते हैं।",
      dateTag:     "२२–२४ फ़रवरी २०२६",
      locationTag: "जयनगर, मधुबनी, बिहार",
    },
    {
      title:       "सात फेरे",
      date:        "२४ फ़रवरी",
      time:        "दोपहर १२:०० बजे",
      audioLabel:  "वैदिक मंत्र",
      description: "सात पवित्र वचन, अग्नि की सात परिक्रमाएँ। इस परम पावन क्षण में दो आत्माएँ एक हो जाती हैं — पवित्र अग्नि की साक्षी में, ब्रह्माण्ड के आशीर्वाद से, सनातन के लिए बँधी हुई।",
      dateTag:     "२२–२४ फ़रवरी २०२६",
      locationTag: "जयनगर, मधुबनी, बिहार",
    },
    {
      title:       "रिसेप्शन",
      date:        "२४ फ़रवरी",
      time:        "सायं ७:०० बजे",
      audioLabel:  "शहनाई",
      description: "श्री व श्रीमती गुप्ता द्वारा अपने अतिथियों के स्वागत में एक भव्य उत्सव। नवदम्पती की खुशी में शामिल हों — एक शाम जो शान, प्रेम और उत्साह से भरी है।",
      dateTag:     "२२–२४ फ़रवरी २०२६",
      locationTag: "जयनगर, मधुबनी, बिहार",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE DATA  (bilingual)
// ─────────────────────────────────────────────────────────────────────────────

export const scheduleData = {

  en: [
    {
      date: "22nd February, Saturday",
      items: [
        { time: "Morning",  event: "Matkor Ceremony", note: "Sacred earth ritual" },
        { time: "Evening",  event: "Haldi Ceremony",  note: "Followed by procession" },
      ],
    },
    {
      date: "23rd February, Sunday",
      items: [
        { time: "6:00 PM",  event: "Sangeet Night",   note: "Music & dance celebration" },
        { time: "7:00 PM",  event: "Mehendi",          note: "Henna & festivities" },
      ],
    },
    {
      date: "24th February, Monday",
      items: [
        { time: "9:00 AM",  event: "Baraat Procession", note: "Grand arrival" },
        { time: "12:00 PM", event: "Saat Phere",         note: "Wedding ceremony" },
        { time: "7:00 PM",  event: "Reception",          note: "Dinner & celebration" },
      ],
    },
  ],

  hi: [
    {
      date: "शनिवार, २२ फ़रवरी",
      items: [
        { time: "प्रातः",    event: "मटकोर विधि",  note: "पवित्र मिट्टी की रस्म" },
        { time: "सायंकाल",  event: "हल्दी विधि",  note: "शोभायात्रा सहित" },
      ],
    },
    {
      date: "रविवार, २३ फ़रवरी",
      items: [
        { time: "सायं ६:००", event: "संगीत रात्रि", note: "संगीत एवं नृत्य उत्सव" },
        { time: "सायं ७:००", event: "मेहंदी",        note: "मेहंदी एवं हर्षोल्लास" },
      ],
    },
    {
      date: "सोमवार, २४ फ़रवरी",
      items: [
        { time: "प्रातः ९:००",  event: "बारात प्रस्थान", note: "भव्य आगमन" },
        { time: "दोपहर १२:००", event: "सात फेरे",         note: "विवाह संस्कार" },
        { time: "सायं ७:००",   event: "रिसेप्शन",         note: "रात्रिभोज एवं उत्सव" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABELS  (bilingual — used by Events & Schedule section headers)
// ─────────────────────────────────────────────────────────────────────────────

export const sectionLabels = {
  en: {
    events: {
      label:    "Celebrations Await",
      title:    "The Wedding Events",
      subtitle: "Tap on each event to immerse yourself in its story",
    },
    schedule: {
      label: "At a Glance",
      title: "Complete Schedule",
    },
  },
  hi: {
    events: {
      label:    "उत्सव की प्रतीक्षा है",
      title:    "विवाह के आयोजन",
      subtitle: "प्रत्येक आयोजन पर टैप करें और उसकी कहानी में डूब जाएँ",
    },
    schedule: {
      label: "एक नज़र में",
      title: "पूर्ण कार्यक्रम",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PHOTOS  (language-independent)
// ─────────────────────────────────────────────────────────────────────────────

export const photos = [
  { id: "p1", src: "/photos/IMG20240928120151.jpg", caption: "Haldi ceremony" },
  { id: "p2", src: "/photos/IMG20241002144246.jpg", caption: "Sangeet night" },
  { id: "p3", src: "/photos/IMG20241006074943.jpg", caption: "Baraat procession" },
];

// ─────────────────────────────────────────────────────────────────────────────
// VENUE  (language-independent)
// ─────────────────────────────────────────────────────────────────────────────

export const venue = {
  name:        "Shri Ram Vivah Mandap",
  address:     "Marwadi Vivah Bhavan, NH-105, In Front Of Sarwdevmayi Mata Temple, Jaynagar, Madhubani, Bihar — 847226",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.897085180806!2d86.13998295298046!3d26.58767756866333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec25a427843dcb%3A0xb4d7e4dd90118335!2sSarwdevmayi%20Mata%20Temple!5e0!3m2!1sen!2sin!4v1778737566525!5m2!1sen!2sin",
  mapUrl:      "https://maps.app.goo.gl/ppWDCLgkjg47fN719",
  phone:       "+91 98765 43210",           // 🔴 DUMMY — replace with real number
  email:       "wedding@arjunpriya2025.com", // 🔴 DUMMY — replace with real email
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — merge static + bilingual event fields into one array
// Usage:  getEvents("hi")  →  array ready for EventCard / EventModal
// ─────────────────────────────────────────────────────────────────────────────

export function getEvents(langKey = "en") {
  return eventsStatic.map((staticFields, i) => ({
    ...staticFields,
    ...eventsData[langKey][i],
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGACY EXPORT — kept so any component that still imports `events` or
// `schedule` directly doesn't break before you update it.
// Safe to delete once Events.jsx and Schedule.jsx are updated.
// ─────────────────────────────────────────────────────────────────────────────

export const events   = getEvents("en");
export const schedule = scheduleData.en;