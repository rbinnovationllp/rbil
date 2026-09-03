'use client';

import { type SyntheticEvent, useMemo, useState } from 'react';
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  Database,
  FileCheck2,
  FileLock2,
  GanttChartSquare,
  GraduationCap,
  HeartPulse,
  LockKeyhole,
  LogOut,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Store,
  UsersRound,
} from 'lucide-react';
import {
  canAccessAdmin,
  canAccessInvestorRoom,
  indicativePostMoneyPercentage,
  type InvestorAccessContext,
} from '@/lib/investor-access';

type ViewMode = 'request' | 'login' | 'dashboard' | 'admin';

const disclaimer =
  'The information provided within the RBIL Private Investor Room is for discussion and evaluation purposes only. Nothing contained herein constitutes an offer, solicitation, guarantee of return or legally binding commitment. Financial projections, market estimates, valuation indications and business forecasts involve assumptions and risks and actual results may differ materially. Prospective investors should conduct independent due diligence and obtain professional legal, tax, financial and regulatory advice before making any investment decision.';

const llpDisclaimer =
  'Rashi Bhartiya Innovation LLP is presently organised as a Limited Liability Partnership. Any future investment, partnership, ownership, economic participation or restructuring will be implemented only through legally appropriate documentation and applicable regulatory procedures.';

const conversionDisclosure =
  "RBIL is presently a Limited Liability Partnership. Management presently intends, following achievement of its fundraising objectives and subject to applicable law, professional advice, investor agreements and regulatory requirements, to transition RBIL into an appropriate Private Limited Company structure. Subject to definitive documentation and applicable law, investor economic interests existing immediately prior to such restructuring are intended to be appropriately reflected in the capital/shareholding structure of the resulting company.";

const investorProfiles = {
  none: { name: 'Public visitor', role: 'anonymous', status: 'submitted', level: 0 },
  level1: { name: 'Investor A', role: 'approved_investor', status: 'active', level: 1 },
  level2: { name: 'Investor B', role: 'approved_investor', status: 'active', level: 2 },
  level3: { name: 'Investor C', role: 'approved_investor', status: 'active', level: 3 },
  pending: { name: 'Pending investor', role: 'pending_investor', status: 'under_review', level: 0 },
  rejected: { name: 'Rejected investor', role: 'pending_investor', status: 'rejected', level: 0 },
  suspended: { name: 'Suspended investor', role: 'approved_investor', status: 'suspended', level: 3 },
  admin: { name: 'Investor admin', role: 'investor_admin', status: 'active', level: 4 },
} as const;

const projects = [
  {
    name: 'MAMAAI',
    category: 'AI Family Wellness & Food Planning',
    icon: HeartPulse,
    body: 'An intelligent family food planning ecosystem designed to help households decide what to cook while considering family size, preferences, cuisine, allergies, budget, nutrition and household planning.',
    points: ['Target users: families and caregivers', 'Revenue model: subscriptions and partnerships', 'Expansion: regional cuisines, grocery planning and wellness integrations'],
  },
  {
    name: 'EaseTalk',
    category: 'AI Accessibility & Assistive Communication',
    icon: MessageSquareText,
    body: 'A communication and accessibility platform intended to support people who face speech, hearing or communication challenges through speech-to-text, text-to-speech, live captions and environmental alerts.',
    points: ['Consumer, institutional and government opportunity', 'Healthcare and accessibility ecosystem use cases', 'Potential subscription and institutional licensing models'],
  },
  {
    name: 'Syllabus Synk',
    category: 'AI Education Planning',
    icon: GraduationCap,
    body: 'AI-powered academic planning for schools, administrators and teachers across syllabus planning, lesson scheduling, coordination, reporting and future-focused AI education planning.',
    points: ['Classes 1-12 potential', 'Government and private school deployment', 'Scalable SaaS model with AI Future Force component'],
  },
  {
    name: 'SabSewa Local',
    category: 'AI-Enabled Hyperlocal Commerce',
    icon: Store,
    body: 'A hyperlocal marketplace designed to connect consumers with nearby local vendors while helping neighbourhood shopkeepers compete in the digital economy.',
    points: ['Local merchant digitisation', 'Order-based monetisation and vendor onboarding', 'Geographic scalability across Indian markets'],
  },
];

const ranges = [
  ['Strategic Angel', 'US$25K-US$50K'],
  ['Lead Angel', 'US$50K-US$100K'],
  ['Strategic Investor', 'US$100K-US$250K'],
  ['Growth Investor', 'US$250K-US$500K'],
  ['Anchor Investor', 'US$500K-US$1M'],
  ['Institutional / Strategic', 'US$1M+'],
];

const applicants = [
  ['Aarav Mehta', 'India', 'HNI', 'US$100K-US$250K', 'Qualified', 'Level 2', 'Screening'],
  ['ABC Family Office', 'UAE', 'Family Office', 'US$500K-US$1M', 'Active', 'Level 3', 'Due Diligence'],
  ['NorthStar Capital', 'Singapore', 'VC Fund', 'US$1M+', 'Under Review', 'Level 4 pending', 'Term Discussion'],
  ['Priya Sharma', 'India', 'Individual Angel', 'US$25K-US$50K', 'Submitted', 'Level 1 pending', 'New Lead'],
];

function contextFromKey(key: keyof typeof investorProfiles): InvestorAccessContext {
  const profile = investorProfiles[key];
  return {
    role: profile.role,
    status: profile.status,
    level: profile.level,
  } as InvestorAccessContext;
}

export function InvestorEntrySection() {
  return (
    <section className="section investor-entry" id="investors">
      <div className="section-head">
        <p className="eyebrow">Investor relations</p>
        <h2>Strategic Investment Opportunities</h2>
        <p>
          Rashi Bhartiya Innovation LLP is building AI-powered digital solutions addressing
          everyday challenges in family wellness, education, accessibility and hyperlocal commerce.
          RBIL periodically engages with qualified strategic, institutional and financial investors.
        </p>
        <p>
          Detailed information relating to our projects, business models, growth plans and
          investment opportunities is confidential and available only to approved prospective
          investors.
        </p>
      </div>
      <div className="investor-entry-actions">
        <a className="button primary" href="/investor/apply">
          Request Investor Access
        </a>
        <a className="button secondary" href="/investor/login">
          Existing Investor Login
        </a>
      </div>
    </section>
  );
}

export default function InvestorRoom({ initialView }: { initialView?: ViewMode }) {
  const [view, setView] = useState<ViewMode>(initialView || 'request');
  const [profileKey, setProfileKey] = useState<keyof typeof investorProfiles>('none');
  const [submitted, setSubmitted] = useState(false);
  const [investment, setInvestment] = useState(500000);
  const context = contextFromKey(profileKey);
  const roomAllowed = canAccessInvestorRoom(context);
  const adminAllowed = canAccessAdmin(context);
  const selectedProfile = investorProfiles[profileKey];
  const indicativePercent = useMemo(
    () => indicativePostMoneyPercentage(investment).toFixed(2),
    [investment],
  );

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const login = (nextProfile: keyof typeof investorProfiles) => {
    setProfileKey(nextProfile);
    setView(nextProfile === 'admin' ? 'admin' : 'dashboard');
  };

  return (
    <main className="investor-room">
      <meta name="robots" content="noindex,nofollow" />
      <header className="investor-topbar">
        <a className="brand" href="/" aria-label="Return to RBIL home">
          <img className="brand-logo" src="/rashi-bhartiya-logo.png" alt="RBIL logo" />
          <span>
            <strong>RBIL</strong>
            <small>Private Investor Room</small>
          </span>
        </a>
        <nav aria-label="Investor navigation">
          <button type="button" onClick={() => setView('request')}>Request access</button>
          <button type="button" onClick={() => setView('login')}>Login</button>
          <button type="button" onClick={() => setView('dashboard')}>Investor room</button>
          <button type="button" onClick={() => setView('admin')}>Admin</button>
        </nav>
      </header>

      <div className="confidential-banner">
        <ShieldCheck size={18} aria-hidden="true" />
        <strong>CONFIDENTIAL INVESTOR MATERIAL</strong>
        <span>
          Information contained in this portal is provided solely for authorised prospective
          investors and must not be redistributed without written permission from Rashi Bhartiya
          Innovation LLP.
        </span>
      </div>

      {view === 'request' ? (
        <section className="investor-panel application-panel">
          <div>
            <p className="eyebrow">Private access request</p>
            <h1>Building AI Solutions for Real-World Problems</h1>
            <p className="lead">Four platforms. Four major markets. One innovation company.</p>
            <div className="security-note">
              <LockKeyhole size={20} aria-hidden="true" />
              <span>
                Access is not automatic. Every applicant is manually screened before the private
                investor room is opened.
              </span>
            </div>
          </div>
          <form className="investor-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>Full name<input name="fullName" required /></label>
              <label>Email address<input type="email" name="email" required /></label>
              <label>Mobile number<input name="mobile" required /></label>
              <label>Country<input name="country" required /></label>
              <label>City<input name="city" required /></label>
              <label>LinkedIn profile<input type="url" name="linkedin" /></label>
              <label>Company / organisation<input name="organisation" /></label>
              <label>Designation<input name="designation" /></label>
              <label>
                Investor type
                <select name="investorType" required>
                  <option>Individual Angel Investor</option>
                  <option>HNI</option>
                  <option>Family Office</option>
                  <option>Venture Capital Fund</option>
                  <option>Private Equity</option>
                  <option>Strategic Corporate Investor</option>
                  <option>Institutional Investor</option>
                  <option>Accelerator / Incubator</option>
                  <option>Government-linked institution</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Indicative investment capacity
                <select name="capacity" required>
                  <option>US$25,000-US$50,000</option>
                  <option>US$50,000-US$100,000</option>
                  <option>US$100,000-US$250,000</option>
                  <option>US$250,000-US$500,000</option>
                  <option>US$500,000-US$1 Million</option>
                  <option>US$1 Million+</option>
                  <option>Prefer to discuss privately</option>
                </select>
              </label>
            </div>
            <fieldset>
              <legend>Areas of interest</legend>
              {['MAMAAI', 'EaseTalk', 'Syllabus Synk', 'SabSewa Local', 'Entire RBIL portfolio', 'Strategic partnership', 'Government / institutional partnership', 'Technology collaboration', 'International expansion'].map((item) => (
                <label className="check-row" key={item}><input type="checkbox" name="areas" value={item} />{item}</label>
              ))}
            </fieldset>
            <div className="form-grid">
              <label>Have you previously invested in startups?<select name="experience"><option>Yes</option><option>No</option><option>Prefer to discuss</option></select></label>
              <label>Typical investment ticket size<input name="ticketSize" /></label>
              <label>Sectors previously invested in<input name="sectors" /></label>
              <label>Countries where you invest<input name="countries" /></label>
              <label>Investing personally or for an organisation?<select name="mode"><option>Personally</option><option>On behalf of an organisation</option><option>Both</option></select></label>
            </div>
            <label>Please briefly describe your investment interest and how you may contribute to RBIL's growth.<textarea name="message" rows={5} required /></label>
            <label className="check-row"><input type="checkbox" required />I understand that access to RBIL's private investor materials may contain confidential, proprietary and commercially sensitive information. I agree not to copy, reproduce, distribute, disclose or commercially use such information without prior written permission from Rashi Bhartiya Innovation LLP.</label>
            <label className="check-row"><input type="checkbox" required />I understand that submission of this request does not guarantee access to the Investor Room and does not constitute an offer of securities, partnership interest or investment.</label>
            <button type="submit">Submit Access Request</button>
            {submitted ? <p className="success-message"><CheckCircle2 size={18} />Request captured for admin review. In production this record should store timestamp, consent version, investor ID, user agent and legally appropriate IP metadata.</p> : null}
          </form>
        </section>
      ) : null}

      {view === 'login' ? (
        <section className="investor-panel login-panel">
          <div>
            <p className="eyebrow">Secure login model</p>
            <h1>Existing Investor Login</h1>
            <p className="lead">
              Production deployment should use email/password or magic-link authentication with
              hashed passwords, secure sessions, CSRF protection, rate limiting and expiry.
            </p>
          </div>
          <div className="login-options">
            <button type="button" onClick={() => login('level1')}>Demo Level 1 investor</button>
            <button type="button" onClick={() => login('level2')}>Demo Level 2 investor</button>
            <button type="button" onClick={() => login('level3')}>Demo Level 3 investor</button>
            <button type="button" onClick={() => login('pending')}>Demo pending investor</button>
            <button type="button" onClick={() => login('rejected')}>Demo rejected investor</button>
            <button type="button" onClick={() => login('suspended')}>Demo suspended investor</button>
            <button type="button" onClick={() => login('admin')}>Demo investor admin</button>
          </div>
        </section>
      ) : null}

      {view === 'dashboard' ? (
        roomAllowed ? (
          <InvestorDashboard
            investorName={selectedProfile.name}
            level={selectedProfile.level}
            investment={investment}
            setInvestment={setInvestment}
            indicativePercent={indicativePercent}
          />
        ) : (
          <AccessDenied context={context} onLogin={() => setView('login')} />
        )
      ) : null}

      {view === 'admin' ? (
        adminAllowed ? <AdminDashboard /> : <AccessDenied context={context} onLogin={() => setView('login')} admin />
      ) : null}

      <footer className="investor-disclaimers">
        <p>{disclaimer}</p>
        <p>{llpDisclaimer}</p>
      </footer>
    </main>
  );
}

function AccessDenied({ context, onLogin, admin }: { context: InvestorAccessContext; onLogin: () => void; admin?: boolean }) {
  return (
    <section className="investor-panel denied-panel">
      <FileLock2 size={42} aria-hidden="true" />
      <h1>Access Restricted</h1>
      <p>
        {admin
          ? 'Admin pages require an explicitly assigned investor_admin or super_admin role.'
          : 'Private investor pages require a logged-in account, approved investor status and active access.'}
      </p>
      <p className="muted">
        Current demo context: role {context.role}, status {context.status}, level {context.level}.
        Pending, rejected, suspended and revoked accounts remain blocked even when they know the URL.
      </p>
      <button type="button" onClick={onLogin}>Choose a demo login</button>
    </section>
  );
}

function InvestorDashboard({
  investorName,
  level,
  investment,
  setInvestment,
  indicativePercent,
}: {
  investorName: string;
  level: number;
  investment: number;
  setInvestment: (value: number) => void;
  indicativePercent: string;
}) {
  return (
    <section className="investor-workspace">
      <div className="dashboard-hero">
        <p className="eyebrow">Welcome to the RBIL Private Investor Room</p>
        <h1>Building AI Solutions for Real-World Problems</h1>
        <p>Four platforms. Four major markets. One innovation company.</p>
        <div className="access-strip">
          <span>Investor: <strong>{investorName}</strong></span>
          <span>Investor ID: <strong>RBIL-INV-2026-DEMO</strong></span>
          <span>Access level: <strong>Level {level}</strong></span>
          <span>Validity: <strong>Active review window</strong></span>
        </div>
      </div>

      <div className="dashboard-cards">
        {[
          ['RBIL Overview', Building2],
          ['Our Four Platforms', BriefcaseBusiness],
          ['Market Opportunity', BarChart3],
          ['Business Model', CircleDollarSign],
          ['Financial Opportunity', Calculator],
          ['Investment Discussion', UsersRound],
          ['Confidential Data Room', Database],
          ['Schedule Founder Discussion', Mail],
        ].map(([label, Icon]) => (
          <article key={String(label)}>
            <Icon size={22} aria-hidden="true" />
            <strong>{String(label)}</strong>
          </article>
        ))}
      </div>

      <section className="investor-section">
        <h2>Why RBIL Is Different</h2>
        <p>
          RBIL is developing a diversified AI technology portfolio rather than depending on one
          product. The four platforms address family wellness, accessibility, education and local
          commerce, feeding into one innovation company.
        </p>
        <div className="portfolio-map">
          {projects.map((project) => <span key={project.name}>{project.name}<small>{project.category}</small></span>)}
          <strong>Rashi Bhartiya Innovation LLP</strong>
        </div>
      </section>

      <section className="investor-section">
        <h2>Four Project Investment Presentation</h2>
        <div className="project-investor-grid">
          {projects.map(({ name, category, icon: Icon, body, points }) => (
            <article key={name}>
              <Icon size={28} aria-hidden="true" />
              <p className="eyebrow">{category}</p>
              <h3>{name}</h3>
              <p>{body}</p>
              <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="investor-section split-investor">
        <div>
          <h2>Proposed Investment Opportunity</h2>
          <p className="valuation-number">US$12 Million</p>
          <p>
            Management / Founder Proposed Pre-Money Valuation, subject to due diligence,
            negotiation and applicable professional valuation requirements.
          </p>
          <p className="legal-note">
            Any percentage, ownership, economic interest or investment amount displayed in this
            portal is indicative only and does not constitute a legally binding offer.
          </p>
        </div>
        <div className="calculator-card">
          <Calculator size={24} aria-hidden="true" />
          <h3>Illustrative Valuation Calculator</h3>
          <label>
            Investment amount in USD
            <input type="number" min={25000} step={25000} value={investment} onChange={(event) => setInvestment(Number(event.target.value))} />
          </label>
          <strong>{indicativePercent}% indicative mathematical percentage</strong>
          <p>This calculator is illustrative only and does not constitute an offer or guarantee of ownership.</p>
        </div>
      </section>

      <section className="investor-section">
        <h2>Proposed Fundraising Approach</h2>
        <div className="responsive-table">
          <table>
            <thead><tr><th>Investor category</th><th>Indicative investment</th></tr></thead>
            <tbody>{ranges.map(([category, value]) => <tr key={category}><td>{category}</td><td>{value}</td></tr>)}</tbody>
          </table>
        </div>
        <p>
          RBIL may consider admitting multiple strategic investors rather than depending upon one
          investor for the entire funding requirement. Management may ultimately consider economic
          participation of up to approximately 20%, subject entirely to valuation, legal structure,
          investor quality, due diligence, negotiation, partner approval and professional advice.
        </p>
      </section>

      <section className="investor-section revenue-section">
        <h2>Long-Term Revenue Opportunity</h2>
        <p className="valuation-number">Approximately Rs. 4,000 crore annually / approximately US$480 million annually</p>
        <p>
          This figure represents management's long-term full-scale projection across RBIL's
          portfolio. It is not current revenue, booked revenue or guaranteed future revenue.
        </p>
        <div className="stage-grid">
          {['Current Stage', '12-Month Target', '3-Year Scenario', 'Full-Scale Opportunity'].map((stage) => <span key={stage}>{stage}</span>)}
        </div>
      </section>

      <section className="investor-section">
        <h2>Confidential Data Room</h2>
        <div className="data-room-grid">
          {['Corporate Documents', 'Financial Information', 'Business Plans', 'Product Documentation', 'Market Research', 'Legal / Compliance', 'Intellectual Property', 'Demonstration Videos', 'Founder / Management Documents', 'Investment Documents'].map((item, index) => (
            <article key={item}>
              <FileCheck2 size={22} aria-hidden="true" />
              <strong>{item}</strong>
              <span>Level {Math.min(4, Math.max(1, index % 4 + 1))} permission check</span>
            </article>
          ))}
        </div>
        <p className="legal-note">
          Production files must use authenticated delivery, server-side permission checks, expiring
          signed URLs, view-only controls where needed, download logging and dynamic confidential
          watermarks.
        </p>
      </section>

      <section className="investor-section split-investor">
        <div>
          <h2>Corporate Structure & Future Roadmap</h2>
          <p>{conversionDisclosure}</p>
          <p>
            The parties intend that the investor's agreed economic participation will be
            appropriately reflected in the resulting corporate structure, subject to definitive
            agreements, valuation, applicable law and regulatory requirements.
          </p>
        </div>
        <form className="compact-form">
          <h3>Request Founder Discussion</h3>
          <label>Preferred date<input type="date" /></label>
          <label>Preferred time<input type="time" /></label>
          <label>Timezone<input defaultValue="Asia/Kolkata" /></label>
          <label>Question or message<textarea rows={4} /></label>
          <button type="button">Submit Request</button>
        </form>
      </section>
    </section>
  );
}

function AdminDashboard() {
  return (
    <section className="investor-workspace admin-workspace">
      <div className="dashboard-hero">
        <p className="eyebrow">Admin only</p>
        <h1>RBIL Investor Relations Command Centre</h1>
        <p>Screen applicants, control access levels, manage the data room and track investor activity.</p>
      </div>
      <div className="dashboard-cards">
        {['Investor Leads', 'Qualified Investors', 'Potential Capital Interest', 'Anchor Investor Discussions', 'Due Diligence Cases', 'Meetings Requested', 'Documents Accessed', 'Active Negotiations'].map((label, index) => (
          <article key={label}>
            <GanttChartSquare size={22} aria-hidden="true" />
            <strong>{label}</strong>
            <span>{index + 2}</span>
          </article>
        ))}
      </div>
      <section className="investor-section">
        <h2>Investor CRM</h2>
        <div className="responsive-table">
          <table>
            <thead>
              <tr><th>Name</th><th>Country</th><th>Investor type</th><th>Capacity</th><th>Status</th><th>Access level</th><th>Pipeline</th></tr>
            </thead>
            <tbody>
              {applicants.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <div className="admin-actions">
          {['Approve', 'Reject', 'Request more information', 'Suspend', 'Revoke access'].map((action) => <button type="button" key={action}>{action}</button>)}
        </div>
      </section>
      <section className="investor-section">
        <h2>Security, Audit and Configuration</h2>
        <div className="project-investor-grid">
          <article><ShieldCheck size={24} /><h3>Audit Log</h3><p>Track investor login, failed login, page access, document views, downloads, NDA acceptance, password reset and admin actions.</p></article>
          <article><Database size={24} /><h3>Admin Configuration</h3><p>Configure proposed valuation, investment ranges, project descriptions, investor tiers, document visibility, disclaimers, exchange assumption and fundraising status.</p></article>
          <article><UsersRound size={24} /><h3>Investor Scoring</h3><p>Private score from 0-100 based on capacity, strategic relevance, sector experience, geography, organisation quality and seriousness.</p></article>
        </div>
      </section>
      <button className="logout-button" type="button"><LogOut size={18} /> Logout all sessions</button>
    </section>
  );
}
