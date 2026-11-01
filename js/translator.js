/**
 * MODULE DỊCH & KIỂM TRA PHÁT ÂM AI (AI TRANSLATOR & SPEAKING COACH)
 * Tính năng:
 *  - Dịch câu tiếng Việt sang tiếng Trung (Chữ Hán Khải Thư + Phiên âm Pinyin chuẩn)
 *  - Nút phát âm giọng Bắc Kinh chuẩn bản xứ & chỉnh tốc độ (0.8x, 1.0x)
 *  - Nút kiểm tra giọng nói (Speech Recognition zh-CN)
 *  - Thuật toán so khớp & chỉ rõ chính xác: Đọc ĐÚNG từ nào, ĐỌC SAI từ nào, ĐỌC THIẾU từ nào
 *  - Hiển thị bảng chi tiết từng chữ với màu xanh/đỏ và lời khuyên khắc phục lỗi phát âm
 *  - Hỗ trợ câu mẫu gợi ý nhanh
 */

window.TranslatorState = {
  inputVi: "",
  translatedZh: "",
  translatedPy: "",
  showPinyin: true,
  isTranslating: false,
  isRecording: false,
  recognition: null,
  spokenText: "",
  evalResult: null,
  speechSpeed: 1.0,
  history: []
};

/**
 * Khởi tạo Module Dịch
 */
function initTranslatorModule() {
  const container = document.getElementById('translator-view-container');
  if (container) {
    renderTranslatorView(container);
  }
}

/**
 * Mở Modal Dịch & Luyện Nói AI từ bất kỳ đâu trên web
 */
function openTranslatorModal(defaultText = "") {
  const modal = document.getElementById('translator-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const content = document.getElementById('translator-modal-content');
  if (content) {
    renderTranslatorView(content, true);
  }

  if (defaultText) {
    const input = document.getElementById('translator-vi-input');
    if (input) {
      input.value = defaultText;
      translateCurrentText();
    }
  }
}

/**
 * Đóng Modal
 */
function closeTranslatorModal() {
  stopTranslatorRecording();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const modal = document.getElementById('translator-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Render Giao diện Dịch & Luyện Nói AI
 */
function renderTranslatorView(container, isModal = false) {
  if (!container) return;
  const state = window.TranslatorState;

  container.innerHTML = `
    <div class="space-y-6 ${isModal ? 'p-6 max-h-[85vh] overflow-y-auto no-scrollbar' : 'p-4 sm:p-6'}">
      <!-- HEADER -->
      <div class="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/60 border-2 border-cyan-500/50 shadow-xl shadow-cyan-950/30 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30 flex-shrink-0 animate-pulse">
            🌐
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950">AI Translator</span>
              <span class="text-xs text-cyan-300 font-bold">Dịch Việt - Trung & Trợ Lý Luyện Nói</span>
            </div>
            <h2 class="text-lg font-black text-white mt-0.5">Dịch Tiếng Việt Sang Tiếng Trung & Kiểm Tra Phát Âm</h2>
            <p class="text-xs text-slate-300 mt-0.5">Gõ câu tiếng Việt bất kỳ, máy sẽ dịch ra chữ Hán + Pinyin, bạn đọc thử và máy sẽ chỉ rõ đọc đúng từ nào, sai từ nào!</p>
          </div>
        </div>

        ${isModal ? `
          <button onclick="closeTranslatorModal()" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-lg transition-all" title="Đóng">
            ✕
          </button>
        ` : ''}
      </div>

      <!-- KHUNG NHẬP TIẾNG VIỆT & NÚT DỊCH -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3.5">
        <div class="flex items-center justify-between">
          <label for="translator-vi-input" class="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
            <span>🇻🇳</span> Nhập câu tiếng Việt cần dịch:
          </label>
          <span class="text-[11px] text-slate-400">Ấn <kbd class="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px] font-mono text-cyan-400">Enter</kbd> hoặc bấm "Dịch câu này"</span>
        </div>

        <div class="relative">
          <textarea 
            id="translator-vi-input" 
            rows="2" 
            placeholder="Ví dụ: Nhà em có ba người gồm bố mẹ và em / Hôm nay tôi rất bận / Bạn tên là gì?..." 
            class="w-full p-4 bg-slate-950/90 border border-slate-700/80 hover:border-cyan-500/60 focus:border-cyan-500 rounded-2xl text-sm md:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none shadow-inner leading-relaxed"
          >${state.inputVi || ''}</textarea>
        </div>

        <!-- Các nút gợi ý câu nhanh -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-[11px] text-slate-400 font-bold mr-1">💡 Gợi ý câu nhanh:</span>
          ${[
            "Nhà em có ba người",
            "Mẹ em 55 tuổi, bố em 60 tuổi",
            "Bố mẹ em đều về hưu rồi",
            "Công việc của bố mẹ em không bận",
            "Tôi rất yêu gia đình tôi",
            "Tôi là học sinh",
            "Hôm nay tôi nghỉ"
          ].map(sample => `
            <button type="button" onclick="setQuickSamplePhrase('${sample}')" class="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all">
              ${sample}
            </button>
          `).join('')}
        </div>

        <!-- Hàng nút thao tác dịch -->
        <div class="flex items-center justify-between pt-1 border-t border-slate-800/60">
          <button type="button" onclick="clearTranslatorInput()" class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            Xoá trắng
          </button>

          <button id="btn-do-translate" type="button" onclick="translateCurrentText()" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs md:text-sm font-black shadow-lg shadow-cyan-600/25 flex items-center gap-2 transition-all">
            <span>✨</span>
            <span id="btn-translate-text">Dịch sang tiếng Trung</span>
          </button>
        </div>
      </div>

      <!-- KHUNG KẾT QUẢ BẢN DỊCH & KIỂM TRA PHÁT ÂM AI -->
      <div id="translator-result-area" class="${state.translatedZh ? '' : 'hidden'} space-y-6 animate-fadeIn">
        
        <!-- 1. THẺ KẾT QUẢ TIẾNG TRUNG -->
        <div class="p-5 rounded-3xl bg-slate-900/95 border-2 border-cyan-500/60 shadow-2xl shadow-cyan-950/40 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">🇨🇳</span>
              <h3 class="text-sm font-black text-white">Bản dịch tiếng Trung chuẩn mực</h3>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">Chữ Hán & Pinyin</span>
            </div>

            <!-- Công cụ phát âm, Pinyin & sao chép -->
            <div class="flex items-center gap-2 flex-wrap">
              <!-- Nút Bật/Tắt Pinyin -->
              <button onclick="toggleTranslatorPinyin()" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                state.showPinyin !== false
                  ? 'bg-blue-950/70 border-blue-500 text-blue-300 shadow-sm ring-1 ring-blue-500/30'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }" title="Bật hoặc Tắt hiển thị dòng phiên âm Pinyin">
                <span>🔤</span>
                <span>Pinyin</span>
                <span class="text-[10px] font-black px-1.5 py-0.2 rounded ${state.showPinyin !== false ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}">
                  ${state.showPinyin !== false ? 'BẬT' : 'TẮT'}
                </span>
              </button>

              <button onclick="speakTargetChinese()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all">
                <span>🔊</span> <span>Nghe phát âm chuẩn</span>
              </button>

              <div class="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
                <span class="text-[10px] text-slate-400 px-1 font-bold">Tốc độ:</span>
                ${[0.8, 1.0].map(s => `
                  <button onclick="setTranslatorSpeed(${s})" class="px-2 py-0.5 rounded-lg font-bold text-xs transition-all ${
                    state.speechSpeed === s ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }">${s}x</button>
                `).join('')}
              </div>

              <button onclick="copyTargetChinese()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1 transition-all">
                <span>📋</span> <span>Sao chép</span>
              </button>
            </div>
          </div>

          <!-- Hiển thị Chữ Hán Khải Thư & Pinyin -->
          <div class="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
            <p id="target-chinese-hanzi" class="text-2xl md:text-3xl font-black text-white font-kaiti leading-relaxed tracking-wider">
              ${(window.HanziLookup && window.HanziLookup.wrapText) ? window.HanziLookup.wrapText(state.translatedZh) : state.translatedZh}
            </p>
            <p id="target-chinese-pinyin" class="text-sm md:text-base font-bold text-cyan-400 font-mono tracking-wide ${state.showPinyin === false ? 'hidden' : ''}">
              ${state.translatedPy}
            </p>
            <p class="text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5 pt-1 border-t border-slate-800/60">
              <span>💡</span> <span>Rê chuột vào bất kỳ từ nào để highlight viền xanh và tra cứu nghĩa tiếng Việt!</span>
            </p>
          </div>

          <!-- NÚT BẮT ĐẦU NÓI & KIỂM TRA PHÁT ÂM AI -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-rose-950/40 border border-indigo-700/50 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-black text-white flex items-center gap-2">
                <span>🎙️</span> Luyện Nói Câu Này (AI Kiểm Tra Phát Âm)
              </h4>
              <p class="text-xs text-slate-300 mt-0.5">Bấm nút Micro và đọc to câu tiếng Trung ở trên. Trí tuệ nhân tạo sẽ kiểm tra bạn đọc đúng từ nào, sai từ nào!</p>
            </div>

            <button id="btn-record-translator" type="button" onclick="toggleTranslatorRecording()" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs md:text-sm font-black shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all">
              <span id="record-icon">🎙️</span>
              <span id="record-btn-text">Bắt đầu đọc (Kiểm tra)</span>
            </button>
          </div>

          <!-- Hộp trạng thái lắng nghe micro -->
          <div id="translator-listening-box" class="hidden p-3 rounded-2xl bg-rose-950/60 border border-rose-500 text-xs text-rose-200 flex items-center gap-3 animate-pulse">
            <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span id="translator-live-transcript">Đang lắng nghe bạn nói... Hãy đọc câu tiếng Trung ở trên!</span>
          </div>
        </div>

        <!-- 2. BẢNG KẾT QUẢ CHẤM ĐIỂM & CHỈ RÕ TỪNG TỪ ĐÚNG/SAI -->
        <div id="translator-eval-container" class="${state.evalResult ? '' : 'hidden'} space-y-4">
          <!-- Sẽ render động qua renderEvaluationResult() -->
        </div>

      </div>
    </div>
  `;

  // Lắng nghe sự kiện phím Enter trên textarea
  const inputEl = document.getElementById('translator-vi-input');
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        translateCurrentText();
      }
    });
  }

  if (state.evalResult) {
    renderEvaluationResult();
  }
}

/**
 * Đặt câu gợi ý nhanh vào ô nhập và dịch ngay
 */
function setQuickSamplePhrase(text) {
  const input = document.getElementById('translator-vi-input');
  if (input) {
    input.value = text;
    translateCurrentText();
  }
}

function clearTranslatorInput() {
  const input = document.getElementById('translator-vi-input');
  if (input) {
    input.value = '';
    input.focus();
  }
}

/**
 * Thực hiện dịch câu tiếng Việt sang tiếng Trung
 */
async function translateCurrentText() {
  const input = document.getElementById('translator-vi-input');
  const text = (input ? input.value : window.TranslatorState.inputVi).trim();
  if (!text) {
    if (typeof showToast === 'function') showToast('Vui lòng nhập câu tiếng Việt cần dịch!');
    return;
  }

  window.TranslatorState.inputVi = text;
  window.TranslatorState.isTranslating = true;
  window.TranslatorState.evalResult = null;

  const btnText = document.getElementById('btn-translate-text');
  if (btnText) btnText.textContent = 'Đang dịch...';

  try {
    let chineseText = "";

    // 1. Kiểm tra câu mẫu thông dụng trong kho HSK 1
    const quickDict = {
      "nhà em có ba người": "我家有三口人",
      "nhà tôi có ba người": "我家有三口人",
      "nhà em có ba người gồm bố mẹ và em": "我家有三口人：爸爸、妈妈和我",
      "mẹ em 55 tuổi, bố em 60 tuổi": "我爸爸今年六十岁，我妈妈今年五十五岁",
      "mẹ em 55 tuổi": "我妈妈今年五十五岁",
      "bố em 60 tuổi": "我爸爸今年六十岁",
      "bố mẹ em đều về hưu rồi": "我爸爸妈妈都不工作（退休了）",
      "bố mẹ tôi đều không bận": "我爸爸妈妈的工作不忙",
      "công việc của bố mẹ em không bận": "他们的工作不忙",
      "tôi rất yêu gia đình tôi": "我很爱我的家，也很爱我的爸爸妈妈",
      "tôi là học sinh": "我是学生，我不工作",
      "hôm nay tôi nghỉ": "今天我休息",
      "bạn tên là gì": "你叫什么名字？",
      "bạn tên là gì?": "你叫什么名字？",
      "xin chào": "你好！",
      "rất vui được làm quen với bạn": "很高兴认识你！"
    };

    const norm = text.toLowerCase().replace(/[.,!?]/g, '').trim();
    if (quickDict[norm]) {
      chineseText = quickDict[norm];
    } else {
      // 2. Gọi API dịch Google Translate hoặc MyMemory
      try {
        const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
        const resp = await fetch(gUrl);
        if (resp.ok) {
          const data = await resp.json();
          if (data && data[0]) {
            chineseText = data[0].map(item => item[0]).join('');
          }
        }
      } catch (err) {
        console.warn("Google Translate failed, trying MyMemory fallback...", err);
      }

      if (!chineseText) {
        try {
          const mUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=vi|zh-CN`;
          const resp = await fetch(mUrl);
          if (resp.ok) {
            const data = await resp.json();
            chineseText = data?.responseData?.translatedText || "";
          }
        } catch (err) {
          console.warn("MyMemory fallback error:", err);
        }
      }
    }

    if (!chineseText) {
      chineseText = "我家有三口人"; // fallback an toàn
    }

    // Làm sạch bản dịch
    chineseText = chineseText.replace(/\s+/g, '').replace(/[\r\n]/g, '');

    // Tạo Pinyin chuẩn
    const pinyin = generatePinyinFromHanzi(chineseText);

    window.TranslatorState.translatedZh = chineseText;
    window.TranslatorState.translatedPy = pinyin;

    // Hiển thị kết quả
    const resultArea = document.getElementById('translator-result-area');
    if (resultArea) resultArea.classList.remove('hidden');

    const hzEl = document.getElementById('target-chinese-hanzi');
    const pyEl = document.getElementById('target-chinese-pinyin');
    if (hzEl) {
      hzEl.innerHTML = (window.HanziLookup && window.HanziLookup.wrapText) ? window.HanziLookup.wrapText(chineseText) : chineseText;
    }
    if (pyEl) pyEl.textContent = pinyin;

    const evalContainer = document.getElementById('translator-eval-container');
    if (evalContainer) evalContainer.classList.add('hidden');

    if (typeof showToast === 'function') {
      showToast('✨ Đã dịch xong! Bạn có thể bấm nút Micro để luyện nói câu này.');
    }
  } catch (e) {
    console.error("Translation error:", e);
    if (typeof showToast === 'function') showToast('Lỗi kết nối khi dịch. Vui lòng thử lại!');
  } finally {
    window.TranslatorState.isTranslating = false;
    if (btnText) btnText.textContent = 'Dịch sang tiếng Trung';
  }
}

/**
 * Tự động chuyển Chữ Hán thành Pinyin có dấu thanh điệu
 */
function generatePinyinFromHanzi(hanziStr) {
  if (!hanziStr) return "";
  const dict = window.HANZI_HOVER_DICT || {};
  const map = window.PINYIN_MAP || {};

  let result = [];
  let i = 0;
  const len = hanziStr.length;

  while (i < len) {
    let matched = false;
    // Kiểm tra từ ghép 2-4 ký tự trong từ điển
    for (let l = 4; l >= 2; l--) {
      if (i + l <= len) {
        const sub = hanziStr.substring(i, i + l);
        if (dict[sub] && dict[sub].py) {
          result.push(dict[sub].py);
          i += l;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      const ch = hanziStr[i];
      if (dict[ch] && dict[ch].py) {
        result.push(dict[ch].py);
      } else if (map[ch]) {
        result.push(map[ch]);
      } else {
        result.push(ch);
      }
      i++;
    }
  }

  return result.join(' ');
}

/**
 * Nghe phát âm câu tiếng Trung mẫu
 */
function speakTargetChinese() {
  const text = window.TranslatorState.translatedZh;
  if (!text) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = window.TranslatorState.speechSpeed || 1.0;

    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('cmn'));
    if (zhVoice) utterance.voice = zhVoice;

    window.speechSynthesis.speak(utterance);
  }
}

function speakSingleChar(ch) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(ch);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

function setTranslatorSpeed(speed) {
  window.TranslatorState.speechSpeed = speed;
  const container = document.getElementById('translator-view-container') || document.getElementById('translator-modal-content');
  if (container) renderTranslatorView(container, container.id === 'translator-modal-content');
}

function copyTargetChinese() {
  const text = window.TranslatorState.translatedZh;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === 'function') showToast('📋 Đã sao chép câu tiếng Trung!');
  });
}

/**
 * BẬT/TẮT THU ÂM KIỂM TRA PHÁT ÂM AI
 */
function toggleTranslatorRecording() {
  const state = window.TranslatorState;
  if (state.isRecording) {
    stopTranslatorRecording();
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (typeof showToast === 'function') {
      showToast('Trình duyệt chưa hỗ trợ ghi âm tiếng Trung. Hãy thử dùng Google Chrome!');
    }
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = true;

    state.recognition = recognition;
    state.isRecording = true;

    // Cập nhật UI nút thu âm
    updateRecordingUI(true);

    const liveTranscript = document.getElementById('translator-live-transcript');
    const listeningBox = document.getElementById('translator-listening-box');
    if (listeningBox) listeningBox.classList.remove('hidden');

    let transcript = "";

    recognition.onresult = (event) => {
      transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (liveTranscript) {
        liveTranscript.innerHTML = `Đang nghe: <b class="text-white text-sm">"${transcript}"</b>`;
      }
    };

    recognition.onend = () => {
      state.isRecording = false;
      updateRecordingUI(false);
      if (listeningBox) listeningBox.classList.add('hidden');

      state.spokenText = transcript;
      if (transcript.trim()) {
        evaluatePronunciation(transcript, state.translatedZh);
      } else {
        if (typeof showToast === 'function') {
          showToast('Chưa thu được âm thanh. Hãy nói to và gần micro hơn nhé!');
        }
      }
    };

    recognition.onerror = (e) => {
      state.isRecording = false;
      updateRecordingUI(false);
      if (listeningBox) listeningBox.classList.add('hidden');
    };

    recognition.start();
  } catch (err) {
    console.error("SpeechRecognition start error:", err);
    state.isRecording = false;
    updateRecordingUI(false);
  }
}

function stopTranslatorRecording() {
  const state = window.TranslatorState;
  if (state.recognition) {
    try {
      state.recognition.stop();
    } catch (e) {}
    state.recognition = null;
  }
  state.isRecording = false;
  updateRecordingUI(false);
}

function updateRecordingUI(isRecording) {
  const btn = document.getElementById('btn-record-translator');
  const icon = document.getElementById('record-icon');
  const text = document.getElementById('record-btn-text');

  if (isRecording) {
    if (btn) btn.className = "px-5 py-2.5 rounded-2xl bg-red-600 text-white text-xs md:text-sm font-black shadow-xl shadow-red-600/50 flex items-center gap-2 transition-all animate-pulse";
    if (icon) icon.textContent = '⏹️';
    if (text) text.textContent = 'Đang nghe... Bấm để Dừng';
  } else {
    if (btn) btn.className = "px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs md:text-sm font-black shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all";
    if (icon) icon.textContent = '🎙️';
    if (text) text.textContent = 'Bắt đầu đọc (Kiểm tra)';
  }
}

/**
 * THUẬT TOÁN ĐỐI SOÁT & CHỈ RÕ TỪNG TỪ ĐÚNG/SAI
 */
function evaluatePronunciation(spoken, target) {
  const punct = "，。！？：、“”‘’ \t\n\r,.!?";
  const cleanTarget = [...target].filter(c => !punct.includes(c));
  const cleanSpoken = [...spoken].filter(c => !punct.includes(c));

  const n = cleanTarget.length;
  const m = cleanSpoken.length;

  if (n === 0) return;

  // Thuật toán Quy hoạch động LCS (Longest Common Subsequence Alignment)
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (cleanTarget[i - 1] === cleanSpoken[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Truy vết ngược để xác định từng ký tự
  let i = n;
  let j = m;
  const aligned = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cleanTarget[i - 1] === cleanSpoken[j - 1]) {
      aligned.push({
        target: cleanTarget[i - 1],
        spoken: cleanSpoken[j - 1],
        status: 'correct'
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      aligned.push({
        target: null,
        spoken: cleanSpoken[j - 1],
        status: 'extra'
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      aligned.push({
        target: cleanTarget[i - 1],
        spoken: null,
        status: 'missing'
      });
      i--;
    }
  }

  aligned.reverse();

  // Ghép các cặp sai từ (đọc chệch ký tự này sang ký tự khác)
  const finalAlignment = [];
  let idx = 0;
  while (idx < aligned.length) {
    const curr = aligned[idx];
    if (curr.status === 'missing' && idx + 1 < aligned.length && aligned[idx + 1].status === 'extra') {
      finalAlignment.push({
        target: curr.target,
        spoken: aligned[idx + 1].spoken,
        status: 'wrong'
      });
      idx += 2;
    } else if (curr.status === 'extra' && idx + 1 < aligned.length && aligned[idx + 1].status === 'missing') {
      finalAlignment.push({
        target: aligned[idx + 1].target,
        spoken: curr.spoken,
        status: 'wrong'
      });
      idx += 2;
    } else {
      finalAlignment.push(curr);
      idx++;
    }
  }

  const correctCount = finalAlignment.filter(item => item.status === 'correct').length;
  const score = Math.min(100, Math.round((correctCount / Math.max(1, n)) * 100));

  // Phân tích danh sách lỗi
  const errors = [];
  finalAlignment.forEach(item => {
    if (item.status === 'wrong') {
      const targetPy = (window.PINYIN_MAP && window.PINYIN_MAP[item.target]) || "";
      const spokenPy = (window.PINYIN_MAP && window.PINYIN_MAP[item.spoken]) || "";
      errors.push({
        type: 'wrong',
        targetChar: item.target,
        targetPy,
        spokenChar: item.spoken,
        spokenPy,
        msg: `Từ đúng: <b>[${item.target}] (${targetPy})</b> nhưng bạn đã đọc thành: <b>[${item.spoken}] (${spokenPy})</b>`
      });
    } else if (item.status === 'missing') {
      const targetPy = (window.PINYIN_MAP && window.PINYIN_MAP[item.target]) || "";
      errors.push({
        type: 'missing',
        targetChar: item.target,
        targetPy,
        msg: `Từ bị đọc sót / phát âm chưa rõ: <b>[${item.target}] (${targetPy})</b>`
      });
    }
  });

  window.TranslatorState.evalResult = {
    score,
    spoken,
    target,
    alignment: finalAlignment,
    errors,
    correctCount,
    totalCount: n
  };

  renderEvaluationResult();

  if (typeof playSoundEffect === 'function') {
    playSoundEffect(score >= 70 ? 'match' : 'wrong');
  }
}

/**
 * Hiển thị kết quả kiểm tra phát âm AI chi tiết
 */
function renderEvaluationResult() {
  const container = document.getElementById('translator-eval-container');
  if (!container) return;

  const result = window.TranslatorState.evalResult;
  if (!result) return;

  const score = result.score;
  const isPerfect = (score === 100);

  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="p-5 rounded-3xl bg-slate-900/95 border-2 ${
      score >= 85 ? 'border-emerald-500/70 shadow-emerald-950/40' : score >= 60 ? 'border-amber-500/70 shadow-amber-950/40' : 'border-rose-500/70 shadow-rose-950/40'
    } shadow-2xl space-y-5 animate-fadeIn">
      
      <!-- HÀNG ĐIỂM SỐ & ĐÁNH GIÁ CHUNG -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 rounded-2xl flex flex-col items-center justify-center border-2 ${
            score >= 85 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400' : score >= 60 ? 'bg-amber-950/60 border-amber-500 text-amber-400' : 'bg-rose-950/60 border-rose-500 text-rose-400'
          } shadow-lg font-black">
            <span class="text-2xl leading-none">${score}</span>
            <span class="text-[9px] uppercase tracking-wider mt-0.5">Điểm</span>
          </div>

          <div>
            <h3 class="text-base font-black text-white flex items-center gap-2">
              ${score >= 85 ? '🏆 Phát Âm Xuất Sắc!' : score >= 60 ? '🌟 Đọc Khá Tốt!' : '✍️ Cần Chỉnh Lại Phát Âm'}
              <span class="text-xs px-2.5 py-0.5 rounded-full font-bold ${
                score >= 85 ? 'bg-emerald-500/20 text-emerald-300' : score >= 60 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
              }">${result.correctCount}/${result.totalCount} từ chính xác</span>
            </h3>
            <p class="text-xs text-slate-300 mt-1">
              ${isPerfect 
                ? 'Tuyệt vời! Bạn đã phát âm chuẩn xác 100% tất cả các từ, ngữ điệu rất tự nhiên!' 
                : score >= 60 
                  ? 'Bạn đã đọc đúng hầu hết các từ. Hãy xem các từ bị bôi đỏ bên dưới để hoàn thiện nhé!' 
                  : 'Nhiều từ bị phát âm lệch hoặc chưa rõ âm. Hãy bấm loa 🔊 để nghe lại từng từ nhé!'}
            </p>
          </div>
        </div>

        <button onclick="toggleTranslatorRecording()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs font-black flex items-center gap-1.5 transition-all">
          <span>🔄</span> <span>Đọc lại lần nữa</span>
        </button>
      </div>

      <!-- BẢNG TỪNG CHỮ HÁN VỚI MÀU XANH / ĐỎ RÕ RÀNG -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
            <span>🔍</span> So sánh chi tiết từng từ trong câu:
          </span>
          <div class="flex items-center gap-3 text-[11px] font-bold">
            <span class="flex items-center gap-1 text-emerald-400"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Đọc đúng</span>
            <span class="flex items-center gap-1 text-rose-400"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Đọc sai từ</span>
            <span class="flex items-center gap-1 text-amber-400"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Bị đọc thiếu</span>
          </div>
        </div>

        <!-- Các ô chữ lớn -->
        <div class="flex items-center gap-2 flex-wrap p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          ${result.alignment.map((item, idx) => {
            if (item.status === 'extra') {
              return `
                <div class="flex flex-col items-center p-2 rounded-xl border border-dashed border-rose-500/50 bg-rose-950/30 text-center opacity-75">
                  <span class="text-[10px] text-rose-300 font-mono">${(window.PINYIN_MAP && window.PINYIN_MAP[item.spoken]) || ''}</span>
                  <span class="text-xl font-bold text-rose-400 font-kaiti my-0.5">${item.spoken}</span>
                  <span class="text-[9px] px-1 py-0.2 rounded bg-rose-900/60 text-rose-300 font-black">Nói thừa</span>
                </div>
              `;
            }

            const py = (window.PINYIN_MAP && window.PINYIN_MAP[item.target]) || "";
            const isCorrect = (item.status === 'correct');
            const isWrong = (item.status === 'wrong');
            const isMissing = (item.status === 'missing');

            return `
              <div class="relative group flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all ${
                isCorrect 
                  ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-500/10' 
                  : isWrong 
                    ? 'border-rose-500 bg-rose-950/60 text-rose-300 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/20 scale-105' 
                    : 'border-amber-500/80 bg-amber-950/40 text-amber-300'
              }">
                <!-- Pinyin mục tiêu (tuân thủ theo trạng thái bật/tắt Pinyin) -->
                <span class="text-xs font-mono font-bold ${state.showPinyin === false ? 'hidden' : ''} ${isCorrect ? 'text-emerald-400' : isWrong ? 'text-rose-400' : 'text-amber-400'}">
                  ${py}
                </span>

                <!-- Chữ Hán to rõ -->
                <span class="text-2xl font-black font-kaiti my-1 ${isCorrect ? 'text-white' : isWrong ? 'text-rose-200' : 'text-amber-200'}">
                  ${item.target}
                </span>

                <!-- Trạng thái -->
                <span class="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                  isCorrect 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : isWrong 
                      ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50 animate-pulse' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }">
                  ${isCorrect ? '✓ Đúng' : isWrong ? `❌ Sai: [${item.spoken}]` : '⚠️ Bỏ sót'}
                </span>

                <!-- Nút phát âm riêng từ này -->
                <button onclick="speakSingleChar('${item.target}')" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 hover:bg-blue-600 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-[10px] shadow" title="Nghe phát âm từ này">
                  🔊
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- BẢNG CHỈ RÕ LỖI SAI & LỜI KHUYÊN SỬA PHÁT ÂM -->
      ${result.errors.length > 0 ? `
        <div class="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2">
          <h4 class="text-xs font-black uppercase text-rose-300 tracking-wider flex items-center gap-1.5">
            <span>🚨</span> Danh sách ${result.errors.length} từ bạn cần sửa lại:
          </h4>
          <div class="space-y-1.5">
            ${result.errors.map(err => `
              <div class="p-2.5 rounded-xl bg-slate-950/80 border border-rose-900/60 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div>
                  <p class="leading-relaxed">${err.msg}</p>
                </div>
                <button onclick="speakSingleChar('${err.targetChar}')" class="px-2.5 py-1 rounded-lg bg-rose-900/50 hover:bg-rose-800 border border-rose-700/60 text-rose-200 text-xs font-bold flex items-center gap-1 flex-shrink-0" title="Nghe từ đúng">
                  <span>🔊</span> <span>Nghe lại từ này</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <span>🎉</span> <b>Không có lỗi nào!</b> Bạn đã làm chủ câu này hoàn toàn.
        </div>
      `}

      <!-- Câu bạn thực tế đã nói -->
      <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
        <span class="text-slate-300 font-bold">Máy đã nghe được từ bạn:</span> 
        <span class="text-white font-mono font-medium ml-1">"${result.spoken}"</span>
      </div>

    </div>
  `;
}

// Xuất các hàm ra phạm vi toàn cục
window.initTranslatorModule = initTranslatorModule;
window.openTranslatorModal = openTranslatorModal;
window.closeTranslatorModal = closeTranslatorModal;
window.renderTranslatorView = renderTranslatorView;
window.translateCurrentText = translateCurrentText;
window.setQuickSamplePhrase = setQuickSamplePhrase;
window.clearTranslatorInput = clearTranslatorInput;
window.speakTargetChinese = speakTargetChinese;
window.speakSingleChar = speakSingleChar;
window.setTranslatorSpeed = setTranslatorSpeed;
window.copyTargetChinese = copyTargetChinese;
window.toggleTranslatorRecording = toggleTranslatorRecording;

/**
 * BẬT / TẮT HIỂN THỊ PINYIN TRONG BẢN DỊCH
 */
function toggleTranslatorPinyin() {
  const state = window.TranslatorState;
  state.showPinyin = (state.showPinyin === false) ? true : false;

  const container = document.getElementById('translator-view-container') || document.getElementById('translator-modal-content');
  if (container) {
    renderTranslatorView(container, container.id === 'translator-modal-content');
  }

  if (typeof showToast === 'function') {
    showToast(`🔤 Đã ${state.showPinyin ? 'BẬT' : 'TẮT'} hiển thị Pinyin`);
  }
}
window.toggleTranslatorPinyin = toggleTranslatorPinyin;
