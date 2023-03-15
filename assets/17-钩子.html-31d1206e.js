import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const t={},p=e(`<h1 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> HOOKS</h1><h2 id="对象的生命周期" tabindex="-1"><a class="header-anchor" href="#对象的生命周期" aria-hidden="true">#</a> 对象的生命周期</h2><p>钩子是一个在 插入/查询/更新/删除 之前或之后被调用的方法。</p><p>如果你在一个模型中定义了特殊的方法，它将会在插入，更新，查询，删除的时候被自动调用，如果任何的回调抛出错误，GORM 将会停止将要执行的操作并且回滚当前的改变。</p><p>钩子 创建一个对象 可用于创建的钩子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 开启事务</span>
BeforeSave
BeforeCreate
<span class="token comment">// 连表前的保存</span>
<span class="token comment">// 更新时间戳 \`CreatedAt\`, \`UpdatedAt\`</span>
<span class="token comment">// 保存自己</span>
<span class="token comment">// 重载哪些有默认值和空的字段</span>
<span class="token comment">// 链表后的保存</span>
AfterCreate
AfterSave
<span class="token comment">// 提交或回滚事务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><b>代码例子:</b></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">BeforeSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> u<span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;can&#39;t save invalid data&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">AfterCreate</span><span class="token punctuation">(</span>scope <span class="token operator">*</span>gorm<span class="token punctuation">.</span>Scope<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> u<span class="token punctuation">.</span>ID <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
    scope<span class="token punctuation">.</span><span class="token function">DB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;role&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>在 GORM 中的保存/删除 操作会默认进行事务处理，所以在事物中，所有的改变都是无效的，直到它被提交为止:</p></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">AfterCreate</span><span class="token punctuation">(</span>tx <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tx<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;role&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更新一个对象" tabindex="-1"><a class="header-anchor" href="#更新一个对象" aria-hidden="true">#</a> 更新一个对象</h2><p>可用于更新的钩子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 开启事务</span>
BeforeSave
BeforeUpdate
<span class="token comment">// 链表前的保存</span>
<span class="token comment">// 更新时间戳 \`UpdatedAt\`</span>
<span class="token comment">// 保存自身</span>
<span class="token comment">// 链表后的保存</span>
AfterUpdate
AfterSave
<span class="token comment">// 提交或回滚的事务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><b>代码示例:</b></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">BeforeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> u<span class="token punctuation">.</span><span class="token function">readonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;read only user&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在事务结束后，进行更新数据</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">AfterUpdate</span><span class="token punctuation">(</span>tx <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> u<span class="token punctuation">.</span>Confirmed <span class="token punctuation">{</span>
    tx<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Address<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">&quot;user_id = ?&quot;</span><span class="token punctuation">,</span> u<span class="token punctuation">.</span>ID<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;verfied&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除一个对象" tabindex="-1"><a class="header-anchor" href="#删除一个对象" aria-hidden="true">#</a> 删除一个对象</h2><p>可用于删除的钩子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 开启事务</span>
BeforeDelete
<span class="token comment">// 删除自身</span>
AfterDelete
<span class="token comment">// 提交或回滚事务</span>
代码示例<span class="token punctuation">:</span>

<span class="token comment">// 在事务结束后进行更新数据</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">AfterDelete</span><span class="token punctuation">(</span>tx <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> u<span class="token punctuation">.</span>Confirmed <span class="token punctuation">{</span>
    tx<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Address<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">&quot;user_id = ?&quot;</span><span class="token punctuation">,</span> u<span class="token punctuation">.</span>ID<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;invalid&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询一个对象" tabindex="-1"><a class="header-anchor" href="#查询一个对象" aria-hidden="true">#</a> 查询一个对象</h2><p>可用于查询的钩子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 从数据库中读取数据</span>
<span class="token comment">// 加载之前 (急于加载)</span>
AfterFind
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><b>代码示例:</b></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">AfterFind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> u<span class="token punctuation">.</span>MemberShip <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
    u<span class="token punctuation">.</span>MemberShip <span class="token operator">=</span> <span class="token string">&quot;user&quot;</span>
  <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),o=[p];function c(i,u){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","17-钩子.html.vue"]]);export{r as default};
