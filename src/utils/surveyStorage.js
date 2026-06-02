const DRAFT_KEY = 'survey_draft';
const RESULTS_KEY = 'survey_results';

export function saveDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadDraft() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || null; } catch { return null; }
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

export function saveResult(result) {
  const results = loadResults();
  results.push(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function loadResults() {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY)) || []; } catch { return []; }
}

export function clearResults() {
  localStorage.removeItem(RESULTS_KEY);
}

export function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename;
  a.click(); URL.revokeObjectURL(url);
}

export function copyJSON(data) {
  navigator.clipboard.writeText(JSON.stringify(data, null, 2)).catch(() => {});
}
