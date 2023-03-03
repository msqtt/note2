import{_ as s,p as n,q as a,a1 as e}from"./framework-7db056f4.js";const t={},o=e(`<h1 id="dcl" tabindex="-1"><a class="header-anchor" href="#dcl" aria-hidden="true">#</a> DCL</h1><p>用来管理数据库用户，控制数据库的访问权限</p><h2 id="用户管理" tabindex="-1"><a class="header-anchor" href="#用户管理" aria-hidden="true">#</a> 用户管理</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 查询用户</span>
<span class="token keyword">use</span> mysql<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span><span class="token punctuation">;</span>

<span class="token comment"># 创建用户</span>
<span class="token keyword">create</span> <span class="token keyword">user</span> <span class="token string">&#39;用户&#39;</span><span class="token variable">@&#39;主机名&#39;</span> identified <span class="token keyword">by</span> <span class="token string">&#39;密码&#39;</span><span class="token punctuation">;</span>

<span class="token comment"># 修改用户密码</span>
<span class="token comment"># 1</span>
<span class="token keyword">set</span> password <span class="token keyword">for</span> 用户名<span class="token variable">@localhost</span> <span class="token operator">=</span> password<span class="token punctuation">(</span><span class="token string">&#39;新密码&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment"># 2</span>
<span class="token keyword">update</span> <span class="token keyword">user</span> <span class="token keyword">set</span> password<span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">&#39;密码&#39;</span><span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token keyword">user</span><span class="token operator">=</span><span class="token string">&#39;用户名&#39;</span> <span class="token operator">and</span> host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">;</span>


删除用户
<span class="token keyword">drop</span> <span class="token keyword">user</span> <span class="token string">&#39;用户名&#39;</span><span class="token variable">@&#39;主机名&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>在<code>mysql 5.6</code>中，本地密码表头已经换为<code>authentication_string</code></p><p>更改用户信息时要记得查询用户表确认最新的表头</p></div><h2 id="权限管理" tabindex="-1"><a class="header-anchor" href="#权限管理" aria-hidden="true">#</a> 权限管理</h2><table><thead><tr><th>权限</th><th>说明</th></tr></thead><tbody><tr><td>all, all privileges</td><td>所有权限</td></tr><tr><td>select</td><td>查询权限</td></tr><tr><td>insert</td><td>插入数据</td></tr><tr><td>update</td><td>修改数据</td></tr><tr><td>delete</td><td>删除数据</td></tr><tr><td>alter</td><td>修改表</td></tr><tr><td>drop</td><td>删除数据库/表视图</td></tr><tr><td>create</td><td>创建数据库/表</td></tr></tbody></table><p><strong>命令：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>查询权限
<span class="token keyword">show</span> grants <span class="token keyword">for</span> <span class="token string">&#39;用户&#39;</span><span class="token variable">@&#39;主机名&#39;</span>

授予权限
<span class="token keyword">grant</span> 权限列表 <span class="token keyword">on</span> 数据库名 <span class="token keyword">to</span> <span class="token string">&#39;用户名&#39;</span><span class="token variable">@&#39;主机名&#39;</span>

撤销权限
<span class="token keyword">revoke</span> 权限列表 <span class="token keyword">on</span> 数据库名<span class="token punctuation">.</span>表名 <span class="token keyword">from</span> <span class="token string">&#39;用户名&#39;</span><span class="token variable">@&#39;主机名&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),d=[o];function l(p,r){return n(),a("div",null,d)}const i=s(t,[["render",l],["__file","05-DCL.html.vue"]]);export{i as default};
