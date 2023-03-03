import{_ as e,p as n,q as s,a1 as a}from"./framework-7db056f4.js";const i={},d=a(`<h1 id="分支管理" tabindex="-1"><a class="header-anchor" href="#分支管理" aria-hidden="true">#</a> 分支管理</h1><h2 id="创建与合并分支" tabindex="-1"><a class="header-anchor" href="#创建与合并分支" aria-hidden="true">#</a> 创建与合并分支</h2><p>在版本回退里，你已经知道，每次提交，Git 都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在 Git 里，这个分支叫主分支，即 <code>master</code> 分支。</p><p><code>HEAD</code> 严格来说不是指向提交，而是指向 <code>master</code>，<code>master</code> 才是指向提交的，所以，<code>HEAD</code> 指向的就是当前分支。</p><p>所有也可以把 <code>master</code> 分支抽象地理解成一个指针，它指向在 <code>master</code> 提交的版本中最新的那一个版本</p><p>除了 <code>master</code> 分支，我们也可以创建其他的分支，比如 <code>dev</code> 分支，其实这就相当于创建了一个 <code>dev</code> 指针，它会指向在所有 <code>dev</code> 提交的版本中最新的版本，但是我们没有任何 commit，因此它也会指向 <code>master</code></p><h3 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支" aria-hidden="true">#</a> 创建分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> dev

<span class="token comment"># Switched to a new branch &#39;dev&#39;</span>


<span class="token comment"># -b 选项表示创建分支并切换到该分支</span>
<span class="token comment"># git branch dev</span>
<span class="token comment"># git switch dev / git checkout dev</span>


<span class="token comment"># 新版本提供了 git switch -c dev 能实现一样的功能</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用命令查看当前分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch


<span class="token comment"># * dev</span>
<span class="token comment">#   master</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在 commit 一次修改后的文件, 再切换回 master 分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout master
<span class="token comment"># git switch master</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们会发现，工作区的文件又恢复回 <code>master</code> 的状态了, 因为刚刚的提交是在 <code>dev</code> 分支下提交，<code>master</code> 分区的提交点并没有改变</p><h3 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h3><p>现在我们回到 master 分支 <code>git checkout master</code></p><p>如果要把 dev 分支的工作成果合并到 master</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> merge dev

<span class="token comment"># Updating a11a2e6..18ce4dd</span>
<span class="token comment"># Fast-forward</span>
<span class="token comment">#  readme.md | 2 ++</span>
<span class="token comment">#  1 file changed, 2 insertions(+)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次操作把 <code>master</code> 指针指向了 <code>dev</code> 指针, 且工作区的文件也变成了在 <code>dev</code> 里提交的状态</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>注意到上面的 <code>Fast-forward</code> 信息，Git 告诉我们，这次合并是“快进模式”，也就是直接把 <code>master</code> 指向 <code>dev</code> 的当前提交，所以合并速度非常快。</p><p>当然，也不是每次合并都能 <code>Fast-forward</code>，我们后面会讲其他方式的合并。</p></div><p>合并完成后，我们可以删除掉 dev 分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch <span class="token parameter variable">-d</span> dev

<span class="token comment"># Deleted branch dev (was 18ce4dd).</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再使用 <code>git branch</code> 查看，发现只剩下 <code>master</code> 分支了</p><blockquote><p>因为创建、合并和删除分支非常快，所以 Git 鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在 master 分支上工作效果是一样的，但过程更安全。</p></blockquote><h2 id="解决冲突" tabindex="-1"><a class="header-anchor" href="#解决冲突" aria-hidden="true">#</a> 解决冲突</h2><p>然而在实际情况中合并分支都不会是顺利的。</p><p>现在手动创建一个 <code>merge conflict</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> switch <span class="token parameter variable">-c</span> feature

<span class="token comment"># vim readme.md 这步操作把任意一行内容改动</span>


<span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&#39;feature change a line&#39;</span>

<span class="token comment"># 提交</span>


<span class="token function">git</span> branch master

<span class="token comment"># 把同一行改成不同的内容</span>


<span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&#39;master change a line&#39;</span>

<span class="token comment"># 提交</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 dev 分支合并到 master</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> merge dev

<span class="token comment"># Auto-merging readme.md</span>
<span class="token comment"># CONFLICT (content): Merge conflict in readme.md</span>
<span class="token comment"># Automatic merge failed; fix conflicts and then commit the result.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在冲突发生了,merge 失败, git 进入了 merge 模式，文件被改成了这样</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
nqhuqhn
=======
nsqyushuqhns yqusqwuy uy
&gt;&gt;&gt;&gt;&gt;&gt;&gt; dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示出不同分支的冲突内容</p><p>现在有两个选项：</p><ol><li>输入<code>git status</code>，git 会提示我们使用 <code>git merge --abort</code> 撤销 merge 操作</li><li>直接修改文件冲突的位置，改成我们想要的内容，再 add 后提交</li></ol><p>如果你解决了冲突，现在使用<code>git log --graph</code> 就可以看到分支的合并图</p><h2 id="分支管理策略" tabindex="-1"><a class="header-anchor" href="#分支管理策略" aria-hidden="true">#</a> 分支管理策略</h2><p>通常合并分支时，如果可能，git 会用<code>Fast forward</code> 模式,但这种模式下，删除分支后，会丢掉分支信息。</p><p>如果要强制禁用 Fast forward 模式，Git 就会在 merge 时生成一个新的 commit，这样，从分支历史上就可以看出分支信息。</p><p>使用<code>--no-ff</code>方式的<code>git merge</code>即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> merge --no-ff <span class="token parameter variable">-m</span> <span class="token string">&quot;merge with no-ff&quot;</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为本次合并要创建一个新的 commit，所以加上-m 参数，把 commit 描述写进去。</p><p>合并后, 使用 <code>git log</code> 查看分支历史</p><h3 id="分支策略" tabindex="-1"><a class="header-anchor" href="#分支策略" aria-hidden="true">#</a> 分支策略</h3><p>在实际开发中，我们应该按照几个基本原则进行分支管理：</p><p>首先，master 分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；</p><p>那在哪干活呢？干活都在 dev 分支上，也就是说，dev 分支是不稳定的，到某个时候，比如 1.0 版本发布时，再把 dev 分支合并到 master 上，在 master 分支发布 1.0 版本；</p><p>你和你的小伙伴们每个人都在 dev 分支上干活，每个人都有自己的分支，时不时地往 dev 分支上合并就可以了。</p><p>所以，团队合作的分支看起来就像这样：</p><p><img src="https://user-images.githubusercontent.com/94043894/197506742-f6f8cde3-54f4-4f97-a6fc-c3c506803302.png" alt="img"></p><h2 id="stash" tabindex="-1"><a class="header-anchor" href="#stash" aria-hidden="true">#</a> Stash</h2><p>软件开发中，bug 就像家常便饭一样。有了 bug 就需要修复，在 Git 中，由于分支是如此的强大，所以，每个 bug 都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。</p><p>当你接到一个修复一个代号 101 的 bug 的任务时，很自然地，你想创建一个分支 <code>issue-101</code> 来修复它，但是，等等，当前正在 <code>dev</code> 上进行的工作还没有提交：</p><p>并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需 1 天时间。但是，必须在两个小时内修复该 bug，怎么办？</p><p>幸好，Git 还提供了一个 stash 功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：</p><p>现在，用 <code>git status</code> 查看工作区，就是干净的（除非有没有被 Git 管理的文件），因此可以放心地创建分支来修复 bug。</p><p>首先确定要在哪个分支上修复 bug，假定需要在 <code>master</code> 分支上修复，就从 <code>master</code> 创建临时分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout master
<span class="token comment"># Switched to branch &#39;master&#39;</span>
<span class="token comment"># Your branch is ahead of &#39;origin/master&#39; by 6 commits.</span>
<span class="token comment">#   (use &quot;git push&quot; to publish your local commits)</span>

<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> issue-101
<span class="token comment"># Switched to a new branch &#39;issue-101&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修复完成, 提交后，开始合并分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> switch master
<span class="token comment"># Switched to branch &#39;master&#39;</span>
<span class="token comment"># Your branch is ahead of &#39;origin/master&#39; by 6 commits.</span>
<span class="token comment">#   (use &quot;git push&quot; to publish your local commits)</span>

<span class="token function">git</span> merge --no-ff <span class="token parameter variable">-m</span> <span class="token string">&quot;merged bug fix 101&quot;</span> issue-101
<span class="token comment"># Merge made by the &#39;recursive&#39; strategy.</span>
<span class="token comment">#  readme.txt | 2 +-</span>
<span class="token comment">#  1 file changed, 1 insertion(+), 1 deletion(-)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，是时候接着回到 dev 分支干活了！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> switch dev

<span class="token function">git</span> status
<span class="token comment"># On branch dev</span>
<span class="token comment"># nothing to commit, working tree clean</span>
<span class="token comment"># 切换回 dev 分支，工作区是干净的</span>


<span class="token function">git</span> stash list
<span class="token comment"># stash@{0}: WIP on dev: f52c633 add merge</span>
<span class="token comment"># 查看 stash 状态，刚刚工作区的状态储存在了这里</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有两种恢复方法:</p><ol><li><code>git stash apply</code> 是恢复后，stash 内容并不删除，你需要用 <code>git stash drop</code> 来删除</li><li>另一种方式是用<code>git stash pop</code>，恢复的同时把 stash 内容也删了</li></ol><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>可以多次 stash，恢复的时候，先用 <code>git stash list</code> 查看，然后恢复指定的 stash，用命令： <code>git stash apply stash@{0}</code></p></div><h2 id="cherry-pick" tabindex="-1"><a class="header-anchor" href="#cherry-pick" aria-hidden="true">#</a> Cherry-pick</h2><p>在 <code>master</code> 分支上修复了 bug 后，我们要想一想，<code>dev</code> 分支是早期从 <code>master</code> 分支分出来的，所以，这个 bug 其实在当前 <code>dev</code> 分支上也存在。</p><p>同样的 bug，要在 <code>dev</code> 上修复，我们只需要把 <code>4c805e2 fix bug 101</code> 这个提交所做的修改“复制”到 <code>dev</code> 分支。注意：我们只想复制 <code>4c805e2 fix bug 101</code> 这个提交所做的修改，并不是把整个 <code>master</code> 分支 merge 过来。</p><p>为了方便操作，Git 专门提供了一个 <code>cherry-pick</code> 命令，让我们能复制一个特定的提交到当前分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch
<span class="token comment"># * dev</span>
<span class="token comment">#   master</span>
<span class="token function">git</span> cherry-pick 4c805e2
<span class="token comment"># [master 1d4b803] fix bug 101</span>
<span class="token comment">#  1 file changed, 1 insertion(+), 1 deletion(-)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Git 自动给 dev 分支做了一次提交，注意这次提交的 commit 是 <code>1d4b803</code>，它并不同于 master 的 <code>4c805e2</code>，因为这两个 commit 只是改动相同，但确实是两个不同的 commit。用 <code>git cherry-pick</code>，我们就不需要在 dev 分支上手动再把修 bug 的过程重复一遍。</p><h2 id="feature" tabindex="-1"><a class="header-anchor" href="#feature" aria-hidden="true">#</a> Feature</h2><p>软件开发中，总有无穷无尽的新的功能要不断添加进来。</p><p>添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个 <code>feature</code> 分支，在上面开发，完成后，合并，最后，删除该 <code>feature</code> 分支。</p><p>如果你开发到一半, 发现又不需要新功能，需要删除 <code>feature</code> 分支</p><p>如果要丢弃一个没有被合并过的分支，可以通过 <code>git branch -D &lt;name&gt;</code>强行删除。</p><h2 id="多人协作" tabindex="-1"><a class="header-anchor" href="#多人协作" aria-hidden="true">#</a> 多人协作</h2><p>当你从远程仓库克隆时，实际上 Git 自动把本地的 <code>master</code> 分支和远程的 <code>master</code> 分支对应起来了，并且，远程仓库的默认名称是 origin。</p><p>要查看远程库的信息，用 git remote：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote
<span class="token comment"># origin</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者使用 <code>git remote -v</code>显示更详细的信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote <span class="token parameter variable">-v</span>
<span class="token comment"># origin  git@github.com:michaelliao/learngit.git (fetch)</span>
<span class="token comment"># origin  git@github.com:michaelliao/learngit.git (push)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>上面显示了可以抓取和推送的 origin 的地址。如果没有推送权限，就看不到 push 的地址。</p></blockquote><h3 id="推送分支" tabindex="-1"><a class="header-anchor" href="#推送分支" aria-hidden="true">#</a> 推送分支</h3><p>推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git 就会把该分支推送到远程库对应的远程分支上：</p><p><code>git push origin master</code></p><p>如果要推送其他分支，比如<code>dev</code>，就改成：</p><p><code>git push origin dev</code></p><p>但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？</p><ul><li><p><code>master</code> 分支是主分支，因此要时刻与远程同步；</p></li><li><p><code>dev</code> 分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；</p></li><li><p><code>bug</code> 分支只用于在本地修复 <code>bug</code>，就没必要推到远程了，除非老板要看看你每周到底修复了几个 bug；</p></li><li><p><code>feature</code> 分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。</p></li></ul><p>总之，就是在 Git 中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！</p><h3 id="抓取分支" tabindex="-1"><a class="header-anchor" href="#抓取分支" aria-hidden="true">#</a> 抓取分支</h3><p>多人协作时，大家都会往 master 和 dev 分支上推送各自的修改。</p><p>现在我们需要在 <code>dev</code> 上开发，就必须创建远程<code>origin</code>的<code>dev</code> 分支到本地：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> dev origin/dev


<span class="token comment"># 名字最好和远程仓库的一样</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以在 dev 上继续修改</p><p>假设同时有另一个人也在他本地创建了 dev 分支，并且先你一步<code>push</code> 到远程</p><p>现在你完成了你的任务,也需要 <code>push</code> 到远程</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push origin dev
<span class="token comment"># To github.com:michaelliao/learngit.git</span>
<span class="token comment">#  ! [rejected]        dev -&gt; dev (non-fast-forward)</span>
<span class="token comment"># error: failed to push some refs to &#39;git@github.com:michaelliao/learngit.git&#39;</span>
<span class="token comment"># hint: Updates were rejected because the tip of your current branch is behind</span>
<span class="token comment"># hint: its remote counterpart. Integrate the remote changes (e.g.</span>
<span class="token comment"># hint: &#39;git pull ...&#39;) before pushing again.</span>
<span class="token comment"># hint: See the &#39;Note about fast-forwards&#39; in &#39;git push --help&#39; for details.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推送失败, 因为现在<code>dev</code>的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git 已经提示我们，先用 <code>git pull</code> 把最新的提交从 <code>origin/dev</code> 抓下来，然后，在本地合并，解决冲突，再推送：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> pull
<span class="token comment"># There is no tracking information for the current branch.</span>
<span class="token comment"># Please specify which branch you want to merge with.</span>
<span class="token comment"># See git-pull(1) for details.</span>
<span class="token comment">#</span>
<span class="token comment">#     git pull &lt;remote&gt; &lt;branch&gt;</span>
<span class="token comment">#</span>
<span class="token comment"># If you wish to set tracking information for this branch you can do so with:</span>
<span class="token comment">#</span>
<span class="token comment">#     git branch --set-upstream-to=origin/&lt;branch&gt; dev</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>git pull</code>也失败了，原因是没有指定本地<code>dev</code>分支与远程<code>origin/dev</code>分支的链接，根据提示，设置<code>dev</code>和<code>origin/dev</code>的链接,再次 <code>pull</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch --set-upstream-to<span class="token operator">=</span>origin/dev dev
<span class="token comment"># Branch &#39;dev&#39; set up to track remote branch &#39;dev&#39; from &#39;origin&#39;.</span>

<span class="token function">git</span> pull
<span class="token comment"># Auto-merging env.txt</span>
<span class="token comment"># CONFLICT (add/add): Merge conflict in env.txt</span>
<span class="token comment"># Automatic merge failed; fix conflicts and then commit the result.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这回 <code>git pull</code> 成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再 <code>push</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix env conflict&quot;</span>
<span class="token comment"># [dev 57c53ab] fix env conflict</span>
<span class="token comment">#</span>
<span class="token comment"># $ git push origin dev</span>
<span class="token comment"># Counting objects: 6, done.</span>
<span class="token comment"># Delta compression using up to 4 threads.</span>
<span class="token comment"># Compressing objects: 100% (4/4), done.</span>
<span class="token comment">#     Writing objects: 100% (6/6), 621 bytes | 621.00 KiB/s, done.</span>
<span class="token comment"># Total 6 (delta 0), reused 0 (delta 0)</span>
<span class="token comment">#     To github.com:michaelliao/learngit.git</span>
<span class="token comment">#     7a5e5dd..57c53ab  dev -&gt; dev</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rebase" tabindex="-1"><a class="header-anchor" href="#rebase" aria-hidden="true">#</a> Rebase</h2><p>在上一节我们看到了，多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后 push 的童鞋不得不先 pull，在本地合并，然后才能 push 成功。</p><p>每次合并再 push 后，分支变成了这样：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline --abbrev-commit
<span class="token comment"># * d1be385 (HEAD -&gt; master, origin/master) init hello</span>
<span class="token comment"># *   e5e69f1 Merge branch &#39;dev&#39;</span>
<span class="token comment"># |\\</span>
<span class="token comment"># | *   57c53ab (origin/dev, dev) fix env conflict</span>
<span class="token comment"># | |\\</span>
<span class="token comment"># | | * 7a5e5dd add env</span>
<span class="token comment"># | * | 7bd91f1 add new env</span>
<span class="token comment"># | |/</span>
<span class="token comment"># * |   12a631b merged bug fix 101</span>
<span class="token comment"># |\\ \\</span>
<span class="token comment"># | * | 4c805e2 fix bug 101</span>
<span class="token comment"># |/ /</span>
<span class="token comment"># * |   e1e9c68 merge with no-ff</span>
<span class="token comment"># |\\ \\</span>
<span class="token comment"># | |/</span>
<span class="token comment"># | * f52c633 add merge</span>
<span class="token comment"># |/</span>
<span class="token comment"># *   cf810e4 conflict fixed</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候，rebase 就派上了用场：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> rebase
<span class="token comment"># First, rewinding head to replay your work on top of it...</span>
<span class="token comment"># Applying: add comment</span>
<span class="token comment"># Using index info to reconstruct a base tree...</span>
<span class="token comment"># M	hello.py</span>
<span class="token comment"># Falling back to patching base and 3-way merge...</span>
<span class="token comment"># Auto-merging hello.py</span>
<span class="token comment"># Applying: add author</span>
<span class="token comment"># Using index info to reconstruct a base tree...</span>
<span class="token comment"># M	hello.py</span>
<span class="token comment"># Falling back to patching base and 3-way merge...</span>
<span class="token comment"># Auto-merging hello.py</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再用<code>git log</code>看看：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline --abbrev-commit
<span class="token comment"># * 7e61ed4 (HEAD -&gt; master) add author</span>
<span class="token comment"># * 3611cfe add comment</span>
<span class="token comment"># * f005ed4 (origin/master) set exit=1</span>
<span class="token comment"># * d1be385 init hello</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原本分叉的提交现在变成一条直线了</p><p>通过<code>push</code>操作把本地分支推送到远程</p><p>再用<code>git log</code>看看效果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline --abbrev-commit
<span class="token comment"># * 7e61ed4 (HEAD -&gt; master, origin/master) add author</span>
<span class="token comment"># * 3611cfe add comment</span>
<span class="token comment"># * f005ed4 set exit=1</span>
<span class="token comment"># * d1be385 init hello</span>
<span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>远程分支的提交历史也是一条直线。</p>`,117),c=[d];function t(l,o){return n(),s("div",null,c)}const m=e(i,[["render",t],["__file","06-分支.html.vue"]]);export{m as default};
