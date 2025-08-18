#!/usr/bin/env bash
echo "安装依赖..."
npm install

echo "请选择启动方式："
echo "1) 生产模式 (nest start)"
echo "2) 开发模式 (npm run start:dev)"
read -p "输入数字选择: " choice

if [ "$choice" = "1" ]; then
  npx nest start
elif [ "$choice" = "2" ]; then
  npm run start:dev
else
  echo "无效选择"
fi