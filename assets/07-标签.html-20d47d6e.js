import{_ as a,p as e,q as s,a1 as n}from"./framework-7db056f4.js";const i={},d=n(`<h1 id="标签" tabindex="-1"><a class="header-anchor" href="#标签" aria-hidden="true">#</a> 标签</h1><h2 id="创建标签" tabindex="-1"><a class="header-anchor" href="#创建标签" aria-hidden="true">#</a> 创建标签</h2><p>在 git 中打标签很简单，首先，切换到要打标签的分支上</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> switch dev

<span class="token comment"># Switched to branch &#39;dev&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag v1.0

<span class="token comment"># 打新标签 v1.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code>git tag</code> 查看所有标签</p><p>默认标签打到最新提交的 commit 上的。有时候，如果忘了打标签，可以找到历史提交的<code>commit id</code>, 然后再打上, 例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag v0.9 f52c633
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>标签不是按时间顺序列出，而是按字母排序的。可以用<code>git show &lt;tagname&gt;</code>查看标签信息：</p></div><p>还可以创建带有说明的标签，用<code>-a</code>指定标签名，<code>-m</code>指定说明文字：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v0.1 <span class="token parameter variable">-m</span> <span class="token string">&quot;version 0.1 released&quot;</span> 1094adb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>标签总是和某个 commit 挂钩。如果这个 commit 既出现在 master 分支，又出现在 dev 分支，那么在这两个分支上都可以看到这个标签。</p></blockquote><h2 id="操作标签" tabindex="-1"><a class="header-anchor" href="#操作标签" aria-hidden="true">#</a> 操作标签</h2><p>如果打错了标签,也可以删除</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token parameter variable">-d</span> v0.1

<span class="token comment"># Deleted tag &#39;v0.1&#39; (was f15b0dd)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。</p><p>如果要推送某个标签到远程，使用命令<code>git push origin &lt;tagname&gt;</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push origin v1.0
<span class="token comment"># Total 0 (delta 0), reused 0 (delta 0)</span>
<span class="token comment"># To github.com:michaelliao/learngit.git</span>
<span class="token comment">#  * [new tag]         v1.0 -&gt; v1.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，一次性推送全部尚未推送到远程的本地标签：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push origin <span class="token parameter variable">--tags</span>
<span class="token comment"># Total 0 (delta 0), reused 0 (delta 0)</span>
<span class="token comment"># To github.com:michaelliao/learngit.git</span>
<span class="token comment">#  * [new tag]         v0.9 -&gt; v0.9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token parameter variable">-d</span> v0.9

<span class="token comment"># Deleted tag &#39;v0.9&#39; (was f52c633)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，从远程删除。删除命令也是 push，格式如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token function">git</span> push origin <span class="token parameter variable">-d</span> tag tagName

<span class="token comment"># git push origin :refs/tags/tagename</span>

<span class="token comment"># To github.com:michaelliao/learngit.git</span>
<span class="token comment"># - [deleted]         v0.9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录远程仓库，就可以发现标签已经被删除了</p>`,26),l=[d];function t(c,r){return e(),s("div",null,l)}const p=a(i,[["render",t],["__file","07-标签.html.vue"]]);export{p as default};
