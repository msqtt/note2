import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const i={},t=e(`<h1 id="has-one" tabindex="-1"><a class="header-anchor" href="#has-one" aria-hidden="true">#</a> Has One</h1><h2 id="has-one-1" tabindex="-1"><a class="header-anchor" href="#has-one-1" aria-hidden="true">#</a> Has One</h2><p>has one 关联也是与另一个模型建立一对一的连接，但语义（和结果）有些不同。 此关联表示模型的每个实例包含或拥有另一个模型的一个实例。</p><p>例如，如果你的应用程序包含用户和信用卡，并且每个用户只能有一张信用卡。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 用户有一个信用卡，CredtCardID 外键</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    CreditCard   CreditCard
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CreditCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Number   <span class="token builtin">string</span>
    UserID    <span class="token builtin">uint</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外键" tabindex="-1"><a class="header-anchor" href="#外键" aria-hidden="true">#</a> 外键</h2><p>对于一对一关系，一个外键字段也必须存在，所有者将保存主键到模型关联的字段里。</p><p>这个字段的名字通常由 belongs to model 的类型加上它的 primary key 产生的，就上面的例子而言，它就是 CreditCardID</p><p>当你给用户一个信用卡， 它将保存一个信用卡的 ID 到 CreditCardID 字段中。</p><p>如果你想使用另一个字段来保存这个关系，你可以通过使用标签 foreignkey 来改变它， 例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  gorm<span class="token punctuation">.</span>Model
  CreditCard CreditCard <span class="token string">\`gorm:&quot;foreignkey:CardRefer&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CreditCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Number      <span class="token builtin">string</span>
    UserName <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关联外键" tabindex="-1"><a class="header-anchor" href="#关联外键" aria-hidden="true">#</a> 关联外键</h2><p>通常，所有者会保存 belogns to model 的主键到外键，你可以改为保存其他字段， 就像下面的例子使用 Number 。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  gorm<span class="token punctuation">.</span>Model
  CreditCard CreditCard <span class="token string">\`gorm:&quot;association_foreignkey:Number&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CreditCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Number <span class="token builtin">string</span>
    UID       <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多态关联" tabindex="-1"><a class="header-anchor" href="#多态关联" aria-hidden="true">#</a> 多态关联</h2><p>支持多态的一对多和一对一关联。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">type</span> Cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID    <span class="token builtin">int</span>
    Name  <span class="token builtin">string</span>
    Toy   Toy <span class="token string">\`gorm:&quot;polymorphic:Owner;&quot;\`</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">type</span> Dog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID   <span class="token builtin">int</span>
    Name <span class="token builtin">string</span>
    Toy  Toy <span class="token string">\`gorm:&quot;polymorphic:Owner;&quot;\`</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">type</span> Toy <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID        <span class="token builtin">int</span>
    Name      <span class="token builtin">string</span>
    OwnerID   <span class="token builtin">int</span>
    OwnerType <span class="token builtin">string</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>多态属于和多对多是明确的不支持并将会抛出错误。</p></div><h2 id="使用一对一" tabindex="-1"><a class="header-anchor" href="#使用一对一" aria-hidden="true">#</a> 使用一对一</h2><p>你可以通过 Related 找到 has one 关联。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> card CreditCard
db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Related</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>card<span class="token punctuation">,</span> <span class="token string">&quot;CreditCard&quot;</span><span class="token punctuation">)</span>
<span class="token comment">//// SELECT * FROM credit_cards WHERE user_id = 123; // 123 是用户表的主键</span>
<span class="token comment">// CreditCard  是用户表的字段名，这意味着获取用户的信用卡关系并写入变量 card。</span>
<span class="token comment">// 像上面的例子，如果字段名和变量类型名一样，它就可以省略， 像：</span>
db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Related</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>card<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),l=[t];function d(p,o){return s(),a("div",null,l)}const r=n(i,[["render",d],["__file","10-一对一.html.vue"]]);export{r as default};
