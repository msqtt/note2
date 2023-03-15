import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const e={},p=t(`<h1 id="实现控制和路由" tabindex="-1"><a class="header-anchor" href="#实现控制和路由" aria-hidden="true">#</a> 实现控制和路由</h1><h2 id="控制器-controller" tabindex="-1"><a class="header-anchor" href="#控制器-controller" aria-hidden="true">#</a> 控制器 controller</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> handler

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;blog/dao&quot;</span>
	<span class="token string">&quot;blog/model&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">AddUser</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> user model<span class="token punctuation">.</span>User
	<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	dao<span class="token punctuation">.</span>Mgr<span class="token punctuation">.</span><span class="token function">AddUser</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ListUser</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span><span class="token function">HTML</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;user.html&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由-router" tabindex="-1"><a class="header-anchor" href="#路由-router" aria-hidden="true">#</a> 路由 router</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> router

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;blog/handler&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	e <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	e<span class="token punctuation">.</span><span class="token function">LoadHTMLGlob</span><span class="token punctuation">(</span><span class="token string">&quot;templates/*&quot;</span><span class="token punctuation">)</span>
	e<span class="token punctuation">.</span><span class="token function">Static</span><span class="token punctuation">(</span><span class="token string">&quot;/assets&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./assets&quot;</span><span class="token punctuation">)</span>
	e<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/user&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">.</span>ListUser<span class="token punctuation">)</span>
	e<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/user&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">.</span>AddUser<span class="token punctuation">)</span>
	e<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:80&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[p];function c(i,u){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","03-Gin实现控制和路由.html.vue"]]);export{r as default};
