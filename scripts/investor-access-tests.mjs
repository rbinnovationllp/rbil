import assert from 'node:assert/strict';

function canAccessInvestorRoom(context) {
  return (
    context.role === 'approved_investor' &&
    context.status === 'active' &&
    context.level >= 1 &&
    !context.sessionRevoked
  );
}

function canAccessAdmin(context) {
  return (
    (context.role === 'investor_admin' || context.role === 'super_admin') &&
    context.status === 'active' &&
    !context.sessionRevoked
  );
}

function canAccessResource(context, resource, currentInvestorId) {
  if (resource.adminOnly) return canAccessAdmin(context);
  if (!canAccessInvestorRoom(context)) return false;
  if (resource.requiredLevel && context.level < resource.requiredLevel) return false;
  if (resource.ownerInvestorId && resource.ownerInvestorId !== currentInvestorId) return false;
  return true;
}

assert.equal(canAccessInvestorRoom({ role: 'anonymous', status: 'submitted', level: 0 }), false);
assert.equal(canAccessInvestorRoom({ role: 'pending_investor', status: 'under_review', level: 0 }), false);
assert.equal(canAccessInvestorRoom({ role: 'pending_investor', status: 'rejected', level: 0 }), false);
assert.equal(canAccessInvestorRoom({ role: 'approved_investor', status: 'suspended', level: 3 }), false);
assert.equal(canAccessResource({ role: 'approved_investor', status: 'active', level: 1 }, { route: '/investor/data-room/doc-3', requiredLevel: 3 }), false);
assert.equal(canAccessResource({ role: 'approved_investor', status: 'active', level: 3 }, { route: '/investor/opportunity/RBIL-INV-2026-002', ownerInvestorId: 'investor-b' }, 'investor-a'), false);
assert.equal(canAccessResource({ role: 'approved_investor', status: 'active', level: 3, sessionRevoked: true }, { route: '/investor/dashboard' }), false);
assert.equal(canAccessResource({ role: 'approved_investor', status: 'active', level: 4 }, { route: '/admin/investors', adminOnly: true }), false);
assert.equal(canAccessResource({ role: 'investor_admin', status: 'active', level: 4 }, { route: '/admin/investors', adminOnly: true }), true);

console.log('Investor access-control tests passed.');
