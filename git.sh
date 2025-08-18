#!/data/data/com.termux/files/usr/bin/bash

# 在当前目录直接操作
git add .
git commit -m "更新: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main