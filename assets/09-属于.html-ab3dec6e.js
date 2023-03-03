import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const i={},t=e(`<h1 id="belongs-to" tabindex="-1"><a class="header-anchor" href="#belongs-to" aria-hidden="true">#</a> Belongs to</h1><h2 id="属于" tabindex="-1"><a class="header-anchor" href="#属于" aria-hidden="true">#</a> 属于</h2><p>belongs to 关联建立一个和另一个模型的一对一连接，使得模型声明每个实例都「属于」另一个模型的一个实例 。</p><p>例如，如果你的应用包含了用户和用户资料， 并且每一个用户资料只分配给一个用户</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  gorm<span class="token punctuation">.</span>Model
  Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// \`Profile\` 属于 \`User\`， \`UserID\` 是外键</span>
<span class="token keyword">type</span> Profile <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  gorm<span class="token punctuation">.</span>Model
  UserID <span class="token builtin">int</span>
  User   User
  Name   <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外键" tabindex="-1"><a class="header-anchor" href="#外键" aria-hidden="true">#</a> 外键</h2><p>为了定义从属关系， 外键是必须存在的， 默认的外键使用所有者类型名称加上其主键。</p><p>像上面的例子，为了声明一个模型属于 <code>User</code>，它的外键应该为 <code>UserID</code>。</p><p>GORM 提供了一个定制外键的方法，例如:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Profile <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
  Name      <span class="token builtin">string</span>
  User      User <span class="token string">\`gorm:&quot;foreignkey:UserRefer&quot;\`</span> <span class="token comment">// 使用 UserRefer 作为外键</span>
  UserRefer <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关联外键" tabindex="-1"><a class="header-anchor" href="#关联外键" aria-hidden="true">#</a> 关联外键</h2><p>对于从属关系， GORM 通常使用所有者的主键作为外键值，在上面的例子中，就是 User 的 ID。</p><p>当你分配一个资料给一个用户， GORM 将保存用户表的 ID 值 到 用户资料表的 UserID 字段里。</p><p>你可以通过改变标签 <code>association_foreignkey</code> 来改变它， 例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
  Refer <span class="token builtin">int</span>
    Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Profile <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
  Name      <span class="token builtin">string</span>
  User      User <span class="token string">\`gorm:&quot;association_foreignkey:Refer&quot;\`</span> <span class="token comment">// use Refer 作为关联外键</span>
  UserRefer <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用属于" tabindex="-1"><a class="header-anchor" href="#使用属于" aria-hidden="true">#</a> 使用属于</h2><p>你能找到 belongs to 和 Related 的关联</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Related</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>profile<span class="token punctuation">)</span>
<span class="token comment">//// SELECT * FROM profiles WHERE user_id = 111; // 111 is user&#39;s ID</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,18),l=[t];function o(c,p){return s(),a("div",null,l)}const d=n(i,[["render",o],["__file","09-属于.html.vue"]]);export{d as default};
