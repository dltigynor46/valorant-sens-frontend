const proPlayers = [
  { name: 'TenZ', dpi: 800, sens: 0.408 },
  { name: 'Asuna', dpi: 800, sens: 0.495 },
  { name: 'Shroud', dpi: 450, sens: 0.78 },
  { name: 'K1ng', dpi: 1600, sens: 0.17 },
  { name: 'Derke', dpi: 800, sens: 0.46 }
];

// Constants for Valorant calculations
const VALORANT_YAW = 0.07;
const INCH_TO_CM = 2.54;

let history = [];

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

function saveToHistory(record) {
  history.push(record);
  localStorage.setItem('valorantSensHistory', JSON.stringify(history));
  updateHistoryUI();
}

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

function showRandomPro() {
  const proSection = document.getElementById('proSens');
  const pro = proPlayers[Math.floor(Math.random() * proPlayers.length)];
  document.getElementById('proName').textContent = pro.name;
  document.getElementById('proDPI').textContent = pro.dpi;
  // Note: HTML has a typo 'proSensitvity' for the sensitivity field
  document.getElementById('proSensitvity').textContent = pro.sens;
  proSection.classList.remove('hidden');
}

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

function calculate() {
  const dpi = parseFloat(document.getElementById('dpi').value);
  const sensitivity = parseFloat(document.getElementById('sensitivity').value);
  if (isNaN(dpi) || isNaN(sensitivity)) {
    alert('Please enter valid numbers for DPI and sensitivity.');
    return;
  }
  // Compute eDPI and other metrics locally
  const edpi = dpi * sensitivity;
  const cm360 = (360 / (dpi * sensitivity * VALORANT_YAW)) * INCH_TO_CM;
  const psaLow = sensitivity * 0.8;
  const psaHigh = sensitivity * 1.2;
  const psaAverage = (psaLow + psaHigh) / 2;

  // Update result elements
  document.getElementById('edpi').textContent = edpi.toFixed(2);
  document.getElementById('cm360').textContent = cm360.toFixed(2);
  document.getElementById('psaLow').textContent = psaLow.toFixed(3);
  document.getElementById('psaAverage').textContent = psaAverage.toFixed(3);
  document.getElementById('psaHigh').textContent = psaHigh.toFixed(3);
  document.getElementById('results').classList.remove('hidden');

  // Save to history with timestamp
  const now = new Date().toLocaleString('ko-KR');
  saveToHistory({
    time: now,
    dpi,
    sensitivity,
    edpi: parseFloat(edpi.toFixed(2)),
    cm360: parseFloat(cm360.toFixed(2))
  });

  // Prepare share link
  copyShareLink(dpi, sensitivity);
}

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

document.getElementById('calculateBtn').addEventListener('click', calculate);
document.getElementById('randomProBtn').addEventListener('click', showRandomPro);
document.getElementById('shareBtn').addEventListener('click', () => {
  const dpi = document.getElementById('dpi').value;
  const sensitivity = document.getElementById('sensitivity').value;
  copyShareLink(dpi, sensitivity);
});

loadHistory();
initFromParams();
