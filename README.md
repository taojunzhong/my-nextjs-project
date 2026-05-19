# 📚 项目协作操作指南（小白版）

## 🎯 仓库地址
**https://github.com/taojunzhong/my-nextjs-project**

---

## 📋 目录
1. [环境准备](#环境准备)
2. [克隆项目](#克隆项目)
3. [安装依赖](#安装依赖)
4. [启动项目](#启动项目)
5. [日常开发](#日常开发)
6. [提交代码](#提交代码)
7. [常见问题](#常见问题)

---

## 🖥️ 环境准备

### 1.1 安装 Git
- 下载地址：https://git-scm.com/downloads
- 安装时一直点「下一步」即可
- 安装后打开终端（PowerShell 或 CMD），输入：
  ```bash
  git --version
  ```
  如果显示版本号，说明安装成功！

### 1.2 安装 Node.js
- 下载地址：https://nodejs.org/（下载 LTS 版本）
- 安装时一直点「下一步」即可
- 安装后打开终端，输入：
  ```bash
  node --version
  npm --version
  ```
  如果显示版本号，说明安装成功！

### 1.3 安装 pnpm
- 打开终端，输入：
  ```bash
  npm install -g pnpm
  ```
- 验证：
  ```bash
  pnpm --version
  ```

### 1.4 注册 GitHub 账号
- 打开 https://github.com
- 点击右上角「Sign up」注册账号

---

## 📥 克隆项目

### 2.1 打开终端
- Windows：按 `Win + R`，输入 `powershell`，回车
- 或者在文件夹右键 →「在终端中打开」

### 2.2 进入工作目录
例如你想把项目放在 `D:\projects` 文件夹：
```bash
# 切换到 D 盘
d:

# 创建 projects 文件夹（如果不存在）
mkdir projects

# 进入 projects 文件夹
cd projects
```

### 2.3 克隆仓库
```bash
git clone https://github.com/taojunzhong/my-nextjs-project.git
```

### 2.4 进入项目目录
```bash
cd my-nextjs-project
```

✅ 完成！你现在在项目目录里了。

---

## 📦 安装依赖

```bash
pnpm install
```

⚠️ **注意**：这一步需要下载 ~550 MB 的文件，可能需要几分钟，请耐心等待！

---

## ▶️ 启动项目

```bash
pnpm dev
```

看到类似这样的输出就成功了：
```
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
```

现在打开浏览器访问：**http://localhost:3000**

---

## 👨‍💻 日常开发

### 5.1 每次开发前：拉取最新代码
```bash
git pull
```
⚠️ **重要**：一定要先拉取，避免冲突！

### 5.2 开始开发
- 用编辑器（VS Code、WebStorm 等）打开项目文件夹
- 修改代码，保存文件
- 浏览器会自动刷新看到效果

---

## 📤 提交代码

### 6.1 查看修改了哪些文件
```bash
git status
```

### 6.2 添加修改到暂存区
```bash
git add .
```
（注意：`.` 代表所有文件）

### 6.3 提交到本地
```bash
git commit -m "描述你做了什么修改"
```
例如：`git commit -m "添加了首页按钮"`

### 6.4 推送到 GitHub
```bash
git push
```

---

## 🔀 使用分支开发（推荐）

### 7.1 创建新分支
```bash
git checkout -b feature/你的功能名
```
例如：`git checkout -b feature/login`

### 7.2 在分支上开发
修改代码、提交...

### 7.3 推送分支到 GitHub
```bash
git push -u origin feature/你的功能名
```

### 7.4 创建 Pull Request
1. 打开 GitHub 仓库
2. 会看到提示「Compare & pull request」，点击
3. 填写描述，点击「Create pull request」
4. 等待队友审核，合并到主分支

### 7.5 切换回主分支并更新
```bash
git checkout master
git pull
```

---

## ❓ 常见问题

### Q1：`git pull` 提示冲突怎么办？
A：
1. 先看哪些文件冲突了
2. 打开冲突文件，找类似这样的标记：
   ```
   <<<<<<< HEAD
   你的代码
   =======
   别人的代码
   >>>>>>> ...
   ```
3. 手动修改，删除标记
4. 保存后：
   ```bash
   git add .
   git commit -m "解决冲突"
   git push
   ```

### Q2：`git push` 提示没有权限？
A：联系仓库管理员（taojunzhong），让他在 GitHub 仓库的 **Settings → Collaborators** 里添加你的 GitHub 账号。

### Q3：`pnpm install` 特别慢？
A：可以用淘宝镜像：
```bash
pnpm config set registry https://registry.npmmirror.com
```

### Q4：我想撤销刚才的修改？
A：
- 如果还没 `git add`：
  ```bash
  git checkout -- 文件名
  ```
- 如果已经 `git add` 但没 `commit`：
  ```bash
  git reset HEAD 文件名
  ```

### Q5：端口 3000 被占用了？
A：修改启动命令，用其他端口：
```bash
pnpm dev -p 3001
```

---

## 📞 需要帮助？
- Git 官方文档：https://git-scm.com/doc
- Next.js 文档：https://nextjs.org/docs
- 或者直接问队友！😊

---

**祝协作愉快！🎉**
