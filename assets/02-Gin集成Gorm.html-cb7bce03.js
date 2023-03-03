import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const t={},o=e(`<h1 id="集成-gorm" tabindex="-1"><a class="header-anchor" href="#集成-gorm" aria-hidden="true">#</a> 集成 Gorm</h1><h2 id="下载包" tabindex="-1"><a class="header-anchor" href="#下载包" aria-hidden="true">#</a> 下载包</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> get <span class="token operator">-</span>u <span class="token operator">-</span>v gorm<span class="token punctuation">.</span>io<span class="token operator">/</span>gorm
<span class="token keyword">go</span> get <span class="token operator">-</span>u <span class="token operator">-</span>v gorm<span class="token punctuation">.</span>io<span class="token operator">/</span>driver<span class="token operator">/</span>mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建模型" tabindex="-1"><a class="header-anchor" href="#创建模型" aria-hidden="true">#</a> 创建模型</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> model

<span class="token keyword">import</span> <span class="token string">&quot;gorm.io/gorm&quot;</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	gorm<span class="token punctuation">.</span>Model
    UserName <span class="token builtin">string</span> <span class="token string">\`json:&quot;username&quot;\`</span>
    Password <span class="token builtin">string</span> <span class="token string">\`json:&quot;password&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写-dao" tabindex="-1"><a class="header-anchor" href="#编写-dao" aria-hidden="true">#</a> 编写 Dao</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> dao

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;blog/model&quot;</span>
	<span class="token string">&quot;log&quot;</span>

	<span class="token string">&quot;gorm.io/driver/mysql&quot;</span>
	<span class="token string">&quot;gorm.io/gorm&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//定义接口</span>
<span class="token keyword">type</span> Manager <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">AddUser</span><span class="token punctuation">(</span>user <span class="token operator">*</span>model<span class="token punctuation">.</span>User<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> manager <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	db <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB
<span class="token punctuation">}</span>

<span class="token comment">//向外开放的接口实例（manager 结构体）</span>
<span class="token keyword">var</span> Mgr Manager

<span class="token comment">//初始化数据库</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dsn <span class="token operator">:=</span> <span class="token string">&quot;root:qwfpgjluy;@tcp(175.178.69.145:3306)/go_db?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>mysql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>dsn<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gorm<span class="token punctuation">.</span>Config<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;Err happen when init db: &quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	Mgr <span class="token operator">=</span> <span class="token operator">&amp;</span>manager<span class="token punctuation">{</span>db<span class="token punctuation">:</span> db<span class="token punctuation">}</span>
	db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>model<span class="token punctuation">.</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//实现接口</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mgr <span class="token operator">*</span>manager<span class="token punctuation">)</span> <span class="token function">AddUser</span><span class="token punctuation">(</span>user <span class="token operator">*</span>model<span class="token punctuation">.</span>User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mgr<span class="token punctuation">.</span>db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用实例化接口，因为只能使用实例化的 DB 操纵数据库</p></blockquote><h2 id="测" tabindex="-1"><a class="header-anchor" href="#测" aria-hidden="true">#</a> 测</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;blog/dao&quot;</span>
	<span class="token string">&quot;blog/model&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> model<span class="token punctuation">.</span>User<span class="token punctuation">{</span>Username<span class="token punctuation">:</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> Password<span class="token punctuation">:</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">}</span>

	dao<span class="token punctuation">.</span>Mgr<span class="token punctuation">.</span><span class="token function">AddUser</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),p=[o];function i(c,l){return s(),a("div",null,p)}const r=n(t,[["render",i],["__file","02-Gin集成Gorm.html.vue"]]);export{r as default};
