import prisma from '@/lib/prisma'

async function seedAds() {
  console.log('开始创建示例广告...')

  // 示例广告1：校园二手书交易
  await prisma.blogPost.create({
    data: {
      title: "📚 学长学姐的二手书集市 | 仅需20元/学期",
      slug: "campus-secondhand-books",
      content: `**📖 让知识流转起来**

嘿，小伙伴们！还在为昂贵的教材发愁吗？

我们是一群热爱分享的学长学姐，把自己用过的优质教材整理出来，希望能帮到更多同学。

**特色亮点：**
- 📖 热门教材齐全：高数、线代、C语言、数据结构...
- 💰 超低价格：原价100+的教材，这里只要10-20元
- 🎯 精准匹配：按课程分类，找书so easy
- 🤝 当面交易：校园内当面交易，安全放心
- 🌱 环保理念：让每本书发挥最大价值

**本期推荐：**
- 《高等数学（同济版）》：15元
- 《线性代数》：12元
- 《C程序设计》：18元
- 《数据结构》：20元

**联系我们：**
微信：bookworm_campus
QQ群：123456789
地点：图书馆门口，每周三下午

别让知识沉睡，让它们继续发光发热！📚✨

---
*P.S. 如果你有闲置教材想出手，也欢迎加入我们！*

**广告合作信息：**
- 客户：校园二手书联盟
- 联系方式：微信：bookworm_campus
- 价格：20元/6个月
- 有效期：即日起6个月`,
      excerpt: "学长学姐的优质二手书，超低价格，环保又实惠！",
      coverImage: "/images/books-banner.jpg",
      published: true,
      featured: true,
      isAd: true,
      adClient: "校园二手书联盟",
      adContact: "微信：bookworm_campus",
      adStartDate: new Date(),
      adEndDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
      adStatus: "active",
      adPrice: 2000,
      adDuration: 6,
      publishedAt: new Date()
    }
  })

  // 示例广告2：校园摄影服务
  await prisma.blogPost.create({
    data: {
      title: "📸 记录你的大学精彩瞬间 | 仅需35元/年",
      slug: "campus-photography-service",
      content: `**📷 用镜头定格青春**

嘿，同学们！大学四年转瞬即逝，不想留下点美好的回忆吗？

我们是校园摄影工作室，由一群热爱摄影的小伙伴组成。我们懂你们的审美，知道什么样的照片最能展现青春风采。

**服务特色：**
- 📸 校园写真：图书馆、操场、教学楼...每个角落都是绝佳背景
- 🎓 毕业照：单人、寝室合影、班级大合照，一个都不能少
- 🍃 四季主题：春花秋月，夏蝉冬雪，记录每个季节的你
- 💻 精修服务：专业后期，让你的照片更有质感
- ⚡ 快速出片：当天拍摄，3天内出片

**套餐价格：**
- 个人写真：35元/套（含10张精修）
- 寝室合影：50元/套（含15张精修）
- 班级合照：2元/人（最低50元）

**联系我们：**
微信：photo_campus_studio
预约：提前1天预约即可
地点：校园内任选场景

青春不常在，赶紧来拍照！让你的朋友圈美到爆！📸✨

---
*P.S. 转发朋友圈集赞30个，立减5元！*

**广告合作信息：**
- 客户：校园摄影工作室
- 联系方式：微信：photo_campus_studio
- 价格：35元/12个月
- 有效期：即日起12个月`,
      excerpt: "专业校园摄影，记录你的青春时光，价格实惠，出片快速！",
      coverImage: "/images/photography-banner.jpg",
      published: true,
      featured: true,
      isAd: true,
      adClient: "校园摄影工作室",
      adContact: "微信：photo_campus_studio",
      adStartDate: new Date(),
      adEndDate: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000),
      adStatus: "active",
      adPrice: 3500,
      adDuration: 12,
      publishedAt: new Date()
    }
  })

  console.log('示例广告创建完成！')
  console.log('- 二手书交易广告')
  console.log('- 校园摄影服务广告')
}

seedAds()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })