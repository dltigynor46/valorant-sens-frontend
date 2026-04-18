const apiBase = 'https://valorant-sens-backend-production.up.railway.app';

// List of some Valorant pro players for random suggestions
const proPlayers = [
  { name: 'TenZ', dpi: 800, sens: 0.408 },
  { name: 'Asuna', dpi: 800, sens: 0.495 },
  { name: 'Shroud', dpi: 450, sens: 0.78 },
  { name: 'K1ng', dpi: 1600, sens: 0.17 },
  { name: 'Derke', dpi: 800, sens: 0.46 }
];

let history = [];

// Load history from localStorage
function loadHistory() {
  const stored = localStorage.getItem('valorantSensHistory');
  if (stored) {
    try {
      history = JSON.parse(stored);
    } catch (e) {
      history = [];
    }
  }
  updateHistoryUI();
}

// Save new record to history and persist
function saveToHistory(record) {
  history.push(record);
  localStorage.setItem('valorantSensHistory', JSON.stringify(history));
  updateHistoryUI();
}

// Update the history section in the UI
function updateHistoryUI() {
  const historySection = document.getElementById('history');
  const listEl = document.getElementById('historyList');
  if (!history || history.length === 0) {
    listEl.innerHTML = '<li>No history yet.</li>';
    return;
  }
  historySection.classList.remove('hidden');
  listEl.innerHTML = '';
  history.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.time} – DPI ${item.dpi}, Sens ${item.sensitivity}, eDPI ${item.edpi}`;
    listEl.appendChild(li);
  });
}

// Display a random pro player's settings
function showRandomPro() {
  const proSection = document.getElementById('proSens');
  const pro = proPlayers[Math.floor(Math.random() * proPlayers.length)];
  document.getElementById('proName').textContent = pro.name;
  document.getElementById('proDPI').textContent = pro.dpi;
  // Note: the HTML has a typo on the ID: proSensitvity
  document.getElementById('proSensitvity').textContent = pro.sens;
  proSection.classList.remove('hidden');
}

// Copy share link to clipboard and show notification
function copyShareLink(dpi, sensitivity) {
  const shareSection = document.getElementById('share');
  const copiedSpan = document.getElementById('shareCopied');
  const url = `${window.location.origin}${window.location.pathname}?dpi=${dpi}&sens=${sensitivity}`;
  navigator.clipboard.writeText(url).then(() => {
    copiedSpan.classList.remove('hidden');
    setTimeout(() => {
      copiedSpan.classList.add('hidden');
    }, 2000);
  });
  shareSection.classList.remove('hidden');
}

async function calculate() {
  const dpi = parseInt(document.getElementById('dpi').value, 10);
  const sensitivity = parseFloat(document.getElementById('sensitivity').value);
  if (isNaN(dpi) || isNaN(sensitivity)) {
    alert('Please enter valid numbers for DPI and sensitivity.');
    return;
  }
  const payload = { dpi, sensitivity };
  try {
    const response = await fetch(`${apiBase}/api/v1/calculator/sens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('API response error');
    }
    const data = await response.json();
    // Update results UI
    document.getElementById('edpi').textContent = data.edpi;
    document.getElementById('cm360').textContent = data.cm360;
    document.getElementById('psaLow').textContent = data.psa_low;
    document.getElementById('psaAverage').textContent = data.psa_average;
    document.getElementById('psaHigh').textContent = data.psa_high;
    document.getElementById('results').classList.remove('hidden');
    // Record timestamp
    const now = new Date().toLocaleString('ko-KR');
    // Save to history
    saveToHistory({
      time: now,
      dpi,
      sensitivity,
      edpi: data.edpi,
      cm360: data.cm360
    });
    // Prepare share link and reveal share section
    copyShareLink(dpi, sensitivity);
  } catch (err) {
    alert('An error occurred while calculating. Please try again later.');
    console.error(err);
  }
}

// Parse query parameters and auto-calculate if provided
function initFromParams() {
  const params = new URLSearchParams(window.location.search);
  const dpiParam = params.get('dpi');
  const sensParam = params.get('sens');
  if (dpiParam && sensParam) {
    document.getElementById('dpi').value = dpiParam;
    document.getElementById('sensitivity').value = sensParam;
    calculate();
  }
}

// Attach event listeners
document.getElementById('calculateBtn').addEventListener('click', calculate);
document.getElementById('randomProBtn').addEventListener('click', showRandomPro);
document.getElementById('shareBtn').addEventListener('click', () => {
  const dpi = document.getElementById('dpi').value;
  const sensitivity = document.getElementById('sensitivity').value;
  copyShareLink(dpi, sensitivity);
});

// Initialize on load
loadHistory();
initFromParams();
