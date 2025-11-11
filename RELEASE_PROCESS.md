# MuTTE Release Process

1. Ensure `main` is green: CI passing, no open critical bugs.
2. Update version in `package.json` following SemVer.
3. Generate changelog from merged PR titles.
4. Create a git tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.
5. Create GitHub Release from tag with notes.
6. If publishing Docker images (future), build and push images.
7. Announce release in README badges and discussions (optional).

## Versioning
- PATCH: bug fixes and test-only changes.
- MINOR: backwards-compatible features.
- MAJOR: breaking changes documented with migration notes.
