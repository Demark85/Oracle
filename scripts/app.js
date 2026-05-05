const MAX_SEGMENTS = 4;
const container = document.getElementById('segments-container');
const template = document.getElementById('segment-template');
const form = document.getElementById('segments-form');
const results = document.getElementById('results');
const statusEl = document.getElementById('status');

function addSegment(data = {}) {
  if (container.children.length >= MAX_SEGMENTS) return;
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector('[data-segment-number]').textContent = container.children.length + 1;

  ['origin', 'destination', 'mode', 'departure_time'].forEach((field) => {
    const input = node.querySelector(`[data-field="${field}"]`);
    if (data[field]) input.value = data[field];
  });

  node.querySelector('[data-remove]').addEventListener('click', () => {
    node.remove();
    renumber();
  });

  container.appendChild(node);
}

function renumber() {
  [...container.children].forEach((segment, idx) => {
    segment.querySelector('[data-segment-number]').textContent = idx + 1;
  });
}

function collectSegments() {
  return [...container.children].map((segment) => ({
    origin: segment.querySelector('[data-field="origin"]').value.trim(),
    destination: segment.querySelector('[data-field="destination"]').value.trim(),
    mode: segment.querySelector('[data-field="mode"]').value,
    departure_time: segment.querySelector('[data-field="departure_time"]').value,
  }));
}

async function fetchDirections(apiKey, segment) {
  const departureUnix = Math.floor(new Date(segment.departure_time).getTime() / 1000);
  const params = new URLSearchParams({
    origin: segment.origin,
    destination: segment.destination,
    mode: segment.mode.toLowerCase(),
    departure_time: String(departureUnix),
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/directions/json?${params}`;
  const resp = await fetch(url);
  const json = await resp.json();
  if (json.status !== 'OK' || !json.routes?.length) {
    throw new Error(`Directions failed (${json.status}) for ${segment.origin} → ${segment.destination}`);
  }
  const leg = json.routes[0].legs[0];
  const durationSeconds = leg.duration?.value;
  if (!durationSeconds) throw new Error('Missing duration in API response.');
  return { durationSeconds, distanceText: leg.distance?.text || 'N/A', durationText: leg.duration?.text || 'N/A' };
}

function fmtDate(date) {
  return date.toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric' });
}

function fmtDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function renderItinerary(items) {
  results.innerHTML = '';
  const totalTravelSeconds = items.reduce((sum, s) => sum + s.durationSeconds, 0);
  const start = new Date(items[0].departure);
  const end = new Date(items[items.length - 1].arrival);

  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    const wait = idx > 0 ? (new Date(item.departure) - new Date(items[idx - 1].arrival)) / 1000 : null;
    card.innerHTML = `
      <h3>Segment ${idx + 1} (${item.mode})</h3>
      <p>Depart: ${fmtDate(new Date(item.departure))}</p>
      <p>Arrive: ${fmtDate(new Date(item.arrival))}</p>
      <p>Travel: ${item.durationText} • Distance: ${item.distanceText}</p>
      ${wait !== null ? `<p>Wait from previous: ${fmtDuration(Math.max(wait, 0))}</p>` : ''}
    `;
    results.appendChild(card);
  });

  const summary = document.createElement('div');
  summary.className = 'timeline-meta';
  summary.innerHTML = `
    <strong>Total travel time: ${fmtDuration(totalTravelSeconds)}</strong>
    <strong>Total trip span: ${fmtDate(start)} → ${fmtDate(end)}</strong>
  `;
  results.appendChild(summary);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const apiKey = document.getElementById('api-key').value.trim();
  const segments = collectSegments().filter((s) => s.origin && s.destination && s.departure_time);
  if (!apiKey) {
    statusEl.textContent = 'Please provide a Google Maps API key.';
    return;
  }
  if (!segments.length) {
    statusEl.textContent = 'Please add at least one complete segment.';
    return;
  }

  statusEl.textContent = 'Building itinerary...';
  try {
    const sorted = [...segments].sort((a, b) => new Date(a.departure_time) - new Date(b.departure_time));
    const enriched = [];
    for (const seg of sorted) {
      const route = await fetchDirections(apiKey, seg);
      const departure = new Date(seg.departure_time);
      const arrival = new Date(departure.getTime() + route.durationSeconds * 1000);
      enriched.push({ ...seg, ...route, departure, arrival });
    }
    renderItinerary(enriched);
    statusEl.textContent = 'Itinerary ready.';
  } catch (err) {
    statusEl.textContent = err.message;
  }
});

document.getElementById('add-segment').addEventListener('click', () => addSegment());
document.getElementById('load-sample').addEventListener('click', () => {
  container.innerHTML = '';
  window.defaultSegments.forEach((seg) => addSegment(seg));
});

addSegment();
