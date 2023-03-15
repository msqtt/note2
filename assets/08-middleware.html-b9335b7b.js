import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const t={},p=e(`<h1 id="http-middleware" tabindex="-1"><a class="header-anchor" href="#http-middleware" aria-hidden="true">#</a> http/Middleware</h1><h2 id="什么是中间件" tabindex="-1"><a class="header-anchor" href="#什么是中间件" aria-hidden="true">#</a> 什么是中间件</h2><p>Go 语言中 Middleware 在 Handle 前，因此有：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[请求] --&gt; [Middleware] --&gt; [Handle]
[响应] &lt;-- [Middleware] &lt;-- [Handle]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建中间件" tabindex="-1"><a class="header-anchor" href="#创建中间件" aria-hidden="true">#</a> 创建中间件</h2><p>前情提要：</p><ul><li><code>func ListenAndServe(add string, handler Handler) error</code><ul><li>handler 如果是 nil: <code>DefaultServeMux</code></li></ul></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Handler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">ServeHttp</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 中间件既实现了Handler接口，其字段也是Handler, 类似链表，可以把多个中间件串起来</span>
<span class="token keyword">type</span> MyMiddleware <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Next http<span class="token punctuation">.</span>Handler
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m MyMiddleware<span class="token punctuation">)</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在next handler 之前做事</span>
    m<span class="token punctuation">.</span>next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
    <span class="token comment">// 在 next handler 之后做事</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中间件用途" tabindex="-1"><a class="header-anchor" href="#中间件用途" aria-hidden="true">#</a> 中间件用途</h2><ul><li>Logging</li><li>安全</li><li>请求超时</li><li>响应压缩</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> middleware

<span class="token keyword">import</span> <span class="token string">&quot;net/http&quot;</span>

<span class="token keyword">type</span> AuthMiddleware <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Next http<span class="token punctuation">.</span>Handler
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>am <span class="token operator">*</span>AuthMiddleware<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> am<span class="token punctuation">.</span>Next <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        am<span class="token punctuation">.</span>Next <span class="token operator">=</span> http<span class="token punctuation">.</span>DefaultServeMux
    <span class="token punctuation">}</span>
    auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> auth <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
        am<span class="token punctuation">.</span>Next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// main.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;net/http&quot;</span>
    <span class="token string">&quot;middleware&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/companies&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        c <span class="token operator">:=</span> Company <span class="token punctuation">{</span>
            ID<span class="token punctuation">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
            Name<span class="token punctuation">:</span> <span class="token string">&quot;Google&quot;</span><span class="token punctuation">,</span>
            Country<span class="token punctuation">:</span> <span class="token string">&quot;USA&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
        enc <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
        enc<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token function">new</span><span class="token punctuation">(</span>middleware<span class="token punctuation">.</span>AuthMiddleware<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","08-middleware.html.vue"]]);export{d as default};
