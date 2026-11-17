const account = (() => {
  const TRIPS_KEY = "roamly-trips";
  const authModal = $("#authModal");
  const passportModal = $("#passportModal");
  const writeToStorage = storage.write;

  const levels = [
    { name: "Начинающий путник", from: 0 },
    { name: "Исследователь", from: 2 },
    { name: "Кочевник", from: 5 },
    { name: "Гражданин мира", from: 8 }
  ];

  function openLayer(layer) {
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLayer(layer) {
    layer.classList.remove("is-open");
    layer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openAuth(view = "login") {
    Auth.switchView($("[data-auth-root]", authModal), view);
    openLayer(authModal);
  }

  function openPassport(tab = "trips") {
    renderPassport();
    selectTab(tab);
    openLayer(passportModal);
  }

  function selectTab(name) {
    $$("#passportTabs button").forEach((button) => button.classList.toggle("is-active", button.dataset.ptab === name));
    $$("[data-ppanel]", passportModal).forEach((panel) => (panel.hidden = panel.dataset.ppanel !== name));
  }

  function loadTrips() {
    if (Auth.isLoggedIn()) {
      const saved = Auth.getData("trips", null);
      if (saved === null) {
        const guestTrips = storage.read(TRIPS_KEY, []);
        trips = guestTrips;
        Auth.setData("trips", guestTrips);
        if (guestTrips.length) showToast(`Перенесли ${guestTrips.length} ${plural(guestTrips.length, ["поездку", "поездки", "поездок"])} в ваш паспорт`);
      } else {
        trips = saved;
      }
    } else {
      trips = storage.read(TRIPS_KEY, []);
    }
    renderTrips();
  }

  function renderPassport() {
    const user = Auth.current();
    if (!user) return;

    const uniqueDestinations = [...new Set(trips.map((trip) => trip.dest))].map(findDest);
    const countries = new Set(uniqueDestinations.map((dest) => dest.country));
    const days = trips.reduce((sum, trip) => sum + trip.days, 0);
    const level = [...levels].reverse().find((item) => trips.length >= item.from);

    $("#passportNumber").textContent = `№ ${user.id.slice(0, 8).toUpperCase()}`;
    $("#passportLevel").textContent = level.name;
    $("#statTrips").textContent = trips.length;
    $("#statCountries").textContent = countries.size;
    $("#statDays").textContent = days;

    $("#stamps").innerHTML = uniqueDestinations
      .slice(0, 6)
      .map((dest, index) => `<span class="stamp" style="--stamp:${index % 2 ? "#ffc84a" : "#7fd8c5"}; --r:${(index % 3) * 9 - 9}deg; --i:${index}">${dest.name}</span>`)
      .join("");

    const latin = Auth.initials(user.name).replace(/[^A-Z]/g, "") || "RM";
    $("#passportMrz").textContent = `P<RML${latin}<<<${user.id.toUpperCase()}<<<<<<<<<<<<<<<<<<<<`;

    $("#passportTrips").innerHTML = trips.length
      ? trips
          .map((trip, index) => {
            const dest = findDest(trip.dest);
            return `
            <article class="trip" style="animation-delay:${index * 50}ms">
              <div class="trip__img" style="--tone:${dest.tone}"><img src="${photo(dest.img, 200)}" alt=""></div>
              <div class="trip__info">
                <b>${dest.name}</b>
                <small>${trip.days} ${plural(trip.days, ["день", "дня", "дней"])} · ${styleNames[trip.style]} · ${rub(trip.total)}</small>
              </div>
              <div class="trip__actions"><button data-open-trip="${trip.id}">Открыть</button></div>
            </article>`;
          })
          .join("")
      : `<p class="trips__empty">Паспорт пока чист — соберите первую поездку в планировщике ✈</p>`;
  }

  function init() {
    storage.write = (key, value) => {
      if (key === TRIPS_KEY && Auth.isLoggedIn()) Auth.setData("trips", value);
      else writeToStorage(key, value);
    };

    Auth.init({
      namespace: "roamly",
      demo: { name: "Лиза Странникова", email: "demo@roamly.travel", password: "Demo2026" }
    });

    $("#travelerBtn").addEventListener("click", () => (Auth.isLoggedIn() ? openPassport() : openAuth()));
    $$("[data-close-auth]").forEach((element) => element.addEventListener("click", () => closeLayer(authModal)));
    $$("[data-close-passport]").forEach((element) => element.addEventListener("click", () => closeLayer(passportModal)));

    $("#passportTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-ptab]");
      if (button) selectTab(button.dataset.ptab);
    });

    $("#passportTrips").addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-trip]");
      if (!button) return;
      const trip = trips.find((item) => item.id === Number(button.dataset.openTrip));
      Object.assign(plan, { dest: trip.dest, days: trip.days, style: trip.style, travelers: trip.travelers });
      $("#planDest").value = trip.dest;
      $("#planDays").value = trip.days;
      renderPlan();
      closeLayer(passportModal);
      $("#planner").scrollIntoView({ behavior: "smooth" });
    });

    document.addEventListener("auth:change", loadTrips);

    document.addEventListener("auth:success", ({ detail }) => {
      if (["login", "register", "demo"].includes(detail.type)) {
        closeLayer(authModal);
        showToast(`🌍 Привет, ${detail.user.name.split(" ")[0]}! Паспорт готов`);
        setTimeout(() => openPassport(), 400);
      }
      if (detail.type === "logout") {
        closeLayer(passportModal);
        showToast("До новых путешествий!");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeLayer(authModal);
      closeLayer(passportModal);
    });

    loadTrips();
  }

  return { init, openAuth, openPassport };
})();

account.init();
