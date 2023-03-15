import{_ as p,M as e,p as o,q as c,R as s,t as n,N as i,a1 as a}from"./framework-7db056f4.js";const l={},u=a(`<h1 id="方法和接口" tabindex="-1"><a class="header-anchor" href="#方法和接口" aria-hidden="true">#</a> 方法和接口</h1><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2><p>Go 没有类。不过你可以为结构体类型定义方法。</p><p>方法就是一类带特殊的 接收者 参数的函数。 方法接收者在它自己的参数列表内，位于 func 关键字和方法名之间。</p><p>在此例中，Abs 方法拥有一个名为 v，类型为 Vertex 的接收者。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v Vertex<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法即函数" tabindex="-1"><a class="header-anchor" href="#方法即函数" aria-hidden="true">#</a> 方法即函数</h3><p>记住：方法只是个带接收者参数的函数。</p><p>现在这个 Abs 的写法就是个正常的函数，功能并没有什么变化。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Abs</span><span class="token punctuation">(</span>v Vertex<span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Abs</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其它方法" tabindex="-1"><a class="header-anchor" href="#其它方法" aria-hidden="true">#</a> 其它方法</h3><p>你也可以为非结构体类型声明方法。</p><p>在此例中，我们看到了一个带 Abs 方法的数值类型 MyFloat。</p><p>你只能为在同一包内定义的类型的接收者声明方法，而不能为其它包内定义的类型（包括 int 之类的内建类型）的接收者声明方法。</p><blockquote><p>就是接收者的类型定义和方法声明必须在同一包内；不能为内建类型声明方法。）</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> MyFloat <span class="token builtin">float64</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f MyFloat<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> f <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token operator">-</span>f<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">float64</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	f <span class="token operator">:=</span> <span class="token function">MyFloat</span><span class="token punctuation">(</span><span class="token operator">-</span>math<span class="token punctuation">.</span>Sqrt2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针接收者" tabindex="-1"><a class="header-anchor" href="#指针接收者" aria-hidden="true">#</a> 指针接收者</h3><p>你可以为指针接收者声明方法。</p><p>这意味着对于某类型 T，接收者的类型可以用 <code>*T</code> 的文法。（此外，T 不能是像<code>*int </code> 这样的指针。）</p><p>例如，这里为 <code>*Vertex</code> 定义了 Scale 方法。</p><p>指针接收者的方法可以修改接收者指向的值（就像 Scale 在这做的）。由于方法经常需要修改它的接收者，指针接收者比值接收者更常用。</p><p>若使用值接收者，那么 Scale 方法会对原始 Vertex 值的副本进行操作。（对于函数的其它参数也是如此。）Scale 方法必须用指针接受者来更改 main 函数中声明的 Vertex 的值。</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>和 c 一样，要在函数里修改范围外的值，就要用指针</p></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v Vertex<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v Vertex<span class="token punctuation">)</span> <span class="token function">Scale</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v<span class="token punctuation">.</span>X <span class="token operator">=</span> v<span class="token punctuation">.</span>X <span class="token operator">*</span> f
	v<span class="token punctuation">.</span>Y <span class="token operator">=</span> v<span class="token punctuation">.</span>Y <span class="token operator">*</span> f
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	v<span class="token punctuation">.</span><span class="token function">Scale</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法与指针重定向" tabindex="-1"><a class="header-anchor" href="#方法与指针重定向" aria-hidden="true">#</a> 方法与指针重定向</h3><p>比较前两个程序，你大概会注意到带指针参数的函数必须接受一个指针：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> v Vertex
<span class="token function">ScaleFunc</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment">// 编译错误！</span>
<span class="token function">ScaleFunc</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>v<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// OK</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而以指针为接收者的方法被调用时，接收者既能为值又能为指针：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> v Vertex
v<span class="token punctuation">.</span><span class="token function">Scale</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment">// OK</span>
p <span class="token operator">:=</span> <span class="token operator">&amp;</span>v
p<span class="token punctuation">.</span><span class="token function">Scale</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">// OK</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于语句 <code>v.Scale(5)</code>，即便 v 是个值而非指针，带指针接收者的方法也能被直接调用。 也就是说，由于 Scale 方法有一个指针接收者，为方便起见，Go 会将语句 <code>v.Scale(5)</code> 解释为 <code>(&amp;v).Scale(5)</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>Vertex<span class="token punctuation">)</span> <span class="token function">Scale</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v<span class="token punctuation">.</span>X <span class="token operator">=</span> v<span class="token punctuation">.</span>X <span class="token operator">*</span> f
	v<span class="token punctuation">.</span>Y <span class="token operator">=</span> v<span class="token punctuation">.</span>Y <span class="token operator">*</span> f
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ScaleFunc</span><span class="token punctuation">(</span>v <span class="token operator">*</span>Vertex<span class="token punctuation">,</span> f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v<span class="token punctuation">.</span>X <span class="token operator">=</span> v<span class="token punctuation">.</span>X <span class="token operator">*</span> f
	v<span class="token punctuation">.</span>Y <span class="token operator">=</span> v<span class="token punctuation">.</span>Y <span class="token operator">*</span> f
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	v<span class="token punctuation">.</span><span class="token function">Scale</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token function">ScaleFunc</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>v<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Vertex<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
	p<span class="token punctuation">.</span><span class="token function">Scale</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token function">ScaleFunc</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的事情也发生在相反的方向。</p><p>接受一个值作为参数的函数必须接受一个指定类型的值：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> v Vertex
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">AbsFunc</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// OK</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">AbsFunc</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 编译错误！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而以值为接收者的方法被调用时，接收者既能为值又能为指针：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> v Vertex
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// OK</span>
p <span class="token operator">:=</span> <span class="token operator">&amp;</span>v
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// OK</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况下，方法调用 <code>p.Abs()</code> 会被解释为 <code>(*p).Abs()</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v Vertex<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">AbsFunc</span><span class="token punctuation">(</span>v Vertex<span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">AbsFunc</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>

	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Vertex<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">AbsFunc</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选择值或指针作为接收者" tabindex="-1"><a class="header-anchor" href="#选择值或指针作为接收者" aria-hidden="true">#</a> 选择值或指针作为接收者</h3><p>使用指针接收者的原因有二：</p><ol><li><p>首先，方法能够修改其接收者指向的值。</p></li><li><p>其次，这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样做会更加高效。</p></li></ol><p>在本例中，Scale 和 Abs 接收者的类型为 <code>*Vertex</code>，即便 Abs 并不需要修改其接收者。</p><p>通常来说，所有给定类型的方法都应该有值或指针接收者，但并不应该二者混用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>Vertex<span class="token punctuation">)</span> <span class="token function">Scale</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v<span class="token punctuation">.</span>X <span class="token operator">=</span> v<span class="token punctuation">.</span>X <span class="token operator">*</span> f
	v<span class="token punctuation">.</span>Y <span class="token operator">=</span> v<span class="token punctuation">.</span>Y <span class="token operator">*</span> f
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>Vertex<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> <span class="token operator">&amp;</span>Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Before scaling: %+v, Abs: %v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	v<span class="token punctuation">.</span><span class="token function">Scale</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;After scaling: %+v, Abs: %v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2><p>接口类型 是由一组方法签名定义的集合。</p><p>接口类型的变量可以保存任何实现了这些方法的值。</p><p>注意：示例代码的 22 行存在一个错误。由于 Abs 方法只为 <code>*Vertex</code> （指针类型）定义，因此 Vertex（值类型）并未实现 Abser。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Abser <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a Abser
	f <span class="token operator">:=</span> <span class="token function">MyFloat</span><span class="token punctuation">(</span><span class="token operator">-</span>math<span class="token punctuation">.</span>Sqrt2<span class="token punctuation">)</span>
	v <span class="token operator">:=</span> Vertex<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>

	a <span class="token operator">=</span> f  <span class="token comment">// a MyFloat 实现了 Abser</span>
	a <span class="token operator">=</span> <span class="token operator">&amp;</span>v <span class="token comment">// a *Vertex 实现了 Abser</span>

	<span class="token comment">// 下面一行，v 是一个 Vertex（而不是 *Vertex）</span>
	<span class="token comment">// 所以没有实现 Abser。</span>
	a <span class="token operator">=</span> v

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MyFloat <span class="token builtin">float64</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f MyFloat<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> f <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token operator">-</span>f<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">float64</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Vertex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>Vertex<span class="token punctuation">)</span> <span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>X<span class="token operator">*</span>v<span class="token punctuation">.</span>X <span class="token operator">+</span> v<span class="token punctuation">.</span>Y<span class="token operator">*</span>v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口与隐式实现" tabindex="-1"><a class="header-anchor" href="#接口与隐式实现" aria-hidden="true">#</a> 接口与隐式实现</h3><p>类型通过实现一个接口的所有方法来实现该接口。既然无需专门显式声明，也就没有“implements”关键字。</p><p>隐式接口从接口的实现中解耦了定义，这样接口的实现可以出现在任何包中，无需提前准备。</p><p>因此，也就无需在每一个实现上增加新的接口名称，这样同时也鼓励了明确的接口定义。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> I <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	S <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 此方法表示类型 T 实现了接口 I，但我们无需显式声明此事。</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>t T<span class="token punctuation">)</span> <span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i I <span class="token operator">=</span> T<span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">}</span>
	i<span class="token punctuation">.</span><span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口值" tabindex="-1"><a class="header-anchor" href="#接口值" aria-hidden="true">#</a> 接口值</h3><p>接口也是值。它们可以像其它值一样传递。</p><p>接口值可以用作函数的参数或返回值。</p><p>在内部，接口值可以看做包含值和具体类型的元组：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接口值保存了一个具体底层类型的具体值。</p><p>接口值调用方法时会执行其底层类型的同名方法。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> I <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	S <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> F <span class="token builtin">float64</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f F<span class="token punctuation">)</span> <span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i I

	i <span class="token operator">=</span> <span class="token operator">&amp;</span>T<span class="token punctuation">{</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">}</span>
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	i<span class="token punctuation">.</span><span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	i <span class="token operator">=</span> <span class="token function">F</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>Pi<span class="token punctuation">)</span>
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	i<span class="token punctuation">.</span><span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">describe</span><span class="token punctuation">(</span>i I<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;(%v, %T)\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="底层值为-nil-的接口值" tabindex="-1"><a class="header-anchor" href="#底层值为-nil-的接口值" aria-hidden="true">#</a> 底层值为 nil 的接口值</h3><p>即便接口内的具体值为 nil，方法仍然会被 nil 接收者调用。</p><p>在一些语言中，这会触发一个空指针异常，但在 Go 中通常会写一些方法来优雅地处理它（如本例中的 M 方法）。</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>保存了 nil 具体值的接口其自身并不为 nil。</p></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> I <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	S <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> t <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;nil&gt;&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i I

	<span class="token keyword">var</span> t <span class="token operator">*</span>T
	i <span class="token operator">=</span> t
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	i<span class="token punctuation">.</span><span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	i <span class="token operator">=</span> <span class="token operator">&amp;</span>T<span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">}</span>
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	i<span class="token punctuation">.</span><span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">describe</span><span class="token punctuation">(</span>i I<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;(%v, %T)\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nil-接口值" tabindex="-1"><a class="header-anchor" href="#nil-接口值" aria-hidden="true">#</a> nil 接口值</h3><p>nil 接口值既不保存值也不保存具体类型。</p><p>为 nil 接口调用方法会产生运行时错误，因为接口的元组内并未包含能够指明该调用哪个 <b>具体</b> 方法的类型。 nil 接口值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> I <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i I
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	i<span class="token punctuation">.</span><span class="token function">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">describe</span><span class="token punctuation">(</span>i I<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;(%v, %T)\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空接口" tabindex="-1"><a class="header-anchor" href="#空接口" aria-hidden="true">#</a> 空接口</h3><p>指定了零个方法的接口值被称为 <b>空接口：</b></p><p><code>interface{}</code> 空接口可保存任何类型的值。（因为每个类型都至少实现了零个方法。）</p><p>空接口被用来处理未知类型的值。例如，<code>fmt.Print</code> 可接受类型为 <code>interface{}</code> 的任意数量的参数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

	i <span class="token operator">=</span> <span class="token number">42</span>
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

	i <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span>
	<span class="token function">describe</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">describe</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;(%v, %T)\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类型断言" tabindex="-1"><a class="header-anchor" href="#类型断言" aria-hidden="true">#</a> 类型断言</h2><p><b>类型断言</b> 提供了访问接口值底层具体值的方式。</p><p><code>t := i.(T)</code> 该语句断言接口值 i 保存了具体类型 T，并将其底层类型为 T 的值赋予变量 t。</p><p>若 i 并未保存 T 类型的值，该语句就会触发一个恐慌。</p><p>为了 判断 一个接口值是否保存了一个特定的类型，类型断言可返回两个值：其底层值以及一个报告断言是否成功的布尔值。</p><p><code>t, ok := i.(T)</code> 若 i 保存了一个 T，那么 t 将会是其底层值，而 ok 为 true。</p><p>否则，ok 将为 false 而 t 将为 T 类型的零值，程序并不会产生恐慌。</p><p>请注意这种语法和读取一个映射时的相同之处。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span>

	s <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>

	s<span class="token punctuation">,</span> ok <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>

	f<span class="token punctuation">,</span> ok <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>

	f <span class="token operator">=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token comment">// 报错(panic)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类型选择" tabindex="-1"><a class="header-anchor" href="#类型选择" aria-hidden="true">#</a> 类型选择</h2><p><b>类型选择</b> 是一种按顺序从几个类型断言中选择分支的结构。</p><p>类型选择与一般的 switch 语句相似，不过类型选择中的 case 为类型（而非值）， 它们针对给定接口值所存储的值的类型进行比较。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">switch</span> v <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> T<span class="token punctuation">:</span>
    <span class="token comment">// v 的类型为 T</span>
<span class="token keyword">case</span> S<span class="token punctuation">:</span>
    <span class="token comment">// v 的类型为 S</span>
<span class="token keyword">default</span><span class="token punctuation">:</span>
    <span class="token comment">// 没有匹配，v 与 i 的类型相同</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型选择中的声明与类型断言 <code>i.(T)</code> 的语法相同，只是具体类型 T 被替换成了关键字 type。</p><p>此选择语句判断接口值 i 保存的值类型是 T 还是 S。在 T 或 S 的情况下，变量 v 会分别按 T 或 S 类型保存 i 拥有的值。在默认（即没有匹配）的情况下，变量 v 与 i 的接口类型和值相同。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">do</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> v <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Twice %v is %v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> v<span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q is %v bytes long\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;I don&#39;t know about type %T!\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">do</span><span class="token punctuation">(</span><span class="token number">21</span><span class="token punctuation">)</span>
	<span class="token function">do</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
	<span class="token function">do</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stringer" tabindex="-1"><a class="header-anchor" href="#stringer" aria-hidden="true">#</a> Stringer</h2><p>fmt 包中定义的 Stringer 是最普遍的接口之一。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Stringer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Stringer 是一个可以用字符串描述自己的类型。fmt 包（还有很多包）都通过此接口来打印值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%v (%v years)&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> p<span class="token punctuation">.</span>Age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> Person<span class="token punctuation">{</span><span class="token string">&quot;Arthur Dent&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">}</span>
	z <span class="token operator">:=</span> Person<span class="token punctuation">{</span><span class="token string">&quot;Zaphod Beeblebrox&quot;</span><span class="token punctuation">,</span> <span class="token number">9001</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="错误" tabindex="-1"><a class="header-anchor" href="#错误" aria-hidden="true">#</a> 错误</h2><p>Go 程序使用 error 值来表示错误状态。</p><p>与 fmt.Stringer 类似，error 类型是一个内建接口：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> <span class="token builtin">error</span> <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（与 fmt.Stringer 类似，fmt 包在打印值时也会满足 error。）</p><p>通常函数会返回一个 error 值，调用的它的代码应当判断这个错误是否等于 nil 来进行错误处理。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span><span class="token string">&quot;42&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;couldn&#39;t convert number: %v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Converted integer:&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>error 为 nil 时表示成功；非 nil 的 error 表示失败。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> MyError <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	When time<span class="token punctuation">.</span>Time
	What <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>MyError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;at %v, %s&quot;</span><span class="token punctuation">,</span>
		e<span class="token punctuation">.</span>When<span class="token punctuation">,</span> e<span class="token punctuation">.</span>What<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>MyError<span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token string">&quot;it didn&#39;t work&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reader" tabindex="-1"><a class="header-anchor" href="#reader" aria-hidden="true">#</a> Reader</h2><p>io 包指定了 io.Reader 接口，它表示从数据流的末尾进行读取。</p><p>Go 标准库包含了该接口的许多实现，包括文件、网络连接、压缩和加密等等。</p><p>io.Reader 接口有一个 Read 方法：</p><p>func (T) Read(b []byte) (n int, err error) Read 用数据填充给定的字节切片并返回填充的字节数和错误值。在遇到数据流的结尾时，它会返回一个 io.EOF 错误。</p><p>示例代码创建了一个 strings.Reader 并以每次 8 字节的速度读取它的输出。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, Reader!&quot;</span><span class="token punctuation">)</span>

	b <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;n = %v err = %v b = %v\\n&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> err<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;b[:n] = %q\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图像" tabindex="-1"><a class="header-anchor" href="#图像" aria-hidden="true">#</a> 图像</h2><p>image 包定义了 Image 接口：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> image

<span class="token keyword">type</span> Image <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">ColorModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> color<span class="token punctuation">.</span>Model
    <span class="token function">Bounds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Rectangle
    <span class="token function">At</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> color<span class="token punctuation">.</span>Color
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：Bounds 方法的返回值 Rectangle 实际上是一个 image.Rectangle，它在 image 包中声明。</p>`,117),d={href:"https://go-zh.org/pkg/image/#Image",target:"_blank",rel:"noopener noreferrer"},r=a(`<p><code>color.Color</code> 和 <code>color.Model</code> 类型也是接口，但是通常因为直接使用预定义的实现 <code>image.RGBA</code> 和 <code>image.RGBAModel</code> 而被忽视了。这些接口和类型由 <code>image/color</code> 包定义。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;image&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m <span class="token operator">:=</span> image<span class="token punctuation">.</span><span class="token function">NewRGBA</span><span class="token punctuation">(</span>image<span class="token punctuation">.</span><span class="token function">Rect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">Bounds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">At</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RGBA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function k(v,m){const t=e("ExternalLinkIcon");return o(),c("div",null,[u,s("p",null,[n("（请参阅"),s("a",d,[n(" 文档 "),i(t)]),n("了解全部信息。）")]),r])}const f=p(l,[["render",k],["__file","04-方法和接口.html.vue"]]);export{f as default};
