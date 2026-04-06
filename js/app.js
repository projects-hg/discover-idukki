// ============================================
// Discover Idukki — Application Logic
// ============================================

(function () {
  'use strict';

  // ---- State ----
  const state = {
    searchQuery: '',
    sortBy: 'popularity',
    filters: {
      categories: [],
      season: 'all',
      feeType: 'all'
    },
    filteredPlaces: [...TOURIST_PLACES],
    modalOpen: false,
    filterPanelOpen: false
  };

  // ---- DOM Cache ----
  const dom = {};
  function cacheDom() {
    dom.mainNav = document.getElementById('mainNav');
    dom.navToggle = document.getElementById('navToggle');
    dom.navLinks = document.getElementById('navLinks');
    dom.heroBg = document.getElementById('heroBg');
    dom.categoryCards = document.getElementById('categoryCards');
    dom.searchInput = document.getElementById('searchInput');
    dom.sortSelect = document.getElementById('sortSelect');
    dom.filterToggleBtn = document.getElementById('filterToggleBtn');
    dom.filterPanel = document.getElementById('filterPanel');
    dom.filterCount = document.getElementById('filterCount');
    dom.categoryFilters = document.getElementById('categoryFilters');
    dom.seasonFilter = document.getElementById('seasonFilter');
    dom.feeFilter = document.getElementById('feeFilter');
    dom.clearFilters = document.getElementById('clearFilters');
    dom.resultsCount = document.getElementById('resultsCount');
    dom.activeFilters = document.getElementById('activeFilters');
    dom.placesGrid = document.getElementById('placesGrid');
    dom.noResults = document.getElementById('noResults');
    dom.modalOverlay = document.getElementById('modalOverlay');
    dom.placeModal = document.getElementById('placeModal');
    dom.modalClose = document.getElementById('modalClose');
    dom.modalContent = document.getElementById('modalContent');
    dom.staysGrid = document.getElementById('staysGrid');
    dom.transportTabs = document.getElementById('transportTabs');
    dom.transportContent = document.getElementById('transportContent');
    dom.backToTop = document.getElementById('backToTop');
  }

  // ---- Utilities ----
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function getCategoryMeta(id) {
    return CATEGORIES.find(c => c.id === id) || {};
  }

  function getStayTypeColor(type) {
    const map = { resort: '#2d5016', homestay: '#8b4513', hotel: '#1a5276', treehouse: '#6b8f71' };
    return map[type] || '#666';
  }

  // ---- Render: Category Quick Links ----
  function renderCategoryCards() {
    dom.categoryCards.innerHTML = CATEGORIES.map((cat, i) => {
      const count = TOURIST_PLACES.filter(p => p.category === cat.id).length;
      return `
        <div class="category-card reveal reveal-delay-${i + 1}" data-category="${cat.id}" style="--cat-color: ${cat.color}">
          <span class="category-card-icon">${cat.icon}</span>
          <span class="category-card-label">${cat.label}</span>
          <span class="category-card-count">${count} place${count !== 1 ? 's' : ''}</span>
        </div>`;
    }).join('');
  }

  // ---- Render: Filter Chips ----
  function renderFilterChips() {
    dom.categoryFilters.innerHTML = CATEGORIES.map(cat => `
      <button class="filter-chip" data-category="${cat.id}" style="--chip-color: ${cat.color}">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');
  }

  // ---- Render: Season Options ----
  function renderSeasonOptions() {
    dom.seasonFilter.innerHTML = SEASONS.map(s =>
      `<option value="${s.id}">${s.label}</option>`
    ).join('');
  }

  // ---- Render: Places Grid ----
  function renderPlaces() {
    const places = state.filteredPlaces;

    if (places.length === 0) {
      dom.placesGrid.innerHTML = '';
      dom.noResults.hidden = false;
    } else {
      dom.noResults.hidden = true;
      dom.placesGrid.innerHTML = places.map(renderPlaceCard).join('');
    }

    dom.resultsCount.textContent = `Showing ${places.length} of ${TOURIST_PLACES.length} places`;
    observeNewCards();
  }

  function renderPlaceCard(place) {
    const cat = getCategoryMeta(place.category);
    const feeText = place.feeType === 'free'
      ? 'Free Entry'
      : `₹${place.entryFee.adult}`;

    return `
      <article class="place-card reveal" data-id="${place.id}">
        <div class="card-image">
          <img src="${place.images[0].src}" alt="${place.images[0].alt}" loading="lazy">
          <span class="card-badge category-badge" style="background: ${cat.color}">${cat.icon} ${cat.label}</span>
          <span class="card-badge rating-badge">⭐ ${place.rating}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${place.name}</h3>
          <p class="card-desc">${place.description}</p>
          <div class="card-meta">
            <span>📍 ${place.location}</span>
            <span>🕐 ${place.timings}</span>
            <span>${place.feeType === 'free' ? '🆓' : '💰'} ${feeText}</span>
          </div>
          <button class="btn btn-text card-cta" data-id="${place.id}">View Details →</button>
        </div>
      </article>`;
  }

  // ---- Render: Modal ----
  function openModal(placeId) {
    const place = TOURIST_PLACES.find(p => p.id === placeId);
    if (!place) return;

    const cat = getCategoryMeta(place.category);
    const feeText = place.feeType === 'free'
      ? 'Free Entry'
      : `Adult: ₹${place.entryFee.adult} | Child: ₹${place.entryFee.child} | Foreign: ₹${place.entryFee.foreign}`;

    const season = SEASONS.find(s => s.id === place.bestSeason);
    const mapsUrl = `https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}`;

    dom.modalContent.innerHTML = `
      <img class="modal-image" src="${place.images[0].src}" alt="${place.images[0].alt}">
      <div class="modal-body">
        <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <span class="modal-category" style="background:${cat.color}">${cat.icon} ${cat.label}</span>
          <span class="modal-rating">⭐ ${place.rating}</span>
        </div>
        <h2>${place.name}</h2>
        <p class="modal-description">${place.longDescription}</p>

        <div class="modal-info-grid">
          <div class="modal-info-item">
            <span class="modal-info-label">📍 Location</span>
            <span class="modal-info-value">${place.location}</span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-label">🕐 Timings</span>
            <span class="modal-info-value">${place.timings}</span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-label">💰 Entry Fee</span>
            <span class="modal-info-value">${feeText}</span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-label">🌤️ Best Season</span>
            <span class="modal-info-value">${season ? season.label : 'Year Round'}</span>
          </div>
        </div>

        <div class="modal-highlights">
          <h4>Highlights</h4>
          <ul>
            ${place.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <a class="modal-map-link" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">
          📍 View on Google Maps
        </a>
      </div>
    `;

    dom.modalOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    state.modalOpen = true;

    // Focus trap
    dom.modalClose.focus();
  }

  function closeModal() {
    dom.modalOverlay.classList.remove('visible');
    dom.modalContent.innerHTML = '';
    document.body.style.overflow = '';
    state.modalOpen = false;
  }

  // ---- Render: Stays ----
  function renderStays() {
    dom.staysGrid.innerHTML = SPONSORED_STAYS.map((stay, i) => `
      <div class="stay-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="stay-image">
          <img src="${stay.image.src}" alt="${stay.image.alt}" loading="lazy">
          <span class="stay-type-badge" style="background:${getStayTypeColor(stay.type)}">${stay.type}</span>
        </div>
        <div class="stay-content">
          <h3 class="stay-name">${stay.name}</h3>
          <p class="stay-tagline">${stay.tagline}</p>
          <div class="stay-meta">
            <span class="stay-price">${stay.priceRange}</span>
            <span class="stay-rating">⭐ ${stay.rating}</span>
          </div>
          <div class="stay-amenities">
            ${stay.amenities.map(a => `<span class="stay-amenity">${a}</span>`).join('')}
          </div>
          <p class="stay-near">📍 Near ${stay.nearTouristSpot}</p>
        </div>
      </div>
    `).join('');
  }

  // ---- Render: Transport ----
  function renderTransport() {
    dom.transportTabs.innerHTML = TRANSPORT_OPTIONS.map((t, i) => `
      <button class="transport-tab${i === 0 ? ' active' : ''}" data-index="${i}">
        <span class="transport-tab-icon">${t.icon}</span>
        <span class="transport-tab-label">${t.title}</span>
      </button>
    `).join('');

    renderTransportPanel(0);
  }

  function renderTransportPanel(index) {
    const t = TRANSPORT_OPTIONS[index];
    dom.transportContent.innerHTML = `
      <div class="transport-panel">
        <p class="transport-description">${t.description}</p>
        <div class="routes-grid">
          ${t.routes.map(r => `
            <div class="route-card">
              <div class="route-endpoints">
                <span class="route-from">${r.from}</span>
                <span class="route-arrow">→</span>
                <span class="route-to">${r.to}</span>
              </div>
              <div class="route-details">
                <span class="route-detail">🕐 <strong>${r.duration}</strong></span>
                <span class="route-detail">💰 <strong>${r.fare}</strong></span>
                <span class="route-detail">🔄 <strong>${r.frequency}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="transport-tips">
          <h4>💡 Tips</h4>
          <ul>
            ${t.tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // ---- Filtering & Sorting ----
  function applyFiltersAndSort() {
    let results = [...TOURIST_PLACES];

    // Search
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    // Category
    if (state.filters.categories.length > 0) {
      results = results.filter(p => state.filters.categories.includes(p.category));
    }

    // Season
    if (state.filters.season !== 'all') {
      results = results.filter(p => p.bestSeason === state.filters.season);
    }

    // Fee type
    if (state.filters.feeType !== 'all') {
      results = results.filter(p => p.feeType === state.filters.feeType);
    }

    // Sort
    results.sort((a, b) => {
      switch (state.sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'popularity':
        default: return b.popularity - a.popularity;
      }
    });

    state.filteredPlaces = results;
    renderPlaces();
    updateActiveFiltersDisplay();
    updateFilterCount();
  }

  function updateActiveFiltersDisplay() {
    const tags = [];

    state.filters.categories.forEach(catId => {
      const cat = getCategoryMeta(catId);
      tags.push(`<span class="active-filter-tag">${cat.icon} ${cat.label} <button data-remove-category="${catId}">&times;</button></span>`);
    });

    if (state.filters.season !== 'all') {
      const s = SEASONS.find(s => s.id === state.filters.season);
      if (s) tags.push(`<span class="active-filter-tag">🌤️ ${s.label} <button data-remove-season>&times;</button></span>`);
    }

    if (state.filters.feeType !== 'all') {
      tags.push(`<span class="active-filter-tag">${state.filters.feeType === 'free' ? '🆓 Free' : '💰 Paid'} <button data-remove-fee>&times;</button></span>`);
    }

    if (state.searchQuery) {
      tags.push(`<span class="active-filter-tag">🔍 "${state.searchQuery}" <button data-remove-search>&times;</button></span>`);
    }

    dom.activeFilters.innerHTML = tags.join('');
  }

  function updateFilterCount() {
    let count = state.filters.categories.length;
    if (state.filters.season !== 'all') count++;
    if (state.filters.feeType !== 'all') count++;

    if (count > 0) {
      dom.filterCount.textContent = count;
      dom.filterCount.hidden = false;
    } else {
      dom.filterCount.hidden = true;
    }
  }

  function clearAllFilters() {
    state.searchQuery = '';
    state.filters.categories = [];
    state.filters.season = 'all';
    state.filters.feeType = 'all';

    dom.searchInput.value = '';
    dom.seasonFilter.value = 'all';

    // Reset category chips
    dom.categoryFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    // Reset category cards
    dom.categoryCards.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));

    // Reset fee segmented control
    dom.feeFilter.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
    dom.feeFilter.querySelector('[data-value="all"]').classList.add('active');
    updateSegmentedIndicator();

    applyFiltersAndSort();
  }

  // ---- Segmented Control Helper ----
  function updateSegmentedIndicator() {
    const activeBtn = dom.feeFilter.querySelector('.seg-btn.active');
    const indicator = dom.feeFilter.querySelector('.seg-indicator');
    if (activeBtn && indicator) {
      indicator.style.left = activeBtn.offsetLeft + 'px';
      indicator.style.width = activeBtn.offsetWidth + 'px';
    }
  }

  // ---- Event Listeners ----
  function setupEventListeners() {
    // Search
    dom.searchInput.addEventListener('input', debounce(function () {
      state.searchQuery = this.value.trim();
      applyFiltersAndSort();
    }, 300));

    // Sort
    dom.sortSelect.addEventListener('change', function () {
      state.sortBy = this.value;
      applyFiltersAndSort();
    });

    // Filter toggle
    dom.filterToggleBtn.addEventListener('click', function () {
      state.filterPanelOpen = !state.filterPanelOpen;
      dom.filterPanel.classList.toggle('open', state.filterPanelOpen);
      this.classList.toggle('active', state.filterPanelOpen);
    });

    // Category filter chips
    dom.categoryFilters.addEventListener('click', function (e) {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      const catId = chip.dataset.category;
      chip.classList.toggle('active');

      if (state.filters.categories.includes(catId)) {
        state.filters.categories = state.filters.categories.filter(c => c !== catId);
      } else {
        state.filters.categories.push(catId);
      }

      // Sync category cards
      syncCategoryCards();
      applyFiltersAndSort();
    });

    // Category quick-link cards
    dom.categoryCards.addEventListener('click', function (e) {
      const card = e.target.closest('.category-card');
      if (!card) return;
      const catId = card.dataset.category;

      card.classList.toggle('active');

      if (state.filters.categories.includes(catId)) {
        state.filters.categories = state.filters.categories.filter(c => c !== catId);
      } else {
        state.filters.categories.push(catId);
      }

      syncFilterChips();
      applyFiltersAndSort();

      // Scroll to places
      document.getElementById('places').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Season filter
    dom.seasonFilter.addEventListener('change', function () {
      state.filters.season = this.value;
      applyFiltersAndSort();
    });

    // Fee filter (segmented control)
    dom.feeFilter.addEventListener('click', function (e) {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;

      dom.feeFilter.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filters.feeType = btn.dataset.value;
      updateSegmentedIndicator();
      applyFiltersAndSort();
    });

    // Clear filters
    dom.clearFilters.addEventListener('click', clearAllFilters);

    // Active filter tag removal
    dom.activeFilters.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;

      if (btn.dataset.removeCategory) {
        state.filters.categories = state.filters.categories.filter(c => c !== btn.dataset.removeCategory);
        syncFilterChips();
        syncCategoryCards();
      } else if (btn.hasAttribute('data-remove-season')) {
        state.filters.season = 'all';
        dom.seasonFilter.value = 'all';
      } else if (btn.hasAttribute('data-remove-fee')) {
        state.filters.feeType = 'all';
        dom.feeFilter.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        dom.feeFilter.querySelector('[data-value="all"]').classList.add('active');
        updateSegmentedIndicator();
      } else if (btn.hasAttribute('data-remove-search')) {
        state.searchQuery = '';
        dom.searchInput.value = '';
      }

      applyFiltersAndSort();
    });

    // Place card click -> modal
    dom.placesGrid.addEventListener('click', function (e) {
      const cta = e.target.closest('.card-cta');
      const card = e.target.closest('.place-card');

      if (cta) {
        openModal(parseInt(cta.dataset.id, 10));
      } else if (card) {
        openModal(parseInt(card.dataset.id, 10));
      }
    });

    // Modal close
    dom.modalClose.addEventListener('click', closeModal);
    dom.modalOverlay.addEventListener('click', function (e) {
      if (e.target === dom.modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.modalOpen) closeModal();
    });

    // Transport tabs
    dom.transportTabs.addEventListener('click', function (e) {
      const tab = e.target.closest('.transport-tab');
      if (!tab) return;

      dom.transportTabs.querySelectorAll('.transport-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTransportPanel(parseInt(tab.dataset.index, 10));
    });

    // Nav toggle (mobile)
    dom.navToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      dom.navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    dom.navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        dom.navToggle.classList.remove('active');
        dom.navLinks.classList.remove('open');
      }
    });

    // Back to top
    dom.backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Window resize -> update segmented indicator
    window.addEventListener('resize', debounce(updateSegmentedIndicator, 150));
  }

  // ---- Sync helpers ----
  function syncFilterChips() {
    dom.categoryFilters.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', state.filters.categories.includes(chip.dataset.category));
    });
  }

  function syncCategoryCards() {
    dom.categoryCards.querySelectorAll('.category-card').forEach(card => {
      card.classList.toggle('active', state.filters.categories.includes(card.dataset.category));
    });
  }

  // ---- Scroll Animations ----
  let observer;

  function setupScrollAnimations() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function observeNewCards() {
    if (!observer) return;
    document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
  }

  // ---- Parallax ----
  function setupParallax() {
    // Only on larger screens
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight && dom.heroBg) {
            dom.heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---- Nav Scroll Behavior ----
  function setupNavScroll() {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollY = window.scrollY;

          // Nav background
          dom.mainNav.classList.toggle('nav-scrolled', scrollY > 80);

          // Back to top visibility
          dom.backToTop.classList.toggle('visible', scrollY > window.innerHeight * 0.5);

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---- Interactive Map ----
  let map, mapMarkers = [], mapPolylines = [], distanceLabels = [];
  const mapSelectedPlaces = [];

  function initMap() {
    dom.mapPlaceList = document.getElementById('mapPlaceList');
    dom.mapClearSelection = document.getElementById('mapClearSelection');
    dom.distanceList = document.getElementById('distanceList');
    dom.distanceTotal = document.getElementById('distanceTotal');
    dom.mapDistancePanel = document.getElementById('mapDistancePanel');

    // Center on Idukki district
    map = L.map('leafletMap', {
      scrollWheelZoom: false,
      zoomControl: true
    }).setView([10.0, 77.05], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    renderMapPlaceList();
    addAllMarkers();
    setupMapEvents();

    // Fix tile rendering when map is inside a hidden/reveal element
    setTimeout(function () { map.invalidateSize(); }, 500);

    // Also invalidate on scroll reveal
    const mapObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          map.invalidateSize();
          mapObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    mapObserver.observe(document.getElementById('leafletMap'));
  }

  function renderMapPlaceList() {
    dom.mapPlaceList.innerHTML = TOURIST_PLACES.map(function (place) {
      const cat = getCategoryMeta(place.category);
      return '<div class="map-place-item" data-id="' + place.id + '">' +
        '<span class="map-item-number">' + place.id + '</span>' +
        '<div class="map-item-info">' +
          '<div class="map-item-name">' + place.name + '</div>' +
          '<div class="map-item-cat">' + cat.icon + ' ' + cat.label + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function addAllMarkers() {
    TOURIST_PLACES.forEach(function (place) {
      var icon = L.divIcon({
        className: 'custom-marker',
        html: '<span>' + place.id + '</span>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      var marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon: icon })
        .addTo(map)
        .bindPopup('<strong>' + place.name + '</strong><br>' + place.location);

      marker.placeId = place.id;
      marker.on('click', function () {
        toggleMapSelection(place.id);
      });

      mapMarkers.push(marker);
    });
  }

  function toggleMapSelection(placeId) {
    var idx = mapSelectedPlaces.indexOf(placeId);
    if (idx > -1) {
      mapSelectedPlaces.splice(idx, 1);
    } else {
      mapSelectedPlaces.push(placeId);
    }
    updateMapUI();
  }

  function clearMapSelection() {
    mapSelectedPlaces.length = 0;
    updateMapUI();
  }

  function updateMapUI() {
    // Update sidebar list
    dom.mapPlaceList.querySelectorAll('.map-place-item').forEach(function (item) {
      var id = parseInt(item.dataset.id, 10);
      var isSelected = mapSelectedPlaces.indexOf(id) > -1;
      item.classList.toggle('selected', isSelected);

      // Update the number to show selection order
      var numEl = item.querySelector('.map-item-number');
      if (isSelected) {
        numEl.textContent = mapSelectedPlaces.indexOf(id) + 1;
      } else {
        numEl.textContent = id;
      }
    });

    // Update markers
    mapMarkers.forEach(function (marker) {
      var isSelected = mapSelectedPlaces.indexOf(marker.placeId) > -1;
      var hasSelection = mapSelectedPlaces.length > 0;
      var el = marker.getElement();
      if (!el) return;
      var inner = el.querySelector('.custom-marker') || el;

      if (isSelected) {
        inner.className = 'custom-marker marker-selected';
        var orderNum = mapSelectedPlaces.indexOf(marker.placeId) + 1;
        inner.querySelector('span').textContent = orderNum;
      } else if (hasSelection) {
        inner.className = 'custom-marker marker-unselected';
        inner.querySelector('span').textContent = marker.placeId;
      } else {
        inner.className = 'custom-marker';
        inner.querySelector('span').textContent = marker.placeId;
      }
    });

    // Draw polylines between selected places
    clearPolylines();
    if (mapSelectedPlaces.length >= 2) {
      drawRouteLines();
      renderDistances();
      fitMapToSelection();
    } else {
      dom.distanceList.innerHTML = '<p class="distance-empty">Select 2 or more places to see distances</p>';
      dom.distanceTotal.classList.remove('visible');
    }
  }

  function clearPolylines() {
    mapPolylines.forEach(function (pl) { map.removeLayer(pl); });
    mapPolylines = [];
    distanceLabels.forEach(function (lb) { map.removeLayer(lb); });
    distanceLabels = [];
  }

  function drawRouteLines() {
    for (var i = 0; i < mapSelectedPlaces.length - 1; i++) {
      var placeA = TOURIST_PLACES.find(function (p) { return p.id === mapSelectedPlaces[i]; });
      var placeB = TOURIST_PLACES.find(function (p) { return p.id === mapSelectedPlaces[i + 1]; });
      if (!placeA || !placeB) continue;

      var latLngs = [
        [placeA.coordinates.lat, placeA.coordinates.lng],
        [placeB.coordinates.lat, placeB.coordinates.lng]
      ];

      var polyline = L.polyline(latLngs, {
        color: '#2d5016',
        weight: 3,
        opacity: 0.8,
        dashArray: '8, 8'
      }).addTo(map);
      mapPolylines.push(polyline);

      // Distance label at midpoint
      var dist = haversineDistance(
        placeA.coordinates.lat, placeA.coordinates.lng,
        placeB.coordinates.lat, placeB.coordinates.lng
      );
      var midLat = (placeA.coordinates.lat + placeB.coordinates.lat) / 2;
      var midLng = (placeA.coordinates.lng + placeB.coordinates.lng) / 2;

      var label = L.marker([midLat, midLng], {
        icon: L.divIcon({
          className: 'distance-label',
          html: dist.toFixed(1) + ' km',
          iconSize: [60, 20],
          iconAnchor: [30, 10]
        }),
        interactive: false
      }).addTo(map);
      distanceLabels.push(label);
    }
  }

  function renderDistances() {
    var rows = '';
    var totalDist = 0;

    for (var i = 0; i < mapSelectedPlaces.length - 1; i++) {
      var placeA = TOURIST_PLACES.find(function (p) { return p.id === mapSelectedPlaces[i]; });
      var placeB = TOURIST_PLACES.find(function (p) { return p.id === mapSelectedPlaces[i + 1]; });
      if (!placeA || !placeB) continue;

      var dist = haversineDistance(
        placeA.coordinates.lat, placeA.coordinates.lng,
        placeB.coordinates.lat, placeB.coordinates.lng
      );
      totalDist += dist;

      rows += '<div class="distance-row">' +
        '<span class="dist-from">' + (i + 1) + '. ' + placeA.name + '</span>' +
        '<span class="dist-arrow">→</span>' +
        '<span class="dist-to">' + (i + 2) + '. ' + placeB.name + '</span>' +
        '<span class="dist-value">' + dist.toFixed(1) + ' km</span>' +
      '</div>';
    }

    dom.distanceList.innerHTML = rows;

    if (mapSelectedPlaces.length > 2) {
      dom.distanceTotal.textContent = 'Total distance: ' + totalDist.toFixed(1) + ' km (straight line)';
      dom.distanceTotal.classList.add('visible');
    } else {
      dom.distanceTotal.classList.remove('visible');
    }
  }

  function fitMapToSelection() {
    var coords = mapSelectedPlaces.map(function (id) {
      var p = TOURIST_PLACES.find(function (pl) { return pl.id === id; });
      return [p.coordinates.lat, p.coordinates.lng];
    });
    var bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function setupMapEvents() {
    dom.mapPlaceList.addEventListener('click', function (e) {
      var item = e.target.closest('.map-place-item');
      if (!item) return;
      var id = parseInt(item.dataset.id, 10);
      toggleMapSelection(id);
    });

    dom.mapClearSelection.addEventListener('click', clearMapSelection);
  }

  // ---- Bootstrap ----
  function init() {
    cacheDom();
    renderCategoryCards();
    renderFilterChips();
    renderSeasonOptions();
    applyFiltersAndSort();
    renderStays();
    renderTransport();
    setupEventListeners();
    setupScrollAnimations();
    setupParallax();
    setupNavScroll();
    updateSegmentedIndicator();
    initMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
