# Contributing to MuTTE

Thanks for your interest in contributing! MuTTE is a transactional email API focused on multi-tenant reliability and clarity. We welcome improvements across code, docs, tests, performance, and security.

## Ground Rules
- Be respectful and concise.
- Favor small, focused pull requests.
- Add or update tests when changing behavior.
- Avoid introducing heavy dependencies without prior discussion.

## Getting Started
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/short-description`.
3. Install dependencies: `npm install`.
4. Run tests: `npm test`.
5. Make changes (include docs updates when relevant).
6. Ensure lint passes: `npm run lint`.
7. Open a Pull Request.

## Pull Request Checklist
- [ ] Title follows conventional commits (e.g., `feat:`, `fix:`, `docs:`).
- [ ] Tests added/updated.
- [ ] CI passes locally (`npm test`).
- [ ] README / docs updated if needed.
- [ ] No secret keys or credentials included.

## Code Style
- TypeScript strict mode.
- Prefer small pure functions.
- Use async/await; avoid nested callbacks.
- Centralize error handling.

## Testing
- Unit tests for utilities and controllers.
- Integration tests for critical routes (`/send`, `/tenants`).
- Edge cases: invalid credentials, rate limit exceeded, malformed JSON.

## Issue Labels
- `bug`: Incorrect behavior.
- `enhancement`: New capability.
- `documentation`: Docs only.
- `good first issue`: Suitable for newcomers.
- `help wanted`: Maintainers need assistance.

## Review Process
1. Automated CI runs (lint, tests, security scan).
2. A maintainer reviews for clarity, scope, and impact.
3. Feedback may request changes.
4. Merge requires at least one maintainer approval.

## Response Times
- Issues: within 3–5 days.
- Pull Requests: initial review within 5 days.

## Security
Found a vulnerability? Please open a private security advisory or email the maintainer rather than a public issue.

## Release Strategy
- Semantic versioning: MAJOR.MINOR.PATCH.
- Changelog generated from merged PR titles.

## Community Conduct
Follow the standard open-source code of conduct. Be constructive; attack problems, not people.

## Questions?
Open a discussion or issue labeled `question`.

Thanks again — your contributions make MuTTE better for everyone! 🎉
