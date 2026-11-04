/**
 * ==============================================================================
 * BỘ 3 MINI GAME LUYỆN CÂU VÍ DỤ TỪ VỰNG (EXAMPLE SENTENCE GAMES HUB)
 * ==============================================================================
 * 1. ⌨️ Game Đánh chữ: Gõ câu chữ Hán từ trí nhớ / gợi ý
 *    - 4 Chế độ đề bài tuỳ chọn:
 *      * Ẩn hoàn toàn (Nghe loa & gõ chữ Hán từ trí nhớ)
 *      * Hiện Tiếng Việt (Nhìn nghĩa tiếng Việt để gõ câu chữ Hán)
 *      * Hiện Pinyin (Nhìn phiên âm Pinyin để gõ câu chữ Hán)
 *      * Hiện Chữ Hán (Luyện tốc độ gõ & sao chép mẫu chuẩn)
 *    - Tích hợp hoàn hảo với Bộ Gõ Tiếng Trung Pinyin ảo trên màn hình
 *    - Chấm điểm tự động, so khớp ký tự, hiển thị chi tiết chữ đúng/sai.
 * 2. 🌐 Game Dịch câu:
 *    - Trắc nghiệm 4 đáp án & Tự dịch đối chiếu bản dịch chuẩn
 *    - Bóc tách nghĩa và ngữ pháp từng từ trong câu.
 * 3. 🧩 Game Nối từ của câu với nghĩa:
 *    - Bóc tách từng từ Hán tự trong câu và nghĩa tiếng Việt tương ứng
 *    - 2 Cột tương tác: Bấm chọn từ Chữ Hán và nghĩa Tiếng Việt
 *    - Đổi màu xanh khi đúng, rung đỏ khi sai, âm thanh sinh động.
 * ==============================================================================
 */

(function () {
  'use strict';

  // Quản lý trạng thái trò chơi
  const state = {
    currentItem: null,
    activeTab: 'typing', // 'typing' | 'translate' | 'matching'
    
    // State Game 1 (Đánh chữ)
    typingPromptMode: 'vi', // 'none' | 'vi' | 'py' | 'hz'
    typingChecked: false,
    typingScore: null,
    typingFeedback: null,

    // State Game 2 (Dịch câu)
    translateMode: 'quiz', // 'quiz' | 'free'
    translateAnswered: false,
    translateSelectedOption: null,
    translateQuizOptions: [],

    // State Game 3 (Nối từ)
    matchingTokens: [],
    matchingHzCards: [],
    matchingViCards: [],
    selectedHzId: null,
    selectedViId: null,
    matchedIds: new Set(),
    isMatchingProcessing: false
  };

  // Web Audio Synth tạo âm thanh phản hồi nhẹ nhàng
  let egAudioCtx = null;
  function playSound(type) {
    try {
      if (!egAudioCtx) {
        egAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (egAudioCtx.state === 'suspended') {
        egAudioCtx.resume();
      }
      const osc = egAudioCtx.createOscillator();
      const gain = egAudioCtx.createGain();
      osc.connect(gain);
      gain.connect(egAudioCtx.destination);
      const now = egAudioCtx.currentTime;

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'wrong') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.18);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'complete') {
        // Hợp âm chiến thắng
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((f, i) => {
          const o = egAudioCtx.createOscillator();
          const g = egAudioCtx.createGain();
          o.connect(g);
          g.connect(egAudioCtx.destination);
          const t = now + i * 0.08;
          o.type = 'sine';
          o.frequency.setValueAtTime(f, t);
          g.gain.setValueAtTime(0.18, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          o.start(t);
          o.stop(t + 0.35);
        });
      } else {
        // Click nhẹ
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      // AudioContext bị hạn chế hoặc trình duyệt chặn
    }
  }

  /**
   * Chuẩn hoá chuỗi tiếng Trung (loại bỏ khoảng trắng và dấu câu)
   */
  function cleanSentence(str) {
    if (!str) return '';
    return str.replace(/[\s\.,\/#!$%\^&\*;:{}=\-_`~()。，！？、；：“”‘’（）《》〈〉【】…—]/g, '').trim();
  }

  /**
   * Tạo phần tử Modal nếu chưa có trong DOM
   */
  function ensureModalElement() {
    let modal = document.getElementById('example-games-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'example-games-modal';
    modal.className = 'fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md hidden transition-all duration-300';
    modal.innerHTML = `
      <div class="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        <!-- Header Modal -->
        <div class="px-5 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3 flex-shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-lg">
              🎮
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base sm:text-lg font-black text-white tracking-wide">
                  MINI GAME CÂU VÍ DỤ
                </h3>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  HSK 1 Chuẩn
                </span>
              </div>
              <p class="text-xs text-slate-400">
                Thử thách: Đánh chữ • Dịch câu • Nối từ với nghĩa
              </p>
            </div>
          </div>

          <button id="eg-close-btn" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center transition-all text-sm font-bold" title="Đóng modal">
            ✕
          </button>
        </div>

        <!-- Thanh thông tin câu ví dụ mục tiêu -->
        <div id="eg-sentence-banner" class="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between gap-3 flex-wrap flex-shrink-0">
          <!-- Sẽ được điền động -->
        </div>

        <!-- 3 Tab chuyển đổi trò chơi -->
        <div class="px-5 pt-3 pb-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 flex-wrap flex-shrink-0">
          <button id="eg-tab-typing" class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 bg-amber-500 text-slate-950 shadow-md">
            <span>⌨️</span> <span>1. Đánh chữ (Gõ câu)</span>
          </button>
          <button id="eg-tab-translate" class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300">
            <span>🌐</span> <span>2. Dịch câu</span>
          </button>
          <button id="eg-tab-matching" class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300">
            <span>🧩</span> <span>3. Nối từ với nghĩa</span>
          </button>
        </div>

        <!-- Body nội dung trò chơi (Cuộn) -->
        <div id="eg-game-body" class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          <!-- Nội dung trò chơi render tại đây -->
        </div>

        <!-- Footer / Gợi ý nhanh -->
        <div class="px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
          <div class="flex items-center gap-2">
            <span class="text-amber-400 font-bold">💡 Mẹo:</span>
            <span>Bạn có thể dùng Bộ Gõ Pinyin tích hợp sẵn trên màn hình để gõ câu chữ Hán!</span>
          </div>
          <button id="eg-open-voice-shortcut" class="hidden sm:inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold hover:underline">
            <span>🎙️ Chuyển sang Luyện Nói AI</span>
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Gắn sự kiện nút đóng
    modal.querySelector('#eg-close-btn').addEventListener('click', closeExampleGamesModal);

    // Click ra ngoài backdrop để đóng
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeExampleGamesModal();
    });

    // Tab buttons
    modal.querySelector('#eg-tab-typing').addEventListener('click', () => switchTab('typing'));
    modal.querySelector('#eg-tab-translate').addEventListener('click', () => switchTab('translate'));
    modal.querySelector('#eg-tab-matching').addEventListener('click', () => switchTab('matching'));

    // Nút tắt mở sang Luyện nói
    modal.querySelector('#eg-open-voice-shortcut').addEventListener('click', () => {
      if (state.currentItem && typeof window.openVoiceModalForExample === 'function') {
        closeExampleGamesModal();
        window.openVoiceModalForExample(state.currentItem.id);
      }
    });

    return modal;
  }

  // Đóng modal bằng phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('example-games-modal');
      if (modal && !modal.classList.contains('hidden')) {
        closeExampleGamesModal();
      }
    }
  });

  /**
   * Mở Modal Trò Chơi Câu Ví Dụ
   */
  function openExampleGamesModal(vocabId) {
    const item = (window.VOCAB_DATABASE || []).find(w => w.id === vocabId);
    if (!item) {
      if (typeof window.showToast === 'function') window.showToast('Không tìm thấy dữ liệu từ vựng!');
      return;
    }

    state.currentItem = item;
    state.activeTab = 'typing';
    state.typingPromptMode = 'vi';
    state.typingChecked = false;
    state.typingScore = null;
    state.typingFeedback = null;
    state.translateAnswered = false;
    state.selectedHzId = null;
    state.selectedViId = null;
    state.matchedIds.clear();

    const modal = ensureModalElement();
    modal.classList.remove('hidden');

    renderSentenceBanner();
    switchTab('typing');
  }

  /**
   * Đóng Modal
   */
  function closeExampleGamesModal() {
    const modal = document.getElementById('example-games-modal');
    if (modal) modal.classList.add('hidden');
  }

  /**
   * Render thanh biểu ngữ câu ví dụ ở đầu modal
   */
  function renderSentenceBanner() {
    const banner = document.getElementById('eg-sentence-banner');
    if (!banner || !state.currentItem) return;

    const item = state.currentItem;
    banner.innerHTML = `
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex flex-col">
          <div class="flex items-baseline gap-2.5 flex-wrap">
            <span class="text-xl sm:text-2xl font-black text-amber-300 font-kaiti chinese-font tracking-wide">${item.ex_hz}</span>
            <span class="text-xs sm:text-sm font-bold text-cyan-300 font-mono tracking-wide">${item.ex_py}</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-rose-300 mt-0.5">
            ${item.ex_vi}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <button id="eg-banner-speak" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5" title="Nghe phát âm chuẩn">
          <span>🔊</span> <span class="hidden sm:inline">Nghe mẫu</span>
        </button>
        <button id="eg-banner-speak-slow" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-rose-300 hover:text-white border border-slate-700 text-xs font-bold transition-all" title="Nghe tốc độ chậm 0.75x">
          0.75x
        </button>
        <button id="eg-banner-mic" class="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5" title="Đọc và chấm phát âm câu này">
          <span>🎙️</span> <span class="hidden sm:inline">Luyện đọc</span>
        </button>
      </div>
    `;

    banner.querySelector('#eg-banner-speak').addEventListener('click', () => {
      if (typeof window.speakChinese === 'function') window.speakChinese(item.ex_hz, 1.0);
    });
    banner.querySelector('#eg-banner-speak-slow').addEventListener('click', () => {
      if (typeof window.speakChinese === 'function') window.speakChinese(item.ex_hz, 0.75);
    });
    banner.querySelector('#eg-banner-mic').addEventListener('click', () => {
      if (typeof window.openVoiceModalForExample === 'function') {
        closeExampleGamesModal();
        window.openVoiceModalForExample(item.id);
      }
    });
  }

  /**
   * Chuyển tab trò chơi
   */
  function switchTab(tabName) {
    state.activeTab = tabName;
    playSound('click');

    const tabs = ['typing', 'translate', 'matching'];
    tabs.forEach(t => {
      const btn = document.getElementById(`eg-tab-${t}`);
      if (!btn) return;
      if (t === tabName) {
        btn.className = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 bg-amber-500 text-slate-950 shadow-md';
      } else {
        btn.className = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300';
      }
    });

    const body = document.getElementById('eg-game-body');
    if (!body) return;

    if (tabName === 'typing') {
      renderGameTyping(body);
    } else if (tabName === 'translate') {
      renderGameTranslate(body);
    } else if (tabName === 'matching') {
      renderGameMatching(body);
    }
  }

  // ============================================================================
  // GAME 1: ĐÁNH CHỮ (GÕ CÂU TỪ TRÍ NHỚ / GỢI Ý)
  // ============================================================================
  function renderGameTyping(container) {
    const item = state.currentItem;
    if (!item) return;

    // Các chế độ đề bài
    const promptModes = [
      { id: 'none', label: '🙈 Không hiện gì', desc: 'Nghe loa & gõ từ trí nhớ' },
      { id: 'vi', label: '🇻🇳 Hiện Tiếng Việt', desc: 'Nhìn nghĩa gõ chữ Hán' },
      { id: 'py', label: '🔤 Hiện Pinyin', desc: 'Nhìn phiên âm gõ chữ Hán' },
      { id: 'hz', label: '🇨🇳 Hiện Chữ Hán', desc: 'Luyện tốc độ gõ chữ Hán' }
    ];

    let promptContentHtml = '';
    if (state.typingPromptMode === 'none') {
      promptContentHtml = `
        <div class="py-5 flex flex-col items-center justify-center text-center space-y-3">
          <button id="eg-listen-challenge-btn" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl flex items-center gap-2 transform active:scale-95 transition-all">
            <span class="text-xl">🔊</span> <span>Bấm để nghe câu thoại mẫu</span>
          </button>
          <p class="text-xs text-slate-400">
            Thử thách đỉnh cao: Không cần nhìn gợi ý, nghe hiểu và gõ lại chuẩn xác câu chữ Hán!
          </p>
        </div>
      `;
    } else if (state.typingPromptMode === 'vi') {
      promptContentHtml = `
        <div class="py-4 text-center space-y-1.5">
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Câu tiếng Việt cần gõ sang Chữ Hán:</span>
          <p class="text-xl sm:text-2xl font-bold text-white">
            "${item.ex_vi}"
          </p>
        </div>
      `;
    } else if (state.typingPromptMode === 'py') {
      promptContentHtml = `
        <div class="py-4 text-center space-y-1.5">
          <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Phiên âm Pinyin gợi ý:</span>
          <p class="text-xl sm:text-2xl font-mono font-bold text-cyan-300">
            ${item.ex_py}
          </p>
          <p class="text-xs text-slate-400 italic">("${item.ex_vi}")</p>
        </div>
      `;
    } else if (state.typingPromptMode === 'hz') {
      promptContentHtml = `
        <div class="py-4 text-center space-y-1.5">
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Mẫu Chữ Hán chuẩn:</span>
          <p class="text-2xl sm:text-3xl font-black font-kaiti chinese-font text-amber-300">
            ${item.ex_hz}
          </p>
          <p class="text-xs font-mono text-cyan-300">${item.ex_py}</p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Chọn chế độ đề bài -->
        <div class="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-300">
              🎯 Chọn cách hiển thị đề bài:
            </span>
            <span class="text-[11px] text-amber-400 font-medium">
              ${promptModes.find(m => m.id === state.typingPromptMode)?.desc || ''}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${promptModes.map(m => `
              <button data-mode="${m.id}" class="eg-prompt-mode-btn py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${state.typingPromptMode === m.id ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-sm' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'}">
                ${m.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Khung hiển thị câu đố theo chế độ chọn -->
        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
          ${promptContentHtml}
        </div>

        <!-- Ô gõ phím tiếng Trung -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs">
            <label for="eg-typing-input" class="font-bold text-slate-300 flex items-center gap-1.5">
              <span>⌨️ Ô nhập câu chữ Hán:</span>
            </label>
            <span class="text-slate-400 text-[11px]">
              Gõ pinyin bằng phím máy tính hoặc bàn phím ảo
            </span>
          </div>

          <div class="relative">
            <input 
              type="text" 
              id="eg-typing-input" 
              class="w-full px-4 py-3.5 bg-slate-950 border-2 border-slate-700 focus:border-amber-400 rounded-2xl text-xl sm:text-2xl font-black font-kaiti chinese-font text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner tracking-wide" 
              placeholder="Gõ chữ Hán vào đây (Ví dụ: ${item.ex_hz})..." 
              autocomplete="off"
              spellcheck="false"
            />
          </div>

          <!-- Dãy nút thao tác nhanh -->
          <div class="flex items-center justify-between gap-2 flex-wrap pt-1">
            <div class="flex items-center gap-2">
              <button id="eg-check-typing-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-1.5 transition-all">
                <span>✓</span> <span>Kiểm tra (Enter)</span>
              </button>
              <button id="eg-play-typing-audio" class="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all">
                <span>🔊</span> <span class="hidden sm:inline">Nghe câu</span>
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button id="eg-show-solution-btn" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all">
                👁️ Xem đáp án
              </button>
              <button id="eg-clear-typing-btn" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 text-xs font-medium border border-slate-700 transition-all">
                🔄 Gõ lại
              </button>
            </div>
          </div>
        </div>

        <!-- Khung kết quả chấm điểm (Hiển thị sau khi bấm kiểm tra) -->
        <div id="eg-typing-result-container"></div>

      </div>
    `;

    // Sự kiện chuyển mode đề bài
    container.querySelectorAll('.eg-prompt-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.typingPromptMode = btn.dataset.mode;
        playSound('click');
        renderGameTyping(container);
      });
    });

    // Nghe câu khi bấm nút nghe trong chế độ 'none'
    const listenChallengeBtn = container.querySelector('#eg-listen-challenge-btn');
    if (listenChallengeBtn) {
      listenChallengeBtn.addEventListener('click', () => {
        if (typeof window.speakChinese === 'function') window.speakChinese(item.ex_hz, 1.0);
      });
    }

    // Input autofocus & Enter
    const inputEl = container.querySelector('#eg-typing-input');
    if (inputEl) {
      setTimeout(() => inputEl.focus(), 80);
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          checkTypingAnswer();
        }
      });
    }

    // Các nút thao tác
    container.querySelector('#eg-check-typing-btn').addEventListener('click', checkTypingAnswer);
    container.querySelector('#eg-play-typing-audio').addEventListener('click', () => {
      if (typeof window.speakChinese === 'function') window.speakChinese(item.ex_hz, 1.0);
    });
    container.querySelector('#eg-show-solution-btn').addEventListener('click', () => {
      if (inputEl) {
        inputEl.value = item.ex_hz;
        checkTypingAnswer();
      }
    });
    container.querySelector('#eg-clear-typing-btn').addEventListener('click', () => {
      if (inputEl) {
        inputEl.value = '';
        inputEl.focus();
      }
      const res = document.getElementById('eg-typing-result-container');
      if (res) res.innerHTML = '';
    });
  }

  /**
   * Chấm điểm bài gõ câu chữ Hán
   */
  function checkTypingAnswer() {
    const inputEl = document.getElementById('eg-typing-input');
    const resultBox = document.getElementById('eg-typing-result-container');
    if (!inputEl || !resultBox || !state.currentItem) return;

    const userText = inputEl.value.trim();
    if (!userText) {
      if (typeof window.showToast === 'function') window.showToast('Vui lòng gõ câu chữ Hán trước khi kiểm tra!');
      return;
    }

    const targetRaw = state.currentItem.ex_hz;
    const cleanUser = cleanSentence(userText);
    const cleanTarget = cleanSentence(targetRaw);

    if (cleanUser === cleanTarget) {
      // Đúng tuyệt đối 100%
      playSound('complete');
      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/80 text-emerald-200 space-y-2 animate-fade-in shadow-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎉</span>
              <span class="font-black text-lg text-white">XUẤT SẮC! CHÍNH XÁC 100%!</span>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow">
              Điểm: 100/100
            </span>
          </div>

          <div class="text-sm">
            Bạn đã gõ chuẩn xác từng chữ: 
            <span class="font-kaiti chinese-font text-xl text-amber-300 font-bold ml-1">${targetRaw}</span>
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button onclick="window.openExampleGamesModal && window.openExampleGamesModal(${state.currentItem.id})" class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all">
              🔄 Luyện lại câu này
            </button>
            <button id="eg-next-game-btn" class="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all">
              🧩 Sang Game Nối từ ➔
            </button>
          </div>
        </div>
      `;

      const nextBtn = resultBox.querySelector('#eg-next-game-btn');
      if (nextBtn) nextBtn.addEventListener('click', () => switchTab('matching'));

    } else {
      // Có lỗi sai - hiển thị so khớp chi tiết từng chữ
      playSound('wrong');

      let correctCount = 0;
      const targetChars = cleanTarget.split('');
      const userChars = cleanUser.split('');

      const comparisonHtml = targetChars.map((tc, idx) => {
        const uc = userChars[idx];
        if (uc === tc) {
          correctCount++;
          return `<span class="inline-flex flex-col items-center px-1.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-kaiti chinese-font text-lg font-bold">
            <span>${tc}</span>
            <span class="text-[10px] text-emerald-400">✓</span>
          </span>`;
        } else {
          return `<span class="inline-flex flex-col items-center px-1.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/60 text-rose-300 font-kaiti chinese-font text-lg font-bold">
            <span>${tc}</span>
            <span class="text-[10px] text-rose-400 line-through">${uc || 'thiếu'}</span>
          </span>`;
        }
      }).join(' ');

      const score = Math.max(0, Math.round((correctCount / targetChars.length) * 100));

      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-rose-950/70 border-2 border-rose-500/60 text-rose-200 space-y-3 animate-fade-in shadow-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">⚠️</span>
              <span class="font-black text-base text-white">Chưa hoàn toàn chính xác!</span>
            </div>
            <span class="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs shadow">
              Đúng: ${correctCount}/${targetChars.length} chữ (${score}%)
            </span>
          </div>

          <div class="space-y-1.5">
            <p class="text-xs text-slate-300 font-semibold">Đối chiếu từng chữ Hán:</p>
            <div class="flex items-center gap-1.5 flex-wrap p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              ${comparisonHtml}
            </div>
          </div>

          <div class="flex items-center justify-between text-xs pt-1">
            <span class="text-slate-300">
              Mẫu chuẩn: <b class="font-kaiti chinese-font text-amber-300 text-sm">${targetRaw}</b>
            </span>
            <button id="eg-retry-typing-btn" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow">
              ✍️ Thử gõ lại
            </button>
          </div>
        </div>
      `;

      const retryBtn = resultBox.querySelector('#eg-retry-typing-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          inputEl.focus();
          inputEl.select();
        });
      }
    }
  }

  // ============================================================================
  // GAME 2: DỊCH CÂU (TRẮC NGHIỆM & TỰ DỊCH ĐỐI CHIẾU)
  // ============================================================================
  function renderGameTranslate(container) {
    const item = state.currentItem;
    if (!item) return;

    // Chuẩn bị 4 đáp án trắc nghiệm: 1 đúng + 3 phân tâm từ cơ sở dữ liệu
    if (!state.translateQuizOptions.length || state.translateQuizOptions[0].targetId !== item.id) {
      const correctText = item.ex_vi;
      const allOtherSentences = (window.VOCAB_DATABASE || [])
        .filter(w => w.id !== item.id && w.ex_vi && w.ex_vi !== correctText)
        .map(w => w.ex_vi);

      // Trộn và lấy 3 đáp án sai
      const shuffledOthers = allOtherSentences.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [
        { text: correctText, isCorrect: true, targetId: item.id },
        ...shuffledOthers.map(txt => ({ text: txt, isCorrect: false, targetId: item.id }))
      ].sort(() => 0.5 - Math.random());

      state.translateQuizOptions = options;
      state.translateAnswered = false;
      state.translateSelectedOption = null;
    }

    container.innerHTML = `
      <div class="space-y-5">
        
        <!-- Khung câu hỏi Chữ Hán to rõ -->
        <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3 shadow-inner">
          <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Dịch câu tiếng Trung sau đây sang Tiếng Việt:
          </span>
          <h2 class="text-3xl sm:text-4xl font-black text-amber-300 font-kaiti chinese-font tracking-wide">
            ${item.ex_hz}
          </h2>

          <div class="flex items-center justify-center gap-2 pt-1 flex-wrap">
            <button id="eg-trans-speak-btn" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5">
              <span>🔊</span> <span>Nghe câu</span>
            </button>
            <button id="eg-trans-toggle-py-btn" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all">
              👁️ Hiện Pinyin gợi ý
            </button>
          </div>

          <div id="eg-trans-py-box" class="hidden text-sm font-mono font-bold text-cyan-300 bg-slate-900/80 px-3 py-1.5 rounded-xl inline-block border border-slate-800">
            ${item.ex_py}
          </div>
        </div>

        <!-- 4 Lựa chọn trắc nghiệm -->
        <div class="space-y-2.5">
          <div class="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
            <span>Chọn 1 trong 4 bản dịch tiếng Việt bên dưới:</span>
            <span>Bấm để kiểm tra ngay</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${state.translateQuizOptions.map((opt, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              let btnClass = 'p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 bg-slate-900 border-slate-800 hover:border-amber-400 hover:bg-slate-850 text-slate-200';
              let badgeClass = 'w-7 h-7 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0';

              if (state.translateAnswered) {
                if (opt.isCorrect) {
                  btnClass = 'p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50';
                  badgeClass = 'w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs flex-shrink-0';
                } else if (state.translateSelectedOption === idx && !opt.isCorrect) {
                  btnClass = 'p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg';
                  badgeClass = 'w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0';
                }
              }

              return `
                <button data-opt-idx="${idx}" class="eg-trans-opt-btn ${btnClass}">
                  <div class="${badgeClass}">${letters[idx]}</div>
                  <div class="flex-1 text-sm font-medium leading-relaxed">
                    ${opt.text}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Khung giải thích cấu trúc từ trong câu khi đã trả lời -->
        <div id="eg-trans-explanation-container"></div>

      </div>
    `;

    // Sự kiện nghe câu
    container.querySelector('#eg-trans-speak-btn').addEventListener('click', () => {
      if (typeof window.speakChinese === 'function') window.speakChinese(item.ex_hz, 1.0);
    });

    // Toggle Pinyin
    const pyBtn = container.querySelector('#eg-trans-toggle-py-btn');
    const pyBox = container.querySelector('#eg-trans-py-box');
    if (pyBtn && pyBox) {
      pyBtn.addEventListener('click', () => {
        pyBox.classList.toggle('hidden');
        pyBtn.textContent = pyBox.classList.contains('hidden') ? '👁️ Hiện Pinyin gợi ý' : '🙈 Ẩn Pinyin';
      });
    }

    // Sự kiện bấm chọn đáp án
    container.querySelectorAll('.eg-trans-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.optIdx, 10);
        selectTranslateOption(idx, container);
      });
    });

    // Nếu đã trả lời trước đó thì hiển thị lại giải thích
    if (state.translateAnswered) {
      showTranslateExplanation();
    }
  }

  /**
   * Xử lý chọn đáp án dịch câu
   */
  function selectTranslateOption(idx, container) {
    const opt = state.translateQuizOptions[idx];
    if (!opt) return;

    state.translateSelectedOption = idx;
    state.translateAnswered = true;

    if (opt.isCorrect) {
      playSound('complete');
    } else {
      playSound('wrong');
    }

    renderGameTranslate(container);
    showTranslateExplanation();
  }

  /**
   * Hiển thị bảng phân tích cấu trúc từ vựng trong câu
   */
  function showTranslateExplanation() {
    const box = document.getElementById('eg-trans-explanation-container');
    const item = state.currentItem;
    if (!box || !item) return;

    // Phân tích các từ ghép
    let tokens = [];
    if (typeof window.HanziLookup !== 'undefined' && typeof window.HanziLookup.alignSentence === 'function') {
      const pairs = window.HanziLookup.alignSentence(item.ex_hz, item.ex_py);
      tokens = pairs.filter(p => !p.isPunct).map(p => {
        const info = window.HanziLookup.getDictInfo(p.hz, p.py);
        return {
          hz: p.hz,
          py: p.py || info.py,
          vi: p.hz === item.hanzi ? item.meaning : (info.vi || 'Từ vựng')
        };
      });
    }

    box.innerHTML = `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 animate-fade-in">
        <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <span>📖</span> <span>Phân tích cấu trúc & Nghĩa từng từ trong câu:</span>
          </span>
          <span class="text-xs text-slate-400">HSK 1 Chuẩn</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          ${tokens.map(tok => `
            <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center space-y-0.5">
              <span class="font-kaiti chinese-font text-lg font-bold text-amber-300">${tok.hz}</span>
              <span class="text-xs font-mono text-cyan-300 font-bold">${tok.py}</span>
              <span class="text-[11px] text-slate-300 line-clamp-1" title="${tok.vi}">${tok.vi}</span>
            </div>
          `).join('')}
        </div>

        <div class="pt-2 flex items-center justify-between text-xs">
          <span class="text-emerald-400 font-bold">
            Dịch chuẩn: "${item.ex_vi}"
          </span>
          <button id="eg-trans-to-matching-btn" class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all shadow">
            🧩 Chơi Nối từ của câu này ➔
          </button>
        </div>
      </div>
    `;

    const toMatchingBtn = box.querySelector('#eg-trans-to-matching-btn');
    if (toMatchingBtn) {
      toMatchingBtn.addEventListener('click', () => switchTab('matching'));
    }
  }

  // ============================================================================
  // GAME 3: NỐI TỪ TRONG CÂU VỚI NGHĨA (WORD-TO-MEANING MATCHING)
  // ============================================================================
  function prepareMatchingTokens() {
    const item = state.currentItem;
    if (!item) return [];

    let tokens = [];

    // Bóc tách từng từ qua HanziLookup
    if (typeof window.HanziLookup !== 'undefined' && typeof window.HanziLookup.alignSentence === 'function') {
      const pairs = window.HanziLookup.alignSentence(item.ex_hz, item.ex_py);
      tokens = pairs.filter(p => !p.isPunct && p.hz && p.hz.trim()).map((p, idx) => {
        const info = window.HanziLookup.getDictInfo(p.hz, p.py);
        let meaning = p.hz === item.hanzi ? item.meaning : (info.vi || 'từ vựng');

        // Làm sạch nghĩa cho ngắn gọn, dễ nối
        meaning = meaning.split(/[;•,\/]/)[0].trim();
        meaning = meaning.replace(/\([^\)]*\)/g, '').trim();

        return {
          id: `tok_${idx}`,
          hz: p.hz,
          py: p.py || info.py,
          vi: meaning
        };
      });
    }

    // Nếu câu quá ngắn (dưới 3 từ), bổ sung 1-2 từ liên quan từ bài học hiện tại để game sinh động
    if (tokens.length < 3) {
      const siblings = (window.VOCAB_DATABASE || [])
        .filter(w => w.lesson_id === item.lesson_id && w.id !== item.id)
        .slice(0, 3 - tokens.length);

      siblings.forEach((sib, sIdx) => {
        let m = sib.meaning.split(/[;•,\/]/)[0].trim().replace(/\([^\)]*\)/g, '').trim();
        tokens.push({
          id: `sib_${sIdx}`,
          hz: sib.hanzi,
          py: sib.pinyin,
          vi: m
        });
      });
    }

    state.matchingTokens = tokens;
    state.matchingHzCards = [...tokens].sort(() => 0.5 - Math.random());
    state.matchingViCards = [...tokens].sort(() => 0.5 - Math.random());
    state.selectedHzId = null;
    state.selectedViId = null;
    state.matchedIds = new Set();
    state.isMatchingProcessing = false;

    return tokens;
  }

  function renderGameMatching(container) {
    const item = state.currentItem;
    if (!item) return;

    if (!state.matchingTokens.length || state.matchingTokens[0].targetSentence !== item.ex_hz) {
      prepareMatchingTokens();
      if (state.matchingTokens[0]) {
        state.matchingTokens[0].targetSentence = item.ex_hz;
      }
    }

    const isAllCompleted = state.matchedIds.size > 0 && state.matchedIds.size === state.matchingTokens.length;

    container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Hướng dẫn chơi -->
        <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">🧩</span>
            <div>
              <p class="text-xs font-bold text-white">Thử thách nối từ trong câu:</p>
              <p class="text-[11px] text-slate-400">Bấm 1 thẻ Chữ Hán bên trái và 1 thẻ Nghĩa Tiếng Việt tương ứng bên phải.</p>
            </div>
          </div>
          <div class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-amber-300">
            Tiến độ: ${state.matchedIds.size}/${state.matchingTokens.length} cặp
          </div>
        </div>

        ${isAllCompleted ? `
          <!-- Banner chúc mừng khi hoàn thành tất cả -->
          <div class="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/80 text-center space-y-3 shadow-2xl animate-fade-in">
            <div class="text-4xl animate-bounce">🏆</div>
            <h3 class="text-xl sm:text-2xl font-black text-white">
              XUẤT SẮC! BẠN ĐÃ NỐI CHÍNH XÁC TOÀN BỘ CÂU!
            </h3>
            <p class="text-xs sm:text-sm text-emerald-300 max-w-md mx-auto">
              Bạn đã nắm vững toàn bộ từ vựng và cấu trúc của câu ví dụ này!
            </p>
            <div class="pt-2 flex items-center justify-center gap-3">
              <button id="eg-matching-replay-btn" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-1.5">
                <span>🔄</span> <span>Chơi lại vòng mới</span>
              </button>
              <button id="eg-matching-to-typing-btn" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all flex items-center gap-1.5">
                <span>⌨️</span> <span>Luyện gõ câu này</span>
              </button>
            </div>
          </div>
        ` : `
          <!-- Bàn cờ 2 Cột: Chữ Hán <-> Nghĩa Tiếng Việt -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
            
            <!-- Cột trái: Chữ Hán -->
            <div class="space-y-2.5">
              <span class="text-xs font-black uppercase tracking-wider text-amber-400 px-1">
                🇨🇳 Từ vựng trong câu:
              </span>
              ${state.matchingHzCards.map(card => {
                const isMatched = state.matchedIds.has(card.id);
                const isSelected = state.selectedHzId === card.id;

                let cardClass = 'p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center select-none cursor-pointer ';
                if (isMatched) {
                  cardClass += 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 opacity-60 cursor-default shadow-sm';
                } else if (isSelected) {
                  cardClass += 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 ring-2 ring-amber-400/30 scale-102 shadow-lg';
                } else {
                  cardClass += 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-850 text-slate-100 shadow';
                }

                return `
                  <button data-card-id="${card.id}" data-card-type="hz" class="eg-matching-card w-full ${cardClass}" ${isMatched ? 'disabled' : ''}>
                    <span class="font-kaiti chinese-font text-2xl font-bold tracking-wide">${card.hz}</span>
                    <span class="text-xs font-mono text-cyan-300 font-bold mt-0.5">${card.py}</span>
                    ${isMatched ? '<span class="text-[11px] font-bold text-emerald-400 mt-1">✓ Đã nối đúng</span>' : ''}
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Cột phải: Nghĩa Tiếng Việt -->
            <div class="space-y-2.5">
              <span class="text-xs font-black uppercase tracking-wider text-rose-400 px-1">
                🇻🇳 Nghĩa tương ứng:
              </span>
              ${state.matchingViCards.map(card => {
                const isMatched = state.matchedIds.has(card.id);
                const isSelected = state.selectedViId === card.id;

                let cardClass = 'p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center select-none cursor-pointer min-h-[76px] ';
                if (isMatched) {
                  cardClass += 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 opacity-60 cursor-default shadow-sm';
                } else if (isSelected) {
                  cardClass += 'bg-rose-500/20 border-2 border-rose-400 text-rose-300 ring-2 ring-rose-400/30 scale-102 shadow-lg';
                } else {
                  cardClass += 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-850 text-slate-200 shadow';
                }

                return `
                  <button data-card-id="${card.id}" data-card-type="vi" class="eg-matching-card w-full ${cardClass}" ${isMatched ? 'disabled' : ''}>
                    <span class="text-sm sm:text-base font-bold leading-tight">${card.vi}</span>
                    ${isMatched ? '<span class="text-[11px] font-bold text-emerald-400 mt-1">✓ Chính xác</span>' : ''}
                  </button>
                `;
              }).join('')}
            </div>

          </div>
        `}

        <div class="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Câu đầy đủ: <b class="text-amber-300 font-kaiti chinese-font">${item.ex_hz}</b></span>
          <button id="eg-matching-reset-all" class="text-xs text-slate-400 hover:text-white underline">
            Xáo trộn lại 🔄
          </button>
        </div>

      </div>
    `;

    // Sự kiện click vào thẻ nối
    container.querySelectorAll('.eg-matching-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.isMatchingProcessing) return;
        const cardId = btn.dataset.cardId;
        const cardType = btn.dataset.cardType;
        handleMatchingCardClick(cardId, cardType, container);
      });
    });

    // Nút xáo trộn lại
    const resetBtn = container.querySelector('#eg-matching-reset-all');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        prepareMatchingTokens();
        renderGameMatching(container);
      });
    }

    // Nút chơi lại khi hoàn thành
    const replayBtn = container.querySelector('#eg-matching-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        prepareMatchingTokens();
        renderGameMatching(container);
      });
    }

    const toTypingBtn = container.querySelector('#eg-matching-to-typing-btn');
    if (toTypingBtn) {
      toTypingBtn.addEventListener('click', () => switchTab('typing'));
    }
  }

  /**
   * Xử lý click chọn thẻ trong game Nối từ
   */
  function handleMatchingCardClick(cardId, cardType, container) {
    if (state.matchedIds.has(cardId)) return;

    if (cardType === 'hz') {
      // Bấm thẻ Chữ Hán
      if (state.selectedHzId === cardId) {
        state.selectedHzId = null; // Huỷ chọn
        renderGameMatching(container);
        return;
      }
      state.selectedHzId = cardId;
      playSound('click');

      // Nếu đã có thẻ nghĩa tiếng Việt được chọn trước đó -> Kiểm tra khớp
      if (state.selectedViId) {
        checkMatchingPair(container);
        return;
      }
      renderGameMatching(container);

    } else if (cardType === 'vi') {
      // Bấm thẻ Nghĩa tiếng Việt
      if (state.selectedViId === cardId) {
        state.selectedViId = null; // Huỷ chọn
        renderGameMatching(container);
        return;
      }
      state.selectedViId = cardId;
      playSound('click');

      // Nếu đã có thẻ Chữ Hán được chọn trước đó -> Kiểm tra khớp
      if (state.selectedHzId) {
        checkMatchingPair(container);
        return;
      }
      renderGameMatching(container);
    }
  }

  /**
   * Kiểm tra cặp được chọn có khớp nhau không
   */
  function checkMatchingPair(container) {
    const hzId = state.selectedHzId;
    const viId = state.selectedViId;
    if (!hzId || !viId) return;

    state.isMatchingProcessing = true;

    if (hzId === viId) {
      // KHỚP CHÍNH XÁC!
      playSound('correct');
      state.matchedIds.add(hzId);
      state.selectedHzId = null;
      state.selectedViId = null;
      state.isMatchingProcessing = false;

      // Kiểm tra nếu hoàn thành toàn bộ
      if (state.matchedIds.size === state.matchingTokens.length) {
        setTimeout(() => {
          playSound('complete');
          renderGameMatching(container);
        }, 200);
      } else {
        renderGameMatching(container);
      }

    } else {
      // KHÔNG KHỚP - Báo đỏ và reset
      playSound('wrong');
      renderGameMatching(container);

      // Hiệu ứng rung đỏ trực quan
      const selectedEls = container.querySelectorAll('.ring-2');
      selectedEls.forEach(el => {
        el.classList.add('animate-pulse', 'border-rose-500', 'bg-rose-950/60');
      });

      setTimeout(() => {
        state.selectedHzId = null;
        state.selectedViId = null;
        state.isMatchingProcessing = false;
        renderGameMatching(container);
      }, 500);
    }
  }

  // Xuất hàm toàn cục để gọi từ bên ngoài
  window.openExampleGamesModal = openExampleGamesModal;
  window.closeExampleGamesModal = closeExampleGamesModal;

})();
