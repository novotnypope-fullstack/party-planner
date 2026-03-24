// state
let state = {
  parties: [],
  selectedParty: null
};

const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT';

// fetch all parties
async function fetchParties() {
  try {
    const res = await fetch(`${API_URL}/events`);
    const data = await res.json();
    console.log('full data object:', data);
    console.log('data.data:', data.data);
    console.log('data.success:', data.success);
    state.parties = data.data; 
    console.log('state.parties:', state.parties);
    render();
  } catch (err) {
    console.error('failed to fetch parties:', err);
  }
}

// fetch single party details
async function fetchPartyDetails(id) {
  try {
    const res = await fetch(`${API_URL}/events/${id}`);
    const data = await res.json();
    state.selectedParty = data.data;
    console.log('fetched party details:', state.selectedParty);
    render();
  } catch (err) {
    console.error('failed to fetch party details:', err);
  }
}

// handle party click
function selectParty(id) {
  fetchPartyDetails(id);
}

// component: party list
function PartyList() {
  if (!state.parties || state.parties.length === 0) {
    return `<div class="parties-list"><p>Loading...</p></div>`;
  }
  
  const partiesHtml = state.parties.map(party => {
    const isActive = state.selectedParty && state.selectedParty.id === party.id ? 'active' : '';
    return `
      <li class="${isActive}" onclick="selectParty(${party.id})">
        ${party.name}
      </li>
    `;
  }).join('');

  return `
    <div class="parties-list">
      <h2>Upcoming Events</h2>
      <ul>
        ${partiesHtml}
      </ul>
    </div>
  `;
}

// component: party details
function PartyDetails() {
  if (!state.selectedParty) {
    return `
      <div class="party-details">
        <h2>Event Details</h2>
        <p class="message">Select a party to see details</p>
      </div>
    `;
  }

  const party = state.selectedParty;
  return `
    <div class="party-details">
      <h2>Event Details</h2>
      <div class="detail-item">
        <strong>Name</strong>
        <span>${party.name}</span>
      </div>
      <div class="detail-item">
        <strong>ID</strong>
        <span>${party.id}</span>
      </div>
      <div class="detail-item">
        <strong>Date</strong>
        <span>${new Date(party.date).toLocaleDateString()}</span>
      </div>
      <div class="detail-item">
        <strong>Location</strong>
        <span>${party.location}</span>
      </div>
      <div class="detail-item">
        <strong>Description</strong>
        <span>${party.description}</span>
      </div>
    </div>
  `;
}

// main render function
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <h1>🎉 Party Planner</h1>
      <div class="content">
        ${PartyList()}
        ${PartyDetails()}
      </div>
    </div>
  `;
}

// init
fetchParties();
