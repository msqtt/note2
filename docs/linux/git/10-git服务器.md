# 搭建 Git 服务器

远程仓库实际上和本地仓库没啥不同，纯粹为了 7x24 小时开机并交换大家的修改。

GitHub 就是一个免费托管开源代码的远程仓库。但是对于某些视源代码如生命的商业公司来说，既不想公开源代码，又舍不得给 GitHub 交保护费，那就只能自己搭建一台 Git 服务器作为私有仓库使用。

搭建 Git 服务器需要准备一台运行 Linux 的机器，仅以 ubuntu 为例：

## 安装

```bash
sudo apt-get install git
# 安装 git

```

## 创建用户

创建一个`git`用户，用来运行`git`服务：

```bash
sudo adduser git
```

## 创建登录证书

创建证书登录：

收集所有需要登录的用户的公钥，就是他们自己的 `id_rsa.pub` 文件，把所有公钥导入到`/home/git/.ssh/authorized_keys` 文件里，一行一个。

## 初始化 Git 仓库

先选定一个目录作为 Git 仓库，假定是`/srv/sample.git`，在`/srv` 目录下输入命令：

```bash
sudo git init --bare sample.git
```

Git 就会创建一个裸仓库，裸仓库没有工作区，因为服务器上的 Git 仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，并且服务器上的 Git 仓库通常都以`.git` 结尾。然后，把 owner 改为 `git`：

```bash
sudo chown -R git:git sample.git
```

## 禁用 shell 登录

出于安全考虑，第二步创建的 git 用户不允许登录 `shell`，这可以通过编辑`/etc/passwd` 文件完成。找到类似下面的一行：

`git:x:1001:1001:,,,:/home/git:/bin/bash`

改为：

`git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell`

这样，git 用户可以正常通过 ssh 使用 git，但无法登录 `shell`，因为我们为 git 用户指定的 `git-shell` 每次一登录就自动退出。

## 克隆远程仓库

现在，可以通过 git clone 命令克隆远程仓库了，在各自的电脑上运行：

```bash
# git clone git@server:/srv/sample.git
# Cloning into 'sample'...
# warning: You appear to have cloned an empty repository.
```
