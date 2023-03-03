import{_ as n,p as s,q as a,a1 as t}from"./framework-7db056f4.js";const e={},p=t(`<h1 id="gorm" tabindex="-1"><a class="header-anchor" href="#gorm" aria-hidden="true">#</a> gorm</h1><p>对象关系映射(Object Relational Mapping) 模式，是为了解决面向对象与关系数据库(如mysql数据厍)存在的互不匹配的现象的技术。</p><p>简单来说, ORM 通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。</p><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>一个神奇的，对开发人员友好的 Golang ORM 库</p><ul><li>全特性 ORM (几乎包含所有特性)</li><li>模型关联 (一对一， 一对多，一对多（反向）， 多对多， 多态关联)</li><li>钩子 (Before/After Create/Save/Update/Delete/Find)</li><li>预加载</li><li>事务</li><li>复合主键</li><li>SQL 构造器</li><li>自动迁移</li><li>日志</li><li>基于GORM回调编写可扩展插件</li><li>全特性测试覆盖</li><li>开发者友好</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> get <span class="token operator">-</span>u gorm<span class="token punctuation">.</span>io<span class="token operator">/</span>gorm

<span class="token comment">// go get -u gorm.io/driver/mysql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>

	<span class="token string">&quot;gorm.io/driver/mysql&quot;</span>
	<span class="token string">&quot;gorm.io/gorm&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Product <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	gorm<span class="token punctuation">.</span>Model
	Code  <span class="token builtin">string</span>
	Price <span class="token builtin">uint</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dsn <span class="token operator">:=</span> <span class="token string">&quot;username:password@tcp(175.178.69.145:3306)/go_db?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>mysql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>dsn<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gorm<span class="token punctuation">.</span>Config<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//自动检查 Product 结构是否变化，变化则进行迁移 (若不存在表，会创建)</span>
	db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// insert</span>
	db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span>Code<span class="token punctuation">:</span> <span class="token string">&quot;what&quot;</span><span class="token punctuation">,</span> Price<span class="token punctuation">:</span> <span class="token number">1000</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// select</span>
	<span class="token keyword">var</span> product Product
	db<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	db<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">,</span> <span class="token string">&quot;code = ?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;what&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// updata</span>
	db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;Price&quot;</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>

	<span class="token comment">// 删</span>
	db<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","01-gorm.html.vue"]]);export{r as default};
