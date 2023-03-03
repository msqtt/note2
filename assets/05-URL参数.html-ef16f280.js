import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const e={},o=t(`<h1 id="url-参数" tabindex="-1"><a class="header-anchor" href="#url-参数" aria-hidden="true">#</a> URL 参数</h1><ul><li>URL 参数可以通过<code>DefaultQuery()</code>或<code>Query()</code>方法获取</li><li><code>DefaultQuery()</code>若参数不村则，返回默认值，<code>Query()</code>若不存在，返回空串</li><li><code>API ? name=zs</code></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;net/http&quot;</span>

    <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/user&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//指定默认值</span>
        <span class="token comment">//http://localhost:8080/user 才会打印出来默认的值</span>
        name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">DefaultQuery</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;骨头&quot;</span><span class="token punctuation">)</span>
        c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;hello %s&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不传递参数输出的结果：<code>hello 骨头</code></p><p>访问：<code>http://localhost:8080/user?name=sb</code> 传递参数输出的结果：<code>hello sb</code></p>`,5),p=[o];function c(i,u){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","05-URL参数.html.vue"]]);export{d as default};
