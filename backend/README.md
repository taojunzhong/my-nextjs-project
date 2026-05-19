# 🏗️ Spring Cloud 后端框架

## 📋 技术栈

| 组件 | 版本 |
|------|------|
| Spring Boot | 3.0.13 |
| Spring Cloud | 2022.0.2 |
| Spring Cloud Alibaba | 2022.0.0.0 |
| Nacos | 2.2.3 |
| Gateway | API 网关 |

## 📁 项目结构

```
backend/
├── pom.xml                          # 父工程依赖管理
├── common/                          # 公共模块
│   ├── pom.xml
│   └── src/main/java/com/example/common/
│       ├── entity/BaseEntity.java   # 基础实体类
│       └── response/Result.java     # 统一响应封装
├── gateway/                         # API 网关 (端口: 8080)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/gateway/
│       │   └── GatewayApplication.java
│       └── resources/application.yml
└── service-example/                 # 示例业务服务 (端口: 8081)
    ├── pom.xml
    └── src/main/
        ├── java/com/example/service/
        │   ├── ServiceApplication.java
        │   └── controller/ExampleController.java
        └── resources/application.yml
```

## 🚀 快速开始

### 1. 安装 Nacos

#### 方式一：使用 Docker（推荐）
```bash
docker run -d --name nacos -p 8848:8848 -p 9848:9848 -p 9849:9849 \
  -e MODE=standalone \
  nacos/nacos-server:v2.2.3
```

#### 方式二：下载安装
- 下载地址：https://github.com/alibaba/nacos/releases/tag/2.2.3
- 解压后进入 `bin` 目录
- Linux/Mac: `sh startup.sh -m standalone`
- Windows: `startup.cmd -m standalone`

访问 Nacos 控制台：http://localhost:8848/nacos
- 用户名：nacos
- 密码：nacos

### 2. 编译项目

```bash
cd backend
mvn clean package -DskipTests
```

### 3. 启动服务

#### 启动网关服务
```bash
cd gateway/target
java -jar gateway-1.0.0.jar
```

#### 启动示例服务
```bash
cd service-example/target
java -jar service-example-1.0.0.jar
```

### 4. 测试接口

通过网关访问：
```bash
# 访问示例服务
curl http://localhost:8080/api/example/hello

# 带参数
curl http://localhost:8080/api/example/info?name=John

# POST 请求
curl -X POST http://localhost:8080/api/example/create \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'

# 健康检查
curl http://localhost:8080/api/example/health
```

直接访问服务：
```bash
curl http://localhost:8081/example/hello
```

## 🔧 配置说明

### Nacos 配置

在 Nacos 控制台添加配置：
- Data ID: `gateway.yaml` 或 `service-example.yaml`
- Group: `DEFAULT_GROUP`

### 网关路由配置

在 `gateway/src/main/resources/application.yml` 中配置路由：
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: service-example
          uri: lb://service-example
          predicates:
            - Path=/api/example/**
          filters:
            - StripPrefix=2
```

## 📝 开发指南

### 添加新服务

1. 在父工程 `pom.xml` 的 `<modules>` 中添加新模块
2. 创建新模块目录结构
3. 配置 `pom.xml` 依赖
4. 创建启动类并添加 `@EnableDiscoveryClient`
5. 在网关中配置路由

### 常用命令

```bash
# 编译所有模块
mvn clean package

# 编译单个模块
mvn clean package -pl gateway -am

# 运行测试
mvn test

# 跳过测试编译
mvn clean package -DskipTests
```

## ❓ 常见问题

### Q1: Nacos 连接失败？
A: 检查 Nacos 是否启动，端口是否正确（默认 8848）

### Q2: 服务无法注册到 Nacos？
A: 检查配置文件中的 `spring.cloud.nacos.discovery.server-addr` 是否正确

### Q3: 网关无法路由到服务？
A: 确保服务已注册到 Nacos，并且路由配置正确

## 📞 需要帮助？
联系开发团队！
