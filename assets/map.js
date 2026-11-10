(function(){
  if(!window.L) return;
  var C={
    "Salzkammergut, Austria":[47.72,13.55],"Hallstatt, Austria":[47.56,13.65],"Gosaukamm, Austria":[47.53,13.48],
    "Laugavegur Trail, Iceland":[63.9,-19.1],"Bergen, Norway":[60.39,5.32],"Delft, Netherlands":[52.01,4.36],
    "Glenfinnan to Old Forge, Scotland":[57.0,-5.6],"North Sea, England":[55.6,-1.6],"French Alps":[45.6,6.0],
    "Dolomites, Italy":[46.27,11.85],"Rome, Italy":[41.9,12.49],"Ravenna, Italy":[44.42,12.2],"Pompeii, Italy":[40.75,14.49],"Mt. Vesuvius, Italy":[40.82,14.43],
    "Istanbul, Türkiye":[41.01,28.98],"Lesvos, Greece":[39.2,26.25],"Athens, Greece":[37.98,23.73],"Carthage, Tunisia":[36.85,10.33],"Croatia":[42.65,18.09],
    "Central Java, Indonesia":[-7.6,110.3],"Mt. Merbabu, Central Java":[-7.45,110.44],"Yogyakarta, Indonesia":[-7.75,110.49],
    "Teapot Mountain, Taiwan":[25.11,121.87],"Taipei, Taiwan":[25.03,121.56],
    "Akita, Japan":[39.72,140.1],"Tōno, Japan":[39.33,141.53],"Yamagata, Japan":[38.24,140.36],"Kinugawa Onsen, Japan":[36.83,139.72],
    "Stewart Island, New Zealand":[-46.95,167.85],"Fiordland, New Zealand":[-44.67,167.93],"Dusky Track, Fiordland, New Zealand":[-45.75,166.7],
    "Cape Hauy, Tasmania":[-43.14,148.0],"Tasmania, Australia":[-42.1,146.6],"Adelaide Hills, Australia":[-34.95,138.75],
    "Los Glaciares, Argentina":[-49.33,-72.9],"Fitz Roy massif, Argentina":[-49.27,-73.04],"Patagonia, Argentina":[-50.3,-72.3],"Torres del Paine, Chile":[-51.0,-73.0],
    "Angel Peak, New Mexico":[36.55,-107.86],"White Rock Canyon, New Mexico":[35.8,-106.2],"Mount Rainier, Washington":[46.79,-121.73],"Pacific Northwest":[47.6,-122.9],
    "Holguín, Cuba":[20.89,-76.26],"Monahans, TX":[31.65,-102.8],"McKittrick Canyon, Guadalupe Mountains, Texas":[31.98,-104.75],"Guadalupe Mountains":[31.9,-104.9],
    "San Salvador, Bahamas":[24.05,-74.5]
  };
  var FIELD=[
    {n:"Thwaites Glacier, Amundsen Sea",ll:[-74.5,-106],d:"Airborne radar season aboard RV Araon, 2025–26"},
    {n:"San Salvador, Bahamas",ll:[24.0,-74.45],d:"Marine sediments & sea-level reconstruction, 2024"},
    {n:"Port Aransas, Texas",ll:[27.83,-97.06],d:"Marine geology & geophysics field course, 2024"},
    {n:"Big Bend, Texas",ll:[29.25,-103.25],d:"Structural geology mapping, 2025"},
    {n:"Vienna, Austria",ll:[48.21,16.37],d:"EGU General Assembly, 2024 & 2025"}
  ];
  var map=L.map('travel-map',{worldCopyJump:true,scrollWheelZoom:false,minZoom:1}).setView([15,10],2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',subdomains:'abcd',maxZoom:12}).addTo(map);
  var groups={};
  document.querySelectorAll('.t-item, .t-pano-s').forEach(function(f){
    var b=f.querySelector('figcaption b'); if(!b) return;
    var key=b.textContent.split(' · ')[0].trim();
    if(!C[key]) return;
    (groups[key]=groups[key]||[]).push(f);
  });
  function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}
  Object.keys(groups).forEach(function(k){
    var figs=groups[k];
    var html='<div class="pop"><b>'+esc(k)+'</b><span>'+figs.length+' photo'+(figs.length>1?'s':'')+'</span><div class="pop-thumbs">';
    figs.slice(0,4).forEach(function(f,i){
      var im=f.querySelector('img'); var src=im?im.getAttribute('src'):(f.querySelector('video')||{}).poster;
      html+='<img src="'+src+'" data-k="'+esc(k)+'" data-i="'+i+'" alt="">';
    });
    html+='</div></div>';
    L.circleMarker(C[k],{radius:6,color:'#e0a526',weight:2,fillColor:'#e0a526',fillOpacity:.75}).addTo(map).bindPopup(html,{maxWidth:280});
  });
  FIELD.forEach(function(p){
    L.circleMarker(p.ll,{radius:7,color:'#dfe9ef',weight:2,fillColor:'#0c1620',fillOpacity:1}).addTo(map)
     .bindPopup('<div class="pop"><b>'+p.n+'</b><span>'+p.d+'</span><a href="#field">See fieldwork ↑</a></div>');
  });
  map.on('popupopen',function(e){
    e.popup.getElement().querySelectorAll('.pop-thumbs img').forEach(function(im){
      im.addEventListener('click',function(){
        var f=groups[im.dataset.k][+im.dataset.i];
        document.querySelector('.filters button[data-f="all"]').click();
        f.scrollIntoView({behavior:'smooth',block:'center'});
        f.classList.add('flash'); setTimeout(function(){f.classList.remove('flash');},1600);
      });
    });
  });
})();
