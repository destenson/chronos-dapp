
          window.__NEXT_REGISTER_PAGE('/step-3', function() {
            var comp = module.exports=webpackJsonp([5],{261:function(e,t,i){e.exports=i(262)},262:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(10),n=r(a),l=i(11),o=r(l),u=i(3),d=r(u),s=i(0),f=r(s),p=i(1),c=r(p),v=i(4),m=r(v),h=i(5),b=r(h),g=i(2),y=r(g),_=i(43),P=r(_),k=i(263),I=r(k),x=function(e){function t(){return(0,f.default)(this,t),(0,m.default)(this,(t.__proto__||(0,d.default)(t)).apply(this,arguments))}return(0,b.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){return y.default.createElement(P.default,this.props,y.default.createElement(I.default,null))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,o.default)(n.default.mark(function e(t){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",P.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(y.default.Component);t.default=x},263:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,i,r){i&&(0,s.default)(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,l,o,u,d=i(19),s=r(d),f=i(24),p=r(f),c=i(3),v=r(c),m=i(0),h=r(m),b=i(1),g=r(b),y=i(4),_=r(y),P=i(5),k=r(P),I=i(2),x=r(I),M=i(26),z=i(25),D=i(55),E=r(D),w=i(56),N=r(w),j=(n=(0,z.inject)("store"))(l=(0,z.observer)((o=function(e){function t(e){(0,h.default)(this,t);var i=(0,_.default)(this,(t.__proto__||(0,v.default)(t)).call(this,"CONTRACT_SETUP",e));return a(i,"_validations",u,i),i.properties=(0,p.default)(i.properties,{maxAddresses:(0,p.default)(i.properties.maxAddresses,{validator:i.isGreaterThanZero}),startingId:(0,p.default)(i.properties.startingId,{validator:i.validateDigit}),totalMintingId:(0,p.default)(i.properties.totalMintingId,{validator:i.validateDigit}),teamLockPeriod:(0,p.default)(i.properties.teamLockPeriod,{validator:i.validateDigit}),postDeploymentMaxIds:(0,p.default)(i.properties.postDeploymentMaxIds,{validator:i.validateDigit}),minimumBalance:(0,p.default)(i.properties.minimumBalance,{validator:i.validateDigit})}),i}return(0,k.default)(t,e),(0,g.default)(t,[{key:"getValidations",value:function(){return this._validations}},{key:"render",value:function(){return x.default.createElement(N.default,{activeStepKey:this.activeStepKey,onNext:this.goNext},x.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.maxAddresses,{side:"left"}),this.renderProperty(this.properties.startingId,{side:"right"})),x.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.totalMintingId,{side:"left"}),this.renderProperty(this.properties.teamLockPeriod,{side:"right"})),x.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.postDeploymentMaxIds,{side:"left"}),this.renderProperty(this.properties.minimumBalance,{side:"right"})))}}]),t}(E.default),u=function(e,t,i,r,a){var n={};return Object.keys(r).forEach(function(e){n[e]=r[e]}),n.enumerable=!!n.enumerable,n.configurable=!!n.configurable,("value"in n||n.initializer)&&(n.writable=!0),n=i.slice().reverse().reduce(function(i,r){return r(e,t,i)||i},n),a&&void 0!==n.initializer&&(n.value=n.initializer?n.initializer.call(a):void 0,n.initializer=void 0),void 0===n.initializer&&(Object.defineProperty(e,t,n),n=null),n}(o.prototype,"_validations",[M.observable],{enumerable:!0,initializer:function(){return{maxAddresses:!0,startingId:!0,totalMintingId:!0,teamLockPeriod:!0,postDeploymentMaxIds:!0,minimumBalance:!0}}}),l=o))||l)||l;t.default=j}},[261]);
            return { page: comp.default }
          })
        