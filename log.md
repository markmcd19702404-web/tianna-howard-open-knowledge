# Bundle Update Log

## 2026-09-14: Discovery and site audit

* Live technical crawl: all 22 sitemap URLs returned HTTP 200, were indexable, had self-referencing canonicals, and had no critical/high audit issues.
* Search Console, settled 2026-08-15 through 2026-09-11: Knowledge Centre URLs recorded 184 impressions and 1 click across 8 landing pages. The Mask of a Faun history page recorded the click. The historical-mysteries comparison guide recorded 3 impressions, so its earlier unknown/discovered status is no longer the only available evidence.
* Sitemap fetched by Google on 2026-09-12 with zero warnings/errors. Its indexed-count field still says zero, contradicting the page-level search evidence; do not report the entire site as unindexed on that basis.
* Corrected all four VideoObject entries: removed YouTube watch-page URLs from contentUrl (which requires direct video bytes) and matched embedUrl to the actual privacy-enhanced iframe player. Corrected the page generator to prevent regression.
* Added explicit keyboard focus outlines, including high-contrast header/footer styling, and respected prefers-reduced-motion for smooth scrolling.
* Updated lastmod only for the four video pages whose structured data changed.
* Pre-publication validation: all 23 HTML JSON-LD blocks parse; 316 local link/asset references resolve in the repository; 22 unique sitemap URLs; current public-knowledge JSON parses and lists legacy Beale identifiers only as exclusions. No book identities, promotional wording, publication status, prices, ads or billing changed.
* Audit heuristics calling Article image and Organization logo universally required were not treated as authoritative. No arbitrary word-count padding or title shortening was applied.
* Next priority: evaluate descriptive, evidence-led images for the history/reading guides using existing approved or properly licensed assets. New candidate public prose or imagery still requires approval.
* Sources: https://developers.google.com/search/docs/appearance/structured-data/video ; https://developers.google.com/search/docs/appearance/structured-data/article ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap ; https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html ; https://www.w3.org/WAI/WCAG22/Techniques/css/C39

## 2026-09-02

* **Creation**: Created the separate OKF v0.2 bundle from the public knowledge catalogue.
* **Validation**: Checked YAML frontmatter, required concept types, reserved files and internal links.
