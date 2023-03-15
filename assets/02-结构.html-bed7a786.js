import{_ as e,p as i,q as a,a1 as n}from"./framework-7db056f4.js";const s={},d=n(`<h1 id="repo-的构成" tabindex="-1"><a class="header-anchor" href="#repo-的构成" aria-hidden="true">#</a> Repo 的构成</h1><h2 id="工作区" tabindex="-1"><a class="header-anchor" href="#工作区" aria-hidden="true">#</a> 工作区</h2><p>其实就是代码区，存放的就是实际项目文件</p><h2 id="暂存区" tabindex="-1"><a class="header-anchor" href="#暂存区" aria-hidden="true">#</a> 暂存区</h2><p>也叫 stage 或 index, 存放在 <code>.git/index</code></p><p>它的作用是存放的临时文件(已经决定或未决定将改动写入版本库的文件)</p><h2 id="版本库" tabindex="-1"><a class="header-anchor" href="#版本库" aria-hidden="true">#</a> 版本库</h2><p>版本库又名仓库(repository)，可以简单理解成一个目录，这个目录里面的所有文件都可以被 Git 管理起来，每个文件的修改、删除，Git 都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。</p><h3 id="创建一个版本库" tabindex="-1"><a class="header-anchor" href="#创建一个版本库" aria-hidden="true">#</a> 创建一个版本库</h3><h4 id="第一步-选择合适的目录" tabindex="-1"><a class="header-anchor" href="#第一步-选择合适的目录" aria-hidden="true">#</a> 第一步, 选择合适的目录</h4><p>选择一个合适的目录，打开终端(windows 上在合适的目录，右键使用 git bash)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> helloworld
<span class="token builtin class-name">cd</span> helloworld
<span class="token builtin class-name">pwd</span>    <span class="token comment"># 比如 /home/msqt/git/helloworld</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="第二步-初始化-git-仓库" tabindex="-1"><a class="header-anchor" href="#第二步-初始化-git-仓库" aria-hidden="true">#</a> 第二步，初始化 Git 仓库</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> init
<span class="token comment"># Initialized empty Git repository in /home/msqt/git/helloworld/.git/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ok, 现在一个 git 版本库已经创建完成了, 如果你足够细心，应该会发现目录下多了一个<code>.git</code>文件夹</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>该目录是用来跟踪管理版本库的，如果你不是足够了它，最好不要随意修改，否则可能会给你的项目带来不可逆的伤害!</p></div><h4 id="添加文件进版本库" tabindex="-1"><a class="header-anchor" href="#添加文件进版本库" aria-hidden="true">#</a> 添加文件进版本库</h4><p>所有的版本控制系统，其实只能跟踪文本文件的改动，比如 TXT 文件，网页，所有的程序代码等等，Git 也不例外。版本控制系统可以告诉你每次的改动，比如在第 5 行加了一个单词“Linux”，在第 8 行删了一个单词“Windows”。</p><p>而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从 100KB 改成了 120KB，但到底改了啥，版本控制系统不知道，也没法知道。</p><h5 id="添加一个-readme-到仓库中" tabindex="-1"><a class="header-anchor" href="#添加一个-readme-到仓库中" aria-hidden="true">#</a> 添加一个 readme 到仓库中</h5><p>好的，现在来添加一个 readme 文件进仓库， 基本上分为 3 步：</p><ol><li>在工作区创建并编写文件</li><li>把文件添加进暂存区</li><li>把文件提交到版本库</li></ol><p><b>编写文件</b></p><p>编写一个 readme.md 文件</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>在 add 文件前，可以使用 <code>git status</code> 查看文件的状态, 以确定要 add 的文件</p></div><p><b>Add</b></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> readme.md

<span class="token comment"># 可以使用 git add . 将工作区中改动(删除，修改)的所有文件加入暂存区，以追踪这个文件</span>

<span class="token comment"># 执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功。</span>


<span class="token function">git</span> status
<span class="token comment"># 查看添加的文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>如果你一不小心把错误的文件加入了暂存区，可以使用 <code>git rm --cached &lt;file&gt;</code> 把文件移除暂存区</p></div><p>只要文件存在暂存区(index)内，它就会被追踪</p><blockquote><p><b>track</b> 意味着，这个文件的一切更改就会被 git 读取到</p></blockquote><p><b>Commit</b></p><p>简单地说，commit 操作会把加入到暂存区的文件更改&quot;半永久化&quot;(把这些文件提交到版本库)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;some info&#39;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，恭喜你已经掌握了 git 最核心的功能，接下来可以多人协作开发项目了</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>commit 总是会给我一种勇者终于到达了存档点的错觉，但其实文件早在 add 阶段就被加入 git 数据库了； 保存、更新仓库的信息，并生成新的日志才是 commit 的任务。</p></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>现在我们会初始化一个空的 git 项目了，你知道如何在一个存在文件的项目初始化仓库了吗？</p></div><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.git
├── HEAD
├── branches
├── config                      # 配置文件
├── description                 # 仓库的描述，可以在托管网站显示
├── hooks                       # git 提供的一套脚本，可以在不同操作时机执行
│ ├── pre-commit.sample         # 在 commit 前执行 的 shell 脚本
│ ├── pre-push.sample
│ └── ...
├── info
│ └── exclude
├── objects
│ ├── info
│ └── pack
└── refs
├── heads
└── tags

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),l=[d];function t(c,r){return i(),a("div",null,l)}const p=e(s,[["render",t],["__file","02-结构.html.vue"]]);export{p as default};
