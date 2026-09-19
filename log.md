# Bundle Update Log

## 2026-09-19: Automation and connector status

* ChatGPT GitHub access is confirmed for this repository, with read/write permissions available for safe, reversible Knowledge Centre maintenance.
* Metricool is connected to the Tianna Howard Adventures brand. Connected networks include Facebook, Instagram, TikTok and YouTube. The Content Marketing automation now checks Metricool analytics before choosing its highest-value action and treats newly connected or lagging zero values cautiously.
* Five active marketing automations now cover Discovery & Site, Content Marketing, Authority & Outreach, Publishing Intelligence and Marketing Director functions, with specialist Amazon Ads analysis, reader-funnel review and history-content work folded into the existing task limit.
* Amazon Ads remains semi-manual. No Amazon Ads plugin is currently available in the connected ChatGPT plugin directory, so campaign changes and reporting must not be represented as directly connected. Do not pursue Amazon Attribution or direct-advertiser API registration merely to supply this workflow.
* GSC Wizard is not active because its trial has ended and it requires a paid subscription. Under the zero-spend rule, do not subscribe without explicit approval.
* No Spacemail connector is available in the current ChatGPT plugin directory. Authority & Outreach should research and prepare/queue outreach rather than substitute Gmail automatically. Do not expose mailbox credentials to an unapproved third-party bridge.
* Automation guardrails remain: zero spend without explicit approval, no Amazon Ads/KDP/billing/distribution changes, no spam/community posting, approved assets only, protect unpublished Book 3/4 material, and keep an audit trail.

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
