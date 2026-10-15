# Tenderfy: Cross-portal open questions

These are the open questions the three portal documentation sets do not yet capture, beyond the per-portal "this capability is faked, how does the real backend work?" list. They came out of an LLM-council review (11 Oct 2026) of the full Subbies, Business Admin and Super Admin doc sets.

They span all three portals, so they do not belong to any single Stories doc. Answer the "transaction and data model" group before any real build: every faked capability in the existing docs writes into that schema.

## Transaction and data model (answer first)
1. Is a submitted quote a mutable record or an immutable snapshot? Can a subbie edit or withdraw it after award?
2. Is an awarded quote a binding offer or subcontract under Australian contract law? Where do terms and dispute handling live?
3. Canonical entities: is a subbie a user, a company, or both? One ABN quoting to many contractors: one record or many?
4. Single source of truth: does "awarded" live on the deal, the quote, or both, and who writes it?
5. Conflict resolution when the portals disagree (for example a subbie withdraws at the same instant a contractor awards).
6. Rounding rule (per line or per total) once a contractor has awarded off a displayed number.

## Permissions and multi-tenancy
7. Multiple users per company with roles: who can award, who can edit a tender, and how are concurrent edits handled (locking or last write wins).
8. Tenant isolation: can Contractor A see that Subbie X also quotes for Contractor B? Is a subbie's profile, file library and Ray history shared across contractors or walled off per relationship?
9. Who are the Super Admin users? Tenderfy staff roles, support impersonation, and the scope of their access to customer data.

## Compliance and trust
10. Data ownership on churn: cached insurance and licence documents, revocation, Privacy Act 1988 / APP obligations, and delete on account close.
11. Stale verification: an ABN deregistered or an insurance certificate expired after a one-time check. Who is liable when Tenderfy showed the subbie as "verified"?
12. Email and SMS as a system: deliverability, bounces, Spam Act 2003 consent and unsubscribe, nudge opt-out, and who is told what and when.
13. File-upload trust: virus scanning, size limits, and document rendering.
14. Audit, retention and Australian data residency, including how long dispute evidence is kept.

## Lifecycle and cost
15. The clock: quote validity and expiry, due dates passing, and timezones.
16. Reversibility and mid-deal state changes: can an award be undone; what happens to a subbie's live quotes (and the Ray documents they built) when their account is suspended or downgraded.
17. Cold start: the empty portal for the first real user, and the invited subbie who has no account yet.

## Parked (strategic, revisit after v1)
These are upside and network-effect questions. Capture them, but they presuppose a defined quote and identity model, so they are not build-blocking.

- Benchmarked pricing-data product built from aggregate quote data.
- Ray doing the work (drafting quotes and tenders, chasing subbies), not only drafting documents.
- Subbie discovery and a verified supply-chain graph.
- Cross-side pricing: a take-rate on awarded value, or contractor seats, instead of gating only subbies.
- Portable subbie reputation as an anti-churn asset.
- Who the paying customer really is, given contractors generate the quote requests that make the platform valuable.
- Horizontal reach beyond Australian construction (any RFQ-driven trade).
