---
type: "Reference"
title: "OKF v0.2 bundle conformance"
description: "Scope, generation method and validation requirements for this bundle."
resource: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md"
tags: ["okf", "conformance", "validation"]
status: stable
generated:
  by: process:catalog-to-okf
  at: 2026-09-02T00:00:00Z
---
# Target specification

This bundle targets Open Knowledge Format v0.2.

# Separation boundary

The bundle is self-contained inside the `okf/` directory. It is not part of the Firebase `dist/` directory and does not alter any deployed Knowledge Centre page.

# Validation

Run `python tools/validate_okf.py` from the bundle root. The validator checks:

* parseable YAML frontmatter on every concept document
* a non-empty `type` field on every concept document
* the root `okf_version` declaration
* reserved `index.md` and `log.md` structure
* timestamps and lifecycle values used by v0.2
* internal Markdown links and bundle-relative source paths
