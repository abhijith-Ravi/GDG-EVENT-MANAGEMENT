function formatDate(dateValue) {
  if (!dateValue) return "TBD";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function renderEventCard(event, container) {
  const card = document.createElement('article');
  card.className = 'event-card';
  card.innerHTML = `
    <span class="pill">${event.location || 'Community Event'}</span>
    <h3 class="event-title">${event.event_name || event.eventName || 'Untitled Event'}</h3>
    <p class="event-meta">${formatDate(event.date)}</p>
    <p class="event-description">${event.description || 'A fresh opportunity to learn, connect, and build with the GDG community.'}</p>
    <a class="primary-btn" href="4allevents.html">Reserve spot</a>
  `;
  container.appendChild(card);
}

async function loadEvents() {
  const url = 'http://localhost:8080/api/upcomingEvents';
  const eventsContainer = document.getElementById('events-container');

  if (!eventsContainer) return;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error fetching events: ${response.status} ${response.statusText}`);

    const events = await response.json();
    eventsContainer.innerHTML = '';

    if (!events.length) {
      eventsContainer.innerHTML = '<div class="empty-state">No upcoming events yet. Check back soon for new sessions.</div>';
      return;
    }

    events.forEach((event) => renderEventCard(event, eventsContainer));
  } catch (error) {
    console.error('Failed to load events:', error);
    eventsContainer.innerHTML = '<div class="empty-state">Unable to load events right now. Please try again shortly.</div>';
  }
}

async function loadPastEvents() {
  const url = 'http://localhost:8080/api/pastEvents';
  const container = document.getElementById('past-events-container');

  if (!container) return;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error fetching past events: ${response.status} ${response.statusText}`);

    const events = await response.json();
    container.innerHTML = '';

    if (!events.length) {
      container.innerHTML = '<div class="empty-state">Past highlights will appear here after events are completed.</div>';
      return;
    }

    events.forEach((event) => renderEventCard(event, container));
  } catch (error) {
    console.error('Failed to load past events:', error);
    container.innerHTML = '<div class="empty-state">Unable to load recent highlights right now.</div>';
  }
}

function updateDashboardGreeting() {
  const welcomeName = document.getElementById('welcome-name');
  const welcomeRole = document.getElementById('welcome-role');
  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('usertype');

  if (welcomeName) {
    welcomeName.textContent = username ? `Hello, ${username}` : 'Hello there';
  }

  if (welcomeRole) {
    welcomeRole.textContent = userType === 'admin' ? 'Admin access is enabled for event management.' : 'Student access is ready for registrations and discovery.';
  }

  const adminLinks = document.querySelectorAll('.action-card');
  if (userType === 'student') {
    adminLinks.forEach((link, index) => {
      if (index > 0) {
        link.classList.add('hidden');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
  loadPastEvents();
  updateDashboardGreeting();
});


