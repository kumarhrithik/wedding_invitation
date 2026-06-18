// ─────────────────────────────────────────────────────────────────────────────
// weddingData.hi.js  —  Hindi language data
// ─────────────────────────────────────────────────────────────────────────────

export const coupleNames = {
  groom:       "ऋतिक",
  bride:       "चंदा",
  groomFamily: "गुप्ता परिवार",
  brideFamily: "गुप्ता परिवार",
};

export const weddingDate = "2026-06-24T00:00:00+05:30";

// ─── Invitation ───────────────────────────────────────────────────────────────

export const invitationData = {
  meta: { code: "HI", label: "हिन्दी" },

  invocation:   "॥ श्री गणेशाय नमः ॥",
  subtitle:     "श्री शिव-पार्वती की असीम कृपा से",
  sectionLabel: "आपको सादर आमंत्रित किया जाता है",
  heading:      "शुभ विवाह निमंत्रण",
  salutation:   "दोनों परिवारों की ओर से हर्षपूर्वक सूचित किया जाता है इस मंगल विवाह का",

  groom: {
    honorific:       "चिरंजीवी",
    firstName:       "ऋतिक कुमार",
    fullName:        "ऋतिक कुमार",
    fatherHonorific: "श्री",
    fatherName:      "अशोक जी. गुप्ता",
    motherHonorific: "श्रीमती",
    motherName:      "कुमारी स्मिता गुप्ता",
    familyName:      "गुप्ता परिवार",
    village:         "जयनगर, मधुबनी, बिहार",
    lineageNote:     "",
  },

  bride: {
    honorific:       "आयुष्मती",
    firstName:       "चंदा श्रृष्टा",
    fullName:        "चंदा श्रृष्टा",
    fatherHonorific: "श्री",
    fatherName:      "गिरीश कुमार गुप्ता",
    motherHonorific: "श्रीमती",
    motherName:      "भारती देवी",
    familyName:      "गुप्ता परिवार",
    village:         "बिरपुर, सुपौल, बिहार",
    lineageNote:     "",
  },

  body: [
    "आपकी उपस्थिति, आशीर्वाद और स्नेह इस पवित्र अवसर को सदा स्मरणीय बना देगा। आपका हार्दिक स्वागत एवं अभिनंदन है।",
    "इस तीन दिवसीय उत्सव में — मटकोर एवं हल्दी से लेकर बारात व सात फेरों तक पधारकर नवदम्पती को आशीर्वाद प्रदान करें।",
  ],

  auspiciousNote: "विवाह पंचमी मुहूर्त — २२ से २४ जून २०२६",

  dateBlock: {
    label:    "विवाह तिथि",
    dates:    "२२ – २४ जून २०२६",
    venue:    "मारवाड़ी विवाह भवन",
    location: "जयनगर, मधुबनी, बिहार",
  },

  footer: {
    // groomSide:      "गुप्ता परिवार (वर पक्ष)",
    // brideSide:      "गुप्ता परिवार (वधू पक्ष)",
    nimantrak:      "निमंत्रक",
    nimantrakNames: "गुप्ता परिवार",
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
    title:       "मटकोर और हल्दी",
    date:        "२२ जून",
    time:        "शाम ०५:०० बजे से",
    audioLabel:  "लोक ढोल बीट्स",
    description: "शुभ मटकोर विधि — जिसमें पवित्र मिट्टी एकत्र की जाती है — उसके बाद आनंदमय हल्दी समारोह होता है, जहाँ युगल पर हल्दी और आशीर्वाद की वर्षा होती है। सांध्यकालीन शोभायात्रा दोनों परिवारों को गीत और उल्लास में एक साथ लाती है।",
    dateTag:     "२२–२४ जून २०२६",
    locationTag: "जयनगर, मधुबनी, बिहार",
  },
  {
    title:       "संगीत और मेहंदी",
    date:        "२३ जून",
    time:        "शाम ०७:०० बजे से",
    audioLabel:  "संगीत की स्वरलहरियाँ",
    description: "संगीत, नृत्य और कला से सजी एक शाम। दुल्हन के हाथों पर मेहंदी प्रेम की कहानियाँ रचती है, जबकि रात शास्त्रीय धुनों और उत्सवी गीतों से गूँजती है — जो दोनों परिवारों को एक सूत्र में बाँधते हैं।",
    dateTag:     "२२–२४ जून २०२६",
    locationTag: "मारवाड़ी विवाह भवन, जयनगर, मधुबनी, बिहार",
  },
  {
    title:       "बारात और सात फेरे",
    date:        "२४ जून",
    time:        "प्रातः ०८:०० बजे",
    audioLabel:  "बारात ढोल",
    description: "दूल्हे की भव्य बारात — संगीत, नृत्य और उल्लास का एक अद्भुत दृश्य — विवाह की शुरुआत का उद्घोष करती है। ढोल की गूँज में परिवारजन और मित्र एक नए अध्याय का स्वागत करते हैं। सात पवित्र वचन, अग्नि की सात परिक्रमाएँ। इस परम पावन क्षण में दो आत्माएँ एक हो जाती हैं — पवित्र अग्नि की साक्षी में, ब्रह्माण्ड के आशीर्वाद से, सनातन के लिए बँधी हुई।",
    dateTag:     "२२–२४ जून २०२६",
    locationTag: "मारवाड़ी विवाह भवन, जयनगर, मधुबनी, बिहार",
  },
  // {
  //   title:       "",
  //   date:        "२४ फ़रवरी",
  //   time:        "दोपहर १२:०० बजे",
  //   audioLabel:  "वैदिक मंत्र",
  //   description: "सात पवित्र वचन, अग्नि की सात परिक्रमाएँ। इस परम पावन क्षण में दो आत्माएँ एक हो जाती हैं — पवित्र अग्नि की साक्षी में, ब्रह्माण्ड के आशीर्वाद से, सनातन के लिए बँधी हुई।",
  //   dateTag:     "२२–२४ फ़रवरी २०२६",
  //   locationTag: "जयनगर, मधुबनी, बिहार",
  // },
  {
    title:       "रिसेप्शन",
    date:        "२४ जून",
    time:        "शाम ७:०० बजे",
    audioLabel:  "शहनाई",
    description: "श्री व श्रीमती गुप्ता द्वारा अपने अतिथियों के स्वागत में एक भव्य उत्सव। नवदम्पती की खुशी में शामिल हों — एक शाम जो शान, प्रेम और उत्साह से भरी है।",
    dateTag:     "२२–२४ जून २०२६",
    locationTag: "मारवाड़ी विवाह भवन, जयनगर, मधुबनी, बिहार",
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
    date: "सोमवार, २२ जून",
    items: [
      { time: "प्रातः",           event: "मटकोर विधि",  note: "पवित्र मिट्टी की रस्म" },
      { time: "शाम ०५:०० बजे से", event: "हल्दी विधि",  note: "शोभायात्रा सहित" },
    ],
  },
  {
    date: "मंगलवार, २३ जून",
    items: [
      { time: "शाम ०७:०० बजे", event: "संगीत रात्रि", note: "संगीत एवं नृत्य उत्सव" },
      { time: "रात ०८:०० बजे", event: "मेहंदी",        note: "मेहंदी एवं हर्षोल्लास" },
    ],
  },
  {
    date: "बुधवार, २४ जून",
    items: [
      { time: "प्रातः ०८:०० बजे", event: "बारात स्वागत",        note: "दूल्हे का भव्य आगमन" },
      { time: "प्रातः १०:०० बजे", event: "वरमाला और सात फेरे",  note: "विवाह संस्कार" },
      { time: "शाम ०७:०० बजे",   event: "रिसेप्शन",             note: "रात्रिभोज एवं उत्सव" },
    ],
  },
];

// ─── Section Labels ───────────────────────────────────────────────────────────

export const sectionLabels = {
  events: {
    label:    "उत्सव की प्रतीक्षा है",
    title:    "विवाह के आयोजन",
    subtitle: "प्रत्येक आयोजन पर टैप करें और उसकी कहानी में डूब जाएँ",
  },
  schedule: {
    label: "एक नज़र में",
    title: "पूर्ण कार्यक्रम",
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
  name:        "मारवाड़ी विवाह भवन",
  address:     "NH-105, सर्वदेवमयी माता मंदिर के सामने, जयनगर, मधुबनी, बिहार — 847226",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.897085180806!2d86.13998295298046!3d26.58767756866333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec25a427843dcb%3A0xb4d7e4dd90118335!2sSarwdevmayi%20Mata%20Temple!5e0!3m2!1sen!2sin!4v1778737566525!5m2!1sen!2sin",
  mapUrl:      "https://maps.app.goo.gl/ppWDCLgkjg47fN719",
  // phone:       "+91 98765 43210",
  // email:       "wedding@arjunpriya2025.com",
};

// ─── Contact Section Labels ───────────────────────────────────────────────────

export const contactLabels = {
  sectionLabel:     "आपसे मिलना हमारी खुशी है",
  title:            "संपर्क करें",
  body:             "आपकी उपस्थिति हमारे लिए अनमोल है। हम इस विशेष दिन को आपके साथ मनाकर अत्यंत प्रसन्न होंगे।",
  namePlaceholder:  "अपना पूरा नाम लिखें",
  nameLabel:        "आपका नाम",
  attendingLabel:   "क्या आप आएंगे?",
  messageLabel:       "संदेश / आशीर्वाद",
  messagePlaceholder: "नवदम्पती के लिए अपनी शुभकामनाएँ लिखें…",
  submitLabel:        "उपस्थिति भेजें",
  sendingLabel:       "भेजा जा रहा है…",
  successMessage:     "✨ धन्यवाद! हम आपके साथ यह उत्सव मनाने की प्रतीक्षा करते हैं।",
};

// ─── Footer Nav ───────────────────────────────────────────────────────────────

export const footerNav = [
  { label: "आयोजन",    href: "#events" },
  { label: "कार्यक्रम", href: "#schedule" },
  { label: "गैलरी",    href: "#photos" },
  { label: "स्थान",    href: "#venue" },
  { label: "RSVP",     href: "#contact" },
];

export const footerCredit = "एक अमर दिन के लिए ❤️ से बनाया गया";

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "आयोजन",    href: "#events" },
  { label: "कार्यक्रम", href: "#schedule" },
  { label: "गैलरी",    href: "#photos" },
  { label: "स्थान",    href: "#venue" },
];

export const navRsvpLabel = "RSVP";

// ─── Venue Section Labels ─────────────────────────────────────────────────────

export const venueLabels = {
  sectionLabel:  "उत्सव का स्थान",
  title:         "विवाह स्थल",
  contactTitle:  "संपर्क",
  directionsBtn: "रास्ता देखें",
};

// ─── Hero Section Labels ──────────────────────────────────────────────────────

export const heroLabels = {
  invocation:    "✦ ईश्वर के आशीर्वाद से ✦",
  tagline:       "आपको इस मंगल मिलन में सादर आमंत्रित करते हैं",
  dateText:      "२२ – २४\u00A0जून\u00A0२०२६",
  locationText:  "जयनगर, मधुबनी, बिहार",
  ctaLabel:      "उत्सव देखें",
  countdownUnits: ["दिन", "घंटे", "मिनट", "सेकंड"],
  bentoTags:     ["२२–२४ जून २०२६", "जयनगर, मधुबनी"],
};

// ─── Scroll Reveal Text ───────────────────────────────────────────────────────

// export const scrollRevealText =
//   "मिथिला की प्राचीन परंपराओं और प्रेम के बंधन में बँधी दो आत्माएँ — " +
//   "मटकोर, हल्दी, संगीत और सात फेरों के साथ तीन पवित्र दिनों का उत्सव — " +
//   "परिवार, रंग, संगीत और एक नई शुरुआत के शाश्वत वादे से बुना हुआ।";

export const scrollRevealEyebrow = "प्रेम का उत्सव";

// ─── Photos Section Labels ────────────────────────────────────────────────────

export const photosLabels = {
  sectionLabel: "पल और यादें",
  title:        "फ़ोटो गैलरी",
  subtitle:     "समारोह की झलकियाँ देखने के लिए स्क्रॉल करें",
};