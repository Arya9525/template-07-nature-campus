# St. Anthony's Website Migration — Project Audit

**Template (DESIGN):** Nature Campus
**Source of Truth (CONTENT):** St. Anthony's Junior College, Agra — https://www.stanthonysjrcollege.org/
**Audit phase:** Phase 1 — Inspection only. No project files were modified. Only this file (`PROJECT_AUDIT.md`) was created.

> This document separates **SOURCE WEBSITE CONTENT** (real school info gathered from stanthonysjrcollege.org) from **TEMPLATE DESIGN** (the Nature Campus demo shell). Where the source website does not provide a piece of information, it is explicitly marked **"NOT FOUND ON SOURCE WEBSITE"**. No information is invented.

---

## 1. Project Structure

```
template-07-nature-campus/
├── package-lock.json          (empty lock file, name "template-07-nature-campus", no dependencies)
├── PROJECT_AUDIT.md            (this file — the only file created in Phase 1)
├── index.html                  (homepage / landing)
├── about.html                  (Our School / History / Vision / Aims)
├── patron-saint.html           (Patron saint — template used St. Francis Xavier)
├── principal-message.html      (Principal's message — template used "Dr. Anita Sharma")
├── headmistress-message.html   (Headmistress message — template used "Mrs. Catherine D'Souza")
├── management.html             (Management / Office Bearers — template used fake Board)
├── academics.html              (Curriculum)
├── admissions.html             (Admissions / Fee Structure)
├── facilities.html             (Facilities / Infrastructure)
├── achievements.html           (Achievements / Toppers / Timeline)
├── events.html                 (Events Calendar)
├── gallery.html                (Filterable Photo Gallery)
├── notices.html                (Notice Board)
├── contact.html                (Contact / Map / Form)
├── virtual-tour.html           (Interactive SVG Campus Map)
└── assets/
    ├── css/
    │   └── style.css            (66,828 bytes — all custom template styles)
    └── js/
        └── main.js              (15,414 bytes — all template JavaScript)
```

**Important findings:**
- The template is a **plain static HTML/CSS/JS** site. **No build tooling**, no framework.
- `package-lock.json` exists but contains **no packages** (`"packages": {}`) — it does not install or build anything. There is **no `package.json`**.
- **No image, font, icon, or media assets are stored locally.** All images are remote `picsum.photos` placeholders. Fonts (`Fraunces`, `Nunito`) and icons (Font Awesome) are served from CDNs.
- The single `style.css` contains the entire design system. The single `main.js` contains all behaviour.
- **Every HTML page duplicates its own full header, navigation drawer, notice ticker, footer, floating-widget stack, and AI-chat panel.** This is a "copy-paste header/footer" architecture with no shared includes/partials. Any branding change must be replicated across all 15 HTML files.

---

## 2. HTML Pages

Each page shares the same shell structure and differs only in `<head>` metadata, the active nav chip, and the `<main>` content.

| File | Template purpose | Unique template <main> content |
|------|------------------|--------------------------------|
| `index.html` | Home (full landing: hero, highlights, leadership letters, about, vision/mission, why-us mandala, infrastructure, academic excellence charts, facilities, achievements timeline, notices, events+countdown, gallery preview, testimonials, admission CTA, app CTA) | Largest page (927 lines). Demo metrics, fake leaders, fake testimonials. |
| `about.html` | Our Story + History + Leadership + Ethos + Stats band | 8-stat band, 3 fake leaders. |
| `patron-saint.html` | Patron saint biography (template = **St. Francis Xavier**, 1506–1552) | Used as the template's "patron" page. |
| `principal-message.html` | Principal's letter (template = **Dr. Anita Sharma**), "Our Promise" cards, CTA | Fake principal. |
| `headmistress-message.html` | Headmistress letter (template = **Mrs. Catherine D'Souza**, Primary Wing), "Primary Promise" cards, CTA | Fake headmistress. |
| `management.html` | Office Bearers (template = 8 fake office bearers + "Xaverian Educational Trust") | Fake Board. |
| `academics.html` | Curriculum (Pre-primary → Senior Secondary), streams, assessment | Demo stream content. |
| `admissions.html` | 5-step admission journey, fee table (Rs.), required documents, CTA | Demo fees & process. |
| `facilities.html` | 12 facilities + 6 signature spaces + stats band | Demo facilities. |
| `achievements.html` | Achievements section | Demo achievements. |
| `events.html` | 8-item seasonal event calendar + countdown flower widget | Demo events. |
| `gallery.html` | Filterable gallery (12 images, demo 7 categories) | Demo gallery. |
| `notices.html` | Corkboard with 8 pin-cards | Demo notices. |
| `contact.html` | Contact cards, contact form, embedded Google Map | Demo address/phones/email/form topics. |
| `virtual-tour.html` | Interactive SVG campus map with 8 hotspots + popup | Demo map/hotspots. |

---

## 3. CSS Architecture

- **Single file:** `assets/css/style.css` (1,311 lines).
- **Design system:** CSS custom properties (`:root`) define a full green/nature "forest & leaf" theme, including a complete **dark mode** theme via `[data-theme="dark"]`.
- **Fonts:** `Fraunces` (display serif) + `Nunito` (body) via Google Fonts CDN.
- **Icons:** Font Awesome 6.5.2 (CDN). Bootstrap 5.3.3 (CDN, CSS + JS). Tailwind is loaded via CDN script tag but is **not meaningfully used** in the markup.
- **Signature design elements** (reusable, design-only):
  - `.leaf` inline SVG leaf icon used throughout
  - `.sec-eyebrow`, `.sec-title`, `.sec-sub` section headings
  - `.btn-leaf`, `.btn-leaf-outline`, `.btn-sand` buttons
  - `.wave-div`, `.divider-roll` SVG wave dividers
  - `.blob-img`, `.float-badge` blob-shaped images with floating stat badges
  - `.n-header`, `.n-nav`, `.n-chips`, `.n-chip` — floating pill navigation bar
  - `.n-drawer` — mobile slide-in drawer menu
  - `.leaf-card`, `.plant-card`, `.infra-card`, `.sapling-card`, `.season-card`, `.pin-card`, `.quote-card`, `.g-frame`, `.stat-band`, `.tree-timeline`, `.mandala`, `.corkboard`, `.wall`, `.grove`, `.forest-grid`, `.infra-grid`, `.app-bench`, `.meadow-cta`, `.grow`
  - `.hero`, `.hero-sun`, `.hero-cloud`, `.hero-leaf`, `.hero-hill` (parallax), `.hero-wave`
  - `.count-flower-card`, `.count-ring-circle` — countdown flower/ring SVG
  - `.w-stack`, `.w-fab`, `.w-chat-panel`, `.w-toast` — floating widgets
  - `.f-grid`, `.f-col`, `.f-social`, `.f-portal`, `.news-form`, `.f-bottom` — footer
- **Reusable pattern:** the whole UI is a set of reusable component classes. Content is injected into these components on each page.
- **Risk:** the design is deeply nature/green themed. St. Anthony's will inherit this exact palette (that is intended — "keep the template's visual quality/structure").

---

## 4. JavaScript Architecture

- **Single file:** `assets/js/main.js` (439 lines), an IIFE with a `DOMContentLoaded` bootstrap.
- **Features (all driven by CSS class hooks — mostly content-agnostic, so they survive content changes):**
  1. `initTheme()` — dark/light toggle, persisted to `localStorage` (key **`sxa-theme`** — the "sxa" prefix is template branding).
  2. `initNav()` — sticky header `scrolled` state + mobile drawer open/close + Escape key.
  3. `initReveal()` — IntersectionObserver scroll-reveal (`.rv`), respects `prefers-reduced-motion`.
  4. `initCounters()` — animated number counters on `.metric b[data-count]`.
  5. `initParallax()` — hero hill parallax via `[data-speed]`.
  6. `initSeedDraw()` — SVG seed/path draw-on-scroll animation.
  7. `initBarHills()` — animated bar-chart "hills" (`--h` custom property heights).
  8. `initChat()` — **AI chatbot** ("SXA Garden Guide") with hardcoded Q&A (template content). Fallback reply contains fake phone `+91 80 4123 4567`.
  9. `initBackTop()` — floating back-to-top button.
  10. `initCountdown()` — **hardcoded target date `new Date(2026, 8, 28…)` = Sep 28, 2026** "Founder's Day" (template event).
  11. `initSubscribe()` — newsletter/subscribe toast (no backend; purely cosmetic).
  12. `initCampusMap()` — virtual-tour hotspot → popup image/text swap.
  13. `initGalleryFilter()` — gallery filter chips (`data-cat`).
  14. `initFooterYear()` — dynamic `©` year.
  15. `initTestimonialAuto()` — auto-rotating testimonial (`quote-card-auto`) — **no page currently uses `quote-card-auto`**, so this is effectively unused.
- **Template-specific strings inside JS that must change in Phase 2:** chatbot name, greeting, the 4 Q&A pairs, fallback phone, hardcoded countdown date (`Sep 28 2026`).
- **Bootstrap JS** (CDN) is also loaded on every page.

---

## 5. Header and Navigation

**Desktop header (`.n-header` / `.n-nav`):**
- Sticky floating pill bar with backdrop blur.
- Brand block: inline SVG leaf logo + **"St. Xavier's Academy"** + tagline **"Grow Green · Est. 1972"**.
- 15 inline nav chips (one page each): Home, About, Patron Saint, Principal, Headmistress, Management, Academics, Admissions, Facilities, Achievements, Notices, Events, Gallery, Virtual Tour, Contact.
- Actions: theme toggle, "Apply" button (→ admissions.html), burger (mobile).
- The chip `<nav>` is `overflow-x:auto` with hidden scrollbar — it can wrap/scroll on narrow laptop widths.

**Mobile drawer (`.n-drawer`):**
- Slide-in full-screen menu, duplicate of the same 15 links, plus two CTAs: "Online Admission" and "Online Fee Payment" (both currently → `admissions.html`).
- Brand block repeats inside drawer. Active page not specially highlighted in drawer (only in desktop chips via `.active`).

**CMS/source-notes:** the live school site has far more menu breadth (About Us with 12 sub-pages, Messages, Rules with 9 sub-pages, Gallery with 6 sub-pages, Achievements with 3, Office Bearers with 4). The template's flat 15-item nav is the design we keep; Phase 2 may consolidate source content into these sections.

---

## 6. Footer

- `.n-footer` with `.f-wave-top` SVG divider.
- **Column 1:** brand + tagline **"Empowering Minds, Inspiring Futures"**, catch-phrase, 5 social icons (all `href="#"` — Facebook, Instagram, YouTube, X, LinkedIn).
- **Column 2 ("Explore"):** About Us, Academics, Admissions, Facilities, Achievements, Gallery, Virtual Tour.
- **Column 3 ("Portals"):** Student / Parent / Teacher links (all `href="#"`), "Online Fee Payment" button, "Online Admission" button.
- **Column 4 ("Contact"):** fake address/phone/mobile/email/hours + Newsletter form.
- `f-bottom`: "Grow Green · Est. 1972", `© {year}` **St. Xavier's Academy, Greenfield City. All rights reserved.**
- `.f-apps`: Google Play / App Store app badges (all `href="#"`).
- **All social, portal, app, and fee-payment links are `#` placeholders** and need real URLs in Phase 2.

---

## 7. Responsive Behavior

Breakpoints in `style.css` (lines 1227–1311):

| Width | Behaviour |
|-------|-----------|
| `≤1199px` | Grids collapse to 2 columns; footer to 2 columns; steps to 3; mandala re-positions. |
| `≤991.98px` | **Burger appears, desktop chips hidden** (`display:none`); single-column layouts; hero padding changes; tree-timeline becomes single rail; gallery wall to 2 cols; hero-metrics to 2 cols. |
| `≤767.98px` | Grids to 1 column; footer to 1 col; mandala to 100%; float-badges hidden; hero-title clamps; notice label hidden; map-pop stacks vertically. |
| `≤575.48px` | Small-phone tweaks: brand name shrinks, "Apply" text hidden, chat panel = viewport width, floating stack tightened. |
| `prefers-reduced-motion` | Disables animations/transitions globally. |

**Responsive strengths:** full mobile menu (drawer), single-column collapses, fluid `clamp()` typography, viewport meta present.
**Known responsive considerations (fix later, not now):** 15 nav chips on desktop may overflow on laptops (mitigated by internal scroll); the hero metrics and mandala are complex on small screens; floating widgets could overlap bottom content on short mobile screens.

---

## 8. Template/Demo Content Inventory

The Nature Campus template was populated with a fictional school named **"St. Xavier's Academy (SXA)"**. **ALL** of the following is demo content that must be replaced with real St. Anthony's content. *(Inventory only — nothing removed yet.)*

### 8.1 Branding & identity
- **School name:** "St. Xavier's Academy" / "SXA" (all pages, header, footer, every section heading, alt texts, aria labels).
- **Trust:** "Xaverian Educational Trust".
- **Motto:** "Lux et Veritas" ("Light and Truth").
- **Taglines:** "Grow Green · Est. 1972", "Empowering Minds, Inspiring Futures".
- **Founded year:** 1972; "54-year legacy".
- **City:** "Greenfield City"; CBSE-affiliated, "40-acre green campus".
- **Affiliation no.:** "830021 — CBSE, New Delhi".
- **Administration:** Template roles: Chairman Managing Committee, Principal & Academic Head, Headmistress Primary Wing, Vice Chairman, Secretary, Treasurer, Academic Director, Vice Principal, "Six Trustees".

### 8.2 Fake people
- **Dr. Anita Sharma** (Principal & Academic Head).
- **Mrs. Catherine D'Souza** (Headmistress, Primary Wing).
- **Mr. Rajan Menon** (Chairman).
- **Mrs. Lakshmi Iyer** (Vice Chairman).
- **Mr. Thomas Mathew** (Secretary).
- **Mrs. Preeti Rao** (Treasurer).
- **Dr. Nandini Kulkarni** (Academic Director).
- **Mr. Arvind Kumar** (Vice Principal).
- **Testimonials:** Mrs. Shalini Iyer (parent), Arjun Nair (alumnus/IIT), Aisha Khan (Class X), Mr. David Fernandes (parent).

### 8.3 Fake statistics / metrics (must replace with real or mark NOT FOUND)
- Trees Planted **5,000** / **5,000+**, Solar Powered **60%**, Waste Recycled **85%**, Rainwater Harvested **2.4 M L** (hero metrics).
- **54** Years | **3,200+** Students | **180+** Faculty | **12** State Sports Medals | **40** Acre Campus | **92%** Avg Board Result | **300+** Olympiad Awards (about stats band).
- **92%** average board result; **300+** olympiad awards; **45+** NTSE selections; board percentages 88/90/92/95/93/91 (bar hills).
- **40 acres**, **80 smart classrooms**, **25,000+** library books, **1,200-seat** auditorium, **400m** track, **30** buses, **60+** bus routes, **120** systems, **2-km** nature trail, **60%** solar.

### 8.4 Fake events & achievements
- Events: **Founder's Day (Sep 28, 2026)**, Science & Innovation Fair (Oct 12), Inter-School Science Quiz (Oct 22), Annual Sports Meet (Nov 14), Kalotsav Cultural Fest (Dec 4), Annual Day (Dec 18), Republic Day March Past (Jan 26, 2027), Art & Literature Week (Feb 12, 2027).
- Achievements timeline: "CBSE National Topper", "12 Medals State Sports", "18 Gold National Science Olympiad", "Green School Award".
- Named venues: "Kalakshetra Auditorium", "Kalotsav".

### 8.5 Fake notices (ticker + notices page)
2026-27 admission open; Mid-Term exam schedule (Aug 10); PTM (Aug 20); fee last date (Aug 25); Science quiz (Sep 2); Founder's Day (Sep 28); Annual Day auditions (Sep 22); Winter holiday list (Sep 15); Republic Day practice (Sep 10).

### 8.6 Fake admissions & fees
- 5-step process (Enquiry & Form → Documents → Interaction → Offer & Payment → Welcome Day).
- Fee table (all fictitious Rs. amounts + only annual tuition + deposit).
- Documents required (6 items).

### 8.7 Fake contact details (present in footer + contact page)
- Address: **12 Education Avenue, Greenfield City 560001**.
- Phone: **+91 80 4123 4567**.
- Mobile/WhatsApp: **+91 98765 43210**; WhatsApp link `https://wa.me/919876543210`.
- Email: **info@stxaviers.edu**.
- Hours: Mon–Sat, 8:00 AM – 3:30 PM.
- Google Map embed of "Greenfield City".

### 8.8 Fake gallery / virtual tour
- 12 gallery photos + 7 filter categories (Campus, Classrooms, Sports, Labs, Events, Arts & Culture).
- 8 virtual-tour hotspots (Kalakshetra Auditorium, Innovation & AI Lab, Central Library, Sports Complex, Swimming Pool, Hostels, Dining Hall, Main Gate & Quad).

### 8.9 Placeholder assets
- **All images = `https://picsum.photos/seed/nature/…`** (remote random photos; every one must be replaced with real school photos).
- Logo = inline SVG leaf mark (template asset, not St. Anthony's crest).
- Favicon = inline SVG leaf data-URI.
- Social / app / portal / fee links all `href="#"`.

### 8.10 Demo SEO metadata
- titles/descriptions/keywords referencing "St. Xavier's Academy", "SXA", "Greenfield City", "CBSE" (see Section 14).
- canonical domain `https://www.stxaviers.edu`.
- Open Graph / Twitter image = `picsum.photos`.

---

## 9. Asset Inventory

### 9.1 Local template assets (only 2 files — everything else is remote)
| Asset | Type | Status |
|-------|------|--------|
| `assets/css/style.css` | CSS design system | **Reusable design asset** (keep unchanged; the intended design). |
| `assets/js/main.js` | JavaScript behaviours | **Reusable**, but contains template strings (chatbot, countdown date) to update. |
| Inline SVG leaf logo | Logo (in every header/footer) | **Reusable design asset** iconography; branding text around it must change. |
| Inline SVG favicon (data URI) | Favicon | **Reusable design asset**; St. Anthony's crest may replace it. |
| Inline SVG "leaf"/"seed"/"flower"/"hill"/"wave" decorations | Graphics | **Reusable design assets** (purely decorative). |

### 9.2 Remote placeholder/demo image assets (must be replaced)
- **All `picsum.photos` URLs** (inventory in Section 8 and 13) are **demo content assets** → replace with real St. Anthony's photos.

### 9.3 Real St. Anthony's assets to collect/migrate (from source website — identified, **not yet downloaded**)
- **Logo:** `https://www.stanthonysjrcollege.org/assets/img/logo.png` (school logo) and favicon `assets/img/favicon.png`.
- **Principal photo:** `assets/img/about/Principal-Photo.JPG`.
- **Head Girl photo:** `assets/img/Head Girl_ Gursharan Kaur.JPG` (and current head-girl message image).
- **Foundress photo:** `assets/img/Mother_Founderss.jpg`.
- **Our School photo:** `assets/img/Our_School.jpg`.
- **School History photos:** `assets/img/01.jpg`, `02.jpg`, `03.jpg`, `04.jpg`, `06.jpg`, `08.jpg`, `09.jpg`.
- **Vision banner:** `assets/img/Vision_ Statement.jpg`.
- **Aims banner:** `assets/img/aim-and-objectives-banner.jpeg`.
- **Infrastructure photos:** many under `assets/img/` (labs, music, NCC, shooting range, classes, playpen) + `assets/img/IMG_*.jpg`.
- **School Anthem image:** `assets/img/School_Anthem.jpg`.
- **Achievements:** `assets/img/Achievements/Achievements1.jpg` … `Achievements4.jpg`.
- **Toppers (ICSE/ISC):** folders `ICSE Toppers/`, `ISc Toppers/` + `2021_22JULY/…` (many student photos).
- **School Cabinet:** `assets/Cabinet/*.jpg` + `assets/img/school-cabinet-2022-23/*.jpg`.
- **School Community:** `assets/img/Community 2025-26.jpg`, `Community-photo2020.jpg`, `schoolcomm23-24.jpg`.
- **Photo Gallery albums:** under `CMS/Gallery/<Album>/*.JPG` (hundreds of celebration photos).
- **Notice PDFs:** `assets/pdf/Notice to Parents.pdf`, `CMS/Notice/popup*.pdf` (LKG admission notices).
- **Admission-portal image:** `assets/img/admission-img.png` → link `https://admission.stanthonysjrcollege.org`.
- **Parent-login image:** `assets/img/education-app.png` → link `https://sajcag.idiary.in/idiarypanel/ParentLogin.aspx`.
- **Video Gallery / Media Gallery / Class Group Photos / Miss Anthony:** media collections under the Gallery menu (videos not enumerated in this audit; collect during Phase 2).

### 9.4 Assets that can remain unchanged
- All nature-theme decorative SVGs, wave dividers, leaf icons, buttons, cards, animations (the design we are keeping).

---

## 10. St. Anthony's Existing Website Structure

**Source site type:** legacy ASP.NET Web Forms (.aspx), built on the "ValidNavs" admin/theme, a CMS by **i-Diary IT Solutions Pvt. Ltd.**.

**Key real facts confirmed from the source website:**

- **Full name:** **St. Anthony's Junior College** (for girls), Agra.
- **Governing body:** under **The Jesus and Mary Agra Educational Society**; Congregation of the **Religious of Jesus and Mary (RJM)**.
- **Foundress:** **St. Claudine Thévenet** (b. Lyon, France, 30 March 1774; congregations formed by 1818; a pedagogy of love / prevention / attention to the individual; motto of prevention & family spirit). Note: source spells it "Thévenet" in the principal message and "Thevenet" elsewhere.
- **Established:** **1845** (inception of St. Anthony's in the house of the military chaplain, Cantonment area, Agra).
- **Founding journey:** six nuns left Marseilles 28 Jan 1841, reached Bombay 15 Jun 1841, arrived Agra **11 Nov 1842**; school began **1845**.
- **Progress milestones:** 1902 shifted to Mall Road (Alliance Bank, today's Pre-Primary Block); 26 Dec 1926 recognition as primary school by D.P.I.; blocks built over decades (Claudine, Dina, Josephine, Marian Blocks); music/orchestra since 1942; girls-only from 1980; **ICSE affiliation 1984** (first ICSE batch); ICSE examination centre 1986; **first ISC batch 1998**.
- **School motto:** **"Be a Light to Enlighten"**.
- **Principal (current, 2026):** **Sr. Gracy Paul** (Principal's message signed "Sr. Gracy Paul, Principal").
- **Head Girl 2026–27:** **Gursharan Kaur** (head girls list confirms "GURSHARAN KAUR 2026-2027").
- **Board:** **I.C.S.E. / I.S.C.** (not CBSE). ISC streams include **Science** and **Commerce** (XII); ICSE Class X.
- **Achievements/strengths (from our-school page):** National Topper rank at ISC Examinations; success in **Shooting** at National and International events; excellent in **Basketball** with many emerging national players. (Achievements page currently shows CDD Sports Trust Scholarship 2021-22 gallery.)
- **Toppers (2025-26 example):** ICSE top ~Ojaswi Gupta 98.67%; ISC Science top ~Drishti Jain 97.25%; ISC Commerce top ~Nandini Agarwal 98.50%. Full multi-year lists available on the source site.
- **School Cabinet (2026-27):** Head Girl Gursharan Kaur; Vice Head Girl Baani Bajwa; Light Bearer Genelia Rosemeyer; Sports Captain Saanch Mahajan; Vice Sports Captain Divya Darshani Gautam; Social Service Leader Charushi Prabha; Vice Social Service Leader Arushi Verma; House Captains (Marian, Claudine, Dina, Josephine) + vice captains; Disciplinary Leader Kashvi Shukla (+ vice); plus staff. (Full multi-year roles on source site.)
- **Houses:** **Marian, Claudine, Dina, Josephine**.
- **School Community (sisters):** e.g. Sr. Alice Mathew, Sr. Alma, Sr. Teresa, Sr. Maria Rita, Sr. Beena John, Sr. Mamta, Sr. Chinna Rani Irudaya Samy, Sr. Lucy D'Souza, Sr. Gladys, Sr. Ivy Mary Lyngdoh (list varies by year — 2025-26 image available).
- **Vision Statement (source verbatim summary):** promote a more just and humane society; service of the young, especially the poor; values infused with social, moral, spiritual outlook; work with collaborators to bring about "a new India".
- **Aims & Objectives (source):** total development — Adjustment to Environment (Home Life, Work Life, Civic Life) and Personal Growth (Spiritual, Moral, Physical, Intellectual, Aesthetic, Cultural, Emotional, Social).
- **Rules menu (real pages):** School Uniform, Fee Regulations, A Good Student, School Discipline, Silence, Order, Do You Know?, School Council Meeting, Admission And Withdrawal.
- **Admission & Withdrawal rules (real):** application to Principal for Std I–IX; competitive entrance test one standard below; admission purely on merit (not automatic for siblings); leaving certificate / affidavit rules; birth certificate (Municipal/Baptismal) required; **LKG** age rule — **"The child must complete 4 years"** (LKG registration & results online; management's decision final; no donations/false claims warning). Withdrawal: month's notice or month's fee; no TC until dues paid; strike-off after 15 days' absence without leave.
- **Fee Regulations (real):** pay by 15th of due month (else late fee); bank counter (Syndicate Bank, Shazadi Mandi, Agra Cantt.) open 1st–15th monthly; **online fee payment available**; no deductions for broken attendance; arrears >1 month → debarred; no report card/TC until settled; contact Accounts Office 10–11am working days; may pay whole year in advance; check fee book before terminal exams.
- **Uniform:** separate real page (not fetched in full — collect exact uniform details in Phase 2).

### 10.1 Real contact details (source — for `contact.html` / footer)
- **Address:** **5, Mall Road, Agra Cantt., Agra-282 001, (U.P.) INDIA**.
- **Phone:** **0562-2463335**.
- **Email:** **contact@stanthonysjrcollege.org**.
- **Admission portal:** https://admission.stanthonysjrcollege.org
- **Parent login (i-Diary):** https://sajcag.idiary.in/idiarypanel/ParentLogin.aspx
- **Instagram / Facebook / etc.:** the footer "Follow Us" icons on the source site are links but their URLs were **NOT exposed in this audit** → mark as **"NOT FOUND ON SOURCE WEBSITE"** (collect URLs during Phase 2 by inspecting raw source or directly from the school).

### 10.2 Source site SEO metadata
- `<title>` is simply **"St. Anthonys"**.
- **No meta description, no keywords, no Open Graph, no Twitter cards, no canonical, no structured data** observed in the `<head>`. The new site therefore represents an SEO **improvement** opportunity.

---

## 11. Page-by-Page Migration Mapping

**SOURCE WEBSITE CONTENT → TEMPLATE PAGE.** Where template currently holds demo "St. Xavier's" content, it is replaced with the real St. Anthony's content indicated. Items marked **NOT FOUND** need the school's input or raw-source extraction before writing.

| Template page | Real St. Anthony's content to place | Notes |
|----------------|-------------------------------------|-------|
| `index.html` | Home: hero (school name, motto "Be a Light to Enlighten", est. 1845, ICSE/ISC, girls' college), real highlights (education in love, values, academic + co-curricular, shooting/basketball/ISC toppers), real leadership letters (Principal's + Head Girl's), real about snippet, Vision/Mission, why-choose, infrastructure, excellence (toppers/boards), facilities, achievements, notices (real LKG/admission notices), events, gallery preview, admission CTA, contact | Replace every "SXA"/"St. Xavier's"/"1972"/"40-acre"/"CBSE" string. Replace hero metrics with real data or mark NOT FOUND. |
| `about.html` | **Our School** + **School History** (1845 founding, journey of the six nuns, 1902 shift, 1926 recognition, blocks, 1980 girls-only, 1984 ICSE, 1998 ISC) + **Vision Statement** + **Aims & Objectives** + real leadership/staff intro | History is rich and ready. |
| `patron-saint.html` | **Mother Foundress — St. Claudine Thévenet** (biography, Lord Lyon 1774, French Revolution, brothers' execution, "Forgive Glady…", foundation 1818, RJM Congregation; her educational aims & pedagogy: prevention, attention to the individual, family spirit, pedagogy of love) | Template page was "patron saint St. Francis Xavier" → remap to Mother Foundress. |
| `principal-message.html` | **Principal's Message — Sr. Gracy Paul** + real photo + real letter + motto "Be a Light to Enlighten" | Straight replacement of fake principal. |
| `headmistress-message.html` | **Head Girl's Message** (Gursharan Kaur, 2026-27) + real photo + real letter | Template "headmistress Primary Wing" → remap to Head Girl's Message per source (school has no separate headmistress page; it has Head Girl's Message). |
| `management.html` | **Office Bearers / School Cabinet / School Community** (real source pages: Head Girls, School Cabinet, School Staff, School Community) | Multipurpose; may show real cabinet for 2026-27 + community sisters. |
| `academics.html` | Curricula per real source (ICSE/ISC; Class X ICSE; Class XII ISC Science & Commerce; subject/stream info from source) | Source has **no dedicated "academics" page** → fill from infrastructure/rules/Aims pages; mark specific curriculum detail **NOT FOUND** if absent. |
| `admissions.html` | **Admission & Withdrawal rules** (Std I-IX application to Principal, entrance test, merit basis, documents, LKG age = complete 4 years, online registration) + **Fee Regulations** + real admission portal link | Fee table: source lists regulations but **no published fee amounts** → replace fee table with "contact Accounts Office / see Fee Regulations" or mark amounts NOT FOUND. |
| `facilities.html` | **Infrastructure** (Physics/Chemistry/Biology Labs, Computer Lab, Music Class, NCC, Shooting Range, Pre-Primary/Junior/Senior Class, Playpen) + real photos | Rich real photo set available. |
| `achievements.html` | **Achievements / Toppers / ICSE & ISC First Rankers** (real names & percentages; shooting, basketball, CDD scholarships) | Abundant real data. |
| `events.html` | Real celebrations/activities (from Photo Gallery album names: Science Exhibition, Independence Day, Feast of St. Anthony, Investiture, Sports Day, Annual Function, Kalotsav equivalents, etc.). Exact dated "2026-27 event calendar" **NOT FOUND** as a published schedule → populate with real recurring celebrations; mark specific dates NOT FOUND. | |
| `gallery.html` | **Photo Gallery, Video Gallery, Media Gallery, Class Group Photos, School Magazines, Miss Anthony** | Real photos available under `CMS/Gallery/…`. Filter categories may be relabeled. |
| `notices.html` | Real current LKG admission notices + PDFs (source shows "Notice for the parents of LKG students admitted for the Academic Session 2026–27" and "Featured News" list) | Real notices available. |
| `contact.html` | **Real contact info** (5, Mall Road, Agra Cantt., Agra-282001; 0562-2463335; contact@stanthonysjrcollege.org; admission portal; parent portal) + real map + real form topics (Admission, Fees, Transport, Careers…) | Straight replacement. |
| `virtual-tour.html` | **No published virtual tour / 360° media found on the source site** → **"NOT FOUND ON SOURCE WEBSITE"**. Either keep the template's interactive map populated with real campus photos/locations (from infrastructure/gallery) or mark for school decision. | **Needs decision** (see §19). |

---

## 12. Content That Needs Migration

**SOURCE WEBSITE CONTENT** (verbatim / lightly edited from stanthonysjrcollege.org) to migrate:

1. **School identity:** name, governing society (The Jesus and Mary Agra Educational Society), Congregation (Religious of Jesus and Mary), motto "Be a Light to Enlighten", founded 1845, girls' college.
2. **Our School** text.
3. **School History** (long, rich narrative).
4. **Mother Foundress** biography + educational aims + pedagogy.
5. **Principal's Message** (Sr. Gracy Paul) + photo.
6. **Head Girl's Message** (Gursharan Kaur, 2026-27) + photo.
7. **Vision Statement.**
8. **Aims and Objectives** (Adjustment to Environment + Personal Growth, 8 dimensions).
9. **Admission and Withdrawal** rules (incl. LKG age 4, merit basis, docs).
10. **Fee Regulations** (rules; amounts not published).
11. **Infrastructure** list + photos.
12. **Achievements** (shooting, basketball, ISC National Topper, CDD scholarships).
13. **School Toppers** (ICSE & ISC, multi-year, names + percentages).
14. **School Cabinet** (2026-27 and historical).
15. **Head Girls** (roll of honor).
16. **School Community** (sisters).
17. **School Anthem** (also Constitution-oriented "Anthonians brave…" text) + image.
18. **School Uniform** (fetch in Phase 2).
19. **LKG admission notices + PDFs.**
20. **Photo/Video/Media Galleries** (album names + images).
21. **Contact details + admission portal + parent portal links.**
22. Any lab/class captions from Infrastructure page.

**NOT FOUND ON SOURCE WEBSITE** (do not invent; collect from school before/while writing):
- Exact **fee amounts** (source only gives regulations).
- **Social-media profile URLs** (Footer icons on source, but URLs not surfaced in audit; may be empty `#` on source too).
- A published **dated 2026-27 events schedule** (only past celebration gallery albums found).
- **Virtual tour / 360° media / videos** (Video Gallery exists but contents not enumerated here).
- **Staff list details** (School Staff page not fully fetched — fetch in Phase 2).
- **Official phone/email variations**, campus visit timings, hostel details, bus routes.
- A stated **student count / acreage / teacher count** comparable to the template's fake stats.

---

## 13. Images/Media That Need Migration

**Replace all template `picsum.photos` images** with real St. Anthony's photos. Local mapping suggestion (Phase 2):

| Template slot | Real source asset (from stanthonysjrcollege.org) |
|---------------|---------------------------------------------------|
| Header/Footer logo (inline SVG leaf) | `assets/img/logo.png` (real school logo) |
| Favicon (inline SVG leaf) | `assets/img/favicon.png` |
| Hero / about blobs | `assets/img/Our_School.jpg`; school-history `01.jpg`…`09.jpg` |
| Principal portrait | `assets/img/about/Principal-Photo.JPG` |
| Head Girl portrait | `assets/img/Head Girl_ Gursharan Kaur.JPG` |
| Patron/Foundress | `assets/img/Mother_Founderss.jpg` |
| Facilities cards (labs, music, NCC, shooting, classes, playpen) | `assets/img/IMG_*.jpg`, `IMG_00xx.jpg`, `SMALL*.jpg`, `BIO-*.jpg`, `NCC_*.jpg` |
| Achievements cards | `assets/img/Achievements/Achievements1-4.jpg` |
| Toppers section | `ICSE Toppers/*.jpg`, `ISc Toppers/*.jpg`, `2021_22JULY/*.jpg` |
| School Cabinet / Management | `assets/Cabinet/*.jpg`, `assets/img/school-cabinet-2022-23/*.jpg` |
| School Community | `assets/img/Community 2025-26.jpg`, `Community-photo2020.jpg`, `schoolcomm23-24.jpg` |
| Gallery | `CMS/Gallery/<Album>/*.JPG` (many albums) |
| Virtual Tour hotspots | Real campus photos (from infrastructure/gallery) — or keep decorative, per decision §19 |
| Notice PDFs | `assets/pdf/Notice to Parents.pdf`, `CMS/Notice/popup*.pdf` |
| Admission portal banner | `assets/img/admission-img.png` (link to admission portal) |
| Parent portal banner | `assets/img/education-app.png` (link to i-Diary parent login) |

**POSTER restrictions:** None today, but note that many source images are remote and must be **downloaded into the local `assets/` folder** in Phase 2 (do not hot-link the legacy CMS).

---

## 14. SEO/Metadata Changes Required

Replace template demo metadata on **every HTML page** as follows:

| Metadata | Template (current — demo) | Required for St. Anthony's (Phase 2) |
|----------|----------------------------|----------------------------------------|
| `<title>` | "…St. Xavier's Academy… Greenfield City" | "St. Anthony's Junior College, Agra — …" |
| `meta description` | St. Xavier's / Greenfield City / CBSE / 1972 | St. Anthony's Jr. College, Agra; est. 1845; ICSE/ISC girls' college; RJM; "Be a Light to Enlighten" |
| `meta keywords` | stxaviers, SXA, Greenfield City, CBSE | stanthonysjrcollege, St. Anthony's Junior College Agra, ICSE, ISC, RJM |
| `canonical` | `https://www.stxaviers.edu/<page>.html` | `https://www.stanthonysjrcollege.org/<page>` (or new domain per school decision) |
| `og:title` / `og:description` | St. Xavier's | St. Anthony's Junior College |
| `og:image` | `picsum.photos/…/1200/630` | Real school/shareable image (logo or campus photo) |
| `og:url` | `stxaviers.edu` | real URL |
| `twitter:*` | St. Xavier's / picsum | Real school title/description/image |
| `favicon` (data-URI leaf) | Demo leaf SVG | School favicon (`assets/img/favicon.png`) or updated leaf |
| Structured data | **None present** | Opportunity: add `School`/`EducationalOrganization` JSON-LD (name, address 5 Mall Road Agra, phone 0562-2463335, email, founding 1845) — optional |
| In-page alt text / `aria-label` | "St. Xavier's Academy home" etc. | "St. Anthony's Junior College home" |

Also update branding strings embedded in the **logo alt**, **JS chatbot** name/greeting, and **countdown label/date** (all "SXA"/"St. Xavier's"/"Founder's Day" text).

---

## 15. Navigation Changes Required

The template's flat 15-item nav is the design to keep; only **labels and destinations** change.

**Proposed final navigation (keeps template structure; consolidates real source content):**
1. **Home** → `index.html`
2. **About Us** → `about.html` (Our School, History, Vision, Aims & Objectives)
3. **Mother Foundress** → `patron-saint.html` (St. Claudine Thévenet)
4. **Principal** → `principal-message.html` (Sr. Gracy Paul)
5. **Head Girl** → `headmistress-message.html` (Gursharan Kaur's message) *(renamed from "Headmistress" — see §11/§19)*
6. **Management** → `management.html` (School Cabinet, Staff, School Community)
7. **Academics** → `academics.html` (ICSE/ISC)
8. **Admissions** → `admissions.html` (+ Fee Regulations, admission portal)
9. **Facilities** → `facilities.html` (Infrastructure)
10. **Achievements** → `achievements.html` (Toppers/Rankers)
11. **Notices** → `notices.html`
12. **Events** → `events.html`
13. **Gallery** → `gallery.html` (Photo/Video/Media/Magazines)
14. **Virtual Tour** → `virtual-tour.html` *(pending §19 decision — source has no virtual tour)*
15. **Contact** → `contact.html`

**Footer and drawer:** update all labels/links to match; replace `href="#"` social/portal/app/fee links with real URLs where available (social URLs marked NOT FOUND to collect); set Online Fee Payment and Parent Login to the real i-Diary parent portal; Online Admission to the real admission portal.

---

## 16. Responsive Issues to Fix Later

*(Not fixing in Phase 1 — inventory for Phase 2.)*
1. **15 desktop nav chips may overflow** on laptop widths (~1024–1199px); currently mitigated by internal horizontal scroll (`.n-chips` `overflow-x:auto`). Consider consolidating to a "More" dropdown or fewer top-level items.
2. **Hero metrics / mandala ("Why Choose Us")** are complex visuals; on narrow phones the mandala badges can crowd. May need simplification or re-flow.
3. **Floating widgets** (`w-stack`, chat panel) can overlap page-bottom content / footer on short viewports.
4. **Virtual-tour SVG map** (1120×620 viewBox) needs a mobile-friendly horizontal pan or scale-down treatment.
5. **Gallery masonry** uses fixed-height images; real photos have varied aspect ratios — keep consistent or add `object-fit`.
6. **Notice ticker** hides its label on small screens; may want a reduced-height treatment.
7. **Tables (fee structure)** need horizontal scroll on ≤575px if real fee data is added.

---

## 17. Technical Risks / Problems

1. **No shared includes:** header/footer/drawer/chat/notice-ticker are duplicated in all 15 HTML files → any branding change must be applied 15×. High risk of inconsistency; mitigate with find/replace in Phase 2 or, if allowed later, a small include/build (but the brief says keep plain HTML/CSS/JS).
2. **Remote dependencies:** Bootstrap 5.3.3 (CDN), Font Awesome 6.5.2 (CDN), Google Fonts, Tailwind CDN. If the site must work offline/internal, these fail. Tailwind is loaded but effectively unused — candidate to remove (decide later).
3. **Picsum placeholders:** all images are remote demo photos; must download real images locally. Licensing/ownership of source photos must be confirmed with the school before reuse.
4. **Hardcoded demo strings in JS:** chatbot Q&A, fallback phone, countdown target date (Sep 28, 2026) are compiled into `main.js` and would display stale/demo info if not updated.
5. **Countdown date** in `main.js` targets the fake "Founder's Day 2026" and will expire; it must be removed or pointed at a real school event, or disabled.
6. **Source is a legacy ASP.NET CMS:** URLs are `.aspx`; images are on the same host under `assets/`, `CMS/Gallery/`, etc. Scraping/downloading must respect the school's permission and be done deliberately in Phase 2 (not now).
7. **Source SEO is minimal** (no OG/Twitter/canonical), so the new metadata must be authored fresh — good opportunity but requires real values (domain, share image).
8. **"Be a Light to Enlighten" vs template "Lux et Veritas":** must ensure the real motto replaces the template motto everywhere.
9. **Board mismatch:** template says CBSE throughout; real school is **ICSE/ISC**. All academic copy must switch board references.
10. **Gender/type mismatch:** template is co-educational ("Nursery to XII, co-educational"); real is a **girls' college** (junior college for girls). Copy must reflect this.
11. **Est. year mismatch:** 1972 → 1845.
12. **`package-lock.json`** has no packages; harmless but should be removed or ignored if no build is ever added.

---

## 18. Recommended Implementation Order (for Phase 2+ — not executed now)

1. **Gather missing school data** (fee amounts, social URLs, staff list, uniform details, virtual-tour decision) — anything marked NOT FOUND. Get school sign-off on messaging.
2. **Download real assets** into `assets/img/…` (logo, principal, head girl, foundress, history, infrastructure, toppers, cabinet, gallery, notices PDFs).
3. **Global find/replace pass** across all HTML: school name (St. Xavier's/SXA → St. Anthony's Junior College), motto, year (1972→1845), board (CBSE→ICSE/ISC), city (Greenfield City→Agra), taglines, alt/aria text.
4. **Update shared header/drawer/footer/notice/chat branding** (replicate across all 15 files — consider a scripted token replacement).
5. **Update per-page `<head>` metadata** (titles, descriptions, keywords, canonical, OG, Twitter, favicon, optional JSON-LD).
6. **Replace homepage content** section by section with real content and real images/statistics.
7. **Migrate each sub-page** in order: about → patron (Foundress) → principal → head-girl → management → academics → admissions/fees → facilities → achievements/toppers → events → gallery → notices → contact → virtual-tour.
8. **Update `main.js`** demo strings (chatbot, countdown, phone).
9. **Sanitize navigation/footer/portal/social links** to real destinations.
10. **Responsive QA + fixes** (§16).
11. **Cross-browser/devices test** + accessibility pass (reduce-motion, focus, alt text).

---

## 19. Items Requiring My Decision

1. **Faculties/head role in template vs source:** the template has both "Principal" and "Headmistress (Primary Wing)". The real source has "Principal's Message" and "Head Girl's Message" only (no Headmistress page). **Decision:** confirm we map `headmistress-message.html` → **Head Girl's Message** (recommended), or the school provides a separate headmistress/principal-for-primary message if one exists.
2. **Patron page:** confirm we map `patron-saint.html` → **Mother Foundress (St. Claudine Thévenet)** rather than the template's St. Francis Xavier. (Recommended.)
3. **Virtual tour:** the source site has **no virtual tour**. **Decision:** (a) replace with real campus photos in the interactive-map style, (b) remove the nav item, or (c) keep a placeholder — needs your/​school's call.
4. **Fee structure amounts:** source only publishes regulations. Confirm whether to: show "see Fee Book / contact Accounts Office", embed a real fee PDF, or omit amounts entirely.
5. **Social media URLs:** not surfaced. Provide official Facebook/Instagram/YouTube/X/LinkedIn URLs (or mark N/A to remove icons).
6. **Parent/student/teacher portals & app links:** confirm exact URLs for the `#` placeholders (admission portal and i-Diary parent login are known; student/teacher portals and mobile app may not exist → confirm whether to keep app badges).
7. **Domain/canonical:** confirm the production domain to use for canonical/OG URLs (keep `stanthonysjrcollege.org` or a new one).
8. **Placement of extra real content:** management page can host School Cabinet + School Staff + School Community; confirm whether scope allows that grouping, or whether separate "Cabinet" nav entries are preferred (template has a single Management page).
9. **Dark mode:** template ships a dark theme. Confirm it should be retained for the real site (recommended: keep).
10. **Tailwind CDN** is loaded but unused — confirm it can be removed during Phase 2 to reduce dependency surface.

---

## Final Check (Phase 1 compliance)

- ✅ `PROJECT_AUDIT.md` is the **only** file created/changed.
- ✅ No existing HTML, CSS, or JS file was modified.
- ✅ No files deleted or renamed.
- ✅ No assets downloaded or replaced.
- ✅ No packages installed; no framework conversion initiated.
- ✅ Local project fully inspected (all 15 HTML pages read; CSS + JS analysed; no local assets beyond CSS/JS).
- ✅ Source website analysed (homepage + About/School History/Foundress/Vision/Aims/Infrastructure/Withdrawal/Fee/Contact/Achievements/Toppers/Head Girls/School Cabinet/School Community/School Anthem/Principal/Head Girl; homepage HTML `<head>` verified).
- ✅ Source content clearly separated from template design; unknown items explicitly marked **"NOT FOUND ON SOURCE WEBSITE"** and listed in §19 for decision.

**STOP — Phase 1 complete. Awaiting next instruction before any migration.**
