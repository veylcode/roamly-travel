const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const photo = (id, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const rub = (value) => new Intl.NumberFormat("ru-RU").format(Math.round(value / 100) * 100) + " ₽";

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const plural = (count, forms) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
};

const destinations = [
  {
    id: "santorini",
    name: "Санторини",
    country: "Греция",
    mood: "sea",
    months: [5, 6, 7, 8, 9, 10],
    rating: 4.9,
    tone: "#2f6fae",
    img: "1570077188670-e3a8d69ac5ff",
    costs: { flight: 34000, stay: { budget: 5200, comfort: 12500, luxury: 36000 }, food: 3800, fun: 3200 },
    activities: [
      ["Закат в Ие", "Лучшая точка — у старой мельницы, приходите за час"],
      ["Кальдера на катамаране", "Купание в горячих источниках у вулкана"],
      ["Красный пляж", "Обрывы цвета терракоты и прозрачная вода"],
      ["Винодельни Санторини", "Ассиртико на вулканической почве"],
      ["Тропа Фира — Ия", "10 км над кальдерой с видом на всё Эгейское море"],
      ["Древняя Акротири", "Минойский город, засыпанный пеплом"]
    ]
  },
  {
    id: "bali",
    name: "Бали",
    country: "Индонезия",
    mood: "exotic",
    months: [4, 5, 6, 7, 8, 9],
    rating: 4.8,
    tone: "#2a8a5a",
    img: "1537996194471-e657df975ab4",
    costs: { flight: 62000, stay: { budget: 2800, comfort: 7500, luxury: 26000 }, food: 2200, fun: 2800 },
    activities: [
      ["Рисовые террасы Тегаллаланг", "Приезжайте к рассвету, пока нет туристов"],
      ["Храм Улувату", "Огненный танец кечак на скале над океаном"],
      ["Урок сёрфинга в Чангу", "Мягкие волны для новичков"],
      ["Водопад Тегенунган", "Купание под струями в джунглях"],
      ["Рассвет на вулкане Батур", "Подъём в 4 утра стоит каждой минуты"],
      ["Убуд и лес обезьян", "Ремесленные рынки и йога-студии"]
    ]
  },
  {
    id: "tokyo",
    name: "Токио",
    country: "Япония",
    mood: "city",
    months: [3, 4, 5, 10, 11],
    rating: 4.9,
    tone: "#b8325a",
    img: "1540959733332-eab4deabeeaf",
    costs: { flight: 58000, stay: { budget: 4800, comfort: 11000, luxury: 34000 }, food: 4200, fun: 3600 },
    activities: [
      ["Сибуя и Харадзюку", "Самый известный перекрёсток и уличная мода"],
      ["Рынок Цукидзи", "Завтрак из свежайших суши"],
      ["Асакуса и Сэнсо-дзи", "Старейший храм Токио"],
      ["teamLab Planets", "Иммерсивное цифровое искусство"],
      ["Однодневка в Камакуру", "Большой Будда и прибрежные храмы"],
      ["Вечер в Синдзюку", "Крошечные бары Голден-гая"]
    ]
  },
  {
    id: "dolomites",
    name: "Доломиты",
    country: "Италия",
    mood: "mountains",
    months: [6, 7, 8, 9, 12, 1, 2],
    rating: 4.9,
    tone: "#5b6b3a",
    img: "1506905925346-21bda4d32df4",
    costs: { flight: 29000, stay: { budget: 6200, comfort: 13000, luxury: 32000 }, food: 4000, fun: 3500 },
    activities: [
      ["Тре-Чиме-ди-Лаваредо", "Классический круговой трек вокруг трёх вершин"],
      ["Озеро Брайес", "Изумрудная вода и деревянные лодки"],
      ["Сечеда", "Пики, будто вырезанные ножом"],
      ["Канатная дорога Мармолада", "Ледник на высоте 3 300 м"],
      ["Кортина-д’Ампеццо", "Альпийский шик и тирольская кухня"],
      ["Виа феррата", "Маршрут по скалам со страховкой"]
    ]
  },
  {
    id: "maldives",
    name: "Мальдивы",
    country: "Мальдивы",
    mood: "sea",
    months: [11, 12, 1, 2, 3, 4],
    rating: 5.0,
    tone: "#1f9bb0",
    img: "1514282401047-d79a71a590e8",
    costs: { flight: 72000, stay: { budget: 9000, comfort: 24000, luxury: 78000 }, food: 5200, fun: 6000 },
    activities: [
      ["Снорклинг на рифе", "Черепахи и рифовые акулы в паре метров"],
      ["Песчаная коса", "Пикник на острове, которого нет на картах"],
      ["Дайвинг с мантами", "Сезонные скопления у атолла Баа"],
      ["Ужин под водой", "Ресторан на глубине пяти метров"],
      ["Закатная рыбалка", "Традиционная мальдивская лодка дхони"],
      ["Спа над океаном", "Массаж с видом через стеклянный пол"]
    ]
  },
  {
    id: "paris",
    name: "Париж",
    country: "Франция",
    mood: "city",
    months: [4, 5, 6, 9, 10, 12],
    rating: 4.7,
    tone: "#6a5a8c",
    img: "1502602898657-3e91760cbb34",
    costs: { flight: 27000, stay: { budget: 6500, comfort: 14000, luxury: 42000 }, food: 4800, fun: 3800 },
    activities: [
      ["Утро в Маре", "Круассаны, галереи и винтажные лавки"],
      ["Лувр без очередей", "Вход через Порт-де-Лион"],
      ["Монмартр", "Художники на площади Тертр и вид на город"],
      ["Прогулка по Сене", "Катер на закате мимо Нотр-Дам"],
      ["Музей Орсе", "Импрессионисты в здании вокзала"],
      ["Версаль", "Дворец, сады и фонтаны по выходным"]
    ]
  },
  {
    id: "iceland",
    name: "Исландия",
    country: "Исландия",
    mood: "mountains",
    months: [6, 7, 8, 9, 2, 3],
    rating: 4.8,
    tone: "#3c5d73",
    img: "1504893524553-b855bce32c67",
    costs: { flight: 41000, stay: { budget: 7800, comfort: 16000, luxury: 38000 }, food: 5600, fun: 5200 },
    activities: [
      ["Золотое кольцо", "Гейзеры, Гюдльфосс и разлом Тингвеллир"],
      ["Голубая лагуна", "Геотермальная вода посреди лавовых полей"],
      ["Чёрный пляж Рейнисфьяра", "Базальтовые колонны и бушующий океан"],
      ["Ледниковая лагуна", "Айсберги на чёрном песке"],
      ["Охота за северным сиянием", "Лучше всего — в безлунную ночь"],
      ["Ледяная пещера", "Синий лёд ледника Ватнайёкюдль"]
    ]
  },
  {
    id: "marrakech",
    name: "Марракеш",
    country: "Марокко",
    mood: "exotic",
    months: [3, 4, 5, 10, 11],
    rating: 4.6,
    tone: "#c0562b",
    img: "1597212618440-806262de4f6b",
    costs: { flight: 36000, stay: { budget: 3200, comfort: 8500, luxury: 28000 }, food: 2400, fun: 2600 },
    activities: [
      ["Площадь Джемаа-эль-Фна", "Заклинатели змей и уличная еда"],
      ["Сад Мажорель", "Ярко-синие стены и кактусы"],
      ["Медина и суки", "Торгуйтесь — это часть культуры"],
      ["Хаммам", "Традиционный ритуал с чёрным мылом"],
      ["Ночь в пустыне Агафай", "Ужин под звёздами в шатре"],
      ["Атласские горы", "Берберские деревни и долина Урика"]
    ]
  }
];

const styleNames = { budget: "Эконом", comfort: "Комфорт", luxury: "Люкс" };
const styleFactor = { budget: 0.8, comfort: 1, luxury: 1.9 };

const storage = {
  read: (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  write: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

const filters = { mood: "all", month: 0, query: "" };
const plan = { dest: destinations[0].id, days: 7, style: "budget", travelers: 2 };
let trips = storage.read("roamly-trips", []);

const findDest = (id) => destinations.find((dest) => dest.id === id);

function showToast(text) {
  const toast = $("#toast");
  toast.textContent = text;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function initHero() {
  const slides = destinations.slice(0, 5);
  const duration = 6000;
  const container = $("#heroSlides");
  const bars = $("#heroBars");
  const place = $("#heroPlace");
  let current = 0;
  let timer;

  container.innerHTML = slides
    .map((dest, index) => `<div class="hero__slide ${index === 0 ? "is-active" : ""}" style="background:${dest.tone}"><img src="${photo(dest.img, 1900)}" alt="${dest.name}"></div>`)
    .join("");
  bars.innerHTML = slides.map((dest) => `<button aria-label="${dest.name}"></button>`).join("");
  bars.style.setProperty("--duration", `${duration}ms`);
  $("#heroTotal").textContent = slides.length;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    $$(".hero__slide", container).forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    $$("button", bars).forEach((bar, i) => {
      bar.classList.remove("is-active");
      bar.classList.toggle("is-done", i < current);
    });
    void bars.offsetWidth;
    $$("button", bars)[current].classList.add("is-active");

    place.classList.add("is-changing");
    void place.offsetWidth;
    place.textContent = slides[current].name;
    place.classList.remove("is-changing");
    $("#heroCountry").textContent = slides[current].country;
    $("#heroIndex").textContent = current + 1;

    clearTimeout(timer);
    timer = setTimeout(() => show(current + 1), duration);
  };

  bars.addEventListener("click", (event) => {
    const bar = event.target.closest("button");
    if (bar) show($$("button", bars).indexOf(bar));
  });

  show(0);
}

function initFinder() {
  const form = $("#finder");
  $("#placesList").innerHTML = destinations.map((dest) => `<option value="${dest.name}">`).join("");
  $("#finderMonth").innerHTML =
    `<option value="0">Любой месяц</option>` + monthNames.map((name, index) => `<option value="${index + 1}">${name}</option>`).join("");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const where = form.elements.where.value.trim().toLowerCase();
    filters.query = where;
    filters.mood = form.elements.mood.value;
    filters.month = Number(form.elements.month.value);

    const exact = destinations.find((dest) => dest.name.toLowerCase() === where);
    if (exact) {
      plan.dest = exact.id;
      $("#planDest").value = exact.id;
      renderPlan();
    }

    syncFilterButtons();
    renderDestinations();
    $("#destinations").scrollIntoView({ behavior: "smooth" });
  });
}

function syncFilterButtons() {
  $$(".mood").forEach((button) => button.classList.toggle("is-active", button.dataset.mood === filters.mood));
  $$(".month").forEach((button) => button.classList.toggle("is-active", Number(button.dataset.month) === filters.month));
}

function renderDestinations() {
  const seasonMonth = filters.month || new Date().getMonth() + 1;
  const list = destinations.filter(
    (dest) =>
      (filters.mood === "all" || dest.mood === filters.mood) &&
      (!filters.month || dest.months.includes(filters.month)) &&
      (!filters.query || `${dest.name} ${dest.country}`.toLowerCase().includes(filters.query))
  );

  $("#destTrack").innerHTML = list
    .map((dest, index) => {
      const perDay = dest.costs.stay.budget + dest.costs.food + dest.costs.fun;
      const inSeason = dest.months.includes(seasonMonth);
      return `
        <article class="dest" style="--i:${index}; --tone:${dest.tone}">
          <img src="${photo(dest.img, 700)}" alt="${dest.name}" loading="lazy">
          <div class="dest__top">
            <span class="dest__badge ${inSeason ? "dest__badge--season" : ""}">${inSeason ? "☀ Сезон" : `★ ${dest.rating}`}</span>
            <button class="dest__add" data-plan="${dest.id}" aria-label="Спланировать поездку">+</button>
          </div>
          <div class="dest__body">
            <p class="dest__country">${dest.country}</p>
            <h3 class="dest__name">${dest.name}</h3>
            <div class="dest__info">
              <span class="dest__price">от <b>${rub(dest.costs.flight + perDay * 5)}</b></span>
              <span>5 дней · ★ ${dest.rating}</span>
            </div>
          </div>
        </article>`;
    })
    .join("");

  $("#destEmpty").hidden = list.length > 0;
}

function initDestinations() {
  $("#months").innerHTML =
    `<button class="month is-active" data-month="0">Любой месяц</button>` +
    monthNames.map((name, index) => `<button class="month" data-month="${index + 1}">${name}</button>`).join("");

  $("#moods").addEventListener("click", (event) => {
    const button = event.target.closest(".mood");
    if (!button) return;
    filters.mood = button.dataset.mood;
    filters.query = "";
    syncFilterButtons();
    renderDestinations();
  });

  $("#months").addEventListener("click", (event) => {
    const button = event.target.closest(".month");
    if (!button) return;
    filters.month = Number(button.dataset.month);
    filters.query = "";
    syncFilterButtons();
    renderDestinations();
  });

  $("#destTrack").addEventListener("click", (event) => {
    const button = event.target.closest("[data-plan]");
    if (!button) return;
    plan.dest = button.dataset.plan;
    $("#planDest").value = plan.dest;
    renderPlan();
    $("#planner").scrollIntoView({ behavior: "smooth" });
  });

  const scrollBy = (direction) => {
    const track = $("#destTrack");
    const card = $(".dest", track);
    if (card) track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
  };
  $("#prevDest").addEventListener("click", () => scrollBy(-1));
  $("#nextDest").addEventListener("click", () => scrollBy(1));

  renderDestinations();
}

function calculateBudget({ dest: destId, days, style, travelers }) {
  const dest = findDest(destId);
  const nights = days - 1;
  const rooms = Math.ceil(travelers / 2);
  const parts = [
    { label: "Перелёт", value: dest.costs.flight * travelers * (style === "luxury" ? 2.4 : 1), color: "#ff6a3d" },
    { label: "Проживание", value: dest.costs.stay[style] * nights * rooms, color: "#ffc84a" },
    { label: "Еда", value: dest.costs.food * days * travelers * styleFactor[style], color: "#2bb3a3" },
    { label: "Впечатления", value: dest.costs.fun * (days - 2) * travelers * styleFactor[style], color: "#8fa8ff" }
  ];
  return { parts, total: parts.reduce((sum, part) => sum + part.value, 0) };
}

function buildItinerary(dest, days) {
  const result = [["Прилёт и заселение", `Неспешный вечер: прогулка и первый ужин — ${dest.name} знакомится с вами`]];
  for (let day = 1; day < days - 1; day += 1) {
    const activity = dest.activities[(day - 1) % dest.activities.length];
    const isRest = day > dest.activities.length && day % 3 === 0;
    result.push(isRest ? ["Свободный день", "Без планов: пляж, кафе или повторить самое любимое"] : activity);
  }
  result.push(["Вылет домой", "Последний завтрак, сувениры и трансфер в аэропорт"]);
  return result;
}

function renderPlan() {
  const dest = findDest(plan.dest);
  const { parts, total } = calculateBudget(plan);
  const max = Math.max(...parts.map((part) => part.value));
  const range = $("#planDays");

  $("#daysOut").textContent = `${plan.days} ${plural(plan.days, ["день", "дня", "дней"])}`;
  range.style.setProperty("--fill", `${((plan.days - range.min) / (range.max - range.min)) * 100}%`);
  $("#travelersOut").textContent = plan.travelers;
  $$("#planStyle button").forEach((button) => button.classList.toggle("is-active", button.dataset.style === plan.style));

  $("#budgetTotal").textContent = rub(total);
  $("#budgetPer").textContent = `≈ ${rub(total / plan.travelers)} на человека`;
  $("#budgetBars").innerHTML = parts
    .map(
      (part) => `
      <li>
        <div class="row"><span>${part.label}</span><b>${rub(part.value)}</b></div>
        <div class="track"><div class="fill" style="width:${(part.value / max) * 100}%; background:${part.color}"></div></div>
      </li>`
    )
    .join("");

  const cover = $("#planCover");
  cover.style.setProperty("--tone", dest.tone);
  const image = $("#planImage");
  const src = photo(dest.img, 1200);
  if (image.getAttribute("src") !== src) image.src = src;
  image.alt = dest.name;
  $("#planName").textContent = dest.name;
  $("#planMeta").textContent = `${dest.country} · ${styleNames[plan.style]} · ${plan.travelers} ${plural(plan.travelers, ["путешественник", "путешественника", "путешественников"])}`;

  $("#itinerary").innerHTML = buildItinerary(dest, plan.days)
    .map(
      ([title, text], index) => `
      <li class="day" style="--i:${index}">
        <span class="day__num">День<b>${index + 1}</b></span>
        <div><h4>${title}</h4><p>${text}</p></div>
      </li>`
    )
    .join("");
}

function initPlanner() {
  const select = $("#planDest");
  select.innerHTML = destinations.map((dest) => `<option value="${dest.id}">${dest.name}, ${dest.country}</option>`).join("");

  select.addEventListener("change", () => {
    plan.dest = select.value;
    renderPlan();
  });

  $("#planDays").addEventListener("input", (event) => {
    plan.days = Number(event.target.value);
    renderPlan();
  });

  $("#planStyle").addEventListener("click", (event) => {
    const button = event.target.closest("[data-style]");
    if (!button) return;
    plan.style = button.dataset.style;
    renderPlan();
  });

  $$("[data-travelers]").forEach((button) =>
    button.addEventListener("click", () => {
      plan.travelers = Math.min(Math.max(plan.travelers + Number(button.dataset.travelers), 1), 8);
      renderPlan();
    })
  );

  $("#saveTrip").addEventListener("click", () => {
    const { total } = calculateBudget(plan);
    trips.unshift({ ...plan, total, id: Date.now() });
    storage.write("roamly-trips", trips);
    renderTrips();
    showToast(`✈ Поездка в ${findDest(plan.dest).name} сохранена`);
    const counter = $("#tripsCount");
    counter.classList.remove("is-bump");
    void counter.offsetWidth;
    counter.classList.add("is-bump");
  });

  renderPlan();
}

function renderTrips() {
  $("#tripsCount").textContent = trips.length;
  $("#tripsList").innerHTML = trips.length
    ? trips
        .map((trip) => {
          const dest = findDest(trip.dest);
          return `
          <article class="trip">
            <div class="trip__img" style="--tone:${dest.tone}"><img src="${photo(dest.img, 200)}" alt=""></div>
            <div class="trip__info">
              <b>${dest.name}</b>
              <small>${trip.days} ${plural(trip.days, ["день", "дня", "дней"])} · ${styleNames[trip.style]} · ${trip.travelers} чел.</small>
              <small>${rub(trip.total)}</small>
            </div>
            <div class="trip__actions">
              <button data-open="${trip.id}">Открыть</button>
              <button data-remove="${trip.id}">Удалить</button>
            </div>
          </article>`;
        })
        .join("")
    : `<p class="trips__empty">Здесь появятся сохранённые поездки. Соберите первую в планировщике ↑</p>`;
}

function initTrips() {
  $("#tripsList").addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open]");
    const removeButton = event.target.closest("[data-remove]");

    if (openButton) {
      const trip = trips.find((item) => item.id === Number(openButton.dataset.open));
      Object.assign(plan, { dest: trip.dest, days: trip.days, style: trip.style, travelers: trip.travelers });
      $("#planDest").value = trip.dest;
      $("#planDays").value = trip.days;
      renderPlan();
      $("#planner").scrollIntoView({ behavior: "smooth" });
    }

    if (removeButton) {
      trips = trips.filter((item) => item.id !== Number(removeButton.dataset.remove));
      storage.write("roamly-trips", trips);
      renderTrips();
    }
  });

  renderTrips();
}

function initDeals() {
  const offers = [
    { dest: "bali", off: 32, nights: 9 },
    { dest: "paris", off: 24, nights: 4 },
    { dest: "maldives", off: 18, nights: 7 },
    { dest: "tokyo", off: 21, nights: 8 },
    { dest: "marrakech", off: 35, nights: 6 },
    { dest: "iceland", off: 15, nights: 5 }
  ];

  $("#dealsGrid").innerHTML = offers
    .map((offer, index) => {
      const dest = findDest(offer.dest);
      const { total } = calculateBudget({ dest: offer.dest, days: offer.nights + 1, style: "comfort", travelers: 2 });
      return `
        <article class="deal reveal" style="transition-delay:${index * 60}ms">
          <div class="deal__img" style="--tone:${dest.tone}">
            <img src="${photo(dest.img, 300)}" alt="${dest.name}" loading="lazy">
            <span class="deal__off">−${offer.off}%</span>
          </div>
          <div class="deal__body">
            <h3>${dest.name}</h3>
            <small>${offer.nights} ночей · на двоих · перелёт включён</small>
            <div class="deal__price"><b>${rub(total * (1 - offer.off / 100))}</b><s>${rub(total)}</s></div>
          </div>
        </article>`;
    })
    .join("");

  const timer = $("#dealsTimer");
  const tick = () => {
    const now = new Date();
    const end = new Date(now);
    end.setDate(now.getDate() + ((7 - now.getDay()) % 7));
    end.setHours(23, 59, 59, 999);
    const diff = Math.max(end - now, 0);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const two = (value) => String(value).padStart(2, "0");
    timer.textContent = `${days ? `${days} д ` : ""}${two(hours)}:${two(minutes)}:${two(seconds)}`;
  };
  tick();
  setInterval(tick, 1000);
}

function initSubscribe() {
  const form = $("#subscribeForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.elements.email;
    const isValid = email.checkValidity() && /\S+@\S+\.\S+/.test(email.value);
    $("#subscribeMsg").textContent = isValid ? "Ура! Первая подборка уже летит к вам (демо) ✈" : "Проверьте адрес почты";
    if (isValid) form.reset();
  });
}

function initHeader() {
  const header = $("#header");
  const burger = $("#burger");
  const nav = $("#nav");

  addEventListener("scroll", () => header.classList.toggle("is-solid", scrollY > innerHeight * 0.7), { passive: true });

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    nav.classList.toggle("is-open");
  });

  $$("a", nav).forEach((link) =>
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      nav.classList.remove("is-open");
    })
  );
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((element) => observer.observe(element));
}

initHero();
initFinder();
initDestinations();
initPlanner();
initTrips();
initDeals();
initSubscribe();
initHeader();
initReveal();
