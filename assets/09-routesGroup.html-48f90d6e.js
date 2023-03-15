import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const p={},o=t(`<h1 id="routes-group" tabindex="-1"><a class="header-anchor" href="#routes-group" aria-hidden="true">#</a> routes group</h1><p>routes group 是为了管理一些相同的 URL</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
   <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// gin 的 helloWorld</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 1.创建路由</span>
   <span class="token comment">// 默认使用了 2 个中间件 Logger(), Recovery()</span>
   r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token comment">// 路由组 1 ，处理 GET 请求</span>
   v1 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">&quot;/v1&quot;</span><span class="token punctuation">)</span>
   <span class="token comment">// {} 是书写规范</span>
   <span class="token punctuation">{</span>
      v1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> login<span class="token punctuation">)</span>
      v1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;submit&quot;</span><span class="token punctuation">,</span> submit<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   v2 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">&quot;/v2&quot;</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      v2<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> login<span class="token punctuation">)</span>
      v2<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/submit&quot;</span><span class="token punctuation">,</span> submit<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">login</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">DefaultQuery</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">)</span>
   c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;hello %s\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">submit</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">DefaultQuery</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;lily&quot;</span><span class="token punctuation">)</span>
   c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;hello %s\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>httprouter 会将所有路由规则构造一颗前缀树</p></div>`,4),c=[o];function e(u,i){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","09-routesGroup.html.vue"]]);export{k as default};
