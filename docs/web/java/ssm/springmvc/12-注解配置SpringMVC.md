# 注解配置 SpringMVC


## 创建初始化类，代替 web.xml
在`Servlet3.0`环境中，容器会在类路径中查找实现`javax.servlet.ServletContainerInitializer`接口的类，如果找到的话就用它来配置 Servlet 容器。

Spring 提供了这个接口的实现，名为`SpringServletContainerInitializer`，这个类反过来又会查找实现 WebApplicationInitializer 的类并将配置的任务交给它们来完成。

`Spring3.2`引入了一个便利的`WebApplicationInitializer`基础实现，名为`AbstractAnnotationConfigDispatcherServletInitializer`，当我们的类扩展了`AbstractAnnotationConfigDispatcherServletInitializer`并将其部署到 Servlet3.0 容器的时候，容器会自动发现它，并用它来配置 Servlet 上下文。


```java
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 指定 spring 的配置类
     * @return
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    /**
     * 指定 SpringMVC 的配置类
     * @return
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    /**
     * 指定 DispatcherServlet 的映射规则，即 url-pattern
     * @return
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /**
     * 添加过滤器
     * @return
     */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceRequestEncoding(true);
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();
        return new Filter[]{encodingFilter, hiddenHttpMethodFilter};
    }
}
```

## 创建 SpringConfig 配置类，代替 spring 的配置文件

```java
@Configuration
public class SpringConfig {
    //ssm 整合之后，spring 的配置信息写在此类中
}
```

## 创建 WebConfig 配置类，代替 SpringMVC 的配置文件

```java
@Configuration
//扫描组件
@ComponentScan("com.atguigu.mvc.controller")
//开启 MVC 注解驱动
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer /*默认的配置接口*/ {

    //使用默认的 servlet 处理静态资源
    @Override
   public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    //配置文件上传解析器
    @Bean
    public CommonsMultipartResolver multipartResolver(){
        return new CommonsMultipartResolver();
    }

    //配置拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        FirstInterceptor firstInterceptor = new FirstInterceptor();
        registry.addInterceptor(firstInterceptor).addPathPatterns("/**");
    }

    //配置视图控制

    /*@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }*/

    //配置异常映射
    /*@Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
        Properties prop = new Properties();
        prop.setProperty("java.lang.ArithmeticException", "error");
        //设置异常映射
        exceptionResolver.setExceptionMappings(prop);
        //设置共享异常信息的键
        exceptionResolver.setExceptionAttribute("ex");
        resolvers.add(exceptionResolver);
    }*/

    //配置生成模板解析器
    @Bean
    public ITemplateResolver templateResolver() {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        // ServletContextTemplateResolver 需要一个 ServletContext 作为构造参数，可通过 WebApplicationContext 的方法获得
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(
                webApplicationContext.getServletContext());
        templateResolver.setPrefix("/WEB-INF/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        return templateResolver;
    }

    //生成模板引擎并为模板引擎注入模板解析器
    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        return templateEngine;
    }

    //生成视图解析器并未解析器注入模板引擎
    @Bean
    public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setTemplateEngine(templateEngine);
        return viewResolver;
    }
}
```

## 测试功能

```java
@RequestMapping("/")
public String index(){
    return "index";
}
```
