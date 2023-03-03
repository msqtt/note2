import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const t={},p=e(`<h1 id="惯例" tabindex="-1"><a class="header-anchor" href="#惯例" aria-hidden="true">#</a> 惯例</h1><h2 id="gorm-model" tabindex="-1"><a class="header-anchor" href="#gorm-model" aria-hidden="true">#</a> gorm.Model</h2><p><code>gorm.Model</code> 是一个包含一些基本字段的结构体, 包含的字段有<code>ID，CreatedAt， UpdatedAt， DeletedAt</code></p><p>你可以用它来嵌入到你的模型中，或者也可以用它来建立自己的模型。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// gorm.Model 定义</span>
<span class="token keyword">type</span> Model <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  ID        <span class="token builtin">uint</span> <span class="token string">\`gorm:&quot;primary_key&quot;\`</span>
  CreatedAt time<span class="token punctuation">.</span>Time
  UpdatedAt time<span class="token punctuation">.</span>Time
  DeletedAt <span class="token operator">*</span>time<span class="token punctuation">.</span>Time
<span class="token punctuation">}</span>

<span class="token comment">// 将字段 \`ID\`, \`CreatedAt\`, \`UpdatedAt\`, \`DeletedAt\` 注入到 \`User\` 模型中</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  gorm<span class="token punctuation">.</span>Model
  Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 声明 gorm.Model 模型</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  ID   <span class="token builtin">int</span>
  Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="id-作为主键" tabindex="-1"><a class="header-anchor" href="#id-作为主键" aria-hidden="true">#</a> <code>ID</code> 作为主键</h2><p>GORM 默认使用 ID 作为主键名。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  ID   <span class="token builtin">string</span> <span class="token comment">// 字段名 \`ID\` 将被作为默认的主键名</span>
<span class="token punctuation">}</span>

<span class="token comment">// 设置字段 \`AnimalID\` 为默认主键</span>
<span class="token keyword">type</span> Animal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  AnimalID <span class="token builtin">int64</span> <span class="token string">\`gorm:&quot;primary_key&quot;\`</span>
  Name     <span class="token builtin">string</span>
  Age      <span class="token builtin">int64</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复数表名" tabindex="-1"><a class="header-anchor" href="#复数表名" aria-hidden="true">#</a> 复数表名</h2><p>表名是结构体名称的复数形式</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 默认的表名是 \`users\`</span>

<span class="token comment">// 设置 \`User\` 的表名为 \`profiles\`</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>User<span class="token punctuation">)</span> <span class="token function">TableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">&quot;profiles&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u User<span class="token punctuation">)</span> <span class="token function">TableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> u<span class="token punctuation">.</span>Role <span class="token operator">==</span> <span class="token string">&quot;admin&quot;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;admin_users&quot;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;users&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 如果设置禁用表名复数形式属性为 true，\`User\` 的表名将是 \`user\`</span>
db<span class="token punctuation">.</span><span class="token function">SingularTable</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="指定表名" tabindex="-1"><a class="header-anchor" href="#指定表名" aria-hidden="true">#</a> 指定表名</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 用 \`User\` 结构体创建 \`delete_users\` 表</span>
db<span class="token punctuation">.</span><span class="token function">Table</span><span class="token punctuation">(</span><span class="token string">&quot;deleted_users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">CreateTable</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> deleted_users <span class="token punctuation">[</span><span class="token punctuation">]</span>User
db<span class="token punctuation">.</span><span class="token function">Table</span><span class="token punctuation">(</span><span class="token string">&quot;deleted_users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>deleted_users<span class="token punctuation">)</span>
<span class="token comment">//// SELECT * FROM deleted_users;</span>

db<span class="token punctuation">.</span><span class="token function">Table</span><span class="token punctuation">(</span><span class="token string">&quot;deleted_users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">&quot;name = ?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jinzhu&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//// DELETE FROM deleted_users WHERE name = &#39;jinzhu&#39;;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改默认表名" tabindex="-1"><a class="header-anchor" href="#修改默认表名" aria-hidden="true">#</a> 修改默认表名</h2><p>你可以通过定义 DefaultTableNameHandler 字段来对表名使用任何规则。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>gorm<span class="token punctuation">.</span>DefaultTableNameHandler <span class="token operator">=</span> <span class="token keyword">func</span> <span class="token punctuation">(</span>db <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">,</span> defaultTableName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>  <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;prefix_&quot;</span> <span class="token operator">+</span> defaultTableName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="蛇形列名" tabindex="-1"><a class="header-anchor" href="#蛇形列名" aria-hidden="true">#</a> 蛇形列名</h2><p>列名是字段名的蛇形小写形式</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  ID        <span class="token builtin">uint</span>      <span class="token comment">// 字段名是 \`id\`</span>
  Name      <span class="token builtin">string</span>    <span class="token comment">// 字段名是 \`name\`</span>
  Birthday  time<span class="token punctuation">.</span>Time <span class="token comment">// 字段名是 \`birthday\`</span>
  CreatedAt time<span class="token punctuation">.</span>Time <span class="token comment">// 字段名是 \`created_at\`</span>
<span class="token punctuation">}</span>
<span class="token comment">// 重写列名</span>
<span class="token keyword">type</span> Animal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    AnimalId    <span class="token builtin">int64</span>     <span class="token string">\`gorm:&quot;column:beast_id&quot;\`</span>         <span class="token comment">// 设置列名为 \`beast_id\`</span>
    Birthday    time<span class="token punctuation">.</span>Time <span class="token string">\`gorm:&quot;column:day_of_the_beast&quot;\`</span> <span class="token comment">// 设置列名为 \`day_of_the_beast\`</span>
    Age         <span class="token builtin">int64</span>     <span class="token string">\`gorm:&quot;column:age_of_the_beast&quot;\`</span> <span class="token comment">// 设置列名为 \`age_of_the_beast\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="时间戳跟踪" tabindex="-1"><a class="header-anchor" href="#时间戳跟踪" aria-hidden="true">#</a> 时间戳跟踪</h2><h3 id="createdat" tabindex="-1"><a class="header-anchor" href="#createdat" aria-hidden="true">#</a> CreatedAt</h3><p>对于有 <code>CreatedAt</code> 字段的模型，它将被设置为首次创建记录的当前时间。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span> <span class="token comment">// 将设置 \`CreatedAt\` 为当前时间</span>

<span class="token comment">// 你可以使用 \`Update\` 方法来更改默认时间</span>
db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;CreatedAt&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="updatedat" tabindex="-1"><a class="header-anchor" href="#updatedat" aria-hidden="true">#</a> UpdatedAt</h3><p>对于有 UpdatedAt 字段的模型，它将被设置为记录更新时的当前时间。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span> <span class="token comment">// 将设置 \`UpdatedAt\` 为当前时间</span>

db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jinzhu&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 将设置 \`UpdatedAt\` 为当前时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="deletedat" tabindex="-1"><a class="header-anchor" href="#deletedat" aria-hidden="true">#</a> DeletedAt</h3><p>对于有 <code>DeletedAt</code> 字段的模型，当删除它们的实例时，它们并没有被从数据库中删除，只是将 <code>DeletedAt</code> 字段设置为当前时间。( Soft Delete )</p>`,28),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","03-惯例.html.vue"]]);export{d as default};
