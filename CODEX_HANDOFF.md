# CODEX Handoff Notes

## Current Focus
- Phase 1 refactor underway: new `src/` spine, shared routing/auth utilities, and catalog/admin service layers now in place.

## Key Findings
- docs/CODEX_ORCHESTRATION.md and WEBSITE_AUDIT_REPORT.md are still missing—blocking completion of the "Preexisting Audit" summary and any manual-driven steps.
- `/products` now relies on newly factored catalog components and `src/api/tripService.ts`; ensure visual/UX expectations still align with stakeholders.
- Admin dashboard authorization flows moved into `AppRouter` + `ProtectedRoute`; admin API endpoints assumed to exist and respond as previously.

## Next Steps
1. Source or recreate the orchestration manual and audit report so documentation obligations can be satisfied.
2. Expand logger adoption to any remaining areas (e.g., background jobs) and decide whether to wire a real Supabase client if/when dependency is added.
3. Validate catalog refactor with design/product owners and extend `src/components` folders (common/booking/admin) as new migrations occur.
4. Continue Phase 1 by migrating additional data-fetching logic into `src/api/*Service.ts` modules and decomposing other large components as identified.
5. Maintain STATUS/RUNLOG/HANDOFF updates and prepare incremental PRs for subsequent spine refactors.
