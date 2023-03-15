import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const e={},p=t(`<h1 id="sessions" tabindex="-1"><a class="header-anchor" href="#sessions" aria-hidden="true">#</a> Sessions</h1><p><code>gorilla/sessions</code>为自定义 session 后端提供 cookie 和文件系统 session 以及基础结构。</p><p>主要功能是：</p><ul><li>简单的 API：将其用作设置签名（以及可选的加密）cookie 的简便方法。</li><li>内置的后端可将 session 存储在 cookie 或文件系统中。</li><li>Flash 消息：一直持续读取的 session 值。</li><li>切换 session 持久性（又称“记住我”）和设置其他属性的便捷方法。</li><li>旋转身份验证和加密密钥的机制。</li><li>每个请求有多个 session，即使使用不同的后端也是如此。</li><li>自定义 session 后端的接口和基础结构：可以使用通用 API 检索并批量保存来自不同商店的 session。</li></ul><p>代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;net/http&quot;</span>

    <span class="token string">&quot;github.com/gorilla/sessions&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 初始化一个 cookie 存储对象</span>
<span class="token comment">// something-very-secret 应该是一个你自己的密匙，只要不被别人知道就行</span>
<span class="token keyword">var</span> store <span class="token operator">=</span> sessions<span class="token punctuation">.</span><span class="token function">NewCookieStore</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;something-very-secret&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/save&quot;</span><span class="token punctuation">,</span> SaveSession<span class="token punctuation">)</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/get&quot;</span><span class="token punctuation">,</span> GetSession<span class="token punctuation">)</span>
    err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP server failed,err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SaveSession</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Get a session. We&#39;re ignoring the error resulted from decoding an</span>
    <span class="token comment">// existing session: Get() always returns a session, even if empty.</span>

    <span class="token comment">//　获取一个 session 对象，session-name 是 session 的名字</span>
    session<span class="token punctuation">,</span> err <span class="token operator">:=</span> store<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token string">&quot;session-name&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 在 session 中存储值</span>
    session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;bar&quot;</span>
    session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token number">42</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">43</span>
    <span class="token comment">// 保存更改</span>
    session<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> w<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">GetSession</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    session<span class="token punctuation">,</span> err <span class="token operator">:=</span> store<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token string">&quot;session-name&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    foo <span class="token operator">:=</span> session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">]</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>删除 session</code> 的值：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 删除</span>
<span class="token comment">// 将 session 的最大存储时间设置为小于零的数即为删除</span>
session<span class="token punctuation">.</span>Options<span class="token punctuation">.</span>MaxAge <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
session<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> w<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","24-session.html.vue"]]);export{r as default};
