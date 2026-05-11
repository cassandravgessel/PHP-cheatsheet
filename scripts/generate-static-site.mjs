import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");

const periodOne = [
  ["week-01-final-v2.md", "PHP Basics"],
  ["week-02-final-v2.md", "Projectstructuur & Includes"],
  ["week-03-final-v2.md", "Database & READ"],
  ["week-04-final.md", "Forms (GET & POST)"],
  ["week-05-final.md", "Backend Validatie"],
  ["week-06-final.md", "INSERT & Redirect (PRG)"],
  ["week-07-final.md", "Sessions & Feedback"],
  ["week-08-final.md", "Overzicht & Uitleggen"],
];

const periodTwo = [
  ["p02w01-verbeterd.md", "Edit pagina & een item ophalen"],
  ["p02w02-verbeterd.md", "UPDATE queries"],
  ["p02w03-verbeterd.md", "DELETE"],
  ["p02w04-verbeterd.md", "CRUD overzicht"],
  ["p02w05-verbeterd.md", "Registreren"],
  ["p02w06-verbeterd.md", "Login"],
  ["p02w07-verbeterd.md", "Loginstatus & beveiligde pagina's"],
  ["p02w08-verbeterd.md", "Dynamisch menu"],
];

const escapeHtml = (value = "") =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeAttr = (value = "") => escapeHtml(value).replace(/"/g, "&quot;");

const slugify = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const stripMarkdown = (markdown = "") =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_`|\\-]/g, " ")
    .replace(/\[[^\]]+\]\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function convertTable(lines) {
  const rows = lines
    .filter((line) => line.trim())
    .map((line) =>
      line
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim()),
    );

  const header = rows[0] || [];
  const body = rows.slice(2);

  return `<div class="table-wrap"><table><thead><tr>${header
    .map((cell) => `<th>${inlineMarkdown(cell)}</th>`)
    .join("")}</tr></thead><tbody>${body
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`,
    )
    .join("")}</tbody></table></div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let index = 0;
  let inCode = false;
  let codeLanguage = "text";
  let codeLines = [];
  let inList = false;
  let inQuote = false;
  let quoteLines = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  const closeQuote = () => {
    if (inQuote) {
      html.push(`<blockquote><p>${quoteLines.map(inlineMarkdown).join("<br>")}</p></blockquote>`);
      quoteLines = [];
      inQuote = false;
    }
  };

  const closeBlocks = () => {
    closeList();
    closeQuote();
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (!inCode) {
        closeBlocks();
        inCode = true;
        codeLanguage = trimmed.slice(3).trim() || "text";
        codeLines = [];
      } else {
        const language = codeLanguage === "markup" ? "html" : codeLanguage;
        html.push(
          `<pre data-lang="${escapeAttr(language)}"><code class="language-${escapeAttr(
            language,
          )}">${escapeHtml(codeLines.join("\n"))}</code></pre>`,
        );
        inCode = false;
      }
      index += 1;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      index += 1;
      continue;
    }

    if (!trimmed || trimmed === "---") {
      closeBlocks();
      index += 1;
      continue;
    }

    if (trimmed.startsWith("|") && lines[index + 1]?.trim().startsWith("|---")) {
      closeBlocks();
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      html.push(convertTable(tableLines));
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeBlocks();
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level !== 1) {
        if (level === 2) {
          const id = slugify(text.replace(/\s*\(.*?\)\s*/g, " ").trim());
          html.push(`<h2 id="${id}">${inlineMarkdown(text)}</h2>`);
        } else {
          html.push(`<h${level}>${inlineMarkdown(text)}</h${level}>`);
        }
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      closeList();
      inQuote = true;
      quoteLines.push(trimmed.replace(/^>\s?/, ""));
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      closeQuote();
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      index += 1;
      continue;
    }

    closeBlocks();
    const lower = trimmed.toLowerCase();
    if (trimmed === "❌" || lower === "❌ fout") {
      html.push('<p class="mistake-label mistake-label--wrong">Fout</p>');
    } else if (trimmed === "✅" || lower === "✅ beter" || lower === "✅ goed voorbeeld") {
      html.push('<p class="mistake-label mistake-label--correct">Beter</p>');
    } else {
      html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
    }
    index += 1;
  }

  closeBlocks();
  if (inCode) {
    html.push(
      `<pre data-lang="${escapeAttr(codeLanguage)}"><code class="language-${escapeAttr(
        codeLanguage,
      )}">${escapeHtml(codeLines.join("\n"))}</code></pre>`,
    );
  }

  return html.join("\n");
}

function videoSection() {
  return `<section id="video-coming-soon" class="content-section video-section">
  <h2>Video (coming soon)</h2>
  <div class="video-card">
    <div class="video-card__text">
      <h3>Video komt eraan</h3>
      <p>Zodra de uitlegvideo beschikbaar is, wordt alleen de YouTube-ID vervangen.</p>
    </div>
    <div class="video-wrapper">
      <iframe src="https://www.youtube.com/embed/YOUTUBE_ID" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</section>`;
}

function navigation(period, activeWeek, fromRoot = false) {
  const prefix = fromRoot ? "" : "../";
  const weeks = period === 1 ? periodOne : periodTwo;

  return `<nav class="nav" aria-label="Hoofdnavigatie">
    <div class="nav__title">Start</div>
    <a href="${prefix}index.html" class="nav__link ${activeWeek === 0 ? "active" : ""}">Home</a>
    <div class="nav__title">Periode ${period}</div>
    ${weeks
      .map(
        ([, title], index) =>
          `<a href="${prefix}periode-${period}/week-${String(index + 1).padStart(
            2,
            "0",
          )}.html" class="nav__link ${activeWeek === index + 1 ? "active" : ""}"><span>Week ${
            index + 1
          }</span><small>${escapeHtml(title)}</small></a>`,
      )
      .join("\n    ")}
    <div class="nav__title">Wisselen</div>
    <a href="${prefix}periode-1/week-01.html" class="nav__link ${
      period === 1 ? "is-period" : ""
    }">Naar periode 1</a>
    <a href="${prefix}periode-2/week-01.html" class="nav__link ${
      period === 2 ? "is-period" : ""
    }">Naar periode 2</a>
  </nav>`;
}

function pageShell({ title, description, body, period = 1, activeWeek = 0, rootRelative = "../" }) {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeAttr(description)}">
  <title>${escapeHtml(title)} | CassCodes PHP Cheatsheet</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
  <link rel="stylesheet" href="${rootRelative}assets/css/style.css">
  <link rel="stylesheet" href="${rootRelative}assets/css/prism.css">
</head>
<body data-period="${period}" data-week="${activeWeek}">
  <button id="hamburger" class="hamburger" type="button" aria-label="Menu openen" aria-controls="sidebar" aria-expanded="false">☰</button>
  <div class="app">
    <aside id="sidebar" class="sidebar">
      <div class="sidebar__header">
        <a class="logo" href="${rootRelative}index.html" aria-label="CassCodes home">CassCodes<span class="logo-accent">;</span></a>
        <p class="brand-title">PHP Cheatsheet</p>
        <p class="brand-subtitle">Eerstejaars Software Development</p>
        <form class="search-container" role="search">
          <label class="sr-only" for="search-input">Zoek in alle weken</label>
          <input id="search-input" class="search-input" type="search" autocomplete="off" placeholder="Zoek in alle weken...">
          <div id="search-results" class="search-results" aria-live="polite"></div>
        </form>
      </div>
      ${navigation(period, activeWeek, rootRelative === "")}
    </aside>
    <main class="main">
      <div class="content">
${body}
      </div>
    </main>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup-templating.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-php.min.js"></script>
  <script src="${rootRelative}assets/js/app.js" defer></script>
</body>
</html>
`;
}

function pageBody(markdown, period, week, fallbackTitle) {
  const title =
    markdown.match(/^#\s+(.+)$/m)?.[1]?.trim().replace(/^Weekschema:\s*/i, "") ||
    `Week ${week} - ${fallbackTitle}`;
  const intro = markdown
    .split("\n")
    .slice(1)
    .join("\n")
    .split(/^##\s+/m)[0]
    .replace(/---/g, "")
    .trim();
  const firstHeading = markdown.match(/^#\s+.+$/m)?.[0] || "";
  const firstContentHeading = markdown.match(/^##\s+[\s\S]*$/m)?.[0] || markdown;
  const bodyMarkdown = `${firstHeading}\n\n${firstContentHeading.replace(/^##\s+Video[\s\S]*$/m, "")}`;
  const contentHtml = `${markdownToHtml(bodyMarkdown)}\n${videoSection()}`;

  return `<header class="page-header">
  <p class="eyebrow">Periode ${period} · Week ${week}</p>
  <h1>${escapeHtml(title)}<span class="title-accent">;</span></h1>
  ${intro ? `<p class="intro">${inlineMarkdown(intro).replace(/\n+/g, "<br>")}</p>` : ""}
</header>
${contentHtml}`;
}

await fs.mkdir(path.join(root, "periode-1"), { recursive: true });
await fs.mkdir(path.join(root, "periode-2"), { recursive: true });

const searchPages = [];

async function writeWeeks(period, weeks) {
  for (const [index, [file, fallbackTitle]] of weeks.entries()) {
    const week = index + 1;
    const markdown = await fs.readFile(path.join(root, "content", file), "utf8");
    const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || `Week ${week} - ${fallbackTitle}`;
    const cleanTitle = title.replace(/^Weekschema:\s*/i, "");
    const url = `periode-${period}/week-${String(week).padStart(2, "0")}.html`;

    await fs.writeFile(
      path.join(root, url),
      pageShell({
        title: `Periode ${period} · ${cleanTitle}`,
        description: stripMarkdown(markdown).slice(0, 155),
        body: pageBody(markdown, period, week, fallbackTitle),
        period,
        activeWeek: week,
      }),
    );

    searchPages.push({
      period: `Periode ${period}`,
      week: `Week ${week}`,
      title: fallbackTitle,
      url: `/${url}`,
      text: stripMarkdown(markdown),
    });
  }
}

await writeWeeks(1, periodOne);
await writeWeeks(2, periodTwo);

const homeBody = `<header class="hero">
  <p class="eyebrow">Eerstejaars Software Development</p>
  <h1>PHP Cheatsheet<span class="title-accent">;</span></h1>
  <p class="hero__description">Kies je periode en gebruik de weekpagina's als rustige, praktische uitleg naast je opdrachten.</p>
</header>
<section class="period-grid" aria-label="Periodes">
  <article class="period-card">
    <p class="eyebrow">Periode 1</p>
    <h2>PHP basis, Create &amp; Read</h2>
    <p>Je leert hoe PHP op de server werkt, hoe je projecten structureert en hoe je data leest en toevoegt met PDO.</p>
    <ul>
      <li>PHP basics en server-side denken</li>
      <li>Includes, arrays en projectstructuur</li>
      <li>Database READ, formulieren, validatie en INSERT</li>
    </ul>
    <a class="button-link" href="periode-1/week-01.html">Start periode 1</a>
  </article>
  <article class="period-card">
    <p class="eyebrow">Periode 2</p>
    <h2>CRUD, login &amp; sessions</h2>
    <p>Je bouwt verder aan bewerken, verwijderen, registreren, inloggen en pagina's beschermen met sessions.</p>
    <ul>
      <li>Editpagina's, UPDATE en DELETE</li>
      <li>CRUD-overzicht en accountregistratie</li>
      <li>Login, beveiligde pagina's en dynamische menu's</li>
    </ul>
    <a class="button-link" href="periode-2/week-01.html">Start periode 2</a>
  </article>
</section>
<section class="quick-start">
  <h2>Zo gebruik je deze cheatsheet</h2>
  <p>Begin bij de week van je opdracht. Zoek op termen zoals <code>PDO</code>, <code>session</code>, <code>UPDATE</code> of <code>formulier</code> om direct naar de juiste uitleg te springen.</p>
</section>`;

await fs.writeFile(
  path.join(root, "index.html"),
  pageShell({
    title: "Homepage",
    description: "PHP Cheatsheet voor eerstejaars Software Development.",
    body: homeBody,
    period: 1,
    activeWeek: 0,
    rootRelative: "",
  }),
);

for (let index = 1; index <= 8; index += 1) {
  const week = String(index).padStart(2, "0");
  await fs.writeFile(
    path.join(root, `week-${week}.html`),
    `<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="refresh" content="0; url=periode-1/week-${week}.html"><title>Doorsturen naar periode 1 week ${index}</title><link rel="canonical" href="periode-1/week-${week}.html"></head><body><p>Deze pagina staat nu op <a href="periode-1/week-${week}.html">periode 1 week ${index}</a>.</p></body></html>\n`,
  );
}

const css = `*, *::before, *::after { box-sizing: border-box; }
:root { --bg: #0a0f14; --bg-soft: #0f1720; --surface: #121a24; --surface-2: #182331; --surface-hover: #203044; --border: #263648; --border-strong: #38536b; --accent: #7dd3fc; --accent-strong: #38bdf8; --accent-soft: rgba(125, 211, 252, 0.1); --pink: #f7a8c8; --text: #f1f5f9; --text-secondary: #c3cfdb; --text-muted: #8798aa; --error: #fb7185; --success: #34d399; --code-bg: #081018; --sidebar: 292px; --content: 920px; --radius: 8px; --shadow: 0 18px 45px rgba(0, 0, 0, 0.24); }
html { scroll-behavior: smooth; }
body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--text); font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.7; }
a { color: var(--accent); } a:hover { color: #bae6fd; } ::selection { background: var(--accent); color: var(--bg); }
.app { min-height: 100vh; display: flex; }
.sidebar { position: fixed; inset: 0 auto 0 0; width: var(--sidebar); overflow-y: auto; background: var(--surface); border-right: 1px solid var(--border); z-index: 20; }
.sidebar__header { position: sticky; top: 0; z-index: 2; padding: 24px; background: var(--surface); border-bottom: 1px solid var(--border); }
.logo { display: inline-block; color: var(--text); text-decoration: none; font-size: 1.65rem; font-weight: 800; line-height: 1.1; } .logo:hover { color: var(--text); }
.logo-accent, .title-accent { color: var(--pink); }
.brand-title, .brand-subtitle { margin: 6px 0 0; color: var(--text-secondary); font-size: 0.88rem; } .brand-subtitle { margin-top: 0; color: var(--text-muted); font-size: 0.76rem; }
.search-container { position: relative; margin-top: 22px; } .search-input { width: 100%; height: 44px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg-soft); color: var(--text); padding: 0 14px; font: inherit; font-size: 0.92rem; outline: none; } .search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.search-results { display: none; position: absolute; top: calc(100% + 8px); left: 0; right: 0; max-height: 390px; overflow: auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); z-index: 30; } .search-results.active { display: block; }
.search-result-item { display: block; padding: 13px 14px; border-bottom: 1px solid var(--border); color: var(--text); text-decoration: none; } .search-result-item:last-child { border-bottom: 0; } .search-result-item:hover, .search-result-item:focus { background: var(--surface-hover); }
.search-result-meta { display: block; color: var(--accent); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; } .search-result-title { display: block; font-weight: 700; line-height: 1.35; } .search-result-text { display: block; margin-top: 3px; color: var(--text-muted); font-size: 0.82rem; line-height: 1.45; }
.nav { padding: 16px 10px 28px; } .nav__title { padding: 14px 14px 6px; color: var(--text-muted); font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; } .nav__link { display: block; margin: 2px 0; padding: 10px 14px; border-left: 3px solid transparent; border-radius: var(--radius); color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; line-height: 1.35; } .nav__link small { display: block; color: var(--text-muted); font-size: 0.76rem; margin-top: 2px; } .nav__link:hover { background: var(--surface-hover); color: var(--text); } .nav__link.active { background: var(--accent-soft); border-left-color: var(--accent); color: var(--accent); } .nav__link.active small { color: #b8dded; } .nav__link.is-period { color: var(--pink); }
.main { flex: 1; min-width: 0; margin-left: var(--sidebar); background: linear-gradient(180deg, var(--bg) 0%, #0c141d 100%); } .content { width: min(var(--content), calc(100% - 48px)); margin: 0 auto; padding: 56px 0 80px; }
.page-header, .hero { margin-bottom: 34px; } .eyebrow { margin: 0 0 8px; color: var(--accent); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
h1, h2, h3 { line-height: 1.22; letter-spacing: 0; } h1 { margin: 0 0 16px; font-size: clamp(2rem, 4vw, 3.35rem); } h2 { margin: 44px 0 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border); font-size: 1.45rem; } h3 { margin: 28px 0 10px; font-size: 1.08rem; }
p { margin: 0 0 16px; color: var(--text-secondary); } .intro, .hero__description { max-width: 760px; color: var(--text-secondary); font-size: 1.06rem; }
ul, ol { margin: 0 0 22px; padding-left: 1.35rem; color: var(--text-secondary); } li { margin: 6px 0; } li::marker { color: var(--accent); } .content-section { margin-top: 34px; }
blockquote { margin: 18px 0; padding: 16px 18px; background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: var(--radius); } blockquote p { margin: 0; }
code { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; } p code, li code, blockquote code, td code { padding: 2px 6px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface-2); color: #bae6fd; font-size: 0.88em; }
pre { margin: 16px 0 22px; padding: 18px; overflow-x: auto; background: var(--code-bg); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: var(--radius); color: #e5edf5; } pre code { color: inherit; font-size: 0.9rem; line-height: 1.6; white-space: pre; } pre[data-lang]::before { content: attr(data-lang); display: block; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); color: var(--text-muted); font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
.table-wrap { overflow-x: auto; margin: 20px 0; border: 1px solid var(--border); border-radius: var(--radius); } table { width: 100%; border-collapse: collapse; min-width: 560px; background: var(--surface); } th, td { padding: 12px 14px; border-bottom: 1px solid var(--border); text-align: left; color: var(--text-secondary); } th { color: var(--text); background: var(--surface-2); }
.period-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 28px; } .period-card, .quick-start, .video-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; } .period-card h2 { margin-top: 0; border: 0; padding: 0; }
.button-link { display: inline-flex; align-items: center; justify-content: center; min-height: 42px; margin-top: 8px; padding: 0 16px; border-radius: var(--radius); background: var(--accent); color: #071019; text-decoration: none; font-weight: 800; } .button-link:hover { color: #071019; background: #bae6fd; } .quick-start { margin-top: 20px; } .quick-start h2 { margin-top: 0; }
.mistake-label { display: inline-flex; align-items: center; margin: 12px 0 0; padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; } .mistake-label--wrong { color: var(--error); background: rgba(251, 113, 133, 0.1); } .mistake-label--correct { color: var(--success); background: rgba(52, 211, 153, 0.1); }
.video-card { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 20px; align-items: center; } .video-card h3 { margin-top: 0; } .video-wrapper { position: relative; aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--radius); background: var(--bg-soft); border: 1px solid var(--border); } .video-wrapper iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
mark.highlight { color: #081018; background: var(--accent); padding: 1px 3px; border-radius: 4px; } .hamburger { display: none; position: fixed; top: 14px; left: 14px; z-index: 40; width: 44px; height: 44px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); color: var(--text); font-size: 1.25rem; } .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 980px) { .hamburger { display: block; } .sidebar { transform: translateX(-100%); transition: transform 180ms ease; box-shadow: var(--shadow); } .sidebar.open { transform: translateX(0); } .main { margin-left: 0; } .content { width: min(100% - 32px, var(--content)); padding-top: 78px; } .period-grid, .video-card { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .content { width: min(100% - 24px, var(--content)); } h1 { font-size: 2rem; } h2 { font-size: 1.25rem; } .period-card, .quick-start, .video-card { padding: 18px; } pre { padding: 14px; } }
`;

await fs.writeFile(path.join(root, "assets/css/style.css"), css);

const js = `const searchIndex = ${JSON.stringify(searchPages, null, 2)};
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
}

function relativeUrl(url) {
  const depth = window.location.pathname.includes("/periode-") ? "../" : "";
  return depth + url.replace(/^\\//, "");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\\"": "&quot;",
    "'": "&#039;",
  })[char]);
}

function snippet(text, query) {
  const clean = text.replace(/\\s+/g, " ").trim();
  const index = normalize(clean).indexOf(normalize(query));
  const start = Math.max(0, index - 42);
  return (start > 0 ? "..." : "") + clean.slice(start, start + 132) + (start + 132 < clean.length ? "..." : "");
}

function runSearch(query) {
  if (!searchResults) return;
  const q = query.trim();
  if (q.length < 2) {
    searchResults.classList.remove("active");
    searchResults.innerHTML = "";
    return;
  }

  const normalized = normalize(q);
  const results = searchIndex
    .filter((item) => normalize([item.period, item.week, item.title, item.text].join(" ")).includes(normalized))
    .slice(0, 8);

  if (!results.length) {
    searchResults.innerHTML = '<div class="search-result-item"><span class="search-result-title">Geen resultaten</span><span class="search-result-text">Probeer een andere term.</span></div>';
  } else {
    searchResults.innerHTML = results
      .map((item) => '<a class="search-result-item" href="' + relativeUrl(item.url) + "?q=" + encodeURIComponent(q) + '"><span class="search-result-meta">' + escapeHtml(item.period) + " · " + escapeHtml(item.week) + '</span><span class="search-result-title">' + escapeHtml(item.title) + '</span><span class="search-result-text">' + escapeHtml(snippet(item.text, q)) + "</span></a>")
      .join("");
  }

  searchResults.classList.add("active");
}

function clearHighlights(root) {
  root.querySelectorAll("mark.highlight").forEach((mark) => mark.replaceWith(document.createTextNode(mark.textContent)));
  root.normalize();
}

function escapeRegExp(value) {
  return value.replace(/[|\\\\{}()[\\]^$+*?.]/g, "\\\\$&");
}

function highlightOnPage(query) {
  const root = document.querySelector(".content");
  if (!root || !query || query.length < 2) return;
  clearHighlights(root);

  const regex = new RegExp("(" + escapeRegExp(query) + ")", "gi");
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("pre, code, script, style, mark")) return NodeFilter.FILTER_REJECT;
      regex.lastIndex = 0;
      return regex.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    regex.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    node.nodeValue.replace(regex, (match, _group, offset) => {
      fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));
      const mark = document.createElement("mark");
      mark.className = "highlight";
      mark.textContent = match;
      fragment.appendChild(mark);
      lastIndex = offset + match.length;
    });
    fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
    node.replaceWith(fragment);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => runSearch(event.target.value));
  searchInput.addEventListener("focus", (event) => runSearch(event.target.value));
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchResults?.classList.remove("active");
      searchInput.blur();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) searchResults?.classList.remove("active");
  });
}

if (hamburger && sidebar) {
  hamburger.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

const query = new URLSearchParams(window.location.search).get("q");
if (query) {
  if (searchInput) searchInput.value = query;
  highlightOnPage(query);
}
`;

await fs.writeFile(path.join(root, "assets/js/app.js"), js);

console.log(`Generated ${searchPages.length} week pages.`);
