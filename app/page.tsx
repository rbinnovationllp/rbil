'use client';

import { type SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
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
import { buildMailto, rbilOfficialEmail } from '@/lib/contact';
import InvestorRoom, { InvestorEntrySection } from './investor-room';

type VisitStatus = 'loading' | 'ready' | 'unavailable' | 'unconfigured';
type Language = 'en' | 'hi';
type ProductStory = {
  name: string;
  category: string;
  url: string;
  image: string;
  Icon: typeof HeartPulse;
  accent: string;
  intro: string;
  sections: readonly (readonly [string, string])[];
};

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

const productStories: Record<string, ProductStory> = {
  mamaai: {
    name: 'MAMAAI',
    category: 'AI Family Wellness & Food Planning',
    url: 'https://mamaai.in',
    image: '/thumbnail-mamaai.png',
    Icon: HeartPulse,
    accent: 'rose',
    intro:
      'MAMAAI is being developed as an AI-powered family food and household meal-planning platform for the everyday question every home faces: what should we cook today?',
    sections: [
      ['The Problem', 'Families often plan meals while balancing age, taste, regional food habits, health needs, allergies, budgets, ingredients already at home and the time available to cook. This daily decision can quietly become stressful and repetitive.'],
      ['Why We Created It', 'RBIL identified meal planning as a real household pain point where practical AI can reduce decision fatigue and support healthier, more organised food decisions.'],
      ['Our Solution', 'MAMAAI aims to suggest practical meal ideas based on family size, preferences, cuisine, nutrition considerations, budget and household requirements.'],
      ['How It Works', 'A family can enter preferences, restrictions, cuisine choices and planning needs. The platform can then help with meal ideas, planning prompts, grocery thinking and future personalised recommendations.'],
      ['Who Benefits', 'Families, caregivers, working parents, senior citizens, wellness-focused households and anyone responsible for daily food planning can benefit from simpler decisions.'],
      ['Impact in India', 'India has diverse cuisines, family structures and dietary habits. A locally aware AI meal-planning platform can support regional food choices while helping households plan with budget and nutrition in mind.'],
      ['Global Potential', 'The same daily food-planning problem exists worldwide. The concept can be adapted for different countries, languages, cultures, allergies, food habits, ingredient availability and wellness preferences.'],
      ['Future Vision', 'The long-term potential is a trusted family food assistant that supports planning, grocery coordination, wellness guidance and partnerships across food, nutrition and household services.'],
    ],
  },
  easetalk: {
    name: 'EaseTalk',
    category: 'AI Accessibility & Assistive Communication',
    url: 'https://easetalk.in',
    image: '/thumbnail-easetalk.png',
    Icon: MessageSquareText,
    accent: 'teal',
    intro:
      'EaseTalk is being developed to support people who face hearing, speech or communication barriers through practical assistive communication tools.',
    sections: [
      ['The Problem', 'Many people, including deaf and hard-of-hearing users, people with speech-related needs and senior citizens, face daily communication barriers in homes, public spaces, institutions and services.'],
      ['Why We Created It', 'RBIL sees accessibility as a human need, not a luxury. EaseTalk is intended to make communication more inclusive, understandable and responsive in ordinary daily situations.'],
      ['Our Solution', 'The platform brings together assistive communication capabilities such as speech-to-text, text-to-speech, live captions and environmental sound alerts.'],
      ['How It Works', 'Users may use captions to understand spoken communication, text-to-speech to express messages, and alerts to notice important sounds in their surroundings.'],
      ['Who Benefits', 'Individuals with hearing or speech challenges, senior citizens, families, schools, healthcare environments, public service providers and accessibility-focused institutions may benefit.'],
      ['Impact in India', 'India needs affordable assistive tools across languages, communities and income groups. EaseTalk can support inclusion in homes, education, healthcare and public-facing services.'],
      ['Global Potential', 'Communication barriers exist internationally. The platform concept can be adapted for different languages, accessibility regulations, care environments and institutional workflows.'],
      ['Future Vision', 'EaseTalk can evolve into a broader accessibility ecosystem serving consumers, institutions, governments and healthcare/community partners.'],
    ],
  },
  'syllabus-synk': {
    name: 'Syllabus Synk',
    category: 'AI Education Planning',
    url: 'https://syllabus-synk.in',
    image: '/thumbnail-syllabus-synk.png',
    Icon: GraduationCap,
    accent: 'blue',
    intro:
      'Syllabus Synk is an AI-powered academic planning platform for schools, administrators and teachers who need to turn annual syllabus goals into practical teaching plans.',
    sections: [
      ['The Problem', 'Schools often struggle to translate annual syllabus requirements into lesson schedules, classroom pacing, examination planning, reporting and academic coordination across teachers and classes.'],
      ['Why We Created It', 'RBIL identified academic planning as a repetitive, high-responsibility task where teachers and administrators need clarity, coordination and time savings.'],
      ['Our Solution', 'Syllabus Synk aims to help schools plan syllabus coverage, lesson schedules, academic calendars, reports and future AI education initiatives.'],
      ['How It Works', 'The platform can structure syllabus inputs into timelines, lesson plans, coordination views and reporting workflows that support teachers and school leadership.'],
      ['Who Benefits', 'Teachers, principals, school administrators, private schools, government schools and education departments can benefit from more organised academic planning.'],
      ['Impact in India', 'With large and diverse school systems, India needs scalable tools that can support Classes 1-12, teacher planning, administrative visibility and AI readiness.'],
      ['Global Potential', 'Schools worldwide face syllabus planning and coordination challenges. The concept can be adapted for different curricula, languages, academic calendars and education systems.'],
      ['Future Vision', 'Syllabus Synk can become a school operating layer for academic planning, institutional reporting and future-focused AI learning initiatives.'],
    ],
  },
  'sabsewa-local': {
    name: 'SabSewa Local',
    category: 'AI-Enabled Hyperlocal Commerce',
    url: 'https://sabsewa.in',
    image: '/thumbnail-sabsewa-local.png',
    Icon: Store,
    accent: 'green',
    intro:
      'SabSewa Local is being developed to connect nearby consumers with nearby vendors and help neighbourhood businesses participate in the digital economy.',
    sections: [
      ['The Problem', 'As commerce becomes more digital, many neighbourhood shopkeepers and small service providers struggle to remain visible, receive local orders and compete with larger online platforms.'],
      ['Why We Created It', 'RBIL sees local commerce as a community-strengthening opportunity. SabSewa Local is designed around nearby needs, trusted vendors and practical digital access for small businesses.'],
      ['Our Solution', 'The platform aims to make hyperlocal purchasing convenient for consumers while helping vendors create a digital presence, receive orders and grow within their locality.'],
      ['How It Works', 'Consumers can discover nearby shops, vendors and services. Vendors can be onboarded, listed and connected to demand from their local area.'],
      ['Who Benefits', 'Local consumers, shopkeepers, service providers, delivery partners, neighbourhood markets and community commerce networks can benefit.'],
      ['Impact in India', 'India has a large base of small retailers and local service providers. A hyperlocal platform can help digitise local businesses while preserving neighbourhood commerce.'],
      ['Global Potential', 'Local-business digitisation is relevant in many countries. The model can be adapted for different cities, languages, payment habits, delivery models and local-commerce ecosystems.'],
      ['Future Vision', 'SabSewa Local can grow into an AI-assisted hyperlocal commerce network with vendor onboarding, local discovery, order-based monetisation and geographic expansion.'],
    ],
  },
};

const productStoriesHi: Record<string, ProductStory> = {
  mamaai: {
    ...productStories.mamaai,
    intro:
      'MAMAAI रोज़ घरों में पूछे जाने वाले सवाल, आज क्या पकाएं, को आसान बनाने के लिए AI आधारित परिवार भोजन और घरेलू meal-planning platform के रूप में विकसित किया जा रहा है।',
    sections: [
      ['समस्या', 'परिवारों को भोजन तय करते समय उम्र, स्वाद, क्षेत्रीय खान-पान, स्वास्थ्य जरूरतें, एलर्जी, बजट, घर में उपलब्ध सामग्री और पकाने के समय को साथ लेकर चलना पड़ता है। यह रोज़ का निर्णय कई बार थकाने वाला हो जाता है।'],
      ['हमने इसे क्यों बनाया', 'RBIL ने meal planning को एक वास्तविक घरेलू समस्या के रूप में पहचाना, जहां व्यावहारिक AI रोज़ की निर्णय-थकान कम कर सकता है और बेहतर food planning में मदद कर सकता है।'],
      ['हमारा समाधान', 'MAMAAI परिवार के आकार, पसंद, cuisine, nutrition, budget और household needs के आधार पर उपयोगी meal ideas और planning support देने का लक्ष्य रखता है।'],
      ['यह कैसे काम करता है', 'परिवार अपनी पसंद, restrictions, cuisine choices और planning needs डाल सकता है। Platform meal ideas, planning prompts, grocery thinking और future personalised recommendations में मदद कर सकता है।'],
      ['किसे लाभ होगा', 'परिवार, caregivers, working parents, senior citizens, wellness-focused households और रोज़ भोजन योजना बनाने वाले लोग इससे लाभ उठा सकते हैं।'],
      ['भारत में प्रभाव', 'भारत में cuisine, परिवार structure और dietary habits बहुत विविध हैं। Local context समझने वाला AI meal-planning platform regional food choices, budget और nutrition को ध्यान में रखकर मदद कर सकता है।'],
      ['वैश्विक संभावना', 'Daily food planning की समस्या दुनिया भर में मौजूद है। इस concept को अलग-अलग countries, languages, cultures, allergies, food habits और ingredient availability के अनुसार adapt किया जा सकता है।'],
      ['भविष्य की दृष्टि', 'लंबी अवधि में MAMAAI एक भरोसेमंद family food assistant बन सकता है, जो planning, grocery coordination, wellness guidance और food/nutrition partnerships को support करे।'],
    ],
  },
  easetalk: {
    ...productStories.easetalk,
    intro:
      'EaseTalk hearing, speech और communication barriers का सामना करने वाले लोगों को practical assistive communication tools से support करने के लिए विकसित किया जा रहा है।',
    sections: [
      ['समस्या', 'कई लोग, जिनमें deaf और hard-of-hearing users, speech-related needs वाले व्यक्ति और senior citizens शामिल हैं, घर, public spaces, institutions और services में daily communication barriers का सामना करते हैं।'],
      ['हमने इसे क्यों बनाया', 'RBIL accessibility को luxury नहीं बल्कि human need मानता है। EaseTalk का उद्देश्य communication को ordinary daily situations में अधिक inclusive और understandable बनाना है।'],
      ['हमारा समाधान', 'Platform speech-to-text, text-to-speech, live captions और environmental sound alerts जैसी assistive communication capabilities को साथ लाता है।'],
      ['यह कैसे काम करता है', 'Users spoken communication समझने के लिए captions, अपने संदेश व्यक्त करने के लिए text-to-speech, और surrounding sounds पहचानने के लिए alerts का उपयोग कर सकते हैं।'],
      ['किसे लाभ होगा', 'Hearing या speech challenges वाले individuals, senior citizens, families, schools, healthcare spaces, public service providers और accessibility-focused institutions को लाभ हो सकता है।'],
      ['भारत में प्रभाव', 'भारत को भाषाओं, communities और income groups के हिसाब से affordable assistive tools की जरूरत है। EaseTalk homes, education, healthcare और public-facing services में inclusion को support कर सकता है।'],
      ['वैश्विक संभावना', 'Communication barriers internationally भी मौजूद हैं। Platform concept को different languages, accessibility regulations, care environments और institutional workflows के अनुसार adapt किया जा सकता है।'],
      ['भविष्य की दृष्टि', 'EaseTalk consumers, institutions, governments और healthcare/community partners के लिए broader accessibility ecosystem बन सकता है।'],
    ],
  },
  'syllabus-synk': {
    ...productStories['syllabus-synk'],
    intro:
      'Syllabus Synk schools, administrators और teachers के लिए AI-powered academic planning platform है, जो annual syllabus goals को practical teaching plans में बदलने में मदद करता है।',
    sections: [
      ['समस्या', 'Schools को annual syllabus requirements को lesson schedules, classroom pacing, exam planning, reporting और academic coordination में बदलने में कठिनाई होती है।'],
      ['हमने इसे क्यों बनाया', 'RBIL ने academic planning को high-responsibility और repetitive task के रूप में पहचाना, जहां teachers और administrators को clarity, coordination और time saving की जरूरत होती है।'],
      ['हमारा समाधान', 'Syllabus Synk syllabus coverage, lesson schedules, academic calendars, reports और future AI education initiatives को plan करने में support देने का लक्ष्य रखता है।'],
      ['यह कैसे काम करता है', 'Platform syllabus inputs को timelines, lesson plans, coordination views और reporting workflows में organize कर सकता है।'],
      ['किसे लाभ होगा', 'Teachers, principals, school administrators, private schools, government schools और education departments को बेहतर academic planning से लाभ हो सकता है।'],
      ['भारत में प्रभाव', 'भारत में बड़े और विविध school systems हैं। Classes 1-12, teacher planning, administrative visibility और AI readiness के लिए scalable tools उपयोगी हो सकते हैं।'],
      ['वैश्विक संभावना', 'Schools worldwide syllabus planning और coordination challenges का सामना करते हैं। Concept को different curricula, languages, academic calendars और education systems के अनुसार adapt किया जा सकता है।'],
      ['भविष्य की दृष्टि', 'Syllabus Synk academic planning, institutional reporting और future-focused AI learning initiatives के लिए school operating layer बन सकता है।'],
    ],
  },
  'sabsewa-local': {
    ...productStories['sabsewa-local'],
    intro:
      'SabSewa Local nearby consumers को nearby vendors से जोड़ने और neighbourhood businesses को digital economy में भाग लेने में मदद करने के लिए विकसित किया जा रहा है।',
    sections: [
      ['समस्या', 'Commerce के digital होने के साथ कई neighbourhood shopkeepers और small service providers online visibility, local orders और बड़े platforms से competition में संघर्ष करते हैं।'],
      ['हमने इसे क्यों बनाया', 'RBIL local commerce को community-strengthening opportunity मानता है। SabSewa Local nearby needs, trusted vendors और small businesses के practical digital access पर आधारित है।'],
      ['हमारा समाधान', 'Platform consumers के लिए hyperlocal purchasing को convenient बनाते हुए vendors को digital presence, local orders और locality-based growth में मदद करने का लक्ष्य रखता है।'],
      ['यह कैसे काम करता है', 'Consumers nearby shops, vendors और services खोज सकते हैं। Vendors को onboard, list और local demand से connect किया जा सकता है।'],
      ['किसे लाभ होगा', 'Local consumers, shopkeepers, service providers, delivery partners, neighbourhood markets और community commerce networks को लाभ हो सकता है।'],
      ['भारत में प्रभाव', 'भारत में small retailers और local service providers की बहुत बड़ी संख्या है। Hyperlocal platform neighbourhood commerce को बनाए रखते हुए local businesses को digitise करने में मदद कर सकता है।'],
      ['वैश्विक संभावना', 'Local-business digitisation कई देशों में relevant है। Model को different cities, languages, payment habits, delivery models और local-commerce ecosystems के अनुसार adapt किया जा सकता है।'],
      ['भविष्य की दृष्टि', 'SabSewa Local vendor onboarding, local discovery, order-based monetisation और geographic expansion के साथ AI-assisted hyperlocal commerce network बन सकता है।'],
    ],
  },
};

const principles = [
  ['Human Problems First', 'We begin with lived challenges.'],
  ['Research Before Development', 'We study needs, barriers, and existing gaps.'],
  ['Accessible by Design', 'We work toward inclusive and affordable solutions.'],
  ['Built for Meaningful Scale', 'We design for communities, institutions, and public systems.'],
];

const quickLinks = [
  {
    title: 'Our Innovations',
    text: "Explore RBIL's AI solutions",
    href: '#products',
    Icon: Sparkles,
    featured: false,
  },
  {
    title: 'Four Projects, One Vision',
    text: 'See what we are building',
    href: '#products',
    Icon: Store,
    featured: false,
  },
  {
    title: 'Our Impact',
    text: 'Technology for real-world problems',
    href: '#impact',
    Icon: HeartPulse,
    featured: false,
  },
  {
    title: 'Partner With Us',
    text: 'Strategic and institutional collaboration',
    href: '#partnerships',
    Icon: HandHeart,
    featured: false,
  },
  {
    title: 'Investor Relations',
    text: "Discover the growth opportunity behind RBIL's four AI platforms",
    href: '#investors',
    Icon: ShieldCheck,
    featured: true,
  },
  {
    title: 'Our Journey',
    text: 'Innovation, hackathons and milestones',
    href: '#achievements',
    Icon: Award,
    featured: false,
  },
  {
    title: 'Founder Story',
    text: 'The vision behind RBIL',
    href: '#founder',
    Icon: UsersRound,
    featured: false,
  },
  {
    title: 'Connect With RBIL',
    text: "Let's build together",
    href: '#contact',
    Icon: Phone,
    featured: false,
  },
];

const hiProducts = {
  easetalk: {
    category: 'सहायक संचार',
    hook: 'संचार हर व्यक्ति के लिए सुलभ होना चाहिए।',
    description:
      'Hearing, speech और communication needs वाले users, senior citizens और institutions के लिए AI-enabled communication और sound-awareness solution.',
    users: 'Individuals, families, senior citizens, institutions',
  },
  'syllabus-synk': {
    category: 'शिक्षा योजना',
    hook: 'शिक्षकों को पढ़ाने के लिए अधिक समय और बेहतर planning मिलनी चाहिए।',
    description:
      'Academic schedules, syllabus delivery, lesson planning, examinations और reporting के लिए school planning platform.',
    users: 'Schools, teachers, education leaders',
  },
  mamaai: {
    category: 'परिवार भोजन और wellness',
    hook: 'Family meals की planning caring होनी चाहिए, complicated नहीं।',
    description:
      'Preferences, dietary restrictions, region, season, budget, wellness needs और grocery planning के लिए intelligent family meal-planning assistant.',
    users: 'Families, caregivers, wellness-focused households',
  },
  'sabsewa-local': {
    category: 'Hyperlocal commerce और services',
    hook: 'Local needs के लिए local और trusted solutions जरूरी हैं।',
    description:
      'Nearby customers को local vendors और service providers से जोड़ने वाला hyperlocal platform, जो local livelihoods को support करता है.',
    users: 'Local customers, vendors, service providers',
  },
} as const;

const hiQuickLinks = {
  'Our Innovations': ['हमारे Innovations', 'RBIL के AI solutions देखें'],
  'Four Projects, One Vision': ['चार Projects, एक Vision', 'देखें हम क्या बना रहे हैं'],
  'Our Impact': ['हमारा Impact', 'Real-world problems के लिए technology'],
  'Partner With Us': ['Partner With Us', 'Strategic और institutional collaboration'],
  'Investor Relations': ['Investor Relations', 'RBIL के चार AI platforms के growth opportunity को जानें'],
  'Our Journey': ['हमारी Journey', 'Innovation, hackathons और milestones'],
  'Founder Story': ['Founder Story', 'RBIL के vision के पीछे की कहानी'],
  'Connect With RBIL': ['RBIL से जुड़ें', 'आइए साथ मिलकर बनाएं'],
} as const;

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

const hiPartnerTitles: Record<string, string> = {
  'Government and Public-Sector Pilots': 'Government और public-sector pilots',
  'School and Institutional Adoption': 'School और institutional adoption',
  'NGO and Community Partnerships': 'NGO और community partnerships',
  'Research and Technology Collaboration': 'Research और technology collaboration',
  'Incubation, Grants, and Investment Discussions': 'Incubation, grants और investment discussions',
  'Vendor and Local Ecosystem Partnerships': 'Vendor और local ecosystem partnerships',
};

const founderPhone = '+91 81781 13449';

function LanguageSwitcher({
  language,
  onLanguageChange,
  className = '',
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}) {
  return (
    <div className={`language-switcher ${className}`} aria-label="Website language selector">
      <Languages size={16} aria-hidden="true" />
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        onClick={() => onLanguageChange('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={language === 'hi' ? 'active' : ''}
        onClick={() => onLanguageChange('hi')}
        aria-pressed={language === 'hi'}
      >
        HI
      </button>
    </div>
  );
}

const getVisitorCounterEndpoint = () => {
  const viteEnv = (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>;
  }).env;

  return viteEnv?.VITE_VISITOR_COUNTER_ENDPOINT?.trim() || '';
};

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const savedLanguage = window.localStorage.getItem('rbil-language');
    return savedLanguage === 'hi' || savedLanguage === 'en' ? savedLanguage : 'en';
  });
  const [selectedInterest, setSelectedInterest] = useState('Partnership');
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [visitStatus, setVisitStatus] = useState<VisitStatus>('loading');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const countedVisitRef = useRef(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const investorParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('investor') : null;
  const productParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('product') : null;
  const isHindi = language === 'hi';
  const activeProductStories = isHindi ? productStoriesHi : productStories;
  const displayProducts = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        ...(isHindi ? hiProducts[product.id as keyof typeof hiProducts] : {}),
      })),
    [isHindi],
  );
  const displayHackathonProjects = displayProducts.filter((product) => product.hackathon);
  const displayQuickLinks = quickLinks.map((link) => {
    const translated = isHindi ? hiQuickLinks[link.title as keyof typeof hiQuickLinks] : null;
    return translated ? { ...link, title: translated[0], text: translated[1] } : link;
  });

  useEffect(() => {
    window.localStorage.setItem('rbil-language', language);
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
  }, [language]);

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

    setContactSubmitted(true);
    window.location.href = buildMailto(rbilOfficialEmail, subject, body.split('\n'));
  };

  if (pathname.startsWith('/admin')) {
    return <InvestorRoom initialView="admin" language={language} />;
  }

  if (investorParam === 'login') {
    return <InvestorRoom initialView="login" language={language} />;
  }

  if (investorParam === 'apply') {
    return <InvestorRoom initialView="request" language={language} />;
  }

  if (investorParam === 'dashboard') {
    return <InvestorRoom initialView="dashboard" language={language} />;
  }

  if (pathname.startsWith('/investor/login')) {
    return <InvestorRoom initialView="login" language={language} />;
  }

  if (pathname.startsWith('/investor/apply')) {
    return <InvestorRoom initialView="request" language={language} />;
  }

  if (pathname.startsWith('/investor')) {
    return <InvestorRoom initialView="dashboard" language={language} />;
  }

  const productSlug = productParam || pathname.match(/^\/products\/([^/]+)/)?.[1];

  if (productSlug && activeProductStories[productSlug]) {
    return (
      <ProductDetailPage
        product={activeProductStories[productSlug]}
        stories={activeProductStories}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
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
          <a href="#products">{isHindi ? 'Products' : 'Products'}</a>
          <a href="#achievements">{isHindi ? 'Milestones' : 'Achievements'}</a>
          <a href="#research">{isHindi ? 'Research' : 'Research'}</a>
          <a href="#founder">{isHindi ? 'Founder' : 'Founder'}</a>
          <a href="#partnerships">{isHindi ? 'Partnerships' : 'Partnerships'}</a>
          <a href="#investors">{isHindi ? 'Investors' : 'Investors'}</a>
          <a href="#contact">{isHindi ? 'Contact' : 'Contact'}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
          <a className="header-cta" href="#products">
            {isHindi ? 'Solutions देखें' : 'Explore Solutions'}
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{isHindi ? 'भारत से दुनिया के लिए people-first innovation' : 'People-first innovation from India for the world'}</p>
          <h1>{isHindi ? 'रोज़मर्रा की चुनौतियों को सार्थक डिजिटल समाधानों में बदलना' : 'Transforming Everyday Challenges into Meaningful Digital Solutions'}</h1>
          <p className="lead">
            {isHindi
              ? 'Rashi Bhartiya Innovation LLP वास्तविक मानवीय जरूरतों पर research करके communication, education, family wellness और hyperlocal services के लिए accessible, affordable और intelligent solutions विकसित करता है.'
              : 'Rashi Bhartiya Innovation LLP researches real human needs and develops accessible, affordable, and intelligent solutions for communication, education, family wellness, and hyperlocal services.'}
          </p>
          <div className="actions">
            <a className="button primary" href="#products">
              {isHindi ? 'हमारे Products देखें' : 'Explore Our Products'} <ArrowRight size={18} />
            </a>
          <a className="button secondary" href="#partnerships">
              {isHindi ? 'RBIL से जुड़ें' : 'Partner With Us'}
            </a>
          </div>
          <div className="visitor-counter" aria-live="polite">
            <span>{isHindi ? 'Public Visit Counter' : 'Public Visit Counter'}</span>
            {visitStatus === 'ready' && visitCount !== null ? (
              <strong>{new Intl.NumberFormat('en-IN').format(visitCount)}</strong>
            ) : (
              <strong className="counter-unavailable">Unavailable</strong>
            )}
            <small>
              {visitStatus === 'ready'
                ? isHindi ? 'Production database से confirmed total page visits.' : 'Total page visits confirmed by the production database.'
                : visitStatus === 'unconfigured'
                  ? isHindi ? 'Production counter API अभी connected नहीं है.' : 'Production counter API is not connected yet.'
                  : isHindi ? 'Counter service temporarily unavailable है.' : 'Counter service is temporarily unavailable.'}
            </small>
          </div>
          <div className="stamp" aria-label="Innovation commitment">
            <strong>{isHindi ? 'लोगों की वास्तविक समस्याओं पर research' : "Researching People's Real-Life Pain Points"}</strong>
            <span>{isHindi ? 'Root causes का analysis | Practical solutions का निर्माण' : 'Analysing root causes | Building practical solutions'}</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Rashi Bhartiya Innovation solution ecosystem">
          <div className="visual-core">
            <Sparkles size={30} />
            <span>{isHindi ? 'एक Vision' : 'One Vision'}</span>
            <strong>{isHindi ? 'चार Solutions' : 'Four Solutions'}</strong>
          </div>
          {displayProducts.map(({ name, category, accent, Icon }) => (
            <article className={`solution-node ${accent}`} key={name}>
              <Icon size={24} aria-hidden="true" />
              <span>{category}</span>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="explore-rbil" aria-labelledby="explore-rbil-title">
        <div className="explore-rbil-head">
          <div>
            <p className="eyebrow">{isHindi ? 'RBIL देखें' : 'Explore RBIL'}</p>
            <h2 id="explore-rbil-title">{isHindi ? 'कुछ सेकंड में सही जानकारी तक पहुंचें' : 'Find the Right Path in Seconds'}</h2>
          </div>
          <p>{isHindi ? 'हम कौन हैं, क्या बना रहे हैं, यह क्यों महत्वपूर्ण है, और आप कैसे जुड़ सकते हैं.' : 'Who we are, what we are building, why it matters, and how to connect.'}</p>
        </div>
        <div className="quick-link-rail" aria-label="Landing page quick navigation">
          {displayQuickLinks.map(({ title, text, href, Icon, featured }) => (
            <a className={`quick-link-card${featured ? ' investor-shortcut' : ''}`} href={href} key={title}>
              <Icon size={22} aria-hidden="true" />
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
              {featured ? <em>{isHindi ? 'Investor Opportunities देखें' : 'Explore Investor Opportunities'}</em> : null}
            </a>
          ))}
        </div>
      </section>

      <section className="principles" aria-label="Trust and purpose principles">
        {(isHindi
          ? [
              ['Human Problems First', 'हम शुरुआत लोगों की वास्तविक चुनौतियों से करते हैं.'],
              ['Research Before Development', 'हम needs, barriers और gaps को समझते हैं.'],
              ['Accessible by Design', 'हम inclusive और affordable solutions की दिशा में काम करते हैं.'],
              ['Built for Meaningful Scale', 'हम communities, institutions और public systems के लिए design करते हैं.'],
            ]
          : principles
        ).map(([title, body]) => (
          <article key={title}>
            <CheckCircle2 size={20} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section" id="products">
        <div className="section-head">
          <p className="eyebrow">{isHindi ? 'Product ecosystem' : 'Product ecosystem'}</p>
          <h2>{isHindi ? 'चार Solutions. एक Human-Centred Mission.' : 'Four Solutions. One Human-Centred Mission.'}</h2>
          <p>
            {isHindi
              ? 'हर product एक वास्तविक human problem से शुरू होता है और visitor को सही live solution तक ले जाता है.'
              : 'Each product starts with a human problem and guides visitors toward the right live solution without making the parent-company purpose disappear.'}
          </p>
        </div>
        <div className="product-grid">
          {displayProducts.map(({ id, name, category, hook, description, users, url, image, imageAlt, hackathon, accent, Icon }) => (
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
                <a href={`/?product=${id}`}>{isHindi ? 'और जानें' : 'Learn More'}</a>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {isHindi ? 'Product खोलें' : 'Open Product'} <ExternalLink size={15} />
                </a>
                {hackathon ? (
                  <a href={hackathon.videoUrl} target="_blank" rel="noopener noreferrer">
                    {isHindi ? '3-Minute Hackathon Demo देखें' : 'Watch 3-Minute Hackathon Demo'} <PlayCircle size={15} />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section achievements" id="achievements">
        <div className="section-head">
          <p className="eyebrow">{isHindi ? 'Achievements और recognition' : 'Achievements and recognition'}</p>
          <h2>{isHindi ? 'Gemini XPRIZE Hackathon 2026 Participation' : 'Gemini XPRIZE Hackathon 2026 Participation'}</h2>
          <p>
            {isHindi
              ? 'SabSewa Local और MAMAAI ने Gemini XPRIZE Hackathon 2026 में participation किया, जहां उनके three-minute project demonstration videos submit किए गए. यह statement केवल participation बताता है; इससे win, shortlist, award या endorsement imply नहीं होता.'
              : 'SabSewa Local and MAMAAI participated in the Gemini XPRIZE Hackathon 2026, where their three-minute project demonstration videos were submitted. This statement reflects participation only and does not imply that either project won, was shortlisted, received an award, or was officially endorsed by Gemini, Google, XPRIZE, or the Hackathon organisers.'}
          </p>
          <p className="channel-note">{isHindi ? 'Demo videos @AiKiDuniyaofficialpage YouTube channel से हैं.' : 'Demo videos are from the @AiKiDuniyaofficialpage YouTube channel.'}</p>
        </div>
        <div className="demo-grid">
          {displayHackathonProjects.map(({ name, description, hackathon, accent }) => (
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
                    {isHindi ? 'Demo देखें' : 'Watch Demo'} <ExternalLink size={14} />
                  </a>
                </div>
                <p>{description}</p>
                <p className="submitted-label">{hackathon?.submittedLabel}</p>
                <p className="disclaimer">
                  {isHindi
                    ? 'Demo video Hackathon के लिए submit किया गया. यह केवल participation wording है; Gemini, Google, XPRIZE या organisers की ओर से award, shortlist, endorsement या win का दावा नहीं है.'
                    : 'Demo video submitted for the Hackathon. Participation wording only; no award, shortlist, endorsement, or win is claimed here by Gemini, Google, XPRIZE, or the Hackathon organisers.'}
                </p>
                <a className="button secondary demo-button" href={hackathon?.videoUrl} target="_blank" rel="noopener noreferrer">
                  {isHindi ? '3-Minute Hackathon Demo देखें' : 'Watch 3-Minute Hackathon Demo'} <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section detail-pages" id="product-details">
        <div className="section-head">
          <p className="eyebrow">{isHindi ? 'Detailed product pages' : 'Detailed product pages'}</p>
          <h2>{isHindi ? 'Hackathon Demo Details' : 'Hackathon Demo Details'}</h2>
          <p>
            {isHindi
              ? 'ये detailed project sections visitors को MAMAAI और SabSewa Local submissions समझने में मदद करते हैं, बिना award status या official endorsement imply किए.'
              : 'These detailed project sections help visitors understand the MAMAAI and SabSewa Local submissions without implying award status or official endorsement.'}
          </p>
        </div>
        <div className="detail-grid">
          {displayHackathonProjects.map(({ name, hook, description, url, hackathon, accent }) => (
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
                    {isHindi ? 'Product खोलें' : 'Open Product'} <ExternalLink size={15} />
                  </a>
                  <a href={hackathon?.videoUrl} target="_blank" rel="noopener noreferrer">
                    {isHindi ? '3-Minute Hackathon Demo देखें' : 'Watch 3-Minute Hackathon Demo'} <PlayCircle size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="research">
        <div>
          <p className="eyebrow">{isHindi ? 'Research और innovation' : 'Research & innovation'}</p>
          <h2>{isHindi ? 'हम technology से नहीं, लोगों से शुरुआत करते हैं.' : 'We Do Not Start With Technology. We Start With People.'}</h2>
          <p>
            {isHindi
              ? 'Company digital solutions बनाने से पहले recurring difficulties, root causes, affordability barriers, accessibility needs, language context और practical adoption को समझती है.'
              : 'The company studies recurring difficulties, root causes, affordability barriers, accessibility needs, language context, and practical adoption before shaping digital solutions.'}
          </p>
          <div className="commitment">
            <ShieldCheck size={24} aria-hidden="true" />
            <strong>{isHindi ? 'स्पष्ट commitment' : 'Bold commitment'}</strong>
            <span>
              {isHindi
                ? 'हर initiative एक genuine human problem, disciplined research और practical, inclusive solution की खोज से शुरू होता है.'
                : 'Every initiative begins with a genuine human problem, disciplined research, and the search for a practical, inclusive solution.'}
            </span>
          </div>
        </div>
        <ol className="process">
          <li>
            <strong>{isHindi ? 'सुनना' : 'Listen'}</strong>
            <span>{isHindi ? 'लोगों और institutions की recurring difficulties पहचानना.' : 'Identify recurring difficulties faced by people and institutions.'}</span>
          </li>
          <li>
            <strong>{isHindi ? 'Research और Analyse' : 'Research & Analyse'}</strong>
            <span>{isHindi ? 'Root causes, existing solutions और user context समझना.' : 'Study root causes, existing solutions, and user context.'}</span>
          </li>
          <li>
            <strong>{isHindi ? 'Design और Validate' : 'Design & Validate'}</strong>
            <span>{isHindi ? 'Practical solutions बनाना और relevant users के साथ test करना.' : 'Develop practical solutions and test them with relevant users.'}</span>
          </li>
          <li>
            <strong>{isHindi ? 'Improve और Scale' : 'Improve & Scale'}</strong>
            <span>{isHindi ? 'Feedback और evidence से wider adoption को मजबूत करना.' : 'Use feedback and evidence to strengthen wider adoption.'}</span>
          </li>
        </ol>
      </section>

      <section className="section impact" id="impact">
        <div className="section-head">
          <p className="eyebrow">{isHindi ? 'Impact areas' : 'Impact areas'}</p>
          <h2>{isHindi ? 'Everyday outcomes के आसपास बनाया गया' : 'Built Around Everyday Outcomes'}</h2>
        </div>
        <div className="impact-grid">
          <span>{isHindi ? 'Inclusive communication और independent living' : 'Inclusive communication and independent living'}</span>
          <span>{isHindi ? 'Smarter academic planning और AI readiness' : 'Smarter academic planning and AI readiness'}</span>
          <span>{isHindi ? 'बेहतर family meal organisation और wellness awareness' : 'Better family meal organisation and wellness awareness'}</span>
          <span>{isHindi ? 'मजबूत neighbourhood economies और local livelihoods' : 'Stronger neighbourhood economies and local livelihoods'}</span>
        </div>
      </section>

      <section className="section founder-profile" id="founder">
        <div className="founder-photo-card">
          <img
            className="founder-photo"
            src="/founder-photo.png"
            alt="Rajesh Kumar Khare, Founder and Director of Rashi Bhartiya Innovation LLP"
          />
          <span>{isHindi ? 'Professional photograph' : 'Professional photograph'}</span>
        </div>
        <div className="founder-card">
          <div className="founder-mark">
            <UsersRound size={36} aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">{isHindi ? 'Founder Profile' : 'Founder&apos;s Profile'}</p>
            <h2>Rajesh Kumar Khare</h2>
            <p className="founder-role">{isHindi ? 'Founder और Director, Rashi Bhartiya Innovation LLP' : 'Founder and Director, Rashi Bhartiya Innovation LLP'}</p>
            <p>
              {isHindi
                ? 'Rajesh Kumar Khare Indian Air Force veteran हैं, जिनके पास 15 वर्ष की distinguished service और 40 वर्ष से अधिक social work तथा community engagement का अनुभव है. उनके विविध professional और social experience ने उन्हें ordinary people की real-life challenges और pain points की गहरी समझ दी है.'
                : 'Rajesh Kumar Khare is an Indian Air Force veteran with 15 years of distinguished service and more than 40 years of involvement in social work and community engagement. His diverse professional and social experience has given him a deep understanding of the real-life challenges and pain points faced by ordinary people.'}
            </p>
            <p>
              {isHindi
                ? '64 वर्ष की आयु में उन्होंने Artificial Intelligence की transformative potential को explore और समझना शुरू किया. 66 वर्ष की आयु तक उन्होंने लोगों की everyday problems के लिए practical, affordable और AI-powered application solutions विकसित करना शुरू किया.'
                : 'At the age of 64, he began exploring and understanding the transformative potential of Artificial Intelligence. By the age of 66, he started developing practical, affordable, and AI-powered application solutions to address people&apos;s everyday problems.'}
            </p>
            <div className="founder-belief">
              <SearchCheck size={22} aria-hidden="true" />
              <span>
                {isHindi
                  ? 'Company के innovations केवल technology से driven नहीं हैं. वे decades of real-world experience, communities के साथ close interaction, careful research and analysis, और masses के लिए simple, inclusive और affordable digital solutions बनाने की genuine commitment से आते हैं.'
                  : 'The company&apos;s innovations are not driven by technology alone. They originate from decades of real-world experience, close interaction with communities, careful research and analysis, and a genuine commitment to developing simple, inclusive, and affordable digital solutions for the masses.'}
              </span>
            </div>
            <a className="phone-link" href="tel:+918178113449">
              <Phone size={18} aria-hidden="true" />
              {isHindi ? 'Phone/WhatsApp' : 'Phone/WhatsApp'}: {founderPhone}
            </a>
          </div>
        </div>
      </section>

      <section className="section partnerships" id="partnerships">
        <div className="section-head">
          <p className="eyebrow">{isHindi ? 'Partnerships' : 'Partnerships'}</p>
          <h2>{isHindi ? 'आइए meaningful problems को साथ मिलकर solve करें.' : 'Let&apos;s Solve Meaningful Problems Together.'}</h2>
          <p>
            {isHindi
              ? 'Rashi Bhartiya Innovation LLP public-sector teams, schools, NGOs, research partners, investors, vendors और local ecosystem collaborators के साथ conversations का स्वागत करता है.'
              : 'Rashi Bhartiya Innovation LLP welcomes conversations with public-sector teams, schools, NGOs, research partners, investors, vendors, and local ecosystem collaborators.'}
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
              <span>{isHindi ? hiPartnerTitles[partner.title] : partner.title}</span>
              {partner.external ? <ExternalLink size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
            </a>
          ))}
        </div>
      </section>

      <InvestorEntrySection language={language} />

      <section className="section contact" id="contact">
        <div>
          <p className="eyebrow">{isHindi ? 'Contact' : 'Contact'}</p>
          <h2>{isHindi ? 'बेहतर future आज लोगों की problems solve करने से शुरू होता है.' : 'A Better Future Begins by Solving the Problems People Face Today.'}</h2>
          <p>
            {isHindi
              ? 'Suggestions, partnership enquiries, product-demo requests और general questions सीधे official email या नीचे दिए गए form से भेजे जा सकते हैं.'
              : 'This first release includes the approved registered address and a ready contact-form layout. Suggestions, partnership enquiries, and product-demo requests can also be sent directly by email.'}
          </p>
          <a className="email-link" href={`mailto:${rbilOfficialEmail}`}>
            <Mail size={18} aria-hidden="true" />
            {isHindi ? 'Official email' : 'Official email'}: {rbilOfficialEmail}
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
            {isHindi ? 'Phone/WhatsApp' : 'Phone/WhatsApp'}: {founderPhone}
          </a>
        </div>
        <form onSubmit={handleContactSubmit}>
          <label>
            {isHindi ? 'पूरा नाम' : 'Full name'}
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            {isHindi ? 'Organisation' : 'Organisation'}
            <input type="text" name="organisation" autoComplete="organization" />
          </label>
          <label>
            {isHindi ? 'Country' : 'Country'}
            <input type="text" name="country" autoComplete="country-name" required />
          </label>
          <label>
            {isHindi ? 'Email' : 'Email'}
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            {isHindi ? 'Area of interest' : 'Area of interest'}
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
            {isHindi ? 'Message' : 'Message'}
            <textarea name="message" rows={4} required />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            <span>{isHindi ? 'मैं इस enquiry के बारे में contact किए जाने की सहमति देता/देती हूं.' : 'I consent to being contacted about this enquiry.'}</span>
          </label>
          <button type="submit">{isHindi ? 'Conversation Request करें' : 'Request a Conversation'}</button>
          {contactSubmitted ? (
            <p className="success-message">
              <CheckCircle2 size={18} aria-hidden="true" />
              {isHindi
                ? 'RBIL से संपर्क करने के लिए धन्यवाद. आपका question हमारी team को मिल गया है. हम आपके दिए गए email address पर जवाब देंगे.'
                : 'Thank you for contacting RBIL. Your question has been received by our team. We will respond to the email address provided by you.'}
            </p>
          ) : null}
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
              <small>{isHindi ? 'Innovation rooted in real human needs.' : 'Innovation rooted in real human needs.'}</small>
            </span>
          </a>
          <p>
            {isHindi ? 'Registered address' : 'Registered address'}: Plot No. 1040/29, Flat No.-201, Gali No.-10, Krishna Colony,
            Gurugram -122001 Haryana.
          </p>
          <p>{isHindi ? 'Phone/WhatsApp' : 'Phone/WhatsApp'}: {founderPhone}</p>
          <p>
            {isHindi ? 'Suggestions' : 'Suggestions'}:{' '}
            <a href={`mailto:${rbilOfficialEmail}`}>{rbilOfficialEmail}</a>
          </p>
          <p className="muted">
            {isHindi
              ? 'Registration details, legal text और social links company approval के बाद add किए जाने चाहिए.'
              : 'Registration details, legal text, and social links should be added after company approval.'}
          </p>
        </div>
        <div className="footer-links">
          <a href="#products">{isHindi ? 'Products' : 'Products'}</a>
          <a href="#research">{isHindi ? 'Research' : 'Research'}</a>
          <a href="#contact">{isHindi ? 'Contact' : 'Contact'}</a>
          <a href="#investors">Investor Relations</a>
          <a href="#privacy">{isHindi ? 'Privacy' : 'Privacy'}</a>
          <a href="#terms">{isHindi ? 'Terms' : 'Terms'}</a>
          <a href="#accessibility">{isHindi ? 'Accessibility' : 'Accessibility'}</a>
        </div>
        <p className="muted full">
          {isHindi
            ? 'Product availability और features region तथा development stage के अनुसार बदल सकते हैं. Copyright 2026.'
            : 'Product availability and features may vary by region and development stage. Copyright 2026.'}
        </p>
      </footer>
    </main>
  );
}

function ProductDetailPage({
  product,
  stories,
  language,
  onLanguageChange,
}: {
  product: ProductStory;
  stories: Record<string, ProductStory>;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const isHindi = language === 'hi';
  const otherProducts = Object.entries(stories).filter(([, item]) => item.name !== product.name);
  const Icon = product.Icon;

  return (
    <main className={`product-detail-page ${product.accent}`}>
      <header className="product-detail-header">
        <a className="back-link" href="/">
          {isHindi ? 'RBIL पर वापस जाएं' : 'Back to RBIL'}
        </a>
        <nav aria-label="Other RBIL products">
          {otherProducts.map(([slug, item]) => (
            <a href={`/?product=${slug}`} key={slug}>
              {item.name}
            </a>
          ))}
        </nav>
        <LanguageSwitcher
          language={language}
          onLanguageChange={onLanguageChange}
          className="product-language"
        />
      </header>

      <section className="product-detail-hero">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="lead">{product.intro}</p>
          <div className="actions">
            <a className="button primary" href={product.url} target="_blank" rel="noopener noreferrer">
              {isHindi ? 'Product देखें' : 'Visit Product'} <ExternalLink size={18} />
            </a>
            <a className="button secondary" href="#features">
              {isHindi ? 'Features देखें' : 'Explore Features'}
            </a>
            <a className="button secondary" href="/#partnerships">
              {isHindi ? 'Partner With Us' : 'Partner With Us'}
            </a>
            <a className="button secondary" href="/#investors">
              {isHindi ? 'Investor Relations' : 'Investor Relations'}
            </a>
          </div>
        </div>
        <div className="product-story-card">
          <Icon size={40} aria-hidden="true" />
          <img src={product.image} alt={`${product.name} product preview`} />
          <strong>
            {isHindi
              ? 'समस्या - हमने क्यों बनाया - हमारा समाधान - भविष्य की दृष्टि'
              : 'The Problem - Why We Created It - Our Solution - Future Vision'}
          </strong>
        </div>
      </section>

      <section className="product-story-grid" id="features">
        {product.sections.map(([title, text]) => (
          <article key={title}>
            <Icon size={24} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="india-global-impact">
        <div>
          <p className="eyebrow">{isHindi ? 'भारत में निर्मित. व्यापक प्रभाव के लिए तैयार.' : 'Built in India. Designed for Wider Impact.'}</p>
          <h2>{isHindi ? `${product.name} एक वास्तविक मानवीय जरूरत से शुरू होता है` : `${product.name} Starts With a Real Human Need`}</h2>
        </div>
        <div className="impact-columns">
          <article>
            <h3>{isHindi ? 'भारत में प्रासंगिकता' : 'India Relevance'}</h3>
            <p>
              {isHindi
                ? 'RBIL भारतीय वास्तविकताओं से निर्माण कर रहा है: विविध languages, family structures, education systems, accessibility needs, local businesses, budgets और everyday adoption challenges.'
                : 'RBIL is building from Indian realities: diverse languages, family structures, education systems, accessibility needs, local businesses, budgets and everyday adoption challenges.'}
            </p>
          </article>
          <article>
            <h3>{isHindi ? 'व्यापक अनुकूलन' : 'Wider Adaptability'}</h3>
            <p>
              {isHindi
                ? 'Underlying problem internationally भी मौजूद हो सकता है. Platform को different countries, languages, cultures, education systems, food habits, accessibility requirements और local-commerce ecosystems के अनुसार adapt किया जा सकता है.'
                : 'The underlying problem can also exist internationally. The platform may be adapted for different countries, languages, cultures, education systems, food habits, accessibility requirements and local-commerce ecosystems.'}
            </p>
          </article>
        </div>
      </section>

      <section className="product-detail-cta">
        <h2>{isHindi ? 'Curiosity को conversation में बदलें' : 'Turn Curiosity Into a Conversation'}</h2>
        <p>
          {isHindi
            ? 'RBIL users, schools, public-sector teams, institutions, local-business partners, strategic collaborators और screened investors के साथ meaningful conversations का स्वागत करता है.'
            : 'RBIL welcomes thoughtful conversations with users, schools, public-sector teams, institutions, local-business partners, strategic collaborators and screened investors.'}
        </p>
        <div className="actions">
          <a className="button primary" href={product.url} target="_blank" rel="noopener noreferrer">
            {isHindi ? 'Product देखें' : 'Visit Product'} <ExternalLink size={18} />
          </a>
          <a className="button secondary" href="/#contact">
            {isHindi ? 'RBIL से संपर्क करें' : 'Connect With RBIL'}
          </a>
          <a className="button secondary" href="/#investors">
            Investor Relations
          </a>
        </div>
      </section>
    </main>
  );
}
