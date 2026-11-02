(function () {

  const LISTING_PAGE = 'listing.html';
  const MORE_PAGE = 'more.html';

  // budget option value on the home page -> [lowest price, highest price]
  const BUDGETS = {
    '49.99': [49.99, 200],
    '200': [200, 500],
    '500': [500, 1000],
    '1000': [1000, 1500],
    '1500': [1500, 1999]
  };

  // floor option text -> [lowest floor, highest floor]
  const FLOORS = {
    'Ground Floor': [0, 0],
    '1st - 3rd Floor': [1, 3],
    '4th - 6th Floor': [4, 6],
    '7th - 10th Floor': [7, 10],
    'Above 10th Floor': [11, 200]
  };

  const AVAILABILITY = ['Available Now', 'Available This Week', 'Available This Month'];

  // label on the More Filters page -> name used in the web address
  const SELECT_KEYS = {
    'Property Type': 'type',
    'Bedrooms': 'bedrooms',
    'Bathrooms': 'bathrooms',
    'Property Size': 'size',
    'Floor Level': 'floor',
    'Furnishing': 'furnishing',
    'Availability': 'availability',
    'Lease Duration': 'lease',
    'Utilities': 'utilities',
    'Payment Method': 'payment',
    'Smoking Policy': 'smoking',
    'Pet Policy': 'pets',
    'Guest Policy': 'guests',
    'Noise Policy': 'noise'
  };

  // section title on the More Filters page -> name used in the web address
  const CHECK_KEYS = {
    'Amenities & Facilities': 'amenities',
    'Parking Options': 'parking'
  };

  /* ---------- small helpers ---------- */

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function go(page, params) {
    const qs = params.toString();
    window.location.href = page + (qs ? '?' + qs : '');
  }

  function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  // scrolls so the results start just under the fixed header
  function scrollToResults() {
    const list = $('#room-list');
    if (!list) return;
    const top = list.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  /* ---------- header search bar (every page) ---------- */

  function setupHeaderSearch() {
    const input = $('.icon-search input');
    if (!input) return;

    const icon = $('.icon-search img');
    const onListing = !!$('#room-list');

    // on the listing page, show the current search text in the bar
    if (onListing) input.value = getParams().get('q') || '';

    function search(scroll) {
      const text = input.value.trim();

      if (onListing) {
        // filter right here, without reloading the page
        const p = getParams();
        if (text) p.set('q', text); else p.delete('q');
        const qs = p.toString();
        history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
        renderListing();
        if (scroll) scrollToResults();
      } else {
        // other pages: open the listing page with the search text
        const p = new URLSearchParams();
        if (text) p.set('q', text);
        go(LISTING_PAGE, p);
      }
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        search(true);
      }
      // Esc clears the search
      if (e.key === 'Escape' && onListing) {
        input.value = '';
        search(false);
      }
    });

    // on the listing page the cards filter while you type
    if (onListing) {
      input.addEventListener('input', function () { search(false); });
    }

    if (icon) {
      icon.style.cursor = 'pointer';
      icon.addEventListener('click', function () { search(true); });
    }
  }

  /* ---------- "Find a rental" box on the home page ---------- */

  function setupHomeFilter() {
    const box = $('.container-filter');
    if (!box) return;

    const location = $('.location-filter select', box);
    const budget = $('.monthly-filter select', box);
    const area = $('.located-filter select', box);

    function collect() {
      const p = new URLSearchParams();
      if (location.value) p.set('location', location.value);
      if (budget.value) p.set('budget', budget.value);
      if (area.value) p.set('area', area.value);
      return p;
    }

    $('.search-main', box).addEventListener('click', function (e) {
      e.preventDefault();
      go(LISTING_PAGE, collect());
    });

    // More Filters keeps what was already chosen
    $('.filter-more', box).addEventListener('click', function (e) {
      e.preventDefault();
      go(MORE_PAGE, collect());
    });
  }

  /* ---------- More Filters page ---------- */

  function setupMorePage() {
    const page = $('.more-filters');
    if (!page) return;

    // every dropdown, with the name it uses in the web address
    const selects = $$('.filter-group', page).map(function (group) {
      return {
        key: SELECT_KEYS[$('label', group).textContent.trim()],
        select: $('select', group)
      };
    }).filter(function (item) { return item.key; });

    // every group of checkboxes
    const checkGroups = $$('.filter-section', page).map(function (section) {
      return {
        key: CHECK_KEYS[$('h3', section).textContent.trim()],
        boxes: $$('input[type="checkbox"]', section)
      };
    }).filter(function (item) { return item.key; });

    function labelOf(box) {
      return box.parentElement.textContent.trim();
    }

    // fill the form with what was chosen before
    const params = getParams();

    selects.forEach(function (item) {
      const wanted = params.get(item.key);
      if (!wanted) return;
      const index = Array.from(item.select.options).findIndex(function (o) {
        return o.text.trim() === wanted;
      });
      if (index > 0) item.select.selectedIndex = index;
    });

    checkGroups.forEach(function (group) {
      const chosen = (params.get(group.key) || '').split(',');
      group.boxes.forEach(function (box) {
        box.checked = chosen.includes(labelOf(box));
      });
    });

    // Apply Filters
    $('.apply-btn', page).addEventListener('click', function (e) {
      e.preventDefault();
      const p = getParams(); // keeps the home page choices

      selects.forEach(function (item) {
        p.delete(item.key);
        if (item.select.selectedIndex > 0) {
          p.set(item.key, item.select.options[item.select.selectedIndex].text.trim());
        }
      });

      checkGroups.forEach(function (group) {
        p.delete(group.key);
        const chosen = group.boxes.filter(function (b) { return b.checked; }).map(labelOf);
        if (chosen.length) p.set(group.key, chosen.join(','));
      });

      go(LISTING_PAGE, p);
    });

    // Reset All
    $('.reset-btn', page).addEventListener('click', function (e) {
      e.preventDefault();
      selects.forEach(function (item) { item.select.selectedIndex = 0; });
      checkGroups.forEach(function (group) {
        group.boxes.forEach(function (b) { b.checked = false; });
      });
    });
  }

  /* ---------- listing page ---------- */

  function matchCount(wanted, actual) {
    // "Studio" = 0, "2 Bedrooms" = exactly 2, "5+ Bedrooms" = 5 or more
    if (wanted === 'Studio') return actual === 0;
    const n = parseInt(wanted, 10);
    return wanted.includes('+') ? actual >= n : actual === n;
  }

  function matchSize(wanted, size) {
    const nums = wanted.match(/\d+/g).map(Number);
    if (wanted.startsWith('Under')) return size < nums[0];
    if (wanted.includes('+')) return size >= nums[0];
    return size >= nums[0] && size < nums[1];
  }

  function matchAvailability(wanted, actual) {
    if (wanted === 'Coming Soon') return actual === 'Coming Soon';
    const a = AVAILABILITY.indexOf(actual);
    return a !== -1 && a <= AVAILABILITY.indexOf(wanted);
  }

  function matchUtilities(wanted, actual) {
    if (actual === wanted) return true;
    // "Utilities Included" covers electricity and water too
    return (wanted === 'Electricity Included' || wanted === 'Water Included') &&
           actual === 'Utilities Included';
  }

  function hasAll(have, wanted) {
    if (!wanted) return true;
    return wanted.split(',').every(function (item) { return have.includes(item); });
  }

  function matches(room, p) {
    const get = function (key) { return p.get(key) || ''; };

    // words typed in the header search bar
    const q = get('q').toLowerCase().trim();
    if (q) {
      const text = [
        room.name, room.area, room.type,
        room.size + ' m² m2 ' + room.size + 'm2 ' + room.size + 'm²',
        'phnom penh'
      ].join(' ').toLowerCase();

      const words = q.split(/\s+/);

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word === '$') continue;

        // a number from 50 to 1999 (with or without $) is a price
        const num = Number(word.replace(/^\$/, ''));
        if (/^\$?\d+(\.\d+)?$/.test(word) && num >= 50 && num <= 1999) {
          if (room.price > num) return false;
        } else if (!text.includes(word)) {
          return false;
        }
      }
    }

    // filters from the home page
    if (get('location') && room.city !== get('location')) return false;
    if (get('area') && slug(room.area) !== get('area')) return false;
    if (get('budget')) {
      const range = BUDGETS[get('budget')];
      if (range && (room.price < range[0] || room.price > range[1])) return false;
    }

    // filters from the More Filters page
    if (get('type') && room.type !== get('type')) return false;
    if (get('bedrooms') && !matchCount(get('bedrooms'), room.bedrooms)) return false;
    if (get('bathrooms') && !matchCount(get('bathrooms'), room.bathrooms)) return false;
    if (get('size') && !matchSize(get('size'), room.size)) return false;

    if (get('floor')) {
      const range = FLOORS[get('floor')];
      if (range && (room.floor < range[0] || room.floor > range[1])) return false;
    }

    if (get('furnishing') && room.furnishing !== get('furnishing')) return false;
    if (get('availability') && !matchAvailability(get('availability'), room.availability)) return false;
    if (get('lease') && !room.lease.includes(get('lease'))) return false;
    if (get('utilities') && !matchUtilities(get('utilities'), room.utilities)) return false;
    if (get('payment') && !room.payment.includes(get('payment'))) return false;

    // the room must have every ticked box
    if (!hasAll(room.amenities, get('amenities'))) return false;
    if (!hasAll(room.parking, get('parking'))) return false;

    const ruleKeys = ['smoking', 'pets', 'guests', 'noise'];
    for (let i = 0; i < ruleKeys.length; i++) {
      if (get(ruleKeys[i]) && room.rules[ruleKeys[i]] !== get(ruleKeys[i])) return false;
    }

    return true;
  }

  // shows or hides the cards already written in listing.html
  function renderListing() {
    const list = $('#room-list');
    if (!list) return;

    const p = getParams();
    let shown = 0;

    $$('.room-card', list).forEach(function (card) {
      // find the room by the title written inside the card
      const title = $('.room-title', card);
      const name = title ? title.textContent.trim() : '';
      const room = ROOMS.find(function (r) { return r.name === name; });

      // send "More Detail" to the booking page with this room
      const btn = $('.room-btn', card);
      if (room && btn) btn.setAttribute('href', 'booknow.html?room=' + room.id);

      const show = room ? matches(room, p) : true;
      const wasHidden = card.style.display === 'none';

      card.style.display = show ? '' : 'none';

      if (show) {
        shown++;
        // fade in cards that come back after being hidden
        if (wasHidden) {
          card.classList.remove('fade-in');
          void card.offsetWidth;
          card.classList.add('fade-in');
        }
      }
    });

    const old = $('.no-results', list);
    if (old) old.remove();

    if (shown === 0) {
      const qs = p.toString();
      list.insertAdjacentHTML('beforeend',
        '<div class="no-results">' +
          '<h4>No rooms match your search</h4>' +
          '<p>Try a different keyword or remove some filters.</p>' +
          '<a href="' + MORE_PAGE + (qs ? '?' + qs : '') + '">Change filters</a>' +
        '</div>');
    }
  }

  /* ---------- start ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    setupHeaderSearch();
    setupHomeFilter();
    setupMorePage();
    renderListing();
  });

})();