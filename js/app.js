
// ========================
// 数据定义 (Mock Data)
// ========================
var PERIODS = ["2024/01/01","2024/02/01","2024/03/01","2024/04/01","2024/05/01","2024/06/01","2024/07/01","2024/08/01","2024/09/01","2024/10/01","2024/11/01","2024/12/01","2025/01/01","2025/02/01","2025/03/01","2025/04/01","2025/05/01","2025/06/01","2025/07/01","2025/08/01","2025/09/01","2025/10/01","2025/11/01","2025/12/01","2026/01/01","2026/02/01","2026/03/01","2026/04/01","2026/05/01"];
var EXCHANGES = ["上期所","中金所","大商所","广期所","能源中心","郑商所"];
var INCOME_CATS = ["经纪业务","其他业务","期现业务","场外业务","场内业务","合并抵销"];
var currentPeriod = PERIODS[PERIODS.length-1];
var currentModule = 'flash';
var currentSubTab = 'fund';
var currentAnnualYear = 2026;
var activeTradeMetric = 'volume';

var selectedMFinCompany = null;
var selectedMIncomeCat = null;
var selectedMIncomeMode = null;
var selectedMIncomeItem = null;
var selectedMIncomeCompany = null;
var selectedMExpenseCat = null;
var selectedMExpenseMode = null;
var selectedMExpenseItem = null;
var selectedMExchange = null;
var mIncomeDrillViewMode = 'item';
var mExchangeDrillShowAllCo = false;
var mExchangeDrillShowAllMkt = false;
var coIncomeDrillExpanded = {}; // 收入钻取表公司展开状态
var coExpenseDrillExpanded = {}; // 费用钻取表公司展开状态

var COLORS = ["#3498db","#2ecc71","#e74c3c","#f39c12","#9b59b6","#1abc9c","#e67e22","#34495e"];
var CAT_COLORS = {"经纪业务":"#3498db","其他业务":"#2ecc71","期现业务":"#e74c3c","场外业务":"#f39c12","场内业务":"#9b59b6","合并抵销":"#95a5a6"};
var EXPENSE_COLORS = ["#e74c3c","#3498db","#2ecc71","#f39c12","#9b59b6"];
var EXCHANGE_COLORS = {"上期所":"#3498db","中金所":"#e74c3c","大商所":"#2ecc71","广期所":"#9b59b6","能源中心":"#f39c12","郑商所":"#1abc9c"};

// 快报记者数据
var dailyFund = {
  dates: ["2026/05/27","2026/05/28","2026/05/29","2026/05/30","2026/05/31"],
  regulatory: {
    "2026/05/31": {"客户权益（亿元）":1234.56,"净资本（亿元）":890.12,"净资本/风险资本准备":1.85},
    "2026/05/30": {"客户权益（亿元）":1228.42,"净资本（亿元）":891.89,"净资本/风险资本准备":1.84}
  },
  invest: {
    "2026/05/31": {
      "货币资金": {total: 456.78, "期货": 200, "投资": 150, "国贸": 80, "资本": 26.78},
      "结算备付金": {total: 123.45, "期货": 80, "投资": 30, "国贸": 10, "资本": 3.45},
      "存出保证金": {total: 234.56, "期货": 150, "投资": 60, "国贸": 20, "资本": 4.56},
      "应收款项": {total: 345.67, "期货": 120, "投资": 100, "国贸": 80, "资本": 45.67}
    }
  },
  investCategories: {
    "2026/05/31": {"货币资金":"现金及现金等价物","结算备付金":"现金及现金等价物","存出保证金":"其他资金类","应收款项":"往来类"}
  },
  source: {
    "2026/05/31": {
      "客户权益": {total: 1234.56, "期货": 600, "投资": 400, "国贸": 200, "资本": 34.56},
      "自有资金": {total: 345.67, "期货": 150, "投资": 120, "国贸": 60, "资本": 15.67},
      "银行借款": {total: 123.45, "期货": 50, "投资": 40, "国贸": 30, "资本": 3.45},
      "应付债券": {total: 98.76, "期货": 40, "投资": 30, "国贸": 20, "资本": 8.76}
    }
  },
  credit: {
    "2026/05/31": {
      "工商银行": {total: 500, used: 420, remaining: 80},
      "建设银行": {total: 300, used: 285, remaining: 15},
      "农业银行": {total: 400, used: 280, remaining: 120},
      "中国银行": {total: 250, used: 200, remaining: 50},
      "招商银行": {total: 200, used: 120, remaining: 80}
    }
  },
  plan: {
    "2026/05/31": [
      {"项目（亿元）":"短期借款提款","预计提款日期":"2026-06-15","预计还款日期":"2026-07-15","提/还款金额":50},
      {"项目（亿元）":"中期票据还款","预计提款日期":"2026-07-01","预计还款日期":"2026-08-01","提/还款金额":-30},
      {"项目（亿元）":"银行授信提款","预计提款日期":"2026-08-10","预计还款日期":"2026-09-10","提/还款金额":80},
      {"项目（亿元）":"债券到期还款","预计提款日期":"2026-08-20","预计还款日期":"2026-09-20","提/还款金额":-45},
      {"项目（亿元）":"同业拆借提款","预计提款日期":"2026-09-01","预计还款日期":"2026-09-15","提/还款金额":20}
    ]
  }
};

var dailyCurrentDate = "2026/05/31";
var dailySelectedCompany = "全部公司";
var dailyInvestChartMode = "project";

// ========================
// 辅助函数
// ========================
function fmtNum(n,d){if(d===undefined)d=2;if(n===null||n===undefined||isNaN(n))return'—';return Number(n).toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function fmtPct(n){if(n===null||n===undefined||isNaN(n))return'—';return(n>0?'+':'')+n.toFixed(2)+'%';}
function fmtPctShort(n){if(n===null||n===undefined||isNaN(n))return'—';return(n>0?'+':'')+n.toFixed(1)+'%';}
function pctClass(n){return(n===null||n===undefined)?'kpi-neutral':(n>=0?'kpi-up':'kpi-down');}
function yi(n){return n!==null?Math.round(n/1e8*100)/100:null;}
function wan(n){return n!==null?Math.round(n/1e4*100)/100:null;}
function getNearYear(){var idx=PERIODS.indexOf(currentPeriod);if(idx<11)return PERIODS.slice(0,idx+1);return PERIODS.slice(idx-11,idx+1);}
function hexToRgba(hex,a){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return"rgba("+r+","+g+","+b+","+a+")";}

// ========================
// 导航控制
// ========================
function toggleNav(el) {
  var parent = el.parentElement;
  var sub = parent.querySelector('.sub-nav');
  if(sub) {
    sub.classList.toggle('show');
    el.classList.toggle('expanded');
  }
}

function switchModule(mod) {
  currentModule = mod;
  document.querySelectorAll('.module-section').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
  document.querySelectorAll('.sub-item').forEach(function(s){s.classList.remove('active');});
  
  var modEl = document.getElementById('mod-' + mod);
  if(modEl) modEl.classList.add('active');
  
  // Update sidebar active states
  var navMap = {'flash':0,'monthly':1,'annual':2,'assessment':3,'benchmark':4};
  var navIdx = navMap[mod];
  var navItems = document.querySelectorAll('.sidebar .nav-item');
  if(navItems[navIdx]) navItems[navIdx].classList.add('active');
  
  var subDefaults = {'flash':'fund','monthly':'finance','annual':'finance','assessment':'main','benchmark':'peer'};
  switchSubTab(mod, subDefaults[mod] || 'finance');
}

function switchSubTab(mod, tab) {
  currentSubTab = tab;
  var modEl = document.getElementById('mod-' + mod);
  if(!modEl) return;
  
  // Update sub-tabs
  var tabBar = modEl.querySelector('.sub-tab-bar');
  if(tabBar) {
    tabBar.querySelectorAll('.sub-tab').forEach(function(t){t.classList.remove('active');});
    var tabs = tabBar.querySelectorAll('.sub-tab');
    var tabOrder = ['finance','trading','fee','equity','fund','main','peer','futures','region','risk','overseas'];
    var idx = tabOrder.indexOf(tab);
    if(idx >= 0 && tabs[idx]) tabs[idx].classList.add('active');
  }
  
  // Update page sections
  modEl.querySelectorAll('.page-section').forEach(function(s){s.classList.remove('active');});
  var section = modEl.querySelector('#sec-' + mod + '-' + tab);
  if(section) section.classList.add('active');
  
  // Update sidebar sub-items
  document.querySelectorAll('.sub-item').forEach(function(s){s.classList.remove('active');});
  var subItems = document.querySelectorAll('.sub-item');
  subItems.forEach(function(item){
    if(item.textContent.includes(getTabLabel(tab))) item.classList.add('active');
  });
  
  renderAll();
}

function getTabLabel(tab) {
  var labels = {'finance':'财务','trading':'成交','fee':'手续费','equity':'权益','fund':'资金','main':'主页面','peer':'同行','futures':'期货行业','region':'辖区','risk':'风险子','overseas':'境外子'};
  return labels[tab] || tab;
}

// ========================
// 期间切换
// ========================
function onPeriodChange() {
  currentPeriod = document.getElementById('periodSelect').value;
  updatePeriodDisplay();
  renderAll();
}
function updatePeriodDisplay() {
  var txt = currentPeriod.substring(0,7);
  document.querySelectorAll('#periodDisplay, #periodDisplay2').forEach(function(el){if(el)el.textContent=txt;});
}
function showPeriodPicker() { var sel = document.getElementById('periodSelect'); if(sel.showPicker) sel.showPicker(); else sel.click(); }
function prevPeriod() { var idx = PERIODS.indexOf(currentPeriod); if(idx>0){currentPeriod=PERIODS[idx-1];document.getElementById('periodSelect').value=currentPeriod;updatePeriodDisplay();renderAll();} }
function nextPeriod() { var idx = PERIODS.indexOf(currentPeriod); if(idx>=0 && idx<PERIODS.length-1){currentPeriod=PERIODS[idx+1];document.getElementById('periodSelect').value=currentPeriod;updatePeriodDisplay();renderAll();} }
function prevAnnualYear() { if(currentAnnualYear>2024){currentAnnualYear--;document.getElementById('annualYearDisplay').textContent=String(currentAnnualYear);} }
function nextAnnualYear() { if(currentAnnualYear<2026){currentAnnualYear++;document.getElementById('annualYearDisplay').textContent=String(currentAnnualYear);} }
function showAnnualYearPicker() { var sel = document.getElementById('annualYearSelect'); if(sel.showPicker) sel.showPicker(); else sel.click(); }
function selectAnnualYear() { var sel = document.getElementById('annualYearSelect'); if(sel){currentAnnualYear=parseInt(sel.value);document.getElementById('annualYearDisplay').textContent=String(currentAnnualYear);} }

// ========================
// 快报-资金日报
// ========================
function dailyPrevDay() { var idx = dailyFund.dates.indexOf(dailyCurrentDate); if(idx>0){dailyCurrentDate=dailyFund.dates[idx-1];dailyRenderFund();} }
function dailyNextDay() { var idx = dailyFund.dates.indexOf(dailyCurrentDate); if(idx<dailyFund.dates.length-1){dailyCurrentDate=dailyFund.dates[idx+1];dailyRenderFund();} }
function dailyOnDateChange() { var inp = document.getElementById('dailyDateInput'); if(inp&&inp.value){dailyCurrentDate=inp.value.replace(/-/g,'/');dailyRenderFund();} }
function dailyOnCompanyChange() { var sel = document.getElementById('dailyCompanySelect'); if(sel){dailySelectedCompany=sel.value;dailyRenderFund();} }
function dailySyncDateInput() { var inp = document.getElementById('dailyDateInput'); if(inp){var d=new Date(dailyCurrentDate.replace(/\//g,'-')); inp.value=d.toISOString().split('T')[0];} }

function dailyRenderFund() {
  var el = document.getElementById('flashDateDisplay');
  if(el) el.textContent = dailyCurrentDate;
  dailySyncDateInput();
  dailyRenderRegMetrics(dailyCurrentDate);
  dailyRenderInvestPie(dailyCurrentDate);
  dailyRenderSourcePie(dailyCurrentDate);
  dailyRenderCreditTable(dailyCurrentDate);
  dailyRenderPlanTimeline(dailyCurrentDate);
}

function dailyRenderRegMetrics(date) {
  var reg = dailyFund.regulatory[date];
  var prev = dailyFund.dates[dailyFund.dates.indexOf(date)-1];
  var prevReg = prev ? dailyFund.regulatory[prev] : null;
  function calcMom(c,p){if(!c||!p||p===0)return null;return(c-p)/Math.abs(p)*100;}
  var html = '';
  html += '<div style="padding:10px;background:linear-gradient(90deg,rgba(52,152,219,0.06),#fff);border-left:4px solid #3498db;border-radius:8px;margin-bottom:10px;"><div style="font-size:12px;color:#7f8c8d;margin-bottom:4px;">客户权益（亿元）</div><div style="font-size:24px;font-weight:700;">'+fmtNum(reg["客户权益（亿元）"],2)+'</div><div style="font-size:11px;color:#7f8c8d;margin-top:4px;">较上日 <span class="'+pctClass(calcMom(reg["客户权益（亿元）"],prevReg?.["客户权益（亿元）"]))+'">'+fmtPctShort(calcMom(reg["客户权益（亿元）"],prevReg?.["客户权益（亿元）"]))+'</span></div></div>';
  html += '<div style="padding:10px;background:linear-gradient(90deg,rgba(155,89,182,0.06),#fff);border-left:4px solid #9b59b6;border-radius:8px;margin-bottom:10px;"><div style="font-size:12px;color:#7f8c8d;margin-bottom:4px;">净资本（亿元）</div><div style="font-size:24px;font-weight:700;">'+fmtNum(reg["净资本（亿元）"],2)+'</div><div style="font-size:11px;color:#7f8c8d;margin-top:4px;">较上日 <span class="'+pctClass(calcMom(reg["净资本（亿元）"],prevReg?.["净资本（亿元）"]))+'">'+fmtPctShort(calcMom(reg["净资本（亿元）"],prevReg?.["净资本（亿元）"]))+'</span></div></div>';
  html += '<div style="padding:10px;background:linear-gradient(90deg,rgba(26,188,156,0.06),#fff);border-left:4px solid #1abc9c;border-radius:8px;"><div style="font-size:12px;color:#7f8c8d;margin-bottom:4px;">净资本/风险资本准备</div><div style="font-size:24px;font-weight:700;">'+fmtNum(reg["净资本/风险资本准备"],2)+'<span style="font-size:13px;font-weight:400;color:#95a5a6;">倍</span></div><div style="font-size:11px;color:#7f8c8d;margin-top:4px;">较上日 <span class="'+pctClass(calcMom(reg["净资本/风险资本准备"],prevReg?.["净资本/风险资本准备"]))+'">'+fmtPctShort(calcMom(reg["净资本/风险资本准备"],prevReg?.["净资本/风险资本准备"]))+'</span></div></div>';
  document.getElementById('dailyRegMetrics').innerHTML = html;
}

function dailyRenderInvestPie(date) {
  var inv = dailyFund.invest[date];
  var cats = dailyFund.investCategories ? dailyFund.investCategories[date] : null;
  if(!inv) return;
  var isAll = (dailySelectedCompany === '全部公司');
  var projMap = {}, catGroups = {}, catOrder = [];
  for(var p in inv) {
    var val = isAll ? inv[p].total : (inv[p][dailySelectedCompany]||0);
    if(val !== 0) {
      projMap[p] = {value: val, abs: Math.abs(val), cat: cats ? (cats[p]||'') : ''};
      var cat = projMap[p].cat || '未分类';
      if(!catGroups[cat]){catGroups[cat]=[];catOrder.push(cat);}
      catGroups[cat].push(p);
    }
  }
  var grandTotal = 0; for(var p in projMap) grandTotal += projMap[p].value;
  var colors = ["#3498db","#2ecc71","#e74c3c","#f39c12","#9b59b6","#1abc9c","#e67e22","#34495e"];
  
  var pieLabels=[], pieValues=[], pieColors=[];
  if(dailyInvestChartMode === 'category') {
    for(var ci=0; ci<catOrder.length; ci++){
      var cat=catOrder[ci], catTotal=0;
      for(var pi=0; pi<catGroups[cat].length; pi++) catTotal += projMap[catGroups[cat][pi]].value;
      if(catTotal!==0){pieLabels.push(cat);pieValues.push(Math.abs(catTotal));pieColors.push(colors[ci%colors.length]);}
    }
  } else {
    var sorted = Object.keys(projMap).sort(function(a,b){return projMap[b].abs-projMap[a].abs;});
    for(var si=0; si<sorted.length; si++){var p=sorted[si];pieLabels.push(p);pieValues.push(projMap[p].abs);pieColors.push(colors[si%colors.length]);}
  }
  
  var ctx = document.getElementById('dailyInvestPie');
  if(ctx){if(window.dailyInvestChart)window.dailyInvestChart.destroy();window.dailyInvestChart=new Chart(ctx,{type:'doughnut',data:{labels:pieLabels,datasets:[{data:pieValues,backgroundColor:pieColors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}}}});}
}

function dailyRenderSourcePie(date) {
  var src = dailyFund.source[date];
  if(!src) return;
  var isAll = (dailySelectedCompany === '全部公司');
  var projectValues = [];
  for(var p in src) {
    var val = isAll ? src[p].total : (src[p][dailySelectedCompany]||0);
    if(val!==0) projectValues.push({name:p,value:val});
  }
  projectValues.sort(function(a,b){return Math.abs(b.value)-Math.abs(a.value);});
  var labels = projectValues.map(function(p){return p.name;});
  var values = projectValues.map(function(p){return Math.abs(p.value);});
  var colors = ["#2ecc71","#3498db","#f39c12","#9b59b6","#1abc9c","#e67e22","#34495e","#e74c3c"];
  var ctx = document.getElementById('dailySourcePie');
  if(ctx){if(window.dailySourceChart)window.dailySourceChart.destroy();window.dailySourceChart=new Chart(ctx,{type:'doughnut',data:{labels:labels,datasets:[{data:values,backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}}}});}
}

function dailyRenderCreditTable(date) {
  var cd = dailyFund.credit[date];
  if(!cd) return;
  var channels = Object.keys(cd);
  channels.sort(function(a,b){return (cd[b].used/cd[b].total)-(cd[a].used/cd[a].total);});
  var rows = '', totalTotal=0, totalUsed=0, totalRemaining=0;
  for(var i=0; i<channels.length; i++){
    var ch=channels[i], d=cd[ch];
    var usage = d.total>0 ? (d.used/d.total*100) : 0;
    totalTotal+=d.total;totalUsed+=d.used;totalRemaining+=d.remaining;
    var barColor = usage>=90 ? '#e74c3c' : (usage>=80 ? '#f39c12' : '#27ae60');
    rows += '<tr><td style="text-align:left;font-weight:600;">'+ch+'</td><td>'+fmtNum(d.total,1)+'</td><td>'+fmtNum(d.used,1)+'</td><td>'+fmtNum(d.remaining,1)+'</td><td>'+(usage>=80?'<span class="kpi-up">':'')+fmtNum(usage,1)+'%'+(usage>=80?'</span>':'')+'</td><td><div class="progress-wrap"><div class="progress-fill" style="width:'+usage.toFixed(0)+'%;background:'+barColor+';"></div></div></td></tr>';
  }
  var totalUsage = totalTotal>0 ? (totalUsed/totalTotal*100) : 0;
  var totalBarColor = totalUsage>=90 ? '#e74c3c' : (totalUsage>=80 ? '#f39c12' : '#27ae60');
  rows += '<tr style="font-weight:700;background:#eaf0fa;"><td>合计</td><td>'+fmtNum(totalTotal,1)+'</td><td>'+fmtNum(totalUsed,1)+'</td><td>'+fmtNum(totalRemaining,1)+'</td><td>'+fmtNum(totalUsage,1)+'%</td><td><div class="progress-wrap"><div class="progress-fill" style="width:'+totalUsage.toFixed(0)+'%;background:'+totalBarColor+';"></div></div></td></tr>';
  document.getElementById('dailyCreditTable').innerHTML = '<table class="data-table"><tr><th>授信渠道</th><th>总额度</th><th>已使用</th><th>剩余</th><th>使用率</th><th style="width:100px;"></th></tr>'+rows+'</table>';
}

function dailyRenderPlanTimeline(date) {
  var plans = dailyFund.plan[date];
  if(!plans || plans.length===0) return;
  var rows = '', totalWithdrawal = 0;
  for(var i=0; i<plans.length; i++){
    var p = plans[i];
    var amt = p["提/还款金额"] || 0;
    if(amt > 0) totalWithdrawal += amt;
    var dd = p["预计提款日期"] || '';
    var rd = p["预计还款日期"] || '';
    var proj = p["项目（亿元）"] || '';
    var amtDisplay = fmtNum(amt,1) + '亿';
    var barColor = proj.indexOf('还款') >= 0 ? '#27ae60' : '#3498db';
    var timeline = '<span class="gantt-bar" style="background:'+barColor+';">'+(dd.substr(5)||'')+'~'+(rd.substr(5)||'')+'</span>';
    rows += '<tr><td style="text-align:left;font-weight:600;">'+proj+'</td><td style="font-weight:700;color:'+(amt>=0?'#3498db':'#27ae60')+';">'+amtDisplay+'</td><td>'+timeline+'</td></tr>';
  }
  rows += '<tr style="font-weight:700;background:#eaf0fa;"><td>合计净提款</td><td style="color:#3498db;font-weight:700;">+'+fmtNum(totalWithdrawal,1)+'亿</td><td></td></tr>';
  document.getElementById('dailyPlanTimeline').innerHTML = '<table class="data-table"><tr><th>项目</th><th>金额</th><th>时间轴</th></tr>'+rows+'</table>';
}

// ========================
// 财务模块交互
// ========================
function toggleFinDrill(type) {
  var isRev = (type === 'netRevenue');
  var drillId = isRev ? 'mFinDrillRev' : 'mFinDrillNp';
  // 切换趋势图显示
  var revCard = document.getElementById('card-L-01-003');
  var npCard = document.getElementById('card-L-01-004');
  if(revCard && npCard) {
    revCard.style.display = isRev ? 'block' : 'none';
    npCard.style.display = isRev ? 'none' : 'block';
  }
  var otherId = isRev ? 'mFinDrillNp' : 'mFinDrillRev';
  var el = document.getElementById(drillId);
  var otherEl = document.getElementById(otherId);
  
  if(otherEl && otherEl.style.display !== 'none') {
    otherEl.style.display = 'none';
    otherEl.innerHTML = '';
  }
  
  if(el && el.style.display !== 'none') {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  
  if(!el) {
    el = document.createElement('div');
    el.id = drillId;
    el.className = 'card drill-down show';
    el.style.marginBottom = '16px';
    var grid = document.querySelector('#sec-monthly-finance .card-grid-3');
    if(grid) grid.parentElement.insertBefore(el, grid.nextSibling);
  }
  el.style.display = 'block';
  
  var title = isRev ? '营业净收入' : '净利润';
  var color = isRev ? '#3498db' : '#9b59b6';
  var companies = ['期货','投资','国贸','资本','境外','调整'];
  var rows = '';
  for(var i=0; i<companies.length; i++){
    var c = companies[i];
    var bg = i%2===0 ? '#fff' : '#f0f4f8';
    var isSel = (selectedMFinCompany === c);
    var rowStyle = isSel ? 'background:#FFF9E6 !important; outline:2px solid #F0C040;' : 'background:'+bg+';';
    rows += '<tr style="'+rowStyle+'" onclick="mFinFilterCompany(\''+c+'\')">'+
      '<td style="font-weight:600;text-align:left;cursor:pointer;">'+c+'</td>'+
      '<td>'+fmtNum(200+Math.random()*800,2)+'</td>'+
      '<td class="'+(Math.random()>0.5?'kpi-up':'kpi-down')+'">'+(Math.random()>0.5?'+':'')+fmtNum(Math.random()*20,2)+'%</td>'+
      '<td>'+fmtNum(10+Math.random()*30,1)+'%</td>'+
      '<td>'+fmtNum(2000+Math.random()*8000,2)+'</td>'+
      '<td class="'+(Math.random()>0.5?'kpi-up':'kpi-down')+'">'+(Math.random()>0.5?'+':'')+fmtNum(Math.random()*30,2)+'%</td>'+
      '<td>'+fmtNum(10+Math.random()*30,1)+'%</td>'+
    '</tr>';
  }
  rows += '<tr style="font-weight:700;background:'+color+';color:#fff;"><td>合计</td><td>1,234.56</td><td>+8.8%</td><td>100%</td><td>12,345.67</td><td>+15.2%</td><td>100%</td></tr>';
  
  el.innerHTML = '<div style="padding:16px;">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+
    '<div style="font-size:14px;font-weight:600;color:'+color+';">▼ '+title+'公司明细</div>'+
    '<span class="id-badge">D-01-001 | T-01</span></div>'+
    '<table class="data-table"><tr><th>公司</th><th>本期(万元)</th><th>环比</th><th>占比</th><th>本年累计</th><th>同比</th><th>累计占比</th></tr>'+rows+'</table>'+
  '</div>';
}

function mFinFilterCompany(co) {
  if(co && selectedMFinCompany === co) { selectedMFinCompany = null; }
  else { selectedMFinCompany = co; }
  // 重新渲染钻取表以显示选中状态
  var isRev = (document.getElementById('mFinDrillRev').style.display !== 'none');
  var drillId = isRev ? 'mFinDrillRev' : 'mFinDrillNp';
  var el = document.getElementById(drillId);
  if(el && el.style.display !== 'none') { el.style.display = 'none'; el.innerHTML = ''; }
  toggleFinDrill(isRev ? 'netRevenue' : 'netProfit');
  // 更新趋势图标题
  var title = isRev ? '营业净收入' : '净利润';
  if(selectedMFinCompany) title += '-' + selectedMFinCompany;
  // 重新渲染趋势图
  renderTrendChart(isRev ? 'mTrendRev' : 'mTrendNp', title, isRev ? '#3498db' : '#9b59b6');
}

function selectIncomeCat(cat) {
  if(selectedMIncomeCat === cat) {
    selectedMIncomeCat = null; selectedMIncomeItem = null;
    document.querySelectorAll('.income-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');});
    document.getElementById('mIncomeDetailDrill').style.display = 'none';
    document.getElementById('mIncomeDetailDrill').innerHTML = '';
    renderTrendChart('mTrendCat', '分类营业收入', '#3498db');
    return;
  }
  document.querySelectorAll('.income-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');});
  var row = document.querySelector('.income-cat-row[data-cat="'+cat+'"]');
  if(row) row.classList.add('cat-row-selected');
  selectedMIncomeCat = cat; selectedMIncomeItem = null; selectedMIncomeMode = 'cur';
  renderTrendChart('mTrendCat', '分类营业收入 — '+cat, '#3498db');
  
  var drill = document.getElementById('mIncomeDetailDrill');
  drill.style.display = 'block';
  drill.innerHTML = '<div style="padding:16px;" class="card">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+
    '<div style="font-size:14px;font-weight:600;color:#3498db;">本期构成-'+cat+'</div>'+
    '<span class="id-badge">D-02-001 | T-02</span></div>'+
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">'+
    '<span style="font-size:11px;color:#7f8c8d;">查看方式：</span>'+
    '<select onchange="mIncomeDrillViewMode=this.value;renderIncomeDrill(\''+cat+'\')" style="padding:4px 8px;border:1px solid #d0d5dd;border-radius:6px;font-size:12px;">'+
    '<option value="item">按收入项目分类</option><option value="company">按公司分类</option></select></div>'+
    '<div id="incomeDrillContent"></div></div>';
  renderIncomeDrill(cat);
  renderIncomePie();
}

function toggleCoIncomeDrill(co) {
  if(!coIncomeDrillExpanded[co]) { coIncomeDrillExpanded[co] = false; }
  coIncomeDrillExpanded[co] = !coIncomeDrillExpanded[co];
  if(selectedMIncomeCat) { renderIncomeDrill(selectedMIncomeCat); }
}

function renderIncomeDrill(cat) {
  var content = document.getElementById('incomeDrillContent');
  if(!content) return;
  var items = {
    '经纪业务': ['留存手续费净收入','交返净收入','保证金利息净收入'],
    '其他业务': ['自有资金利息净收入','金融资产损益','其他收入'],
    '期现业务': ['基差贸易','投资管理'],
    '场外业务': ['商品场外','权益指数','权益个股'],
    '场内业务': ['场内做市','场内交易'],
    '合并抵销': ['内部收入抵销']
  };
  var companies = ['期货','投资','国贸','资本'];
  
  if (mIncomeDrillViewMode === 'company') {
    var items = {
      '经纪业务': ['留存手续费净收入', '交返净收入', '保证金利息净收入'],
      '其他业务': ['自有资金利息净收入', '金融资产损益', '其他收入'],
      '期现业务': ['基差贸易', '投资管理'],
      '场外业务': ['商品场外', '权益指数', '权益个股'],
      '场内业务': ['场内做市', '场内交易'],
      '合并抵销': ['内部收入抵销']
    };
    var itemList = items[cat] || ['项目A', '项目B'];
    var rows = '';
    for (var i = 0; i < companies.length; i++) {
      var co = companies[i];
      var val = 100 + Math.random() * 400;
      var isExpanded = coIncomeDrillExpanded[co];
      rows += '<tr style="cursor:pointer;" onclick="toggleCoIncomeDrill(\'' + co + '\')"><td style="text-align:left;font-weight:600;">' + co + (isExpanded ? ' ▲' : ' ▼') + '</td><td>' + fmtNum(val, 2) + '</td><td class="' + (Math.random() > 0.5 ? 'kpi-up' : 'kpi-down') + '">' + (Math.random() > 0.5 ? '+' : '') + fmtNum(Math.random() * 15, 2) + '%</td><td>' + fmtNum(10 + Math.random() * 40, 1) + '%</td></tr>';
      if (isExpanded) {
        for (var j = 0; j < itemList.length; j++) {
          var iv = 20 + Math.random() * 100;
          rows += '<tr style="background:#f8f9fb;"><td style="text-align:left;padding-left:24px;color:#6B7280;">├ ' + itemList[j] + '</td><td>' + fmtNum(iv, 2) + '</td><td class="' + (Math.random() > 0.5 ? 'kpi-up' : 'kpi-down') + '">' + (Math.random() > 0.5 ? '+' : '') + fmtNum(Math.random() * 10, 2) + '%</td><td>' + fmtNum(5 + Math.random() * 20, 1) + '%</td></tr>';
        }
      }
    }
    rows += '<tr style="font-weight:700;background:#f0f4f8;"><td>合计</td><td>580.23</td><td>+5.2%</td><td>100%</td></tr>';
    content.innerHTML = '<table class="data-table"><tr><th>公司</th><th>本期(万元)</th><th>环比</th><th>占比</th></tr>' + rows + '</table>';
  } else {
    var itemList = items[cat] || ['项目A','项目B','项目C'];
    var rows = '';
    for(var i=0; i<itemList.length; i++){
      var val = 100 + Math.random()*500;
      rows += '<tr><td style="text-align:left;font-weight:600;">'+itemList[i]+'</td><td>'+fmtNum(val,2)+'</td><td class="'+(Math.random()>0.5?'kpi-up':'kpi-down')+'">'+(Math.random()>0.5?'+':'')+fmtNum(Math.random()*15,2)+'%</td><td>'+fmtNum(10+Math.random()*40,1)+'%</td></tr>';
    }
    rows += '<tr style="font-weight:700;background:#f0f4f8;"><td>合计</td><td>580.23</td><td>+5.2%</td><td>100%</td></tr>';
    content.innerHTML = '<table class="data-table"><tr><th>收入项目</th><th>本期(万元)</th><th>环比</th><th>占比</th></tr>'+rows+'</table>';
  }
}

var mExpenseDrillViewMode = 'project'; // 'project' | 'company'

function selectExpenseCat(cat) {
  if(selectedMExpenseCat === cat) {
    selectedMExpenseCat = null; selectedMExpenseItem = null;
    document.querySelectorAll('.expense-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');});
    document.getElementById('mExpenseDetailDrill').style.display = 'none';
    document.getElementById('mExpenseDetailDrill').innerHTML = '';
    renderTrendChart('mTrendExpense', '业管费', '#e74c3c');
    return;
  }
  document.querySelectorAll('.expense-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');});
  var row = document.querySelector('.expense-cat-row[data-cat="'+cat+'"]');
  if(row) row.classList.add('cat-row-selected');
  selectedMExpenseCat = cat; selectedMExpenseItem = null; selectedMExpenseMode = 'cur';
  renderTrendChart('mTrendExpense', '业管费 — '+cat, '#e74c3c');
  
  var drill = document.getElementById('mExpenseDetailDrill');
  drill.style.display = 'block';
  drill.innerHTML = '<div style="padding:16px;" class="card">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+
    '<div style="font-size:14px;font-weight:600;color:#e74c3c;">本期构成-'+cat+'</div>'+
    '<span class="id-badge">D-03-001 | T-03</span></div>'+
    '<div><span style="font-size:12px;color:#6B7280;margin-right:6px;">视图模式：</span>'+
    '<select id="expenseDrillViewMode" onchange="mExpenseDrillViewMode=this.value;renderExpenseDrill(selectedMExpenseCat);" style="font-size:12px;padding:4px 8px;border:1px solid #e0e5eb;border-radius:4px;">'+
    '<option value="project">按支出项目分类</option>'+
    '<option value="company">按公司分类</option>'+
    '</select></div></div>'+
    '<div id="expenseDrillContent"></div></div>';
  document.getElementById('expenseDrillViewMode').value = mExpenseDrillViewMode;
  renderExpenseDrill(cat);
  renderExpensePie();
}

function toggleCoExpenseDrill(co) {
  if(!coExpenseDrillExpanded[co]) { coExpenseDrillExpanded[co] = false; }
  coExpenseDrillExpanded[co] = !coExpenseDrillExpanded[co];
  if(selectedMExpenseCat) { renderExpenseDrill(selectedMExpenseCat); }
}

function renderExpenseDrill(cat) {
  var content = document.getElementById('expenseDrillContent');
  if(!content) return;
  var items = {
    '业务费用': ['手续费支出','佣金支出','业务宣传费'],
    '管理费用': ['办公费','差旅费','会议费']
  };
  var companies = ['期货','投资','国贸','资本'];
  
  if(mExpenseDrillViewMode === 'company') {
    var items = {
      '业务费用': ['手续费支出','佣金支出','业务宣传费'],
      '管理费用': ['办公费','差旅费','会议费']
    };
    var itemList = items[cat] || ['项目A','项目B'];
    var rows = '';
    for(var i=0; i<companies.length; i++){
      var co = companies[i];
      var val = 50 + Math.random()*200;
      var isExpanded = coExpenseDrillExpanded[co];
      rows += '<tr style="cursor:pointer;" onclick="toggleCoExpenseDrill(\''+co+'\')"><td style="text-align:left;font-weight:600;">'+co+(isExpanded?' ▲':' ▼')+'</td><td>'+fmtNum(val,2)+'</td><td class="'+(Math.random()>0.5?'kpi-up':'kpi-down')+'">'+(Math.random()>0.5?'+':'')+fmtNum(Math.random()*10,2)+'%</td><td>'+fmtNum(10+Math.random()*40,1)+'%</td></tr>';
      if(isExpanded) {
        for(var j=0; j<itemList.length; j++){
          var iv = 10 + Math.random()*50;
          rows += '<tr style="background:#f8f9fb;"><td style="text-align:left;padding-left:24px;color:#6B7280;">├ '+itemList[j]+'</td><td>'+fmtNum(iv,2)+'</td><td class="'+(Math.random()>0.5?'kpi-up':'kpi-down')+'">'+(Math.random()>0.5?'+':'')+fmtNum(Math.random()*5,2)+'%</td><td>'+fmtNum(5+Math.random()*20,1)+'%</td></tr>';
        }
      }
    }
    rows += '<tr style="font-weight:700;background:#f0f4f8;"><td>合计</td><td>456.78</td><td>+3.2%</td><td>100%</td></tr>';
    content.innerHTML = '<table class="data-table"><tr><th>公司</th><th>本期(万元)</th><th>环比</th><th>占比</th></tr>'+rows+'</table>';
  } else {
    var itemList = items[cat] || ['项目A','项目B'];
    var rows = '';
    for(var i=0; i<itemList.length; i++){
      var val = 50 + Math.random()*300;
      rows += '<tr><td style="text-align:left;font-weight:600;">'+itemList[i]+'</td><td>'+fmtNum(val,2)+'</td><td class="'+(Math.random()>0.5?'kpi-up':'kpi-down')+'">'+(Math.random()>0.5?'+':'')+fmtNum(Math.random()*10,2)+'%</td><td>'+fmtNum(10+Math.random()*40,1)+'%</td></tr>';
    }
    rows += '<tr style="font-weight:700;background:#f0f4f8;"><td>合计</td><td>456.78</td><td>+3.2%</td><td>100%</td></tr>';
    content.innerHTML = '<table class="data-table"><tr><th>支出项目</th><th>本期(万元)</th><th>环比</th><th>占比</th></tr>'+rows+'</table>';
  }
}

// ========================
// 成交模块交互
// ========================
function switchMTradeMetric(m) {
  activeTradeMetric = m;
  var labels = {volume:'成交量',amount:'成交额',openInterest:'持仓量'};
  var units = {volume:'万手',amount:'亿元',openInterest:'万手'};
  var colors = {volume:'#3498db',amount:'#27ae60',openInterest:'#e67e22'};
  
  document.getElementById('btnVol').style.background = m==='volume' ? '#3498db' : '#f0f4f8';
  document.getElementById('btnVol').style.color = m==='volume' ? '#fff' : '#6B7280';
  document.getElementById('btnAmt').style.background = m==='amount' ? '#27ae60' : '#f0f4f8';
  document.getElementById('btnAmt').style.color = m==='amount' ? '#fff' : '#6B7280';
  document.getElementById('btnOi').style.background = m==='openInterest' ? '#e67e22' : '#f0f4f8';
  document.getElementById('btnOi').style.color = m==='openInterest' ? '#fff' : '#6B7280';
  
  var kpiHtml = '<div style="font-size:12px;color:#7f8c8d;margin-bottom:4px;">'+labels[m]+'（'+units[m]+'）</div>'+
    '<div class="kpi-value" style="color:'+colors[m]+';">2,345.67</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">'+
    '<div style="background:rgba(0,0,0,0.015);padding:6px 8px;border-radius:4px;"><div style="font-size:11px;color:#7f8c8d;">环比</div><div class="kpi-up" style="font-size:13px;font-weight:600;">+3.2%</div></div>'+
    '<div style="padding:6px 8px;border-radius:4px;"><div style="font-size:11px;color:#7f8c8d;">市占率</div><div style="font-size:13px;font-weight:600;">2.45%</div></div>'+
    '<div style="padding:6px 8px;border-radius:4px;"><div style="font-size:11px;color:#7f8c8d;">本年累计</div><div style="font-size:13px;font-weight:600;">23,456.7</div></div>'+
    '<div style="background:rgba(0,0,0,0.015);padding:6px 8px;border-radius:4px;"><div style="font-size:11px;color:#7f8c8d;">累计市占率</div><div style="font-size:13px;font-weight:600;">2.38%</div></div>'+
    '</div>';
  document.getElementById('tradeKpiContent').innerHTML = kpiHtml;
  
  var label = labels[m]+'（'+units[m]+'）';
  document.getElementById('mExchTableLabel').textContent = label;
  document.getElementById('mPieLabel').textContent = label;
  
  renderTradeCharts();
}

function selectExchange(exch) {
  if(exch === '合计' || selectedMExchange === exch) { selectedMExchange = null; }
  else { selectedMExchange = exch; }
  
  document.querySelectorAll('#mExchangeTable tr').forEach(function(r){r.classList.remove('exch-row-selected');});
  if(selectedMExchange) {
    var rows = document.querySelectorAll('#mExchangeTable tr');
    for(var i=0; i<rows.length; i++){
      if(rows[i].cells[0] && rows[i].cells[0].textContent.trim() === selectedMExchange){
        rows[i].classList.add('exch-row-selected'); break;
      }
    }
  }
  
  var drill = document.getElementById('mExchangeDetailDrill');
  if(selectedMExchange) {
    drill.style.display = 'block';
    drill.innerHTML = '<div style="padding:16px;" class="card">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+
      '<div style="font-size:14px;font-weight:600;color:#1a3a5c;">'+selectedMExchange+' · 品种明细</div>'+
      '<span class="id-badge">D-04-001 | T-04+T-05</span></div>'+
      '<div id="exchangeDrillContent"></div></div>';
    renderExchangeDrill(selectedMExchange);
  } else {
    drill.style.display = 'none';
    drill.innerHTML = '';
  }
  renderExchangePie();
}



function toggleMktDrill() {
  var btn = document.querySelector('#exchangeDrillContent + div span');
  if(!btn) return;
  mExchangeDrillShowAllCo = !mExchangeDrillShowAllCo;
  if(selectedMExchange) renderExchangeDrill(selectedMExchange);
  btn.textContent = mExchangeDrillShowAllCo ? '收起 ▲' : '更多 ▼';
}

function renderExchangeDrill(exch) {
  var content = document.getElementById('exchangeDrillContent');
  if(!content) return;
  var varieties = ['螺纹钢','铁矿石','豆粕','原油','沪深300','中证500','黄金','铜','白糖','棉花'];
  var count = mExchangeDrillShowAllCo ? varieties.length : 5;
  var rows = '';
  for(var i=0; i<count; i++){
    var name = varieties[i];
    var val = 100 + Math.random()*500;
    rows += '<tr><td style="text-align:center;">'+(i+1)+'</td><td style="text-align:left;font-weight:600;">'+name+'</td><td>'+fmtNum(val,2)+'</td><td>'+fmtNum(val/2000*100,2)+'%</td><td>'+fmtNum(val*10,2)+'</td><td>'+fmtNum(val*10/20000*100,2)+'%</td></tr>';
  }
  content.innerHTML = '<table class="data-table"><tr><th>#</th><th>品种</th><th>本期</th><th>市占率</th><th>本年累计</th><th>累计市占率</th></tr>'+rows+'</table>'+
    '<div style="margin-top:8px;text-align:right;"><span style="font-size:12px;color:#3498db;cursor:pointer;" onclick="toggleMktDrill()">'+(mExchangeDrillShowAllCo?'收起 ▲':'更多 ▼')+'</span></div>';
}

// ========================
// 图表渲染
// ========================
function renderIncomePie() {
  var labels = INCOME_CATS;
  var values = [580.23,234.56,185.67,123.45,80.19,30.46];
  var colors = labels.map(function(c){return CAT_COLORS[c]||'#95a5a6';});
  
  var pieClick = function(evt, elements) {
    if(elements.length === 0) { selectedMIncomeCat = null; selectedMIncomeMode = null; document.querySelectorAll('.income-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');}); document.getElementById('mIncomeDetailDrill').style.display='none'; document.getElementById('mIncomeDetailDrill').innerHTML=''; return; }
    var idx = elements[0].index;
    var cat = labels[idx];
    if(selectedMIncomeCat === cat) { selectedMIncomeCat = null; selectedMIncomeMode = null; document.querySelectorAll('.income-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');}); document.getElementById('mIncomeDetailDrill').style.display='none'; document.getElementById('mIncomeDetailDrill').innerHTML=''; }
    else { selectIncomeCat(cat); }
  };
  
  var ctx1 = document.getElementById('mIncomePieCur');
  if(ctx1){if(window.mIncomePieCurChart)window.mIncomePieCurChart.destroy();window.mIncomePieCurChart=new Chart(ctx1,{type:'doughnut',data:{labels:labels,datasets:[{data:values,backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},onClick:pieClick}});}
  
  var ctx2 = document.getElementById('mIncomePieYtd');
  if(ctx2){if(window.mIncomePieYtdChart)window.mIncomePieYtdChart.destroy();window.mIncomePieYtdChart=new Chart(ctx2,{type:'doughnut',data:{labels:labels,datasets:[{data:values.map(function(v){return v*10;}),backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},onClick:pieClick}});}
}

function renderExpensePie() {
  var labels = ['业务费用','管理费用'];
  var values = [691.34,139.26];
  var colors = ['#e74c3c','#3498db'];
  
  var pieClick = function(evt, elements) {
    if(elements.length === 0) { selectedMExpenseCat = null; selectedMExpenseMode = null; document.querySelectorAll('.expense-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');}); document.getElementById('mExpenseDetailDrill').style.display='none'; document.getElementById('mExpenseDetailDrill').innerHTML=''; return; }
    var idx = elements[0].index;
    var cat = labels[idx];
    if(selectedMExpenseCat === cat) { selectedMExpenseCat = null; selectedMExpenseMode = null; document.querySelectorAll('.expense-cat-row').forEach(function(r){r.classList.remove('cat-row-selected');}); document.getElementById('mExpenseDetailDrill').style.display='none'; document.getElementById('mExpenseDetailDrill').innerHTML=''; }
    else { selectExpenseCat(cat); }
  };
  
  var ctx1 = document.getElementById('mExpensePieCur');
  if(ctx1){if(window.mExpensePieCurChart)window.mExpensePieCurChart.destroy();window.mExpensePieCurChart=new Chart(ctx1,{type:'doughnut',data:{labels:labels,datasets:[{data:values,backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},onClick:pieClick}});}
  
  var ctx2 = document.getElementById('mExpensePieYtd');
  if(ctx2){if(window.mExpensePieYtdChart)window.mExpensePieYtdChart.destroy();window.mExpensePieYtdChart=new Chart(ctx2,{type:'doughnut',data:{labels:labels,datasets:[{data:values.map(function(v){return v*10;}),backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},onClick:pieClick}});}
}

function renderExchangePie() {
  var labels = ['上期所','中金所','大商所','广期所','能源中心','郑商所'];
  var values = [890.12,184.00,567.89,123.45,234.56,345.67];
  var colors = ['#3498db','#e74c3c','#2ecc71','#9b59b6','#f39c12','#1abc9c'];
  
  var pieClick = function(evt, elements) {
    if(elements.length === 0) { selectedMExchange = null; document.querySelectorAll('#mExchangeTable tr').forEach(function(r){r.classList.remove('exch-row-selected');}); document.getElementById('mExchangeDetailDrill').style.display='none'; document.getElementById('mExchangeDetailDrill').innerHTML=''; return; }
    var idx = elements[0].index;
    var exch = labels[idx];
    if(selectedMExchange === exch) { selectedMExchange = null; document.querySelectorAll('#mExchangeTable tr').forEach(function(r){r.classList.remove('exch-row-selected');}); document.getElementById('mExchangeDetailDrill').style.display='none'; document.getElementById('mExchangeDetailDrill').innerHTML=''; }
    else { selectExchange(exch); }
  };
  
  var ctx1 = document.getElementById('mTradePieCur');
  if(ctx1){if(window.mTradePieCurChart)window.mTradePieCurChart.destroy();window.mTradePieCurChart=new Chart(ctx1,{type:'doughnut',data:{labels:labels,datasets:[{data:values,backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},onClick:pieClick}});}
  
  var ctx2 = document.getElementById('mTradePieYtd');
  if(ctx2){if(window.mTradePieYtdChart)window.mTradePieYtdChart.destroy();window.mTradePieYtdChart=new Chart(ctx2,{type:'doughnut',data:{labels:labels,datasets:[{data:values.map(function(v){return v*10;}),backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},onClick:pieClick}});}
}

function renderTrendChart(canvasId, label, color, isSingleLine) {
  color = color || '#3498db';
  var ctx = document.getElementById(canvasId);
  if(!ctx) return;
  if(Chart.getChart(canvasId)) Chart.getChart(canvasId).destroy();
  var months = ['2025/06','2025/07','2025/08','2025/09','2025/10','2025/11','2025/12','2026/01','2026/02','2026/03','2026/04','2026/05'];
  var values = months.map(function(){return 800+Math.random()*800;});
  
  if(isSingleLine) {
    // 单折线图（市占率趋势）
    new Chart(ctx,{type:'line',data:{labels:months,datasets:[
      {label:label,data:values.map(function(){return (1+Math.random()*2).toFixed(2);}),borderColor:color,backgroundColor:hexToRgba(color,0.1),borderWidth:2,pointBackgroundColor:color,pointRadius:4,fill:true,tension:0.3}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{position:'left',grid:{color:'rgba(0,0,0,0.05)'},ticks:{callback:function(v){return v+'%';}}},x:{grid:{display:false}}}});
  } else {
    // 双轴组合图（默认）
    var deltas = months.map(function(m,i){if(i===0)return null;return values[i]-values[i-1];});
    new Chart(ctx,{type:'bar',data:{labels:months,datasets:[
      {label:label,data:values,type:'line',borderColor:color,backgroundColor:hexToRgba(color,0.1),borderWidth:2,pointBackgroundColor:color,pointRadius:3,fill:true,tension:0.3,yAxisID:'y'},
      {label:'环比变动',data:deltas,backgroundColor:deltas.map(function(m){return m===null?'transparent':m>=0?'rgba(39,174,96,0.5)':'rgba(231,76,60,0.5)';}),borderWidth:0,borderRadius:3,yAxisID:'y1'}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{position:'left',grid:{color:'rgba(0,0,0,0.05)'},ticks:{callback:function(v){return fmtNum(v,0)+'万';}}},y1:{position:'right',grid:{display:false},ticks:{callback:function(v){return fmtNum(v,0)+'万';}}}}}});
  }
}

function renderTradeCharts() {
  var mColors = {volume:'#3498db',amount:'#27ae60',openInterest:'#e67e22'};
  var mLabels = {volume:'成交量',amount:'成交额',openInterest:'持仓量'};
  renderTrendChart('mTrendTrade', mLabels[activeTradeMetric]+'（万手）', mColors[activeTradeMetric]);
  renderTrendChart('mTrendShare', '市占率（%）', '#27ae60', true); // 单折线图
}

function renderAll() {
  try {
    var allCharts = ['mIncomePieCurChart','mIncomePieYtdChart','mExpensePieCurChart','mExpensePieYtdChart','mTradePieCurChart','mTradePieYtdChart','dailyInvestChart','dailySourceChart'];
    allCharts.forEach(function(n){if(window[n]){window[n].destroy();window[n]=null;}});
    var chartIds = ['mTrendRev','mTrendNp','mTrendCat','mTrendTrade','mTrendShare','mTrendExpense','mIncomePieCur','mIncomePieYtd','mExpensePieCur','mExpensePieYtd','mTradePieCur','mTradePieYtd','dailyInvestPie','dailySourcePie'];
    chartIds.forEach(function(id){var c=Chart.getChart(id);if(c)c.destroy();});
    
    if(currentModule === 'flash') {
      dailyRenderFund();
    } else if(currentModule === 'monthly') {
      if(currentSubTab === 'finance') {
        renderTrendChart('mTrendRev','营业净收入','#3498db');
        renderTrendChart('mTrendNp','净利润','#9b59b6');
        renderTrendChart('mTrendCat','分类营业收入','#3498db');
        renderTrendChart('mTrendExpense','业管费','#e74c3c');
        renderIncomePie();
        renderExpensePie();
      } else if(currentSubTab === 'trading') {
        renderTradeCharts();
        renderExchangePie();
      }
    }
  } catch(e) { console.error('renderAll error:', e); }
}

// ========================
// 初始化
// ========================
document.addEventListener('DOMContentLoaded', function(){
  currentPeriod = PERIODS[PERIODS.length-1];
  document.getElementById('periodSelect').value = currentPeriod;
  updatePeriodDisplay();
  dailySyncDateInput();
  switchModule('flash');
});
