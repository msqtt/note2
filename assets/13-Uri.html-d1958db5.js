import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const p={},o=t(`<h1 id="uri-数据解析和绑定" tabindex="-1"><a class="header-anchor" href="#uri-数据解析和绑定" aria-hidden="true">#</a> URI 数据解析和绑定</h1><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;net/http&quot;</span>

    <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义接收数据的结构体</span>
<span class="token keyword">type</span> Login <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// binding:&quot;required&quot;修饰的字段，若接收为空值，则报错，是必须字段</span>
    User    <span class="token builtin">string</span> <span class="token string">\`form:&quot;username&quot; json:&quot;user&quot; uri:&quot;user&quot; xml:&quot;user&quot; binding:&quot;required&quot;\`</span>
    Pssword <span class="token builtin">string</span> <span class="token string">\`form:&quot;password&quot; json:&quot;password&quot; uri:&quot;password&quot; xml:&quot;password&quot; binding:&quot;required&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.创建路由</span>
    <span class="token comment">// 默认使用了 2 个中间件 Logger(), Recovery()</span>
    r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// JSON 绑定</span>
    r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/:user/:password&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 声明接收的变量</span>
        <span class="token keyword">var</span> login Login
        <span class="token comment">// Bind()默认解析并绑定 form 格式</span>
        <span class="token comment">// 根据请求头中 content-type 自动推断</span>
        <span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBindUri</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>login<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 判断用户名密码是否正确</span>
        <span class="token keyword">if</span> login<span class="token punctuation">.</span>User <span class="token operator">!=</span> <span class="token string">&quot;root&quot;</span> <span class="token operator">||</span> login<span class="token punctuation">.</span>Pssword <span class="token operator">!=</span> <span class="token string">&quot;admin&quot;</span> <span class="token punctuation">{</span>
            c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;304&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),e=[o];function c(i,u){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","13-Uri.html.vue"]]);export{r as default};
