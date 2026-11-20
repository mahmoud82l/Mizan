const exchangeGroups = [
  { id: 'milk_skim', name: 'ألبان خالي الدسم', p: 8, c: 12, f: 1, gram: 240 },
  { id: 'milk_low', name: 'ألبان متوسط الدسم', p: 8, c: 12, f: 5, gram: 240 },
  { id: 'milk_full', name: 'ألبان كامل الدسم', p: 8, c: 12, f: 8, gram: 240 },
  { id: 'veg', name: 'خضروات', p: 2, c: 5, f: 0, gram: 100 },
  { id: 'fruit', name: 'فاكهة', p: 0, c: 15, f: 0, gram: 120 },
  { id: 'starch', name: 'نشويات وخبز', p: 3, c: 15, f: 1, gram: 30 },
  { id: 'meat_lean', name: 'لحوم قليلة الدهن', p: 7, c: 0, f: 3, gram: 30 },
  { id: 'meat_med', name: 'لحوم متوسطة الدهن', p: 7, c: 0, f: 5, gram: 30 },
  { id: 'meat_high', name: 'لحوم عالية الدهن', p: 7, c: 0, f: 8, gram: 30 },
  { id: 'fat', name: 'دهون وزيوت', p: 0, c: 0, f: 5, gram: 5 },
  { id: 'sugar', name: 'سكريات', p: 0, c: 5, f: 0, gram: 5 }
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

function goStep(stepNum) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('step' + stepNum).classList.add('active');
  document.querySelectorAll('.step-item').forEach(item => {
    const s = Number(item.dataset.step);
    item.classList.toggle('active', s <= stepNum);
  });
}

function updateIBW() {
  const gender = document.getElementById('gender').value;
  const height = Number(document.getElementById('height').value) || 0;
  const factor = gender === 'male' ? 0.9 : 0.85;
  const ibw = Math.max(0, (height - 100) * factor);
  document.getElementById('ibwVal').textContent = ibw.toFixed(1) + ' كجم';
  return ibw;
}

function calculateNeeds() {
  const gender = document.getElementById('gender').value;
  const age = Number(document.getElementById('age').value) || 25;
  const height = Number(document.getElementById('height').value) || 170;
  const weight = Number(document.getElementById('weight').value) || 70;
  const activity = Number(document.getElementById('activity').value) || 1.375;
  const goal = Number(document.getElementById('goal').value) || 0;
  const special = gender === 'female' ? (Number(document.getElementById('specialState').value) || 0) : 0;

  let bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  if (age > 30) {
    const decades = Math.ceil((age - 30) / 10);
    bmr = bmr * (1 - decades * 0.05);
  }

  bmr = Math.max(0, Math.round(bmr));
  targetRDA = Math.max(0, Math.round((bmr * activity) + goal + special));

  const cPct = Number(document.getElementById('carbPct').value) || 60;
  const pPct = Number(document.getElementById('protPct').value) || 15;
  const fPct = Number(document.getElementById('fatPct').value) || 25;

  document.getElementById('carbPctLabel').textContent = cPct;
  document.getElementById('protPctLabel').textContent = pPct;
  document.getElementById('fatPctLabel').textContent = fPct;

  targetCarb = Math.round((targetRDA * (cPct / 100)) / 4);
  targetProt = Math.round((targetRDA * (pPct / 100)) / 4);
  targetFat = Math.round((targetRDA * (fPct / 100)) / 9);

  document.getElementById('bmrVal').textContent = bmr;
  document.getElementById('rdaVal').textContent = targetRDA;
  document.getElementById('carbGrams').textContent = targetCarb;
  document.getElementById('protGrams').textContent = targetProt;
  document.getElementById('fatGrams').textContent = targetFat;

  document.getElementById('rdaProtCell').textContent = targetProt;
  document.getElementById('rdaCarbCell').textContent = targetCarb;
  document.getElementById('rdaFatCell').textContent = targetFat;
  document.getElementById('rdaKcalCell').textContent = targetRDA;

  recalcExchange();
}

function renderExchangeTable() {
  const tbody = document.getElementById('exchangeBody');
  tbody.innerHTML = '';
  exchangeGroups.forEach((g, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${g.name}</td>
      <td><input type="number" class="unit-input" data-idx="${idx}" min="0" step="0.5" value="0"></td>
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
  let sumP = 0, sumC = 0, sumF = 0, sumK = 0;
  const rows = document.querySelectorAll('#exchangeBody tr');

  rows.forEach((tr, idx) => {
    const units = Number(tr.querySelector('.unit-input').value) || 0;
    const g = exchangeGroups[idx];
    const p = +(units * g.p).toFixed(1);
    const c = +(units * g.c).toFixed(1);
    const f = +(units * g.f).toFixed(1);
    const k = Math.round((p * 4) + (c * 4) + (f * 9));

    tr.querySelector('.p-cell').textContent = p;
    tr.querySelector('.c-cell').textContent = c;
    tr.querySelector('.f-cell').textContent = f;
    tr.querySelector('.k-cell').textContent = k;

    sumP += p;
    sumC += c;
    sumF += f;
    sumK += k;
  });

  document.getElementById('sumProtCell').textContent = Math.round(sumP);
  document.getElementById('sumCarbCell').textContent = Math.round(sumC);
  document.getElementById('sumFatCell').textContent = Math.round(sumF);
  document.getElementById('sumKcalCell').textContent = Math.round(sumK);

  document.getElementById('diffProtCell').textContent = Math.round(sumP - targetProt);
  document.getElementById('diffCarbCell').textContent = Math.round(sumC - targetCarb);
  document.getElementById('diffFatCell').textContent = Math.round(sumF - targetFat);
  document.getElementById('diffKcalCell').textContent = Math.round(sumK - targetRDA);
}

function autoDistribute() {
  if (!targetRDA) calculateNeeds();
  const inputs = document.querySelectorAll('#exchangeBody .unit-input');
  inputs.forEach(i => i.value = 0);

  const setUnit = (id, val) => {
    const idx = exchangeGroups.findIndex(g => g.id === id);
    if (idx !== -1) inputs[idx].value = Math.max(0, Math.round(val * 2) / 2);
  };

  setUnit('milk_low', 2);
  setUnit('veg', 3);
  setUnit('fruit', 3);

  const usedCarb = (2 * 12) + (3 * 5) + (3 * 15);
  const remCarb = Math.max(0, targetCarb - usedCarb);
  const starchUnits = remCarb / 15;
  setUnit('starch', starchUnits);

  const usedProt = (2 * 8) + (3 * 2) + (Math.round(starchUnits * 2) / 2 * 3);
  const remProt = Math.max(0, targetProt - usedProt);
  const meatUnits = remProt / 7;
  setUnit('meat_lean', meatUnits);

  const usedFat = (2 * 5) + (Math.round(starchUnits * 2) / 2 * 1) + (Math.round(meatUnits * 2) / 2 * 3);
  const remFat = Math.max(0, targetFat - usedFat);
  setUnit('fat', remFat / 5);

  recalcExchange();
  showToast('تم توزيع الوحدات تلقائياً');
}

function addMealRow() {
  const tbody = document.getElementById('mealsBody');
  const tr = document.createElement('tr');
  let cells = '';
  for (let m = 0; m < 7; m++) {
    cells += `
      <td><input type="text" placeholder="صنف"></td>
      <td><input type="number" class="meal-unit" min="0" step="0.5" placeholder="0"></td>
      <td><input type="number" class="gram-cell" readonly value="0"></td>
    `;
  }
  tr.innerHTML = cells;
  tbody.appendChild(tr);

  tr.querySelectorAll('.meal-unit').forEach(inp => {
    inp.addEventListener('input', function () {
      const u = Number(this.value) || 0;
      const gramInput = this.parentElement.nextElementSibling.querySelector('.gram-cell');
      gramInput.value = Math.round(u * 30);
    });
  });
}

function exportToExcel() {
  const tableHTML = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"></head><body>
    <h3>Nutri Guide - دليلك للتغذية</h3>
    <p>RDA: ${targetRDA} kcal | Carbs: ${targetCarb}g | Protein: ${targetProt}g | Fat: ${targetFat}g</p>
    ${document.getElementById('exchangeTable').outerHTML}
    <br>
    ${document.getElementById('mealsTable').outerHTML}
    </body></html>
  `;
  const dataUri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent('\ufeff' + tableHTML);
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = 'Nutri_Guide_Plan.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('جاري تحميل ملف Excel');
}

function resetAll() {
  document.getElementById('gender').value = 'male';
  document.getElementById('specialWrap').style.display = 'none';
  document.getElementById('specialState').value = '0';
  document.getElementById('age').value = '25';
  document.getElementById('height').value = '174';
  document.getElementById('weight').value = '70';
  document.getElementById('activity').value = '1.375';
  document.getElementById('goal').value = '0';
  document.getElementById('carbPct').value = '60';
  document.getElementById('protPct').value = '15';
  document.getElementById('fatPct').value = '25';
  renderExchangeTable();
  document.getElementById('mealsBody').innerHTML = '';
  for (let i = 0; i < 4; i++) addMealRow();
  goStep(1);
  updateIBW();
  calculateNeeds();
  showToast('تمت إعادة ضبط البيانات');
}

document.getElementById('gender').addEventListener('change', function () {
  document.getElementById('specialWrap').style.display = this.value === 'female' ? 'block' : 'none';
  updateIBW();
});

document.getElementById('height').addEventListener('input', updateIBW);
document.getElementById('calcBtn').addEventListener('click', () => {
  calculateNeeds();
  showToast('تم تحديث الاحتياجات الغذائية');
});
document.getElementById('autoDistBtn').addEventListener('click', autoDistribute);
document.getElementById('addMealRowBtn').addEventListener('click', addMealRow);
document.getElementById('exportBtn').addEventListener('click', exportToExcel);
document.getElementById('resetBtn').addEventListener('click', resetAll);

['carbPct', 'protPct', 'fatPct'].forEach(id => {
  document.getElementById(id).addEventListener('input', calculateNeeds);
});

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
    e.preventDefault();
  }
});

renderExchangeTable();
for (let i = 0; i < 4; i++) addMealRow();
updateIBW();
calculateNeeds();
