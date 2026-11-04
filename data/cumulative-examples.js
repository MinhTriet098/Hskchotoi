/**
 * CƠ SỞ DỮ LIỆU CÂU VÍ DỤ TÍCH LUỸ (CUMULATIVE PROGRESSIVE EXAMPLES)
 * Chế độ VDC: TẮT (Chỉ dùng từ vựng các bài đã học từ Bài 1 -> Bài hiện tại)
 * Chữ bài sau chưa học tự động được tô MÀU VÀNG.
 */

window.LESSON_CHARS_MAP = {
  "1": "不们你再同大好学客家师您气王生老见谢",
  "2": "不么也事什你关兴叫名字家对很我文是月李没白系认识请起问高",
  "3": "中人们作友吗哪喂国太女她姐对工忙想我文朋法泰的谁还这",
  "4": "一七三两个九二五今他儿八六几十千口呢和哥四多大女妈妹子孩家少岁年有没爸百零（）",
  "5": "一下些今休会做儿号喜天好子它息新日星月期条欢班电看真脑菜面饭饺",
  "6": "东么买些儿出包去吃哪坐天奶好子市常怎手明晚机牛电租米西话超车边那非饭",
  "7": "上下事分医午半后吧在店影早晚点现班电看见课里钟院",
  "8": "下书亮到前医午只哪外子学小店房校桌漂猫生看能见里间饭",
  "9": "上个习书友听唱外天好子学朋本椅歌狗玩电白第视读边那",
  "10": "一么些件便儿元商块女子宜少店怎有服杯果样水点男穿苹衣贵边这那钱（）",
  "11": "候友在大天学小床店开弟找时昨朋正生睡知要觉说读起车道那里问饭",
  "12": "一下了儿公再冷司喝回天得来气水点热生病看觉这里雨雪",
  "13": "一下个以先包半卖可士女打早生电给茶蛋话请这问面题饭鸡",
  "14": "上不中些他们写午听哪她字学它小年开明晚有汉火生的要见话语说车都",
  "15": "上个人住儿兴去友哪场大好家小年早时朋机海爱玩男间飞"
};

window.CUMULATIVE_EXAMPLES = {
  "1": {
    "hz": "老师，您好！",
    "py": "Lǎoshī, nín hǎo!",
    "vi": "Em chào thầy/cô ạ!"
  },
  "7": {
    "hz": "大家好！",
    "py": "Dàjiā hǎo!",
    "vi": "Xin chào mọi người!"
  },
  "2": {
    "hz": "老师好！",
    "py": "Lǎoshī hǎo!",
    "vi": "Chào thầy/cô!"
  },
  "9": {
    "hz": "学生们好！",
    "py": "Xuéshengmen hǎo!",
    "vi": "Chào các em học sinh!"
  },
  "3": {
    "hz": "你们好！",
    "py": "Nǐmen hǎo!",
    "vi": "Chào các bạn!"
  },
  "6": {
    "hz": "王老师好！",
    "py": "Wáng lǎoshī hǎo!",
    "vi": "Chào cô Vương!"
  },
  "5": {
    "hz": "老师，您好！",
    "py": "Lǎoshī, nín hǎo!",
    "vi": "Em chào thầy cô ạ!"
  },
  "4": {
    "hz": "你们好，同学们！",
    "py": "Nǐmen hǎo, tóngxuémen!",
    "vi": "Chào các bạn, các em học sinh!"
  },
  "10": {
    "hz": "谢谢老师！",
    "py": "Xièxie lǎoshī!",
    "vi": "Em cảm ơn thầy cô!"
  },
  "11": {
    "hz": "不客气！",
    "py": "Bú kèqi!",
    "vi": "Không có gì đâu ạ!"
  },
  "8": {
    "hz": "同学们好！",
    "py": "Tóngxuémen hǎo!",
    "vi": "Chào các bạn học sinh!"
  },
  "12": {
    "hz": "老师，再见！",
    "py": "Lǎoshī, zàijiàn!",
    "vi": "Thầy cô, tạm biệt ạ!"
  },
  "301": {
    "hz": "王老师，您好！",
    "py": "Wáng lǎoshī, nín hǎo!",
    "vi": "Em chào cô Vương ạ!"
  },
  "21": {
    "hz": "请问，你是王老师吗？",
    "py": "Qǐngwèn, nǐ shì Wáng lǎoshī ma?",
    "vi": "Xin hỏi, bạn có phải là cô Vương không?"
  },
  "15": {
    "hz": "你好，你叫什么名字？",
    "py": "Nǐ hǎo, nǐ jiào shénme míngzi?",
    "vi": "Chào bạn, bạn tên là gì?"
  },
  "14": {
    "hz": "我叫李文。",
    "py": "Wǒ jiào Lǐ Wén.",
    "vi": "Tôi tên là Lý Văn."
  },
  "16": {
    "hz": "你叫什么名字？",
    "py": "Nǐ jiào shénme míngzi?",
    "vi": "Bạn tên là gì?"
  },
  "17": {
    "hz": "我的名字叫李文。",
    "py": "Wǒ de míngzi jiào Lǐ Wén.",
    "vi": "Tên tôi là Lý Văn."
  },
  "13": {
    "hz": "我是学生。",
    "py": "Wǒ shì xuésheng.",
    "vi": "Tôi là học sinh."
  },
  "23": {
    "hz": "我不是老师，我是学生。",
    "py": "Wǒ bú shì lǎoshī, wǒ shì xuésheng.",
    "vi": "Tôi không phải giáo viên, tôi là học sinh."
  },
  "22": {
    "hz": "我是学生，她是老师。",
    "py": "Wǒ shì xuésheng, tā shì lǎoshī.",
    "vi": "Tôi là học sinh, cô ấy là giáo viên."
  },
  "24": {
    "hz": "对不起，王老师！",
    "py": "Duìbuqǐ, Wáng lǎoshī!",
    "vi": "Xin lỗi cô Vương!"
  },
  "25": {
    "hz": "没关系，李文！",
    "py": "Méi guānxi, Lǐ Wén!",
    "vi": "Không sao đâu Lý Văn!"
  },
  "26": {
    "hz": "没事，谢谢你！",
    "py": "Méishì, xièxie nǐ!",
    "vi": "Không sao, cảm ơn bạn!"
  },
  "20": {
    "hz": "我很好，谢谢！",
    "py": "Wǒ hěn hǎo, xièxie!",
    "vi": "Tôi rất khỏe, cảm ơn!"
  },
  "19": {
    "hz": "认识你很高兴！",
    "py": "Rènshi nǐ hěn gāoxìng!",
    "vi": "Rất vui được quen biết bạn!"
  },
  "18": {
    "hz": "很高兴认识你！",
    "py": "Hěn gāoxìng rènshi nǐ!",
    "vi": "Rất vui được làm quen với bạn!"
  },
  "27": {
    "hz": "我也很高兴！",
    "py": "Wǒ yě hěn gāoxìng!",
    "vi": "Tôi cũng rất vui!"
  },
  "304": {
    "hz": "我叫李文，是学生。",
    "py": "Wǒ jiào Lǐ Wén, shì xuésheng.",
    "vi": "Tôi tên là Lý Văn, là học sinh."
  },
  "305": {
    "hz": "我叫白家月，你好！",
    "py": "Wǒ jiào Bái Jiāyuè, nǐ hǎo!",
    "vi": "Tôi tên là Bạch Gia Nguyệt, xin chào!"
  },
  "29": {
    "hz": "我是中国人。",
    "py": "Wǒ shì Zhōngguó rén.",
    "vi": "Tôi là người Trung Quốc."
  },
  "31": {
    "hz": "这是我的老师。",
    "py": "Zhè shì wǒ de lǎoshī.",
    "vi": "Đây là giáo viên của tôi."
  },
  "42": {
    "hz": "这是王老师。",
    "py": "Zhè shì Wáng lǎoshī.",
    "vi": "Đây là cô Vương."
  },
  "34": {
    "hz": "请问，他是谁？",
    "py": "Qǐngwèn, tā shì shéi?",
    "vi": "Xin hỏi, anh ấy là ai?"
  },
  "35": {
    "hz": "她是李文的女朋友。",
    "py": "Tā shì Lǐ Wén de nǚpéngyou.",
    "vi": "Cô ấy là bạn gái của Lý Văn."
  },
  "30": {
    "hz": "你是哪国人？",
    "py": "Nǐ shì nǎ guó rén?",
    "vi": "Bạn là người nước nào?"
  },
  "28": {
    "hz": "中国和法国。",
    "py": "Zhōngguó hé Fǎguó.",
    "vi": "Trung Quốc và Pháp."
  },
  "33": {
    "hz": "她是我的同学。",
    "py": "Tā shì wǒ de tóngxué.",
    "vi": "Cô ấy là bạn học của tôi."
  },
  "39": {
    "hz": "喂，请问是王老师吗？",
    "py": "Wèi, qǐngwèn shì Wáng lǎoshī ma?",
    "vi": "A lô, xin hỏi có phải cô Vương không?"
  },
  "36": {
    "hz": "她是我的姐姐。",
    "py": "Tā shì wǒ de jiějie.",
    "vi": "Cô ấy là chị gái của tôi."
  },
  "43": {
    "hz": "你姐姐工作忙吗？",
    "py": "Nǐ jiějie gōngzuò máng ma?",
    "vi": "Chị gái bạn làm việc bận không?"
  },
  "32": {
    "hz": "我也还想工作。",
    "py": "Wǒ yě hái xiǎng gōngzuò.",
    "vi": "Tôi cũng vẫn muốn làm việc."
  },
  "38": {
    "hz": "王老师，您忙吗？",
    "py": "Wáng lǎoshī, nín máng ma?",
    "vi": "Cô Vương, cô bận không ạ?"
  },
  "44": {
    "hz": "你好，你是中国人吗？",
    "py": "Nǐ hǎo, nǐ shì Zhōngguó rén ma?",
    "vi": "Chào bạn, bạn là người Trung Quốc phải không?"
  },
  "288": {
    "hz": "对，我是中国人。",
    "py": "Duì, wǒ shì Zhōngguó rén.",
    "vi": "Đúng vậy, tôi là người Trung Quốc."
  },
  "37": {
    "hz": "太好了，谢谢你！",
    "py": "Tài hǎo le, xièxie nǐ!",
    "vi": "Tốt quá rồi, cảm ơn bạn!"
  },
  "40": {
    "hz": "我们都是学生。",
    "py": "Wǒmen dōu shì xuésheng.",
    "vi": "Chúng tôi đều là học sinh."
  },
  "41": {
    "hz": "我想认识你的姐姐。",
    "py": "Wǒ xiǎng rènshi nǐ de jiějie.",
    "vi": "Tôi muốn làm quen với chị gái của bạn."
  },
  "298": {
    "hz": "我是中国人，不是法国人。",
    "py": "Wǒ shì Zhōngguó rén, bú shì Fǎguó rén.",
    "vi": "Tôi là người Trung Quốc, không phải người Pháp."
  },
  "302": {
    "hz": "她是法国人吗？",
    "py": "Tā shì Fǎguó rén ma?",
    "vi": "Cô ấy là người Pháp phải không?"
  },
  "299": {
    "hz": "我想学习中文。",
    "py": "Wǒ xiǎng xuéxí Zhōngwén.",
    "vi": "Tôi muốn học tiếng Trung."
  },
  "303": {
    "hz": "他也是泰国人。",
    "py": "Tā yě shì Tàiguó rén.",
    "vi": "Anh ấy cũng là người Thái Lan."
  },
  "45": {
    "hz": "我家有四口人。",
    "py": "Wǒ jiā yǒu sì kǒu rén.",
    "vi": "Nhà tôi có 4 người."
  },
  "56": {
    "hz": "你有多少个中国朋友？",
    "py": "Nǐ yǒu duōshao gè Zhōngguó péngyou?",
    "vi": "Bạn có bao nhiêu người bạn Trung Quốc?"
  },
  "47": {
    "hz": "我有两个哥哥。",
    "py": "Wǒ yǒu liǎng gè gēge.",
    "vi": "Tôi có hai người anh trai."
  },
  "53": {
    "hz": "我哥哥也是学生。",
    "py": "Wǒ gēge yě shì xuésheng.",
    "vi": "Anh trai tôi cũng là học sinh."
  },
  "63": {
    "hz": "我是中国人，你呢？",
    "py": "Wǒ shì Zhōngguó rén, nǐ ne?",
    "vi": "Tôi là người Trung Quốc, còn bạn?"
  },
  "292": {
    "hz": "我没有妹妹。",
    "py": "Wǒ méiyǒu mèimei.",
    "vi": "Tôi không có em gái."
  },
  "61": {
    "hz": "我家有四口人：爸爸、妈妈、姐姐和我。",
    "py": "Wǒ jiā yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ.",
    "vi": "Nhà tôi có 4 người: bố, mẹ, chị gái và tôi."
  },
  "57": {
    "hz": "你家有几个孩子？",
    "py": "Nǐ jiā yǒu jǐ gè háizi?",
    "vi": "Nhà bạn có mấy đứa con?"
  },
  "55": {
    "hz": "我家有三口人。",
    "py": "Wǒ jiā yǒu sān kǒu rén.",
    "vi": "Nhà tôi có 3 người."
  },
  "51": {
    "hz": "我爸爸是老师。",
    "py": "Wǒ bàba shì lǎoshī.",
    "vi": "Bố tôi là giáo viên."
  },
  "52": {
    "hz": "我妈妈做饭很好吃。",
    "py": "Wǒ māma zuò fàn hěn hǎochī.",
    "vi": "Mẹ tôi nấu ăn rất ngon."
  },
  "54": {
    "hz": "我妹妹今年五岁。",
    "py": "Wǒ mèimei jīnnián wǔ suì.",
    "vi": "Em gái tôi năm nay 5 tuổi."
  },
  "64": {
    "hz": "老师和学生都在这儿。",
    "py": "Lǎoshī hé xuésheng dōu zài zhèr.",
    "vi": "Thầy cô và học sinh đều ở đây."
  },
  "49": {
    "hz": "他有一个儿子。",
    "py": "Tā yǒu yí gè érzi.",
    "vi": "Anh ấy có một con trai."
  },
  "48": {
    "hz": "王老师有两个孩子。",
    "py": "Wáng lǎoshī yǒu liǎng gè háizi.",
    "vi": "Cô Vương có hai đứa con."
  },
  "50": {
    "hz": "我有一个女儿。",
    "py": "Wǒ yǒu yí gè nǚ'ér.",
    "vi": "Tôi có một con gái."
  },
  "58": {
    "hz": "他今年十岁。",
    "py": "Tā jīnnián shí suì.",
    "vi": "Năm nay cậu ấy 10 tuổi."
  },
  "62": {
    "hz": "他是我的好朋友。",
    "py": "Tā shì wǒ de hǎo péngyou.",
    "vi": "Anh ấy là bạn tốt của tôi."
  },
  "59": {
    "hz": "今年我二十岁。",
    "py": "Jīnnián wǒ èrshí suì.",
    "vi": "Năm nay tôi 20 tuổi."
  },
  "60": {
    "hz": "李文，你今年多大？",
    "py": "Lǐ Wén, nǐ jīnnián duō dà?",
    "vi": "Lý Văn, năm nay bạn bao nhiêu tuổi?"
  },
  "149": {
    "hz": "你家大吗？我家很大。",
    "py": "Nǐ jiā dà ma? Wǒ jiā hěn dà.",
    "vi": "Nhà bạn to không? Nhà tôi rất to."
  },
  "46": {
    "hz": "我有两个中国朋友。",
    "py": "Wǒ yǒu liǎng gè Zhōngguó péngyou.",
    "vi": "Tôi có hai người bạn Trung Quốc."
  },
  "65": {
    "hz": "我有一个好朋友。",
    "py": "Wǒ yǒu yí gè hǎo péngyou.",
    "vi": "Tôi có một người bạn tốt."
  },
  "66": {
    "hz": "我有两个妹妹。",
    "py": "Wǒ yǒu liǎng gè mèimei.",
    "vi": "Tôi có hai người em gái."
  },
  "67": {
    "hz": "我家有三口人。",
    "py": "Wǒ jiā yǒu sān kǒu rén.",
    "vi": "Nhà tôi có ba người."
  },
  "68": {
    "hz": "我有四个中国同学。",
    "py": "Wǒ yǒu sì gè Zhōngguó tóngxué.",
    "vi": "Tôi có bốn người bạn học Trung Quốc."
  },
  "69": {
    "hz": "他今年五岁。",
    "py": "Tā jīnnián wǔ suì.",
    "vi": "Năm nay em ấy 5 tuổi."
  },
  "70": {
    "hz": "我家有六口人。",
    "py": "Wǒ jiā yǒu liù kǒu rén.",
    "vi": "Nhà tôi có sáu người."
  },
  "71": {
    "hz": "我们有七个同学。",
    "py": "Wǒmen yǒu qī gè tóngxué.",
    "vi": "Chúng tôi có bảy bạn học."
  },
  "72": {
    "hz": "我今年十八岁。",
    "py": "Wǒ jīnnián shíbā suì.",
    "vi": "Năm nay tôi mười tám tuổi."
  },
  "73": {
    "hz": "她今年九岁。",
    "py": "Tā jīnnián jiǔ suì.",
    "vi": "Năm nay em ấy chín tuổi."
  },
  "74": {
    "hz": "我们有十个学生。",
    "py": "Wǒmen yǒu shí gè xuésheng.",
    "vi": "Chúng tôi có mười học sinh."
  },
  "75": {
    "hz": "这里有一百个学生。",
    "py": "Zhèlǐ yǒu yìbǎi gè xuésheng.",
    "vi": "Ở đây có một trăm học sinh."
  },
  "76": {
    "hz": "学校有一千个学生。",
    "py": "Xuéxiào yǒu yìqiān gè xuésheng.",
    "vi": "Trường học có một nghìn học sinh."
  },
  "77": {
    "hz": "二零二六年。",
    "py": "Èr líng èrliù nián.",
    "vi": "Năm 2026."
  },
  "78": {
    "hz": "今天星期五，我很忙。",
    "py": "Jīntiān xīngqīwǔ, wǒ hěn máng.",
    "vi": "Hôm nay thứ Sáu, tôi rất bận."
  },
  "85": {
    "hz": "今天五月一号。",
    "py": "Jīntiān wǔ yuè yī hào.",
    "vi": "Hôm nay là ngày 1 tháng 5."
  },
  "83": {
    "hz": "这个月我很忙。",
    "py": "Zhè gè yuè wǒ hěn máng.",
    "vi": "Tháng này tôi rất bận."
  },
  "84": {
    "hz": "十月一日是星期天。",
    "py": "Shí yuè yī rì shì xīngqītiān.",
    "vi": "Ngày 1 tháng 10 là Chủ nhật."
  },
  "80": {
    "hz": "一个星期有七天。",
    "py": "Yí gè xīngqī yǒu qī tiān.",
    "vi": "Một tuần có bảy ngày."
  },
  "81": {
    "hz": "星期日我在家休息。",
    "py": "Xīngqīrì wǒ zài jiā xiūxi.",
    "vi": "Chủ nhật tôi nghỉ ở nhà."
  },
  "82": {
    "hz": "星期天我想在家休息。",
    "py": "Xīngqītiān wǒ xiǎng zài jiā xiūxi.",
    "vi": "Chủ nhật tôi muốn ở nhà nghỉ ngơi."
  },
  "79": {
    "hz": "今天我很累，想休息。",
    "py": "Jīntiān wǒ hěn lèi, xiǎng xiūxi.",
    "vi": "Hôm nay tôi rất mệt, muốn nghỉ ngơi."
  },
  "99": {
    "hz": "我会说一点儿中文。",
    "py": "Wǒ huì shuō yìdiǎnr Zhōngwén.",
    "vi": "Tôi biết nói một chút tiếng Trung."
  },
  "96": {
    "hz": "我妈妈做饭很好吃。",
    "py": "Wǒ māma zuò fàn hěn hǎochī.",
    "vi": "Mẹ tôi nấu ăn rất ngon."
  },
  "95": {
    "hz": "你在做什么？",
    "py": "Nǐ zài zuò shénme?",
    "vi": "Bạn đang làm gì?"
  },
  "89": {
    "hz": "我喜欢吃中国面条儿。",
    "py": "Wǒ xǐhuan chī Zhōngguó miàntiáor.",
    "vi": "Tôi thích ăn mì Trung Quốc."
  },
  "90": {
    "hz": "今天我们吃饺子。",
    "py": "Jīntiān wǒmen chī jiǎozi.",
    "vi": "Hôm nay chúng ta ăn bánh chẻo."
  },
  "93": {
    "hz": "我有一些中国朋友。",
    "py": "Wǒ yǒu yìxiē Zhōngguó péngyou.",
    "vi": "Tôi có một số bạn bè Trung Quốc."
  },
  "91": {
    "hz": "妈妈做的菜真好吃！",
    "py": "Māma zuò de cài zhēn hǎochī!",
    "vi": "Món mẹ nấu thật là ngon!"
  },
  "97": {
    "hz": "我爸爸五点下班。",
    "py": "Wǒ bàba wǔ diǎn xiàbān.",
    "vi": "Bố tôi 5 giờ tan làm."
  },
  "92": {
    "hz": "我有一个新电脑。",
    "py": "Wǒ yǒu yí gè xīn diànnǎo.",
    "vi": "Tôi có một chiếc máy tính mới."
  },
  "86": {
    "hz": "这是我的新电脑。",
    "py": "Zhè shì wǒ de xīn diànnǎo.",
    "vi": "Đây là máy tính mới của tôi."
  },
  "94": {
    "hz": "妈妈做饭真好吃！",
    "py": "Māma zuò fàn zhēn hǎochī!",
    "vi": "Mẹ nấu ăn thật là ngon!"
  },
  "88": {
    "hz": "李文的女朋友真好看。",
    "py": "Lǐ Wén de nǚpéngyou zhēn hǎokàn.",
    "vi": "Bạn gái của Lý Văn thật đẹp."
  },
  "87": {
    "hz": "我很喜欢学汉语。",
    "py": "Wǒ hěn xǐhuan xué Hànyǔ.",
    "vi": "Tôi rất thích học tiếng Trung."
  },
  "98": {
    "hz": "我很喜欢它。",
    "py": "Wǒ hěn xǐhuan tā.",
    "vi": "Tôi rất thích nó."
  },
  "100": {
    "hz": "我的手机不见了。",
    "py": "Wǒ de shǒu jī bù jiàn le.",
    "vi": "Điện thoại của tôi bị mất."
  },
  "101": {
    "hz": "我的电话没电了。",
    "py": "Wǒ de diàn huà méi diàn le.",
    "vi": "Điện thoại tôi hết pin rồi."
  },
  "112": {
    "hz": "明天我们考试。",
    "py": "Míng tiān wǒ men kǎo shì.",
    "vi": "Ngày mai chúng tôi thi."
  },
  "103": {
    "hz": "我明天去学校。",
    "py": "Wǒ míng tiān qù xué xiào.",
    "vi": "Ngày mai tôi đi học."
  },
  "293": {
    "hz": "你去哪儿？",
    "py": "Nǐ qù nǎ r?",
    "vi": "Bạn đi đâu?"
  },
  "104": {
    "hz": "下班以后我去超市买东西。",
    "py": "Xià bān yǐ hòu wǒ qù chāo shì mǎi dōng xi.",
    "vi": "Tan làm tôi đi siêu thị mua đồ."
  },
  "105": {
    "hz": "我想买一件衣服。",
    "py": "Wǒ xiǎng mǎi yī jiàn yī fu.",
    "vi": "Tôi muốn mua một bộ quần áo."
  },
  "106": {
    "hz": "房间里有很多东西。",
    "py": "Fáng jiān lǐ yǒu hěn duō dōng xi.",
    "vi": "Trong phòng có nhiều đồ."
  },
  "116": {
    "hz": "我买了一些水果。",
    "py": "Wǒ mǎi le yī xiē shuǐ guǒ.",
    "vi": "Tôi mua một ít trái cây."
  },
  "111": {
    "hz": "我每天早上喝牛奶。",
    "py": "Wǒ měi tiān zǎo shang hē niú nǎi.",
    "vi": "Mỗi sáng tôi uống sữa."
  },
  "107": {
    "hz": "我每天在家吃饭。",
    "py": "Wǒ měi tiān zài jiā chī fàn.",
    "vi": "Tôi ăn cơm ở nhà mỗi ngày."
  },
  "117": {
    "hz": "我们六点吃晚饭。",
    "py": "Wǒ men liù diǎn chī wǎn fàn.",
    "vi": "Chúng tôi ăn tối lúc 6 giờ."
  },
  "115": {
    "hz": "那边是超市。",
    "py": "Nà biān shì chāo shì.",
    "vi": "Bên kia là siêu thị."
  },
  "109": {
    "hz": "早上我吃了两个包子。",
    "py": "Zǎo shang wǒ chī le liǎng gè bāo zi.",
    "vi": "Buổi sáng tôi ăn hai cái bánh bao."
  },
  "118": {
    "hz": "今天的天气非常好。",
    "py": "Jīn tiān de tiān qì fēi cháng hǎo.",
    "vi": "Thời tiết hôm nay rất tốt."
  },
  "108": {
    "hz": "中国菜很好吃。",
    "py": "Zhōng guó cài hěn hǎo chī.",
    "vi": "Món Trung Quốc rất ngon."
  },
  "110": {
    "hz": "中午我们吃米饭。",
    "py": "Zhōng wǔ wǒ men chī mǐ fàn.",
    "vi": "Buổi trưa chúng tôi ăn cơm."
  },
  "102": {
    "hz": "你怎么来学校？",
    "py": "Nǐ zěn me lái xué xiào?",
    "vi": "Bạn đến trường bằng cách nào?"
  },
  "114": {
    "hz": "请坐这儿。",
    "py": "Qǐng zuò zhè ér.",
    "vi": "Mời ngồi ở đây."
  },
  "113": {
    "hz": "我们坐出租车去机场。",
    "py": "Wǒ men zuò chū zū chē qù jī chǎng.",
    "vi": "Chúng tôi đi taxi ra sân bay."
  },
  "130": {
    "hz": "现在我很忙。",
    "py": "Xiàn zài wǒ hěn máng.",
    "vi": "Bây giờ tôi rất bận."
  },
  "119": {
    "hz": "现在三点半。",
    "py": "Xiàn zài sān diǎn bàn.",
    "vi": "Bây giờ là 3 giờ rưỡi."
  },
  "129": {
    "hz": "早上我去学校。",
    "py": "Zǎo shang wǒ qù xué xiào.",
    "vi": "Buổi sáng tôi đi học."
  },
  "126": {
    "hz": "上午我在家。",
    "py": "Shàng wǔ wǒ zài jiā.",
    "vi": "Buổi sáng tôi ở nhà."
  },
  "121": {
    "hz": "现在是三点十分。",
    "py": "Xiàn zài shì sān diǎn shí fēn.",
    "vi": "Bây giờ là 3 giờ 10 phút."
  },
  "132": {
    "hz": "今天我们有三节课。",
    "py": "Jīn tiān wǒ men yǒu sān jié kè.",
    "vi": "Hôm nay chúng tôi có ba tiết học."
  },
  "127": {
    "hz": "下午我去超市买东西。",
    "py": "Xià wǔ wǒ qù chāo shì mǎi dōng xi.",
    "vi": "Buổi chiều tôi đi siêu thị mua đồ."
  },
  "135": {
    "hz": "明天见老师。",
    "py": "Míng tiān jiàn lǎo shī.",
    "vi": "Ngày mai gặp thầy giáo."
  },
  "134": {
    "hz": "我们一起去吃饭吧。",
    "py": "Wǒ men yī qǐ qù chī fàn ba.",
    "vi": "Chúng ta cùng đi ăn cơm nhé."
  },
  "138": {
    "hz": "周末我们去电影院。",
    "py": "Zhōu mò wǒ men qù diàn yǐng yuàn.",
    "vi": "Cuối tuần chúng tôi đi rạp."
  },
  "136": {
    "hz": "晚上我看电视学习汉语。",
    "py": "Wǎn shang wǒ kàn diàn shì xué xí hàn yǔ.",
    "vi": "Buổi tối tôi xem TV học tiếng Trung."
  },
  "137": {
    "hz": "这部电影很好看。",
    "py": "Zhè bù diàn yǐng hěn hǎo kàn.",
    "vi": "Bộ phim này rất hay."
  },
  "133": {
    "hz": "这件事很重要。",
    "py": "Zhè jiàn shì hěn zhòng yào.",
    "vi": "Việc này rất quan trọng."
  },
  "124": {
    "hz": "我们九点开始上课。",
    "py": "Wǒ men jiǔ diǎn kāi shǐ shàng kè.",
    "vi": "Chúng tôi bắt đầu học lúc 9 giờ."
  },
  "120": {
    "hz": "我只吃了一半。",
    "py": "Wǒ zhǐ chī le yī bàn.",
    "vi": "Tôi chỉ ăn một nửa."
  },
  "125": {
    "hz": "下课以后我们去吃饭。",
    "py": "Xià kè yǐ hòu wǒ men qù chī fàn.",
    "vi": "Tan học chúng tôi đi ăn."
  },
  "141": {
    "hz": "我在家学习。",
    "py": "Wǒ zài jiā xué xí.",
    "vi": "Tôi học ở nhà."
  },
  "140": {
    "hz": "书在书包里。",
    "py": "Shū zài shū bāo lǐ.",
    "vi": "Sách ở trong cặp."
  },
  "128": {
    "hz": "晚上我在家。",
    "py": "Wǎn shang wǒ zài jiā.",
    "vi": "Buổi tối tôi ở nhà."
  },
  "143": {
    "hz": "他在医院工作。",
    "py": "Tā zài yī yuàn gōng zuò.",
    "vi": "Anh ấy làm việc ở bệnh viện."
  },
  "123": {
    "hz": "我八点上班。",
    "py": "Wǒ bā diǎn shàng bān.",
    "vi": "Tôi đi làm lúc 8 giờ."
  },
  "139": {
    "hz": "这家店很有名。",
    "py": "Zhè jiā diàn hěn yǒu míng.",
    "vi": "Cửa hàng này rất nổi tiếng."
  },
  "122": {
    "hz": "我等了他十分钟。",
    "py": "Wǒ děng le tā shí fēn zhōng.",
    "vi": "Tôi đợi anh ấy 10 phút."
  },
  "131": {
    "hz": "下课后我们去吃饭。",
    "py": "Xià kè hòu wǒ men qù chī fàn.",
    "vi": "Sau giờ học chúng tôi đi ăn."
  },
  "146": {
    "hz": "我的房间不大，但是很干净。",
    "py": "Wǒ de fáng jiān bù dà, dàn shì hěn gān jìng.",
    "vi": "Phòng tôi không lớn nhưng rất sạch."
  },
  "156": {
    "hz": "学校外有很多饭店。",
    "py": "Xué xiào wài yǒu hěn duō fàn diàn.",
    "vi": "Bên ngoài trường có rất nhiều quán ăn."
  },
  "158": {
    "hz": "我家有一只猫。",
    "py": "Wǒ jiā yǒu yī zhǐ māo.",
    "vi": "Nhà tôi có một con mèo."
  },
  "150": {
    "hz": "这只猫很小。",
    "py": "Zhè zhǐ māo hěn xiǎo.",
    "vi": "Con mèo này rất nhỏ."
  },
  "148": {
    "hz": "这只猫很可爱。",
    "py": "Zhè zhǐ māo hěn kě ài.",
    "vi": "Con mèo này rất đáng yêu."
  },
  "153": {
    "hz": "我在学校看见老师了。",
    "py": "Wǒ zài xué xiào kàn jiàn lǎo shī le.",
    "vi": "Tôi nhìn thấy thầy giáo ở trường."
  },
  "147": {
    "hz": "桌子上有书。",
    "py": "Zhuō zi shàng yǒu shū.",
    "vi": "Trên bàn có sách."
  },
  "157": {
    "hz": "书在桌子下。",
    "py": "Shū zài zhuō zi xià.",
    "vi": "Sách ở dưới bàn."
  },
  "151": {
    "hz": "她的中文写得很漂亮。",
    "py": "Tā de zhōng wén xiě de hěn piào liang.",
    "vi": "Cô ấy viết chữ Trung rất đẹp."
  },
  "144": {
    "hz": "这是我的学校。",
    "py": "Zhè shì wǒ de xué xiào.",
    "vi": "Đây là trường học của tôi."
  },
  "145": {
    "hz": "学校旁边有书店。",
    "py": "Xué xiào páng biān yǒu shū diàn.",
    "vi": "Bên cạnh trường có hiệu sách."
  },
  "155": {
    "hz": "车前有一个人。",
    "py": "Chē qián yǒu yī gè rén.",
    "vi": "Phía trước xe có một người."
  },
  "154": {
    "hz": "我今天不能去。",
    "py": "Wǒ jīn tiān bù néng qù.",
    "vi": "Hôm nay tôi không thể đi."
  },
  "152": {
    "hz": "我八点到学校。",
    "py": "Wǒ bā diǎn dào xué xiào.",
    "vi": "Tôi đến trường lúc 8 giờ."
  },
  "160": {
    "hz": "中午我们一起吃午饭。",
    "py": "Zhōng wǔ wǒ men yī qǐ chī wǔ fàn.",
    "vi": "Buổi trưa chúng tôi ăn cùng nhau."
  },
  "159": {
    "hz": "我想吃饭，不想喝水。",
    "py": "Wǒ xiǎng chī fàn, bù xiǎng hē shuǐ.",
    "vi": "Tôi muốn ăn cơm, không muốn uống nước."
  },
  "142": {
    "hz": "医生说我需要休息。",
    "py": "Yī shēng shuō wǒ xū yào xiū xi.",
    "vi": "Bác sĩ nói tôi cần nghỉ ngơi."
  },
  "210": {
    "hz": "洗手间在哪里？",
    "py": "Xǐ shǒu jiān zài nǎ lǐ?",
    "vi": "Nhà vệ sinh ở đâu?"
  },
  "175": {
    "hz": "桌子边有一只猫。",
    "py": "Zhuō zi biān yǒu yī zhǐ māo.",
    "vi": "Bên cạnh cái bàn có một con mèo."
  },
  "178": {
    "hz": "我要那个。",
    "py": "Wǒ yào nà gè.",
    "vi": "Tôi muốn cái kia."
  },
  "174": {
    "hz": "他在外边等你。",
    "py": "Tā zài wài biān děng nǐ.",
    "vi": "Anh ấy đang đợi bạn ở bên ngoài."
  },
  "173": {
    "hz": "房间里有三把椅子。",
    "py": "Fáng jiān lǐ yǒu sān bǎ yǐ zi.",
    "vi": "Trong phòng có ba cái ghế."
  },
  "176": {
    "hz": "书在桌子上。",
    "py": "Shū zài zhuō zi shàng.",
    "vi": "Sách ở trên bàn."
  },
  "165": {
    "hz": "我买了一本汉语书。",
    "py": "Wǒ mǎi le yī běn hàn yǔ shū.",
    "vi": "Tôi mua một quyển sách tiếng Trung."
  },
  "166": {
    "hz": "我喜欢看书。",
    "py": "Wǒ xǐ huan kàn shū.",
    "vi": "Tôi thích đọc sách."
  },
  "177": {
    "hz": "那是我的老师。",
    "py": "Nà shì wǒ de lǎo shī.",
    "vi": "Kia là thầy giáo của tôi."
  },
  "164": {
    "hz": "这是我第一次来中国。",
    "py": "Zhè shì wǒ dì yī cì lái zhōng guó.",
    "vi": "Đây là lần đầu tôi đến Trung Quốc."
  },
  "161": {
    "hz": "我每天认真学习汉语。",
    "py": "Wǒ měi tiān rèn zhēn xué xí hàn yǔ.",
    "vi": "Tôi học tiếng Trung chăm chỉ mỗi ngày."
  },
  "162": {
    "hz": "我白天上班，晚上学习。",
    "py": "Wǒ bái tiān shàng bān, wǎn shang xué xí.",
    "vi": "Ban ngày tôi đi làm, tối học."
  },
  "163": {
    "hz": "他在图书馆读书。",
    "py": "Tā zài tú shū guǎn dú shū.",
    "vi": "Anh ấy học ở thư viện."
  },
  "171": {
    "hz": "我和朋友一起学习汉语。",
    "py": "Wǒ hé péng you yī qǐ xué xí hàn yǔ.",
    "vi": "Tôi học tiếng Trung cùng bạn."
  },
  "169": {
    "hz": "她唱歌唱得很好。",
    "py": "Tā chàng gē chàng de hěn hǎo.",
    "vi": "Cô ấy hát rất hay."
  },
  "168": {
    "hz": "这首歌我很喜欢。",
    "py": "Zhè shǒu gē wǒ hěn xǐ huan.",
    "vi": "Tôi rất thích bài hát này."
  },
  "170": {
    "hz": "她的声音很好听。",
    "py": "Tā de shēng yīn hěn hǎo tīng.",
    "vi": "Giọng cô ấy rất hay."
  },
  "167": {
    "hz": "晚上我们一起看电视。",
    "py": "Wǎn shang wǒ men yī qǐ kàn diàn shì.",
    "vi": "Buổi tối chúng tôi cùng xem TV."
  },
  "289": {
    "hz": "他家的狗很可爱。",
    "py": "Tā jiā de gǒu hěn kě ài.",
    "vi": "Con chó nhà anh ấy rất đáng yêu."
  },
  "172": {
    "hz": "周末我和朋友一起玩。",
    "py": "Zhōu mò wǒ hé péng you yī qǐ wán.",
    "vi": "Cuối tuần tôi chơi cùng bạn bè."
  },
  "191": {
    "hz": "桌子上有一个杯子。",
    "py": "Zhuō zi shàng yǒu yī gè bēi zi.",
    "vi": "Trên bàn có một cái cốc."
  },
  "195": {
    "hz": "这边请。",
    "py": "Zhè biān qǐng.",
    "vi": "Mời đi bên này."
  },
  "182": {
    "hz": "我没有很多钱。",
    "py": "Wǒ méi yǒu hěn duō qián.",
    "vi": "Tôi không có nhiều tiền."
  },
  "197": {
    "hz": "这些问题很简单。",
    "py": "Zhè xiē wèn tí hěn jiǎn dān.",
    "vi": "Những câu hỏi này rất đơn giản."
  },
  "184": {
    "hz": "这件衣服一百块。",
    "py": "Zhè jiàn yī fu yī bǎi kuài.",
    "vi": "Bộ quần áo này 100 tệ."
  },
  "199": {
    "hz": "那些书是新的。",
    "py": "Nà xiē shū shì xīn de.",
    "vi": "Những quyển sách kia là mới."
  },
  "196": {
    "hz": "我在这儿等你。",
    "py": "Wǒ zài zhè ér děng nǐ.",
    "vi": "Tôi đợi bạn ở đây."
  },
  "187": {
    "hz": "我每天吃水果。",
    "py": "Wǒ měi tiān chī shuǐ guǒ.",
    "vi": "Tôi ăn trái cây mỗi ngày."
  },
  "194": {
    "hz": "这里人很少。",
    "py": "Zhè lǐ rén hěn shǎo.",
    "vi": "Ở đây rất ít người."
  },
  "179": {
    "hz": "我喜欢吃苹果。",
    "py": "Wǒ xǐ huan chī píng guǒ.",
    "vi": "Tôi thích ăn táo."
  },
  "180": {
    "hz": "这件衣服很便宜。",
    "py": "Zhè jiàn yī fu hěn pián yi.",
    "vi": "Bộ quần áo này rất rẻ."
  },
  "186": {
    "hz": "这家商店卖衣服。",
    "py": "Zhè jiā shāng diàn mài yī fu.",
    "vi": "Cửa hàng này bán quần áo."
  },
  "188": {
    "hz": "这件衣服很漂亮。",
    "py": "Zhè jiàn yī fu hěn piào liang.",
    "vi": "Bộ quần áo này rất đẹp."
  },
  "189": {
    "hz": "我买了两件衣服。",
    "py": "Wǒ mǎi le liǎng jiàn yī fu.",
    "vi": "Tôi mua hai bộ quần áo."
  },
  "183": {
    "hz": "这本书二十元。",
    "py": "Zhè běn shū èr shí yuán.",
    "vi": "Quyển sách này 20 tệ."
  },
  "185": {
    "hz": "这本书怎么样？",
    "py": "Zhè běn shū zěn me yàng?",
    "vi": "Quyển sách này thế nào?"
  },
  "181": {
    "hz": "这件衣服太贵了。",
    "py": "Zhè jiàn yī fu tài guì le.",
    "vi": "Bộ quần áo này đắt quá."
  },
  "190": {
    "hz": "今天他穿了一件新衣服。",
    "py": "Jīn tiān tā chuān le yī jiàn xīn yī fu.",
    "vi": "Hôm nay anh ấy mặc đồ mới."
  },
  "193": {
    "hz": "她是女老师。",
    "py": "Tā shì nǚ lǎo shī.",
    "vi": "Cô ấy là giáo viên nữ."
  },
  "192": {
    "hz": "他是男老师。",
    "py": "Tā shì nán lǎo shī.",
    "vi": "Anh ấy là giáo viên nam."
  },
  "198": {
    "hz": "我在那儿等你。",
    "py": "Wǒ zài nà ér děng nǐ.",
    "vi": "Tôi đợi bạn ở đó."
  },
  "297": {
    "hz": "今天有点儿冷。",
    "py": "Jīn tiān yǒu diǎn er lěng.",
    "vi": "Hôm nay hơi lạnh."
  },
  "215": {
    "hz": "有时间的时候给我打电话。",
    "py": "Yǒu shí jiān de shí hou gěi wǒ dǎ diàn huà.",
    "vi": "Khi có thời gian thì gọi cho tôi."
  },
  "207": {
    "hz": "我们中午在这家饭店吃饭。",
    "py": "Wǒ men zhōng wǔ zài zhè jiā fàn diàn chī fàn.",
    "vi": "Buổi trưa chúng tôi ăn ở nhà hàng này."
  },
  "218": {
    "hz": "我知道这件事。",
    "py": "Wǒ zhī dào zhè jiàn shì.",
    "vi": "Tôi biết việc này."
  },
  "216": {
    "hz": "我正在学习汉语。",
    "py": "Wǒ zhèng zài xué xí hàn yǔ.",
    "vi": "Tôi đang học tiếng Trung."
  },
  "217": {
    "hz": "我在找我的手机。",
    "py": "Wǒ zài zhǎo wǒ de shǒu jī.",
    "vi": "Tôi đang tìm điện thoại."
  },
  "206": {
    "hz": "他每天开车上班。",
    "py": "Tā měi tiān kāi chē shàng bān.",
    "vi": "Anh ấy lái xe đi làm mỗi ngày."
  },
  "205": {
    "hz": "这辆车很新。",
    "py": "Zhè liàng chē hěn xīn.",
    "vi": "Chiếc xe này rất mới."
  },
  "202": {
    "hz": "他每天读书两个小时。",
    "py": "Tā měi tiān dú shū liǎng gè xiǎo shí.",
    "vi": "Anh ấy đọc sách 2 tiếng mỗi ngày."
  },
  "200": {
    "hz": "她在中国大学学习。",
    "py": "Tā zài zhōng guó dà xué xué xí.",
    "vi": "Cô ấy học đại học ở Trung Quốc."
  },
  "201": {
    "hz": "他是一名大学生。",
    "py": "Tā shì yī míng dà xué shēng.",
    "vi": "Anh ấy là sinh viên."
  },
  "219": {
    "hz": "我学汉语一年了。",
    "py": "Wǒ xué hàn yǔ yī nián le.",
    "vi": "Tôi học tiếng Trung được một năm rồi."
  },
  "208": {
    "hz": "我弟弟今年十岁。",
    "py": "Wǒ dì di jīn nián shí suì.",
    "vi": "Em trai tôi năm nay 10 tuổi."
  },
  "212": {
    "hz": "我每天六点起床。",
    "py": "Wǒ měi tiān liù diǎn qǐ chuáng.",
    "vi": "Tôi dậy lúc 6 giờ mỗi ngày."
  },
  "214": {
    "hz": "孩子已经睡觉了。",
    "py": "Hái zi yǐ jīng shuì jiào le.",
    "vi": "Đứa trẻ đã ngủ rồi."
  },
  "213": {
    "hz": "太晚了，我想睡了。",
    "py": "Tài wǎn le, wǒ xiǎng shuì le.",
    "vi": "Muộn quá rồi, tôi muốn đi ngủ."
  },
  "211": {
    "hz": "我朋友住在那里。",
    "py": "Wǒ péng you zhù zài nà lǐ.",
    "vi": "Bạn tôi sống ở đó."
  },
  "220": {
    "hz": "昨天我没有上班。",
    "py": "Zuó tiān wǒ méi yǒu shàng bān.",
    "vi": "Hôm qua tôi không đi làm."
  },
  "204": {
    "hz": "有问题可以问老师。",
    "py": "Yǒu wèn tí kě yǐ wèn lǎo shī.",
    "vi": "Có câu hỏi thì có thể hỏi giáo viên."
  },
  "203": {
    "hz": "请慢慢说。",
    "py": "Qǐng màn màn shuō.",
    "vi": "Làm ơn nói chậm lại."
  },
  "221": {
    "hz": "我要一杯茶。",
    "py": "Wǒ yào yī bēi chá.",
    "vi": "Tôi muốn một cốc trà."
  },
  "209": {
    "hz": "小朋友都很喜欢这个游戏。",
    "py": "Xiǎo péng you dōu hěn xǐ huan zhè gè yóu xì.",
    "vi": "Trẻ em đều rất thích trò chơi này."
  },
  "222": {
    "hz": "今天的天气很热。",
    "py": "Jīn tiān de tiān qì hěn rè.",
    "vi": "Thời tiết hôm nay rất nóng."
  },
  "240": {
    "hz": "我住在这里。",
    "py": "Wǒ zhù zài zhè lǐ.",
    "vi": "Tôi sống ở đây."
  },
  "228": {
    "hz": "我在中国住了三天。",
    "py": "Wǒ zài zhōng guó zhù le sān tiān.",
    "vi": "Tôi ở Trung Quốc ba ngày."
  },
  "223": {
    "hz": "今天下午下雨了。",
    "py": "Jīn tiān xià wǔ xià yǔ le.",
    "vi": "Chiều nay trời mưa."
  },
  "229": {
    "hz": "我吃饭了。",
    "py": "Wǒ chī fàn le.",
    "vi": "Tôi ăn cơm rồi."
  },
  "224": {
    "hz": "外面下雨了。",
    "py": "Wài miàn xià yǔ le.",
    "vi": "Bên ngoài trời mưa rồi."
  },
  "238": {
    "hz": "我觉得这本书很有意思。",
    "py": "Wǒ jué de zhè běn shū hěn yǒu yì si.",
    "vi": "Tôi thấy quyển sách này rất thú vị."
  },
  "226": {
    "hz": "今天外面很冷。",
    "py": "Jīn tiān wài miàn hěn lěng.",
    "vi": "Hôm nay bên ngoài rất lạnh."
  },
  "225": {
    "hz": "冬天这里常常下雪。",
    "py": "Dōng tiān zhè lǐ cháng cháng xià xuě.",
    "vi": "Mùa đông ở đây thường có tuyết."
  },
  "237": {
    "hz": "明天你来我家吧。",
    "py": "Míng tiān nǐ lái wǒ jiā ba.",
    "vi": "Ngày mai bạn đến nhà tôi nhé."
  },
  "234": {
    "hz": "她在一家外国公司工作。",
    "py": "Tā zài yī jiā wài guó gōng sī gōng zuò.",
    "vi": "Cô ấy làm ở một công ty nước ngoài."
  },
  "232": {
    "hz": "他昨天生病了。",
    "py": "Tā zuó tiān shēng bìng le.",
    "vi": "Hôm qua anh ấy bị bệnh."
  },
  "233": {
    "hz": "他生病了，去医院看病。",
    "py": "Tā shēng bìng le, qù yī yuàn kàn bìng.",
    "vi": "Anh ấy bị bệnh nên đi khám."
  },
  "231": {
    "hz": "他病了，今天没来上课。",
    "py": "Tā bìng le, jīn tiān méi lái shàng kè.",
    "vi": "Anh ấy bị ốm, hôm nay không đến lớp."
  },
  "239": {
    "hz": "我会说一点儿汉语。",
    "py": "Wǒ huì shuō yī diǎn er hàn yǔ.",
    "vi": "Tôi biết nói một chút tiếng Trung."
  },
  "236": {
    "hz": "晚上我回家做饭。",
    "py": "Wǎn shang wǒ huí jiā zuò fàn.",
    "vi": "Buổi tối tôi về nhà nấu ăn."
  },
  "241": {
    "hz": "明天再来吧。",
    "py": "Míng tiān zài lái ba.",
    "vi": "Ngày mai lại đến nhé."
  },
  "235": {
    "hz": "我早上喝咖啡。",
    "py": "Wǒ zǎo shang hē kā fēi.",
    "vi": "Buổi sáng tôi uống cà phê."
  },
  "227": {
    "hz": "今天很热。",
    "py": "Jīn tiān hěn rè.",
    "vi": "Hôm nay rất nóng."
  },
  "230": {
    "hz": "请给我一杯水。",
    "py": "Qǐng gěi wǒ yī bēi shuǐ.",
    "vi": "Làm ơn cho tôi một cốc nước."
  },
  "245": {
    "hz": "你可以坐在这里。",
    "py": "Nǐ kě yǐ zuò zài zhè lǐ.",
    "vi": "Bạn có thể ngồi ở đây."
  },
  "254": {
    "hz": "这个问题不难。",
    "py": "Zhè gè wèn tí bù nán.",
    "vi": "Câu hỏi này không khó."
  },
  "250": {
    "hz": "这家店卖水果。",
    "py": "Zhè jiā diàn mài shuǐ guǒ.",
    "vi": "Cửa hàng này bán hoa quả."
  },
  "255": {
    "hz": "我晚上给妈妈打电话。",
    "py": "Wǒ wǎn shang gěi mā ma dǎ diàn huà.",
    "vi": "Buổi tối tôi gọi điện cho mẹ."
  },
  "246": {
    "hz": "请等我一下。",
    "py": "Qǐng děng wǒ yī xià.",
    "vi": "Làm ơn đợi tôi một chút."
  },
  "249": {
    "hz": "这位女士很有礼貌。",
    "py": "Zhè wèi nǚ shì hěn yǒu lǐ mào.",
    "vi": "Quý cô này rất lịch sự."
  },
  "242": {
    "hz": "请坐。",
    "py": "Qǐng zuò.",
    "vi": "Mời ngồi."
  },
  "243": {
    "hz": "老师给我们作业。",
    "py": "Lǎo shī gěi wǒ men zuò yè.",
    "vi": "Giáo viên giao bài tập cho chúng tôi."
  },
  "253": {
    "hz": "我每天吃早饭。",
    "py": "Wǒ měi tiān chī zǎo fàn.",
    "vi": "Tôi ăn sáng mỗi ngày."
  },
  "256": {
    "hz": "我要这个。",
    "py": "Wǒ yào zhè gè.",
    "vi": "Tôi muốn cái này."
  },
  "252": {
    "hz": "早餐我吃面包。",
    "py": "Zǎo cān wǒ chī miàn bāo.",
    "vi": "Bữa sáng tôi ăn bánh mì."
  },
  "251": {
    "hz": "早餐我吃鸡蛋和面包。",
    "py": "Zǎo cān wǒ chī jī dàn hé miàn bāo.",
    "vi": "Bữa sáng tôi ăn trứng và bánh mì."
  },
  "248": {
    "hz": "王先生是我的朋友。",
    "py": "Wáng xiān sheng shì wǒ de péng you.",
    "vi": "Ông Vương là bạn của tôi."
  },
  "247": {
    "hz": "我只吃了一半。",
    "py": "Wǒ zhǐ chī le yī bàn.",
    "vi": "Tôi chỉ ăn một nửa."
  },
  "244": {
    "hz": "我爸爸喜欢喝茶。",
    "py": "Wǒ bà ba xǐ huan hē chá.",
    "vi": "Bố tôi thích uống trà."
  },
  "276": {
    "hz": "我们坐火车去上海。",
    "py": "Wǒ men zuò huǒ chē qù shàng hǎi.",
    "vi": "Chúng tôi đi Thượng Hải bằng tàu hỏa."
  },
  "274": {
    "hz": "中午我们一起吃饭。",
    "py": "Zhōng wǔ wǒ men yī qǐ chī fàn.",
    "vi": "Buổi trưa chúng tôi ăn cùng nhau."
  },
  "259": {
    "hz": "老师开门走进教室。",
    "py": "Lǎo shī kāi mén zǒu jìn jiào shì.",
    "vi": "Thầy giáo mở cửa bước vào lớp."
  },
  "296": {
    "hz": "有些问题不太难。",
    "py": "Yǒu xiē wèn tí bù tài nán.",
    "vi": "Một số câu hỏi không quá khó."
  },
  "271": {
    "hz": "有的人喜欢喝茶。",
    "py": "Yǒu de rén xǐ huan hē chá.",
    "vi": "Có người thích uống trà."
  },
  "261": {
    "hz": "我每天写汉字。",
    "py": "Wǒ měi tiān xiě hàn zì.",
    "vi": "Tôi viết chữ Hán mỗi ngày."
  },
  "257": {
    "hz": "我们都喜欢学习汉语。",
    "py": "Wǒ men dōu xǐ huan xué xí hàn yǔ.",
    "vi": "Chúng tôi đều thích học tiếng Trung."
  },
  "264": {
    "hz": "我在外面听见你的声音。",
    "py": "Wǒ zài wài miàn tīng jiàn nǐ de shēng yīn.",
    "vi": "Tôi nghe thấy giọng bạn ở bên ngoài."
  },
  "258": {
    "hz": "上课的时候不要说话。",
    "py": "Shàng kè de shí hou bù yào shuō huà.",
    "vi": "Khi học đừng nói chuyện."
  },
  "265": {
    "hz": "上课不要说话。",
    "py": "Shàng kè bù yào shuō huà.",
    "vi": "Trong giờ học đừng nói chuyện."
  },
  "263": {
    "hz": "我喜欢听中国音乐。",
    "py": "Wǒ xǐ huan tīng zhōng guó yīn yuè.",
    "vi": "Tôi thích nghe nhạc Trung Quốc."
  },
  "270": {
    "hz": "你喜欢哪些？",
    "py": "Nǐ xǐ huan nǎ xiē?",
    "vi": "Bạn thích những cái nào?"
  },
  "262": {
    "hz": "这个字很难写。",
    "py": "Zhè gè zì hěn nán xiě.",
    "vi": "Chữ này rất khó viết."
  },
  "269": {
    "hz": "明年我要去中国。",
    "py": "Míng nián wǒ yào qù zhōng guó.",
    "vi": "Năm sau tôi sẽ đi Trung Quốc."
  },
  "273": {
    "hz": "他在中学学习。",
    "py": "Tā zài zhōng xué xué xí.",
    "vi": "Cậu ấy học ở trường trung học."
  },
  "272": {
    "hz": "她在这所小学上学。",
    "py": "Tā zài zhè suǒ xiǎo xué shàng xué.",
    "vi": "Cô ấy học ở trường tiểu học này."
  },
  "300": {
    "hz": "她是中学生。",
    "py": "Tā shì zhōng xué shēng.",
    "vi": "Cô ấy là học sinh trung học."
  },
  "295": {
    "hz": "这个小学生很聪明。",
    "py": "Zhè gè xiǎo xué shēng hěn cōng míng.",
    "vi": "Học sinh tiểu học này rất thông minh."
  },
  "260": {
    "hz": "孩子每天上学。",
    "py": "Hái zi měi tiān shàng xué.",
    "vi": "Trẻ em đi học mỗi ngày."
  },
  "266": {
    "hz": "他们都是大学生。",
    "py": "Tā men dōu shì dà xué shēng.",
    "vi": "Họ đều là sinh viên."
  },
  "267": {
    "hz": "她们是我的同学。",
    "py": "Tā men shì wǒ de tóng xué.",
    "vi": "Họ là bạn học của tôi."
  },
  "294": {
    "hz": "这些书很新，我很喜欢它们。",
    "py": "Zhè xiē shū hěn xīn, wǒ hěn xǐ huan tā men.",
    "vi": "Những quyển sách này rất mới, tôi rất thích chúng."
  },
  "268": {
    "hz": "现在不早也不晚。",
    "py": "Xiàn zài bù zǎo yě bù wǎn.",
    "vi": "Bây giờ không sớm cũng không muộn."
  },
  "290": {
    "hz": "学好汉语不容易。",
    "py": "Xué hǎo hàn yǔ bù róng yì.",
    "vi": "Học tốt tiếng Trung không dễ."
  },
  "291": {
    "hz": "我每天练习写汉字。",
    "py": "Wǒ měi tiān liàn xí xiě hàn zì.",
    "vi": "Tôi luyện viết chữ Hán mỗi ngày."
  },
  "277": {
    "hz": "我很爱我的家人。",
    "py": "Wǒ hěn ài wǒ de jiā rén.",
    "vi": "Tôi rất yêu gia đình của tôi."
  },
  "287": {
    "hz": "你要哪个？",
    "py": "Nǐ yào nǎ gè?",
    "vi": "Bạn muốn cái nào?"
  },
  "281": {
    "hz": "去年我开始学汉语。",
    "py": "Qù nián wǒ kāi shǐ xué hàn yǔ.",
    "vi": "Năm ngoái tôi bắt đầu học tiếng Trung."
  },
  "279": {
    "hz": "她有一个男朋友。",
    "py": "Tā yǒu yī gè nán péng you.",
    "vi": "Cô ấy có một bạn trai."
  },
  "280": {
    "hz": "我学汉语两年了。",
    "py": "Wǒ xué hàn yǔ liǎng nián le.",
    "vi": "Tôi học tiếng Trung đã hai năm."
  },
  "286": {
    "hz": "这个地方很好玩儿。",
    "py": "Zhè gè de fāng hěn hǎo wán er.",
    "vi": "Nơi này rất vui."
  },
  "275": {
    "hz": "我第一次坐飞机去中国。",
    "py": "Wǒ dì yī cì zuò fēi jī qù zhōng guó.",
    "vi": "Lần đầu tôi đi Trung Quốc bằng máy bay."
  },
  "283": {
    "hz": "我每天学习两个小时。",
    "py": "Wǒ měi tiān xué xí liǎng gè xiǎo shí.",
    "vi": "Tôi học hai tiếng mỗi ngày."
  },
  "278": {
    "hz": "我的家人都很健康。",
    "py": "Wǒ de jiā rén dōu hěn jiàn kāng.",
    "vi": "Gia đình tôi đều khỏe mạnh."
  },
  "282": {
    "hz": "我没有很多时间。",
    "py": "Wǒ méi yǒu hěn duō shí jiān.",
    "vi": "Tôi không có nhiều thời gian."
  },
  "285": {
    "hz": "我住在河内。",
    "py": "Wǒ zhù zài hé nèi.",
    "vi": "Tôi sống ở Hà Nội."
  },
  "284": {
    "hz": "今天我来得很早。",
    "py": "Jīn tiān wǒ lái de hěn zǎo.",
    "vi": "Hôm nay tôi đến rất sớm."
  },
  "306": {
    "hz": "我去年去过上海旅游。",
    "py": "Wǒ qù nián qù guò shàng hǎi lǚ yóu.",
    "vi": "Năm ngoái tôi đã từng đi Thượng Hải du lịch."
  },
  "307": {
    "hz": "我们在大兴机场见！",
    "py": "Wǒ men zài dà xīng jī chǎng jiàn!",
    "vi": "Chúng ta gặp nhau ở sân bay Đại Hưng nhé!"
  }
};

/**
 * Kiểm tra xem 1 chữ Hán đã được học chưa (tính đến bài maxLesson)
 */
window.isCharLearnedInLesson = function(char, maxLesson) {
  if (!char || char.trim() === '') return true;
  // Dấu câu và chữ số mặc định là đã biết
  if (/^[0-9一二三四五六七八九十百千万零。，！？、“”‘’：；\s,\.!\?:;~\-()（）《》〈〉【】…—]+$/.test(char)) {
    return true;
  }
  const maxL = parseInt(maxLesson, 10) || 1;
  const map = window.LESSON_CHARS_MAP || {};
  for (let l = 1; l <= maxL; l++) {
    if (map[l] && map[l].includes(char)) {
      return true;
    }
  }
  return false;
};

/**
 * Lấy câu ví dụ đang kích hoạt cho từ vựng (dựa vào trạng thái VDC Bật/Tắt)
 */
window.getActiveExampleForWord = function(item, currentLessonId, isVdcActive) {
  if (!item) return { hz: '', py: '', vi: '', isVdc: true };

  // Khi VDC BẬT: Dùng câu ví dụ chuẩn gốc của giáo trình
  if (isVdcActive) {
    return {
      hz: item.ex_hz || '',
      py: item.ex_py || '',
      vi: item.ex_vi || '',
      tokens: item.ex_tokens || null,
      isVdc: true
    };
  }

  // Khi VDC TẮT: Dùng câu ví dụ tích luỹ chỉ dùng từ bài 1 -> bài hiện tại
  const cum = (window.CUMULATIVE_EXAMPLES && window.CUMULATIVE_EXAMPLES[item.id]);
  if (cum && cum.hz) {
    return {
      hz: cum.hz,
      py: cum.py,
      vi: cum.vi,
      tokens: null,
      isVdc: false
    };
  }

  return {
    hz: item.ex_hz || '',
    py: item.ex_py || '',
    vi: item.ex_vi || '',
    tokens: item.ex_tokens || null,
    isVdc: true
  };
};
