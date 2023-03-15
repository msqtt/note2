import{_ as n,p as s,q as a,a1 as o}from"./framework-7db056f4.js";const t={},e=o(`<h1 id="cookie-的使用" tabindex="-1"><a class="header-anchor" href="#cookie-的使用" aria-hidden="true">#</a> Cookie 的使用</h1><ul><li>测试服务端发送 cookie 给客户端，客户端请求时携带 cookie</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
   <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 1.创建路由</span>
   <span class="token comment">// 默认使用了 2 个中间件 Logger(), Recovery()</span>
   r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token comment">// 服务端要给客户端 cookie</span>
   r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;cookie&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 获取客户端是否携带 cookie</span>
      cookie<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Cookie</span><span class="token punctuation">(</span><span class="token string">&quot;key_cookie&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
         cookie <span class="token operator">=</span> <span class="token string">&quot;NotSet&quot;</span>
         <span class="token comment">// 给客户端设置 cookie</span>
         <span class="token comment">//  maxAge int, 单位为秒</span>
         <span class="token comment">// path,cookie 所在目录</span>
         <span class="token comment">// domain string,域名</span>
         <span class="token comment">//   secure 是否智能通过 https 访问</span>
         <span class="token comment">// httpOnly bool  是否允许别人通过 js 获取自己的 cookie</span>
         c<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span><span class="token string">&quot;key_cookie&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value_cookie&quot;</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;cookie 的值是： %s\\n&quot;</span><span class="token punctuation">,</span> cookie<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
   r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Cookie 的缺点，不安全，明文，增加带宽消耗，可以被禁用，cookie 有上限</p></blockquote>`,4),c=[e];function p(i,l){return s(),a("div",null,c)}const k=n(t,[["render",p],["__file","23-Cookie使用.html.vue"]]);export{k as default};
