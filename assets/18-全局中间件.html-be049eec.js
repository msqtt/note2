import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const p={},e=t(`<h1 id="全局中间件" tabindex="-1"><a class="header-anchor" href="#全局中间件" aria-hidden="true">#</a> 全局中间件</h1><p>所有请求都经过此中间件</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;time&quot;</span>

    <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义中间</span>
<span class="token keyword">func</span> <span class="token function">MiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        t <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;中间件开始执行了&quot;</span><span class="token punctuation">)</span>
        <span class="token comment">// 设置变量到 Context 的 key 中，可以通过 Get()取</span>
        c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;request&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;中间件&quot;</span><span class="token punctuation">)</span>
        status <span class="token operator">:=</span> c<span class="token punctuation">.</span>Writer<span class="token punctuation">.</span><span class="token function">Status</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;中间件执行完毕&quot;</span><span class="token punctuation">,</span> status<span class="token punctuation">)</span>
        t2 <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;time:&quot;</span><span class="token punctuation">,</span> t2<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.创建路由</span>
    <span class="token comment">// 默认使用了 2 个中间件 Logger(), Recovery()</span>
    r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 注册中间件</span>
    r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">MiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// {}为了代码规范</span>
    <span class="token punctuation">{</span>
        r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/ce&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 取值</span>
            req<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;request&quot;</span><span class="token punctuation">)</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;request:&quot;</span><span class="token punctuation">,</span> req<span class="token punctuation">)</span>
            <span class="token comment">// 页面接收</span>
            c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;request&quot;</span><span class="token punctuation">:</span> req<span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token punctuation">}</span>
    r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果： <img src="https://www.topgoer.cn/uploads/ginkuangjia/images/m_e3ef8e82024ae4a638be74b1b4d8eb05_r.png" alt="img"></p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>请注意黑色的数据里面有一步算时间差没有执行（需要学习 Next 就懂了）</p></div>`,5),c=[e];function o(i,u){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","18-全局中间件.html.vue"]]);export{k as default};
