# 牢九门项目 - 全方位技术文档

## 项目概述

**牢九门** 是一个基于 Spring Cloud 微服务架构和 Next.js 前端的全栈 Web 应用，主题为"王者荣耀对抗路坐牢联盟"，用于管理和展示对抗路英雄（监狱）信息。

### 项目名称含义
- **牢九门**：象征当前版本最强势的九个对抗路英雄
- **监狱**：隐喻对抗路英雄的"坐牢"状态

---

## 技术栈

### 前端技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 | React 全栈框架，支持 SSR/SSG |
| React | 19 | UI 组件库 |
| TypeScript | 5.7.3 | 类型安全的 JavaScript |
| Tailwind CSS | 4.2.0 | 原子化 CSS 框架 |
| Radix UI | 多个组件 | 无障碍 UI 组件库 |
| Framer Motion | 12.38.0 | 动画库 |
| React Hook Form | 7.54.1 | 表单处理 |
| Zod | 3.24.1 | 数据验证 |
| Lucide React | 0.564.0 | 图标库 |

### 后端技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| Spring Boot | 3.0.13 | Java 微服务框架 |
| Spring Cloud | 2022.0.2 | 微服务治理 |
| Spring Cloud Alibaba | 2022.0.0.0 | 阿里巴巴微服务组件 |
| Spring Cloud Gateway | 4.0.2 | API 网关 |
| Nacos | 2.2.1 | 服务注册与发现、配置中心 |
| Spring Data JPA | - | ORM 框架 |
| MySQL | 8.x | 关系型数据库 |
| Lombok | 1.18.30 | Java 代码简化 |

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户浏览器                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js 前端 (端口 3000)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ 首页     │ │ 登录     │ │ 注册     │ │ 个人中心 │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ 监狱列表 │ │ 监狱详情 │ │ 添加监狱 │ │ 编辑监狱 │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────────────────────────────────────────────┐           │
│  │        API 路由 (/api/upload/video)              │           │
│  └──────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                Spring Cloud Gateway (端口 8080)                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  路由规则:                                                │   │
│  │  /api/auth/**    → service-example                       │   │
│  │  /api/prison/**  → service-example                       │   │
│  │  /api/upload/**  → service-example                       │   │
│  │  /api/comment/** → service-example                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│              Nacos 服务注册中心 (端口 8848)                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  服务列表:                                                │   │
│  │  - gateway (端口 8080)                                    │   │
│  │  - service-example (端口 8081)                            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│              service-example (端口 8081)                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ UserController│ │PrisonController│ │CommentController│       │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ UserService  │ │ PrisonService │ │CommentService │           │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ UserRepository│ │PrisonRepository│ │CommentRepository│       │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              FileUploadController                     │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MySQL 数据库 (端口 3306)                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │  ljm_user    │ │  ljm_prison  │ │ ljm_comment  │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 项目目录结构

```
d:\daima\ljm\
├── app/                          # Next.js App Router 目录
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 根布局
│   ├── globals.css               # 全局样式
│   ├── login/
│   │   └── page.tsx              # 登录页面
│   ├── register/
│   │   └── page.tsx              # 注册页面
│   ├── home/
│   │   └── page.tsx              # 主页
│   ├── profile/
│   │   └── page.tsx              # 个人中心页面
│   ├── prison/
│   │   ├── list/
│   │   │   └── page.tsx          # 监狱列表页面
│   │   ├── detail/
│   │   │   └── page.tsx          # 监狱详情页面
│   │   ├── add/
│   │   │   └── page.tsx          # 添加监狱页面
│   │   └── edit/
│   │       └── page.tsx          # 编辑监狱页面
│   └── api/
│       └── upload/
│           └── video/
│               └── route.ts      # 视频上传 API 路由
│
├── components/                   # React 组件目录
│   ├── ui/                       # UI 基础组件 (Radix UI 封装)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...                   # 其他 UI 组件
│   ├── UserHeader.tsx            # 用户头部导航
│   ├── footer.tsx                # 页脚
│   └── ...                       # 其他业务组件
│
├── hooks/                        # React Hooks
│   ├── use-toast.ts              # Toast 通知 Hook
│   └── use-mobile.ts             # 移动端检测 Hook
│
├── lib/
│   └── utils.ts                  # 工具函数
│
├── public/                       # 静态资源
│   ├── icon.svg
│   ├── placeholder.jpg
│   └── ...
│
├── backend/                      # 后端项目目录
│   ├── pom.xml                   # Maven 父 POM
│   ├── common/                   # 公共模块
│   │   ├── pom.xml
│   │   └── src/main/java/com/example/common/
│   │       ├── entity/           # JPA 实体类
│   │       │   ├── UserEntity.java
│   │       │   ├── PrisonEntity.java
│   │       │   └── CommentEntity.java
│   │       ├── dto/              # 数据传输对象
│   │       │   ├── UserDTO.java
│   │       │   ├── PrisonDTO.java
│   │       │   └── ...
│   │       └── response/         # 响应封装
│   │           └── Result.java
│   │
│   ├── gateway/                  # API 网关模块
│   │   ├── pom.xml
│   │   └── src/main/
│   │       ├── java/com/example/gateway/
│   │       │   └── GatewayApplication.java
│   │       └── resources/
│   │           └── application.yml
│   │
│   └── service-example/          # 业务服务模块
│       ├── pom.xml
│       └── src/main/java/com/example/service/
│           ├── ServiceApplication.java
│           ├── config/           # 配置类
│           │   ├── SecurityConfig.java
│           │   ├── SecurityConfigOverride.java
│           │   └── WebConfig.java
│           ├── controller/       # 控制器
│           │   ├── UserController.java
│           │   ├── PrisonController.java
│           │   ├── CommentController.java
│           │   └── FileUploadController.java
│           ├── service/          # 业务服务
│           │   ├── UserService.java
│           │   ├── PrisonService.java
│           │   └── CommentService.java
│           └── repository/       # 数据访问层
│               ├── UserRepository.java
│               ├── PrisonRepository.java
│               └── CommentRepository.java
│
├── next.config.mjs               # Next.js 配置
├── package.json                  # 前端依赖配置
├── tsconfig.json                 # TypeScript 配置
└── tailwind.config.js            # Tailwind CSS 配置
```

---

## 数据库设计

### 用户表 (ljm_user)

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 用户ID |
| username | VARCHAR(50) | UNIQUE, NOT NULL | 用户名 |
| email | VARCHAR(100) | UNIQUE, NOT NULL | 邮箱 |
| password | VARCHAR(255) | NOT NULL | 密码(加密) |
| phone | VARCHAR(20) | - | 手机号 |
| avatar | VARCHAR(500) | - | 头像URL |
| bio | VARCHAR(500) | - | 个人简介 |
| status | INT | DEFAULT 1 | 状态(1:正常,0:禁用) |
| last_login_time | DATETIME | - | 最后登录时间 |
| create_time | DATETIME | - | 创建时间 |
| update_time | DATETIME | - | 更新时间 |
| deleted | INT | DEFAULT 0 | 软删除标记 |

### 监狱表 (ljm_prison)

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 监狱ID |
| name | VARCHAR(100) | NOT NULL | 监狱名称 |
| prison_number | VARCHAR(50) | UNIQUE, NOT NULL | 监狱编号 |
| description | TEXT | - | 描述 |
| location | VARCHAR(200) | - | 位置 |
| security_level | VARCHAR(50) | - | 安全等级 |
| warden_name | VARCHAR(100) | - | 狱长姓名 |
| contact_phone | VARCHAR(20) | - | 联系电话 |
| avatar | VARCHAR(500) | - | 头像URL |
| status | INT | NOT NULL, DEFAULT 1 | 状态 |
| create_time | DATETIME | - | 创建时间 |
| update_time | DATETIME | - | 更新时间 |
| deleted | INT | DEFAULT 0 | 软删除标记 |

### 评论表 (ljm_comment)

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 评论ID |
| prison_id | BIGINT | NOT NULL | 监狱ID(外键) |
| user_id | BIGINT | NOT NULL | 用户ID(外键) |
| username | VARCHAR(50) | NOT NULL | 用户名(冗余) |
| content | TEXT | NOT NULL | 评论内容 |
| create_time | DATETIME | - | 创建时间 |
| deleted | INT | DEFAULT 0 | 软删除标记 |

---

## API 接口文档

### 认证相关 API

#### 用户注册
```
POST /api/auth/register
Content-Type: application/json

Request:
{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response:
{
  "code": 200,
  "message": "注册成功",
  "data": { ... }
}
```

#### 用户登录
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "username": "string",
  "password": "string"
}

Response:
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "string",
    "user": { ... }
  }
}
```

### 监狱相关 API

#### 获取监狱列表
```
GET /api/prison/list

Response:
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "监狱名称",
      "prisonNumber": "PRISON-001",
      ...
    }
  ]
}
```

#### 获取监狱详情
```
GET /api/prison/{id}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "监狱名称",
    "description": "描述",
    ...
  }
}
```

#### 创建监狱
```
POST /api/prison
Content-Type: application/json

Request:
{
  "name": "string",
  "prisonNumber": "string",
  "description": "string",
  ...
}

Response:
{
  "code": 200,
  "message": "创建成功",
  "data": { ... }
}
```

#### 更新监狱
```
PUT /api/prison/{id}
Content-Type: application/json

Request:
{
  "name": "string",
  ...
}

Response:
{
  "code": 200,
  "message": "更新成功",
  "data": { ... }
}
```

#### 删除监狱
```
DELETE /api/prison/{id}

Response:
{
  "code": 200,
  "message": "删除成功"
}
```

### 文件上传 API

#### 上传头像
```
POST /api/upload/avatar
Content-Type: multipart/form-data

Request:
- file: 图片文件

Response:
{
  "code": 200,
  "message": "上传成功",
  "data": "/api/upload/avatars/{filename}"
}
```

#### 上传视频
```
POST /api/upload/video
Content-Type: multipart/form-data

Request:
- file: 视频文件
- prisonId: 监狱ID

Response:
{
  "code": 200,
  "message": "上传成功",
  "data": "/api/upload/videos/{filename}"
}
```

### 评论相关 API

#### 获取监狱评论
```
GET /api/comment/prison/{prisonId}

Response:
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "prisonId": 1,
      "userId": 1,
      "username": "用户名",
      "content": "评论内容",
      "createTime": "2024-01-01T00:00:00"
    }
  ]
}
```

#### 添加评论
```
POST /api/comment
Content-Type: application/json

Request:
{
  "prisonId": 1,
  "userId": 1,
  "username": "string",
  "content": "string"
}

Response:
{
  "code": 200,
  "message": "评论成功",
  "data": { ... }
}
```

---

## 配置说明

### 前端配置 (next.config.mjs)

```javascript
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // 忽略 TypeScript 构建错误
  },
  images: {
    unoptimized: true,        // 禁用图片优化
  },
  serverExternalPackages: ['encoding'],
  async rewrites() {
    // API 重写规则，将前端请求转发到后端
    return [
      { source: '/api/auth/:path*', destination: 'http://localhost:8081/api/auth/:path*' },
      { source: '/api/prison/:path*', destination: 'http://localhost:8081/api/prison/:path*' },
      { source: '/api/upload/:path*', destination: 'http://localhost:8081/api/upload/:path*' },
      { source: '/api/comment/:path*', destination: 'http://localhost:8081/api/comment/:path*' },
    ]
  },
}
```

### 后端配置 (application.yml)

```yaml
server:
  port: 8081

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/lyf?useSSL=false&serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update      # 自动更新数据库表结构
    show-sql: true          # 显示 SQL 语句
  
  servlet:
    multipart:
      enabled: true
      max-file-size: 4GB    # 最大文件大小
      max-request-size: 4GB # 最大请求大小

  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848  # Nacos 服务地址

file:
  upload:
    path: uploads           # 文件上传路径
```

### 网关配置 (gateway/application.yml)

```yaml
server:
  port: 8080

spring:
  cloud:
    gateway:
      routes:
        - id: service-auth
          uri: lb://service-example
          predicates:
            - Path=/api/auth/**
        - id: service-prison
          uri: lb://service-example
          predicates:
            - Path=/api/prison/**
        - id: service-upload
          uri: lb://service-example
          predicates:
            - Path=/api/upload/**
        - id: service-comment
          uri: lb://service-example
          predicates:
            - Path=/api/comment/**
```

---

## 安全配置

### Spring Security 配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfigOverride {
    @Bean
    @Primary
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)  // 禁用 CSRF
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // 无状态会话
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll());  // 允许所有请求
        return http.build();
    }
}
```

### CORS 配置

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}
```

---

## 启动指南

### 前置条件
- Node.js 18+
- Java 17+
- MySQL 8+
- Maven 3.8+
- Nacos 2.x

### 启动步骤

1. **启动 Nacos 服务注册中心**
   ```bash
   # 进入 Nacos 目录
   cd nacos/bin
   startup.cmd  # Windows
   # 或 startup.sh  # Linux/Mac
   ```

2. **启动后端服务**
   ```bash
   cd backend
   
   # 编译项目
   mvn clean package -DskipTests
   
   # 启动网关
   java -jar gateway/target/gateway-1.0.0.jar
   
   # 启动业务服务
   java -jar service-example/target/service-example-1.0.0.jar
   ```

3. **启动前端服务**
   ```bash
   cd d:\daima\ljm
   
   # 安装依赖
   pnpm install
   
   # 启动开发服务器
   pnpm dev
   ```

4. **访问应用**
   - 前端: http://localhost:3000
   - 网关: http://localhost:8080
   - 业务服务: http://localhost:8081
   - Nacos 控制台: http://localhost:8848/nacos

---

## 功能特性

### 用户功能
- 用户注册与登录
- 个人信息管理
- 头像上传
- 个人简介编辑

### 监狱管理
- 监狱列表展示
- 监狱详情查看
- 添加新监狱
- 编辑监狱信息
- 删除监狱
- 监狱头像上传
- 监狱视频上传

### 评论系统
- 对监狱发表评论
- 查看监狱评论列表
- 实时评论更新

### 文件上传
- 头像上传 (支持常见图片格式)
- 视频上传 (支持 MP4、WebM、OGG，最大 4GB)

---

## 技术亮点

1. **微服务架构**: 采用 Spring Cloud + Nacos 实现服务注册与发现
2. **API 网关**: 使用 Spring Cloud Gateway 统一管理 API 路由
3. **前后端分离**: Next.js + Spring Boot 实现完全分离
4. **类型安全**: TypeScript + Zod 实现前后端类型验证
5. **响应式设计**: Tailwind CSS 实现自适应布局
6. **无障碍支持**: Radix UI 提供完整的无障碍组件
7. **大文件上传**: 支持 4GB 以内的视频文件上传
8. **软删除**: 数据安全，支持数据恢复

---

## 已解决的问题

### 1. 视频上传 403 错误
**问题**: 上传视频时返回 403 Forbidden 错误

**原因**: Spring Security 默认配置阻止了所有请求

**解决方案**: 
- 创建 `SecurityConfigOverride.java` 配置类
- 禁用 CSRF 保护
- 允许所有请求通过

### 2. 大文件上传失败
**问题**: 上传大文件时连接被重置 (ERR_CONNECTION_RESET)

**原因**: 
- Spring Boot 默认文件上传限制为 1MB
- Next.js bodyParser 默认限制较小

**解决方案**:
- 修改 `application.yml` 中的 `max-file-size` 和 `max-request-size` 为 4GB
- 创建专门的 Next.js API 路由处理视频上传

### 3. 头像 404 错误
**问题**: 上传头像后无法访问

**原因**: API 路由配置问题

**解决方案**: 
- 在 `next.config.mjs` 中添加 `/api/upload/:path*` 重写规则
- 确保静态资源正确转发到后端

---

## 未来优化建议

1. **认证增强**: 实现 JWT Token 认证机制
2. **缓存优化**: 引入 Redis 缓存热点数据
3. **日志系统**: 集成 ELK 日志分析平台
4. **监控告警**: 接入 Prometheus + Grafana 监控
5. **容器化**: Docker + Kubernetes 部署
6. **CI/CD**: GitHub Actions 自动化部署
7. **测试覆盖**: 增加单元测试和集成测试
8. **国际化**: 支持多语言

---

## 版本历史

- **v1.0.0** (2026-05-21)
  - 初始版本发布
  - 实现用户、监狱、评论基础功能
  - 支持文件上传
  - 修复安全配置问题
  - 支持大文件上传

---

## 开发团队

- 开发者: 项目开发者
- 技术支持: Spring Cloud + Next.js 社区

---

## 许可证

本项目仅供学习和研究使用。
