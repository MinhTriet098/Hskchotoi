// data/tone-sandhi.js - Cơ sở dữ liệu và Quy tắc Biến điệu & Khinh thanh Tiếng Trung (Tone Sandhi & Neutral Tone Engine)
// Cung cấp thông tin chuẩn xác: Gốc => Biến điệu/Đọc thực tế (kèm lý thuyết giải thích chi tiết)

(function() {
  'use strict';

  // 1. TỪ ĐIỂN BIẾN ĐIỆU & KHINH THANH CỐ ĐỊNH (HSK 1 - HSK 3 & Giao tiếp chuẩn Bắc Kinh)
  const TONE_SANDHI_DB = {
    // === KHINH THANH: TỪ GHÉP THÔNG DỤNG ===
    "多少": {
      rootPy: "duō shǎo",
      spokenPy: "duōshao",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh (thanh nhẹ)",
      ruleTheory: "Chữ 少 đứng đơn mang thanh 3 (shǎo - ít), nhưng khi ghép trong từ hỏi số lượng '多少' (bao nhiêu), âm tiết thứ hai nhược hóa đọc thành thanh nhẹ (duōshao: ngắn, nhẹ, thả lỏng vòm miệng và không đánh dấu thanh điệu).",
      syllables: [
        { char: "多", rootPy: "duō", spokenPy: "duō", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "少", rootPy: "shǎo", spokenPy: "shao", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "学生": {
      rootPy: "xué shēng",
      spokenPy: "xuésheng",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 生 đứng đơn mang thanh 1 (shēng), khi làm hậu tố trong danh từ '学生' (học sinh) nhược hóa đọc thành thanh nhẹ (xuésheng: đọc ngắn và lướt nhẹ).",
      syllables: [
        { char: "学", rootPy: "xué", spokenPy: "xué", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "生", rootPy: "shēng", spokenPy: "sheng", rootTone: 1, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "名字": {
      rootPy: "míng zì",
      spokenPy: "míngzi",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 字 đứng đơn mang thanh 4 (zì - chữ), khi ghép trong danh từ '名字' (tên gọi) nhược hóa đọc thành thanh nhẹ (míngzi).",
      syllables: [
        { char: "名", rootPy: "míng", spokenPy: "míng", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "字", rootPy: "zì", spokenPy: "zi", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "认识": {
      rootPy: "rèn shí",
      spokenPy: "rènshi",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 识 đứng đơn mang thanh 2 (shí - kiến thức/nhận biết), khi ghép trong động từ '认识' (quen biết) nhược hóa đọc thành thanh nhẹ (rènshi).",
      syllables: [
        { char: "认", rootPy: "rèn", spokenPy: "rèn", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "识", rootPy: "shí", spokenPy: "shi", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "喜欢": {
      rootPy: "xǐ huān",
      spokenPy: "xǐhuan",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 欢 đứng đơn mang thanh 1 (huān - hoan hỉ), khi ghép trong động từ '喜欢' (thích) nhược hóa đọc thành thanh nhẹ (xǐhuan).",
      syllables: [
        { char: "喜", rootPy: "xǐ", spokenPy: "xǐ", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "欢", rootPy: "huān", spokenPy: "huan", rootTone: 1, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "东西": {
      rootPy: "dōng xī",
      spokenPy: "dōngxi",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc phân biệt nghĩa qua khinh thanh",
      ruleTheory: "Khi mang nghĩa 'đồ vật / hàng hóa', chữ 西 đọc thanh nhẹ (dōngxi). Nếu đọc cả hai chữ thanh 1 (dōngxī) thì mang nghĩa phương hướng 'Đông - Tây'.",
      syllables: [
        { char: "东", rootPy: "dōng", spokenPy: "dōng", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "西", rootPy: "xī", spokenPy: "xi", rootTone: 1, spokenTone: 0, isNeutral: true, note: "Nghĩa đồ vật đọc thanh nhẹ" }
      ]
    },
    "衣服": {
      rootPy: "yī fú",
      spokenPy: "yīfu",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 服 đứng đơn mang thanh 2 (fú - trang phục), khi ghép trong từ '衣服' (quần áo) nhược hóa đọc thành thanh nhẹ (yīfu).",
      syllables: [
        { char: "衣", rootPy: "yī", spokenPy: "yī", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "服", rootPy: "fú", spokenPy: "fu", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "漂亮": {
      rootPy: "piào liàng",
      spokenPy: "piàoliang",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 亮 đứng đơn mang thanh 4 (liàng - sáng), khi ghép trong tính từ '漂亮' (xinh đẹp) nhược hóa đọc thành thanh nhẹ (piàoliang).",
      syllables: [
        { char: "漂", rootPy: "piào", spokenPy: "piào", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "亮", rootPy: "liàng", spokenPy: "liang", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "朋友": {
      rootPy: "péng yǒu",
      spokenPy: "péngyou",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 友 đứng đơn mang thanh 3 (yǒu - bạn bè/hữu), khi ghép trong từ '朋友' (bạn bè) nhược hóa đọc thành thanh nhẹ (péngyou).",
      syllables: [
        { char: "朋", rootPy: "péng", spokenPy: "péng", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "友", rootPy: "yǒu", spokenPy: "you", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "便宜": {
      rootPy: "pián yí",
      spokenPy: "piányi",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 宜 đứng đơn mang thanh 2 (yí - thích nghi), khi ghép trong tính từ '便宜' (rẻ) nhược hóa đọc thành thanh nhẹ (piányi).",
      syllables: [
        { char: "便", rootPy: "pián", spokenPy: "pián", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "宜", rootPy: "yí", spokenPy: "yi", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "先生": {
      rootPy: "xiān shēng",
      spokenPy: "xiānsheng",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 生 đứng đơn mang thanh 1 (shēng), khi làm từ xưng hô tôn kính '先生' (ông/thầy/ngài) nhược hóa đọc thành thanh nhẹ (xiānsheng).",
      syllables: [
        { char: "先", rootPy: "xiān", spokenPy: "xiān", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "生", rootPy: "shēng", spokenPy: "sheng", rootTone: 1, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "清楚": {
      rootPy: "qīng chǔ",
      spokenPy: "qīngchu",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 楚 đứng đơn mang thanh 3 (chǔ), khi ghép trong tính từ '清楚' (rõ ràng) nhược hóa đọc thành thanh nhẹ (qīngchu).",
      syllables: [
        { char: "清", rootPy: "qīng", spokenPy: "qīng", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "楚", rootPy: "chǔ", spokenPy: "chu", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },
    "告诉": {
      rootPy: "gào sù",
      spokenPy: "gàosu",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 诉 đứng đơn mang thanh 4 (sù), khi ghép trong động từ '告诉' (bảo, kể cho biết) nhược hóa đọc thành thanh nhẹ (gàosu).",
      syllables: [
        { char: "告", rootPy: "gào", spokenPy: "gào", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "诉", rootPy: "sù", spokenPy: "su", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
      ]
    },

    // === KHINH THANH: ĐẠI TỪ VÀ HẬU TỐ HỎI (什么, 怎么...) ===
    "什么": {
      rootPy: "shén me",
      spokenPy: "shénme",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 么 là trợ từ/hậu tố nghi vấn, luôn đọc thanh nhẹ không nhấn giọng (shénme).",
      syllables: [
        { char: "什", rootPy: "shén", spokenPy: "shén", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "么", rootPy: "me", spokenPy: "me", rootTone: 0, spokenTone: 0, isNeutral: true, note: "Hậu tố đọc thanh nhẹ" }
      ]
    },
    "怎么": {
      rootPy: "zěn me",
      spokenPy: "zěnme",
      type: "Khinh thanh (Thanh nhẹ)",
      ruleName: "Quy tắc khinh thanh",
      ruleTheory: "Chữ 么 là trợ từ/hậu tố nghi vấn, luôn đọc thanh nhẹ không nhấn giọng (zěnme).",
      syllables: [
        { char: "怎", rootPy: "zěn", spokenPy: "zěn", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "么", rootPy: "me", spokenPy: "me", rootTone: 0, spokenTone: 0, isNeutral: true, note: "Hậu tố đọc thanh nhẹ" }
      ]
    },

    // === KHINH THANH: TỪ LÁY XƯNG HÔ GIA ĐÌNH VÀ TỪ CẢM THÁN ===
    "爸爸": {
      rootPy: "bà bà",
      spokenPy: "bàba",
      type: "Khinh thanh (Từ láy)",
      ruleName: "Quy tắc từ láy gia đình",
      ruleTheory: "Trong các danh từ xưng hô gia đình lặp lại 2 âm tiết, chữ thứ 2 luôn nhược hóa đọc thành thanh nhẹ (bàba: đọc ngắn, nhẹ, không nhấn giọng).",
      syllables: [
        { char: "爸", rootPy: "bà", spokenPy: "bà", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "爸", rootPy: "bà", spokenPy: "ba", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },
    "妈妈": {
      rootPy: "mā mā",
      spokenPy: "māma",
      type: "Khinh thanh (Từ láy)",
      ruleName: "Quy tắc từ láy gia đình",
      ruleTheory: "Trong danh từ xưng hô lặp lại 2 âm tiết, chữ thứ 2 nhược hóa đọc thành thanh nhẹ (māma).",
      syllables: [
        { char: "妈", rootPy: "mā", spokenPy: "mā", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "妈", rootPy: "mā", spokenPy: "ma", rootTone: 1, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },
    "哥哥": {
      rootPy: "gē gē",
      spokenPy: "gēge",
      type: "Khinh thanh (Từ láy)",
      ruleName: "Quy tắc từ láy gia đình",
      ruleTheory: "Trong danh từ xưng hô lặp lại 2 âm tiết, chữ thứ 2 nhược hóa đọc thành thanh nhẹ (gēge).",
      syllables: [
        { char: "哥", rootPy: "gē", spokenPy: "gē", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "哥", rootPy: "gē", spokenPy: "ge", rootTone: 1, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },
    "姐姐": {
      rootPy: "jiě jiě",
      spokenPy: "jiějie",
      type: "Khinh thanh (Từ láy)",
      ruleName: "Quy tắc từ láy gia đình",
      ruleTheory: "Gốc gồm 2 thanh 3 (jiě jiě). Do chữ sau nhược hóa thành thanh nhẹ nên chữ đầu giữ nguyên thanh 3 nửa âm, chữ sau đọc thanh nhẹ (jiějie).",
      syllables: [
        { char: "姐", rootPy: "jiě", spokenPy: "jiě", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "姐", rootPy: "jiě", spokenPy: "jie", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },
    "妹妹": {
      rootPy: "mèi mèi",
      spokenPy: "mèimei",
      type: "Khinh thanh (Từ láy)",
      ruleName: "Quy tắc từ láy gia đình",
      ruleTheory: "Trong danh từ xưng hô lặp lại 2 âm tiết, chữ thứ 2 nhược hóa đọc thành thanh nhẹ (mèimei).",
      syllables: [
        { char: "妹", rootPy: "mèi", spokenPy: "mèi", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "妹", rootPy: "mèi", spokenPy: "mei", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },
    "弟弟": {
      rootPy: "dì dì",
      spokenPy: "dìdi",
      type: "Khinh thanh (Từ láy)",
      ruleName: "Quy tắc từ láy gia đình",
      ruleTheory: "Trong danh từ xưng hô lặp lại 2 âm tiết, chữ thứ 2 nhược hóa đọc thành thanh nhẹ (dìdi).",
      syllables: [
        { char: "弟", rootPy: "dì", spokenPy: "dì", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "弟", rootPy: "dì", spokenPy: "di", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },
    "谢谢": {
      rootPy: "xiè xiè",
      spokenPy: "xièxie",
      type: "Khinh thanh (Từ lặp)",
      ruleName: "Quy tắc từ lặp cảm thán",
      ruleTheory: "Chữ 谢谢 gốc gồm 2 âm tiết thanh 4 (xiè xiè), chữ thứ hai bắt buộc nhược hóa đọc thành thanh nhẹ (xièxie).",
      syllables: [
        { char: "谢", rootPy: "xiè", spokenPy: "xiè", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "谢", rootPy: "xiè", spokenPy: "xie", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Âm thứ 2 đọc thanh nhẹ" }
      ]
    },

    // === KHINH THANH: HẬU TỐ "子" (zi) ===
    "儿子": {
      rootPy: "ér zǐ",
      spokenPy: "érzi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 đứng độc lập mang thanh 3 (zǐ - tử/con cái), nhưng khi làm hậu tố danh từ luôn đọc thành thanh nhẹ không mang dấu (érzi).",
      syllables: [
        { char: "儿", rootPy: "ér", spokenPy: "ér", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },
    "孩子": {
      rootPy: "hái zǐ",
      spokenPy: "háizi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 khi làm hậu tố danh từ luôn đọc thành thanh nhẹ (háizi).",
      syllables: [
        { char: "孩", rootPy: "hái", spokenPy: "hái", rootTone: 2, spokenTone: 2, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },
    "桌子": {
      rootPy: "zhuō zǐ",
      spokenPy: "zhuōzi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 làm hậu tố danh từ đọc thành thanh nhẹ (zhuōzi: cái bàn).",
      syllables: [
        { char: "桌", rootPy: "zhuō", spokenPy: "zhuō", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },
    "椅子": {
      rootPy: "yǐ zǐ",
      spokenPy: "yǐzi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 làm hậu tố danh từ đọc thành thanh nhẹ (yǐzi: cái ghế). Chữ 倚 giữ nguyên thanh 3.",
      syllables: [
        { char: "椅", rootPy: "yǐ", spokenPy: "yǐ", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },
    "杯子": {
      rootPy: "bēi zǐ",
      spokenPy: "bēizi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 làm hậu tố danh từ đọc thành thanh nhẹ (bēizi: cái cốc/ly).",
      syllables: [
        { char: "杯", rootPy: "bēi", spokenPy: "bēi", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },
    "包子": {
      rootPy: "bāo zǐ",
      spokenPy: "bāozi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 làm hậu tố danh từ món ăn đọc thành thanh nhẹ (bāozi: bánh bao).",
      syllables: [
        { char: "包", rootPy: "bāo", spokenPy: "bāo", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },
    "饺子": {
      rootPy: "jiǎo zǐ",
      spokenPy: "jiǎozi",
      type: "Khinh thanh (Hậu tố 子)",
      ruleName: "Quy tắc hậu tố 子",
      ruleTheory: "Chữ 子 làm hậu tố danh từ món ăn đọc thành thanh nhẹ (jiǎozi: sủi cảo).",
      syllables: [
        { char: "饺", rootPy: "jiǎo", spokenPy: "jiǎo", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "子", rootPy: "zǐ", spokenPy: "zi", rootTone: 3, spokenTone: 0, isNeutral: true, note: "Hậu tố danh từ đọc thanh nhẹ" }
      ]
    },

    // === KHINH THANH: HẬU TỐ SỐ NHIỀU "们" (men) ===
    "我们": {
      rootPy: "wǒ mén",
      spokenPy: "wǒmen",
      type: "Khinh thanh (Hậu tố 们)",
      ruleName: "Quy tắc hậu tố số nhiều 们",
      ruleTheory: "Chữ 们 gốc là thanh 2 (mén), nhưng khi làm hậu tố số nhiều cho đại từ nhân xưng luôn đọc thành thanh nhẹ (wǒmen: chúng tôi).",
      syllables: [
        { char: "我", rootPy: "wǒ", spokenPy: "wǒ", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "们", rootPy: "mén", spokenPy: "men", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Hậu tố số nhiều đọc thanh nhẹ" }
      ]
    },
    "你们": {
      rootPy: "nǐ mén",
      spokenPy: "nǐmen",
      type: "Khinh thanh (Hậu tố 们)",
      ruleName: "Quy tắc hậu tố số nhiều 们",
      ruleTheory: "Chữ 们 khi làm hậu tố số nhiều luôn đọc thành thanh nhẹ (nǐmen: các bạn).",
      syllables: [
        { char: "你", rootPy: "nǐ", spokenPy: "nǐ", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "们", rootPy: "mén", spokenPy: "men", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Hậu tố số nhiều đọc thanh nhẹ" }
      ]
    },
    "他们": {
      rootPy: "tā mén",
      spokenPy: "tāmen",
      type: "Khinh thanh (Hậu tố 们)",
      ruleName: "Quy tắc hậu tố số nhiều 们",
      ruleTheory: "Chữ 们 khi làm hậu tố số nhiều luôn đọc thành thanh nhẹ (tāmen: họ / các anh ấy).",
      syllables: [
        { char: "他", rootPy: "tā", spokenPy: "tā", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "们", rootPy: "mén", spokenPy: "men", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Hậu tố số nhiều đọc thanh nhẹ" }
      ]
    },
    "她们": {
      rootPy: "tā mén",
      spokenPy: "tāmen",
      type: "Khinh thanh (Hậu tố 们)",
      ruleName: "Quy tắc hậu tố số nhiều 们",
      ruleTheory: "Chữ 们 khi làm hậu tố số nhiều luôn đọc thành thanh nhẹ (tāmen: các cô ấy).",
      syllables: [
        { char: "她", rootPy: "tā", spokenPy: "tā", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "们", rootPy: "mén", spokenPy: "men", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Hậu tố số nhiều đọc thanh nhẹ" }
      ]
    },
    "它们": {
      rootPy: "tā mén",
      spokenPy: "tāmen",
      type: "Khinh thanh (Hậu tố 们)",
      ruleName: "Quy tắc hậu tố số nhiều 们",
      ruleTheory: "Chữ 们 khi làm hậu tố số nhiều luôn đọc thành thanh nhẹ (tāmen: chúng nó).",
      syllables: [
        { char: "它", rootPy: "tā", spokenPy: "tā", rootTone: 1, spokenTone: 1, isNeutral: false },
        { char: "们", rootPy: "mén", spokenPy: "men", rootTone: 2, spokenTone: 0, isNeutral: true, note: "Hậu tố số nhiều đọc thanh nhẹ" }
      ]
    },

    // === KHINH THANH: TRỢ TỪ CẤU TRÚC VÀ NGỮ KHÍ ===
    "有的": {
      rootPy: "yǒu de",
      spokenPy: "yǒude",
      type: "Khinh thanh (Trợ từ 的)",
      ruleName: "Quy tắc trợ từ 的",
      ruleTheory: "Chữ 的 là trợ từ kết cấu, luôn nhược hóa đọc thành thanh nhẹ (yǒude: có cái/có người).",
      syllables: [
        { char: "有", rootPy: "yǒu", spokenPy: "yǒu", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "的", rootPy: "de", spokenPy: "de", rootTone: 0, spokenTone: 0, isNeutral: true, note: "Trợ từ đọc thanh nhẹ" }
      ]
    },

    // === BIẾN ĐIỆU CHỮ "不" (bù) ===
    "不是": {
      rootPy: "bù shì",
      spokenPy: "bú shì",
      type: "Biến điệu chữ 不 (bù => bú)",
      ruleName: "Quy tắc biến điệu chữ 不",
      ruleTheory: "Chữ 不 gốc mang thanh 4 (bù). Khi đứng trước từ mang thanh 4 (như 是 shì), chữ 不 bắt buộc đổi đọc thành thanh 2 (bú shì).",
      syllables: [
        { char: "不", rootPy: "bù", spokenPy: "bú", rootTone: 4, spokenTone: 2, isNeutral: false, note: "Đổi thành thanh 2 trước thanh 4" },
        { char: "是", rootPy: "shì", spokenPy: "shì", rootTone: 4, spokenTone: 4, isNeutral: false }
      ]
    },
    "不要": {
      rootPy: "bù yào",
      spokenPy: "bú yào",
      type: "Biến điệu chữ 不 (bù => bú)",
      ruleName: "Quy tắc biến điệu chữ Không (bù => bú)",
      ruleTheory: "Chữ 不 gốc mang thanh 4 (bù). Khi đứng trước âm tiết mang thanh 4 (như 要 yào), chữ 不 đổi đọc thành thanh 2 (bú yào).",
      syllables: [
        { char: "不", rootPy: "bù", spokenPy: "bú", rootTone: 4, spokenTone: 2, isNeutral: false, note: "Đổi thành thanh 2 trước thanh 4" },
        { char: "要", rootPy: "yào", spokenPy: "yào", rootTone: 4, spokenTone: 4, isNeutral: false }
      ]
    },
    "不客气": {
      rootPy: "bù kè qì",
      spokenPy: "bú kèqi",
      type: "Biến điệu chữ 不 & Khinh thanh",
      ruleName: "Quy tắc chữ 不 & Khinh thanh",
      ruleTheory: "Chữ 不 đứng trước thanh 4 (kè) nên đổi đọc thành thanh 2 (bú); chữ 气 ở cuối nhược hóa đọc thành thanh nhẹ (qi). Đọc chuẩn: 'bú kèqi'.",
      syllables: [
        { char: "不", rootPy: "bù", spokenPy: "bú", rootTone: 4, spokenTone: 2, isNeutral: false, note: "Đổi thành thanh 2 trước thanh 4" },
        { char: "客", rootPy: "kè", spokenPy: "kè", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "气", rootPy: "qì", spokenPy: "qi", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Đọc thanh nhẹ" }
      ]
    },
    "对不起": {
      rootPy: "duì bù qǐ",
      spokenPy: "duìbuqǐ",
      type: "Biến điệu chữ 不 (Nhược hóa khinh thanh)",
      ruleName: "Quy tắc chữ 不 kẹp giữa",
      ruleTheory: "Chữ 不 khi kẹp ở giữa trong cụm cố định hoặc câu hỏi chính phản nhược hóa đọc thành thanh nhẹ không nhấn giọng (duìbuqǐ).",
      syllables: [
        { char: "对", rootPy: "duì", spokenPy: "duì", rootTone: 4, spokenTone: 4, isNeutral: false },
        { char: "不", rootPy: "bù", spokenPy: "bu", rootTone: 4, spokenTone: 0, isNeutral: true, note: "Kẹp giữa đọc thanh nhẹ" },
        { char: "起", rootPy: "qǐ", spokenPy: "qǐ", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },

    // === BIẾN ĐIỆU CHỮ "一" (yī) ===
    "一下": {
      rootPy: "yī xià",
      spokenPy: "yí xià",
      type: "Biến điệu chữ 一 (yī => yí)",
      ruleName: "Quy tắc chữ 一 trước thanh 4",
      ruleTheory: "Chữ 一 gốc mang thanh 1 (yī). Khi đứng trước âm tiết mang thanh 4 (xià), chữ 一 đổi đọc thành thanh 2 (yí xià).",
      syllables: [
        { char: "一", rootPy: "yī", spokenPy: "yí", rootTone: 1, spokenTone: 2, isNeutral: false, note: "Đổi thành thanh 2 trước thanh 4" },
        { char: "下", rootPy: "xià", spokenPy: "xià", rootTone: 4, spokenTone: 4, isNeutral: false }
      ]
    },
    "一半": {
      rootPy: "yī bàn",
      spokenPy: "yí bàn",
      type: "Biến điệu chữ 一 (yī => yí)",
      ruleName: "Quy tắc chữ 一 trước thanh 4",
      ruleTheory: "Chữ 一 đứng trước âm tiết mang thanh 4 (bàn), đổi đọc thành thanh 2 (yí bàn).",
      syllables: [
        { char: "一", rootPy: "yī", spokenPy: "yí", rootTone: 1, spokenTone: 2, isNeutral: false, note: "Đổi thành thanh 2 trước thanh 4" },
        { char: "半", rootPy: "bàn", spokenPy: "bàn", rootTone: 4, spokenTone: 4, isNeutral: false }
      ]
    },
    "一些": {
      rootPy: "yī xiē",
      spokenPy: "yì xiē",
      type: "Biến điệu chữ 一 (yī => yì)",
      ruleName: "Quy tắc chữ 一 trước thanh 1, 2, 3",
      ruleTheory: "Chữ 一 đứng trước âm tiết mang thanh 1 (xiē), đổi đọc thành thanh 4 (yì xiē).",
      syllables: [
        { char: "一", rootPy: "yī", spokenPy: "yì", rootTone: 1, spokenTone: 4, isNeutral: false, note: "Đổi thành thanh 4 trước thanh 1" },
        { char: "些", rootPy: "xiē", spokenPy: "xiē", rootTone: 1, spokenTone: 1, isNeutral: false }
      ]
    },
    "一点儿": {
      rootPy: "yī diǎnr",
      spokenPy: "yì diǎnr",
      type: "Biến điệu chữ 一 (yī => yì)",
      ruleName: "Quy tắc chữ 一 trước thanh 1, 2, 3",
      ruleTheory: "Chữ 一 đứng trước âm tiết mang thanh 3 (diǎnr), đổi đọc thành thanh 4 (yì diǎnr).",
      syllables: [
        { char: "一", rootPy: "yī", spokenPy: "yì", rootTone: 1, spokenTone: 4, isNeutral: false, note: "Đổi thành thanh 4 trước thanh 3" },
        { char: "点儿", rootPy: "diǎnr", spokenPy: "diǎnr", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "有（一）点儿": {
      rootPy: "yǒu (yī) diǎnr",
      spokenPy: "yǒu (yì) diǎnr",
      type: "Biến điệu chữ 一 (yī => yì)",
      ruleName: "Quy tắc chữ 一 trước thanh 1, 2, 3",
      ruleTheory: "Chữ 一 đứng trước thanh 3 (diǎnr), đổi đọc thành thanh 4 (yì diǎnr).",
      syllables: [
        { char: "有", rootPy: "yǒu", spokenPy: "yǒu", rootTone: 3, spokenTone: 3, isNeutral: false },
        { char: "一", rootPy: "yī", spokenPy: "yì", rootTone: 1, spokenTone: 4, isNeutral: false },
        { char: "点儿", rootPy: "diǎnr", spokenPy: "diǎnr", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "一起": {
      rootPy: "yī qǐ",
      spokenPy: "yì qǐ",
      type: "Biến điệu chữ 一 (yī => yì)",
      ruleName: "Quy tắc chữ 一 trước thanh 1, 2, 3",
      ruleTheory: "Chữ 一 đứng trước âm tiết mang thanh 3 (qǐ), đổi đọc thành thanh 4 (yì qǐ).",
      syllables: [
        { char: "一", rootPy: "yī", spokenPy: "yì", rootTone: 1, spokenTone: 4, isNeutral: false, note: "Đổi thành thanh 4 trước thanh 3" },
        { char: "起", rootPy: "qǐ", spokenPy: "qǐ", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },

    // === BIẾN ĐIỆU HAI THANH 3 (3 + 3 => 2 + 3) ===
    "你好": {
      rootPy: "nǐ hǎo",
      spokenPy: "ní hǎo",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (nǐ + hǎo). Âm tiết thứ nhất (nǐ) bắt buộc đổi đọc thành thanh 2 (ní), đọc thành 'ní hǎo'. Quy chuẩn quốc tế chữ viết Pinyin vẫn giữ nguyên âm gốc 'nǐ hǎo' nhưng khi phát âm phải đọc thành 'ní hǎo'.",
      syllables: [
        { char: "你", rootPy: "nǐ", spokenPy: "ní", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2 (ní)" },
        { char: "好", rootPy: "hǎo", spokenPy: "hǎo", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "很好": {
      rootPy: "hěn hǎo",
      spokenPy: "hén hǎo",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (hěn + hǎo). Âm tiết thứ nhất (hěn) đổi đọc thành thanh 2 (hén), phát âm thành 'hén hǎo'.",
      syllables: [
        { char: "很", rootPy: "hěn", spokenPy: "hén", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2 (hén)" },
        { char: "好", rootPy: "hǎo", spokenPy: "hǎo", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "可以": {
      rootPy: "kě yǐ",
      spokenPy: "ké yǐ",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (kě + yǐ). Âm tiết thứ nhất (kě) đổi đọc thành thanh 2 (ké), phát âm thành 'ké yǐ'.",
      syllables: [
        { char: "可", rootPy: "kě", spokenPy: "ké", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2 (ké)" },
        { char: "以", rootPy: "yǐ", spokenPy: "yǐ", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "水果": {
      rootPy: "shuǐ guǒ",
      spokenPy: "shuí guǒ",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (shuǐ + guǒ). Âm tiết thứ nhất (shuǐ) đổi đọc thành thanh 2 (shuí), phát âm thành 'shuí guǒ'.",
      syllables: [
        { char: "水", rootPy: "shuǐ", spokenPy: "shuí", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2 (shuí)" },
        { char: "果", rootPy: "guǒ", spokenPy: "guǒ", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "手表": {
      rootPy: "shǒu biǎo",
      spokenPy: "shóu biǎo",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (shǒu + biǎo). Âm tiết thứ nhất đổi đọc thành thanh 2 (shóu biǎo).",
      syllables: [
        { char: "手", rootPy: "shǒu", spokenPy: "shóu", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2" },
        { char: "表", rootPy: "biǎo", spokenPy: "biǎo", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "洗澡": {
      rootPy: "xǐ zǎo",
      spokenPy: "xí zǎo",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (xǐ + zǎo). Âm tiết thứ nhất đổi đọc thành thanh 2 (xí zǎo).",
      syllables: [
        { char: "洗", rootPy: "xǐ", spokenPy: "xí", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2" },
        { char: "澡", rootPy: "zǎo", spokenPy: "zǎo", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "打扫": {
      rootPy: "dǎ sǎo",
      spokenPy: "dá sǎo",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (dǎ + sǎo). Âm tiết thứ nhất đổi đọc thành thanh 2 (dá sǎo).",
      syllables: [
        { char: "打", rootPy: "dǎ", spokenPy: "dá", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2" },
        { char: "扫", rootPy: "sǎo", spokenPy: "sǎo", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    },
    "雨伞": {
      rootPy: "yǔ sǎn",
      spokenPy: "yú sǎn",
      type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
      ruleName: "Quy tắc 2 thanh 3",
      ruleTheory: "Gồm hai thanh 3 đi liền nhau (yǔ + sǎn). Âm tiết thứ nhất đổi đọc thành thanh 2 (yú sǎn).",
      syllables: [
        { char: "雨", rootPy: "yǔ", spokenPy: "yú", rootTone: 3, spokenTone: 2, isNeutral: false, note: "Biến điệu thành thanh 2" },
        { char: "伞", rootPy: "sǎn", spokenPy: "sǎn", rootTone: 3, spokenTone: 3, isNeutral: false }
      ]
    }
  };

  /**
   * Phân tích động quy tắc biến điệu hoặc khinh thanh cho bất kỳ từ/câu Hán tự nào
   * @param {string} hanzi Chuỗi Hán tự
   * @param {string} pinyin Phiên âm Pinyin kèm theo (nếu có)
   * @returns {object|null} Thông tin biến điệu chi tiết
   */
  function getToneSandhiInfo(hanzi, pinyin) {
    if (!hanzi) return null;
    const cleanHz = hanzi.replace(/[^\u4e00-\u9fa5]/g, "");
    if (!cleanHz) return null;

    // 1. Kiểm tra từ điển cố định trước
    if (TONE_SANDHI_DB[cleanHz]) {
      const entry = TONE_SANDHI_DB[cleanHz];
      return {
        hasSandhi: true,
        hanzi: cleanHz,
        rootPy: entry.rootPy,
        spokenPy: entry.spokenPy,
        type: entry.type,
        ruleName: entry.ruleName,
        ruleTheory: entry.ruleTheory,
        syllables: entry.syllables,
        formattedHtml: `<b>Gốc:</b> <code class="text-amber-400">${entry.rootPy}</code> ➔ <b>Biến điệu:</b> <code class="text-cyan-400">${entry.spokenPy}</code> <span class="text-amber-200/90 font-normal">(${entry.ruleTheory})</span>`
      };
    }

    // 2. Tự động kiểm tra động cho từ láy (AA) như 叔叔, 奶奶, 爷爷...
    if (cleanHz.length === 2 && cleanHz[0] === cleanHz[1]) {
      const char = cleanHz[0];
      const dictList = window.hanziToPinyinList ? window.hanziToPinyinList(char) : [];
      const rootCharPy = (dictList[0] && dictList[0].pinyin) || "";
      const parsed = window.parsePinyinSyllable ? window.parsePinyinSyllable(rootCharPy) : null;
      const neutralPy = parsed ? parsed.raw : rootCharPy.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/gi, (m) => {
        const map = {'ā':'a','á':'a','ǎ':'a','à':'a','ē':'e','é':'e','ě':'e','è':'e','ī':'i','í':'i','ǐ':'i','ì':'i','ō':'o','ó':'o','ǒ':'o','ò':'o','ū':'u','ú':'u','ǔ':'u','ù':'u','ǖ':'ü','ǘ':'ü','ǚ':'ü','ǜ':'ü'};
        return map[m] || m;
      });

      const rootPy = `${rootCharPy} ${rootCharPy}`.trim();
      const spokenPy = `${rootCharPy}${neutralPy}`;
      const theory = `Quy tắc khinh thanh (từ láy): Âm tiết thứ 2 trong từ láy lặp lại đọc nhược hóa thành thanh nhẹ (ngắn, nhẹ, không nhấn giọng và không đánh dấu thanh điệu).`;

      return {
        hasSandhi: true,
        hanzi: cleanHz,
        rootPy: rootPy,
        spokenPy: spokenPy,
        type: "Khinh thanh (Từ láy)",
        ruleName: "Quy tắc từ láy lặp",
        ruleTheory: theory,
        syllables: [
          { char: char, rootPy: rootCharPy, spokenPy: rootCharPy, rootTone: parsed ? parsed.tone : 0, spokenTone: parsed ? parsed.tone : 0, isNeutral: false },
          { char: char, rootPy: rootCharPy, spokenPy: neutralPy, rootTone: parsed ? parsed.tone : 0, spokenTone: 0, isNeutral: true, note: "Nhược hóa thành thanh nhẹ" }
        ],
        formattedHtml: `<b>Gốc:</b> <code class="text-amber-400">${rootPy}</code> ➔ <b>Biến điệu:</b> <code class="text-cyan-400">${spokenPy}</code> <span class="text-amber-200/90 font-normal">(${theory})</span>`
      };
    }

    // 3. Tự động kiểm tra động biến điệu 2 thanh 3 (3 + 3 => 2 + 3)
    if (cleanHz.length === 2) {
      const chars = Array.from(cleanHz);
      const dict1 = window.hanziToPinyinList ? window.hanziToPinyinList(chars[0]) : [];
      const dict2 = window.hanziToPinyinList ? window.hanziToPinyinList(chars[1]) : [];
      const py1 = (dict1[0] && dict1[0].pinyin) || "";
      const py2 = (dict2[0] && dict2[0].pinyin) || "";
      const parse1 = window.parsePinyinSyllable ? window.parsePinyinSyllable(py1) : null;
      const parse2 = window.parsePinyinSyllable ? window.parsePinyinSyllable(py2) : null;

      if (parse1 && parse2 && parse1.tone === 3 && parse2.tone === 3) {
        // Đổi thanh 3 của chữ 1 thành thanh 2
        const tone2Map = {'ǎ':'á','ě':'é','ǐ':'í','ǒ':'ó','ǔ':'ú','ǚ':'ǘ'};
        const changedPy1 = py1.replace(/[ǎěǐǒǔǚ]/g, m => tone2Map[m] || m);
        const rootPy = `${py1} ${py2}`;
        const spokenPy = `${changedPy1} ${py2}`;
        const theory = `Quy tắc biến điệu 2 thanh 3: Khi hai âm tiết thanh 3 đi liền nhau, chữ đầu '${chars[0]}' đổi đọc thành thanh 2 (${changedPy1}). Chữ viết phiên âm vẫn ghi âm gốc (${rootPy}) nhưng khi nói phải đọc là (${spokenPy}).`;

        return {
          hasSandhi: true,
          hanzi: cleanHz,
          rootPy: rootPy,
          spokenPy: spokenPy,
          type: "Biến điệu 2 thanh 3 (3 + 3 => 2 + 3)",
          ruleName: "Quy tắc 2 thanh 3",
          ruleTheory: theory,
          syllables: [
            { char: chars[0], rootPy: py1, spokenPy: changedPy1, rootTone: 3, spokenTone: 2, isNeutral: false, note: `Biến điệu thành thanh 2 (${changedPy1})` },
            { char: chars[1], rootPy: py2, spokenPy: py2, rootTone: 3, spokenTone: 3, isNeutral: false }
          ],
          formattedHtml: `<b>Gốc:</b> <code class="text-amber-400">${rootPy}</code> ➔ <b>Biến điệu:</b> <code class="text-cyan-400">${spokenPy}</code> <span class="text-amber-200/90 font-normal">(${theory})</span>`
        };
      }
    }

    return null;
  }

  // Xuất ra phạm vi toàn cục window
  window.TONE_SANDHI_DB = TONE_SANDHI_DB;
  window.getToneSandhiInfo = getToneSandhiInfo;

})();
