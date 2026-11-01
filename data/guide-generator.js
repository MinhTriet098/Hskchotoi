// data/guide-generator.js - Hàm sinh dữ liệu hướng dẫn phát âm cho UI
// Tích hợp chuyên sâu Tone Sandhi & Khinh thanh chuẩn xác (Gốc => Biến điệu kèm lý thuyết)

window.getPronunciationGuide = function(hanzi, pinyin) {
  if (!pinyin && !hanzi) return null;

  // Lọc bỏ dấu câu tiếng Trung và ký tự đặc biệt (chỉ giữ lại chữ Hán / chữ cái / số)
  const cleanHanzi = (hanzi || "").replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
  const chars = Array.from(cleanHanzi);
  if (chars.length === 0) return null;

  // Lấy thông tin biến điệu hoặc khinh thanh từ engine
  const sandhiInfo = (typeof window.getToneSandhiInfo === 'function') 
    ? window.getToneSandhiInfo(cleanHanzi, pinyin) 
    : null;

  // Lọc pinyin chỉ giữ các âm tiết và dấu thanh
  const cleanPinyin = (pinyin || "").replace(/[^\w\sāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/gi, " ").trim();

  let syllables = cleanPinyin.toLowerCase().split(/\s+/).filter(Boolean);

  // Nếu có thông tin biến điệu trong DB, ưu tiên dùng âm tiết chuẩn đã bóc tách
  if (sandhiInfo && sandhiInfo.syllables && sandhiInfo.syllables.length === chars.length) {
    syllables = sandhiInfo.syllables.map(s => s.spokenPy);
  } else if (syllables.length !== chars.length) {
    const dictList = window.hanziToPinyinList ? window.hanziToPinyinList(cleanHanzi) : [];
    syllables = chars.map((c, i) => (dictList[i] && dictList[i].pinyin) || syllables[i] || "");
  }

  const syllablesDetail = chars.map((ch, idx) => {
    const syl = syllables[idx] || "";
    const sandhiSyl = (sandhiInfo && sandhiInfo.syllables && sandhiInfo.syllables[idx]) ? sandhiInfo.syllables[idx] : null;

    const parsed = (window.parsePinyinSyllable ? window.parsePinyinSyllable(syl) : null) || {
      original: syl,
      raw: syl.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/gi, ""),
      initial: "",
      finalPart: "",
      tone: 0
    };

    const initialGuide = (parsed.initial && window.CHINESE_PHONETICS_DB && window.CHINESE_PHONETICS_DB.initials) 
      ? window.CHINESE_PHONETICS_DB.initials[parsed.initial] 
      : null;

    const finalGuide = (parsed.finalPart && window.CHINESE_FINALS_DB) 
      ? window.CHINESE_FINALS_DB[parsed.finalPart] 
      : null;

    let toneGuide = null;
    let tongueTip = "";

    // Xử lý đặc thù nếu âm tiết này là KHINH THANH (thanh nhẹ)
    if (sandhiSyl && sandhiSyl.isNeutral) {
      toneGuide = {
        name: `Thanh nhẹ (Gốc: Thanh ${sandhiSyl.rootTone} ${sandhiSyl.rootPy})`,
        pitch: "0",
        desc: "Đọc cực ngắn, nhẹ, thả lỏng vòm miệng, không nhấn giọng và không mang dấu thanh điệu."
      };
      tongueTip = "🪶 <b>Khinh thanh (Thanh nhẹ):</b> Đọc lướt cực ngắn và nhẹ, hạ thấp hơi, không nhấn trọng âm!";
    } 
    // Xử lý đặc thù nếu âm tiết này có BIẾN ĐIỆU (ví dụ thanh 3 => thanh 2)
    else if (sandhiSyl && sandhiSyl.rootTone !== sandhiSyl.spokenTone) {
      toneGuide = {
        name: `Thanh ${sandhiSyl.spokenTone} (Gốc: Thanh ${sandhiSyl.rootTone} ${sandhiSyl.rootPy})`,
        pitch: "35",
        desc: `Biến điệu thành thanh ${sandhiSyl.spokenTone}: Giọng vút nhẹ từ dưới lên như dấu sắc tiếng Việt.`
      };
      tongueTip = `📈 <b>Biến điệu thanh ${sandhiSyl.spokenTone}:</b> Đổi đọc thành <b>${sandhiSyl.spokenPy}</b>, giọng lướt mượt lên vòm họng!`;
    }
    // Thanh điệu thông thường
    else {
      toneGuide = (window.CHINESE_PHONETICS_DB && window.CHINESE_PHONETICS_DB.tones) 
        ? (window.CHINESE_PHONETICS_DB.tones[parsed.tone] || window.CHINESE_PHONETICS_DB.tones[0]) 
        : null;

      // Tạo mẹo đặt lưỡi trực quan
      if (['zh', 'ch', 'sh', 'r'].includes(parsed.initial)) {
        tongueTip = "🌀 <b>Uốn lưỡi:</b> Đầu lưỡi cong lên chạm nhẹ vòm họng ngạc cứng trên!";
      } else if (['z', 'c', 's'].includes(parsed.initial)) {
        tongueTip = "📏 <b>Lưỡi thẳng:</b> Đầu lưỡi áp thẳng lưng răng cửa trên/dưới, ép hơi xì ra!";
      } else if (['j', 'q', 'x'].includes(parsed.initial)) {
        tongueTip = "😁 <b>Mặt lưỡi bè:</b> Mặt lưỡi ép sát vòm trên, miệng bẹt khóe môi như cười!";
      } else if (['p', 't', 'k', 'q', 'ch', 'c'].includes(parsed.initial)) {
        tongueTip = "💨 <b>Bật hơi mạnh:</b> Nén khí rồi phóng luồng hơi mạnh ra ngoài!";
      } else if (['b', 'd', 'g', 'j', 'zh', 'z'].includes(parsed.initial)) {
        tongueTip = "🔇 <b>Không bật hơi:</b> Giữ âm chắc gọn, không xì luồng khí mạnh!";
      } else {
        tongueTip = "👄 <b>Khẩu hình tự nhiên:</b> Thả lỏng vòm miệng, điều tiết hơi từ cơ bụng.";
      }
    }

    return {
      char: ch,
      pinyin: syl,
      rootPinyin: sandhiSyl ? sandhiSyl.rootPy : syl,
      initial: parsed.initial || '(không có)',
      initialGuide: initialGuide ? initialGuide.tongue : 'Nguyên âm tự do, mở khoang miệng tự nhiên.',
      initialTip: initialGuide ? initialGuide.fixTip : '',
      finalPart: parsed.finalPart,
      finalName: finalGuide ? finalGuide.name : parsed.finalPart,
      finalGuide: finalGuide ? finalGuide.tongue : 'Phát âm theo nguyên âm tự nhiên.',
      finalTip: finalGuide ? finalGuide.fixTip : '',
      toneNum: parsed.tone,
      toneGuide: toneGuide,
      tongueTip: tongueTip,
      isNeutral: sandhiSyl ? sandhiSyl.isNeutral : false,
      sandhiNote: sandhiSyl ? sandhiSyl.note : ''
    };
  });

  // Tạo lý thuyết biến điệu chuẩn format người dùng yêu cầu:
  // "Gốc: [âm gốc] => Biến điệu: [âm biến điệu] (Mở ngoặc lý thuyết)"
  let toneSandhiRule = "";
  if (sandhiInfo && sandhiInfo.hasSandhi) {
    toneSandhiRule = `
      <div class="space-y-1">
        <div class="flex items-center gap-1.5 font-bold text-amber-300">
          <span>💡</span> <span>QUY TẮC ${sandhiInfo.type.toUpperCase()}:</span>
        </div>
        <div class="text-xs text-white">
          Gốc: <code class="text-amber-400 font-mono font-bold">${sandhiInfo.rootPy}</code> ➔ Biến điệu/Đọc nhẹ: <code class="text-cyan-300 font-mono font-bold">${sandhiInfo.spokenPy}</code>
        </div>
        <div class="text-slate-300 text-[11px] leading-relaxed pt-0.5 italic">
          (${sandhiInfo.ruleTheory})
        </div>
      </div>
    `;
  } else if (syllablesDetail.length >= 2) {
    if (syllablesDetail[0].toneNum === 3 && syllablesDetail[1].toneNum === 3) {
      toneSandhiRule = `
        <div class="space-y-1">
          <div class="flex items-center gap-1.5 font-bold text-amber-300">
            <span>💡</span> <span>QUY TẮC BIẾN ĐIỆU 2 THANH 3:</span>
          </div>
          <div class="text-xs text-white">
            Gốc: <code class="text-amber-400 font-mono font-bold">${syllables[0]} ${syllables[1]}</code> ➔ Biến điệu: <code class="text-cyan-300 font-mono font-bold">${syllables[0].replace(/[ǎěǐǒǔǚ]/g, 'á')} ${syllables[1]}</code>
          </div>
          <div class="text-slate-300 text-[11px] leading-relaxed pt-0.5 italic">
            (Khi hai thanh 3 đi liền nhau, chữ đầu '${chars[0]}' đổi đọc thành thanh 2 dấu sắc nhẹ).
          </div>
        </div>
      `;
    }
  }

  return {
    hanzi: cleanHanzi,
    pinyin: cleanPinyin,
    sandhiInfo: sandhiInfo,
    syllables: syllablesDetail,
    toneSandhiRule: toneSandhiRule
  };
};
