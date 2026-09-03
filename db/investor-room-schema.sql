-- RBIL Private Investor Room production schema draft.
-- Use UUID primary keys in the production database. Do not store secrets in these tables.

CREATE TABLE investor_profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  mobile TEXT,
  country TEXT,
  city TEXT,
  linkedin_url TEXT,
  organisation TEXT,
  designation TEXT,
  investor_type TEXT NOT NULL,
  status TEXT NOT NULL,
  access_level INTEGER NOT NULL DEFAULT 0,
  role TEXT NOT NULL DEFAULT 'pending_investor',
  last_login_at TEXT,
  access_valid_until TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_by TEXT
);

CREATE TABLE investor_access_requests (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  investment_capacity TEXT NOT NULL,
  interested_projects TEXT NOT NULL,
  previous_startup_investments TEXT,
  typical_ticket_size TEXT,
  previous_sectors TEXT,
  investment_countries TEXT,
  investing_mode TEXT,
  message TEXT NOT NULL,
  risk_flags TEXT,
  user_agent TEXT,
  ip_address TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE investor_consents (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  consent_version TEXT NOT NULL,
  confidentiality_accepted_at TEXT NOT NULL,
  no_offer_acknowledged_at TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE investor_sessions (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  session_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE investor_documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  minimum_access_level INTEGER NOT NULL,
  view_only INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_by TEXT
);

CREATE TABLE investor_document_permissions (
  id TEXT PRIMARY KEY,
  document_id TEXT NOT NULL REFERENCES investor_documents(id),
  investor_id TEXT REFERENCES investor_profiles(id),
  access_level INTEGER,
  can_download INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT,
  created_at TEXT NOT NULL,
  created_by TEXT
);

CREATE TABLE investor_document_views (
  id TEXT PRIMARY KEY,
  document_id TEXT NOT NULL REFERENCES investor_documents(id),
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  action TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE investor_opportunities (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  opportunity_code TEXT NOT NULL UNIQUE,
  proposed_investment_usd INTEGER,
  indicative_valuation_usd INTEGER,
  proposed_economic_interest TEXT,
  project_scope TEXT,
  strategic_rights TEXT,
  milestones TEXT,
  expires_at TEXT,
  admin_note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_by TEXT
);

CREATE TABLE investor_questions (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE investor_meetings (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  preferred_date TEXT,
  preferred_time TEXT,
  timezone TEXT,
  contact_preference TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'requested',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE investor_pipeline (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  stage TEXT NOT NULL,
  score INTEGER,
  follow_up_status TEXT,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);

CREATE TABLE investor_admin_notes (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investor_profiles(id),
  note TEXT NOT NULL,
  created_at TEXT NOT NULL,
  created_by TEXT
);

CREATE TABLE investor_audit_logs (
  id TEXT PRIMARY KEY,
  investor_id TEXT REFERENCES investor_profiles(id),
  actor_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE investment_settings (
  id TEXT PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);

CREATE TABLE valuation_scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  pre_money_valuation_usd INTEGER NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_by TEXT
);

CREATE TABLE fund_use_categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);

CREATE INDEX idx_investor_profiles_status ON investor_profiles(status);
CREATE INDEX idx_investor_profiles_access_level ON investor_profiles(access_level);
CREATE INDEX idx_investor_documents_level ON investor_documents(minimum_access_level);
CREATE INDEX idx_investor_audit_logs_investor_created ON investor_audit_logs(investor_id, created_at);
CREATE INDEX idx_investor_pipeline_stage ON investor_pipeline(stage);

PRAGMA optimize;
