"use strict";(self.webpackChunkweather_app=self.webpackChunkweather_app||[]).push([[173],{173:(n,e,t)=>{t.r(e),t.d(e,{default:()=>Cn});var i=t(528),r=t(43),s=t(464),a=t(870);const c=t.p+"static/media/thunderstorm.6f61b857d4cba052a96008ef9fd4c72e.svg";const d=t.p+"static/media/drizzle.1b0c3d0bb2cc149172fcafe904c94a83.svg";const l=t.p+"static/media/rain.a2ae28cb85674de4fbd9f848ec4e7783.svg";const o=t.p+"static/media/snow.f973c513e7ca01b72039e94e0b5468e4.svg";const m=t.p+"static/media/fog.8e2b7f59f939fea383b57e2e8f57acd8.svg";const h=t.p+"static/media/sun.2f1b114e6806eb90c254319a5e36bcb4.svg";const f=t.p+"static/media/sunCloud.c272f0b6d94d78db08888f018d04ff79.svg";function g(n){let e=0;return n>=200&&n<=232?e=1:n>=300&&n<=321?e=2:n>=500&&n<=531?e=3:n>=600&&n<=622?e=4:n>=701&&n<=781?e=5:800===n?e=6:n>=801&&n<=804&&(e=7),{1:c,2:d,3:l,4:o,5:m,6:h,7:f}[e]}var x,u,p,w,b=t(579);const y=()=>{const{selectedForecast:n,activeIndex:e}=(0,a.G)((n=>n.weather));if(!n||0===n.length)return(0,b.jsx)(A,{children:"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u043e\u0433\u043e\u0434\u0435"});const t=n[e],i=Math.trunc(t.main.temp),r=(i>0?"+"+i:i)+"\xb0",s=g(t.weather[0].id),c=t.weather[0].description;return(0,b.jsxs)(A,{children:[(0,b.jsx)(v,{src:s,alt:"\u041f\u043e\u0433\u043e\u0434\u0430 \u0441\u0435\u0439\u0447\u0430\u0441"}),(0,b.jsx)(D,{children:r}),(0,b.jsx)(j,{children:c})]})},A=s.Ay.div(x||(x=(0,i.A)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    min-height: 100%;\n    margin-right: 2rem;\n\n    @media (max-width: 440px) {\n        margin-right: 0;\n    }\n"]))),v=s.Ay.img(u||(u=(0,i.A)(["\n    width: 14rem;\n"]))),j=s.Ay.p(p||(p=(0,i.A)(["\n    font-size: 1.4rem;\n"]))),D=s.Ay.p(w||(w=(0,i.A)(["\n    margin-top: 0.5rem;\n    font-size: 2.5rem;\n    font-weight: 600;\n"])));var $=t(609);const z=t.p+"static/media/cloudiness.f4ecc97bc418b91261bf76e73fa22877.svg";const F=t.p+"static/media/humidity.d2a49d9663ea687c621ba0bb7ce0dddd.svg";const k=t.p+"static/media/pressure.f7a0346770f415c7a4ac80651d0b17a2.svg";const L=t.p+"static/media/wind.2c671cac8ffc31f33d2a41179b4ba244.svg";const S=t.p+"static/media/windDirection.7b7df0de8a2b1d4b36c92a5fa59b42a0.svg";const C=t.p+"static/media/precipitation.9b6b3b5a5618be195f7f249483e6cbc6.svg";var E,G,I,M,_,P,H,T,W;const R=()=>{const{selectedForecast:n,activeIndex:e}=(0,a.G)((n=>n.weather));if(!n||0===n.length)return(0,b.jsx)(q,{children:"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u043e \u043f\u043e\u0433\u043e\u0434\u0435"});const t=n[e],i=Math.trunc(t.main.feels_like),r=(i>0?"+"+i:i)+"\xb0",s=t.wind.deg,{windDirection:c,transformDeg:d}=function(n){const e={windDirection:"",transformDeg:0};return n>=337.5||n<22.5?(e.windDirection="\u0421",e.transformDeg=180):n>=22.5&&n<67.5?(e.windDirection="\u0421\u0412",e.transformDeg=225):n>=67.5&&n<112.5?(e.windDirection="\u0412",e.transformDeg=270):n>=112.5&&n<157.5?(e.windDirection="\u042e\u0412",e.transformDeg=315):n>=157.5&&n<202.5?(e.windDirection="\u042e",e.transformDeg=0):n>=202.5&&n<247.5?(e.windDirection="\u042e\u0417",e.transformDeg=45):n>=247.5&&n<292.5?(e.windDirection="\u0417",e.transformDeg=90):n>=292.5&&n<337.5&&(e.windDirection="\u0421\u0417",e.transformDeg=135),e}(s),l=t.wind.speed.toFixed(1)+" \u043c/\u0441, "+c,o=t.wind.gust.toFixed(1)+" \u043c/\u0441",m=t.main.humidity+"%",h=Math.round(.750062*t.main.grnd_level)+" \u043c\u043c. \u0440\u0442. \u0441\u0442.",f=100*t.pop+"%",g=t.clouds.all+"%",x=[{id:0,title:"\u0432\u043b\u0430\u0436\u043d\u043e\u0441\u0442\u044c",src:F,alt:"\u0412\u043b\u0430\u0436\u043d\u043e\u0441\u0442\u044c",text:m},{id:1,title:"\u0434\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043d\u0430 \u0443\u0440\u043e\u0432\u043d\u0435 \u0437\u0435\u043c\u043b\u0438",src:k,alt:"\u0414\u0430\u0432\u043b\u0435\u043d\u0438\u0435",text:h},{id:2,title:"\u0432\u0435\u0440\u043e\u044f\u0442\u043d\u043e\u0441\u0442\u044c \u043e\u0441\u0430\u0434\u043a\u043e\u0432",src:C,alt:"\u0412\u0435\u0440\u043e\u044f\u0442\u043d\u043e\u0441\u0442\u044c \u043e\u0441\u0430\u0434\u043a\u043e\u0432",text:f},{id:3,title:"\u043e\u0431\u043b\u0430\u0447\u043d\u043e\u0441\u0442\u044c",src:z,alt:"\u041e\u0431\u043b\u0430\u0447\u043d\u043e\u0441\u0442\u044c",text:g}];return(0,b.jsx)(q,{children:(0,b.jsxs)(B,{children:[(0,b.jsx)(J,{children:(0,b.jsxs)(O,{children:["\u043e\u0449\u0443\u0449\u0430\u0435\u0442\u0441\u044f \u043a\u0430\u043a ",(0,b.jsx)(N,{children:r})]})}),(0,b.jsxs)(J,{title:"\u0441\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0432\u0435\u0442\u0440\u0430",children:[(0,b.jsxs)(Q,{children:[(0,b.jsx)(K,{src:L,alt:"\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0432\u0435\u0442\u0440\u0430"}),(0,b.jsxs)(O,{children:[l,(0,b.jsx)(V,{src:S,alt:"\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0432\u0435\u0442\u0440\u0430",$transformDeg:d})]})]}),(0,b.jsxs)(U,{children:["\u043f\u043e\u0440\u044b\u0432\u044b \u0434\u043e ",o]})]}),x.map((n=>(0,b.jsxs)(J,{title:n.title,children:[(0,b.jsx)(K,{src:n.src,alt:n.alt}),(0,b.jsx)(O,{children:n.text})]},n.id)))]})})},q=s.Ay.div(E||(E=(0,i.A)(["\n    display: flex;\n    height: 100%;\n    margin-top: 1rem;\n\n    @media (max-width: 440px) {\n        width: 100%;\n        justify-content: center;\n    }\n"]))),B=s.Ay.ul(G||(G=(0,i.A)(["\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    @media (max-width: 440px) {\n        display: grid;\n        grid-template-columns: repeat(2, 1fr);\n        grid-template-rows: repeat(3, 1fr);\n        gap: 0.4rem;\n        justify-items: center;\n        align-items: center;\n    }\n"]))),J=s.Ay.li(I||(I=(0,i.A)(["\n    display: flex;\n    align-items: center;\n    margin-bottom: 1rem;\n\n    &:nth-last-child(1) {\n        margin-bottom: 0rem;\n    }\n\n    &:nth-child(2) {\n        flex-direction: column;\n        align-items: flex-start;\n    }\n\n    &:nth-last-child(1) {\n        margin-bottom: 0rem;\n        grid-column: span 2;\n    }\n\n    @media (max-width: 440px) {\n        margin-bottom: 0;\n\n        &:nth-child(1) {\n            grid-column: span 2;\n        }\n    }\n"]))),K=s.Ay.img(M||(M=(0,i.A)(["\n    width: 2.4rem;\n    margin-right: 0.5rem;\n"]))),N=s.Ay.span(_||(_=(0,i.A)(["\n    margin-left: 0.3rem;\n    font-weight: 600;\n"]))),O=s.Ay.span(P||(P=(0,i.A)(["\n    display: flex;\n    align-items: center;\n    font-size: 1.1rem;\n"]))),Q=s.Ay.div(H||(H=(0,i.A)(["\n    display: flex;\n    align-items: center;\n"]))),U=s.Ay.p(T||(T=(0,i.A)(["\n    font-size: 1.05rem;\n"]))),V=s.Ay.img(W||(W=(0,i.A)(["\n    width: 0.7rem;\n    margin-left: 0.2rem;\n    transform: rotate(","deg);\n"])),(n=>{let{$transformDeg:e}=n;return e}));var X,Y,Z,nn,en,tn=t(277),rn=t(541);const sn=()=>{const n=(0,tn.j)(),{selectedForecast:e,activeIndex:t}=(0,a.G)((n=>n.weather));if(!e)return null;return(0,b.jsx)(b.Fragment,{children:e.map(((i,r)=>(0,b.jsxs)(an,{$isActive:t===r,onClick:()=>(t=>{n((0,rn.rS)(t)),n((0,rn.P)(e)),window.scrollTo({top:0,behavior:"smooth"})})(r),children:[(0,b.jsx)(cn,{children:i.dt_txt.split(" ")[1].slice(0,5)}),(0,b.jsx)(dn,{src:g(i.weather[0].id),alt:"\u0422\u0438\u043f \u043f\u043e\u0433\u043e\u0434\u044b"}),(0,b.jsx)(ln,{children:Math.trunc(i.main.temp)+"\xb0"}),(0,b.jsx)(on,{children:i.weather[0].description})]},i.dt)))})},an=s.Ay.div(X||(X=(0,i.A)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: center;\n    min-width: 8.1rem;\n    height: 11rem;\n    border: 0.1rem solid ",";\n    border-radius: 1rem;\n    padding: 0.5rem;\n    cursor: pointer;\n    transition: border 0.3s ease-in-out;\n\n    &:hover {\n        border-color: lightgreen;\n    }\n\n    &:nth-last-child(1) {\n        margin-right: 0.9rem;\n    \n        @media (max-width: 480px) {\n            margin-right: 0;   \n        }\n    }\n        \n    &:nth-child(1) {\n        margin-left: 1.2rem;\n\n        @media (max-width: 480px) {\n            margin-left: 0;   \n        }\n    }\n\n        @media (max-width: 480px) {\n            flex-direction: row;\n            justify-content: space-around;\n            width: 100%;\n            height: auto;\n            padding: 1rem;\n        }\n"])),(n=>{let{$isActive:e}=n;return e?"green":"gray"})),cn=s.Ay.p(Y||(Y=(0,i.A)(["\n    font-size: 1rem;\n"]))),dn=s.Ay.img(Z||(Z=(0,i.A)(["\n    width: 4.5rem;\n"]))),ln=s.Ay.p(nn||(nn=(0,i.A)(["\n    font-size: 1rem;\n    font-weight: 600;\n\n    @media (max-width: 480px) {\n        margin-bottom: 0.5rem;\n    }\n"]))),on=s.Ay.p(en||(en=(0,i.A)(["\n    width: 5.5rem;\n    text-align: center;\n    font-size: 0.9rem;\n"])));var mn,hn,fn,gn;const xn=n=>{let{sliderSection:e}=n;const[t,i]=(0,r.useState)(0),[s,c]=(0,r.useState)(0),[d,l]=(0,r.useState)(0),[o,m]=(0,r.useState)(!1),h=(0,r.useCallback)((()=>{const n=parseFloat(getComputedStyle(document.documentElement).fontSize);c(3*(10*n))}),[]),f=(0,r.useCallback)((()=>{e.current&&l(e.current.scrollWidth-e.current.clientWidth)}),[e]);(0,r.useEffect)((()=>(h(),f(),window.addEventListener("resize",h),window.addEventListener("resize",f),()=>{window.removeEventListener("resize",h),window.removeEventListener("resize",f)})),[h,f]),(0,r.useEffect)((()=>{e.current&&e.current.scrollTo({left:t,behavior:"smooth"}),m(t>=d)}),[t,d,e]);const g=(0,r.useCallback)((n=>{i((e=>{const t="left"===n?e-s:e+s;return Math.max(0,Math.min(t,d))}))}),[s,d]),{selectedForecast:x}=(0,a.G)((n=>n.weather)),u=null===x||void 0===x?void 0:x.length;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(pn,{$selectedForecastLength:u,$scrollPosition:t,onClick:()=>g("left"),children:(0,b.jsx)(bn,{children:"\u2039"})}),(0,b.jsx)(wn,{$selectedForecastLength:u,$isLastSlide:o,onClick:()=>g("right"),children:(0,b.jsx)(bn,{children:"\u203a"})})]})},un=(0,s.AH)(mn||(mn=(0,i.A)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    top: 31.5rem;\n    height: 10rem;\n    width: 1.2rem;\n    background: #e4e3e9;\n    border-radius: 0.5rem;\n    cursor: pointer;\n    z-index: 1;\n\n    @media (max-width: 480px) {\n        display: none;\n    }\n"]))),pn=s.Ay.div(hn||(hn=(0,i.A)(["\n    ",";\n    left: 0;\n\n    ","\n\n    ","\n"])),un,(n=>{let{$scrollPosition:e}=n;return 0===e&&"\n        display: none;\n    "}),(n=>{let{$selectedForecastLength:e}=n;return(e||0)<=3&&"\n        display: none;\n    "})),wn=s.Ay.div(fn||(fn=(0,i.A)(["\n    ",";\n    right: 0;\n\n    ","\n\n    ","\n"])),un,(n=>{let{$isLastSlide:e}=n;return e&&"\n        display: none;\n    "}),(n=>{let{$selectedForecastLength:e}=n;return(e||0)<=3&&"\n        display: none;\n    "})),bn=s.Ay.button(gn||(gn=(0,i.A)(["\n    height: 100%;\n    width: 100%;\n    font-size: 1.8rem;\n    background: transparent;\n"])));var yn,An;const vn=()=>{const n=(0,r.useRef)(null),{selectedForecast:e}=(0,a.G)((n=>n.weather));if(!e)return null;const t=e.length;return(0,b.jsxs)(jn,{children:[(0,b.jsx)(xn,{sliderSection:n}),(0,b.jsx)(Dn,{ref:n,$selectedForecastLength:t,children:(0,b.jsx)(sn,{})})]})},jn=s.Ay.section(yn||(yn=(0,i.A)(["\n    display: flex;\n    margin-top: 2.5rem;\n    margin-bottom: 1rem;\n    width: 100%;\n\n    @media (max-width: 480px) {\n        margin-bottom: 0;\n    }\n"]))),Dn=s.Ay.section(An||(An=(0,i.A)(["\n    display: flex;\n    overflow-x: hidden;\n    scrollbar-width: none;\n    scroll-behavior: smooth;\n    width: 100%;\n    gap: 2rem;\n\n    @media (max-width: 480px) {\n        flex-direction: column;\n        gap: 1.5rem;\n        overflow-x: visible;\n    }\n\n    ","\n"])),(n=>{let{$selectedForecastLength:e}=n;return(e||0)<=3&&"justify-content: center;"}));var $n;const zn=()=>{const{data:n}=(0,a.G)((n=>n.weather));if(n)return(0,b.jsx)(Fn,{children:null===n||void 0===n?void 0:n.city.name})},Fn=s.Ay.h1($n||($n=(0,i.A)(["\n    font-size: 2.5rem;\n    text-align: center;\n    margin: 2rem 0;\n    letter-spacing: 0.1rem;\n"])));var kn,Ln,Sn;const Cn=n=>{let{fadeIn:e}=n;const{loading:t,successfully:i}=(0,a.G)((n=>n.weather));return t?(0,b.jsx)($.A,{}):(0,b.jsxs)(En,{$successfully:i,$fadeIn:e,children:[(0,b.jsx)(zn,{}),(0,b.jsxs)(Gn,{children:[(0,b.jsx)(y,{}),(0,b.jsx)(R,{})]}),(0,b.jsx)(vn,{})]})},En=s.Ay.section(kn||(kn=(0,i.A)(["\n    display: ",";\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: center;\n    flex-wrap: wrap;\n    padding: 1rem;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    scale: 0;\n    transition: 0.5s linear;\n    position: relative;\n\n     ","\n\n    @media (max-width: 440px) {\n        justify-content: center;\n    }\n"])),(n=>{let{$successfully:e}=n;return e?"flex":"none"}),(n=>{let{$successfully:e,$fadeIn:t}=n;return e&&(0,s.AH)(Ln||(Ln=(0,i.A)([" // \u0434\u043b\u044f \u0438\u043d\u0442\u0435\u0440\u043f\u043e\u043b\u044f\u0446\u0438\u0438\n            animation: 0.5s "," forwards;\n    "])),t)})),Gn=s.Ay.div(Sn||(Sn=(0,i.A)(["\n    display: flex;\n\n    @media (max-width: 440px) {\n        flex-direction: column;\n    }\n"])))}}]);
//# sourceMappingURL=173.e1091653.chunk.js.map