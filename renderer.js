
(function(global){
  const defs={
    base:[
      {id:'plate',name:'皿',sheet:'base',sx:40,sy:40,sw:840,sh:285,cat:'base'},
      {id:'cutFrame',name:'断面フレーム',sheet:'base',sx:500,sy:340,sw:458,sh:324,cat:'base'},
      {id:'whole',name:'丸ごとコロッケ',sheet:'base',sx:900,sy:35,sw:520,sh:300,cat:'base'},
      {id:'shoeL',name:'足L',sheet:'base',sx:32,sy:884,sw:184,sh:145,cat:'extra'},
      {id:'shoeR',name:'足R',sheet:'base',sx:250,sy:888,sw:144,sh:158,cat:'extra'},
      {id:'glasses',name:'グラサン',sheet:'base',sx:416,sy:904,sw:314,sh:142,cat:'extra'},
      {id:'headphones',name:'ヘッドホン',sheet:'base',sx:730,sy:842,sw:305,sh:221,cat:'extra'},
      {id:'steam',name:'湯気',sheet:'base',sx:1050,sy:870,sw:205,sh:188,cat:'extra'},
      {id:'sparkle',name:'キラキラ',sheet:'base',sx:1348,sy:950,sw:76,sh:93,cat:'extra'}
    ],
    sauces:[
      {id:'cream',name:'クリーム',sheet:'fill',sx:20,sy:24,sw:340,sh:220,cat:'sauce'},
      {id:'ice',name:'アイス系',sheet:'fill',sx:362,sy:23,sw:354,sh:220,cat:'sauce'},
      {id:'mayo',name:'マヨ系',sheet:'fill',sx:720,sy:22,sw:326,sh:224,cat:'sauce'},
      {id:'yogurt',name:'ヨーグルト系',sheet:'fill',sx:1075,sy:26,sw:345,sh:218,cat:'sauce'},
      {id:'mysteryPurple',name:'謎の液体A',sheet:'fill',sx:24,sy:279,sw:344,sh:220,cat:'sauce'},
      {id:'whiteSauce',name:'ホワイトソース',sheet:'fill',sx:371,sy:279,sw:341,sh:219,cat:'sauce'},
      {id:'milk',name:'ミルク系',sheet:'fill',sx:720,sy:282,sw:320,sh:213,cat:'sauce'},
      {id:'custard',name:'カスタード系',sheet:'fill',sx:1075,sy:279,sw:345,sh:219,cat:'sauce'}
    ],
    mains:[
      {id:'crabShred',name:'カニほぐし',sheet:'fill',sx:24,sy:533,sw:350,sh:171,cat:'main'},
      {id:'kanikama',name:'カニカマ',sheet:'fill',sx:396,sy:533,sw:349,sh:173,cat:'main'},
      {id:'kombu',name:'昆布',sheet:'fill',sx:752,sy:541,sw:344,sh:175,cat:'main'},
      {id:'starfish',name:'ヒトデ',sheet:'fill',sx:1090,sy:535,sw:333,sh:190,cat:'main'},
      {id:'boots',name:'長靴',sheet:'fill',sx:86,sy:710,sw:262,sh:142,cat:'main'},
      {id:'gloves',name:'手袋',sheet:'fill',sx:488,sy:709,sw:290,sh:145,cat:'main'},
      {id:'crabPieces',name:'カニ身ごろ',sheet:'fill',sx:935,sy:709,sw:425,sh:165,cat:'main'}
    ]
  };
  const assetMap={}; [...defs.base,...defs.sauces,...defs.mains].forEach(d=>assetMap[d.id]=d);
  const defaultGlobal={plate:{x:0,y:0,scale:1},body:{x:0,y:0,scale:1},sauce:{x:0,y:0,scale:1},main:{x:0,y:0,scale:1},extra:{x:0,y:0,scale:1}};
  const defaultMask={x:287,y:427,rx:130,ry:84};
  const defaultRecipe={sauce:'cream',main:'crabShred',finish:'normal',layout:'standard',legs:false,glasses:false,headphones:false,steam:false,sparkle:false};

  function clone(o){return JSON.parse(JSON.stringify(o));}
  function createDefaultGlobal(){return clone(defaultGlobal);}  
  function createDefaultMask(){return clone(defaultMask);}  
  function normalizeRecipe(r){return Object.assign({}, clone(defaultRecipe), r||{});}  
  function gp(global,group,key){return Number((global&&global[group]&&global[group][key]) ?? defaultGlobal[group][key]);}
  function buildRecipeLayers(recipe, globalAdjust, mask){
    const r=normalizeRecipe(recipe);
    const global=globalAdjust||createDefaultGlobal();
    const m=mask||createDefaultMask();
    const layers=[]; let uid=1;
    const add=(name,assetId,opts={})=>layers.push(Object.assign({uid:'l'+uid++,name,assetId,x:380,y:390,scale:1,rotation:0,alpha:1,flipX:false,clip:false,visible:true,z:layers.length},opts));
    const plateScale=.78*gp(global,'plate','scale');
    const bodyScale=.74*gp(global,'body','scale');
    const cutScale=.89*gp(global,'body','scale');
    let sauceScale=(r.layout==='sauceFocus'?1.03:.93)*gp(global,'sauce','scale');
    let mainScale=(r.layout==='ingredientFocus'?.88:.78)*gp(global,'main','scale');
    if(!isFinite(sauceScale)||sauceScale<=0) sauceScale=(r.layout==='sauceFocus'?1.03:.93);
    if(!isFinite(mainScale)||mainScale<=0) mainScale=(r.layout==='ingredientFocus'?.88:.78);
    add('皿','plate',{x:380+gp(global,'plate','x'),y:580+gp(global,'plate','y'),scale:plateScale});
    add('丸ごと本体','whole',{x:395+gp(global,'body','x'),y:430+gp(global,'body','y'),scale:bodyScale});
    add('液体',r.sauce,{x:m.x+gp(global,'sauce','x'),y:m.y+gp(global,'sauce','y'),scale:sauceScale,clip:true,z:2});
    add('具材',r.main,{x:m.x+gp(global,'main','x'),y:m.y+gp(global,'main','y'),scale:mainScale,rotation:r.main==='kombu'?8:r.main==='boots'?0:-4,clip:true,z:3});
    add('断面フレーム','cutFrame',{x:292+gp(global,'body','x')*.45,y:427+gp(global,'body','y')*.2,scale:cutScale,z:4});
    if(r.legs){add('足L','shoeL',{x:245+gp(global,'extra','x'),y:565+gp(global,'extra','y'),scale:.50*gp(global,'extra','scale'),z:1}); add('足R','shoeR',{x:372+gp(global,'extra','x'),y:578+gp(global,'extra','y'),scale:.50*gp(global,'extra','scale'),z:1});}
    if(r.glasses){add('グラサン','glasses',{x:323+gp(global,'extra','x'),y:336+gp(global,'extra','y'),scale:.48*gp(global,'extra','scale'),z:5});}
    if(r.headphones){add('ヘッドホン','headphones',{x:316+gp(global,'extra','x'),y:311+gp(global,'extra','y'),scale:.48*gp(global,'extra','scale'),z:5});}
    if(r.steam){add('湯気','steam',{x:488+gp(global,'extra','x'),y:347+gp(global,'extra','y'),scale:.46*gp(global,'extra','scale'),alpha:.95,z:6});}
    if(r.sparkle){add('キラキラ','sparkle',{x:575+gp(global,'extra','x'),y:295+gp(global,'extra','y'),scale:.90*gp(global,'extra','scale'),z:6});}
    return layers;
  }
  function drawImageAsset(ctx, images, def, layer){
    const img=images[def.sheet]; if(!img) return;
    ctx.save(); ctx.translate(layer.x,layer.y); ctx.rotate((layer.rotation||0)*Math.PI/180); ctx.scale(layer.flipX?-1:1,1); ctx.globalAlpha=layer.alpha ?? 1;
    const dw=def.sw*layer.scale, dh=def.sh*layer.scale; ctx.drawImage(img,def.sx,def.sy,def.sw,def.sh,-dw/2,-dh/2,dw,dh); ctx.restore();
  }
  function drawBurnSpots(ctx,dx,dy,s,hard){const pts=[[-110,-48,28],[-30,-65,18],[45,-55,26],[118,-12,20],[70,42,22],[-48,58,18],[-145,15,24]];ctx.fillStyle=hard?'rgba(30,15,10,.52)':'rgba(58,28,15,.28)';pts.forEach(([x,y,r])=>{ctx.beginPath();ctx.ellipse(dx+x*s,dy+y*s,r*s,(r*.55)*s,0,0,Math.PI*2);ctx.fill();});}
  function drawFinishOverlay(ctx, layers, finish){
    if(!finish || finish==='normal') return;
    const frame=layers.find(l=>l.assetId==='cutFrame'); if(!frame) return;
    ctx.save(); ctx.translate(frame.x,frame.y); ctx.scale(frame.scale,frame.scale); ctx.beginPath(); ctx.ellipse(-10,5,210,124,-0.10,0,Math.PI*2); ctx.clip();
    if(finish==='golden'){ctx.fillStyle='rgba(255,180,60,.18)';ctx.fillRect(-260,-180,520,360);}else if(finish==='burnt'){ctx.fillStyle='rgba(50,20,8,.18)';ctx.fillRect(-260,-180,520,360);drawBurnSpots(ctx,-5,0,1,false);}else if(finish==='charcoal'){ctx.fillStyle='rgba(35,14,8,.35)';ctx.fillRect(-260,-180,520,360);drawBurnSpots(ctx,-5,0,1.6,true);} ctx.restore();
  }
  function renderDish(ctx, images, renderState, options={}){
    const canvas=ctx.canvas;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(options.backgroundFill){ctx.fillStyle=options.backgroundFill; ctx.fillRect(0,0,canvas.width,canvas.height);}
    const layers=[...(renderState.layers||[])].filter(l=>l.visible!==false).sort((a,b)=>a.z-b.z);
    const mask=renderState.mask||createDefaultMask();
    layers.forEach(layer=>{
      const def=assetMap[layer.assetId]; if(!def) return;
      const draw=()=>drawImageAsset(ctx, images, def, layer);
      if(layer.clip){ctx.save(); ctx.beginPath(); ctx.ellipse(mask.x,mask.y,mask.rx,mask.ry,-0.34,0,Math.PI*2); ctx.clip(); draw(); ctx.restore();}
      else draw();
    });
    drawFinishOverlay(ctx, layers, renderState.recipe?.finish);
    if(options.showMask){ctx.save(); ctx.strokeStyle='rgba(37,99,235,.9)'; ctx.setLineDash([9,7]); ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(mask.x,mask.y,mask.rx,mask.ry,-0.34,0,Math.PI*2); ctx.stroke(); ctx.restore();}
  }
  function drawDishThumbnail(ctx, images, recipe, globalAdjust, w, h){
    const tmp=document.createElement('canvas'); tmp.width=760; tmp.height=760; const t=tmp.getContext('2d');
    const mask=createDefaultMask();
    const layers=buildRecipeLayers(recipe, globalAdjust, mask);
    renderDish(t, images, {layers,mask,recipe}, {backgroundFill:'#fbf7ef'});
    ctx.drawImage(tmp,0,0,tmp.width,tmp.height,0,0,w,h);
  }
  global.KaniDishRenderer={defs,assetMap,defaultGlobal,defaultMask,defaultRecipe,createDefaultGlobal,createDefaultMask,normalizeRecipe,buildRecipeLayers,renderDish,drawDishThumbnail};
})(window);
