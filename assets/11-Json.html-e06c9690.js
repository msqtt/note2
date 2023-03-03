import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const o={},p=t(`<h1 id="json-数据解析和绑定" tabindex="-1"><a class="header-anchor" href="#json-数据解析和绑定" aria-hidden="true">#</a> Json 数据解析和绑定</h1><p>客户端传参，后端接收并解析到结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
   <span class="token string">&quot;net/http&quot;</span>
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
   r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;loginJSON&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 声明接收的变量</span>
      <span class="token keyword">var</span> json Login
      <span class="token comment">// 将 request 的 body 中的数据，自动按照 json 格式解析到结构体</span>
      <span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBindJSON</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
         <span class="token comment">// 返回错误信息</span>
         <span class="token comment">// gin.H 封装了生成 json 数据的工具</span>
         c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 判断用户名密码是否正确</span>
      <span class="token keyword">if</span> json<span class="token punctuation">.</span>User <span class="token operator">!=</span> <span class="token string">&quot;root&quot;</span> <span class="token operator">||</span> json<span class="token punctuation">.</span>Pssword <span class="token operator">!=</span> <span class="token string">&quot;admin&quot;</span> <span class="token punctuation">{</span>
         c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;304&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
   r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),e=[p];function c(i,u){return s(),a("div",null,e)}const r=n(o,[["render",c],["__file","11-Json.html.vue"]]);export{r as default};
