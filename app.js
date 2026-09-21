const archive = {
  name: 'App Store Collection',
  sizeMb: 798.3,
  platform: 'iOS',
  archiveType: 'ZIP-based IPA collection',
};

const apps = [
  { name: 'Animal Sounds', bundleId: 'com.smartbabyapps.animalsounds', version: '2.0', minOs: '3.1', ipaFile: 'Animal Sounds 2.0.ipa', sizeMb: 19.8 },
  { name: 'SoundTouch', bundleId: 'com.yourcompany.SoundTouch', version: '1.4', minOs: '3.0', ipaFile: 'SoundTouch 1.4.ipa', sizeMb: 155.5 },
  { name: 'Tozzle', bundleId: 'com.nodeflexion.Tozzle', version: '3.7', minOs: '3.1.3', ipaFile: 'Tozzle 3.7.ipa', sizeMb: 112.6 },
  { name: 'AutismXpress', bundleId: 'X7WS995LSR.com.StudioEmotion.AutismXpress', version: '1.0', minOs: '3.1.2', ipaFile: 'AutismXpress 1.0.ipa', sizeMb: 7.4 },
  { name: 'Lunchbox', bundleId: 'com.thup.MonkeyPreschool', version: '1.4', minOs: '3.0', ipaFile: 'Lunchbox 1.4.ipa', sizeMb: 13.7 },
  { name: 'Peek-a-Zoo', bundleId: 'com.duckduckmoosedesign.peekazoo', version: '1.1.1', minOs: '3.0', ipaFile: 'Peek-a-Zoo 1.1.1.ipa', sizeMb: 19.1 },
  { name: 'Michigan Nature Sounds', bundleId: 'com.yourcompany.MichiganNatureSounds', version: '1.0', minOs: '3.0', ipaFile: 'Michigan Nature Sounds 1.0.ipa', sizeMb: 24.6 },
  { name: 'Peek-a-Zoo Classic', bundleId: 'com.tbd.pazCLL', version: '1.0', minOs: '3.0', ipaFile: 'Peek-a-Zoo 1.0.ipa', sizeMb: 24.6 },
  { name: 'Artsee', bundleId: 'com.britejar.artsee', version: '1.1', minOs: '2.2', ipaFile: 'Artsee 1.1.ipa', sizeMb: 12.4 },
  { name: 'Angry Birds', bundleId: 'com.rovio.AngryBirdsHalloween', version: '1.5.3', minOs: '3.0', ipaFile: 'Angry Birds 1.5.3.ipa', sizeMb: 16.8 },
  { name: 'Farm Flip Fun', bundleId: 'lv.yapp.farmflipfun', version: '1.0', minOs: '3.0', ipaFile: 'Farm Flip Fun 1.0.ipa', sizeMb: 10.6 },
  { name: 'Farm Story', bundleId: 'com.teamlava.farmstory', version: '1.2', minOs: '3.0', ipaFile: 'Farm Story 1.2.ipa', sizeMb: 19.9 },
  { name: 'Stickers', bundleId: 'com.nightanddaystudios.ericcarlestickers', version: '1.0', minOs: '5.0', ipaFile: 'Stickers 1.0.ipa', sizeMb: 206.1 },
  { name: 'Forest', bundleId: 'com.nightanddaystudios.peekabooforest', version: '1.1.0', minOs: '3.1.3', ipaFile: 'Forest 1.1.0.ipa', sizeMb: 25.6 },
  { name: 'Virtuoso', bundleId: 'com.peterb.virtuosopianofree', version: '3.1.2', minOs: '4.0', ipaFile: 'Virtuoso 3.1.2.ipa', sizeMb: 19.9 },
  { name: 'ABC Tracer', bundleId: 'com.appzoo.ABCTracer', version: '1.8', minOs: '2.2.1', ipaFile: 'ABC Tracer 1.8.ipa', sizeMb: 20.9 },
  { name: 'Peek Wild', bundleId: 'com.nightanddaystudios.peekaboowild', version: '2.0.1', minOs: '3.1.3', ipaFile: 'Peek Wild 2.0.1.ipa', sizeMb: 9.8 },
  { name: 'Peekaboo', bundleId: 'com.nightanddaystudios.peekaboobarn', version: '2.0', minOs: '2.2', ipaFile: 'Peekaboo 2.0.ipa', sizeMb: 3.6 },
  { name: 'Finding Sight', bundleId: 'my.finding3', version: '2.1', minOs: '3.2', ipaFile: 'Finding Sight 2.1.ipa', sizeMb: 34 },
  { name: 'ArtikPix', bundleId: 'com.rinnapps.artikpix.iap', version: '1.2.4', minOs: '3.1', ipaFile: 'ArtikPix 1.2.4.ipa', sizeMb: 41.4 },
];

const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const appGrid = document.getElementById('appGrid');
const appCount = document.getElementById('appCount');
const totalSize = document.getElementById('totalSize');
const lowestMinOS = document.getElementById('lowestMinOS');

function parseMinOs(value) {
  const [major = '0', minor = '0', patch = '0'] = String(value).split('.');
  return Number(major) + Number(minor) / 10 + Number(patch) / 100;
}

function formatMb(value) {
  return `${Number(value).toFixed(1).replace(/\.0$/, '')} MB`;
}

function sortApps(items, mode) {
  const next = [...items];

  switch (mode) {
    case 'size-desc':
      next.sort((a, b) => b.sizeMb - a.sizeMb);
      break;
    case 'size-asc':
      next.sort((a, b) => a.sizeMb - b.sizeMb);
      break;
    case 'min-os':
      next.sort((a, b) => parseMinOs(a.minOs) - parseMinOs(b.minOs));
      break;
    case 'name':
    default:
      next.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return next;
}

function updateStats(items) {
  const total = items.reduce((sum, app) => sum + app.sizeMb, 0);
  const minOsValues = items.map((app) => parseMinOs(app.minOs));
  const lowest = minOsValues.length ? Math.min(...minOsValues) : 0;

  appCount.textContent = String(items.length);
  totalSize.textContent = formatMb(total);
  lowestMinOS.textContent = lowest.toFixed(1);
}

function cardHtml(app) {
  return `
    <article class="app-card">
      <div class="app-header">
        <h3 class="app-name">${app.name}</h3>
        <span class="app-version">v${app.version}</span>
      </div>

      <div class="app-meta">
        <div class="app-meta-row">
          <span>Bundle ID</span>
          <strong>${app.bundleId}</strong>
        </div>
        <div class="app-meta-row">
          <span>Platform</span>
          <strong>${archive.platform}</strong>
        </div>
        <div class="app-meta-row">
          <span>Min OS</span>
          <strong>${app.minOs}</strong>
        </div>
        <div class="app-meta-row">
          <span>IPA</span>
          <strong>${app.ipaFile}</strong>
        </div>
        <div class="app-meta-row">
          <span>File size</span>
          <strong>${formatMb(app.sizeMb)}</strong>
        </div>
      </div>
    </article>
  `;
}

function renderApps() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const sortMode = sortSelect.value;

  const filtered = apps.filter((app) => {
    if (!searchTerm) return true;

    const haystack = [
      app.name,
      app.bundleId,
      app.ipaFile,
      app.version,
      app.minOs,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(searchTerm);
  });

  const ordered = sortApps(filtered, sortMode);

  updateStats(ordered);

  if (!ordered.length) {
    appGrid.innerHTML = '<div class="empty-state">No apps match the current search.</div>';
    return;
  }

  appGrid.innerHTML = ordered.map(cardHtml).join('');
}

searchInput.addEventListener('input', renderApps);
sortSelect.addEventListener('change', renderApps);

renderApps();
