"use strict";(self.webpackChunksociety_connect=self.webpackChunksociety_connect||[]).push([[138],{6138:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var n=a(4165),s=a(5861),c=a(9439),r=a(7313),i=a(8467),o=a(5054),u=a(271),l=a(2524),d=a(6417);var h=(0,r.memo)((function(e){var t=e.message,a=e.preview,n=new Date(t.timestamp).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}),s="messageBox ".concat(t.author===localStorage.user?"self":"other"," ").concat(a?"preview":""),c=t.file,r=c.url,i=c.height,o=c.width,u={"--url":'url("'.concat(r,'")'),"--ratio":"".concat(i/o*100,"%")};return(0,d.jsxs)("div",{className:s,children:[t.file.url&&(0,d.jsx)("div",{className:"img",style:u}),t.message&&(0,d.jsx)("p",{children:t.message}),(0,d.jsx)("span",{className:"timestamp",children:n})]},t.id)})),m=(0,r.memo)((function(e){var t=e.account,a=(0,i.s0)();return(0,d.jsxs)("nav",{children:[(0,d.jsx)(l.JO,{icon:"material-symbols:arrow-back-ios-new-rounded",onClick:function(){return a(-1)}}),(0,d.jsxs)("div",{className:"account",children:[(0,d.jsx)("div",{className:"PFP",style:{"--pfp":"url(".concat(t.PFP,")")}}),(0,d.jsx)("h1",{children:t.username})]})]})})),f=function(){var e=(0,r.useState)(o.TT),t=(0,c.Z)(e,2),a=t[0],f=t[1],g=(0,r.useState)([]),p=(0,c.Z)(g,2),v=p[0],x=p[1],j=(0,r.useState)(!1),w=(0,c.Z)(j,2),y=w[0],k=w[1],b=(0,r.useRef)(),S=(0,r.useState)(""),F=(0,c.Z)(S,2),P=F[0],N=F[1],Z=(0,r.useState)({url:"",height:0,width:0}),C=(0,c.Z)(Z,2),U=C[0],M=C[1],E=(0,r.useState)(null),I=(0,c.Z)(E,2),T=I[0],D=I[1],O=(0,i.UO)().id,R=[localStorage.user,O].sort(),Y="messages/".concat(R[0],"|").concat(R[1]);(0,r.useEffect)((function(){var e;"society"!==O&&"building"!==O?(0,o.dX)("accounts/".concat(O)).then((function(e){var t=e.val();t.id=e.key,f(t)})):f({username:(e=O,e.substring(0,1).toUpperCase()+e.substring(1)),PFP:"https://media.istockphoto.com/id/935695192/vector/office-building-outline-icon-pixel-perfect.jpg?s=170667a&w=0&k=20&c=A3-wNyF3DOdmRYYb_FI-4mY3jCog0jI0Mb6ijLFU7YY="})}),[O]),(0,r.useEffect)((function(){(0,o._l)(Y,(function(e){if(e.exists()){k(!1);var t=[];e.forEach((function(e){var a=e.val();a.id=e.key,t.push((0,o.dX)("accounts/".concat(a.author,"/PFP")).then((function(e){return a.PFP=e.val(),a})))})),Promise.all(t).then(x)}else k(!0)}))}),[O,Y]);var L,_=function(){var e=(0,s.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==P||U.url){e.next=2;break}return e.abrupt("return");case 2:b.current.value="",(t=o.VM).message=P,t.author=localStorage.user,t.timestamp=u.Z.database.ServerValue.TIMESTAMP,U.url&&(t.file={url:"https://singlecolorimage.com/get/4ade80/".concat(U.width,"x").concat(U.height),height:U.height,width:U.width}),(0,o.p$)(Y,t).then((function(e){if(N(""),M({}),D(null),U.url){var t=o.$k.child("".concat(R[0],"|").concat(R[1],"/").concat(e.key));t.put(T).then((function(){return t.getDownloadURL()})).then((function(t){return(0,o.l4)("".concat(Y,"/").concat(e.key,"/file/url"),t)}))}}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,d.jsxs)("div",{className:"chatPage",children:[(0,d.jsx)(m,{account:a}),(0,d.jsxs)("div",{className:"messages",children:[y&&(0,d.jsx)("h1",{className:"firstMessageHeader",children:"Send the first message!! \ud83d\ude0a"}),v.map((function(e){return(0,d.jsx)(h,{message:e},e.id)})),(U.url||P)&&(0,d.jsx)(h,{message:{message:P,timestamp:Date.now(),file:U,author:localStorage.user},preview:!0})]}),(0,d.jsxs)("div",{className:"messageInput",children:[(0,d.jsx)("button",{className:"addFile",onClick:function(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.onchange=function(e){var t=e.target.files[0];if(t){if(t.size>1e7)return alert("File too large! (Max 10MB)");if(!t.type.includes("image"))return alert("File is not an image!");D(t),console.log("File validated");var a=new FileReader;a.onload=function(e){console.log("File read!");var t=new Image;t.onload=function(){console.log("Image dimensions aquired!"),M({url:e.target.result,height:t.height,width:t.width})},t.src=e.target.result},a.readAsDataURL(t)}},e.click()},children:(0,d.jsx)(l.JO,{icon:"material-symbols:attach-file-add-rounded"})}),(0,d.jsx)("input",{type:"text",placeholder:"Type a message",onKeyUp:(L=_,function(e){"Enter"===e.key&&L()}),onKeyUpCapture:function(){N(b.current.value)},ref:b}),(0,d.jsx)("button",{className:"send",onClick:_,children:(0,d.jsx)(l.JO,{icon:"carbon:send-filled"})})]})]})}}}]);