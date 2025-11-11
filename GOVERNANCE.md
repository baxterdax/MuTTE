# MuTTE Governance

MuTTE is maintained under a lightweight governance model to balance momentum and quality.

## Roles
- Maintainers: Review PRs, triage issues, cut releases, uphold standards.
- Contributors: Submit PRs and issues.
- Users: Provide feedback and participate in discussions.

## Decision Making
- Day-to-day technical decisions are made via PR reviews.
- Larger changes (APIs, dependencies, architecture) require an RFC-style issue labeled `proposal` and consensus from maintainers.

## Branching Strategy
- `main`: Always releasable. Protected branch.
- Feature branches: `feat/*`, `fix/*`, `docs/*`.

## Branch Protection Rules (recommended)
- Require PR reviews (1+ maintainer).
- Require status checks (CI passing).
- Linear history preferred (squash merge).

## Releases
- Semantic versioning.
- Tag releases `vX.Y.Z`.
- Release notes summarizing features, fixes, and breaking changes.

## Security Policy
- Vulnerabilities reported privately.
- Security fixes prioritized and backported when feasible.

## Code of Conduct
- Be respectful and collaborative.
- Assume good intent; prefer data over opinion.

## Stepping Up as a Maintainer
- Consistent quality contributions.
- Active participation in reviews.
- Invitation extended by existing maintainers.

This governance model evolves with the project. Suggestions welcome via issues.
