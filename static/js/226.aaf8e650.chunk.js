"use strict";(self.webpackChunksociety_connect=self.webpackChunksociety_connect||[]).push([[226],{8226:function(e,s,n){n.r(s),n.d(s,{default:function(){return t}});var r=n(9439),l=n(7313),i=n(5054),a=n(8467),c=n(6417);var t=function(){var e=(0,l.useRef)(null),s=(0,l.useRef)(null),n=(0,l.useRef)(null),t=(0,l.useRef)(null),o=(0,a.s0)();return(0,l.useEffect)((function(){o&&(0,i.jl)().then((function(e){return e&&o("/gossip")}))}),[o]),(0,c.jsxs)("div",{className:"login_page",style:{height:"100%"},children:[(0,c.jsxs)("div",{className:"formBox",children:[(0,c.jsx)("img",{src:"/society-connect"+(window.matchMedia("(prefers-color-scheme: dark)").matches?"/logoDark.png":"/logo.png"),className:"h-20",alt:"Page Logo"}),(0,c.jsx)("h1",{className:"text-4xl font-bold",children:"Society Connect"}),(0,c.jsxs)("div",{className:"inputContainer",children:[(0,c.jsxs)("div",{className:"inputWrapper",children:[(0,c.jsx)("input",{ref:e,placeholder:"Ex: B404"}),(0,c.jsx)("label",{children:"Flat No"})]}),(0,c.jsx)("p",{className:"error hidden",ref:s,children:"Invalid building Name"})]}),(0,c.jsxs)("div",{className:"inputContainer",children:[(0,c.jsxs)("div",{className:"inputWrapper",children:[(0,c.jsx)("input",{id:"password",ref:n,placeholder:" ",type:"password"}),(0,c.jsx)("label",{htmlFor:"password",children:"Password"})]}),(0,c.jsx)("p",{className:"error hidden",ref:t,children:"Invalid Password"})]}),(0,c.jsx)("div",{className:"w-full flex justify-end",children:(0,c.jsx)("button",{onClick:function(){i.DB.ref("accounts").orderByChild("building").equalTo(e.current.value).once("value").then((function(e){if(!e.exists())return s.current.classList.remove("hidden");s.current.classList.add("hidden"),e.numChildren()>1&&console.log("There is more than 1 match!");var l=(0,r.Z)(Object.entries(e.val())[0],2),i=l[0];l[1].password===n.current.value?(localStorage.setItem("user",i),o("/gossip")):t.current.classList.remove("hidden")}))},children:"Log In"})})]}),(0,c.jsx)("p",{children:"In case of queries regarding log in details please approch the moderator in B-404"})]})}}}]);