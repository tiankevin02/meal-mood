const state = {
  variation: 0,
  request: "",
};

const recipes = [
  {
    id: "chicken-tofu-soup",
    title: "塩レモン鶏豆腐スープ",
    mood: ["やさしい", "癒やされたい", "さっぱり"],
    weather: ["雨", "寒い", "曇り"],
    time: 20,
    protein: "鶏肉",
    style: "soup",
    baseScore: 84,
    summary: "鶏のうまみ、豆腐の軽さ、レモンの香りで重たくならない一皿。",
    ingredients: ["鶏もも肉 180g", "豆腐 1/2丁", "きのこ 1/2袋", "ねぎ 1/2本", "レモン 少し", "鶏ガラスープ、塩、黒こしょう"],
    steps: ["鶏肉を小さめに切り、塩を軽くふる。", "鍋で鶏肉ときのこをさっと炒め、水と鶏ガラスープを入れる。", "豆腐とねぎを入れて温め、レモンと黒こしょうで仕上げる。"],
    drinks: ["レモンサワー", "白ワイン", "日本酒"],
  },
  {
    id: "pork-ginger-rice",
    title: "豚しょうがの香ばし丼",
    mood: ["元気", "がっつり", "ご褒美"],
    weather: ["晴れ", "曇り", "寒い"],
    time: 18,
    protein: "豚肉",
    style: "rice",
    baseScore: 86,
    summary: "疲れた体に入りやすい甘辛しょうが味。運動後ならごはん多めが合います。",
    ingredients: ["豚こま肉 200g", "玉ねぎ 1/4個", "しょうが 1片", "ごはん 1膳", "醤油、みりん、酒", "千切りキャベツ"],
    steps: ["豚肉と玉ねぎを炒める。", "しょうが、醤油、みりん、酒を絡めて照りを出す。", "ごはんにのせ、キャベツを添える。"],
    drinks: ["ビール", "ハイボール", "麦焼酎"],
  },
  {
    id: "salmon-herb-pan",
    title: "鮭と野菜のハーブ蒸し",
    mood: ["さっぱり", "やさしい", "癒やされたい"],
    weather: ["晴れ", "暑い", "湿気"],
    time: 22,
    protein: "魚",
    style: "pan",
    baseScore: 82,
    summary: "フライパンひとつで香りよく、油は控えめ。白ワインにも日本酒にも寄せられます。",
    ingredients: ["鮭 1切れ", "キャベツ 2枚", "ミニトマト 5個", "きのこ 1/2袋", "オリーブオイル", "塩、こしょう、好みのハーブ"],
    steps: ["野菜を敷いたフライパンに鮭をのせる。", "塩、こしょう、オイルをかけ、ふたをして蒸す。", "仕上げにレモンか醤油を少し足す。"],
    drinks: ["白ワイン", "日本酒", "ジンソーダ"],
  },
  {
    id: "tomato-egg",
    title: "ふわ卵トマト炒め",
    mood: ["やさしい", "さっぱり", "元気"],
    weather: ["暑い", "湿気", "晴れ"],
    time: 10,
    protein: "卵",
    style: "quick",
    baseScore: 80,
    summary: "短時間で明るい味。食欲が弱い日でも食べやすい軽い中華風。",
    ingredients: ["卵 2個", "トマト 1個", "ねぎ 少し", "ごま油", "塩、砂糖、鶏ガラスープ"],
    steps: ["卵をふんわり炒めて一度取り出す。", "トマトを軽く炒め、調味料を加える。", "卵を戻し、ねぎを散らす。"],
    drinks: ["ビール", "レモンサワー", "紹興酒"],
  },
  {
    id: "miso-cheese-chicken",
    title: "味噌チーズ鶏の小さなグラタン",
    mood: ["ご褒美", "癒やされたい", "がっつり"],
    weather: ["寒い", "雨", "曇り"],
    time: 35,
    protein: "鶏肉",
    style: "bake",
    baseScore: 88,
    summary: "味噌のコクとチーズで満足感を出す、少しだけ特別な夜向け。",
    ingredients: ["鶏肉 180g", "きのこ 1袋", "豆腐 1/2丁", "チーズ ひとつかみ", "味噌、牛乳、黒こしょう", "パン粉 少し"],
    steps: ["鶏肉ときのこを炒め、味噌と牛乳を混ぜる。", "耐熱皿に豆腐と具を入れ、チーズとパン粉をのせる。", "トースターで焼き色をつける。"],
    drinks: ["赤ワイン", "白ワイン", "日本酒"],
  },
  {
    id: "spicy-beef-noodle",
    title: "牛肉と青菜の辛うま混ぜ麺",
    mood: ["元気", "がっつり", "ご褒美"],
    weather: ["雨", "寒い", "湿気"],
    time: 24,
    protein: "牛肉",
    style: "noodle",
    baseScore: 87,
    summary: "辛味と香味で気分を上げる一皿。運動量が多い日は麺をしっかり。",
    ingredients: ["牛薄切り肉 180g", "中華麺 1玉", "青菜 1束", "にんにく 少し", "豆板醤", "醤油、酢、ごま油"],
    steps: ["麺と青菜を茹でる。", "牛肉をにんにくと豆板醤で炒める。", "調味料と麺を和え、牛肉をのせる。"],
    drinks: ["ビール", "ハイボール", "レモンサワー"],
  },
];

const drinkNotes = {
  ビール: "香ばしさ、脂、辛味を軽く流してくれる万能枠。",
  レモンサワー: "酸味が塩味と油を整えて、後味を明るくします。",
  白ワイン: "酸と香りが魚、鶏、ハーブ、レモンにきれいに合います。",
  赤ワイン: "味噌、チーズ、肉のコクに合わせると丸くまとまります。",
  日本酒: "だし、豆腐、味噌、魚のうまみと自然に重なります。",
  ハイボール: "しょうが、焼き目、肉の脂にキレを足します。",
  麦焼酎: "甘辛い醤油味を邪魔せず、食中酒として軽いです。",
  ジンソーダ: "ハーブや柑橘の香りを伸ばして、涼しい印象にします。",
  紹興酒: "卵やトマトの甘酸っぱさを中華寄りに深くします。",
};

const requestMap = {
  different: "方向性を変えて",
  easier: "もっと簡単",
  meatier: "もっと肉増やして",
  vegetable: "野菜多め",
  drink: "お酒に寄せる",
  light: "軽め",
  warm: "あったかい",
  spicy: "辛く",
};

const form = document.querySelector("#recipe-form");
const customForm = document.querySelector("#custom-request-form");
const requestDock = document.querySelector(".request-dock");

function getInputs() {
  return {
    mood: document.querySelector("#mood").value,
    weather: document.querySelector("#weather").value,
    activity: document.querySelector("#activity").value,
    energy: document.querySelector("#energy").value,
    ingredients: splitList(document.querySelector("#ingredients").value),
    ownedDrinks: splitList(document.querySelector("#owned-drinks").value),
    wantDrink: document.querySelector("#want-drink").checked,
  };
}

function splitList(value) {
  return value
    .split(/[、,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function chooseRecipe(inputs) {
  const maxTime = inputs.energy === "10分" ? 12 : inputs.energy === "20分" ? 22 : inputs.energy === "35分" ? 38 : 60;
  const request = state.request;

  const scored = recipes.map((recipe, index) => {
    let score = recipe.baseScore;
    if (recipe.mood.includes(inputs.mood)) score += 14;
    if (recipe.weather.includes(inputs.weather)) score += 12;
    if (recipe.time <= maxTime) score += 10;
    if (recipe.time > maxTime) score -= 18;
    if (inputs.activity.includes("多め") && ["鶏肉", "豚肉", "牛肉", "魚"].includes(recipe.protein)) score += 8;
    if (inputs.activity === "少なめ" && ["quick", "soup", "pan"].includes(recipe.style)) score += 6;
    if (inputs.ingredients.some((item) => recipe.ingredients.join("").includes(item))) score += 7;
    if (request.includes("簡単") && recipe.time <= 15) score += 24;
    if (request.includes("肉") && ["鶏肉", "豚肉", "牛肉"].includes(recipe.protein)) score += 25;
    if (request.includes("野菜") && ["pan", "soup"].includes(recipe.style)) score += 16;
    if (request.includes("軽") && ["quick", "pan", "soup"].includes(recipe.style)) score += 18;
    if (request.includes("あったか") && ["soup", "bake", "noodle"].includes(recipe.style)) score += 20;
    if (request.includes("辛") && recipe.id.includes("spicy")) score += 28;
    if (request.includes("魚") && recipe.protein === "魚") score += 26;
    if (request.includes("和風") && ["日本酒", "麦焼酎"].some((drink) => recipe.drinks.includes(drink))) score += 16;
    if (request.includes("洗い物") && ["quick", "pan", "soup"].includes(recipe.style)) score += 18;
    if (request.includes("違う")) score += ((index + state.variation) % 3) * 9;
    score -= Math.abs(state.variation - index) % 4;
    return { recipe, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const selected = scored[state.variation % Math.min(3, scored.length)];
  return {
    ...selected.recipe,
    score: Math.max(70, Math.min(99, Math.round(selected.score))),
  };
}

function adaptRecipe(recipe, inputs) {
  const request = state.request;
  let title = recipe.title;
  let summary = recipe.summary;
  let ingredients = [...recipe.ingredients];
  let steps = [...recipe.steps];
  let time = recipe.time;
  let effort = time <= 12 ? "かなり簡単" : time <= 22 ? "ふつう" : "ゆっくり";

  if (inputs.weather === "暑い" || inputs.weather === "湿気") {
    summary += " 暑さに合わせて酸味と香りを少し強めます。";
  }
  if (inputs.weather === "寒い" || inputs.weather === "雨") {
    summary += " 体が冷えやすい日に合わせて、温かさとコクを足します。";
  }
  if (inputs.activity.includes("多め")) {
    ingredients.push("追加たんぱく質 少し", "ごはんまたは麺 お好みで");
    summary += " 運動量に合わせてたんぱく質と炭水化物を少し厚めにします。";
  }

  if (request.includes("簡単")) {
    title = `10分寄せ ${title}`;
    time = Math.min(time, 12);
    effort = "かなり簡単";
    steps = ["具材を小さめに切る。", "フライパンか鍋にまとめて入れて火を通す。", "味を整えてすぐ盛る。"];
  }
  if (request.includes("肉")) {
    title = `${title} 肉増し`;
    ingredients = ingredients.map((item) => item.replace(/(鶏|豚|牛)(もも|こま|薄切り)?肉 \d+g/, "$1肉 260g"));
    if (!ingredients.some((item) => item.includes("肉"))) ingredients.unshift("鶏肉または豚肉 220g");
    summary += " 肉の量を増やして、味付けは少し濃いめにします。";
  }
  if (request.includes("野菜")) {
    title = `${title} 野菜多め`;
    ingredients.push("葉物野菜 ひとつかみ", "きのこ 追加 1/2袋");
    summary += " 野菜の水分が出るので、最後に塩で締めます。";
  }
  if (request.includes("お酒")) {
    title = `${title} おつまみ仕立て`;
    summary += " 塩味、酸味、香ばしさを少し立てて、飲みながら食べやすくします。";
    ingredients.push("黒こしょうまたは七味 少し");
  }
  if (request.includes("軽")) {
    title = `${title} 軽め`;
    summary += " 油を控えて、レモンか酢で後味を軽くします。";
  }
  if (request.includes("辛")) {
    title = `ピリ辛 ${title}`;
    ingredients.push("豆板醤またはラー油 少し");
    summary += " 辛味は最初から入れすぎず、最後に調整します。";
  }

  return { ...recipe, title, summary, ingredients, steps, time, effort };
}

function chooseDrink(recipe, inputs) {
  if (!inputs.wantDrink) {
    return {
      name: "今日はノンアル",
      reason: "炭酸水にレモンか生姜を入れると、料理の香りを残したまま軽く飲めます。",
      pairings: [],
    };
  }

  const owned = inputs.ownedDrinks;
  const ownedMatch = recipe.drinks.find((drink) => owned.some((item) => normalize(item).includes(normalize(drink)) || normalize(drink).includes(normalize(item))));
  const recommended = ownedMatch || recipe.drinks[0];
  const pairings = owned.length
    ? owned.map((drink) => ({
        name: drink,
        level: recipe.drinks.some((target) => normalize(target).includes(normalize(drink)) || normalize(drink).includes(normalize(target))) ? "相性よし" : inferDrinkFit(drink, recipe),
        note: drinkNotes[drink] || inferDrinkNote(drink, recipe),
      }))
    : recipe.drinks.slice(0, 3).map((drink) => ({
        name: drink,
        level: "買うならこれ",
        note: drinkNotes[drink] || inferDrinkNote(drink, recipe),
      }));

  return {
    name: recommended,
    reason: drinkNotes[recommended] || inferDrinkNote(recommended, recipe),
    pairings,
  };
}

function normalize(value) {
  return String(value).replace(/\s/g, "").toLowerCase();
}

function inferDrinkFit(drink, recipe) {
  if (recipe.style === "bake" && /ワイン|日本酒/.test(drink)) return "相性よし";
  if (recipe.style === "soup" && /日本酒|白|サワー/.test(drink)) return "相性よし";
  if (recipe.style === "noodle" && /ビール|サワー|ハイボール/.test(drink)) return "相性よし";
  return "普通";
}

function inferDrinkNote(drink, recipe) {
  if (/ワイン/.test(drink)) return "酸味と香りを合わせると、料理の輪郭が出ます。";
  if (/ビール/.test(drink)) return "香ばしさや塩味と合わせやすく、序盤の一杯に向いています。";
  if (/日本酒/.test(drink)) return "だし感とうまみを拾いやすい、静かな相性です。";
  if (/サワー|ハイボール/.test(drink)) return "炭酸のキレで後味を軽くできます。";
  return `${recipe.protein}のうまみを邪魔しないよう、冷やしすぎず少量から。`;
}

function render() {
  const inputs = getInputs();
  const recipe = adaptRecipe(chooseRecipe(inputs), inputs);
  const drink = chooseDrink(recipe, inputs);

  document.querySelector("#recipe-title").textContent = recipe.title;
  document.querySelector("#score-pill").textContent = recipe.score;
  document.querySelector("#recipe-summary").textContent = recipe.summary;
  document.querySelector("#drink-name").textContent = drink.name;
  document.querySelector("#drink-reason").textContent = drink.reason;

  const meta = [
    `${recipe.time}分`,
    recipe.effort,
    inputs.mood,
    inputs.weather,
    inputs.activity,
    recipe.protein,
  ];
  document.querySelector("#meta-row").innerHTML = meta.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  document.querySelector("#ingredient-list").innerHTML = recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#step-list").innerHTML = recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const pairings = document.querySelector("#owned-pairings");
  pairings.innerHTML = drink.pairings.length
    ? drink.pairings
        .map(
          (item) => `
            <div class="pairing-item">
              <strong>${escapeHtml(item.name)} · ${escapeHtml(item.level)}</strong>
              <span>${escapeHtml(item.note)}</span>
            </div>
          `,
        )
        .join("")
    : `<div class="pairing-item"><strong>休肝日</strong><span>温かいお茶か柑橘炭酸が合います。</span></div>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.variation = 0;
  state.request = "";
  render();
});

form.addEventListener("input", () => {
  state.variation = 0;
  render();
});

requestDock.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-request]");
  if (!button) return;
  state.variation += 1;
  state.request = requestMap[button.dataset.request] || "";
  render();
});

customForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#custom-request");
  state.variation += 1;
  state.request = input.value.trim() || "方向性を変えて";
  input.value = "";
  render();
});

render();
