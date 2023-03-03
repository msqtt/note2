import{_ as a,M as l,p as d,q as c,R as n,t as e,N as t,a1 as s}from"./framework-7db056f4.js";const r={},o=s(`<h1 id="部署篇" tabindex="-1"><a class="header-anchor" href="#部署篇" aria-hidden="true">#</a> 部署篇</h1><p>这里是最最最激动人心的地方，终于要部署你千辛万苦写完的项目啦</p><p>这里部署的顺序，可以反着来，因为前端的部署一定情况下依赖于后端的部署，因此我们可以暂且先放眼于后端，因为操作的指令都是一样的，细节的区别再分别详细介绍</p><h2 id="后端部署" tabindex="-1"><a class="header-anchor" href="#后端部署" aria-hidden="true">#</a> 后端部署</h2><p>数据库建表，服务端容器配置，这些内容暂时不属于笔记分享范围</p><p><b>后端程序需要打包或编译</b>，以 java 为例</p><p>java 打包部署，因为本人技术有限推荐使用 jar 打包，减少部署的麻烦，如果你并不想把所有东西都打成 jar 包，可以去搜索学习一下依赖分离，和容器分离地打包方式，我仅使用<code>fat jar</code> 演示</p><h3 id="手动部署" tabindex="-1"><a class="header-anchor" href="#手动部署" aria-hidden="true">#</a> 手动部署</h3><p>手动部署就是人工把服务端上传到服务器运行部署，虽然麻烦，且一旦出现问题每次都要重新打包上传，但是通过这个方法你可以熟练地掌握这些细节</p><h4 id="服务端打包" tabindex="-1"><a class="header-anchor" href="#服务端打包" aria-hidden="true">#</a> 服务端打包</h4><p>虽然使用 jar 部署，但还是推荐把配置文件分离，这样可以直接在服务上修改配置后重新部署，减少手动上传的次数</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>关于为什么需要把配置文件分离？以上的理由算一个，还有一个理由：开发环境和部署环境是不一样的，有可能你需要把配置文件里的名称，或路径更改，那么分离配置文件可以灵活地做到及时修改</p></div><p>进入 idea</p><ol><li>用 maven 打包，在 lifecycle 中选中<code>clean</code>和<code>jar</code> 运行 <img src="https://user-images.githubusercontent.com/94043894/184806490-7c5438ec-0431-4fa7-8154-d7b151a7ab84.png" alt="image"></li><li>打包完成，在<code>target</code>目录下，存放着我们打好的 jar 包了 <img src="https://user-images.githubusercontent.com/94043894/184801822-14c88bb9-9c63-42e6-af39-f614cd9bbad8.png" alt="image"></li></ol><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>其实你的配置文件已经被默认复制进了 jar 包里，但是没必要花精力去阻止它们被复制，我们只需要在服务器运行时，使用新的配置(<code>application.yml</code> 或 <code>application.proerties</code>)文件覆盖就可以了，详细请接着看。</p></div><p>好的开始是成功的一半，我们现在获得了一个 jar 和若干配置文件</p><h4 id="上传服务器" tabindex="-1"><a class="header-anchor" href="#上传服务器" aria-hidden="true">#</a> 上传服务器</h4><p>现在我们需要把 jar 和配置文件上传到服务器上，服务间文件传输的协议一般为 <code>sftp</code>，我们可以选择的工具有很多，如果你喜欢使用<code>xftp</code>也没问题，更者你想先把文件传到 git 仓库，再从仓库下到服务器，都可以</p><p>这里我选择使用<code>openssh</code>包下自带的指令<code>scp</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">scp</span> a.tar.gz username@127.0.0.1:~/xx
<span class="token comment"># 表示把 a.tar.gz 文件拷贝到服务器 username 用户的家目录里的 xx 里</span>


<span class="token function">scp</span> a b c username@127.0.0.1:~/xx
<span class="token comment"># scp 支持多文件拷贝，这行表示将 a b c 文件拷贝到服务器 username 用户的家目录里的 xx 里，~表示/home/username</span>


<span class="token function">scp</span> <span class="token parameter variable">-r</span> ~/xx username@127.0.0.1:~/
<span class="token comment"># scp 支持文件夹直接拷贝，这行表示把本地当前用户家目录的 xx 文件夹拷贝到服务器 username 用户的家目录里</span>


<span class="token comment"># 如果你想从服务器下载文件，可以使用</span>
<span class="token function">scp</span> username@127.0.0.1:~/a.tar.gz ~/xx
<span class="token comment"># 即把服务器 username 用户家目录下的 a.tar.gz 文件下载到本地用户家目录下的 xx 里</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>当然<code>username@127.0.0.1:path</code>里的 path，不仅限于家目录，只要是目标用户有权限访问到的地方都可以拷贝到，若是不存在的文件夹，ssh 会帮忙创建的</p></div><p><b>将上一步得到的 jar 和配置文件上传到服务器上</b><img src="https://user-images.githubusercontent.com/94043894/184807600-c5e3e57e-c8df-4b15-abd8-ddc0839e46b5.png" alt="image"></p><p>好了，接下来直接到服务器上查看 <img src="https://user-images.githubusercontent.com/94043894/184808184-4e8ffbce-802d-4928-ba1b-dc51dde73b0f.png" alt="image"></p><p>上传完成</p><h4 id="配置服务端" tabindex="-1"><a class="header-anchor" href="#配置服务端" aria-hidden="true">#</a> 配置服务端</h4><p>登录服务器后，cd 进入服务端工作的目录</p><p>如果你之前被打入 jar 包的配置文件没有什么问题，此时完全可以直接执行<code>java -jar ./xxxx.jar</code>，运行服务端了。</p><p>但若要使用新的配置文件，可以执行<code>java -jar xxx.jar --spring.config.location=绝对路径</code>让 java 以绝对路径的配置文件执行</p><p><b>我推荐使用以下的方案：</b> Spring 程序会按优先级从下面这些路径来加载 application.properties 配置文件</p><ul><li>当前目录下的<code>/config</code> 目录</li><li>当前目录</li><li>classpath 里的<code>/config</code> 目录</li><li>classpath 跟目录</li></ul><p>所以你可以直接把配置文件放在 jar 包目录下，或 jar 包目录下的<code>config</code>文件夹里</p><blockquote><p>如果你为了不同环境设置了一个配置文件，请使用<code>application-</code>前缀命名它们，例如：<code>application-dev.yml</code> 这样做，你就可以在运行时直接执行<code>java -jar xxx.jar --spring.config.location=dev</code>进行选择配置文件执行</p></blockquote><p>这里我们直接新建<code>config</code>文件夹，把配置文件放在里面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> config
<span class="token function">mv</span> application.yml logback-spring.xml config/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://user-images.githubusercontent.com/94043894/184813316-7413fc0f-5c1d-473c-9430-c4d0f8b9747b.png" alt="image"></p><p>好了，试试命令：<code>java -jar xxxx.jar</code>运行你的服务端</p><p><img src="https://user-images.githubusercontent.com/94043894/184825107-b3c0f4d9-def3-40b8-bb6d-3341cd2bf6be.png" alt="image"></p><p>没有问题！</p><h4 id="持续运行服务端" tabindex="-1"><a class="header-anchor" href="#持续运行服务端" aria-hidden="true">#</a> 持续运行服务端</h4><p>读到上面，你已经兴高采烈地启动后端了，可是又出现问题了，你只要断开 ssh，程序就被终止了</p><p>这是为什么呢？原来在 linux 中，window 和 session 是绑定在一起的，只要 session 结束，window 就关闭了，此时 window 中运行的非守护进程就会直接结束了，反之也成立，把 window 关闭后 session 也会被迫断开</p><p>因此让后端程序持续运行就有<b>两个方案</b>:</p><ul><li>以守护进程来运行程序</li><li>将 window 和 session &quot;解绑&quot;</li></ul><h5 id="守护进程" tabindex="-1"><a class="header-anchor" href="#守护进程" aria-hidden="true">#</a> 守护进程</h5><p>守护进程和其他进程的区别是什么呢？守护进程其实并不是需要守护的进程（这么理解也没毛病），而是守护其他进程的进程，即直到其他所有进程都结束才会结束的进程</p><p>所以，可以<b>使用守护进程运行</b>服务端</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> xxx.jar <span class="token operator">&amp;</span>

<span class="token comment"># nohup java -jar CodeSheep-1.0.1.jar</span>
<span class="token comment"># nohup: ignoring input and appending output to &#39;nohup.out&#39; 在该目录保存了一个.out 文件，它实时更新该进程的输出文字（保存日志都省了 bushi）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用 <code>tail -f nohup.out</code> 实时查看程序情况</p></blockquote><p>如此一来，服务端就在后台以守护进程的方式执行了，现在我们关闭 ssh,服务端一样运行</p><p>那么如果要<b>关闭程序</b>呢？没有办法，你只能使用 kill pid 的方式来关闭程序</p><p>获取<b>pid:</b></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> xxx <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span>
<span class="token comment"># xxx 为你进程名称的关键词</span>

<span class="token comment"># ps -ef | grep CodeSheep | grep -v grep</span>
<span class="token comment"># mosquito  559004  538908  8 16:11 pts/3    00:00:10 java -jar CodeSheep-1.0.1.jar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里第二个数字就是程序的<code>pid</code>, 我这里的 pid 是<code>559004</code></p><p>关闭<b>进程：</b></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token number">559004</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="tmux" tabindex="-1"><a class="header-anchor" href="#tmux" aria-hidden="true">#</a> tmux</h5><p>我推荐使用 tmux， 运行/管理你的进程和窗口</p>`,57),p={href:"https://www.ruanyifeng.com/blog/2019/10/tmux.html",target:"_blank",rel:"noopener noreferrer"},v=s(`<h3 id="半自动部署" tabindex="-1"><a class="header-anchor" href="#半自动部署" aria-hidden="true">#</a> 半自动部署</h3><p>可以使用 idea 部署，这个随便看个教程就知道了，其实无非也是配置好了 sftp，能更快捷地帮你传输文件而已，你需要更精细地活，还是要亲自操作</p><h2 id="前端部署" tabindex="-1"><a class="header-anchor" href="#前端部署" aria-hidden="true">#</a> 前端部署</h2><p>web 前端项目部署方式主要分仨种：</p><ol><li>与后端部署在一起，即部署不分离，由后端路由返回页面</li><li>前端单独部署，路由前端完成</li><li>奇美拉式部署，既有前端部署，又有后端返回页面，传说中的部署，最强无敌的融合，全栈工程师的梦幻天堂(bushi)</li></ol><p>显然第二种方式前后端分离开更为灵活，更为合理，我们主要讨论第二种部署的方法</p><p>可以使用 git 来维护/部署，即你可以直接在服务器上<code>git clone</code> 你的前端工程，通过 <code>npm i</code> 安装依赖，在服务器上运行<code>npm build</code> 来打包，你甚至可以写个脚本(sh)自动执行这些过程，而当你的项目代码需要更新时，只需要把更改提交到仓库，再运行一遍脚本即可</p><blockquote><p>但不推荐，安装依赖和编译都会浪费服务器的资源，推荐在开发环境（本地） build 好了以后再把静态文件传上服务器</p></blockquote><p>还有更更灵活的思路，利用<code>github action</code>来安装依赖和打包，直接把静态文件发送到 nginx 服务器上，这样一来你只需要在仓库提交触发<code>action</code>, 便可以全自动部署好前端页面了（服务器连环境都不用安装 笑）</p><h3 id="手动部署-1" tabindex="-1"><a class="header-anchor" href="#手动部署-1" aria-hidden="true">#</a> 手动部署</h3><h4 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h4><p>安装完 nginx 后，我们发现用浏览器打开服务器 ip，就可以直接看到 nginx 的默认欢迎页面</p><table><thead><tr><th>欢迎</th></tr></thead><tbody><tr><td><img src="https://user-images.githubusercontent.com/94043894/184842972-a02dc475-bec2-4857-aa2f-2a13a582464e.png" alt="image"></td></tr></tbody></table><p>该页面保存在：<code>/var/www/html/index.nginx-debian.html</code></p><h5 id="上传静态文件" tabindex="-1"><a class="header-anchor" href="#上传静态文件" aria-hidden="true">#</a> 上传静态文件</h5><p>ok，现在回到本地，把需要部署的前端静态文件传入<code>/var/www/html/</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">scp</span> <span class="token parameter variable">-r</span> ./react/codesheep root@127.0.0.1:/var/www/html/ <span class="token comment"># scp 的说明在后端部署部分里有</span>

<span class="token comment"># 注意这里因为需要进入 var, 因此需要 root 权限，当然你也可以先传进非 root 用户的家目录，再 sudo 移过去</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入<code>/etc/nginx/sites-available</code>, 编辑 default 文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/nginx/sites-available

<span class="token function">vim</span> default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>找到<code>root /var/www/html</code>这行，改成<code>root/var/www/html/codesheep</code></p><p>修改完成，保存退出</p><p>输入：<code>sudo nginx -t</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> nginx <span class="token parameter variable">-t</span>
nginx: the configuration <span class="token function">file</span> /etc/nginx/nginx.conf syntax is ok
nginx: configuration <span class="token function">file</span> /etc/nginx/nginx.conf <span class="token builtin class-name">test</span> is successful
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出现<code>ok</code>，和<code>successful</code>就说明语法正确</p><p>重启 nginx 服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">service</span> nginx restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新访问 ip，页面出现就成功了</p><h5 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置" aria-hidden="true">#</a> nginx 配置</h5><p>nginx 配置有很多，这里就列些常用最简单的</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
    listen 80 default_server; #监听端口
    server_name _;  #域名
    root /var/www/html    # 静态文件目录

    location / {
        try_files $uri $uri/ /index.html; # vue react 单页应用项目，配置路由到/index.html
    }

    location /api/ {        # 注意斜杆不能少
        proxy_pass http://localhost:8080/; # 跨域，后端地址，注意斜杆不能少
    }

    gzip  on; # 页面 gzip 压缩
    gzip_min_length  1k;
    gzip_buffers     4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 9;
    gzip_types       text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
    gzip_disable &quot;MSIE [1-6]\\.&quot;;
    gzip_vary on;

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Codesheep 使用的配置：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>user nginx;
worker_processes 1;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

    #请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3;
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip  on;
	gzip_min_length  1k;
	gzip_buffers     4 16k;
	gzip_http_version 1.1;
	gzip_comp_level 9;
	gzip_types       text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
	gzip_disable &quot;MSIE [1-6]\\.&quot;;
	gzip_vary on;


	##
	# loading balance
	##

	upstream backserver {
	    server xx.xx.xx.xx:8080 weight=7;
	    server xx.xx.xx.xx:8080 weight=3;
	}

	server {

		listen 443 ssl;
		charset utf-8;


		# Add index.php to the list if you are using PHP
		index index.html index.htm index.nginx-debian.html;

		#请填写绑定证书的域名
		server_name www.codesheep.xyz;
		#请填写证书文件的相对路径或绝对路径
		ssl_certificate cert/www.codesheep.xyz_bundle.crt;
		#请填写私钥文件的相对路径或绝对路径
		ssl_certificate_key cert/www.codesheep.xyz.key;
		ssl_session_timeout 5m;

		location / {
			# First attempt to serve request as file, then
			# as directory, then fall back to displaying a 404.
			root /usr/share/nginx/html/codesheep/;
			#try_files $uri $uri/ =404;
			try_files $uri $uri/ /index.html;
		}
		location /api/code-run {
			proxy_pass http://backserver/code-run;
		}
		location /api/ {
			proxy_pass http://xx.xx.xx.xx:8080/;
		}
		location /user/ {
			proxy_pass http://xx.xx.xx.xx:8080/;
		}
	}
	server {
		listen 80;
		listen [::]:80;
		server_name www.codesheep.xyz;
		# return 301 https://$host$request_uri;
		return 301 https://$host;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动部署" tabindex="-1"><a class="header-anchor" href="#自动部署" aria-hidden="true">#</a> 自动部署</h3><p>就像开头介绍的那样，使用<code>github action</code>来自动部署页面</p><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h3><p>nignx 的配置</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token comment"># 镜像名 如果需要指定版本 就把 latest 换成版本号</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> codesheep<span class="token punctuation">-</span>web
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span>
      <span class="token punctuation">-</span> 443<span class="token punctuation">:</span><span class="token number">443</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token comment"># 证书映射</span>
      <span class="token punctuation">-</span> ./cert<span class="token punctuation">:</span>/etc/nginx/cert
      <span class="token comment"># 配置文件映射</span>
      <span class="token punctuation">-</span> ./nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf
      <span class="token comment"># 页面目录</span>
      <span class="token punctuation">-</span> ./html<span class="token punctuation">:</span>/usr/share/nginx/html
      <span class="token comment"># 主机本机时间文件映射 与本机时间同步</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>注意 volumes 的映射和上面 nginx 配置对应</p></div>`,39);function u(m,b){const i=l("ExternalLinkIcon");return d(),c("div",null,[o,n("p",null,[e("网上的教程很多，推荐"),n("a",p,[e(" 阮老师的 tmux 博客 "),t(i)])]),v])}const g=a(r,[["render",u],["__file","03-部署.html.vue"]]);export{g as default};
