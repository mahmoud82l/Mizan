/* ================= تحكم شاشة البداية والسحب لأعلى ================= */
(function initSplashScreen() {
  const splash = document.getElementById('splashScreen');
  const loader = document.getElementById('splashLoader');
  const swipePrompt = document.getElementById('swipeUpPrompt');
  if (!splash) return;

  let isReadyToSwipe = false;
  let startY = 0;
  let currentDeltaY = 0;
  let isDragging = false;

  setTimeout(() => {
    loader.classList.add('hidden');
    swipePrompt.classList.remove('hidden');
    isReadyToSwipe = true;
  }, 1500);

  function dismissSplash() {
    if (!isReadyToSwipe || splash.classList.contains('dismissed')) return;
    splash.style.transform = '';
    splash.classList.add('dismissed');
    document.body.classList.remove('splash-locked');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 620);
  }

  splash.addEventListener('touchstart', (e) => {
    if (!isReadyToSwipe) return;
    startY = e.touches[0].clientY;
    currentDeltaY = 0;
    isDragging = true;
    splash.classList.add('dragging');
  }, { passive: true });

  splash.addEventListener('touchmove', (e) => {
    if (!isDragging || !isReadyToSwipe) return;
    const y = e.touches[0].clientY;
    currentDeltaY = y - startY;
    if (currentDeltaY < 0) {
      splash.style.transform = `translateY(${currentDeltaY}px)`;
    }
  }, { passive: true });

  splash.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    splash.classList.remove('dragging');
    if (currentDeltaY < -45) {
      dismissSplash();
    } else {
      splash.style.transform = 'translateY(0)';
    }
  });

  splash.addEventListener('mousedown', (e) => {
    if (!isReadyToSwipe) return;
    startY = e.clientY;
    currentDeltaY = 0;
    isDragging = true;
    splash.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging || !isReadyToSwipe) return;
    currentDeltaY = e.clientY - startY;
    if (currentDeltaY < 0) {
      splash.style.transform = `translateY(${currentDeltaY}px)`;
    }
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    splash.classList.remove('dragging');
    if (currentDeltaY < -45) {
      dismissSplash();
    } else {
      splash.style.transform = 'translateY(0)';
    }
  });

  swipePrompt.addEventListener('click', dismissSplash);
})();

/* ================= ثوابت وبيانات التطبيق ================= */
const ibwTableMale = {
  157: 58.6, 158: 59.3, 159: 59.9, 160: 60.5, 161: 61.1,
  162: 61.7, 163: 62.3, 164: 62.9, 165: 63.5, 166: 64.0,
  167: 64.6, 168: 65.2, 169: 65.9, 170: 66.6, 171: 67.3,
  172: 68.0, 173: 68.7, 174: 69.4, 175: 70.1, 176: 70.8,
  177: 71.6, 178: 72.4, 179: 73.3, 180: 74.2, 181: 75.0,
  182: 75.8, 183: 76.5, 184: 77.3, 185: 78.1, 186: 78.9
};

const ibwTableFemale = {
  140: 44.9, 141: 45.4, 142: 45.9, 143: 46.4, 144: 47.0,
  145: 47.5, 146: 48.0, 147: 48.6, 148: 49.2, 149: 49.8,
  150: 50.4, 151: 51.0, 152: 51.5, 153: 52.0, 154: 52.5,
  155: 53.1, 156: 53.7, 157: 54.3, 158: 54.9, 159: 55.5,
  160: 56.2, 161: 56.9, 162: 57.6, 163: 58.3, 164: 58.9,
  165: 59.5, 166: 60.1, 167: 60.7, 168: 61.4, 169: 62.1
};

const exchangeGroups = [
  { id: 'milk_full', gId: 1, cat: 'الالبان ومنتجاتها', name: '1. لبن كامل الدسم', unit: '1 كوب (240 جم)', gram: 240, p: 9, c: 12, f: 9 },
  { id: 'milk_skim', gId: 1, cat: 'الالبان ومنتجاتها', name: '2. لبن منزوع الدسم', unit: '1 كوب (240 جم)', gram: 240, p: 9, c: 12, f: 0 },
  { id: 'meat', gId: 2, cat: 'اللحوم وبديلاتها', name: '1. لحوم', unit: '1 شريحة (100 جم)', gram: 100, p: 20, c: 0, f: 15 },
  { id: 'egg', gId: 2, cat: 'اللحوم وبديلاتها', name: '2. البيض', unit: '1 واحدة (35 جم)', gram: 35, p: 4, c: 0, f: 4 },
  { id: 'legumes', gId: 2, cat: 'اللحوم وبديلاتها', name: '3. بقول مطهية', unit: '1 كوب (200 جم)', gram: 200, p: 15, c: 48, f: 1 },
  { id: 'veg_leafy', gId: 3, cat: 'الفواكة والخضر', name: '1. الخضر الورقية', unit: '1 كوب (100 جم)', gram: 100, p: 1, c: 3, f: 0 },
  { id: 'fruit_citrus', gId: 3, cat: 'الفواكة والخضر', name: '2. الموالح', unit: '1 ثمرة (100 جم)', gram: 100, p: 1, c: 10, f: 0 },
  { id: 'fruit_other', gId: 3, cat: 'الفواكة والخضر', name: '3. بقية الفواكة والخضر المطهية', unit: '1 كوب (200 جم)', gram: 200, p: 4, c: 12, f: 0 },
  { id: 'bread', gId: 4, cat: 'الخبز والحبوب', name: '1. الخبز', unit: 'رغيف (140 جم)', gram: 140, p: 9, c: 70, f: 1 },
  { id: 'rice', gId: 4, cat: 'الخبز والحبوب', name: '2. المكرونة والارز', unit: 'كوب (100 جم)', gram: 100, p: 5, c: 40, f: 1 },
  { id: 'sugar', gId: 4, cat: 'الخبز والحبوب', name: '3. السكر', unit: 'ملعقة شاي (7 جم)', gram: 7, p: 0, c: 7, f: 0 },
  { id: 'jam', gId: 4, cat: 'الخبز والحبوب', name: '4. مربى وعسل', unit: 'ملعقة كبيرة (20 جم)', gram: 20, p: 0, c: 14, f: 0 },
  { id: 'oil_cook', gId: 5, cat: 'الدهون والزيوت', name: 'المضافة للطهي', unit: 'ملعقة كبيرة (15 جم)', gram: 15, p: 0, c: 0, f: 15 },
  { id: 'oil_salad', gId: 5, cat: 'الدهون والزيوت', name: 'المضافة للطعام والسلطة', unit: 'ملعقة صغيرة (5 جم)', gram: 5, p: 0, c: 0, f: 5 }
];

const mealCatalog = {
  'لبن كامل الدسم': { gKey: 'milk_full', gram: 240 },
  'لبن منزوع الدسم': { gKey: 'milk_skim', gram: 240 },
  'لحوم': { gKey: 'meat', gram: 100 },
  'دجاج بانية': { gKey: 'meat', gram: 100 },
  'البيض': { gKey: 'egg', gram: 35 },
  'بيض': { gKey: 'egg', gram: 35 },
  'بقول مطهية': { gKey: 'legumes', gram: 200 },
  'فول مدمس': { gKey: 'legumes', gram: 200 },
  'الخضر الورقية': { gKey: 'veg_leafy', gram: 100 },
  'سلطة خضراء': { gKey: 'veg_leafy', gram: 100 },
  'الموالح': { gKey: 'fruit_citrus', gram: 100 },
  'برتقال': { gKey: 'fruit_citrus', gram: 100 },
  'بقية الفواكه والخضر': { gKey: 'fruit_other', gram: 200 },
  'تمر': { gKey: 'fruit_other', gram: 200 },
  'الخبز': { gKey: 'bread', gram: 140 },
  'خبز بلدي': { gKey: 'bread', gram: 140 },
  'بقسماط': { gKey: 'bread', gram: 140 },
  'المكرونة والارز': { gKey: 'rice', gram: 100 },
  'أرز': { gKey: 'rice', gram: 100 },
  'مكرونة': { gKey: 'rice', gram: 100 },
  'السكر': { gKey: 'sugar', gram: 7 },
  'سكر': { gKey: 'sugar', gram: 7 },
  'مربى وعسل': { gKey: 'jam', gram: 20 },
  'عسل نحل': { gKey: 'jam', gram: 20 },
  'زيت للطهي': { gKey: 'oil_cook', gram: 15 },
  'زيت للسلطة': { gKey: 'oil_salad', gram: 5 }
};

const mealNames = [
  'بعد الاستيقاظ',
  'الإفطار',
  'بين الفطار والغداء',
  'الغداء',
  'بين الغداء والعشاء',
  'العشاء',
  'قبل النوم'
];

let targetRDA = 0;
let targetCarb = 0;
let targetProt = 0;
let targetFat = 0;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === tabId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goStep(stepNum) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('step' + stepNum).classList.add('active');
  document.querySelectorAll('.step-item').forEach(item => {
    const s = Number(item.dataset.step);
    item.classList.toggle('active', s <= stepNum);
  });
}

function getIdealWeight(gender, height) {
  const h = Math.round(height);
  if (gender === 'male') {
    if (ibwTableMale[h] !== undefined) return ibwTableMale[h];
    return Math.max(0, (height - 100) * 0.9);
  } else {
    if (ibwTableFemale[h] !== undefined) return ibwTableFemale[h];
    return Math.max(0, (height - 100) * 0.85);
  }
}

function updateIBW() {
  const gender = document.getElementById('gender').value;
  const height = Number(document.getElementById('height').value) || 0;
  const ibw = getIdealWeight(gender, height);
  document.getElementById('ibwVal').textContent = ibw.toFixed(1) + ' كجم';
  return ibw;
}

function calculateNeeds() {
  const gender = document.getElementById('gender').value;
  const age = Number(document.getElementById('age').value) || 25;
  const height = Number(document.getElementById('height').value) || 170;
  const currentWeight = Number(document.getElementById('weight').value) || 70;
  const ibw = updateIBW();
  const basis = document.getElementById('weightBasis').value;
  const calcWeight = basis === 'ibw' ? ibw : currentWeight;

  const activityPct = Number(document.getElementById('activity').value) || 0.50;
  const goal = Number(document.getElementById('goal').value) || 0;
  const special = gender === 'female' ? (Number(document.getElementById('specialState').value) || 0) : 0;

  const rawTemp = parseFloat(document.getElementById('bodyTemp').value);
  const bodyTemp = (!isNaN(rawTemp) && rawTemp > 0) ? rawTemp : 37;
  const climatePct = Number(document.getElementById('climate').value) || 0;

  const genderFactor = gender === 'male' ? 1 : 0.9;
  const rawBmr = calcWeight * genderFactor * 24;
  let afterAgeBmr = rawBmr;
  let ageDeductPct = 0;

  if (age > 30) {
    const decades = Math.ceil((age - 30) / 10);
    ageDeductPct = decades * 5;
    afterAgeBmr = rawBmr * (1 - ageDeductPct / 100);
  }

  const baseBmr = Math.max(0, Math.round(afterAgeBmr + special));

  let feverDiff = 0;
  let feverPct = 0;
  let feverCal = 0;
  if (bodyTemp > 37) {
    feverDiff = +(bodyTemp - 37).toFixed(1);
    feverPct = +(feverDiff * 13).toFixed(1);
    feverCal = Math.round(baseBmr * 0.13 * feverDiff);
  }

  const bmr = baseBmr + feverCal;
  const activityCal = Math.round(baseBmr * activityPct);
  const sdaCal = Math.round(bmr * 0.10);

  const beforeClimate = bmr + activityCal + sdaCal;
  const climateCal = Math.round(beforeClimate * climatePct);

  targetRDA = Math.max(0, Math.round(beforeClimate + climateCal + goal));

  targetCarb = Math.round((targetRDA * 0.60) / 4);
  targetProt = Math.round((targetRDA * 0.15) / 4);
  targetFat = Math.round((targetRDA * 0.25) / 9);

  document.getElementById('bmrVal').textContent = bmr;
  const bmrNotes = [];
  if (special > 0) bmrNotes.push(`+${special} حالة خاصة`);
  if (feverCal > 0) bmrNotes.push(`+${feverCal} حمى (${bodyTemp}°م)`);
  document.getElementById('bmrSub').textContent = bmrNotes.length > 0
    ? `يشمل ${bmrNotes.join(' و ')}`
    : (basis === 'ibw' ? 'الوزن المثالي' : 'الوزن الحالي');

  document.getElementById('rdaVal').textContent = targetRDA;
  const climateSubText = climateCal !== 0
    ? ` | مناخ: ${climateCal > 0 ? '+' : ''}${climateCal}`
    : '';
  document.getElementById('rdaSub').textContent = `مجهود: ${activityCal} | SDA: ${sdaCal}${climateSubText}`;

  document.getElementById('carbGrams').textContent = targetCarb;
  document.getElementById('protGrams').textContent = targetProt;
  document.getElementById('fatGrams').textContent = targetFat;

  document.getElementById('exRdaHint').textContent = targetRDA;
  document.getElementById('exCarbHint').textContent = targetCarb;
  document.getElementById('exProtHint').textContent = targetProt;
  document.getElementById('exFatHint').textContent = targetFat;

  document.getElementById('rdaProtCell').textContent = targetProt;
  document.getElementById('rdaCarbCell').textContent = targetCarb;
  document.getElementById('rdaFatCell').textContent = targetFat;
  document.getElementById('rdaKcalCell').textContent = targetRDA;

  const ageStepText = age <= 30
    ? `السن (${age} سنة) ≤ 30 سنة ← لا يوجد خصم (الـ BMR ثابت كما هو)`
    : `السن (${age} سنة) > 30 سنة ← خصم ${ageDeductPct}% ليصبح ${afterAgeBmr.toFixed(1)} سعرة`;

  const specialStepText = special > 0
    ? `<br>الحالة الخاصة: +${special} سعرة`
    : '';

  const feverStepText = feverCal > 0
    ? `<br>درجة حرارة الجسم (${bodyTemp}°م): زيادة ${feverDiff}°م × 13% = +${feverPct}% ← ${baseBmr} × ${feverPct}% = <strong>+${feverCal} سعرة</strong>`
    : '';

  const goalStepText = goal === 0
    ? '0 (تثبيت الوزن)'
    : (goal > 0 ? `+${goal} (زيادة الوزن)` : `${goal} (إنقاص الوزن)`);

  let stepCounter = 5;
  const climateStepHtml = climateCal !== 0
    ? `
      <div class="math-step-item">
        <div class="math-step-title">${stepCounter++}. تأثير درجة حرارة المناخ (${climatePct > 0 ? 'جو بارد +5%' : 'جو حار -5%'})</div>
        <div class="math-step-detail">
          المجموع قبل المناخ = ${bmr} + ${activityCal} + ${sdaCal} = ${beforeClimate} سعرة<br>
          تأثير المناخ = ${beforeClimate} × ${climatePct > 0 ? '+5%' : '-5%'} = <strong>${climateCal > 0 ? '+' : ''}${climateCal} سعرة</strong>
        </div>
      </div>
    `
    : '';

  const rdaFormulaText = climateCal !== 0
    ? `${beforeClimate} (بعد المناخ: ${beforeClimate + climateCal}) + ${goalStepText} = <strong>${targetRDA} سعرة</strong>`
    : `${bmr} (BMR) + ${activityCal} (مجهود) + ${sdaCal} (SDA) + ${goalStepText} = <strong>${targetRDA} سعرة</strong>`;

  document.getElementById('mathStepsBody').innerHTML = `
    <div class="math-step-item">
      <div class="math-step-title">1. تحديد الوزن المستخدم</div>
      <div class="math-step-detail">الطول = ${height} سم ← الوزن المثالي = ${ibw.toFixed(1)} كجم | الوزن المستخدم = <strong>${calcWeight.toFixed(1)} كجم</strong> (${basis === 'ibw' ? 'الوزن المثالي' : 'الوزن الحالي'})</div>
    </div>
    <div class="math-step-item">
      <div class="math-step-title">2. حساب معدل الأيض الأساسي (BMR)</div>
      <div class="math-step-detail">${calcWeight.toFixed(1)} × ${genderFactor} × 24 = ${rawBmr.toFixed(1)} سعرة<br>${ageStepText}${specialStepText}${feverStepText}<br><strong>صافي BMR = ${bmr} سعرة</strong></div>
    </div>
    <div class="math-step-item">
      <div class="math-step-title">3. حساب طاقة المجهود البدني (${Math.round(activityPct * 100)}%)</div>
      <div class="math-step-detail">${baseBmr} × ${Math.round(activityPct * 100)}% = <strong>${activityCal} سعرة</strong></div>
    </div>
    <div class="math-step-item">
      <div class="math-step-title">4. الفعل الديناميكي النوعي للغذاء (SDA - 10%)</div>
      <div class="math-step-detail">${bmr} × 10% = <strong>${sdaCal} سعرة</strong></div>
    </div>
    ${climateStepHtml}
    <div class="math-step-item">
      <div class="math-step-title">${stepCounter++}. حساب الاحتياجات الكلية (RDA)</div>
      <div class="math-step-detail">${rdaFormulaText}</div>
    </div>
    <div class="math-step-item">
      <div class="math-step-title">${stepCounter++}. حساب جرامات العناصر الغذائية</div>
      <div class="math-step-detail">
        • الكربوهيدرات (60%): (${targetRDA} × 60%) ÷ 4 = <strong>${targetCarb} جم</strong><br>
        • البروتين (15%): (${targetRDA} × 15%) ÷ 4 = <strong>${targetProt} جم</strong><br>
        • الدهون (25%): (${targetRDA} × 25%) ÷ 9 = <strong>${targetFat} جم</strong>
      </div>
    </div>
  `;

  recalcExchange();
}

function renderExchangeTable() {
  const tbody = document.getElementById('exchangeBody');
  tbody.innerHTML = '';
  let lastCat = '';

  exchangeGroups.forEach((g, idx) => {
    if (g.cat !== lastCat) {
      lastCat = g.cat;
      const catRow = document.createElement('tr');
      catRow.className = 'group-header-row';
      catRow.innerHTML = `<td colspan="7">${g.cat}</td>`;
      tbody.appendChild(catRow);
    }

    const tr = document.createElement('tr');
    tr.dataset.idx = idx;
    tr.innerHTML = `
      <td class="item-name-cell">${g.name}<span class="unit-hint">${g.unit}</span></td>
      <td><input type="number" class="unit-input" data-idx="${idx}" min="0" step="0.5" value="0"></td>
      <td class="g-cell">0</td>
      <td class="p-cell">0</td>
      <td class="c-cell">0</td>
      <td class="f-cell">0</td>
      <td class="k-cell">0</td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.unit-input').forEach(inp => {
    inp.addEventListener('input', recalcExchange);
  });
}

function recalcExchange() {
  let sumP = 0, sumC = 0, sumF = 0;
  const groupUsed = { 1: false, 2: false, 3: false, 4: false, 5: false };
  let hasSubHalf = false;

  const rows = document.querySelectorAll('#exchangeBody tr[data-idx]');
  rows.forEach(tr => {
    const idx = Number(tr.dataset.idx);
    const units = Number(tr.querySelector('.unit-input').value) || 0;
    const g = exchangeGroups[idx];

    if (units > 0) {
      groupUsed[g.gId] = true;
      if (units < 0.5) hasSubHalf = true;
    }

    const grams = Math.round(units * g.gram);
    const p = +(units * g.p).toFixed(1);
    const c = +(units * g.c).toFixed(1);
    const f = +(units * g.f).toFixed(1);
    const k = Math.round((p * 4) + (c * 4) + (f * 9));

    tr.querySelector('.g-cell').textContent = grams;
    tr.querySelector('.p-cell').textContent = p;
    tr.querySelector('.c-cell').textContent = c;
    tr.querySelector('.f-cell').textContent = f;
    tr.querySelector('.k-cell').textContent = k;

    sumP += p;
    sumC += c;
    sumF += f;
  });

  const roundP = Math.round(sumP * 10) / 10;
  const roundC = Math.round(sumC * 10) / 10;
  const roundF = Math.round(sumF * 10) / 10;
  const totalKcal = Math.round((sumP * 4) + (sumC * 4) + (sumF * 9));

  document.getElementById('sumProtCell').textContent = roundP;
  document.getElementById('sumCarbCell').textContent = roundC;
  document.getElementById('sumFatCell').textContent = roundF;
  document.getElementById('sumKcalCell').textContent = totalKcal;

  const diffP = +(sumP - targetProt).toFixed(1);
  const diffC = +(sumC - targetCarb).toFixed(1);
  const diffF = +(sumF - targetFat).toFixed(1);
  const diffK = totalKcal - targetRDA;

  const setDiffCell = (id, val, limit) => {
    const el = document.getElementById(id);
    el.textContent = (val > 0 ? '+' : '') + val;
    el.className = Math.abs(val) <= limit ? 'diff-ok' : 'diff-bad';
  };

  setDiffCell('diffProtCell', diffP, 5);
  setDiffCell('diffCarbCell', diffC, 5);
  setDiffCell('diffFatCell', diffF, 5);
  setDiffCell('diffKcalCell', diffK, 20);

  const allGroupsPresent = Object.values(groupUsed).every(Boolean);
  const gramsValid = Math.abs(diffP) <= 5 && Math.abs(diffC) <= 5 && Math.abs(diffF) <= 5;
  const kcalValid = Math.abs(diffK) <= 20;
  const minHalfValid = !hasSubHalf;
  const isValid = allGroupsPresent && minHalfValid && gramsValid && kcalValid;

  const banner = document.getElementById('exchangeStatusBanner');
  banner.className = 'status-banner ' + (isValid ? 'ok' : 'bad');
  banner.textContent = isValid ? 'التوزيع صحيح ✓' : 'التوزيع غير صحيح ✕';

  validateMeals();
}

function autoDistribute() {
  if (!targetRDA) calculateNeeds();
  const inputs = document.querySelectorAll('#exchangeBody .unit-input');
  inputs.forEach(i => i.value = 0);

  const snapHalf = v => Math.max(0, Math.round(v * 2) / 2);
  const setUnit = (id, val) => {
    const idx = exchangeGroups.findIndex(g => g.id === id);
    if (idx !== -1) inputs[idx].value = snapHalf(val);
  };

  const useFullMilk = targetFat >= 60;
  const milkUnits = 2;
  setUnit(useFullMilk ? 'milk_full' : 'milk_skim', milkUnits);
  setUnit('veg_leafy', 3);
  setUnit('fruit_citrus', 3);
  setUnit('fruit_other', 1);

  let curP = (milkUnits * 9) + (3 * 1) + (3 * 1) + (1 * 4);
  let curC = (milkUnits * 12) + (3 * 3) + (3 * 10) + (1 * 12);
  let curF = (useFullMilk ? milkUnits * 9 : 0);

  const remCForStarch = Math.max(0, (targetCarb - curC) * 0.65);
  const breadUnits = Math.max(0.5, snapHalf((remCForStarch * 0.6) / 70));
  const riceUnits = Math.max(0.5, snapHalf((remCForStarch * 0.4) / 40));
  setUnit('bread', breadUnits);
  setUnit('rice', riceUnits);

  curP += (breadUnits * 9) + (riceUnits * 5);
  curC += (breadUnits * 70) + (riceUnits * 40);
  curF += (breadUnits * 1) + (riceUnits * 1);

  const remP = Math.max(0, targetProt - curP);
  let bestMeat = 0.5, bestEgg = 0, bestPErr = 999;
  for (let m = 0.5; m <= 6; m += 0.5) {
    for (let e = 0; e <= 4; e += 0.5) {
      const pTest = (m * 20) + (e * 4);
      const err = Math.abs(pTest - remP);
      if (err < bestPErr) {
        bestPErr = err;
        bestMeat = m;
        bestEgg = e;
      }
    }
  }
  setUnit('meat', bestMeat);
  setUnit('egg', bestEgg);
  curP += (bestMeat * 20) + (bestEgg * 4);
  curF += (bestMeat * 15) + (bestEgg * 4);

  const remC = Math.max(0, targetCarb - curC);
  const jamUnits = snapHalf((remC * 0.6) / 14);
  const sugarUnits = snapHalf(Math.max(0, remC - (jamUnits * 14)) / 7);
  setUnit('jam', jamUnits);
  setUnit('sugar', sugarUnits);
  curC += (jamUnits * 14) + (sugarUnits * 7);

  const remF = Math.max(0, targetFat - curF);
  const cookUnits = Math.max(0.5, snapHalf((remF * 0.65) / 15));
  const saladUnits = Math.max(0.5, snapHalf(Math.max(0, remF - (cookUnits * 15)) / 5));
  setUnit('oil_cook', cookUnits);
  setUnit('oil_salad', saladUnits);
  curF += (cookUnits * 15) + (saladUnits * 5);

  const calcK = Math.round((curP * 4) + (curC * 4) + (curF * 9));
  const kDiff = targetRDA - calcK;
  if (Math.abs(kDiff) > 15) {
    const nudge = snapHalf(kDiff / 28);
    const sugarIdx = exchangeGroups.findIndex(g => g.id === 'sugar');
    const newSugar = Math.max(0, Number(inputs[sugarIdx].value) + nudge);
    if (Math.abs((curC + (newSugar - sugarUnits) * 7) - targetCarb) <= 5) {
      inputs[sugarIdx].value = newSugar;
    }
  }

  recalcExchange();
  showToast('تم التوزيع التلقائي');
}

function populateFoodList() {
  const dl = document.getElementById('foodItemsList');
  dl.innerHTML = '';
  Object.keys(mealCatalog).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    dl.appendChild(opt);
  });
}

/* ================= بناء كروت الوجبات كاملة بعرض الشاشة ================= */
function addRowToMeal(mealIdx, itemData = null) {
  const tbody = document.querySelector(`.meal-block[data-meal="${mealIdx}"] tbody`);
  if (!tbody) return;

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="meal-item" list="foodItemsList" placeholder="الصنف" value="${itemData ? itemData.name : ''}"></td>
    <td><input type="number" class="meal-unit" min="0" step="0.5" placeholder="0" value="${itemData ? itemData.units : ''}"></td>
    <td><input type="number" class="gram-cell" min="0" step="1" placeholder="0" value="${itemData ? itemData.grams : ''}"></td>
  `;
  tbody.appendChild(tr);

  const itemInp = tr.querySelector('.meal-item');
  const unitInp = tr.querySelector('.meal-unit');
  const gramInp = tr.querySelector('.gram-cell');

  const updateCell = () => {
    const itemName = itemInp.value.trim();
    const u = Number(unitInp.value) || 0;
    const entry = mealCatalog[itemName];
    if (entry && u > 0) {
      gramInp.value = Math.round(u * entry.gram);
    } else if (u === 0) {
      gramInp.value = 0;
    }
    validateMeals();
  };

  unitInp.addEventListener('input', updateCell);
  itemInp.addEventListener('input', updateCell);
  itemInp.addEventListener('change', updateCell);
}

function renderMealsGrid() {
  const container = document.getElementById('mealsContainer');
  container.innerHTML = '';

  mealNames.forEach((title, idx) => {
    const block = document.createElement('div');
    block.className = 'meal-block';
    block.dataset.meal = idx;
    block.innerHTML = `
      <div class="meal-block-head">
        <span class="meal-block-title">${idx + 1}. ${title}</span>
        <button type="button" class="meal-add-mini" onclick="addRowToMeal(${idx})">+ صنف</button>
      </div>
      <table class="meal-sub-table">
        <thead>
          <tr>
            <th>الصنف</th>
            <th>وحدة</th>
            <th>جم</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    container.appendChild(block);

    for (let r = 0; r < 2; r++) {
      addRowToMeal(idx);
    }
  });
}

function createEmptyMealRow() {
  for (let m = 0; m < mealNames.length; m++) {
    addRowToMeal(m);
  }
}

function getExchangeUnitsMap() {
  const map = {};
  const inputs = document.querySelectorAll('#exchangeBody .unit-input');
  exchangeGroups.forEach((g, idx) => {
    map[g.id] = Number(inputs[idx].value) || 0;
  });
  return map;
}

function autoDistributeMeals() {
  let exMap = getExchangeUnitsMap();
  const totalEx = Object.values(exMap).reduce((a, b) => a + b, 0);
  if (totalEx === 0) {
    autoDistribute();
    exMap = getExchangeUnitsMap();
  }

  const meals = [[], [], [], [], [], [], []];
  const pushItem = (mealIdx, name, units) => {
    if (units <= 0) return;
    const entry = mealCatalog[name];
    meals[mealIdx].push({
      name,
      units: +units.toFixed(2),
      grams: Math.round(units * (entry ? entry.gram : 100))
    });
  };

  if (exMap.milk_full > 0) {
    const first = Math.min(1, exMap.milk_full);
    pushItem(0, 'لبن كامل الدسم', first);
    if (exMap.milk_full - first > 0) pushItem(4, 'لبن كامل الدسم', exMap.milk_full - first);
  }
  if (exMap.milk_skim > 0) {
    const first = Math.min(1, exMap.milk_skim);
    pushItem(0, 'لبن منزوع الدسم', first);
    if (exMap.milk_skim - first > 0) pushItem(4, 'لبن منزوع الدسم', exMap.milk_skim - first);
  }

  if (exMap.bread > 0) {
    if (exMap.bread >= 1.5) {
      pushItem(0, 'بقسماط', 0.5);
      const rem = exMap.bread - 0.5;
      const bf = Math.ceil(rem) / 2;
      const dn = rem - bf;
      pushItem(1, 'خبز بلدي', bf);
      pushItem(5, 'خبز بلدي', dn);
    } else if (exMap.bread === 1) {
      pushItem(1, 'خبز بلدي', 0.5);
      pushItem(5, 'خبز بلدي', 0.5);
    } else {
      pushItem(1, 'خبز بلدي', exMap.bread);
    }
  }

  if (exMap.jam > 0) pushItem(0, 'عسل نحل', exMap.jam);
  if (exMap.legumes > 0) pushItem(1, 'فول مدمس', exMap.legumes);
  if (exMap.egg > 0) pushItem(1, 'البيض', exMap.egg);

  if (exMap.veg_leafy > 0) {
    if (exMap.veg_leafy >= 2) {
      pushItem(1, 'سلطة خضراء', 1);
      pushItem(3, 'سلطة خضراء', 1);
      if (exMap.veg_leafy - 2 > 0) pushItem(5, 'سلطة خضراء', exMap.veg_leafy - 2);
    } else {
      pushItem(3, 'سلطة خضراء', exMap.veg_leafy);
    }
  }

  if (exMap.fruit_citrus > 0) pushItem(2, 'برتقال', exMap.fruit_citrus);

  if (exMap.sugar > 0) {
    if (exMap.sugar >= 1) {
      const m2 = Math.floor(exMap.sugar) / 2;
      const m5 = exMap.sugar - m2;
      pushItem(2, 'السكر', m2);
      pushItem(5, 'السكر', m5);
    } else {
      pushItem(2, 'السكر', exMap.sugar);
    }
  }

  if (exMap.meat > 0) pushItem(3, 'لحوم', exMap.meat);
  if (exMap.rice > 0) pushItem(3, 'أرز', exMap.rice);
  if (exMap.oil_cook > 0) pushItem(3, 'زيت للطهي', exMap.oil_cook);

  if (exMap.oil_salad > 0) {
    if (exMap.oil_salad >= 1) {
      pushItem(1, 'زيت للسلطة', 0.5);
      pushItem(3, 'زيت للسلطة', exMap.oil_salad - 0.5);
    } else {
      pushItem(3, 'زيت للسلطة', exMap.oil_salad);
    }
  }

  if (exMap.fruit_other > 0) pushItem(6, 'تمر', exMap.fruit_other);

  for (let m = 0; m < mealNames.length; m++) {
    const tbody = document.querySelector(`.meal-block[data-meal="${m}"] tbody`);
    tbody.innerHTML = '';
    const items = meals[m];
    if (items.length === 0) {
      addRowToMeal(m);
    } else {
      items.forEach(item => addRowToMeal(m, item));
    }
  }

  validateMeals();
  showToast('تم توزيع الوجبات تلقائياً');
}

function validateMeals() {
  const targetMap = getExchangeUnitsMap();
  const totalTarget = Object.values(targetMap).reduce((a, b) => a + b, 0);
  const usedMap = {};
  exchangeGroups.forEach(g => usedMap[g.id] = 0);

  let hasInvalidEntry = false;
  let totalUsed = 0;

  document.querySelectorAll('.meal-sub-table tbody tr').forEach(tr => {
    const name = tr.querySelector('.meal-item').value.trim();
    const units = Number(tr.querySelector('.meal-unit').value) || 0;

    if (units > 0 && !name) {
      hasInvalidEntry = true;
    } else if (name && units > 0) {
      const entry = mealCatalog[name];
      if (!entry) {
        hasInvalidEntry = true;
      } else {
        usedMap[entry.gKey] = +(usedMap[entry.gKey] + units).toFixed(2);
        totalUsed += units;
      }
    }
  });

  const allMatched = totalTarget > 0 && totalUsed > 0 && !hasInvalidEntry &&
    exchangeGroups.every(g => Math.abs((usedMap[g.id] || 0) - (targetMap[g.id] || 0)) < 0.05);

  const banner = document.getElementById('mealsStatusBanner');
  banner.className = 'status-banner ' + (allMatched ? 'ok' : 'bad');
  banner.textContent = allMatched ? 'التوزيع صحيح ✓' : 'التوزيع غير صحيح ✕';
}

function buildExcelMealsTableHTML() {
  const mealsData = mealNames.map((_, m) => {
    const rows = [];
    document.querySelectorAll(`.meal-block[data-meal="${m}"] tbody tr`).forEach(tr => {
      const name = tr.querySelector('.meal-item').value.trim();
      const units = tr.querySelector('.meal-unit').value;
      const grams = tr.querySelector('.gram-cell').value;
      if (name || Number(units) > 0) {
        rows.push({ name, units, grams });
      }
    });
    return rows;
  });

  const maxRows = Math.max(4, ...mealsData.map(r => r.length));
  let headTop = mealNames.map(n => `<th colspan="3">${n}</th>`).join('');
  let headSub = mealNames.map(() => `<th>الصنف</th><th>وحدة</th><th>جم</th>`).join('');
  let bodyRows = '';

  for (let r = 0; r < maxRows; r++) {
    let cells = '';
    for (let m = 0; m < mealNames.length; m++) {
      const item = mealsData[m][r];
      cells += item
        ? `<td>${item.name}</td><td>${item.units}</td><td>${item.grams}</td>`
        : `<td></td><td></td><td></td>`;
    }
    bodyRows += `<tr>${cells}</tr>`;
  }

  return `<table border="1"><thead><tr>${headTop}</tr><tr>${headSub}</tr></thead><tbody>${bodyRows}</tbody></table>`;
}

function exportToExcel() {
  const tableHTML = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"></head><body>
    <h3>NUTRI - دليلك الغذائي / نوعية عين شمس</h3>
    <p>RDA: ${targetRDA} kcal | Protein: ${targetProt}g | Carbs: ${targetCarb}g | Fat: ${targetFat}g</p>
    ${document.getElementById('exchangeTable').outerHTML}
    <br>
    ${buildExcelMealsTableHTML()}
    </body></html>
  `;
  const dataUri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent('\ufeff' + tableHTML);
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = 'NUTRI_Plan.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('جاري تحميل ملف Excel');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.getElementById('toggleMathBtn').addEventListener('click', function () {
  const acc = document.getElementById('mathAccordion');
  const isOpen = acc.classList.toggle('open');
  this.setAttribute('aria-expanded', isOpen);
});

document.getElementById('gender').addEventListener('change', function () {
  document.getElementById('specialWrap').style.display = this.value === 'female' ? 'block' : 'none';
  if (this.value === 'male') document.getElementById('specialState').value = '0';
  calculateNeeds();
});

['height', 'weight', 'age', 'bodyTemp'].forEach(id => {
  document.getElementById(id).addEventListener('input', calculateNeeds);
});

['weightBasis', 'specialState', 'activity', 'climate', 'goal'].forEach(id => {
  document.getElementById(id).addEventListener('change', calculateNeeds);
});

document.getElementById('calcBtn').addEventListener('click', () => {
  calculateNeeds();
  showToast('تم تحديث الاحتياجات الغذائية');
});
document.getElementById('autoDistBtn').addEventListener('click', autoDistribute);
document.getElementById('autoMealsBtn').addEventListener('click', autoDistributeMeals);
document.getElementById('addMealRowBtn').addEventListener('click', createEmptyMealRow);
document.getElementById('exportBtn').addEventListener('click', exportToExcel);

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
    e.preventDefault();
  }
});

populateFoodList();
renderExchangeTable();
renderMealsGrid();
updateIBW();
calculateNeeds();
