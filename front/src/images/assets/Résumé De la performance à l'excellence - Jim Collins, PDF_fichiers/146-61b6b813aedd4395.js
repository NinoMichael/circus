"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[146],{28788:function(e,t,n){n(67294);var r=n(25675),o=n.n(r),a=n(71587),i=n(85893);t.Z=function(e){var t=e.isWhite,n=e.priority;return(0,i.jsx)(a.af,{aspectRatio:"1320/208",children:(0,i.jsx)(o(),{priority:n||void 0===n,src:t?"https://imagens-voitto.s3.amazonaws.com/pocketbook4you/Logos/logo+branca.webp":"https://imagens-voitto.s3.amazonaws.com/pocketbook4you/Logos/logo+azul.webp",width:"1320",height:"208",layout:"responsive"})})}},1421:function(e,t,n){var r=n(67294);t.Z=function(){var e=(0,r.useState)(null),t=e[0],n=e[1],o=(0,r.useState)(null),a=o[0],i=o[1];return(0,r.useEffect)((function(){n(window.innerWidth),i(window.innerHeight),window.addEventListener("resize",(function(){n(window.innerWidth),i(window.innerHeight)}))}),[]),{width:t,height:a}}},92416:function(e,t,n){n.d(t,{Rc:function(){return i},hi:function(){return a}});var r=n(9669),o=n.n(r),a=o().create({baseURL:"https://apiv2.pocketbook4you.com/"}),i=(o().create({baseURL:"https://api.pocketbook4you.com/index.php/"}),o().create({baseURL:"https://apiv2.voitto.com.br/v2/"}));o().create({baseURL:"http://localhost:4444/"}),o().create({baseURL:"https://api-v2-pocketbook.herokuapp.com/"}),o().create({baseURL:"https://pocketbook4you.com/api/"}),o().create({baseURL:"http://localhost:3000/api/"})},70638:function(e,t,n){n.d(t,{LP:function(){return d},PR:function(){return c},WX:function(){return f},__:function(){return s},kS:function(){return l},uB:function(){return a},x4:function(){return u}});var r=n(36808),o=n.n(r),a=function(e){"undefined"!==typeof localStorage&&(localStorage.setItem("token_v2",e),o().set("token_v2",e,{expires:1825}))},i="_SESSION",u=function(e){if("undefined"!==typeof localStorage)return localStorage.setItem(i,JSON.stringify(e)),!0},c=function(){if("undefined"!==typeof localStorage){var e=JSON.parse(localStorage.getItem(i));return void 0!==e&&null!=e&&""!==e?e:null}},s=function(e){if("undefined"!==typeof localStorage){var t=JSON.parse(localStorage.getItem(i));t[e.attribute]=e.value,localStorage.setItem(i,JSON.stringify(t))}},l=function(e){"undefined"!==typeof localStorage&&(localStorage.removeItem(i),localStorage.removeItem("token_v2"),localStorage.removeItem("_SESSION"),o().remove("token_v2"),o().remove("refresh_token"),window.open("/".concat(e,"/"),"_self"))},f=function(){if("undefined"===typeof localStorage)return!1;var e=localStorage.getItem("token_v2");return!!e&&""!==e},d=function(){if("undefined"!==typeof localStorage){var e=o().get("token_v2");return e&&""!==e?e:void 0}}},51886:function(e,t,n){n.d(t,{Au:function(){return u},Cz:function(){return y},I5:function(){return v},J4:function(){return k},Kf:function(){return h},LF:function(){return b},P7:function(){return s},PJ:function(){return f},RI:function(){return S},WC:function(){return g},XR:function(){return p},Y0:function(){return i},YQ:function(){return c},ZC:function(){return N},Zj:function(){return M},eV:function(){return l},ld:function(){return d},pD:function(){return m},ur:function(){return _},vc:function(){return w}});var r=n(92416),o=n(70638),a=n(53514);var i=function(e){if(e){var t=e.indexOf(" ");if(t<e.length-1)return"".concat(e.slice(0,t)," ").concat(e[t+1],".")}return e},u=function(e){var t=e.split(" - ",2);return t.length<=1&&(t=e.split(" \u2013 ",2)),t.length<=1&&(t=e.split("-",2)),t[1]},c=function(e){var t=e.split(" - ",2);return t.length<=1&&(t=e.split(" \u2013 ",2)),t.length<=1&&(t=e.split("-",2)),t[0]},s=function(e,t){return(e=e.replace("Livro ","")).length>t&&(e=e.substr(0,t)+"..."),e},l=function(){return Array(12).fill(1).map((function(e,t){return e+t})).map((function(e){return{value:"".concat(e),label:"".concat(e)}}))},f=function(e){var t=(new Date).getFullYear();return Array(e).fill(t).map((function(e,t){return e+t})).map((function(e){return{value:"".concat(e),label:"".concat(e)}}))},d=function(e){var t,n=0;if("BR"!==(0,a.pD)())return!0;if(!e||"00000000000"===e||11!==e.length)return!1;for(var r=1;r<=9;r++)n+=parseInt(e.substring(r-1,r))*(11-r);if(10!==(t=10*n%11)&&11!==t||(t=0),t!==parseInt(e.substring(9,10)))return!1;n=0;for(var o=1;o<=10;o++)n+=parseInt(e.substring(o-1,o))*(12-o);return 10!==(t=10*n%11)&&11!==t||(t=0),t===parseInt(e.substring(10,11))},p=function(e){return(e=e.replace(/\(|\)|\+|\s|-|_/g,"")).length<=11&&(e="55".concat(e)),e},g=function(e){return"BR"===(0,a.pD)()&&(e=e.replace(/\.|-|_/g,"")),e},m=function(e,t){var n=new Date(e),r=n.getDate()<10?"0".concat(n.getDate()):n.getDate(),o=n.getMonth()+1<10?"0".concat(n.getMonth()+1):n.getMonth()+1,a=n.getFullYear();return"EN"===t?"".concat(o,"/").concat(r,"/").concat(a):"".concat(r,"/").concat(o,"/").concat(a)},b=function(e){return e.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))},v=function(){var e=(0,o.PR)();return!(!e||105091!==Number(e.id_plano)&&105453!==Number(e.id_plano)&&110144!==Number(e.id_plano)&&1111!==Number(e.id_plano)&&113722!==Number(e.id_plano)&&75141!==Number(e.id_plano)&&315930!==Number(e.id_plano)&&315931!==Number(e.id_plano)&&315933!==Number(e.id_plano)&&315934!==Number(e.id_plano)&&315746!==Number(e.id_plano)&&315935!==Number(e.id_plano)&&315936!==Number(e.id_plano)&&315937!==Number(e.id_plano)&&315938!==Number(e.id_plano)&&113726!==Number(e.id_plano)&&113725!==Number(e.id_plano))},h=function(e){return!!e&&["315746","315930","315931","315933","315934","315746","315935","315936","315937","315938"].includes(e)},S=function(){var e=(0,o.PR)();e&&75141===e.id_plano&&r.hi.get("trial-register/".concat(e.email)).then((function(e){if(!e.data.exist){(0,o.__)({attribute:"id_plano",value:"8888"})}}))},y=function(){return navigator.userAgent.toLowerCase().indexOf("op")>-1?"Opera":navigator.userAgent.indexOf("MSIE")>-1?"Internet Explorer ou Edge":navigator.userAgent.indexOf("Firefox")>-1?"Mozilla Firefox":navigator.userAgent.indexOf("Epiphany")>-1?"Epiphany":navigator.userAgent.indexOf("Chrome")>-1?"Google Chome":navigator.userAgent.indexOf("Safari")>-1?"Safari":void 0},_=function(){var e=new Date;return("0"+e.getUTCDate()).slice(-2)+"/"+("0"+(e.getUTCMonth()+1)).slice(-2)+"/"+e.getUTCFullYear()+" "+("0"+(e.getUTCHours()-3)).slice(-2)+":"+("0"+e.getUTCMinutes()).slice(-2)+":"+("0"+e.getUTCSeconds()).slice(-2)},w=function(e,t){var n={pt:"de",en:"at",es:"de",de:"von",fr:"de",it:"di",ru:"\u0438\u0437",zh:"\u500b"}[t],r=new Date(e);r.setDate(r.getDate());var o=function(e,t){switch(t){case"pt":default:return["Domingo","Segunda-feira","Ter\xe7a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S\xe1bado"][e];case"en":return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e];case"de":return["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freytag","Samstag"][e];case"es":return["Sonntag","Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado"][e];case"fr":return["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][e];case"it":return["Domenica","Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabbato"][e];case"ru":return["\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435","\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a","\u0432\u0442\u043e\u0440\u043d\u0438\u043a","\u0441\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0435\u0440\u0433","\u043f\u044f\u0442\u043d\u0438\u0446\u0430","\u0441\u0443\u0431\u0431\u043e\u0442\u0430"][e];case"zh":return["\u661f\u671f\u5929","\u661f\u671f","\u661f\u671f","\u661f\u671f","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"][e]}}(r.getDay(),t),a=r.getDate(),i=function(e,t){switch(t){case"pt":default:return["Janeiro","Fevereiro","Mar\xe7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e];case"en":return["January","February","March","April","May","June","July","August","September","October","November","December"][e];case"de":return["J\xe4nner","Februar","M\xe4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"][e];case"es":return["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][e];case"it":return["Gennaio","Febbraio","Marzo","April","Maggio","Giugno","Giuglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"][e];case"fr":return["Janvier","F\xe9vrier","Mars","Avril","Mai","Juin","Juillet","Ao\xfbt","Septembre","Octobre","Novembre","D\xe9cembre"][e];case"ru":return["\u0444\u0435\u0432\u0440\u0430\u043b\u044c","\u043c\u0430\u0440\u0442","\u0430\u043f\u0440\u0435\u043b\u044c","\u043c\u0430\u0439","\u0438\u044e\u043d\u044c","\u0438\u044e\u043b\u044c","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c","\u043e\u043a\u0442\u044f\u0431\u0440\u044c","\u043d\u043e\u044f\u0431\u0440\u044c","\u0434\u0435\u043a\u0430\u0431\u0440\u044c"][e];case"zh":return["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"][e]}}(r.getMonth(),t),u=r.getFullYear();return"en"===t?" ".concat(i," ").concat(a,"th, ").concat(u):"".concat(o,", ").concat(a," ").concat(n," ").concat(i," ").concat(n," ").concat(u)},N=function(e,t,n){return t.split(".").reduce((function(e,t,r,o){if(r===o.length-1&&void 0!==n&&(e[t]=n),e)return e[t]}),e)},k=function(e){if("object"===typeof e)return e.map((function(e){switch(e){case"strategy":return 1;case"leadership-and-management":return 2;case"marketing-and-sales":return 3;case"business":return 4;case"money-and-investment":return 5;case"biographies":return 6;case"academics":return 7;case"corporative-culture":return 8;case"motivation-and-inspiration":return 9;case"communication-and-networking":return 10;case"productivity":return 11}}));switch(e){case"strategy":return 1;case"leadership-and-management":return 2;case"marketing-and-sales":return 3;case"business":return 4;case"money-and-investment":return 5;case"biographies":return 6;case"academics":return 7;case"corporative-culture":return 8;case"motivation-and-inspiration":return 9;case"communication-and-networking":return 10;case"productivity":return 11}},M=function(e){return/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(e)}}}]);