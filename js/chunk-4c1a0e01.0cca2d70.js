(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c1a0e01"],{"354b":function(t,e,n){},7052:function(t,e,n){"use strict";n("354b")},"84ac":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-progress",{attrs:{type:"circle","show-text":!1,percentage:t.progress}}),n("p",[t._v(t._s(t.et)+" / "+t._s(t.totalTime))]),n("div",{staticClass:"slider-container"},[n("el-slider",{attrs:{max:600,"show-tooltip":!1,min:0},model:{value:t.totalTime,callback:function(e){t.totalTime=e},expression:"totalTime"}})],1),n("el-button",{attrs:{type:"info"},on:{click:t.reset}},[t._v("Rest Timer")])],1)},i=[],s={name:"timer",computed:{progress:{get:function(){return Math.floor(this.et/this.totalTime*100)}}},data:function(){return{et:0,totalTime:100,counter:null}},methods:{start:function(){var t=this;this.counter=setInterval((function(){t.et<t.totalTime&&(t.et+=1)}),1e3)},clear:function(){clearInterval(this.counter)},reset:function(){this.et=0}},mounted:function(){console.log("start it"),this.start()}},r=s,a=(n("7052"),n("2877")),c=Object(a["a"])(r,o,i,!1,null,"a09a0964",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-4c1a0e01.0cca2d70.js.map