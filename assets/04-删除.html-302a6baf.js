import{_ as e,p as n,q as s,a1 as t}from"./framework-7db056f4.js";const a={},i=t(`<h1 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件" aria-hidden="true">#</a> 删除文件</h1><p>在 git 中删除也是一个修改操作</p><p>假如你<code>rm</code> 或 永久删除了一个文件</p><p>再使用<code>git status</code>，git 会告诉你哪些文件被删除了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> status

<span class="token comment"># On branch master</span>
<span class="token comment"># Changes not staged for commit:</span>
<span class="token comment">#   (use &quot;git add/rm &lt;file&gt;...&quot; to update what will be committed)</span>
<span class="token comment">#   (use &quot;git restore &lt;file&gt;...&quot; to discard changes in working directory)</span>
<span class="token comment">#         deleted:    readme.md</span>
<span class="token comment">#</span>
<span class="token comment"># no changes added to commit (use &quot;git add&quot; and/or &quot;git commit -a&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你有两个选择:</p><ol><li>是确实要从版本库中删除该文件，那就用命令<code>git add/rm</code>删除，并且<code>git commit</code></li><li>使用 <code>git restore &lt;file&gt;</code> 把误删的文件恢复到暂存区的状态</li></ol>`,7),o=[i];function d(c,l){return n(),s("div",null,o)}const r=e(a,[["render",d],["__file","04-删除.html.vue"]]);export{r as default};
