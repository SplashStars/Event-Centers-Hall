(function(){
var _ec=[];
try{
  _ec=_d.filter(Array.isArray).map(function(v){
    return{id:v[0],name:v[1],continent:v[2],country:v[3],state:v[4],
      city:v[5],address:v[6],phone:v[7],email:v[8],description:v[9],
      tags:v.slice(10).map(function(i){return TAGS[i];})};
  });
}catch(ex){}
var _cf={search:"",country:"",state:"",city:"",continent:""};
var _cv="grid";
function _esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function _gfd(){return _ec.filter(function(e){
  if(_cf.continent&&e.continent!==_cf.continent)return false;
  if(_cf.country&&e.country!==_cf.country)return false;
  if(_cf.state&&e.state!==_cf.state)return false;
  if(_cf.city&&e.city!==_cf.city)return false;
  if(_cf.search){
    var h=(e.name+" "+e.country+" "+(e.state||"")+" "+e.city+" "+e.address+" "+(e.description||"")+" "+(e.tags||[]).join(" ")).toLowerCase();
    if(h.indexOf(_cf.search)<0)return false;
  }
  return true;
});}
function _reset(){_cf={search:_cf.search,country:"",state:"",city:"",continent:""};
  document.getElementById("countryFilter").value="";
  document.getElementById("stateFilter").innerHTML="<option value=\"\">All States/Provinces</option>";
  document.getElementById("cityFilter").innerHTML="<option value=\"\">All Cities</option>";}
function _pState(){var s=document.getElementById("stateFilter");s.innerHTML="<option value=\"\">All States/Provinces</option>";if(!_cf.country)return;
  [...new Set(_ec.filter(function(e){return e.country===_cf.country;}).map(function(e){return e.state;}).filter(Boolean))].sort().forEach(function(st){var o=document.createElement("option");o.value=st;o.textContent=st;s.appendChild(o);});}
function _pCity(){var s=document.getElementById("cityFilter");s.innerHTML="<option value=\"\">All Cities</option>";var pool=_ec;
  if(_cf.country)pool=pool.filter(function(e){return e.country===_cf.country;});
  if(_cf.state)pool=pool.filter(function(e){return e.state===_cf.state;});
  [...new Set(pool.map(function(e){return e.city;}))].sort().forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=c;s.appendChild(o);});}
function _render(){
  var data=_gfd();
  document.getElementById("resultCount").textContent=data.length;
  var title=document.getElementById("resultsTitle");
  if(_cf.city)title.textContent="Event Centers in "+_cf.city;
  else if(_cf.state)title.textContent="Event Centers in "+_cf.state;
  else if(_cf.country)title.textContent="Event Centers in "+_cf.country;
  else if(_cf.continent)title.textContent="Event Centers in "+_cf.continent;
  else if(_cf.search)title.textContent="Results for \""+_cf.search+"\"";
  else title.textContent="All Event Centers Worldwide";
  var grid=document.getElementById("cardsGrid");
  var tbody=document.getElementById("cardsTableBody");
  var noRes=document.getElementById("noResults");
  grid.innerHTML="";tbody.innerHTML="";
  if(data.length===0){noRes.classList.remove("hidden");grid.classList.add("hidden");document.getElementById("cardsTable").classList.add("hidden");return;}
  noRes.classList.add("hidden");
  data.forEach(function(e){
    var card=document.createElement("article");
    card.className="event-card";
    card.setAttribute("role","listitem");
    (function(id){card.onclick=function(){window._openM(id);};})(e.id);
    var tagsHtml=(e.tags||[]).slice(0,3).map(function(t,i){return"<span class=\"tag"+(i%2===1?" alt":"")+"\">"+ _esc(t)+"</span>";}).join("");
    card.innerHTML="<div class=\"card-header\"><div class=\"card-icon\"><i class=\"fa-solid fa-building\"></i></div><div class=\"card-title\"><h3>"+_esc(e.name)+"</h3><p class=\"card-location\"><i class=\"fa-solid fa-location-dot\"></i> "+_esc(e.city)+", "+_esc(e.state||"")+", "+_esc(e.country)+"</p></div></div><p class=\"card-description\">"+_esc(e.description||"")+"</p><div class=\"card-tags\">"+tagsHtml+"</div><div class=\"card-footer\"><span><i class=\"fa-solid fa-phone\"></i> "+_esc(e.phone||"\u2014")+"</span>"+(e.email?"<span><i class=\"fa-solid fa-envelope\"></i> Email</span>":"")+"</div>";
    grid.appendChild(card);
    var row=document.createElement("tr");
    (function(id){row.onclick=function(){window._openM(id);};})(e.id);
    row.innerHTML="<td><strong>"+_esc(e.name)+"</strong></td><td>"+_esc(e.city)+"</td><td>"+_esc(e.country)+"</td><td>"+_esc(e.phone||"")+"</td><td>"+((e.tags||[]).slice(0,2).map(function(t){return"<span class=\"tag\" style=\"font-size:.7rem;\">"+ _esc(t)+"</span>";}).join(" "))+"</td>";
    tbody.appendChild(row);
  });
  if(_cv==="grid"){grid.classList.remove("hidden");grid.style.display="grid";document.getElementById("cardsTable").classList.add("hidden");document.getElementById("cardsTable").style.display="none";}
  else{grid.classList.add("hidden");grid.style.display="none";document.getElementById("cardsTable").classList.remove("hidden");document.getElementById("cardsTable").style.display="block";}}
window.filterByContinent=function(c){_reset();_cf.continent=c;_render();};
window.filterByCountry=function(c){_reset();_cf.country=c;document.getElementById("countryFilter").value=c;_pState();_pCity();_render();};
window.filterByState=function(co,st){_reset();_cf.country=co;_cf.state=st;document.getElementById("countryFilter").value=co;_pState();document.getElementById("stateFilter").value=st;_pCity();_render();};
window.filterByCity=function(co,st,ci){_reset();_cf.country=co;_cf.state=st;_cf.city=ci;document.getElementById("countryFilter").value=co;_pState();document.getElementById("stateFilter").value=st;_pCity();document.getElementById("cityFilter").value=ci;_render();};
window.toggleTree=function(btn){btn.classList.toggle("open");var ch=btn.nextElementSibling;if(ch)ch.classList.toggle("open");};
window.closeModal=function(){var o=document.getElementById("modalOverlay");if(o){o.classList.add("hidden");o.style.display="none";}};
window.setView=function(v){_cv=v;var gb=document.getElementById("viewGrid");var tb=document.getElementById("viewTable");if(gb)gb.classList.toggle("active",v==="grid");if(tb)tb.classList.toggle("active",v==="table");_render();};
window._openM=function(id){
  var e=_ec.find(function(x){return x.id===id;});if(!e)return;
  document.getElementById("modalTitle").textContent=e.name;
  document.getElementById("modalLocation").innerHTML="<i class=\"fa-solid fa-location-dot\"></i> "+_esc(e.city)+", "+_esc(e.state||"")+", "+_esc(e.country);
  var tagsHtml=(e.tags||[]).map(function(t,i){return"<span class=\"tag"+(i%2===1?" alt":"")+"\">"+_esc(t)+"</span>";}).join("");
  var h="<div class=\"modal-section\"><h4>About</h4><p>"+_esc(e.description||"")+"</p></div>"
    +"<div class=\"modal-section\"><h4>Tags</h4><div class=\"card-tags\" style=\"margin-top:6px;\">"+tagsHtml+"</div></div>"
    +"<div class=\"modal-section\"><h4>Contact</h4>"
    +"<div class=\"contact-row\"><div class=\"ico\"><i class=\"fa-solid fa-location-dot\"></i></div><div class=\"info\"><span>Address</span><p>"+_esc(e.address)+"</p></div></div>"
    +(e.phone?"<div class=\"contact-row\"><div class=\"ico\"><i class=\"fa-solid fa-phone\"></i></div><div class=\"info\"><span>Phone</span><a href=\"tel:"+_esc(e.phone.replace(/\s+/g,""))+"\">"+_esc(e.phone)+"</a></div></div>":"")
    +(e.email?"<div class=\"contact-row\"><div class=\"ico\"><i class=\"fa-solid fa-envelope\"></i></div><div class=\"info\"><span>Email</span><a href=\"mailto:"+_esc(e.email)+"\">"+_esc(e.email)+"</a></div></div>":"")
    +"</div>";
  document.getElementById("modalBody").innerHTML=h;
  var ov=document.getElementById("modalOverlay");
  if(ov){ov.classList.remove("hidden");ov.style.display="flex";}};
document.addEventListener("DOMContentLoaded",function(){
  // Populate country dropdown
  var sc=document.getElementById("countryFilter");
  [...new Set(_ec.map(function(e){return e.country;}))].sort().forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=c;sc.appendChild(o);});
  _render();
  document.getElementById("statVenues").textContent=_ec.length+"+";
  document.getElementById("statCountries").textContent=new Set(_ec.map(function(e){return e.country;})).size;
  document.getElementById("statCities").textContent="29,935+";
  try{var d=new Date();document.getElementById("lastUpdated").textContent=d.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});document.getElementById("currentYear").textContent=d.getFullYear();}catch(ex){}
  document.getElementById("searchInput").addEventListener("input",function(e){_cf.search=e.target.value.toLowerCase();_render();});
  document.getElementById("countryFilter").addEventListener("change",function(e){_cf.country=e.target.value;_cf.state="";_cf.city="";_pState();_pCity();_render();});
  document.getElementById("stateFilter").addEventListener("change",function(e){_cf.state=e.target.value;_cf.city="";_pCity();_render();});
  document.getElementById("cityFilter").addEventListener("change",function(e){_cf.city=e.target.value;_render();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")window.closeModal();});
  // Build tree menu using DOM methods (no inline onclick)
  var tm=document.getElementById("treeMenu");
  if(tm){
    var tree={};
    _ec.forEach(function(e){tree[e.continent]=tree[e.continent]||{};tree[e.continent][e.country]=tree[e.continent][e.country]||{};});
    tm.innerHTML="";
    Object.keys(tree).sort().forEach(function(cont){
      var li=document.createElement("li");li.className="tree-item";
      var btn=document.createElement("button");btn.className="tree-toggle";
      btn.innerHTML="<i class=\"fa-solid fa-chevron-right chev\"></i> <i class=\"fa-solid fa-globe\"></i> "+_esc(cont);
      (function(c){btn.addEventListener("click",function(){window.filterByContinent(c);window.toggleTree(btn);});})(cont);
      var ul=document.createElement("ul");ul.className="tree-children";
      Object.keys(tree[cont]).sort().forEach(function(cou){
        var cli=document.createElement("li");
        var cb=document.createElement("button");cb.className="tree-toggle";cb.textContent=cou;
        (function(co){cb.addEventListener("click",function(ev){ev.stopPropagation();window.filterByCountry(co);window.toggleTree(cb);});})(cou);
        ul.appendChild(cli);cli.appendChild(cb);
      });
      li.appendChild(btn);li.appendChild(ul);tm.appendChild(li);
    });
  }
});
})();