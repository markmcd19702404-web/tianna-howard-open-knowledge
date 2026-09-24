# Bundle Update Log

## 2026-09-24: Publication verification and authority opportunity

* Metricool post `379776375`, Facebook: PUBLISHED at 12:00 Asia/Shanghai on 23 September 2026. Live URL: https://facebook.com/122196727094931842/posts/122197422656931842
* Metricool post `379777159`, TikTok: FAILED at its scheduled time of 10:00 Asia/Shanghai on 23 September 2026. TikTok rejected the 1280 x 2048 JPEG because both dimensions must not exceed Metricool's 1080-pixel limit for this route. Do not retry this cover-only creative.
* Vetted Reading With Your Kids as a zero-cost interview opportunity. Its guest page openly welcomes children's authors without a fee, and its feed remained active in September 2026 with current middle-grade author interviews.
* Prepared a tailored pitch about using the Beale mystery to help readers distinguish evidence from legend, supported by the free cipher activity pack. The draft is queued privately and was not sent because the authorised Tianna Spacemail route is unavailable.
* Sources: https://readingwithyourkids.com/guests/ ; https://readingwithyourkids.libsyn.com/

## 2026-09-22: Beale evidence and activity-pack discovery package

* Metricool comparison used post-level data for 22 August to 22 September. The brand was only connected on 19 September, so older YouTube fields and some reach fields remain incomplete and were not treated as zero performance.
* TikTok: the Beale history photo was the strongest comparable post in the available sample, with 31 views, 1 like and 1 comment. The Beale paperback video recorded 30 views. Instagram: the Beale paperback Reel recorded 17 views, 15 reach and 1 like. Facebook: the Monuments Men history series produced small but consistent interactions, while link-led posts remained suitable for directing readers to evidence pages.
* Selected topic: what the solved Beale cipher proves, and what it does not prove.
* Improved the public Beale cipher guide with a checkable-evidence section, an explicit limit on what the NSA archive authenticates, a current modified date and a direct link to the free cipher activity. Commit: `75728ba4c69f11be49d88918cbe68fbe90b8215f`.
* Scheduled an adapted BookTok photo post using the approved Book 1 cover for 23 September at 10:00 Asia/Shanghai. Metricool ID: `379777159`. It carries the own-brand commercial disclosure and remains pending.
* Scheduled a Facebook evidence post linking to the guide for 23 September at 12:00 Asia/Shanghai. Metricool ID: `379776375`. It remains pending.
* Chosen hours came from Metricool's current network heatmaps. Instagram and YouTube were not used for this package because the available data was too thin to justify near-duplicate posting, and no approved 15 to 45 second vertical video matched this exact evidence-led hook.
* Factual source: https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/Historical-Releases/Beale-Papers/

## 2026-09-21: Video sitemap discovery data

* Added Google's video sitemap extension to the existing sitemap for the four published history-video pages.
* Reused the titles, descriptions, YouTube player URLs, thumbnails, durations and publication dates already shown in each page's validated `VideoObject` data. No new claims or media were introduced.
* Validated the sitemap as XML, confirmed all four entries contain Google's required video fields, parsed every JSON-LD block, checked every local page link and reran the OKF validator.

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
