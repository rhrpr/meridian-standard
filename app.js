
const clauses = window.MERIDIAN_CLAUSES || [];
const profiles = window.MERIDIAN_PROFILES || {};
const practices = window.MERIDIAN_PRACTICES || [];
const aiLevels = [
  ['A0 — Observe','Read and summarise approved information. No side effects.','No write tools or privileged actions; verify material conclusions.'],
  ['A1 — Propose','Draft code, designs, decisions or actions.','Human approval before material effect.'],
  ['A2 — Sandbox','Execute inside isolated development or test environments.','Bounded credentials, approved data, full logs, no production authority.'],
  ['A3 — Reversible production','Perform predefined low-blast-radius production actions.','Runtime policy, rollback, spend/privilege ceilings and health checks.'],
  ['A4 — Bounded autonomy','Pursue a defined operational objective inside a constrained domain.','Independent evals, accountable steward, kill switch, exception handling and authority revalidation.']
];

document.querySelector('#autonomy').innerHTML = aiLevels.map(x => `<div class="auto-row"><strong>${x[0]}</strong><span>${x[1]}</span><span>${x[2]}</span></div>`).join('');

const domainFilter = document.querySelector('#domainFilter');
[...new Set(clauses.map(c=>c.domain))].sort().forEach(d => { const o=document.createElement('option'); o.value=d; o.textContent=d; domainFilter.appendChild(o); });
const search = document.querySelector('#clauseSearch');
const grid = document.querySelector('#clauseGrid');
const count = document.querySelector('#clauseCount');
function renderClauses(){
  const q=search.value.trim().toLowerCase(), d=domainFilter.value;
  const filtered=clauses.filter(c => (!d||c.domain===d) && (!q||`${c.id} ${c.domain} ${c.title} ${c.text}`.toLowerCase().includes(q)));
  count.textContent=`Showing ${filtered.length} of ${clauses.length} clauses`;
  grid.innerHTML=filtered.map(c=>`<article class="clause"><div class="clause-top"><span class="clause-id">${c.id}</span><span class="clause-domain">${c.domain}</span></div><h3>${c.title}</h3><p>${c.text}</p></article>`).join('');
}
search.addEventListener('input',renderClauses); domainFilter.addEventListener('change',renderClauses); renderClauses();

document.querySelector('#practiceGrid').innerHTML=practices.map(p=>`<article class="practice"><div class="trigger">${p.trigger}</div><h3>${p.name}</h3><p>${p.how}</p><p class="output"><b>Leaves behind:</b> ${p.output}</p></article>`).join('');

const output = document.querySelector('#profileOutput');
function renderProfiles(){
  const selected=['BASE', ...[...document.querySelectorAll('.checks input:checked')].map(x=>x.dataset.profile)];
  output.innerHTML=selected.map(k=>{const p=profiles[k]; return `<div class="profile-chip"><b>${k}</b><p>${p.name}: ${p.description}</p><small>${p.sources.join(' · ')}</small></div>`}).join('');
}
document.querySelectorAll('.checks input').forEach(x=>x.addEventListener('change',renderProfiles)); renderProfiles();
