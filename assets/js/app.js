const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

/* Easter Egg: Pink Mode */
let clickCount = 0;
let clickTimer = null;

function initPinkMode() {
  const logoLink = document.querySelector('.logo');
  if (!logoLink) return;
  
  logoLink.addEventListener('click', (e) => {
    clickCount++;
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1500);
    
    if (clickCount === 5) {
      document.body.classList.toggle('pink-mode');
      clickCount = 0;
      e.preventDefault();
    }
  });
}

const weekData = [
  { week: 1, title: 'PHP Basics', content: 'PHP draait op de server variabelen echo short tags if else date functie client-side server-side' },
  { week: 2, title: 'Projectstructuur & Includes', content: 'include require header footer herbruikbare onderdelen associative array FETCH_ASSOC' },
  { week: 3, title: 'Database & READ', content: 'PDO connectie DSN SELECT fetch fetchAll database CRUD' },
  { week: 4, title: 'Forms (GET & POST)', content: 'form method GET POST $_GET $_POST input name submit action' },
  { week: 5, title: 'Backend Validatie', content: 'validatie empty strlen is_numeric backend frontend security' },
  { week: 6, title: 'INSERT & Redirect', content: 'INSERT prepare execute placeholder redirect PRG Post Redirect Get dubbele insert' },
  { week: 7, title: 'Sessions & Feedback', content: 'session session_start $_SESSION flash message unset success error' },
  { week: 8, title: 'Overzicht', content: 'overzicht CRUD PDO prepared statements validatie redirect sessions uitleggen' }
];

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/' || path.endsWith('index.html')) return 0;
  const match = path.match(/week-0(\d)\.html/);
  return match ? parseInt(match[1]) : 0;
}

function searchWeeks(query) {
  if (!query || query.length < 2) {
    searchResults.classList.remove('active');
    return;
  }

  const currentPage = getCurrentPage();
  const results = weekData.filter(week => 
    week.content.toLowerCase().includes(query.toLowerCase()) ||
    week.title.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item"><span class="no-results">Geen resultaten gevonden</span></div>';
  } else {
    searchResults.innerHTML = results.map(week => {
      const isCurrentPage = week.week === currentPage;
      if (isCurrentPage) {
        return `
          <a href="#" class="search-result-item" onclick="highlightOnPage('${query.replace(/'/g, "\\'")}'); return false;">
            <span class="week-label">Week ${week.week}</span>
            <span style="color: var(--text-secondary);">(op deze pagina)</span>
          </a>
        `;
      }
      return `
        <a href="week-0${week.week}.html?q=${encodeURIComponent(query)}" class="search-result-item">
          <span class="week-label">Week ${week.week}</span>
          ${week.title}
        </a>
      `;
    }).join('');
  }

  searchResults.classList.add('active');
}

function highlightOnPage(query) {
  const content = document.querySelector('.content');
  if (!content) return;
  
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
  const nodesToReplace = [];
  
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement && 
        (node.parentElement.tagName === 'PRE' || 
         node.parentElement.tagName === 'CODE')) {
      continue;
    }
    if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
      nodesToReplace.push(node);
    }
  }

  for (const node of nodesToReplace) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    const span = document.createElement('span');
    span.innerHTML = node.textContent.replace(regex, '<mark class="highlight">$1</mark>');
    node.replaceWith(span);
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function initPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (query) {
    highlightOnPage(query);
    if (searchInput) searchInput.value = query;
  }
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchWeeks(e.target.value);
  });

  searchInput.addEventListener('focus', (e) => {
    if (e.target.value.length >= 2) {
      searchWeeks(e.target.value);
    }
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      searchResults.classList.remove('active');
    }, 200);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.blur();
    }
  });
}

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

initPage();
initPinkMode();
