import{_ as t,M as e,p as o,q as p,R as n,t as s,N as c,a1 as i}from"./framework-7db056f4.js";const u={},l=n("h1",{id:"基本路由",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#基本路由","aria-hidden":"true"},"#"),s(" 基本路由")],-1),r=n("p",null,"gin 框架中采用的路由库是基于 httprouter 做的",-1),d={href:"https://github.com/julienschmidt/httprouter",target:"_blank",rel:"noopener noreferrer"},k=i(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;net/http&quot;</span>

    <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;hello word&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/xxxpost&quot;</span><span class="token punctuation">,</span>getting<span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">PUT</span><span class="token punctuation">(</span><span class="token string">&quot;/xxxput&quot;</span><span class="token punctuation">)</span>
    <span class="token comment">//监听端口默认为 8080</span>
    r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function v(m,_){const a=e("ExternalLinkIcon");return o(),p("div",null,[l,r,n("p",null,[s("地址为："),n("a",d,[s(" https://github.com/julienschmidt/httprouter "),c(a)])]),k])}const h=t(u,[["render",v],["__file","02-基本路由.html.vue"]]);export{h as default};
