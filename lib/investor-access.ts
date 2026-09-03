export type InvestorStatus = 'submitted' | 'under_review' | 'approved' | 'active' | 'rejected' | 'suspended' | 'revoked';
export type InvestorRole = 'anonymous' | 'pending_investor' | 'approved_investor' | 'investor_admin' | 'super_admin';

export type InvestorAccessContext = {
  role: InvestorRole;
  status: InvestorStatus;
  level: 0 | 1 | 2 | 3 | 4;
  sessionRevoked?: boolean;
};

export type ProtectedResource = {
  route: string;
  requiredLevel?: 1 | 2 | 3 | 4;
  adminOnly?: boolean;
  ownerInvestorId?: string;
};

export function canAccessInvestorRoom(context: InvestorAccessContext) {
  return (
    context.role === 'approved_investor' &&
    context.status === 'active' &&
    context.level >= 1 &&
    !context.sessionRevoked
  );
}

export function canAccessAdmin(context: InvestorAccessContext) {
  return (
    (context.role === 'investor_admin' || context.role === 'super_admin') &&
    context.status === 'active' &&
    !context.sessionRevoked
  );
}

export function canAccessResource(
  context: InvestorAccessContext,
  resource: ProtectedResource,
  currentInvestorId?: string,
) {
  if (resource.adminOnly) {
    return canAccessAdmin(context);
  }

  if (!canAccessInvestorRoom(context)) {
    return false;
  }

  if (resource.requiredLevel && context.level < resource.requiredLevel) {
    return false;
  }

  if (resource.ownerInvestorId && resource.ownerInvestorId !== currentInvestorId) {
    return false;
  }

  return true;
}

export function indicativePostMoneyPercentage(investmentUsd: number, preMoneyUsd = 12_000_000) {
  if (!Number.isFinite(investmentUsd) || investmentUsd <= 0 || preMoneyUsd <= 0) {
    return 0;
  }

  return (investmentUsd / (preMoneyUsd + investmentUsd)) * 100;
}
