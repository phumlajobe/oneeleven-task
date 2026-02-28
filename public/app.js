// ── Validation: Submit to One Eleven's checker ──────────────────────────────

async function runValidation() {
    const email = document.getElementById('email').value.trim();
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const btn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const btnText = document.getElementById('btnText');
    const result = document.getElementById('result');
    const resultLabel = document.getElementById('resultLabel');
    const resultBody = document.getElementById('resultBody');

    if (!email || !apiUrl) {
        showResult(result, resultLabel, resultBody, 'error', 'Missing Fields', 'Please fill in both your email and API endpoint URL.');
        return;
    }

    setLoading(btn, spinner, btnText, true, 'Validating...');
    result.className = 'result';

    try {
        const validationUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(apiUrl)}&email=${encodeURIComponent(email)}`;
        const response = await fetch(validationUrl);
        const text = await response.text();

        let display;
        try {
            display = JSON.stringify(JSON.parse(text), null, 2);
        } catch {
            display = text;
        }

        if (response.ok) {
            showResult(result, resultLabel, resultBody, 'success', '✓ Validation Response', display);
        } else {
            showResult(result, resultLabel, resultBody, 'error', '✗ Validation Failed', display);
        }
    } catch (err) {
        showResult(result, resultLabel, resultBody, 'error', '✗ Network Error', err.message);
    } finally {
        setLoading(btn, spinner, btnText, false, 'Run Validation →');
    }
}

// ── Local Test: Call your API directly ───────────────────────────────────────

async function runLocalTest() {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const testInput = document.getElementById('testInput').value.trim();
    const btn = document.getElementById('localTestBtn');
    const spinner = document.getElementById('localSpinner');
    const btnText = document.getElementById('localBtnText');
    const result = document.getElementById('localResult');
    const resultLabel = document.getElementById('localResultLabel');
    const resultBody = document.getElementById('localResultBody');

    // Validate inputs
    if (!apiUrl) {
        showResult(result, resultLabel, resultBody, 'error', 'Missing URL', 'Please enter your API endpoint URL above.');
        return;
    }

    if (!testInput) {
        showResult(result, resultLabel, resultBody, 'error', 'Missing Input', 'Please enter input like: { data: "example" }');
        return;
    }

    // Parse input - support both { data: "example" } and { "data": "example" }
    let parsedData;
    try {
        // Add quotes around unquoted keys: { data: "x" } → { "data": "x" }
        const jsonString = testInput.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g, '$1"$2"$3');
        const parsed = JSON.parse(jsonString);
        if (!parsed.data || typeof parsed.data !== 'string') {
            showResult(result, resultLabel, resultBody, 'error', 'Invalid Input', 'Your input must have a data field with a string value.\nExample: { data: "example" }');
            return;
        }
        parsedData = parsed.data;
    } catch (e) {
        showResult(result, resultLabel, resultBody, 'error', 'Invalid Input', 'Could not parse your input.\nMake sure it looks like: { data: "example" }');
        return;
    }

    setLoading(btn, spinner, btnText, true, 'Testing...');
    result.className = 'result';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: parsedData })
        });

        const json = await response.json();
        const display = JSON.stringify(json, null, 2);

        if (response.ok) {
            showResult(result, resultLabel, resultBody, 'success', '✓ Response from your API', display);
        } else {
            showResult(result, resultLabel, resultBody, 'error', '✗ API Error', display);
        }
    } catch (err) {
        showResult(result, resultLabel, resultBody, 'error', '✗ Request Failed', `${err.message}\n\nMake sure your API URL is correct and CORS is enabled.`);
    } finally {
        setLoading(btn, spinner, btnText, false, 'Test Locally →');
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function showResult(el, labelEl, bodyEl, type, label, body) {
    el.className = `result ${type}`;
    labelEl.textContent = label;
    bodyEl.textContent = body;
}

function setLoading(btn, spinner, btnText, isLoading, label) {
    btn.disabled = isLoading;
    spinner.style.display = isLoading ? 'block' : 'none';
    btnText.textContent = label;
}

// Allow Enter key to trigger validation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runValidation();
});