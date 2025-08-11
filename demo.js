document.getElementById('calculate').addEventListener('click', () => {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const operation = document.getElementById('operation').value;
  const resultEl = document.getElementById('result');

  if (Number.isNaN(a) || Number.isNaN(b)) {
    resultEl.textContent = 'Please enter valid numbers';
    return;
  }

  try {
    const result = calculator[operation](a, b);
    resultEl.textContent = result;
  } catch (err) {
    resultEl.textContent = err.message;
  }
});
