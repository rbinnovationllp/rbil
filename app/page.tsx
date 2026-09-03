'use client';

import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Languages,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Store,
  UsersRound,
} from 'lucide-react';
import InvestorRoom, { InvestorEntrySection } from './investor-room';

type VisitStatus = 'loading' | 'ready' | 'unavailable' | 'unconfigured';

const products = [
  {
    id: 'easetalk',
    name: 'EaseTalk',
    category: 'Assistive communication',
    hook: 'Communication should be accessible to everyone.',
    description:
      'An AI-enabled communication and sound-awareness solution designed to support deaf and hard-of-hearing users, people with speech-related needs, and senior citizens.',
    users: 'Individuals, families, senior citizens, institutions',
    url: 'https://easetalk.in',
    image: '/thumbnail-easetalk.png',
    imageAlt: 'EaseTalk assistive communication product thumbnail',
    hackathon: null,
    accent: 'teal',
    Icon: MessageSquareText,
  },
  {
    id: 'syllabus-synk',
    name: 'Syllabus Synk',
    category: 'Education planning',
    hook: 'Give educators more time to teach and students a future-ready pathway.',
    description:
      'A school planning platform for academic schedules, syllabus delivery, lesson planning, examinations, and reporting.',
    users: 'Schools, teachers, education leaders',
    url: 'https://syllabus-synk.in',
    image: '/thumbnail-syllabus-synk.png',
    imageAlt: 'Syllabus Synk AI-powered school platform thumbnail',
    hackathon: null,
    accent: 'blue',
    Icon: GraduationCap,
  },
  {
    id: 'mamaai',
    name: 'MAMAAI',
    category: 'Family food and wellness',
    hook: 'Planning family meals should feel caring, not complicated.',
    description:
      'An intelligent family meal-planning assistant for preferences, dietary restrictions, region, season, budget, wellness needs, and grocery planning.',
    users: 'Families, caregivers, wellness-focused households',
    url: 'https://mamaai.in',
    image: '/thumbnail-mamaai.png',
    imageAlt: 'MAMAAI intelligent family meal planning thumbnail',
    hackathon: {
      label: 'Gemini XPRIZE Hackathon 2026 Participant',
      submittedLabel: '3-Minute Demo Submitted for the Gemini XPRIZE Hackathon 2026',
      videoUrl: 'https://youtu.be/2_q7U75P7To?si=SLfpRFF3EVT7nvYH',
      videoThumb: 'https://img.youtube.com/vi/2_q7U75P7To/hqdefault.jpg',
    },
    accent: 'rose',
    Icon: HeartPulse,
  },
  {
    id: 'sabsewa-local',
    name: 'SabSewa Local',
    category: 'Hyperlocal commerce and services',
    hook: 'Local needs deserve local, trusted solutions.',
    description:
      'A hyperlocal platform designed to connect customers with nearby vendors and service providers while supporting local livelihoods.',
    users: 'Local customers, vendors, service providers',
    url: 'https://sabsewa.in',
    image: '/thumbnail-sabsewa-local.png',
    imageAlt: 'SabSewa Local AI-powered local shopping thumbnail',
    hackathon: {
      label: 'Gemini XPRIZE Hackathon 2026 Participant',
      submittedLabel: '3-Minute Demo Submitted for the Gemini XPRIZE Hackathon 2026',
      videoUrl: 'https://youtu.be/E8HcaSRgv1M?si=VZ-A0B0qjef-UUIn',
      videoThumb: 'https://img.youtube.com/vi/E8HcaSRgv1M/hqdefault.jpg',
    },
    accent: 'green',
    Icon: Store,
  },
];

const hackathonProjects = products.filter((product) => product.hackathon);

const principles = [
  ['Human Problems First', 'We begin with lived challenges.'],
  ['Research Before Development', 'We study needs, barriers, and existing gaps.'],
  ['Accessible by Design', 'We work toward inclusive and affordable solutions.'],
  ['Built for Meaningful Scale', 'We design for communities, institutions, and public systems.'],
];

const partners = [
  {
    title: 'Government and Public-Sector Pilots',
    href: 'https://syllabus-synk.in/partners',
    external: true,
  },
  {
    title: 'School and Institutional Adoption',
    href: 'https://syllabus-synk.in/partners',
    external: true,
  },
  {
    title: 'NGO and Community Partnerships',
    href: 'https://www.easetalk.in',
    external: true,
  },
  {
    title: 'Research and Technology Collaboration',
    href: '#contact',
    interest: 'Research and Technology Collaboration',
  },
  {
    title: 'Incubation, Grants, and Investment Discussions',
    href: '#contact',
    interest: 'Incubation, Grants, and Investment Discussions',
  },
  {
    title: 'Vendor and Local Ecosystem Partnerships',
    href: 'https://www.sabsewa.in/partner',
    external: true,
  },
];

const founderPhone = '+91 81781 13449';
const suggestionEmail = 'rbinnovationllp@gmail.com';

const getVisitorCounterEndpoint = () => {
  const viteEnv = (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>;
  }).env;

  return viteEnv?.VITE_VISITOR_COUNTER_ENDPOINT?.trim() || '';
};

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState('Partnership');
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [visitStatus, setVisitStatus] = useState<VisitStatus>('loading');
  const countedVisitRef = useRef(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  useEffect(() => {
    if (countedVisitRef.current) {
      return;
    }

    countedVisitRef.current = true;
    const endpoint = getVisitorCounterEndpoint();

    if (!endpoint) {
      window.setTimeout(() => setVisitStatus('unconfigured'), 0);
      return;
    }

    let isActive = true;

    const registerVisit = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({ page: 'landing' }),
          cache: 'no-store',
          credentials: 'omit',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
        });

        if (!response.ok) {
          throw new Error('Visitor counter request failed');
        }

        const data = (await response.json()) as { totalVisits?: unknown };

        if (isActive && typeof data.totalVisits === 'number') {
          setVisitCount(data.totalVisits);
          setVisitStatus('ready');
          return;
        }

        throw new Error('Visitor counter response was invalid');
      } catch {
        if (isActive) {
          setVisitCount(null);
          setVisitStatus('unavailable');
        }
      }
    };

    void registerVisit();

    return () => {
      isActive = false;
    };
  }, []);

  const handleContactSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formValue = (name: string, fallback = '') => {
      const value = data.get(name);
      return typeof value === 'string' ? value.trim() : fallback;
    };
    const name = formValue('name');
    const organisation = formValue('organisation');
    const country = formValue('country');
    const email = formValue('email');
    const interest = formValue('interest', selectedInterest);
    const message = formValue('message');
    const subject = `RBIL enquiry: ${interest}`;
    const body = [
      `Name: ${name}`,
      `Organisation: ${organisation || 'Not provided'}`,
      `Country: ${country}`,
      `Email: ${email}`,
      `Area of interest: ${interest}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:${suggestionEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (pathname.startsWith('/admin')) {
    return <InvestorRoom initialView="admin" />;
  }

  if (pathname.startsWith('/investor/login')) {
    return <InvestorRoom initialView="login" />;
  }

  if (pathname.startsWith('/investor/apply')) {
    return <InvestorRoom initialView="request" />;
  }

  if (pathname.startsWith('/investor')) {
    return <InvestorRoom initialView="dashboard" />;
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Rashi Bhartiya Innovation LLP home">
          <img
            className="brand-logo"
            src="/rashi-bhartiya-logo.png"
            alt="Rashi Bhartiya Innovation LLP logo"
          />
          <span>
            <strong>Rashi Bhartiya</strong>
            <small>Innovation LLP</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#products">Products</a>
          <a href="#achievements">Achievements</a>
          <a href="#research">Research</a>
          <a href="#founder">Founder</a>
          <a href="#partnerships">Partnerships</a>
          <a href="#investors">Investors</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <button className="language" type="button" aria-label="Language selector">
            <Languages size={16} />
            EN / HI
          </button>
          <a className="header-cta" href="#products">
            Explore Solutions
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">People-first innovation from India for the world</p>
          <h1>Transforming Everyday Challenges into Meaningful Digital Solutions</h1>
          <p className="lead">
            Rashi Bhartiya Innovation LLP researches real human needs and develops accessible,
            affordable, and intelligent solutions for communication, education, family wellness,
            and hyperlocal services.
          </p>
          <div className="actions">
            <a className="button primary" href="#products">
              Explore Our Products <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#partnerships">
              Partner With Us
            </a>
          </div>
          <div className="visitor-counter" aria-live="polite">
            <span>Public Visit Counter</span>
            {visitStatus === 'ready' && visitCount !== null ? (
              <strong>{new Intl.NumberFormat('en-IN').format(visitCount)}</strong>
            ) : (
              <strong className="counter-unavailable">Unavailable</strong>
            )}
            <small>
              {visitStatus === 'ready'
                ? 'Total page visits confirmed by the production database.'
                : visitStatus === 'unconfigured'
                  ? 'Production counter API is not connected yet.'
                  : 'Counter service is temporarily unavailable.'}
            </small>
          </div>
          <div className="stamp" aria-label="Innovation commitment">
            <strong>Researching People's Real-Life Pain Points</strong>
            <span>Analysing root causes | Building practical solutions</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Rashi Bhartiya Innovation solution ecosystem">
          <div className="visual-core">
            <Sparkles size={30} />
            <span>One Vision</span>
            <strong>Four Solutions</strong>
          </div>
          {products.map(({ name, category, accent, Icon }) => (
            <article className={`solution-node ${accent}`} key={name}>
              <Icon size={24} aria-hidden="true" />
              <span>{category}</span>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="principles" aria-label="Trust and purpose principles">
        {principles.map(([title, body]) => (
          <article key={title}>
            <CheckCircle2 size={20} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section" id="products">
        <div className="section-head">
          <p className="eyebrow">Product ecosystem</p>
          <h2>Four Solutions. One Human-Centred Mission.</h2>
          <p>
            Each product starts with a human problem and guides visitors toward the right live
            solution without making the parent-company purpose disappear.
          </p>
        </div>
        <div className="product-grid">
          {products.map(({ id, name, category, hook, description, users, url, image, imageAlt, hackathon, accent, Icon }) => (
            <article className={`product-card ${accent}`} id={id} key={name}>
              <a className="product-thumb" href={url} target="_blank" rel="noopener noreferrer">
                <img src={image} alt={imageAlt} loading="lazy" />
              </a>
              <div className="product-icon">
                <Icon size={26} aria-hidden="true" />
              </div>
              <p className="category">{category}</p>
              <h3>{name}</h3>
              {hackathon ? (
                <span className="hackathon-badge">
                  <Award size={15} aria-hidden="true" />
                  {hackathon.label}
                </span>
              ) : null}
              <strong>{hook}</strong>
              <p>{description}</p>
              <p className="users">{users}</p>
              {hackathon ? (
                <a
                  className="card-video-thumb"
                  href={hackathon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${name} three-minute demo submitted for the Gemini XPRIZE Hackathon 2026`}
                >
                  <img
                    src={hackathon.videoThumb}
                    alt={`${name} 3-minute demo submitted for the Gemini XPRIZE Hackathon 2026`}
                    loading="lazy"
                  />
                  <span>
                    <PlayCircle size={24} aria-hidden="true" />
                    {hackathon.submittedLabel}
                  </span>
                </a>
              ) : null}
              <div className="product-actions">
                <a href={`#${id}`}>Learn More</a>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Open Product <ExternalLink size={15} />
                </a>
                {hackathon ? (
                  <a href={hackathon.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch 3-Minute Hackathon Demo <PlayCircle size={15} />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section achievements" id="achievements">
        <div className="section-head">
          <p className="eyebrow">Achievements and recognition</p>
          <h2>Gemini XPRIZE Hackathon 2026 Participation</h2>
          <p>
            SabSewa Local and MAMAAI participated in the Gemini XPRIZE Hackathon 2026, where their
            three-minute project demonstration videos were submitted. This statement reflects
            participation only and does not imply that either project won, was shortlisted, received
            an award, or was officially endorsed by Gemini, Google, XPRIZE, or the Hackathon
            organisers.
          </p>
          <p className="channel-note">Demo videos are from the @AiKiDuniyaofficialpage YouTube channel.</p>
        </div>
        <div className="demo-grid">
          {hackathonProjects.map(({ name, description, hackathon, accent }) => (
            <article className={`demo-card ${accent}`} key={name}>
              <a
                className="video-thumb"
                href={hackathon?.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${name} three-minute hackathon demo on YouTube`}
              >
                <img
                  src={hackathon?.videoThumb}
                  alt={`${name} three-minute hackathon demo video thumbnail`}
                  loading="lazy"
                />
                <span className="play-mark">
                  <PlayCircle size={34} aria-hidden="true" />
                </span>
              </a>
              <div className="demo-copy">
                <span className="hackathon-badge">
                  <Award size={15} aria-hidden="true" />
                  Gemini XPRIZE Hackathon 2026 Participant
                </span>
                <div className="demo-title-row">
                  <h3>{name}</h3>
                  <a href={hackathon?.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch Demo <ExternalLink size={14} />
                  </a>
                </div>
                <p>{description}</p>
                <p className="submitted-label">{hackathon?.submittedLabel}</p>
                <p className="disclaimer">
                  Demo video submitted for the Hackathon. Participation wording only; no award,
                  shortlist, endorsement, or win is claimed here by Gemini, Google, XPRIZE, or the
                  Hackathon organisers.
                </p>
                <a className="button secondary demo-button" href={hackathon?.videoUrl} target="_blank" rel="noopener noreferrer">
                  Watch 3-Minute Hackathon Demo <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section detail-pages" id="product-details">
        <div className="section-head">
          <p className="eyebrow">Detailed product pages</p>
          <h2>Hackathon Demo Details</h2>
          <p>
            These detailed project sections help visitors understand the MAMAAI and SabSewa Local
            submissions without implying award status or official endorsement.
          </p>
        </div>
        <div className="detail-grid">
          {hackathonProjects.map(({ name, hook, description, url, hackathon, accent }) => (
            <article className={`detail-card ${accent}`} key={`detail-${name}`}>
              <a
                className="video-thumb"
                href={hackathon?.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${name} three-minute hackathon demo on YouTube`}
              >
                <img
                  src={hackathon?.videoThumb}
                  alt={`${name} 3-minute demo submitted for the Gemini XPRIZE Hackathon 2026`}
                  loading="lazy"
                />
                <span className="play-mark">
                  <PlayCircle size={34} aria-hidden="true" />
                </span>
              </a>
              <div>
                <span className="hackathon-badge">
                  <Award size={15} aria-hidden="true" />
                  Gemini XPRIZE Hackathon 2026 Participant
                </span>
                <h3>{name}</h3>
                <strong>{hook}</strong>
                <p>{description}</p>
                <p className="submitted-label">{hackathon?.submittedLabel}</p>
                <div className="product-actions">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Open Product <ExternalLink size={15} />
                  </a>
                  <a href={hackathon?.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch 3-Minute Hackathon Demo <PlayCircle size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="research">
        <div>
          <p className="eyebrow">Research & innovation</p>
          <h2>We Do Not Start With Technology. We Start With People.</h2>
          <p>
            The company studies recurring difficulties, root causes, affordability barriers,
            accessibility needs, language context, and practical adoption before shaping digital
            solutions.
          </p>
          <div className="commitment">
            <ShieldCheck size={24} aria-hidden="true" />
            <strong>Bold commitment</strong>
            <span>
              Every initiative begins with a genuine human problem, disciplined research, and the
              search for a practical, inclusive solution.
            </span>
          </div>
        </div>
        <ol className="process">
          <li>
            <strong>Listen</strong>
            <span>Identify recurring difficulties faced by people and institutions.</span>
          </li>
          <li>
            <strong>Research & Analyse</strong>
            <span>Study root causes, existing solutions, and user context.</span>
          </li>
          <li>
            <strong>Design & Validate</strong>
            <span>Develop practical solutions and test them with relevant users.</span>
          </li>
          <li>
            <strong>Improve & Scale</strong>
            <span>Use feedback and evidence to strengthen wider adoption.</span>
          </li>
        </ol>
      </section>

      <section className="section impact">
        <div className="section-head">
          <p className="eyebrow">Impact areas</p>
          <h2>Built Around Everyday Outcomes</h2>
        </div>
        <div className="impact-grid">
          <span>Inclusive communication and independent living</span>
          <span>Smarter academic planning and AI readiness</span>
          <span>Better family meal organisation and wellness awareness</span>
          <span>Stronger neighbourhood economies and local livelihoods</span>
        </div>
      </section>

      <section className="section founder-profile" id="founder">
        <div className="founder-photo-card">
          <img
            className="founder-photo"
            src="/founder-photo.png"
            alt="Rajesh Kumar Khare, Founder and Director of Rashi Bhartiya Innovation LLP"
          />
          <span>Professional photograph</span>
        </div>
        <div className="founder-card">
          <div className="founder-mark">
            <UsersRound size={36} aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Founder&apos;s Profile</p>
            <h2>Rajesh Kumar Khare</h2>
            <p className="founder-role">Founder and Director, Rashi Bhartiya Innovation LLP</p>
            <p>
              Rajesh Kumar Khare is an Indian Air Force veteran with 15 years of distinguished
              service and more than 40 years of involvement in social work and community engagement.
              His diverse professional and social experience has given him a deep understanding of
              the real-life challenges and pain points faced by ordinary people.
            </p>
            <p>
              At the age of 64, he began exploring and understanding the transformative potential of
              Artificial Intelligence. By the age of 66, he started developing practical, affordable,
              and AI-powered application solutions to address people&apos;s everyday problems.
            </p>
            <div className="founder-belief">
              <SearchCheck size={22} aria-hidden="true" />
              <span>
                The company&apos;s innovations are not driven by technology alone. They originate from
                decades of real-world experience, close interaction with communities, careful
                research and analysis, and a genuine commitment to developing simple, inclusive, and
                affordable digital solutions for the masses.
              </span>
            </div>
            <a className="phone-link" href="tel:+918178113449">
              <Phone size={18} aria-hidden="true" />
              Phone/WhatsApp: {founderPhone}
            </a>
          </div>
        </div>
      </section>

      <section className="section partnerships" id="partnerships">
        <div className="section-head">
          <p className="eyebrow">Partnerships</p>
          <h2>Let's Solve Meaningful Problems Together.</h2>
          <p>
            Rashi Bhartiya Innovation LLP welcomes conversations with public-sector teams, schools,
            NGOs, research partners, investors, vendors, and local ecosystem collaborators.
          </p>
        </div>
        <div className="partner-list">
          {partners.map((partner) => (
            <a
              className="partner-box"
              href={partner.href}
              key={partner.title}
              onClick={(event) => {
                if (partner.interest) {
                  event.preventDefault();
                  setSelectedInterest(partner.interest);
                  window.history.pushState(null, '', '#contact');
                  document.getElementById('contact')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
              }}
              {...(partner.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <HandHeart size={18} aria-hidden="true" />
              <span>{partner.title}</span>
              {partner.external ? <ExternalLink size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
            </a>
          ))}
        </div>
      </section>

      <InvestorEntrySection />

      <section className="section contact" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>A Better Future Begins by Solving the Problems People Face Today.</h2>
          <p>
            This first release includes the approved registered address and a ready contact-form
            layout. Suggestions, partnership enquiries, and product-demo requests can also be sent
            directly by email.
          </p>
          <a className="email-link" href={`mailto:${suggestionEmail}`}>
            <Mail size={18} aria-hidden="true" />
            Suggestions: {suggestionEmail}
          </a>
          <div className="address">
            <MapPin size={22} aria-hidden="true" />
            <span>
              Plot No. 1040/29, Flat No.-201, Gali No.-10, Krishna Colony, Gurugram -122001
              Haryana
            </span>
          </div>
          <a className="phone-link contact-phone" href="tel:+918178113449">
            <Phone size={18} aria-hidden="true" />
            Phone/WhatsApp: {founderPhone}
          </a>
        </div>
        <form onSubmit={handleContactSubmit}>
          <label>
            Full name
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            Organisation
            <input type="text" name="organisation" autoComplete="organization" />
          </label>
          <label>
            Country
            <input type="text" name="country" autoComplete="country-name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            Area of interest
            <select
              name="interest"
              required
              value={selectedInterest}
              onChange={(event) => setSelectedInterest(event.target.value)}
            >
              <option>EaseTalk</option>
              <option>Syllabus Synk</option>
              <option>MAMAAI</option>
              <option>SabSewa Local</option>
              <option>Government Pilot</option>
              <option>Partnership</option>
              <option>Government and Public-Sector Pilots</option>
              <option>School and Institutional Adoption</option>
              <option>NGO and Community Partnerships</option>
              <option>Research and Technology Collaboration</option>
              <option>Incubation, Grants, and Investment Discussions</option>
              <option>Vendor and Local Ecosystem Partnerships</option>
              <option>Investment</option>
              <option>Media</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows={4} required />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            <span>I consent to being contacted about this enquiry.</span>
          </label>
          <button type="submit">Request a Conversation</button>
        </form>
      </section>

      <footer>
        <div>
          <a className="brand footer-brand" href="#home" aria-label="Rashi Bhartiya Innovation LLP home">
            <img
              className="brand-logo"
              src="/rashi-bhartiya-logo.png"
              alt="Rashi Bhartiya Innovation LLP logo"
            />
            <span>
              <strong>Rashi Bhartiya Innovation LLP</strong>
              <small>Innovation rooted in real human needs.</small>
            </span>
          </a>
          <p>
            Registered address: Plot No. 1040/29, Flat No.-201, Gali No.-10, Krishna Colony,
            Gurugram -122001 Haryana.
          </p>
          <p>Phone/WhatsApp: {founderPhone}</p>
          <p>
            Suggestions:{' '}
            <a href={`mailto:${suggestionEmail}`}>{suggestionEmail}</a>
          </p>
          <p className="muted">
            Registration details, legal text, and social links should be added after company
            approval.
          </p>
        </div>
        <div className="footer-links">
          <a href="#products">Products</a>
          <a href="#research">Research</a>
          <a href="#contact">Contact</a>
          <a href="#investors">Investor Relations</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#accessibility">Accessibility</a>
        </div>
        <p className="muted full">
          Product availability and features may vary by region and development stage. Copyright
          2026.
        </p>
      </footer>
    </main>
  );
}
