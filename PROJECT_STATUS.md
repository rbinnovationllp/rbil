# Project Status: Rashi Bhartiya Innovation LLP Landing Page

Last updated: September 4, 2026

## Project Location

The active website project is now located at:

```text
C:\Users\HP\rbil
```

The previous nested folder `C:\Users\HP\rbil\Rashi_Bhartiya_Innovation_LLP_Landing_Page_PRD` has been copied into this main folder.

## Current Status

The landing page has been built as a local Vinext/Sites web project. The page is available locally when the development server is running:

```text
http://localhost:3000/
```

To start the local website:

```powershell
cd "C:\Users\HP\rbil"
npm run dev
```

If an old server is still running or the browser shows a Vite/Vinext overlay error, stop Node first:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
cd "C:\Users\HP\rbil"
npm run dev
```

## Completed Work

- Created the corporate landing page for Rashi Bhartiya Innovation LLP.
- Added the official company logo to the header and footer.
- Added the founder profile for Rajesh Kumar Khare.
- Added Rajesh Kumar Khare's professional photograph.
- Added Phone/WhatsApp contact: `+91 81781 13449`.
- Added official website email: `admin@rbil.in`.
- Replaced the previous Gmail contact address wherever it represented RBIL official communication.
- Routed website enquiry mailto flows to `admin@rbil.in`.
- Added registered address:

```text
Plot No. 1040/29, Flat No.-201, Gali No.-10, Krishna Colony, Gurugram -122001 Haryana
```

- Added four product cards:
  - EaseTalk
  - Syllabus Synk
  - MAMAAI
  - SabSewa Local
- Added product thumbnail images for all four products.
- Added external product links:
  - `https://easetalk.in`
  - `https://syllabus-synk.in`
  - `https://mamaai.in`
  - `https://sabsewa.in`
- Added an Achievements and Recognition section.
- Added Gemini XPRIZE Hackathon 2026 participation wording for MAMAAI and SabSewa Local.
- Added participant badges to MAMAAI and SabSewa Local product cards.
- Added three-minute hackathon demo links:
  - MAMAAI: `https://youtu.be/2_q7U75P7To?si=SLfpRFF3EVT7nvYH`
  - SabSewa Local: `https://youtu.be/E8HcaSRgv1M?si=VZ-A0B0qjef-UUIn`
- Added YouTube-style responsive demo thumbnail sections with play icons.
- Preserved cautious wording so the site does not imply that either project won, was shortlisted, awarded, or officially endorsed.
- Added a mobile-first **Explore RBIL** quick-navigation section near the top of the landing page.
- Added a higher-visibility public Investor Relations / Strategic Investment shortcut near the top of the visitor journey.
- Kept confidential investment details behind the investor access and approval flow.
- Made every product **Learn More** action functional through dedicated product-detail experiences.
- Added detailed product storytelling pages for:
  - MAMAAI
  - EaseTalk
  - Syllabus Synk
  - SabSewa Local
- Product detail pages now explain:
  - The Problem
  - Why We Created It
  - Our Solution
  - How It Works
  - Who Benefits
  - Impact in India
  - Global Potential
  - Future Vision
- Added the required future corporate structure disclosure across investor participation contexts.
- Added Investor FAQ wording for possible future conversion/restructuring into a Private Limited Company.
- Added a public FAQ/unanswered-question style enquiry flow through the RBIL investor FAQ form, routed to `admin@rbil.in`.
- Added an EN / HI language selector for the public website.
- Replaced the earlier dropdown-style language control with a visible segmented EN / HI button control so it no longer appears as a placeholder.
- English remains the default language.
- Hindi selection is persisted with browser `localStorage` key `rbil-language`.
- The selected language is preserved across the landing page, product Learn More pages, and public investor request/login surfaces.
- Private investor legal and confidential disclosures remain English-authoritative until RBIL approves official Hindi legal translations.

## Important Content Notes

The site currently states that MAMAAI and SabSewa Local **participated in** the Gemini XPRIZE Hackathon 2026 and that three-minute project demonstration videos were submitted.

The wording intentionally does not claim:

- Winner status
- Shortlisting
- Award recognition
- Official endorsement by Gemini, Google, XPRIZE, or Hackathon organisers

## Key Assets Added

Assets are stored in:

```text
C:\Users\HP\rbil\public
```

Current important assets:

- `rashi-bhartiya-logo.png`
- `founder-photo.png`
- `thumbnail-easetalk.png`
- `thumbnail-syllabus-synk.png`
- `thumbnail-mamaai.png`
- `thumbnail-sabsewa-local.png`

## Main Files

- `app/page.tsx` contains the landing page content and sections.
- `app/page.tsx` also contains the centralized public landing-page Hindi copy, quick-navigation copy, product-card copy, and product-detail story copy.
- `app/investor-room.tsx` contains the Investor Relations entry point, investor access request flow, investor dashboard/admin demo, future corporate structure disclosures, and investor FAQ.
- `app/globals.css` contains the visual styling and responsive layout.
- `app/layout.tsx` contains site metadata.
- `lib/contact.ts` contains the official RBIL contact email constant and mailto helper.
- `lib/investor-access.ts` contains investor/admin access-control checks used by tests and investor-room gating.
- `db/investor-room-schema.sql` contains the investor-room database schema draft, including enquiry and investor tables.
- `scripts/investor-access-tests.mjs` contains access-control test cases.
- `package.json` contains local development and build commands.
- `Rashi_Bhartiya_Innovation_LLP_Landing_Page_PRD.md` contains the source PRD.

## Latest Verification

Most recent checks completed on September 4, 2026:

```powershell
npm run lint
npx tsc --noEmit
npm run test:access
npm run build:amplify
```

Results:

- Lint passed.
- TypeScript passed.
- Investor access-control tests passed.
- Amplify static build passed.
- Build output generated in `dist-amplify`.
- Build still reports a large JavaScript chunk warning; this is a warning, not a build failure.

Browser smoke test performed locally:

- `http://localhost:3000/` loads in English by default.
- EN / HI segmented buttons switch the public landing page between English and Hindi.
- Hindi selection persists when opening a product Learn More page.
- MAMAAI Learn More opened at `/?product=mamaai` and displayed the Hindi product-detail story.
- Public investor request opened at `/?investor=apply` and preserved Hindi selection.
- Direct `/investor/apply` returned a local Vinext 404 in dev, so public investor buttons now use query-based working routes:
  - `/?investor=apply`
  - `/?investor=login`
- Existing path checks for `/investor/apply`, `/investor/login`, `/investor`, and `/admin` remain in code for environments that rewrite all routes into the app.

## Previous Verification

The project has previously passed production build checks using:

```powershell
npm run build
```

If files were moved manually after the last build, run this again from `C:\Users\HP\rbil` before deployment.

For AWS Amplify Hosting, the project now also has a dedicated static Vite build:

```powershell
npm run build:amplify
```

This build passed successfully and outputs deployable static files to:

```text
C:\Users\HP\rbil\dist-amplify
```

Amplify settings added in `amplify.yml`:

- Install/pre-build: `nvm install 22`, `nvm use 22`, `npm ci`
- Build command: `npm run build:amplify`
- Output/base directory: `dist-amplify`
- Required app environment variables: none currently required
- Visitor counter environment variable after backend deployment: `VITE_VISITOR_COUNTER_ENDPOINT`

Deployment note: the active `C:\Users\HP\rbil` folder is not currently a Git repository, so it must be pushed to GitHub before AWS Amplify can connect it for automatic deployments.

## Visitor Counter

Added a public visitor counter to the landing page.

Frontend files:

- `app/page.tsx`
- `app/globals.css`

Backend files:

- `aws/visitor-counter/template.yaml`
- `aws/visitor-counter/lambda/index.mjs`
- `aws/visitor-counter/lambda/package.json`
- `aws/visitor-counter/README.md`

Production architecture:

- AWS API Gateway HTTP API receives `POST /visit`.
- AWS Lambda validates the request, skips detectable bots/prefetch requests, applies rate limiting, and updates DynamoDB.
- AWS DynamoDB stores the permanent counter and uses atomic `UpdateItem ADD totalVisits :one`.
- Browser code never writes directly to the database.
- No local storage, cookies, IP deduplication, dummy numbers, random values, estimated values, or hard-coded counts are used.

Deployment steps:

```powershell
cd C:\Users\HP\rbil\aws\visitor-counter
sam build
sam deploy --guided --parameter-overrides AllowedOrigins="https://rbil.in,https://www.rbil.in" RateLimitSalt="replace-with-a-long-random-secret"
```

After deployment, copy the stack output named `VisitorCounterEndpoint` into AWS Amplify as:

```text
VITE_VISITOR_COUNTER_ENDPOINT=https://your-api-id.execute-api.your-region.amazonaws.com/prod/visit
```

Then redeploy the Amplify production branch.

Production verification:

- Open the production landing page and note the displayed counter value.
- Refresh the page 10 times in a normal browser tab.
- Confirm the displayed value increases by exactly 10.
- Do not use curl or monitoring tools for this verification, because the backend intentionally avoids counting likely non-human clients.

Partnership links verified in built page source:

- Government and Public-Sector Pilots: `https://syllabus-synk.in/partners`
- School and Institutional Adoption: `https://syllabus-synk.in/partners`
- NGO and Community Partnerships: `https://www.easetalk.in`
- Research and Technology Collaboration: internal Contact section with selected enquiry category
- Incubation, Grants, and Investment Discussions: internal Contact section with selected enquiry category
- Vendor and Local Ecosystem Partnerships: `https://www.sabsewa.in/partner`

## Remaining Before Public Launch

- Confirm final domain: `rbil.in` or `rbillp.in`.
- Add approved legal pages:
  - Privacy Policy
  - Terms of Use
  - Cookie Policy
  - Accessibility Statement
- Confirm official registration details intended for public display.
- Replace the current static mailto contact flow with server-side lead handling if a database or CRM is required.
- Add spam protection and server-side form validation if a hosted backend contact form is added.
- Confirm all advertised product features are live or mark them clearly as planned, beta, pilot, or coming soon.
- Add final SEO metadata, sitemap, robots.txt, and structured data before public deployment.
- Push the active folder to GitHub and connect only the production branch to Amplify.
- Add the Hostinger DNS records shown by Amplify after the custom domain is created.
- Confirm HTTPS after DNS verification and certificate provisioning complete.

## Current Recommendation

Use `C:\Users\HP\rbil` as the only active project folder going forward. Avoid editing the older nested folder after the copy, so changes do not get split across two locations.
