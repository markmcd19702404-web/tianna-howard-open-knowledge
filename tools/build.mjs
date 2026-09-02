import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const bundle = path.resolve(toolDir, '..');
const workspace = path.resolve(bundle, '..');
const sourcePath = path.join(workspace, 'tianna-knowledge-site', 'dist', 'public-knowledge.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const generatedAt = '2026-09-02T00:00:00Z';
const sourceResource = '/references/public-knowledge-export.json';
const knowledgeBase = 'https://knowledge.tiannahowardadventures.com';

const pageSlugs = {
  'book.beale_treasure': 'beale-treasure',
  'book.mask_of_a_faun': 'mask-of-a-faun',
  'book.lost_inca_gold': 'lost-inca-gold',
  'book.vanishing_crown_jewels': 'vanishing-crown-jewels'
};

const yamlString = (value) => JSON.stringify(String(value));
const yamlList = (values) => `[${values.map(yamlString).join(', ')}]`;

function frontmatter({ type, title, description, resource, tags, status = 'stable', sources = true }) {
  const lines = [
    '---',
    `type: ${yamlString(type)}`,
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    ...(resource ? [`resource: ${yamlString(resource)}`] : []),
    `tags: ${yamlList(tags)}`,
    `status: ${status}`,
    'generated:',
    '  by: process:catalog-to-okf',
    `  at: ${generatedAt}`
  ];
  if (sources) {
    lines.push(
      'sources:',
      '  - id: canonical-catalogue',
      `    resource: ${sourceResource}`,
      '    title: "Tianna Howard public knowledge export"',
      '    author: human:ml-woodward',
      `    last_modified: ${generatedAt}`
    );
  }
  lines.push('---', '');
  return lines.join('\n');
}

function write(relativePath, content) {
  const target = path.join(bundle, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${content.trimEnd()}\n`, 'utf8');
}

const entities = Object.fromEntries(source.entities.map((entity) => [entity.id, entity]));
const series = entities['series.tianna_howard_adventures'];
const books = source.entities.filter((entity) => entity.type === 'Book').sort((a, b) => a.series_position - b.series_position);

write('index.md', `---
okf_version: "0.2"
---

# Tianna Howard Adventures Open Knowledge Bundle

This bundle presents the public, spoiler-safe catalogue for M.L. Woodward and the Tianna Howard Adventures in Google Open Knowledge Format v0.2.

## Core concepts

* [M.L. Woodward](/author/ml-woodward.md) - Author of the Tianna Howard Adventures.
* [Tianna Howard Adventures](/series/tianna-howard-adventures.md) - Historical fiction mysteries for readers aged 11–14.
* [Books](/books/) - Published and announced books in series order.
* [Series facts](/answers/series-facts.md) - Concise answers to common questions.
* [Content boundaries](/policies/content-boundaries.md) - Rules separating verified history, fiction and unpublished material.
* [Official identities](/discovery/official-identities.md) - Canonical website, catalogue and profile links.

## Provenance

* [Source snapshot](/references/) - The public knowledge export used to generate this bundle.
* [Bundle conformance](/conformance.md) - Scope and validation details.
* [Update log](/log.md) - Bundle history.`);

write('log.md', `# Bundle Update Log

## 2026-09-02

* **Creation**: Created the separate OKF v0.2 bundle from the public knowledge catalogue.
* **Validation**: Checked YAML frontmatter, required concept types, reserved files and internal links.`);

write('author/index.md', `# Author

* [M.L. Woodward](ml-woodward.md) - Author of the Tianna Howard Adventures.`);

write('author/ml-woodward.md', `${frontmatter({
  type: 'Person',
  title: 'M.L. Woodward',
  description: 'Author of the Tianna Howard Adventures, historical fiction mysteries for readers aged 11–14.',
  resource: `${knowledgeBase}/author/`,
  tags: ['author', 'historical-fiction', 'middle-grade', 'tianna-howard']
})}# Identity

M.L. Woodward is the author of the [Tianna Howard Adventures](/series/tianna-howard-adventures.md).

# Writing focus

The books combine real history and global locations with codes, hidden evidence and fictional investigations. The stories use logical problem-solving without magic or supernatural powers.

# Official profiles

* [Official website](${source.identity_links.website})
* [Amazon author page](${source.identity_links.amazon_author})
* [BookBub author page](${source.identity_links.bookbub_author})
* [Open Library author page](${source.identity_links.open_library_author})`);

write('series/index.md', `# Series

* [Tianna Howard Adventures](tianna-howard-adventures.md) - Historical fiction mysteries for readers aged 11–14.`);

write('series/tianna-howard-adventures.md', `${frontmatter({
  type: 'Book Series',
  title: series.name,
  description: series.description,
  resource: `${knowledgeBase}/series/`,
  tags: ['book-series', 'historical-fiction', 'historical-adventure', 'mystery', 'ages-11-14']
})}# Definition

${series.description}

# Audience and genre

* Audience: ${series.audience}
* Genres: ${series.genres.join(', ')}
* Fantasy or magic: No

# Author

The series is written by [M.L. Woodward](/author/ml-woodward.md).

# Books in order

${books.map((book) => `${book.series_position}. [${book.name}](/books/${pageSlugs[book.id]}.md)`).join('\n')}

# Accuracy boundary

${source.genre_rule}`);

write('books/index.md', `# Books

${books.map((book) => `* [${book.name}](${pageSlugs[book.id]}.md) - ${book.description}`).join('\n')}`);

for (const book of books) {
  const slug = pageSlugs[book.id];
  const isPublished = book.publication_status === 'published';
  const tags = ['book', 'tianna-howard', ...book.safe_topic_terms.map((term) => term.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replaceAll(/^-|-$/g, ''))];
  const status = isPublished ? 'stable' : 'draft';
  const editionTable = isPublished ? `# Editions

| Format | ASIN | ISBN-13 |
|---|---|---|
${book.editions.map((edition) => `| ${edition.format} | ${edition.asin} | ${edition.isbn_13 ?? ''} |`).join('\n')}` : `# Publication status

${book.publication_status}. No publication date has been announced.`;
  const openLibrary = book.open_library ? `
# Library catalogue

* [Open Library work](${book.open_library.work})
* [Open Library edition](${book.open_library.edition})
` : '';
  write(`books/${slug}.md`, `${frontmatter({
    type: 'Book',
    title: book.name,
    description: book.description,
    resource: `${knowledgeBase}/books/${slug}/`,
    tags,
    status
  })}# Series position

Book ${book.series_position} in the [Tianna Howard Adventures](/series/tianna-howard-adventures.md).

# Summary

${book.description}

# Historical basis

${book.historical_basis}

# Evidence status

${book.history_status}

# Fiction boundary

${book.fiction_boundary}

${editionTable}
${openLibrary}
# Main website

${book.canonical_url ? `[Official book page](${book.canonical_url})` : 'No separate main-site book page is recorded in the public catalogue.'}

# Related concepts

* [M.L. Woodward](/author/ml-woodward.md)
* [Series facts](/answers/series-facts.md)
* [Content boundaries](/policies/content-boundaries.md)`);
}

write('answers/index.md', `# Answers

* [Series facts](series-facts.md) - Concise answers to common questions about the author, audience and genre.`);

write('answers/series-facts.md', `${frontmatter({
  type: 'FAQ',
  title: 'Tianna Howard Adventures: series facts',
  description: 'Canonical answers to common questions about the Tianna Howard Adventures.',
  resource: `${knowledgeBase}/`,
  tags: ['faq', 'series-facts', 'audience', 'genre']
})}# Questions and answers

${source.answer_units.map((unit) => `## ${unit.question}\n\n${unit.answer}`).join('\n\n')}

# Related concepts

* [Tianna Howard Adventures](/series/tianna-howard-adventures.md)
* [M.L. Woodward](/author/ml-woodward.md)
* [Content boundaries](/policies/content-boundaries.md)`);

write('policies/index.md', `# Policies

* [Content boundaries](content-boundaries.md) - Rules for public, spoiler-safe use of the catalogue.`);

write('policies/content-boundaries.md', `${frontmatter({
  type: 'Policy',
  title: 'Public knowledge and fiction boundaries',
  description: 'Rules governing public, spoiler-safe use of the Tianna Howard catalogue.',
  tags: ['accuracy', 'fiction-boundary', 'spoiler-safe', 'metadata']
})}# Core rule

${source.genre_rule}

# Excluded material

The following material must not be inferred from or added to public metadata:

${source.excluded.map((item) => `* ${item}`).join('\n')}

# Status handling

Published books are stable concepts. Books in development or planning are draft concepts and must not be assigned unconfirmed publication dates, identifiers or final plot details.

# Related concepts

* [Series facts](/answers/series-facts.md)
* [Books](/books/)`);

write('discovery/index.md', `# Discovery

* [Official identities](official-identities.md) - Canonical website and public profile links.`);

write('discovery/official-identities.md', `${frontmatter({
  type: 'Reference',
  title: 'Official identities and public profiles',
  description: 'Canonical public links for M.L. Woodward and the Tianna Howard Adventures.',
  resource: source.identity_links.website,
  tags: ['identity', 'canonical-links', 'author-profiles', 'discovery']
})}# Primary identities

* Website: ${source.identity_links.website}
* Knowledge Centre: ${knowledgeBase}/
* Amazon author: ${source.identity_links.amazon_author}
* BookBub author: ${source.identity_links.bookbub_author}
* Open Library author: ${source.identity_links.open_library_author}

# Series profiles

${source.identity_links.organization_same_as.map((url) => `* ${url}`).join('\n')}

# Related concepts

* [M.L. Woodward](/author/ml-woodward.md)
* [Tianna Howard Adventures](/series/tianna-howard-adventures.md)`);

write('references/index.md', `# Source References

* [Public knowledge export](public-knowledge-export.json) - Canonical spoiler-safe JSON snapshot used to generate this bundle.`);

write('conformance.md', `${frontmatter({
  type: 'Reference',
  title: 'OKF v0.2 bundle conformance',
  description: 'Scope, generation method and validation requirements for this bundle.',
  resource: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md',
  tags: ['okf', 'conformance', 'validation'],
  sources: false
})}# Target specification

This bundle targets Open Knowledge Format v0.2.

# Separation boundary

The bundle is self-contained inside the \`okf/\` directory. It is not part of the Firebase \`dist/\` directory and does not alter any deployed Knowledge Centre page.

# Validation

Run \`python tools/validate_okf.py\` from the bundle root. The validator checks:

* parseable YAML frontmatter on every concept document
* a non-empty \`type\` field on every concept document
* the root \`okf_version\` declaration
* reserved \`index.md\` and \`log.md\` structure
* timestamps and lifecycle values used by v0.2
* internal Markdown links and bundle-relative source paths`);

fs.copyFileSync(sourcePath, path.join(bundle, 'references', 'public-knowledge-export.json'));
console.log(`Built OKF v0.2 bundle at ${bundle}`);
