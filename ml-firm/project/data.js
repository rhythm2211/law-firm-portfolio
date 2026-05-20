// Meridian Law Partners — content data

const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const px = (id) =>
  `https://videos.pexels.com/video-files/${id}/${id}-sd_640_360_24fps.mp4`;

// --- Law imagery (verified Unsplash IDs from existing project) ---
// Verified-working Unsplash law / portrait IDs (consolidated)
const FALLBACK = u("1589829545856-d10d557cf95f", 1400);
window.LAW_IMG = {
  // Verified law / context
  justiceStatue: u("1589829545856-d10d557cf95f", 1400),
  signingDocs: u("1450101499163-c8848c66ca85", 1400),
  gavelDesk: u("1521791136064-7986c2920216", 1400),
  lawBooks: u("1454165804606-c3d57bc86b40", 1400),
  gavelCloseup: u("1472162072942-cd5147eb3902", 1400),
  legalDesk: u("1454165804606-c3d57bc86b40", 1400),
  cityNight: u("1486325212027-8081e485255e", 1600),
  // Aliases — point at verified IDs (cropped variants)
  courthouse: u("1589829545856-d10d557cf95f", 1600),
  courthouseColumns: u("1454165804606-c3d57bc86b40", 1400),
  judgeGavel: u("1472162072942-cd5147eb3902", 1400),
  scales: u("1589829545856-d10d557cf95f", 1400),
  contractHandshake: u("1450101499163-c8848c66ca85", 1400),
  lawLibrary: u("1454165804606-c3d57bc86b40", 1400),
  courtBuilding: u("1486325212027-8081e485255e", 1600),
  lawBooksStack: u("1454165804606-c3d57bc86b40", 1400),
  contractSigning: u("1450101499163-c8848c66ca85", 1400),
  // Portraits — verified
  partnerWoman: u("1573496359142-b8d87734a5a2", 800),
  partnerMan: u("1560250097-0b93528c311a", 800),
  counselWoman: u("1580489944761-15a19d654956", 800),
  counselMan: u("1472099645785-5658abf4ff4e", 800),
  associateWoman: u("1494790108377-be9c29b29330", 800),
  associateMan: u("1519085360753-af0119f7cbe7", 800),
};
window.LAW_FALLBACK = FALLBACK;

window.LAW_VID = {
  gavelHands: px(3195396),
  meeting: px(6774843),
  signing: px(7653306),
  reading: px(5473987),
  // additional law/business b-roll
  cityWalk: px(3209828),
  boardroom: px(7578539),
};

// --- Practice areas (richer copy) ---
window.PRACTICE_AREAS = [
  {
    code: "01",
    title: "Commercial Litigation",
    short: "High-stakes disputes resolved with surgical precision.",
    long:
      "From boardroom to courtroom — we represent FTSE 100 clients and institutional investors in contractual disputes, shareholder actions, class actions, and emergency injunctive relief. Trial-ready from day one.",
    tags: ["Class Actions", "Injunctions", "Appellate"],
    metric: "£1.2B+ in disputed value resolved",
  },
  {
    code: "02",
    title: "Corporate & M&A",
    short: "Deals that close cleanly, integrate quickly.",
    long:
      "Cross-border acquisitions, private equity transactions, joint ventures, and corporate governance. We move at the pace of the market, with execution discipline that survives diligence and post-completion review.",
    tags: ["Buy-side", "PE & VC", "Governance"],
    metric: "320+ transactions advised",
  },
  {
    code: "03",
    title: "Intellectual Property",
    short: "Protect the ideas that define your business.",
    long:
      "Patent prosecution and litigation, trademark portfolios, trade secrets, and licensing strategy for technology, pharma, and life-sciences clients. Coordinated UK, EU, and US enforcement.",
    tags: ["Patent Lit.", "Trade Secrets", "Licensing"],
    metric: "94% injunction-grant rate",
  },
  {
    code: "04",
    title: "Employment & Executive",
    short: "Sensitive matters handled with discretion.",
    long:
      "Executive compensation, restrictive covenants, whistleblower defence, and tribunal representation — for both employers and individual executives. Confidentiality is not optional.",
    tags: ["Tribunal", "Restrictive Covenants", "Investigations"],
    metric: "200+ executives represented",
  },
  {
    code: "05",
    title: "Private Wealth & Trusts",
    short: "Multi-jurisdictional structures, generational outcomes.",
    long:
      "Estate planning, family offices, philanthropic vehicles, and international succession for ultra-high-net-worth families. UK, Channel Islands, Switzerland, Singapore.",
    tags: ["Trusts", "Family Office", "Philanthropy"],
    metric: "£14B in assets under structure",
  },
  {
    code: "06",
    title: "Real Estate & Infrastructure",
    short: "Land, capital, and the projects that move cities.",
    long:
      "Commercial acquisitions and disposals, joint development agreements, planning and environmental, social-infrastructure investments. We sit on the side of long-term capital.",
    tags: ["Development", "JV", "Planning"],
    metric: "62 city-scale projects",
  },
];

// --- Case studies (more detailed) ---
window.CASES = [
  {
    id: "hartwell",
    headline: "Hartwell v. Nexus Corporation",
    category: "Securities Litigation",
    year: "2025",
    duration: "29 months",
    client: "Coalition of pension funds (confidential)",
    summary:
      "Lead counsel for a coalition of institutional shareholders in a securities-fraud class action arising from misleading earnings disclosures. Coordinated discovery across three jurisdictions, deposed the issuer's CFO and external auditors, and engaged forensic economists on market impact.",
    outcome:
      "£42M settlement — the largest of its kind in the sector that year — plus court-ordered governance reforms.",
    stat: { value: "£42M", label: "Settlement secured" },
    video: window.LAW_VID.gavelHands,
    poster: window.LAW_IMG.judgeGavel,
    aspect: "landscape",
  },
  {
    id: "sterling",
    headline: "Sterling Family Office Restructuring",
    category: "Private Wealth",
    year: "2024",
    duration: "14 months",
    client: "Multi-generational European family",
    summary:
      "Advised on restructuring of trusts, holding companies, and operating subsidiaries across the UK, Switzerland, and Singapore to protect £180M of assets ahead of impending regulatory change and a third-generation succession.",
    outcome:
      "Zero adverse tax rulings; full compliance across three jurisdictions; succession executed on schedule.",
    stat: { value: "£180M", label: "Assets restructured" },
    video: window.LAW_VID.signing,
    poster: window.LAW_IMG.signingDocs,
    aspect: "square",
  },
  {
    id: "atlas",
    headline: "Atlas Pharma v. BioGen",
    category: "Intellectual Property",
    year: "2024",
    duration: "21 months",
    client: "Atlas Pharmaceuticals Ltd",
    summary:
      "Defended patent validity and pursued infringement counterclaims in the biologics space, coordinating with US co-counsel and FDA correspondence. Two-week trial featured competing technical experts on antibody-engineering claims.",
    outcome:
      "Permanent injunction preventing launch of competing product; damages phase resolved on favourable terms.",
    stat: { value: "100%", label: "Claims upheld" },
    video: window.LAW_VID.reading,
    poster: window.LAW_IMG.lawBooks,
    aspect: "landscape",
  },
  {
    id: "northgate",
    headline: "Northgate Logistics Acquisition",
    category: "Corporate M&A",
    year: "2025",
    duration: "9 months",
    client: "Northgate Holdings PLC",
    summary:
      "Lead counsel on a £320M acquisition of a European logistics network — diligence across 14 entities, regulatory approvals in five jurisdictions, integration of 1,200 employees, and a £140M acquisition-financing facility.",
    outcome:
      "Closed on schedule; post-completion integration with no material employment claims.",
    stat: { value: "£320M", label: "Transaction value" },
    video: window.LAW_VID.meeting,
    poster: window.LAW_IMG.contractHandshake,
    aspect: "square",
  },
];

// --- Lawyers ---
window.LAWYERS = [
  {
    id: 1,
    name: "Eleanor Whitmore",
    rank: "KC",
    title: "Senior Partner, Litigation",
    practice: "Commercial Litigation",
    bio: "Eleanor leads high-stakes disputes for FTSE 100 clients and has been ranked Band 1 by Chambers UK for the last seven consecutive years. Notable for landmark securities and shareholder actions.",
    education: "Oxford (MA), Harvard Law School (LL.M.)",
    bar: "England & Wales · New York",
    image: window.LAW_IMG.partnerWoman,
  },
  {
    id: 2,
    name: "James Okonkwo",
    rank: "",
    title: "Partner, Corporate",
    practice: "Corporate & M&A",
    bio: "James advises private equity sponsors and listed corporates on European take-privates, cross-border carve-outs, and complex governance matters. Featured in Legal 500 'Next Generation Partners'.",
    education: "LSE (LL.B.), Columbia Law School (LL.M.)",
    bar: "England & Wales",
    image: window.LAW_IMG.partnerMan,
  },
  {
    id: 3,
    name: "Sarah Chen",
    rank: "",
    title: "Partner, IP",
    practice: "Intellectual Property",
    bio: "Sarah protects innovation for technology and life-sciences clients — from patent prosecution to complex multi-jurisdictional litigation. Former clerk to the Hon. Patricia Millett, D.C. Circuit.",
    education: "Cambridge (BA), Stanford Law School (J.D.)",
    bar: "England & Wales · California",
    image: window.LAW_IMG.counselWoman,
  },
  {
    id: 4,
    name: "Michael Torres",
    rank: "",
    title: "Counsel, Employment",
    practice: "Employment Law",
    bio: "Michael represents executives and FTSE-listed employers in sensitive workplace matters, restrictive covenants, and tribunal proceedings. Frequently quoted in the Financial Times and Lawyer.",
    education: "King's College London (LL.B.)",
    bar: "England & Wales",
    image: window.LAW_IMG.counselMan,
  },
  {
    id: 5,
    name: "Amara Osei",
    rank: "",
    title: "Counsel, Private Wealth",
    practice: "Family & Private Wealth",
    bio: "Amara structures estates and trusts for ultra-high-net-worth families with cross-border footprints. Recognised by Citywealth as a Top 100 Private Client Lawyer.",
    education: "UCL (LL.B.), BPP (LPC)",
    bar: "England & Wales · Jersey",
    image: window.LAW_IMG.associateWoman,
  },
  {
    id: 6,
    name: "David Harrington",
    rank: "",
    title: "Associate, Real Estate",
    practice: "Real Estate",
    bio: "David handles commercial acquisitions, development projects, and landlord–tenant disputes across the UK and Europe. Acts on social-infrastructure investments in joint ventures with sovereign capital.",
    education: "Durham (LL.B.), College of Law (LPC)",
    bar: "England & Wales",
    image: window.LAW_IMG.associateMan,
  },
];

// --- Insights ---
window.INSIGHTS = [
  {
    tag: "Briefing",
    date: "May 2026",
    title:
      "The new UK shareholder activism playbook: what boards need to know in 2026.",
    minutes: "8 min read",
    image: window.LAW_IMG.lawLibrary,
  },
  {
    tag: "Commentary",
    date: "Apr 2026",
    title:
      "Cross-border data transfers after the UK–US Bridge: a practical compliance map.",
    minutes: "12 min read",
    image: window.LAW_IMG.legalDesk,
  },
  {
    tag: "Case Note",
    date: "Mar 2026",
    title:
      "Patel v. Crown Estate: appellate clarity on fiduciary duties in real-estate JVs.",
    minutes: "6 min read",
    image: window.LAW_IMG.courthouseColumns,
  },
  {
    tag: "Briefing",
    date: "Feb 2026",
    title:
      "AI-generated work product in litigation: privilege, discovery, and the new evidentiary frontier.",
    minutes: "10 min read",
    image: window.LAW_IMG.lawBooksStack,
  },
];

// --- Testimonials ---
window.TESTIMONIALS = [
  {
    quote:
      "Meridian's litigation team is the one we call when the matter cannot be lost. Their preparation, their courtroom presence, and their judgement on settlement timing have been consistently extraordinary.",
    name: "General Counsel",
    org: "FTSE 100 financial institution",
  },
  {
    quote:
      "We have used Meridian on every transaction over £100M in the last six years. They are commercial, they are fast, and they tell you the truth — even when the answer is one you would rather not hear.",
    name: "Managing Director",
    org: "European private equity sponsor",
  },
  {
    quote:
      "What sets Meridian apart is the calibre of partner attention. We are never the second-largest matter on anyone's desk.",
    name: "Chief Executive",
    org: "Mid-cap pharmaceutical group",
  },
];

// --- Recognition badges ---
window.RECOGNITION = [
  "Chambers UK · Band 1",
  "Legal 500 · Tier 1",
  "Lexology · Client Choice 2025",
  "Financial Times · Innovative Lawyers",
  "The Lawyer · Boutique Firm of the Year",
  "Citywealth · Top 100",
  "GlobalData · Premier League",
  "Who's Who Legal · 2026",
];

// --- Stats ---
window.STATS = [
  { value: "1987", label: "Founded" },
  { value: "62", label: "Lawyers across 3 offices" },
  { value: "£14B", label: "Aggregate matter value, 2025" },
  { value: "94%", label: "Repeat-client engagement" },
];

window.OFFICES = [
  { city: "London", address: "12 Bedford Square · Bloomsbury · WC1B 3RA", tz: "GMT" },
  { city: "New York", address: "200 Park Avenue · 30th Floor · NY 10166", tz: "EST" },
  { city: "Singapore", address: "8 Marina Boulevard · #28-01 · S 018981", tz: "SGT" },
];
