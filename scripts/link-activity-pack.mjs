import fs from 'node:fs';

const file = 'docs/reading-guides/index.html';
let html = fs.readFileSync(file, 'utf8');
if (!html.includes('href="/resources/teacher-reader-activity-pack/"')) {
  const marker = '</p></section><section class="section">';
  html = html.replace(marker, '</p><div class="actions"><a class="button" href="/resources/teacher-reader-activity-pack/">Free activity pack</a></div></section><section class="section">');
  fs.writeFileSync(file, html);
}
