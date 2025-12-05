#!/bin/bash

# 定义图片 URL 列表
# 图片列表按照您提供的顺序排列
IMAGES=(
"https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b836764fe50ed.png"
"https://i0.hdslb.com/bfs/article/65230045f36e2058fd3f334a66210be23981688.png"
)

# 定义目标文件夹和文件名模板
DIR_NAME="Mortis_Images"
DATE_PREFIX="20250309_mortis"
FILE_EXTENSION="png"

# 创建文件夹 (如果不存在)
mkdir -p "$DIR_NAME"
echo "✅ 文件夹 '$DIR_NAME' 已创建或存在。"
echo "---"

# 循环下载图片
for ((i=0; i<${#IMAGES[@]}; i++)); do
    URL=${IMAGES[i]}
    # 文件编号从 1 开始
    INDEX=$((i + 1))
    
    # 格式化文件名，确保编号带括号
    FILENAME="${DATE_PREFIX}(${INDEX}).${FILE_EXTENSION}"
    TARGET_PATH="${DIR_NAME}/${FILENAME}"

    echo "⬇️ 正在下载 #$INDEX/$#IMAGES[@]..."
    echo "   URL: $URL"
    
    # 使用 wget 下载图片，并命名为 TARGET_PATH
    # -q: 安静模式，不输出状态信息
    # -O: 指定输出文件名
    wget -q -O "$TARGET_PATH" "$URL"
    
    if [ $? -eq 0 ]; then
        echo "   ✅ 下载成功并保存为: $FILENAME"
    else
        echo "   ❌ 下载失败: $FILENAME"
    fi
    echo "---"
done

echo "🎉 所有下载任务完成！文件位于：$DIR_NAME/"