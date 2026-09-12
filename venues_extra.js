(function(){var st=document.createElement("style");st.textContent=".skeleton-card{position:relative;overflow:hidden}.sk-line{height:12px;border-radius:6px;background:#e5e7eb;margin-bottom:10px;position:relative;overflow:hidden}.sk-title{height:16px;width:70%}.skeleton-card::after,.sk-line::after{content:'';position:absolute;top:0;left:-150%;height:100%;width:150%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent);animation:skshimmer 1.3s infinite}@keyframes skshimmer{100%{left:150%}}";document.head.appendChild(st);})();
(function(){
try{
  var __CORRECT_PUB="ca-pub-7215079923944618";
  document.querySelectorAll('script[src*="adsbygoogle.js"]').forEach(function(s){
    if(s.src.indexOf(__CORRECT_PUB)===-1){ s.remove(); }
  });
  document.querySelectorAll('ins.adsbygoogle').forEach(function(el){
    el.setAttribute('data-ad-client', __CORRECT_PUB);
  });
  if(!document.querySelector('script[src*="adsbygoogle.js"][src*="'+__CORRECT_PUB+'"]')){
    var ads=document.createElement('script');
    ads.async=true;
    ads.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+__CORRECT_PUB;
    ads.crossOrigin='anonymous';
    document.head.appendChild(ads);
  }
  var metaTag=document.querySelector('meta[name="google-adsense-account"]');
  if(metaTag){ metaTag.setAttribute('content', __CORRECT_PUB); }
  else {
    var m=document.createElement('meta');
    m.name='google-adsense-account'; m.content=__CORRECT_PUB;
    document.head.appendChild(m);
  }
}catch(ex){}

var _ec=[];
try{
  _ec=_d.filter(Array.isArray).map(function(v){
    return{id:v[0],name:v[1],continent:v[2],country:v[3],state:v[4],
      city:v[5],address:v[6],phone:v[7],email:v[8],description:v[9],
      tags:v.slice(10).map(function(i){return TAGS[i];})};
  });
}catch(ex){}
var _cf={search:"",country:"",state:"",city:"",continent:""};
var _pg=1;
var _PAGE_SIZE=24;
var _lastCfSig="";
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


function _refreshCountries(){
  var sc=document.getElementById("countryFilter");
  if(!sc)return;
  var existing={};
  Array.prototype.forEach.call(sc.options,function(o){existing[o.value]=true;});
  var current=sc.value;
  var countries=Array.from(new Set(_ec.map(function(e){return e.country;}))).sort();
  countries.forEach(function(c){
    if(!existing[c]){
      var o=document.createElement("option");
      o.value=c;o.textContent=c;
      sc.appendChild(o);
    }
  });
  sc.value=current;
}

function _renderPagination(totalPages){
  var container=document.getElementById("pgbox");
  if(!container)return;
  container.innerHTML="";
  if(totalPages<=1)return;
  container.style.display="flex";
  container.style.alignItems="center";
  container.style.justifyContent="center";
  container.style.gap="8px";
  container.style.margin="24px 0";
  container.style.flexWrap="wrap";
  function scrollUp(){
    var d=document.getElementById("directory");
    if(d) window.scrollTo({top:d.offsetTop-80,behavior:"smooth"});
  }
  function mkBtn(label,disabled,onClick,active){
    var b=document.createElement("button");
    b.textContent=label;
    b.disabled=!!disabled;
    b.style.padding="8px 14px";
    b.style.border="1px solid #d1d5db";
    b.style.borderRadius="6px";
    b.style.background=active?"#2563eb":"#fff";
    b.style.color=active?"#fff":(disabled?"#9ca3af":"#1f2937");
    b.style.cursor=disabled?"default":"pointer";
    b.style.fontSize="14px";
    if(!disabled&&onClick)b.addEventListener("click",onClick);
    return b;
  }
  container.appendChild(mkBtn("Prev",_pg<=1,function(){_pg--;_render();scrollUp();}));
  var startP=Math.max(1,_pg-2);
  var endP=Math.min(totalPages,startP+4);
  startP=Math.max(1,endP-4);
  for(var p=startP;p<=endP;p++){
    (function(pn){
      container.appendChild(mkBtn(String(pn),false,function(){_pg=pn;_render();scrollUp();},pn===_pg));
    })(p);
  }
  container.appendChild(mkBtn("Next",_pg>=totalPages,function(){_pg++;_render();scrollUp();}));
  var info=document.createElement("span");
  info.textContent="Page "+_pg+" of "+totalPages;
  info.style.marginLeft="12px";
  info.style.color="#6b7280";
  info.style.fontSize="13px";
  container.appendChild(info);
}

function _render(){
  var _allData=_gfd();
  if(_ec.length===0 && (typeof __veMergedIdx==="undefined" || __veMergedIdx===0)){
    var _cg=document.getElementById("cardsGrid");
    if(_cg){
      var _sk="";
      for(var _si=0;_si<8;_si++){_sk+='<div class="skeleton-card" style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.08);"><div class="sk-line sk-title"></div><div class="sk-line" style="width:60%"></div><div class="sk-line" style="width:80%"></div><div class="sk-line" style="width:40%"></div></div>';}
      _cg.innerHTML=_sk;
      _cg.style.display="grid";
    }
    var _ct=document.getElementById("cardsTable"); if(_ct) _ct.style.display="none";
    var _rc=document.getElementById("resultCount"); if(_rc) _rc.textContent="\u2026";
    var _nr=document.getElementById("noResults"); if(_nr) _nr.style.display="none";
    var _pb=document.getElementById("pgbox"); if(_pb) _pb.innerHTML="";
    return;
  }
  var _cfSig=_cf.search+"|"+_cf.country+"|"+_cf.state+"|"+_cf.city+"|"+_cf.continent;
  if(_cfSig!==_lastCfSig){_pg=1;_lastCfSig=_cfSig;}
  var _totalPages=Math.max(1,Math.ceil(_allData.length/_PAGE_SIZE));
  if(_pg>_totalPages)_pg=_totalPages;
  if(_pg<1)_pg=1;
  var data=_allData.slice((_pg-1)*_PAGE_SIZE,_pg*_PAGE_SIZE);
  document.getElementById("resultCount").textContent=_allData.length;
  var title=document.getElementById("resultsTitle");
  if(_cf.city)title.textContent="Event Centers in "+_cf.city;
  else if(_cf.state)title.textContent="Event Centers in "+_cf.state;
  else if(_cf.country)title.textContent="Event Centers in "+_cf.country;
  else if(_cf.continent)title.textContent="Event Centers in "+_cf.continent;
  else if(_cf.search)title.textContent="Search results for: "+_cf.search;
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
  else{grid.classList.add("hidden");grid.style.display="none";document.getElementById("cardsTable").classList.remove("hidden");document.getElementById("cardsTable").style.display="block";}
  _renderPagination(_totalPages);
}
window.filterByContinent=function(c){_reset();_cf.continent=c;_render();};
window.filterByCountry=function(c){_reset();_cf.country=c;document.getElementById("countryFilter").value=c;_pState();_pCity();_render();};
window.filterByState=function(co,st){_reset();_cf.country=co;_cf.state=st;document.getElementById("countryFilter").value=co;_pState();document.getElementById("stateFilter").value=st;_pCity();_render();};
window.filterByCity=function(co,st,ci){_reset();_cf.country=co;_cf.state=st;_cf.city=ci;document.getElementById("countryFilter").value=co;_pState();document.getElementById("stateFilter").value=st;_pCity();document.getElementById("cityFilter").value=ci;_render();};
window.toggleTree=function(btn){btn.classList.toggle("open");var ch=btn.nextElementSibling;if(ch)ch.classList.toggle("open");};
window.closeModal=function(){var o=document.getElementById("modalBackdrop");if(o){o.classList.add("hidden");o.style.display="none";}};
window.setView=function(v){_cv=v;var gb=document.getElementById("viewGrid");var tb=document.getElementById("viewTable");if(gb)gb.classList.toggle("active",v==="grid");if(tb)tb.classList.toggle("active",v==="table");_render();};
window._openM=function(id){
  var e=_ec.find(function(x){return x.id===id;});if(!e)return;
  var mt=document.getElementById("modalTitle");if(mt)mt.textContent=e.name;
  var ml=document.getElementById("modalLocation");
  if(ml)ml.innerHTML="<i class=\"fa-solid fa-location-dot\"></i> "+_esc(e.city)+", "+_esc(e.state||"")+", "+_esc(e.country);
  var tagsHtml=(e.tags||[]).map(function(t,i){return"<span class=\"tag"+(i%2===1?" alt":"")+"\">"+_esc(t)+"</span>";}).join("");
  var h="<div class=\"modal-section\"><h4>About</h4><p>"+_esc(e.description||"")+"</p></div>"
    +"<div class=\"modal-section\"><h4>Tags</h4><div class=\"card-tags\" style=\"margin-top:6px;\">"+tagsHtml+"</div></div>"
    +"<div class=\"modal-section\"><h4>Contact</h4>"
    +"<div class=\"contact-row\"><div class=\"ico\"><i class=\"fa-solid fa-location-dot\"></i></div><div class=\"info\"><span>Address</span><p>"+_esc(e.address)+"</p></div></div>"
    +(e.phone?"<div class=\"contact-row\"><div class=\"ico\"><i class=\"fa-solid fa-phone\"></i></div><div class=\"info\"><span>Phone</span><a href=\"tel:"+_esc(e.phone.replace(/\s+/g,""))+"\">"+_esc(e.phone)+"</a></div></div>":"")
    +(e.email?"<div class=\"contact-row\"><div class=\"ico\"><i class=\"fa-solid fa-envelope\"></i></div><div class=\"info\"><span>Email</span><a href=\"mailto:"+_esc(e.email)+"\">"+_esc(e.email)+"</a></div></div>":"")
    +"</div>";
  var mb=document.getElementById("modalBody");if(mb)mb.innerHTML=h;
  var ov=document.getElementById("modalBackdrop");
  if(ov){ov.classList.remove("hidden");ov.style.display="flex";}};
function _init(){

  var sc=document.getElementById("countryFilter");
  [...new Set(_ec.map(function(e){return e.country;}))].sort().forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=c;sc.appendChild(o);});
  try{
    var _qp=new URLSearchParams(location.search);
    var _qCountry=_qp.get("country");
    var _qCity=_qp.get("city");
    if(_qCountry){_cf.country=_qCountry;}
    if(_qCity){_cf.city=_qCity;}
    if(_qCountry||_qCity){
      if(typeof _pState==="function")_pState();
      if(typeof _pCity==="function")_pCity();
      var _cfEl=document.getElementById("countryFilter"); if(_cfEl&&_qCountry)_cfEl.value=_qCountry;
      var _ctEl=document.getElementById("cityFilter"); if(_ctEl&&_qCity)_ctEl.value=_qCity;
    }
  }catch(ex){}
  _render();
  var sv=document.getElementById("statVenues");if(sv)sv.textContent=_ec.length+"+";
  var sco=document.getElementById("statCountries");if(sco)sco.textContent=new Set(_ec.map(function(e){return e.country;})).size;
  var sci=document.getElementById("statCities");if(sci)sci.textContent="29,935+";
  try{var d=new Date();var lu=document.getElementById("lastUpdated");if(lu)lu.textContent=d.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});var cy=document.getElementById("currentYear");if(cy)cy.textContent=d.getFullYear();}catch(ex){}
  var si=document.getElementById("searchInput");
  if(si)si.addEventListener("input",function(e){_cf.search=e.target.value.toLowerCase();_render();});
  var hi=document.getElementById("heroSearchInput");
  if(hi)hi.addEventListener("input",function(e){_cf.search=e.target.value.toLowerCase();var si2=document.getElementById("searchInput");if(si2)si2.value=e.target.value;_render();});
  document.getElementById("countryFilter").addEventListener("change",function(e){_cf.country=e.target.value;_cf.state="";_cf.city="";_pState();_pCity();_render();});
  document.getElementById("stateFilter").addEventListener("change",function(e){_cf.state=e.target.value;_cf.city="";_pCity();_render();});
  document.getElementById("cityFilter").addEventListener("change",function(e){_cf.city=e.target.value;_render();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")window.closeModal();});
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
        cli.appendChild(cb);ul.appendChild(cli);
      });
      li.appendChild(btn);li.appendChild(ul);tm.appendChild(li);
    });
  }

  // Patch nav links to dedicated pages (AdSense compliance)
  document.querySelectorAll("a[href='#privacy']").forEach(function(a){a.href="/privacy.html";});
  document.querySelectorAll("a[href='#footer']").forEach(function(a){if(/contact/i.test(a.textContent))a.href="/contact.html";});
  // Add Terms link to nav and footer if not present
  var nav=document.getElementById("mainNav");
  if(nav&&!nav.querySelector("a[href='/terms.html']")){
    var tl=document.createElement("a");tl.href="/terms.html";tl.textContent="Terms";nav.appendChild(tl);
  }
  // Update footer Privacy Policy link
  document.querySelectorAll("a[href='#privacy']").forEach(function(a){a.href="/privacy.html";});
  // Update footer Contact link
  document.querySelectorAll("footer a[href='#footer'], footer a[href='#']").forEach(function(a){
    if(/contact/i.test(a.textContent))a.href="/contact.html";
  });

}
var __chunks=["/venues_base_1.js","/venues_base_2.js","/venues_base_3.js","/venues_base_4.js","/venues_base_5.js","/venues_base_6.js","/venues_base_7.js","/venues_base_8.js","/venues_base_9.js","/venues_base_10.js","/venues_base_11.js","/venues_base_12.js","/venues_data_1.js","/venues_data_2.js","/venues_data_3.js","/venues_data_4.js","/venues_data_5.js","/venues_data_6.js","/venues_data_7.js","/venues_data_8.js","/venues_data_9.js","/venues_data_10.js"];
var __veMergedIdx=0;
function __mergeNewVE(){
  if(window.__VE && window.__VE.length>__veMergedIdx){
    try{
      var newItems=window.__VE.slice(__veMergedIdx);
      var extra=newItems.filter(Array.isArray).map(function(v){
        return{id:v[0],name:v[1],continent:v[2],country:v[3],state:v[4],
          city:v[5],address:v[6],phone:v[7],email:v[8],description:v[9],
          tags:v.slice(10).map(function(i){return TAGS[i];})};
      });
      _ec=_ec.concat(extra);
      _refreshCountries();
      __veMergedIdx=window.__VE.length;
      var sv=document.getElementById("statVenues");
      if(sv) sv.textContent=_ec.length+"+";
      _render();
    }catch(ex){}
  }
}
document.addEventListener("DOMContentLoaded",function(){
  _init();
  __chunks.forEach(function(src){
    var s=document.createElement("script");
    s.src=src; s.onload=__mergeNewVE; s.onerror=__mergeNewVE;
    document.head.appendChild(s);
  });
});
})();