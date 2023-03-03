import{_ as n,p as s,q as a,a1 as e}from"./framework-7db056f4.js";const t={},p=e(`<h1 id="包-变量和函数" tabindex="-1"><a class="header-anchor" href="#包-变量和函数" aria-hidden="true">#</a> 包，变量和函数</h1><h2 id="包" tabindex="-1"><a class="header-anchor" href="#包" aria-hidden="true">#</a> 包</h2><p>每个 Go 程序都是由包构成的。</p><p>按照约定，包名与导入路径的最后一个元素一致。例如，&quot;math/rand&quot; 包中的源码均以 package rand 语句开始。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;My favorite number is&quot;</span><span class="token punctuation">,</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>圆括号组合了导入，这是“分组”形式的导入语句。</p><p>当然你也可以编写多个导入语句，例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;math&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>不过使用分组导入语句是更好的形式。</p><h3 id="导出名" tabindex="-1"><a class="header-anchor" href="#导出名" aria-hidden="true">#</a> 导出名</h3><p>在 Go 中，如果一个名字以大写字母开头，那么它就是已导出的。例如，Pizza 就是个已导出名，Pi 也同样，它导出自 math 包。</p><p>在导入一个包时，你只能引用其中已导出的名字。任何“未导出”的名字在该包外均无法访问。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>Pi<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>例如：<code>math.pi</code>, p 是小写，是 &quot;未导出&quot; 的，因此你无法访问</p></blockquote><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><p>函数可以没有参数或接受多个参数。</p><p>在本例中，add 接受两个 int 类型的参数。</p><p>注意类型在变量名 <b>之后</b>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当连续两个或多个函数的已命名形参类型相同时，除最后一个类型以外，其它都可以省略。</p><p>在本例中，</p><p>x int, y int 被缩写为</p><p>x, y int</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多值返回" tabindex="-1"><a class="header-anchor" href="#多值返回" aria-hidden="true">#</a> 多值返回</h3><p>函数可以返回任意数量的返回值。</p><p>swap 函数返回了两个字符串。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">swap</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> y<span class="token punctuation">,</span> x
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span> b <span class="token operator">:=</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命名返回值" tabindex="-1"><a class="header-anchor" href="#命名返回值" aria-hidden="true">#</a> 命名返回值</h3><p>Go 的返回值可被命名，它们会被视作定义在函数顶部的变量。</p><p>返回值的名称应当具有一定的意义，它可以作为文档使用。</p><p>没有参数的 return 语句返回已命名的返回值。也就是 直接 返回。</p><p>直接返回语句应当仅用在下面这样的短函数中。在长的函数中它们会影响代码的可读性。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">split</span><span class="token punctuation">(</span>sum <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x <span class="token operator">=</span> sum <span class="token operator">*</span> <span class="token number">4</span> <span class="token operator">/</span> <span class="token number">9</span>
	y <span class="token operator">=</span> sum <span class="token operator">-</span> x
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><p>var 语句用于声明一个变量列表，跟函数的参数列表一样，类型在最后。</p><p>就像在这个例子中看到的一样，<code>var</code> 语句可以出现在包或函数级别。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">var</span> c<span class="token punctuation">,</span> python<span class="token punctuation">,</span> java <span class="token builtin">bool</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i <span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> c<span class="token punctuation">,</span> python<span class="token punctuation">,</span> java<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量初始化" tabindex="-1"><a class="header-anchor" href="#变量初始化" aria-hidden="true">#</a> 变量初始化</h3><p>变量声明可以包含初始值，每个变量对应一个。</p><b> 如果初始化值已存在，则可以省略类型；变量会从初始值中获得类型。 </b><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> i<span class="token punctuation">,</span> j <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>

<span class="token keyword">var</span> c<span class="token punctuation">,</span> python<span class="token punctuation">,</span> java <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;no!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="短变量声明" tabindex="-1"><a class="header-anchor" href="#短变量声明" aria-hidden="true">#</a> 短变量声明</h3><p>在函数中，简洁赋值语句 <code>:=</code> 可在类型明确的地方代替 <code>var</code> 声明。</p><p>函数外的每个语句都必须以关键字开始（<code>var</code>, <code>func</code> 等等），因此 <code>:=</code> 结构不能在函数外使用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> i<span class="token punctuation">,</span> j <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>
k <span class="token operator">:=</span> <span class="token number">3</span>
c<span class="token punctuation">,</span> python<span class="token punctuation">,</span> java <span class="token operator">:=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;no!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本类型" tabindex="-1"><a class="header-anchor" href="#基本类型" aria-hidden="true">#</a> 基本类型</h3><p>Go 的基本类型有</p><ul><li>bool (1byte)</li><li>string</li><li>int int8 int16 int32 int64</li><li>uint uint8 uint16 uint32 uint64 uintptr</li><li>byte （uint8 的别名）</li><li>rune （int32 的别名，表示一个 Unicode 码点）</li><li>float32 float64 （单精度，双精度）</li><li>complex64 complex128 （复数）</li></ul><blockquote><p>32 位实数和 32 位虚数，64 位实数和 64 位虚数 （其中实数和虚数都是浮点数）</p></blockquote><p>本例展示了几种类型的变量。 同导入语句一样，变量声明也可以“分组”成一个语法块。</p><p>int, uint 和 uintptr 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。 当你需要一个整数值时应使用 int 类型，除非你有特殊的理由使用固定大小或无符号的整数类型</p><h4 id="字符和串" tabindex="-1"><a class="header-anchor" href="#字符和串" aria-hidden="true">#</a> 字符和串</h4><p>字符串是一串固定长度的字符连接起来的字符序列。golang 没有专门的存储字符类型，如果要存储单个字符，用 byte 来保存。go 的字符串是由单个字节连接起来的，它与传统的字符串是由字符组成的不同。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> c1 <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token char">&#39;a&#39;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们直接输出字符 c1,，得到的是它的 ascII 值：97。要用格式化输出：fmt.Printf(&quot;%c&quot;,c1)。而当我们要存储中文时，此时不能够用 byte 类型了，即 ASCII 值大于 255 时，会显示溢出，我们要用 int 来存储：</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>格式化输出代表含义：</p><ul><li><code>%d</code>：输出整型</li><li><code>%f</code>：输出浮点型</li><li><code>%c</code>：输出字符型</li><li><code>%v</code>：输出原变量值</li><li><code>%T</code>：输出变量的数据类型</li><li><code>%t</code>：输出布尔值</li><li><code>%q</code>：输出带双引号的字符串</li></ul></div><p><b>字符类型使用细节：</b></p><ol><li>字符常量使用单引号括起来的单个字符；</li><li>go 中允许使用转义字符&#39;&#39;来将其后的字符转变为特殊字符型常量，例如 var c int = &#39;\\n&#39;；</li><li>字符使用 utf-8 编码；</li><li>go 中，字符的本质是一个整数，直接输出时，会输出它对应的 UTF-8 编码的值；</li><li>可以直接给变量赋予某个数字，然后格式化输出%c，会输出该数字对应的 unicode 字符；</li><li>字符类型是可以进行运算的，相当于一个整数，因为它都对应 unicode 码；</li></ol><p><b>字符串的使用细节：</b></p><ol><li>go 语言的字符串的字节使用 utf-8 编码；</li><li>与 python 一样，一旦字符串赋值了，就不能被更改；</li><li>两种表示形式 <ol><li>双引号，会识别转义字符； 　　2. 反引号，以字符串的原生形式输出，包括换行和特殊字符，可以实现防止攻击，输出源代码等</li></ol></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">&quot;abc\\nabc&quot;</span>
    <span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token string">\`abc\\nabc\`</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><b>字符串的拼接</b>，当我们要拼接多行字符串时，要将加号留在每行末尾：（注意单个字符进行拼接是指对 unicode 值进行相加）</p><h3 id="零值" tabindex="-1"><a class="header-anchor" href="#零值" aria-hidden="true">#</a> 零值</h3><p>没有明确初始值的变量声明会被赋予它们的 <b>零值</b>。</p><p>零值是：</p><p>数值类型为 <code>0</code>， 布尔类型为 <code>false</code>， 字符串为 <code>&quot;&quot;</code>（空字符串）。</p><h3 id="类型转换" tabindex="-1"><a class="header-anchor" href="#类型转换" aria-hidden="true">#</a> 类型转换</h3><p>表达式 T(v) 将值 v 转换为类型 T。</p><p>一些关于数值的转换：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> i <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">42</span>
<span class="token keyword">var</span> f <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token function">float64</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token keyword">var</span> u <span class="token builtin">uint</span> <span class="token operator">=</span> <span class="token function">uint</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，更加简单的形式：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">42</span>
f <span class="token operator">:=</span> <span class="token function">float64</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
u <span class="token operator">:=</span> <span class="token function">uint</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 C 不同的是，Go 在不同类型的项之间赋值时需要显式转换。试着移除例子中 float64 或 uint 的转换看看会发生什么。</p><h3 id="类型推导" tabindex="-1"><a class="header-anchor" href="#类型推导" aria-hidden="true">#</a> 类型推导</h3><p>在声明一个变量而不指定其类型时（即使用不带类型的 := 语法或 var = 表达式语法），变量的类型由右值推导得出。</p><p>当右值声明了类型时，新变量的类型与其相同：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> i <span class="token builtin">int</span>
j <span class="token operator">:=</span> i <span class="token comment">// j 也是一个 int</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>不过当右边包含未指明类型的数值常量时，新变量的类型就可能是 int, float64 或 complex128 了，这取决于常量的精度：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">42</span>           <span class="token comment">// int</span>
f <span class="token operator">:=</span> <span class="token number">3.142</span>        <span class="token comment">// float64</span>
g <span class="token operator">:=</span> <span class="token number">0.867</span> <span class="token operator">+</span> <span class="token number">0.5i</span> <span class="token comment">// complex128</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h3><p>常量的声明与变量类似，只不过是使用 <code>const</code> 关键字。</p><p>常量可以是字符、字符串、布尔值或数值。</p><p>常量不能用 := 语法声明。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> Pi <span class="token operator">=</span> <span class="token number">3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="数值常量" tabindex="-1"><a class="header-anchor" href="#数值常量" aria-hidden="true">#</a> 数值常量</h3><p>数值常量是高精度的 <b>值</b>。</p><p>一个未指定类型的常量由上下文来决定其类型。</p><p>（int 类型最大可以存储一个 64 位的整数，有时会更小。）</p><p>（int 可以存放最大 64 位的整数，根据平台不同有时会更少。）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	<span class="token comment">// 将 1 左移 100 位来创建一个非常大的数字</span>
	<span class="token comment">// 即这个数的二进制是 1 后面跟着 100 个 0</span>
	Big <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">100</span>
	<span class="token comment">// 再往右移 99 位，即 Small = 1 &lt;&lt; 1，或者说 Small = 2</span>
	Small <span class="token operator">=</span> Big <span class="token operator">&gt;&gt;</span> <span class="token number">99</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">needInt</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x<span class="token operator">*</span><span class="token number">10</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">needFloat</span><span class="token punctuation">(</span>x <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">*</span> <span class="token number">0.1</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">needInt</span><span class="token punctuation">(</span>Small<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">needFloat</span><span class="token punctuation">(</span>Small<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">needFloat</span><span class="token punctuation">(</span>Big<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="补充-符号" tabindex="-1"><a class="header-anchor" href="#补充-符号" aria-hidden="true">#</a> 补充：符号</h2><p>运算符：基本与 c 的符号一样， 除了自增减符号(++)</p><p>Go 中的自增减不是一种表达式，而是语句，这意味着它不能被写到其它语句里</p><p>即：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cnt := 0

a := ++ cnt //错误

cnt ++ // 正确
a := cnt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p><code>++ cnt</code> 的写法也是错误的，<code>++</code>只能写在右边</p></div>`,99),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","01-包变量函数.html.vue"]]);export{d as default};
