import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const i={},t=e(`<h1 id="has-many" tabindex="-1"><a class="header-anchor" href="#has-many" aria-hidden="true">#</a> Has Many</h1><h2 id="一对多" tabindex="-1"><a class="header-anchor" href="#一对多" aria-hidden="true">#</a> 一对多</h2><p>has many 关联就是创建和另一个模型的一对多关系， 不像 has one，所有者可以拥有0个或多个模型实例。</p><p>例如，如果你的应用包含用户和信用卡， 并且每一个用户都拥有多张信用卡。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 用户有多张信用卡，UserID 是外键</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    CreditCards <span class="token punctuation">[</span><span class="token punctuation">]</span>CreditCard
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CreditCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Number   <span class="token builtin">string</span>
    UserID  <span class="token builtin">uint</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外键" tabindex="-1"><a class="header-anchor" href="#外键" aria-hidden="true">#</a> 外键</h2><p>为了定义一对多关系， 外键是必须存在的，默认外键的名字是所有者类型的名字加上它的主键。</p><p>就像上面的例子，为了定义一个属于User 的模型，外键就应该为 UserID。</p><p>使用其他的字段名作为外键， 你可以通过 foreignkey 来定制它， 例如:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    CreditCards <span class="token punctuation">[</span><span class="token punctuation">]</span>CreditCard <span class="token string">\`gorm:&quot;foreignkey:UserRefer&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CreditCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Number    <span class="token builtin">string</span>
  UserRefer <span class="token builtin">uint</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外键关联" tabindex="-1"><a class="header-anchor" href="#外键关联" aria-hidden="true">#</a> 外键关联</h2><p>GORM 通常使用所有者的主键作为外键的值， 在上面的例子中，它就是 <code>User</code> 的 <code>ID</code>。</p><p>当你分配信用卡给一个用户， GORM 将保存用户 <code>ID</code> 到信用卡表的 <code>UserID</code> 字段中。</p><p>你能通过 <code>association_foreignkey</code> 来改变它， 例如:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
  MemberNumber <span class="token builtin">string</span>
    CreditCards  <span class="token punctuation">[</span><span class="token punctuation">]</span>CreditCard <span class="token string">\`gorm:&quot;foreignkey:UserMemberNumber;association_foreignkey:MemberNumber&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CreditCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Number           <span class="token builtin">string</span>
  UserMemberNumber <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多态关联" tabindex="-1"><a class="header-anchor" href="#多态关联" aria-hidden="true">#</a> 多态关联</h2><p>支持多态的一对多和一对一关联。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">type</span> Cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID    <span class="token builtin">int</span>
    Name  <span class="token builtin">string</span>
    Toy   <span class="token punctuation">[</span><span class="token punctuation">]</span>Toy <span class="token string">\`gorm:&quot;polymorphic:Owner;&quot;\`</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">type</span> Dog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID   <span class="token builtin">int</span>
    Name <span class="token builtin">string</span>
    Toy  <span class="token punctuation">[</span><span class="token punctuation">]</span>Toy <span class="token string">\`gorm:&quot;polymorphic:Owner;&quot;\`</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">type</span> Toy <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID        <span class="token builtin">int</span>
    Name      <span class="token builtin">string</span>
    OwnerID   <span class="token builtin">int</span>
    OwnerType <span class="token builtin">string</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>多态属于和多对多是明确不支持并会抛出错误的。</p></div><h2 id="使用一对多" tabindex="-1"><a class="header-anchor" href="#使用一对多" aria-hidden="true">#</a> 使用一对多</h2><p>你可以通过Related 找到 has many 关联关系。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Related</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>emails<span class="token punctuation">)</span>
<span class="token comment">//// SELECT * FROM emails WHERE user_id = 111; // 111 是用户表的主键</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,22),l=[t];function p(c,o){return s(),a("div",null,l)}const r=n(i,[["render",p],["__file","11-一对多.html.vue"]]);export{r as default};
