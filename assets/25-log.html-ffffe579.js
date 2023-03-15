import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const p={},e=t(`<h1 id="日志文件" tabindex="-1"><a class="header-anchor" href="#日志文件" aria-hidden="true">#</a> 日志文件</h1><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;io&quot;</span>
    <span class="token string">&quot;os&quot;</span>

    <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    gin<span class="token punctuation">.</span><span class="token function">DisableConsoleColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Logging to a file.</span>
    f<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;gin.log&quot;</span><span class="token punctuation">)</span>
    gin<span class="token punctuation">.</span>DefaultWriter <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">MultiWriter</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>

    <span class="token comment">// 如果需要同时将日志写入文件和控制台，请使用以下代码。</span>
    <span class="token comment">// gin.DefaultWriter = io.MultiWriter(f, os.Stdout)</span>
    r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/ping&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;pong&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><b>效果演示</b></p><p><img src="https://www.topgoer.cn/uploads/ginkuangjia/images/m_9ada49b1a09221386606f6c71556e647_r.png" alt="img"></p>`,4),o=[e];function i(c,l){return s(),a("div",null,o)}const r=n(p,[["render",i],["__file","25-log.html.vue"]]);export{r as default};
