(this.webpackJsonpenglish_study=this.webpackJsonpenglish_study||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(4),o=n.n(c),l=(n(16),n(5)),r=n(6),s=n(1),d=n(9),u=n(10),p=n(7),m=n.n(p),h=n(8),f=n.n(h),v=(n(17),n(2)),g=n.n(v),k=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).GetCSV=function(){var e=new XMLHttpRequest;e.open("get","tango.csv",!0),e.send(null),e.onload=function(){f.a.parse(e.responseText,{header:!0,delimiter:",",complete:function(e){console.log(e.data),a.convertCSVtoArray(e.data)}})}},a.SetNextWord=function(e){var t=Math.floor(Math.random()*(e.length+1));a.setState({English:e[t].English}),a.setState({Japanese:e[t].Japanese})},a.convertCSVtoArray=function(e){a.setState({Tango:e}),a.SetNextWord(e)},a.nextClick=function(e){var t=a.state.Tango;a.state.isFlipped?(document.getElementById("card").style.visibility="hidden",e.preventDefault(),a.setState((function(e){return{isFlipped:!e.isFlipped}})),setTimeout((function(){a.SetNextWord(t),document.getElementById("card").style.visibility="visible"}),300)):a.SetNextWord(t)},a.state={isFlipped:!1,Tango:void 0,English:"",Japanese:""},a.handleClick=a.handleClick.bind(Object(s.a)(a)),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.GetCSV()}},{key:"handleClick",value:function(e){e.preventDefault(),this.setState((function(e){return{isFlipped:!e.isFlipped}}))}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h1",{className:"TangoDaimei"},"\u5358\u8a9e\u9577\u30a2\u30d7\u30ea"),i.a.createElement("div",{className:"cardPlace"},i.a.createElement(m.a,{isFlipped:this.state.isFlipped,flipSpeedFrontToBack:1,flipSpeedBackToFront:1,flipDirection:"vertical",infinite:"true",width:"300px"},i.a.createElement("div",{id:"card"},i.a.createElement("img",{id:"card",src:g.a,onClick:this.handleClick,className:"cardSize"}),i.a.createElement("p",null,this.state.English)),i.a.createElement("div",{id:"card"},i.a.createElement("img",{id:"card",src:g.a,onClick:this.handleClick,className:"cardSize"}),i.a.createElement("p",null,this.state.Japanese))),i.a.createElement("button",{className:"NextButton",onClick:this.nextClick},"\u6b21\u306e\u5358\u8a9e\u3078")))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},2:function(e,t,n){e.exports=n.p+"static/media/BlankCard.4cdd3cb6.png"}},[[11,1,2]]]);
//# sourceMappingURL=main.13e411ea.chunk.js.map