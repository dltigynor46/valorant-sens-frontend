const apiBase = 'https://valorant-sens-backend-production.up.railway.app';

// Event listener for calculate button
document.getElementById('calculateBtn').addEventListener('click', async () => {
  const dpi = parseInt(document.getElementById('dpi').value, 10);
  const sensitivity = parseFloat(document.getElementById('sensitivity').value);

  // Validate inputs
  if (isNaN(dpi) || isNaN(sensitivity)) {
    alert('Please enter valid numbers for DPI and sensitivity.');
    return;
  }

  const payload = { dpi, sensitivity };

  try {
    const response = await fetch(`${apiBase}/api/v1/calculator/sens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    // Update the UI with results
    document.getElementById('edpi').textContent = data.edpi;
    document.getElementById('cm360').textContent = data.cm360;
    document.getElementById('psaLow').textContent = data.psa_low;
    document.getElementById('psaAverage').textContent = data.psa_average;
    document.getElementById('psaHigh').textContent = data.psa_high;
    document.getElementById('results').classList.remove('hidden');
  } catch (error) {
    console.error(error);
    alert('An error occurred while calculating. Please try again later.');
  }
});
