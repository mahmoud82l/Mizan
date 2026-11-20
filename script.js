(function () {
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase()))
    ) {
      e.preventDefault();
    }
  });

  const idealWeightTable = {
    male: {
      157: 58.6, 158: 59.3, 159: 59.9, 160: 60.5, 161: 61.1, 162: 61.7,
      163: 62.3, 164: 62.9, 165: 63.5, 166: 64.0, 167: 64.6, 168: 65.2,
      169: 65.9, 170: 66.6, 171: 67.3, 172: 68.0, 173: 68.7, 174: 69.4,
      175: 70.1, 176: 70.8, 177: 71.6, 178: 72.4, 179: 73.3, 180: 74.2,
      181: 75.0, 182: 75.8, 183: 76.5, 184: 77.3, 185: 78.1, 186: 78.9
    },
    female: {
      140: 44.9, 141: 45.4, 142: 45.9, 143: 46.4, 144: 47.0, 145: 47.5,
      146: 48.0, 147: 48.6, 148: 49.2, 149: 49.8, 150: 50.4, 151: 51.0,
      152: 51.5, 153: 52.0, 154: 52.5, 155: 53.1, 156: 53.7, 157: 54.3,
      158: 54.9, 159: 55.5, 160: 56.2, 161: 56.9, 162: 57.6, 163: 58.3,
      164: 58.9, 165: 59.5, 166: 60.1, 167: 60.7, 168: 61.4, 169: 62.1
    }
  };

  function getIdealWeight(gender, height) {
    const h = Math.round(height);
    const table = idealWeightTable[gender];
    if (table[h] !== undefined) return table[h];
    const keys = Object.keys(table).map(Number);
    const minH = Math.min(...keys);
    const maxH = Math.max(...keys);
    if (h < minH) return Math.max(30, +(table[minH] - (minH - h) * 0.55).toFixed(1));
    return +(table[maxH] + (h - maxH) * 0.75).toFixed(1);
  }

  window.onGenderOrHeightChange = function () {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const condBox = document.getElementById('femaleConditionBox');
    if (gender === 'female') condBox.classList.remove('hidden');
    else condBox.classList.add('hidden');

    const height = parseFloat(document.getElementById('height').value) || 170;
    document.getElementById('idealWeightDisplay').innerText = `${getIdealWeight(gender, height)} كجم`;
  };

  const foodGroupsData = [
    { isHeader: true, title: "الألبان ومنتجاتها" },
    { id: "milk_full", name: "1. لبن كامل الدسم", unit: 0, protPerUnit: 9, carbPerUnit: 12, fatPerUnit: 9 },
    { id: "milk_skim", name: "2. لبن منزوع الدسم", unit: 0, protPerUnit: 9, carbPerUnit: 12, fatPerUnit: 0.5 },

    { isHeader: true, title: "اللحوم وبديلاتها" },
    { id: "meat", name: "1. لحوم", unit: 0, protPerUnit: 20, carbPerUnit: 0, fatPerUnit: 15 },
    { id: "eggs", name: "2. البيض", unit: 0, protPerUnit: 6, carbPerUnit: 0, fatPerUnit: 5 },
    { id: "legumes", name: "3. بقول مطهية", unit: 0, protPerUnit: 15, carbPerUnit: 48, fatPerUnit: 1 },

    { isHeader: true, title: "الفاكهة والخضر" },
    { id: "veg_leafy", name: "1. الخضر الورقية", unit: 0, protPerUnit: 1, carbPerUnit: 3, fatPerUnit: 0 },
    { id: "citrus", name: "2. الموالح", unit: 0, protPerUnit: 1, carbPerUnit: 10, fatPerUnit: 0 },
    { id: "other_fv", name: "3. بقية الفواكه والخضر المطهية", unit: 0, protPerUnit: 2, carbPerUnit: 6, fatPerUnit: 0 },

    { isHeader: true, title: "الخبز والحبوب" },
    { id: "bread", name: "1. الخبز", unit: 0, protPerUnit: 9, carbPerUnit: 70, fatPerUnit: 1 },
    { id: "pasta_rice", name: "2. المكرونة والأرز", unit: 0, protPerUnit: 5, carbPerUnit: 40, fatPerUnit: 1 },
    { id: "sugar", name: "3. السكر", unit: 0, protPerUnit: 0, carbPerUnit: 7, fatPerUnit: 0 },
    { id: "jam_honey", name: "4. مربى وعسل", unit: 0, protPerUnit: 0, carbPerUnit: 14, fatPerUnit: 0 },

    { isHeader: true, title: "الدهون والزيوت" },
    { id: "fat_cooking", name: "1. المضافة للطهي", unit: 0, protPerUnit: 0, carbPerUnit: 0, fatPerUnit: 5 },
    { id: "fat_table", name: "2. المضافة للطعام والسلطة", unit: 0, protPerUnit: 0, carbPerUnit: 0, fatPerUnit: 5 }
  ];

  const mealPeriodNames = [
    "بعد الاستيقاظ", "الإفطار", "بين الفطار والغداء", "الغداء",
    "بين الغداء والعشاء", "العشاء", "قبل النوم"
  ];

  let mealsRowsData = [
    [
      { item: "بقسماط", u: "0.25", g: "35" },
      { item: "جبن قريش + طماطم", u: "1", g: "60" },
      { item: "ثمرة برتقال", u: "1", g: "100" },
      { item: "دجاج بانيه", u: "1", g: "100" },
      { item: "سلطة خضراء", u: "0.5", g: "50" },
      { item: "جبن قريش", u: "1", g: "60" },
      { item: "تمر", u: "0.5", g: "100" }
    ],
    [
      { item: "لبن", u: "1", g: "280" },
      { item: "فول مدمس", u: "1", g: "100" },
      { item: "سكر", u: "1.5", g: "10.5" },
      { item: "زيت", u: "1.5", g: "7.5" },
      { item: "ليمون", u: "1", g: "100" },
      { item: "طماطم", u: "1", g: "100" },
      { item: "", u: "", g: "" }
    ],
    [
      { item: "عسل نحل", u: "3 م", g: "60" },
      { item: "زيت", u: "0.5", g: "100" },
      { item: "سلطة خضراء", u: "1", g: "100" },
      { item: "أرز", u: "0.5", g: "50" },
      { item: "كوب زبادي", u: "1", g: "75" },
      { item: "خبز", u: "0.25", g: "35" },
      { item: "", u: "", g: "" }
    ],
    [
      { item: "", u: "", g: "" },
      { item: "ليمون + سلطة خضراء", u: "1", g: "5" },
      { item: "", u: "", g: "" },
      { item: "سلطة خضراء", u: "1", g: "100" },
      { item: "", u: "", g: "" },
      { item: "عصير ليمون", u: "1", g: "100" },
      { item: "", u: "", g: "" }
    ],
    [
      { item: "", u: "", g: "" },
      { item: "خبز", u: "0.5", g: "70" },
      { item: "", u: "", g: "" },
      { item: "ليمون", u: "1", g: "100" },
      { item: "", u: "", g: "" },
      { item: "سكر", u: "2", g: "14" },
      { item: "", u: "", g: "" }
    ]
  ];

  let activeMobileMealIdx = 1;
  let targetCalories = 2080;
  let targetProtG = 78;
  let targetCarbG = 312;
  let targetFatG = 58;
  let isManualEdit = false;

  window.goToStep = function (step) {
    [1, 2, 3].forEach(i => {
      document.getElementById(`step${i}`).classList.add('hidden');
      const badge = document.getElementById(`stepBadge${i}`);
      if (i <= step) {
        badge.classList.remove('bg-slate-800', 'text-slate-400');
        badge.classList.add('bg-cyan-500', 'text-slate-950');
      } else {
        badge.classList.add('bg-slate-800', 'text-slate-400');
        badge.classList.remove('bg-cyan-500', 'text-slate-950');
      }
    });
    document.getElementById(`step${step}`).classList.remove('hidden');
  };

  window.resetWizard = function () {
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('wizardSection').classList.remove('hidden');
    document.getElementById('btnBackToWizard').classList.add('hidden');
    document.getElementById('btnExport').classList.add('hidden');
    goToStep(1);
  };

  window.calculateAndShowDashboard = function () {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseFloat(document.getElementById('age').value) || 25;
    const currentWeight = parseFloat(document.getElementById('weight').value) || 70;
    const height = parseFloat(document.getElementById('height').value) || 170;
    const weightBasis = document.querySelector('input[name="weightBasis"]:checked').value;
    const activityFactor = parseFloat(document.querySelector('input[name="activity"]:checked').value);
    const goalDelta = parseFloat(document.querySelector('input[name="goal"]:checked').value);
    const femaleExtra = gender === 'female' ? parseFloat(document.getElementById('femaleCondition').value) : 0;

    const usedWeight = weightBasis === 'ideal' ? getIdealWeight(gender, height) : currentWeight;
    const baseBmr = Math.round(usedWeight * (gender === 'male' ? 1.0 : 0.9) * 24);

    let bmr = baseBmr;
    if (age > 30) {
      const discountPct = ((age - 30) / 10) * 5;
      const discountVal = Math.round(baseBmr * (discountPct / 100));
      bmr = baseBmr - discountVal;
    }

    targetCalories = Math.round(bmr + (bmr * activityFactor) + femaleExtra + goalDelta);

    document.getElementById('resBMR').innerText = bmr;
    updateMacroTargetsFromPct();

    document.getElementById('wizardSection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
    document.getElementById('btnBackToWizard').classList.remove('hidden');
    document.getElementById('btnExport').classList.remove('hidden');

    smartAutoDistribute();
    renderMealsSection();
  };

  function updateMacroTargetsFromPct() {
    const pctCarb = parseFloat(document.getElementById('pctCarb').value) || 60;
    const pctProt = parseFloat(document.getElementById('pctProt').value) || 15;
    const pctFat = parseFloat(document.getElementById('pctFat').value) || 25;

    targetCarbG = Math.round((targetCalories * (pctCarb / 100)) / 4);
    targetProtG = Math.round((targetCalories * (pctProt / 100)) / 4);
    targetFatG = Math.round((targetCalories * (pctFat / 100)) / 9);
    targetCalories = Math.round((targetProtG * 4) + (targetCarbG * 4) + (targetFatG * 9));

    document.getElementById('resTotalCal').innerText = targetCalories;
    document.getElementById('carbPctLabel').innerText = `${pctCarb}%`;
    document.getElementById('protPctLabel').innerText = `${pctProt}%`;
    document.getElementById('fatPctLabel').innerText = `${pctFat}%`;
    document.getElementById('resCarbG').innerText = targetCarbG;
    document.getElementById('resProtG').innerText = targetProtG;
    document.getElementById('resFatG').innerText = targetFatG;

    document.getElementById('rdaProtCell').innerText = targetProtG;
    document.getElementById('rdaCarbCell').innerText = targetCarbG;
    document.getElementById('rdaFatCell').innerText = targetFatG;
    document.getElementById('rdaCalCell').innerText = targetCalories;
  }

  window.onPctChange = function () {
    updateMacroTargetsFromPct();
    smartAutoDistribute();
  };

  window.smartAutoDistribute = function () {
    isManualEdit = false;
    document.getElementById('diffRow').classList.add('hidden');

    const units = {};
    foodGroupsData.forEach(item => {
      if (!item.isHeader) units[item.id] = 0;
    });

    units.milk_full = 2;
    units.veg_leafy = 4;
    units.citrus = 3;
    units.other_fv = 1;
    units.bread = 1;
    units.meat = 0.5;
    units.legumes = 0.5;
    units.fat_table = 0.5;

    function getTotals(uMap) {
      let p = 0, c = 0, f = 0;
      foodGroupsData.forEach(item => {
        if (!item.isHeader && uMap[item.id] > 0) {
          p += uMap[item.id] * item.protPerUnit;
          c += uMap[item.id] * item.carbPerUnit;
          f += uMap[item.id] * item.fatPerUnit;
        }
      });
      return { p, c, f };
    }

    for (let i = 0; i < 60; i++) {
      const cur = getTotals(units);
      const remC = targetCarbG - cur.c;
      const remP = targetProtG - cur.p;
      if (remC >= 35 && remP >= 4.5) units.bread += 0.5;
      else if (remC >= 20 && remP >= 2.5) units.pasta_rice += 0.5;
      else if (remC >= 7) units.jam_honey += 0.5;
      else if (remC >= 3.5) units.sugar += 0.5;
      else break;
    }

    for (let i = 0; i < 60; i++) {
      const cur = getTotals(units);
      const remP = targetProtG - cur.p;
      const remF = targetFatG - cur.f;
      const remC = targetCarbG - cur.c;
      if (remP >= 10 && remF >= 7.5) units.meat += 0.5;
      else if (remP >= 4.5 && remC >= 6) units.milk_skim += 0.5;
      else if (remP >= 3 && remF >= 2.5) units.eggs += 0.5;
      else break;
    }

    for (let i = 0; i < 60; i++) {
      const cur = getTotals(units);
      if (targetFatG - cur.f >= 2.5) units.fat_table += 0.5;
      else break;
    }

    foodGroupsData.forEach(item => {
      if (!item.isHeader) item.unit = units[item.id];
    });

    renderUnitsTable();
  };

  function renderUnitsTable() {
    const tbody = document.getElementById('unitsTableBody');
    tbody.innerHTML = '';

    foodGroupsData.forEach((item, index) => {
      const tr = document.createElement('tr');
      if (item.isHeader) {
        tr.innerHTML = `<td colspan="6" class="group-header">${item.title}</td>`;
      } else {
        const p = Math.round(item.unit * item.protPerUnit);
        const c = Math.round(item.unit * item.carbPerUnit);
        const f = Math.round(item.unit * item.fatPerUnit);
        const cal = Math.round((p * 4) + (c * 4) + (f * 9));

        tr.innerHTML = `
          <td class="text-right pr-3 font-semibold text-slate-200">${item.name}</td>
          <td>
            <input type="number" step="0.5" min="0" value="${item.unit}"
              onchange="onUnitManualChange(${index}, this.value)"
              class="excel-input font-bold text-cyan-300">
          </td>
          <td class="text-emerald-300">${item.unit > 0 ? p : '-'}</td>
          <td class="text-amber-300">${item.unit > 0 ? c : '-'}</td>
          <td class="text-rose-300">${item.unit > 0 ? f : '-'}</td>
          <td class="font-bold text-white">${item.unit > 0 ? cal : '-'}</td>
        `;
      }
      tbody.appendChild(tr);
    });

    updateUnitsTotals();
  }

  window.onUnitManualChange = function (index, val) {
    let u = parseFloat(val) || 0;
    if (u > 0 && u < 0.5) u = 0.5;
    foodGroupsData[index].unit = u;
    isManualEdit = true;
    renderUnitsTable();
  };

  function updateUnitsTotals() {
    let sumP = 0, sumC = 0, sumF = 0, sumCal = 0;

    foodGroupsData.forEach(item => {
      if (!item.isHeader && item.unit > 0) {
        const p = Math.round(item.unit * item.protPerUnit);
        const c = Math.round(item.unit * item.carbPerUnit);
        const f = Math.round(item.unit * item.fatPerUnit);
        sumP += p;
        sumC += c;
        sumF += f;
        sumCal += Math.round((p * 4) + (c * 4) + (f * 9));
      }
    });

    document.getElementById('sumProtCell').innerText = sumP;
    document.getElementById('sumCarbCell').innerText = sumC;
    document.getElementById('sumFatCell').innerText = sumF;
    document.getElementById('sumCalCell').innerText = sumCal;

    const diffRow = document.getElementById('diffRow');
    if (isManualEdit) {
      diffRow.classList.remove('hidden');
      const setDiff = (el, val, limit) => {
        el.innerText = val > 0 ? `+${val}` : val;
        el.className = Math.abs(val) <= limit ? "text-emerald-400 bg-emerald-950/30" : "text-rose-400 bg-rose-950/30";
      };
      setDiff(document.getElementById('diffProtCell'), sumP - targetProtG, 5);
      setDiff(document.getElementById('diffCarbCell'), sumC - targetCarbG, 5);
      setDiff(document.getElementById('diffFatCell'), sumF - targetFatG, 5);
      setDiff(document.getElementById('diffCalCell'), sumCal - targetCalories, 20);
    } else {
      diffRow.classList.add('hidden');
    }
  }

  function renderMealsSection() {
    renderMobileMealTabs();
    renderMobileMealView();
    renderDesktopMealsTable();
  }

  function renderMobileMealTabs() {
    const tabsContainer = document.getElementById('mobileMealTabs');
    tabsContainer.innerHTML = '';
    mealPeriodNames.forEach((name, idx) => {
      const btn = document.createElement('button');
      const isActive = idx === activeMobileMealIdx;
      btn.className = isActive
        ? "px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs whitespace-nowrap shrink-0 transition"
        : "px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 font-bold text-xs whitespace-nowrap shrink-0 border border-slate-800 transition";
      btn.innerText = name;
      btn.onclick = () => {
        activeMobileMealIdx = idx;
        renderMobileMealTabs();
        renderMobileMealView();
      };
      tabsContainer.appendChild(btn);
    });
  }

  function renderMobileMealView() {
    const container = document.getElementById('mobileMealView');
    let rowsHtml = '';
    mealsRowsData.forEach((row, rIdx) => {
      const cell = row[activeMobileMealIdx];
      rowsHtml += `
        <tr>
          <td><input type="text" value="${cell.item}" onchange="updateMealCell(${rIdx}, ${activeMobileMealIdx}, 'item', this.value)" class="excel-input text-right px-2 text-xs" placeholder="الصنف..."></td>
          <td class="w-16"><input type="text" value="${cell.u}" onchange="updateMealCell(${rIdx}, ${activeMobileMealIdx}, 'u', this.value)" class="excel-input text-cyan-300 text-xs" placeholder="-"></td>
          <td class="w-16"><input type="text" value="${cell.g}" onchange="updateMealCell(${rIdx}, ${activeMobileMealIdx}, 'g', this.value)" class="excel-input text-amber-300 text-xs" placeholder="-"></td>
        </tr>
      `;
    });

    container.innerHTML = `
      <table class="excel-grid text-xs">
        <thead>
          <tr>
            <th class="text-right pr-3">الصنف (${mealPeriodNames[activeMobileMealIdx]})</th>
            <th class="w-16">وحدة</th>
            <th class="w-16">جم</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  function renderDesktopMealsTable() {
    const tbody = document.getElementById('mealsTableBody');
    tbody.innerHTML = '';

    mealsRowsData.forEach((row, rIdx) => {
      const tr = document.createElement('tr');
      let cellsHtml = '';
      row.forEach((cell, mIdx) => {
        cellsHtml += `
          <td><input type="text" value="${cell.item}" onchange="updateMealCell(${rIdx}, ${mIdx}, 'item', this.value)" class="excel-input text-right px-1 text-[11px]" placeholder="..."></td>
          <td><input type="text" value="${cell.u}" onchange="updateMealCell(${rIdx}, ${mIdx}, 'u', this.value)" class="excel-input text-cyan-300 text-[11px]" placeholder="-"></td>
          <td><input type="text" value="${cell.g}" onchange="updateMealCell(${rIdx}, ${mIdx}, 'g', this.value)" class="excel-input text-amber-300 text-[11px]" placeholder="-"></td>
        `;
      });
      tr.innerHTML = cellsHtml;
      tbody.appendChild(tr);
    });
  }

  window.updateMealCell = function (rIdx, mIdx, field, val) {
    mealsRowsData[rIdx][mIdx][field] = val;
  };

  window.addMealRow = function () {
    mealsRowsData.push(Array.from({ length: 7 }, () => ({ item: "", u: "", g: "" })));
    renderMealsSection();
  };

  window.exportToExcel = function () {
    const wb = XLSX.utils.book_new();
    wb.Workbook = { Views: [{ RTL: true }] };

    const sheet1Data = [["مجموعة الأطعمة", "الوحدة", "البروتين", "الكربوهيدرات", "الدهون", "المجموع"]];
    foodGroupsData.forEach(item => {
      if (item.isHeader) {
        sheet1Data.push([item.title, "", "", "", "", ""]);
      } else {
        const p = Math.round(item.unit * item.protPerUnit);
        const c = Math.round(item.unit * item.carbPerUnit);
        const f = Math.round(item.unit * item.fatPerUnit);
        sheet1Data.push([item.name, item.unit, p, c, f, Math.round((p * 4) + (c * 4) + (f * 9))]);
      }
    });
    sheet1Data.push(["الـ RDA", "", targetProtG, targetCarbG, targetFatG, targetCalories]);
    sheet1Data.push([
      "المجموع", "",
      parseInt(document.getElementById('sumProtCell').innerText),
      parseInt(document.getElementById('sumCarbCell').innerText),
      parseInt(document.getElementById('sumFatCell').innerText),
      parseInt(document.getElementById('sumCalCell').innerText)
    ]);

    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    ws1['!views'] = [{ rightToLeft: true }];
    XLSX.utils.book_append_sheet(wb, ws1, "جدول الوحدات التبادلية");

    const headerRow1 = [];
    const headerRow2 = [];
    mealPeriodNames.forEach(name => {
      headerRow1.push(name, "", "");
      headerRow2.push("الصنف", "وحدة", "جم");
    });

    const sheet2Data = [headerRow1, headerRow2];
    mealsRowsData.forEach(row => {
      const flatRow = [];
      row.forEach(cell => flatRow.push(cell.item, cell.u, cell.g));
      sheet2Data.push(flatRow);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
    ws2['!views'] = [{ rightToLeft: true }];
    XLSX.utils.book_append_sheet(wb, ws2, "توزيع الوجبات اليومية");

    XLSX.writeFile(wb, "MIZAN_RDA.xlsx");
  };

  onGenderOrHeightChange();
})();
