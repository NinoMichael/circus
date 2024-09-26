(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6763],{46638:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});i(67294);var n=i(41664),r=i.n(n),o=i(85444).ZP.div.withConfig({displayName:"styles__Container",componentId:"sc-omvdj0-0"})(["display:flex;text-align:center;justify-content:",";height:",";max-width:",";margin:",";& > a{display:flex;align-items:center;text-align:center;padding:1rem 2rem;border:0;border-radius:5px;background-color:",";font-size:",";font-weight:bold;color:#fff;cursor:pointer;transition:var(--transition);@media screen and (min-width:900px){&:hover{background-color:",";}}&:active{background-color:",";transform:scale(0.95);}}"],(function(e){return e.justify?e.justify:"center"}),(function(e){return e.height?e.height:"100%"}),(function(e){return e.maxWidth?e.maxWidth:"none"}),(function(e){return e.margin&&e.margin}),(function(e){return e.bgColor?e.bgColor:"var(--color-tertiary)"}),(function(e){return e.fontSize?e.fontSize:"var(--font-subtitle-size)"}),(function(e){return e.bgHoverColor?e.bgHoverColor:"var(--color-tertiary-dark)"}),(function(e){return e.bgHoverColor?e.bgHoverColor:"var(--color-tertiary-dark)"})),a=i(85893),s=function(e){return(0,a.jsx)(o,{height:e.height,maxWidth:e.maxWidth,justify:e.justify,fontSize:e.fontSize,bgColor:e.bgColor,bgHoverColor:e.bgHoverColor,margin:e.margin,children:(0,a.jsx)(r(),{href:e.href,children:(0,a.jsx)("a",{href:e.href,onClick:e.onClick||null,target:e.target,children:e.children})})})}},9854:function(e,t,i){"use strict";i.d(t,{Z:function(){return w}});var n=i(25675),r=i.n(n),o=i(67294),a=i(63750),s=i(92416),l=i(70638),d=i(97886),c=i(24528),u=i(1421),m=i(87774),h=i(71587),f=i(85444),p=f.ZP.div.withConfig({displayName:"styles__Container",componentId:"sc-m9d1bg-0"})(["display:flex;flex-direction:column;& > a{font-family:var(--fonts);font-size:var(--font-text-size);font-weight:bold;color:black;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;&:hover{color:var(--color-primary);}}& > p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;font-size:var(--font-text-size);margin-top:1rem;@media screen and (max-width:1000px){-webkit-line-clamp:3;}}"]),g=i(85893),x=function(e){var t=e.book,i=e.bookPrismic,n=(0,c.Z)();return i?(0,g.jsxs)(p,{children:[(0,g.jsx)("a",{href:"/".concat(n.url,"/read/").concat(i.data.url),target:"_self",title:i.data.title,children:i.data.title}),(0,g.jsx)("p",{children:i.data.subtitle})]}):(0,g.jsxs)(p,{children:[(0,g.jsx)("a",{href:"/".concat(n.url,"/read/").concat(t.url),target:"_self",title:t.titulo,children:t.titulo}),(0,g.jsx)("p",{children:t.subtitulo})]})},v=f.ZP.div.withConfig({displayName:"styles__Container",componentId:"sc-739gqi-0"})(["display:grid;grid-template-columns:",";gap:1rem;width:100%;height:auto;@media screen and (min-width:1000px){display:flex;flex-direction:",";gap:1rem;& > a{height:100%;aspect-ratio:",";}}img{border-radius:5px;cursor:pointer;transition:var(--transition);background-color:#eee;max-width:500px;&:hover{transform:scale(0.95);}}& > div{& > p{min-height:54px;}}"],(function(e){return e.showIcons?"1fr 3.5fr 0.5fr":"1fr 4fr"}),(function(e){return e.verticalLayout?"column":"row"}),(function(e){return e.verticalLayout?948/498:358/498})),b=f.ZP.div.withConfig({displayName:"styles__Icons",componentId:"sc-739gqi-1"})(["display:flex;flex-direction:column;align-items:center;gap:0.5rem;position:relative;& > svg{font-size:24px;cursor:pointer;transition:var(--transition);@media screen and (min-width:900px){&:hover{transform:scale(0.9);}}}"]),y=f.ZP.div.withConfig({displayName:"styles__Description",componentId:"sc-739gqi-2"})(["position:absolute;top:1rem;right:3rem;width:max-content;display:flex;justify-content:center;box-shadow:var(--box-shadow);border-radius:10px;background-color:rgb(250,250,250);& > p{padding:1rem 2rem;border-radius:5px;color:#000;}"]),w=function(e){var t,i,n,f,p,w,j=e.verticalLayout,_=e.showIcons,k=e.favCategory,C=e.defaultWidth,z=e.bookPrismic,Z=e.generalLabels,P=(0,o.useState)(),I=P[0],N=P[1],M=(0,c.Z)(),D=(0,u.Z)(),S=(0,d.v)().onBookUpdate,W=function(){N(null)},E=function(e){e.preventDefault(),e.stopPropagation(),k&&z.databaseData.id?s.hi.delete("favorites_library/user/".concat((0,l.PR)().id,"/").concat(z.databaseData.id)).then((function(){S&&S(z.databaseData.id,"is_favorite",!1,"databaseData.id")})):s.hi.delete("bookreadafter/".concat(z.databaseData.id,"/user/").concat((0,l.PR)().id,"/")).then((function(){S&&S(z.databaseData.id,"is_read_later",!1,"databaseData.id")}))},q=function(e){var t=e.src,i=e.width,n=e.quality;return"".concat(t,"?w=").concat(i,"&q=").concat(n||75)};return(0,g.jsxs)(v,{showIcons:_,verticalLayout:j,children:[(0,g.jsx)("a",{href:"/".concat(M.url,"/read/").concat(z.data.url),target:"_self",children:j&&D.width&&D.width>=1e3||!D.width&&C>=1e3?(0,g.jsx)(h.af,{aspectRatio:"948/498",maxWidth:"498px!important",maxHeight:"261px!important",children:(0,g.jsx)(r(),{src:(j?null===z||void 0===z||null===(t=z.data)||void 0===t||null===(i=t.image)||void 0===i?void 0:i.url:null===z||void 0===z||null===(n=z.data)||void 0===n||null===(f=n.vertical_image)||void 0===f?void 0:f.url)||"https://s3.amazonaws.com/imagens-voitto/pb4y_files/no-img.png",width:498,height:261,layout:"responsive",alt:z.data.title,title:z.data.title,loader:q})}):(0,g.jsx)(h.af,{aspectRatio:"358/498",maxWidth:"498px!important",maxHeight:"261px!important",children:(0,g.jsx)(r(),{src:(null===z||void 0===z||null===(p=z.data)||void 0===p||null===(w=p.vertical_image)||void 0===w?void 0:w.url)||"https://s3.amazonaws.com/imagens-voitto/pb4y_files/no-img.png",width:358,height:498,layout:"responsive",alt:z.data.title,title:z.data.title,loader:q})})}),(0,g.jsx)(x,{bookPrismic:z}),_&&(k?(0,g.jsxs)(b,{children:[(0,g.jsx)(a.yvY,{onClick:function(e){return E(e)},onMouseOver:function(){var e;return N(null===Z||void 0===Z||null===(e=Z.data)||void 0===e?void 0:e.remove_fav)},onMouseOut:function(){return W()}}),(0,g.jsx)(m.Z,{prismicBook:z,handleMouseOver:function(e){var t,i;N(e?null===Z||void 0===Z||null===(t=Z.data)||void 0===t?void 0:t.remove_read_after:null===Z||void 0===Z||null===(i=Z.data)||void 0===i?void 0:i.add_read_after)},handleMouseOut:W,sizeIcon:25,color:"var(--color-primary)"}),I&&(0,g.jsx)(y,{children:(0,g.jsx)("p",{children:I})})]}):(0,g.jsxs)(b,{children:[(0,g.jsx)(a.yvY,{onClick:function(e){return E(e)},onMouseOver:function(){var e;return N(null===Z||void 0===Z||null===(e=Z.data)||void 0===e?void 0:e.remove_read_after)},onMouseOut:function(){return W()}}),I&&(0,g.jsx)(y,{children:(0,g.jsx)("p",{children:I})})]}))]})}},48371:function(e,t,i){"use strict";i.d(t,{Z:function(){return p}});i(67294);var n=i(24528),r=i(58011),o=i(9854),a=i(46638),s=i(51649),l=i(85444),d=l.ZP.div.withConfig({displayName:"styles__Container",componentId:"sc-oa07c1-0"})(["margin-bottom:3rem;& > main{margin:2rem 0 0;display:grid;grid-template-columns:1fr 1fr;gap:2rem;h1{font-size:var(--font-text-size) !important;}@media screen and (max-width:1000px){display:flex;flex-direction:column;margin-bottom:-2rem;}}header{","}& > div{margin-top:2rem;}"],(function(e){return e.isExplore&&"display:flex;justify-content:space-between;align-items:center"})),c=(l.ZP.img.withConfig({displayName:"styles__Image",componentId:"sc-oa07c1-1"})(["width:100%;height:auto;aspect-ratio:",";"],(function(e){return e.aspectRatio})),l.ZP.div.withConfig({displayName:"styles__SecondaryBooks",componentId:"sc-oa07c1-2"})(["display:grid;grid-template-rows:calc((100% - 86px - 2rem) * 0.5) calc((100% - 86px - 2rem) * 0.5) 86px;gap:1rem;@media screen and (max-width:1000px){display:flex;flex-direction:column;gap:2rem;width:100%;}"])),u=l.ZP.a.withConfig({displayName:"styles__ExploreRedirect",componentId:"sc-oa07c1-3"})(["font-family:'Montserrat';font-style:normal;font-weight:700;font-size:var(--font-subtitle-size);line-height:24px;display:flex;align-items:center;color:var(--color-primary);text-align:right;cursor:pointer;svg{font-size:var(--font-title-size);}transition:var(--transition);&:hover{transform:var(--transform-scale);}"]),m=i(41664),h=i.n(m),f=i(85893),p=function(e){var t,i=e.title,l=e.button,m=e.isExplore,p=e.prismicBestSellers,g=e.defaultWidth,x=(0,n.Z)();return(0,f.jsxs)(d,{isExplore:m,children:[(0,f.jsxs)("header",{children:[(0,f.jsx)(r.Z,{children:i}),m&&(0,f.jsx)(h(),{href:"".concat(x.url,"/explore"),children:(0,f.jsxs)(u,{href:"".concat(x.url,"/explore"),children:[{pt:"Ver todos os resumos",en:"See all summaries",es:"Ver todos los res\xfamenes",fr:"Voir tous les r\xe9sum\xe9s",de:"Alle Zusammenfassungen anzeigen",it:"Vedi tutti i riassunti",ru:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435 \u0440\u0435\u0437\u044e\u043c\u0435",zh:"\u67e5\u770b\u6240\u6709\u6458\u8981"}[x.url],""," ",(0,f.jsx)(s.hjJ,{})]})})]}),(0,f.jsxs)("main",{children:[(null===p||void 0===p||null===(t=p.main)||void 0===t?void 0:t.post)&&(0,f.jsx)(o.Z,{verticalLayout:!0,defaultWidth:g,bookPrismic:p.main.post}),(0,f.jsxs)(c,{children:[p.secondary.map((function(e,t){return(0,f.jsx)(o.Z,{bookPrismic:e},t)})),(0,f.jsx)("div",{})]})]}),l&&(0,f.jsx)(a.Z,{href:"/".concat(x.url,"/login/signUp"),children:l})]})}},11446:function(e,t,i){"use strict";i.r(t),i.d(t,{__N_SSP:function(){return w},default:function(){return j}});var n=i(67294),r=i(53514),o=i(11163),a=i(64536),s=i(22461),l=i(71587),d=i(48371),c=i(38915),u=i(85444),m=u.ZP.div.withConfig({displayName:"styles__Container",componentId:"sc-1qiydli-0"})(["display:flex;justify-content:center;align-items:flex-end;color:#fff;margin:0 auto;background:url(",") no-repeat;background-size:cover;width:100%;max-width:100%;height:",";background-position:right top;background-attachment:local;> p{font-family:var(--fonts);font-size:var(--font-title-size);text-align:center;width:100%;color:var(--color-primary);padding:1rem;font-weight:bold;text-transform:uppercase;}@media screen and (min-width:1400px){> p{font-size:4rem;}}@media screen and (max-width:900px){height:",";> p{font-size:2rem;}","}"],(function(e){return e.background}),(function(e){return e.height?e.height:"60vh"}),(function(e){return e.heightMobile?e.heightMobile:"40vh"}),(function(e){return e.hiddenMobile&&"display: none;"})),h=i(85893),f=function(e){return(0,h.jsx)(m,{heightMobile:e.heightMobile,height:e.height,background:e.url,hiddenMobile:e.hiddenMobile,children:e.text&&(0,h.jsx)("p",{children:e.text})})},p=i(24528),g=i(41664),x=i.n(g),v=u.ZP.div.withConfig({displayName:"styles__Container",componentId:"sc-1mu0fec-0"})(["font-size:var(--font-final-note);margin:",";font-weight:500;a{span{color:#000;text-decoration:underline;}&::before{content:'>';display:inline-block;width:4px;height:4px;margin:0.1rem 0.5rem;-moz-border-radius:7.5px;-webkit-border-radius:7.5px;border-radius:7.5px;color:#ccc;}&:first-of-type{&::before{content:'';display:none;}}&:last-of-type{span{color:#777;text-decoration:none;}}}"],(function(e){return e.margin||"0"})),b=function(e){var t=e.map,i=e.margin,n=(0,p.Z)();return(0,h.jsx)(v,{margin:i,children:t.map((function(e,t){var i;if((null===(i=e.name)||void 0===i?void 0:i.length)>0)return(0,h.jsx)(x(),{href:"/".concat(n.url)+e.url,children:(0,h.jsx)("a",{href:"/".concat(n.url)+e.url,children:(0,h.jsx)("span",{children:e.name})})},t)}))})},y=i(51886),w=!0,j=function(e){var t=e.lang,i=e.currentSegment,u=e.defaultWidth,m=e.segments,p=e.segmentsData,g=e.prismicData,x=e.token,v=e.generalLabels,w=(0,o.useRouter)();return(0,n.useEffect)((function(){x&&(0,y.RI)()}),[]),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a.Z,{title:g.title_google,description:g.description_google,url:w.asPath,lang:(0,r.b2)(t),image:g.segment.data.image.url}),(0,h.jsxs)(s.Z,{headerData:g.header.data,footerData:g.footer.data,hasSegmentsBar:!0,segmentsData:p,currentSegment:i,defaultWidth:u,segments:m,lang:t,children:[(0,h.jsx)(l.$0,{noPadding:!0,children:(0,h.jsx)(f,{hiddenMobile:!0,height:"40vh",heightMobile:"10vh",url:g.segment.data.image.url})}),(0,h.jsx)(l.$0,{noPadding:!0,children:(0,h.jsxs)(l.qz,{children:[(0,h.jsx)(b,{margin:"0.5rem 0 1.2rem 0",map:[{name:"Home",url:""},{name:g.segment.data.name,url:"/segments/".concat(g.segment.data.url)}]}),(0,h.jsx)(c.Z,{title:g.new_release_text,prismicBook:g.new_releases,generalLabels:v})]})}),(0,h.jsx)(l.$0,{noPadding:!0,children:(0,h.jsx)(l.qz,{children:(0,h.jsx)(d.Z,{title:g.bestsellers_text,button:"",defaultWidth:u,prismicBestSellers:{main:g.bestsellers[0],secondary:g.bestsellers.slice(1).map((function(e){return e.post}))}})})}),(0,h.jsx)(l.$0,{noPadding:!0,children:(0,h.jsx)(l.qz,{children:(0,h.jsx)(c.Z,{title:g.most_popular_text,prismicBook:g.most_popular,generalLabels:v})})})]})]})}},83230:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]/segments/[segment]",function(){return i(11446)}])}},function(e){e.O(0,[5445,4980,5006,4617,2013,9866,4844,3832,4111,1137,1387,8310,146,808,1361,2461,925,8915,9774,2888,179],(function(){return t=83230,e(e.s=t);var t}));var t=e.O();_N_E=t}]);