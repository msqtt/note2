# Spring 与 SpringBoot
## Spring 能做什么
### Spring 的能力


![image](https://user-images.githubusercontent.com/94043894/178104353-5e4e36ef-356c-4f37-8606-1c23c223831b.png)

### Spring 的生态

[https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)

覆盖有：
- web 开发
- 数据访问
- 安全控制
- 分布式
- 消息服务
- 移动开发
- 批处理
- ......

### Spring5 重大升级
#### 响应式编程

![image](https://user-images.githubusercontent.com/94043894/178104521-99b06d0a-2dfb-4e69-bbee-175b0f9876ca.png)

#### 内部源码设计

基于 Java8 的一些新特性，如：接口默认实现.重新设计源码架构

## 为什么用 SpringBoot

> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
>
> 能快速创建出生产级别的 Spring 应用

### SpringBoot 优点

- Create stand-alone Spring applications
    - 创建独立 Spring 应用
- Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)
    - 内嵌 web 服务器
- Provide opinionated 'starter' dependencies to simplify your build configuration
    - 自动 starter 依赖，简化构建配置
- Automatically configure Spring and 3rd party libraries whenever possible
    - 自动配置 Spring 以及第三方功能
- Provide production-ready features such as metrics, health checks, and externalized configuration
    - 提供生产级别的监控、健康检查及外部化配置
- Absolutely no code generation and no requirement for XML configuration
    - 无代码生成、无需编写 XML

> SpringBoot 是整合 Spring 技术栈的一站式框架
> SpringBoot 是简化 Spring 技术栈的快速开发脚手架


### SpringBoot 缺点

- 人称版本帝，迭代快，需要时刻关注变化
- 封装太深，内部原理复杂，不容易精通

## 时代背景

### 微服务

[ James Lewis and Martin Fowler (2014) ](https://martinfowler.com/articles/microservices.html)  提出微服务完整概念。
[ https://martinfowler.com/microservices/](https://martinfowler.com/articles/microservices.html)


> In short, the microservice architectural style is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.-- James Lewis and Martin Fowler (2014)

- 微服务是一种架构风格

- 一个应用拆分为一组小型服务

- 每个服务运行在自己的进程内，也就是可独立部署和升级

- 服务之间使用轻量级 HTTP 交互

- 服务围绕业务功能拆分

- 可以由全自动部署机制独立部署

- 去中心化，服务自治。服务可以使用不同的语言、不同的存储技术






### 分布式

![image](https://user-images.githubusercontent.com/94043894/178106137-6ab9324f-1ab2-4b0e-9d68-1309bae82ff5.png)

#### 分布式的困难

- 远程调用

- 服务发现

- 负载均衡

- 服务容错

- 配置管理

- 服务监控

- 链路追踪

- 日志管理

- 任务调度

- ......

#### 分布式的解决

- SpringBoot + SpringCloud


### 云原生

原生应用如何上云。 Cloud Native

#### 上云的困难

- 服务自愈
- 弹性伸缩
- 服务隔离
- 自动化部署
- 灰度发布
- 流量治理
- ......

#### 上云的解决

1. 初始云原生
2. 深入 Docker 容器化技术
3. 掌握星际级容器编排 Kubernetes
4. DevOps 实战企业 CI/CD，构建企业云平台
5. 拥抱新一代架构 Service Mesh 与 Serverless
6. 云上架构与场景方案

## 如何学习 SpringBoot
### 官方文档架构

#### Spring Boot Reference Documentation
![image](https://user-images.githubusercontent.com/94043894/178106495-2e5de150-1c03-4bff-8bc8-e5c80342bd31.png)

配置：
![image](https://user-images.githubusercontent.com/94043894/178106539-ebef22a2-cc47-44a2-804c-83e673406d04.png)


查看版本新特性：
[https://github.com/spring-projects/spring-boot/wiki#release-notes](https://github.com/spring-projects/spring-boot/wiki#release-notes)

![image](https://user-images.githubusercontent.com/94043894/178106624-2c7881b8-c443-4c16-9b88-c4f950602f3f.png)
