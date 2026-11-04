/**
 * ==============================================================================
 * BỘ GÕ TIẾNG TRUNG ẢO (GOOGLE INPUT TOOLS PINYIN IME FOR WEB)
 * ==============================================================================
 * Tính năng chuẩn như Google Translate:
 *  - Gõ Pinyin không dấu (ví dụ: nihao, jintian, shi, woshizhongguoren)
 *    tự động hiển thị bảng gợi ý chữ Hán (Candidate Window) ngay tại ô nhập!
 *  - Phím Space hoặc phím 1-5: Chọn từ tiếng Trung
 *  - Phím Enter: Giữ nguyên chữ Pinyin gốc
 *  - Phím Backspace: Xóa từng ký tự Pinyin
 *  - Phím Esc: Hủy bảng gợi ý
 *  - Phím Shift (bấm đơn lẻ): Chuyển đổi siêu nhanh giữa [中] (Tiếng Trung) và [EN] (Tiếng Anh/Việt)
 *  - Thanh công cụ nổi chuẩn Google Input Tools: [ ⋮⋮ | 拼 | 中 | 🌙 | °， | ⏻ ]
 *    Kéo thả di chuyển tùy ý, ghi nhớ vị trí và trạng thái Bật/Tắt
 *  - Tương thích 100% mọi ô input (Tìm từ, Dịch thuật, Trắc nghiệm, Điền câu, v.v.)
 * ==============================================================================
 */

(function() {
  'use strict';

  // 414 âm tiết Pinyin chuẩn của tiếng Trung
  const VALID_SYLLABLES = new Set([
    'a', 'ai', 'an', 'ang', 'ao', 'ba', 'bai', 'ban', 'bang', 'bao', 'bei', 'ben', 'beng', 'bi', 'bian', 'biao', 'bie', 'bin', 'bing', 'bo', 'bu',
    'ca', 'cai', 'can', 'cang', 'cao', 'ce', 'cei', 'cen', 'ceng', 'cha', 'chai', 'chan', 'chang', 'chao', 'che', 'chen', 'cheng', 'chi', 'chong', 'chou', 'chu', 'chua', 'chuai', 'chuan', 'chuang', 'chui', 'chun', 'chuo', 'ci', 'cong', 'cou', 'cu', 'cuan', 'cui', 'cun', 'cuo',
    'da', 'dai', 'dan', 'dang', 'dao', 'de', 'dei', 'den', 'deng', 'di', 'dia', 'dian', 'diao', 'die', 'ding', 'diu', 'dong', 'dou', 'du', 'duan', 'dui', 'dun', 'duo',
    'e', 'ei', 'en', 'eng', 'er', 'fa', 'fan', 'fang', 'fei', 'fen', 'feng', 'fo', 'fou', 'fu',
    'ga', 'gai', 'gan', 'gang', 'gao', 'ge', 'gei', 'gen', 'geng', 'gong', 'gou', 'gu', 'gua', 'guai', 'guan', 'guang', 'gui', 'gun', 'guo',
    'ha', 'hai', 'han', 'hang', 'hao', 'he', 'hei', 'hen', 'heng', 'hng', 'hong', 'hou', 'hu', 'hua', 'huai', 'huan', 'huang', 'hui', 'hun', 'huo',
    'ji', 'jia', 'jian', 'jiang', 'jiao', 'jie', 'jin', 'jing', 'jiong', 'jiu', 'ju', 'juan', 'jue', 'jun',
    'ka', 'kai', 'kan', 'kang', 'kao', 'ke', 'kei', 'ken', 'keng', 'kong', 'kou', 'ku', 'kua', 'kuai', 'kuan', 'kuang', 'kui', 'kun', 'kuo',
    'la', 'lai', 'lan', 'lang', 'lao', 'le', 'lei', 'leng', 'li', 'lia', 'lian', 'liang', 'liao', 'lie', 'lin', 'ling', 'liu', 'lo', 'long', 'lou', 'lu', 'luan', 'lun', 'luo', 'lv', 'lve',
    'ma', 'mai', 'man', 'mang', 'mao', 'me', 'mei', 'men', 'meng', 'mi', 'mian', 'miao', 'mie', 'min', 'ming', 'miu', 'mo', 'mou', 'mu',
    'na', 'nai', 'nan', 'nang', 'nao', 'ne', 'nei', 'nen', 'neng', 'ng', 'ni', 'nian', 'niang', 'niao', 'nie', 'nin', 'ning', 'niu', 'nong', 'nou', 'nu', 'nuan', 'nun', 'nuo', 'nv', 'nve',
    'o', 'ou', 'pa', 'pai', 'pan', 'pang', 'pao', 'pei', 'pen', 'peng', 'pi', 'pian', 'piao', 'pie', 'pin', 'ping', 'po', 'pou', 'pu',
    'qi', 'qia', 'qian', 'qiang', 'qiao', 'qie', 'qin', 'qing', 'qiong', 'qiu', 'qu', 'quan', 'que', 'qun',
    'ran', 'rang', 'rao', 're', 'ren', 'reng', 'ri', 'rong', 'rou', 'ru', 'rua', 'ruan', 'rui', 'run', 'ruo',
    'sa', 'sai', 'san', 'sang', 'sao', 'se', 'sei', 'sen', 'seng', 'sha', 'shai', 'shan', 'shang', 'shao', 'she', 'shei', 'shen', 'sheng', 'shi', 'shou', 'shu', 'shua', 'shuai', 'shuan', 'shuang', 'shui', 'shun', 'shuo', 'si', 'song', 'sou', 'su', 'suan', 'sui', 'sun', 'suo',
    'ta', 'tai', 'tan', 'tang', 'tao', 'te', 'tei', 'teng', 'ti', 'tian', 'tiao', 'tie', 'ting', 'tong', 'tou', 'tu', 'tuan', 'tui', 'tun', 'tuo',
    'wa', 'wai', 'wan', 'wang', 'wei', 'wen', 'weng', 'wo', 'wu',
    'xi', 'xia', 'xian', 'xiang', 'xiao', 'xie', 'xin', 'xing', 'xiong', 'xiu', 'xu', 'xuan', 'xue', 'xun',
    'ya', 'yan', 'yang', 'yao', 'ye', 'yi', 'yin', 'ying', 'yo', 'yong', 'you', 'yu', 'yuan', 'yue', 'yun',
    'za', 'zai', 'zan', 'zang', 'zao', 'ze', 'zei', 'zen', 'zeng', 'zha', 'zhai', 'zhan', 'zhang', 'zhao', 'zhe', 'zhei', 'zhen', 'zheng', 'zhi', 'zhong', 'zhou', 'zhu', 'zhua', 'zhuai', 'zhuan', 'zhuang', 'zhui', 'zhun', 'zhuo', 'zi', 'zong', 'zou', 'zu', 'zuan', 'zui', 'zun', 'zuo'
  ]);

  // Bảng chuyển đổi dấu câu tiếng Trung toàn giác (Full-width punctuation)
  const CHINESE_PUNCTUATION_MAP = {
    ',': '，',
    '.': '。',
    '?': '？',
    '!': '！',
    ':': '：',
    ';': '；',
    '(': '（',
    ')': '）'
  };

  const ChineseIME = {
    enabled: true,         // Bật / Tắt toàn bộ bộ gõ
    mode: 'zh',            // 'zh' (Gõ tiếng Trung) | 'en' (Gõ tiếng Anh/Việt thường)
    punctMode: true,       // Gõ dấu câu tiếng Trung (，。！？)
    minimized: false,      // Thu gọn thanh công cụ
    buffer: '',            // Chuỗi Pinyin đang gõ (ví dụ 'jintian')
    candidates: [],        // Danh sách chữ Hán ứng viên
    pinyinDisplay: '',     // Pinyin hiển thị có tách âm tiết (ví dụ: jin'tian)
    currentPage: 0,
    pageSize: 5,
    activeInput: null,
    toolbarEl: null,
    candidateBoxEl: null,
    shiftSolo: false,

    init() {
      // Đọc cấu hình đã lưu
      const savedEnabled = localStorage.getItem('chinese_ime_enabled');
      if (savedEnabled !== null) this.enabled = savedEnabled === 'true';

      const savedMode = localStorage.getItem('chinese_ime_mode');
      if (savedMode) this.mode = savedMode;

      const savedPunct = localStorage.getItem('chinese_ime_punct');
      if (savedPunct !== null) this.punctMode = savedPunct === 'true';

      const savedMini = localStorage.getItem('chinese_ime_minimized');
      if (savedMini !== null) this.minimized = savedMini === 'true';

      this.createCandidateBoxDOM();
      this.createToolbarDOM();
      this.bindEvents();
      this.updateNavbarStatus();
    },

    /**
     * Thuật toán phân tách âm tiết Pinyin bằng Quy hoạch động (Dynamic Programming)
     */
    segmentPinyin(str) {
      if (!str) return [];
      const s = str.toLowerCase().replace(/[^a-z]/g, '');
      const n = s.length;
      const dp = new Array(n + 1).fill(null);
      dp[0] = [];

      for (let i = 0; i < n; i++) {
        if (dp[i] === null) continue;
        for (let len = 6; len >= 1; len--) {
          if (i + len <= n) {
            const part = s.substring(i, i + len);
            if (VALID_SYLLABLES.has(part)) {
              if (dp[i + len] === null || dp[i].length + 1 < dp[i + len].length) {
                dp[i + len] = dp[i].concat([part]);
              }
            }
          }
        }
      }

      if (dp[n] !== null) return dp[n];

      // Nếu không khớp trọn vẹn, tìm đoạn khớp dài nhất còn lại
      for (let i = n; i >= 1; i--) {
        if (dp[i] !== null) {
          return dp[i].concat([s.substring(i)]);
        }
      }

      return [s];
    },

    /**
     * Tra cứu danh sách ứng viên Chữ Hán thông minh từ Pinyin
     */
    lookupCandidates(rawInput) {
      if (!rawInput) return { pinyinDisplay: '', candidates: [] };
      const raw = rawInput.toLowerCase().replace(/[^a-z']/g, '');
      if (!raw) return { pinyinDisplay: '', candidates: [] };

      const dict = window.CHINESE_IME_DICT || {};
      const candidates = [];
      const seen = new Set();

      function addCandidate(hz) {
        if (hz && !seen.has(hz)) {
          seen.add(hz);
          candidates.push(hz);
        }
      }

      const cleanRaw = raw.replace(/'/g, '');

      // 1. Khớp chính xác toàn bộ chuỗi
      if (dict[cleanRaw] && Array.isArray(dict[cleanRaw])) {
        dict[cleanRaw].forEach(addCandidate);
      }

      // 2. Phân tách âm tiết Pinyin thông minh (ví dụ: jintianshi -> jin'tian'shi)
      const syllables = this.segmentPinyin(cleanRaw);
      const pinyinDisplay = syllables.join("'");

      if (syllables.length > 1) {
        // Thử ghép các cụm từ con
        // Ví dụ: jin'tian'shi -> jin'tian (今天) + shi (是) -> 今天是
        let assembled = '';
        let i = 0;
        let assembleFailed = false;

        while (i < syllables.length) {
          let matched = false;
          // Thử ghép 3 âm tiết, 2 âm tiết, 1 âm tiết
          for (let step = 3; step >= 1; step--) {
            if (i + step <= syllables.length) {
              const subKey = syllables.slice(i, i + step).join('');
              if (dict[subKey] && dict[subKey].length > 0) {
                assembled += dict[subKey][0];
                i += step;
                matched = true;
                break;
              }
            }
          }
          if (!matched) {
            assembleFailed = true;
            break;
          }
        }

        if (!assembleFailed && assembled) {
          addCandidate(assembled);
        }

        // Thử ghép các từ đơn hàng đầu
        let singleAssembled = '';
        let singleOk = true;
        for (const syl of syllables) {
          if (dict[syl] && dict[syl].length > 0) {
            singleAssembled += dict[syl][0];
          } else {
            singleOk = false;
            break;
          }
        }
        if (singleOk && singleAssembled) {
          addCandidate(singleAssembled);
        }
      }

      // 3. Khớp tiền tố (Prefix matching) khi đang gõ dở (ví dụ: jint -> 今天)
      if (candidates.length < 8) {
        for (const k in dict) {
          if (k.startsWith(cleanRaw) && k !== cleanRaw) {
            dict[k].forEach(addCandidate);
            if (candidates.length >= 10) break;
          }
        }
      }

      // 4. Bổ sung các chữ Hán của âm tiết đầu tiên nếu danh sách còn ít
      if (candidates.length < 5 && syllables.length > 0) {
        const firstSyl = syllables[0];
        if (dict[firstSyl]) {
          dict[firstSyl].slice(0, 5).forEach(addCandidate);
        }
      }

      return {
        pinyinDisplay: pinyinDisplay || raw,
        candidates
      };
    },

    /**
     * Tạo phần tử Candidate Box trong DOM
     */
    createCandidateBoxDOM() {
      if (document.getElementById('chinese-ime-candidate-box')) return;

      const box = document.createElement('div');
      box.id = 'chinese-ime-candidate-box';
      box.className = 'fixed z-[9999999] bg-slate-950/95 border-2 border-cyan-400 shadow-2xl shadow-cyan-950/90 backdrop-blur-md rounded-2xl p-2.5 min-w-[300px] max-w-[420px] select-none transition-all hidden';
      box.innerHTML = `
        <!-- Dòng Pinyin -->
        <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-xs px-1">
          <div class="flex items-center gap-1.5 font-mono font-black text-cyan-300">
            <span class="text-[10px] text-slate-400 uppercase tracking-wider">Pinyin:</span>
            <span id="ime-pinyin-display" class="tracking-wide text-amber-300 font-bold"></span>
          </div>
          <div id="ime-page-indicator" class="text-[10px] font-extrabold text-slate-400 font-mono">1/1</div>
        </div>

        <!-- Danh sách chữ Hán ứng viên -->
        <div id="ime-candidates-list" class="flex items-center gap-1.5 flex-wrap min-h-[38px]">
          <!-- Render động -->
        </div>

        <!-- Hướng dẫn & Phím tắt -->
        <div class="flex items-center justify-between pt-1.5 mt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 px-1">
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.2 rounded bg-slate-800 border border-slate-700 font-mono text-[9px] text-slate-200">Space</kbd> / 
            <kbd class="px-1 py-0.2 rounded bg-slate-800 border border-slate-700 font-mono text-[9px] text-slate-200">1-5</kbd>: Chọn
          </span>
          <div class="flex items-center gap-1.5">
            <span class="text-[9px] text-slate-500">Shift: [中/EN]</span>
            <button id="ime-prev-page-btn" type="button" class="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs disabled:opacity-30">◀</button>
            <button id="ime-next-page-btn" type="button" class="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs disabled:opacity-30">▶</button>
          </div>
        </div>
      `;

      document.body.appendChild(box);
      this.candidateBoxEl = box;

      box.querySelector('#ime-prev-page-btn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prevPage();
      });

      box.querySelector('#ime-next-page-btn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextPage();
      });
    },

    /**
     * Tạo Thanh công cụ nổi chuẩn Google Input Tools: [ ⋮⋮ | 拼 | 中 | 🌙 | °， | ⏻ ]
     */
    createToolbarDOM() {
      if (document.getElementById('chinese-ime-toolbar')) return;

      const toolbar = document.createElement('div');
      toolbar.id = 'chinese-ime-toolbar';
      toolbar.className = 'fixed z-[999999] select-none transition-all shadow-2xl rounded-2xl border flex items-center';
      
      // Khôi phục vị trí đã lưu hoặc đặt mặc định
      const savedPos = localStorage.getItem('chinese_ime_pos');
      let defaultTop = '82px';
      let defaultRight = '20px';

      if (savedPos) {
        try {
          const pos = JSON.parse(savedPos);
          toolbar.style.top = `${pos.top}px`;
          toolbar.style.left = `${pos.left}px`;
        } catch(e) {
          toolbar.style.top = defaultTop;
          toolbar.style.right = defaultRight;
        }
      } else {
        toolbar.style.top = defaultTop;
        toolbar.style.right = defaultRight;
      }

      this.toolbarEl = toolbar;
      document.body.appendChild(toolbar);
      this.renderToolbar();
      this.enableDrag(toolbar);
    },

    /**
     * Render giao diện thanh công cụ
     */
    renderToolbar() {
      if (!this.toolbarEl) return;

      if (!this.enabled) {
        // Trạng thái TẮT: Chỉ hiện nút bật nhỏ gọn
        this.toolbarEl.className = 'fixed z-[999999] select-none transition-all shadow-xl rounded-full border border-slate-700 bg-slate-900/95 p-1 flex items-center gap-1.5 backdrop-blur-md opacity-85 hover:opacity-100';
        this.toolbarEl.innerHTML = `
          <button id="ime-toggle-power-btn" type="button" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all" title="Bấm để bật Bộ gõ Tiếng Trung Pinyin (Google IME)">
            <span class="text-sm font-black text-amber-300">拼</span>
            <span class="text-[11px]">Bật gõ tiếng Trung</span>
          </button>
        `;
        const pBtn = this.toolbarEl.querySelector('#ime-toggle-power-btn');
        if (pBtn) pBtn.addEventListener('click', () => this.togglePower());
        this.updateNavbarStatus();
        return;
      }

      if (this.minimized) {
        // Trạng thái thu gọn nhỏ
        this.toolbarEl.className = 'fixed z-[999999] select-none transition-all shadow-2xl rounded-2xl border border-cyan-500/50 bg-slate-950/95 p-1.5 flex items-center gap-2 backdrop-blur-md cursor-pointer hover:border-cyan-400';
        this.toolbarEl.innerHTML = `
          <div class="flex items-center gap-1.5 px-1.5 py-0.5" id="ime-expand-btn" title="Bấm để mở rộng thanh công cụ gõ">
            <span class="text-sm font-black text-amber-300">拼</span>
            <span class="text-xs font-extrabold px-1.5 py-0.5 rounded ${this.mode === 'zh' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}">${this.mode === 'zh' ? '中' : 'EN'}</span>
          </div>
        `;
        const expBtn = this.toolbarEl.querySelector('#ime-expand-btn');
        if (expBtn) expBtn.addEventListener('click', () => {
          this.minimized = false;
          localStorage.setItem('chinese_ime_minimized', 'false');
          this.renderToolbar();
        });
        this.updateNavbarStatus();
        return;
      }

      // Trạng thái đầy đủ chuẩn Google Input Tools: [ ⋮⋮ | 拼 | 中 | 🌙 | °， | ⏻ ]
      this.toolbarEl.className = 'fixed z-[999999] select-none transition-all shadow-2xl rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-1.5 flex items-center gap-1 backdrop-blur-md';
      this.toolbarEl.innerHTML = `
        <!-- Nút nắm kéo rê (Drag grip) -->
        <div id="ime-drag-handle" class="px-1 py-1 text-slate-500 hover:text-slate-300 cursor-move text-xs tracking-tighter" title="Giữ chuột để di chuyển thanh công cụ">
          ⋮⋮
        </div>

        <!-- Biểu tượng Pinyin -->
        <div class="px-1.5 py-1 text-amber-300 font-black text-xs flex items-center gap-1" title="Bộ gõ tiếng Trung Pinyin (Google Input Tools)">
          <span>拼</span>
        </div>

        <!-- Chế độ Ngôn ngữ: [中] vs [EN] -->
        <button id="ime-lang-mode-btn" type="button" class="px-2.5 py-1 rounded-xl font-black text-xs transition-all flex items-center gap-1 ${this.mode === 'zh' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}" title="Chuyển chế độ [中] Tiếng Trung / [EN] Tiếng Anh (Phím tắt: Shift)">
          <span>${this.mode === 'zh' ? '中' : '英'}</span>
        </button>

        <!-- Dấu câu toàn giác: [°，] -->
        <button id="ime-punct-btn" type="button" class="px-2 py-1 rounded-xl text-xs font-bold transition-all ${this.punctMode ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300' : 'bg-slate-800/80 text-slate-400 hover:text-white'}" title="Bật/Tắt dấu câu tiếng Trung (，。！？)">
          °，
        </button>

        <!-- Thu nhỏ thanh công cụ -->
        <button id="ime-mini-btn" type="button" class="w-6 h-6 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center text-[10px] transition-all" title="Thu gọn thanh công cụ">
          –
        </button>

        <!-- Nút nguồn Tắt/Bật -->
        <button id="ime-power-btn" type="button" class="w-6 h-6 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 flex items-center justify-center text-xs transition-all ml-0.5" title="Tắt bộ gõ tiếng Trung">
          ✕
        </button>
      `;

      // Gắn sự kiện các nút
      this.toolbarEl.querySelector('#ime-lang-mode-btn').addEventListener('click', () => this.toggleMode());
      this.toolbarEl.querySelector('#ime-punct-btn').addEventListener('click', () => this.togglePunct());
      this.toolbarEl.querySelector('#ime-mini-btn').addEventListener('click', () => {
        this.minimized = true;
        localStorage.setItem('chinese_ime_minimized', 'true');
        this.renderToolbar();
      });
      this.toolbarEl.querySelector('#ime-power-btn').addEventListener('click', () => this.togglePower());

      this.updateNavbarStatus();
    },

    updateNavbarStatus() {
      const navBtnText = document.getElementById('nav-ime-status-text');
      const navBtn = document.getElementById('nav-ime-toggle-btn');
      if (navBtnText) {
        if (!this.enabled) {
          navBtnText.textContent = 'Gõ Trung: TẮT';
          if (navBtn) navBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs font-bold transition-all shadow-sm';
        } else {
          navBtnText.textContent = this.mode === 'zh' ? 'Gõ Trung [中]' : 'Gõ Trung [EN]';
          if (navBtn) navBtn.className = this.mode === 'zh'
            ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/70 text-emerald-300 hover:text-white text-xs font-bold transition-all shadow-sm ring-1 ring-emerald-500/30'
            : 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-sm';
        }
      }
    },

    /**
     * Cho phép kéo thả thanh công cụ
     */
    enableDrag(el) {
      let isDragging = false;
      let startX, startY, initLeft, initTop;

      const onMouseDown = (e) => {
        const handle = e.target.closest('#ime-drag-handle, #ime-toolbar-grip');
        if (!handle && e.target.tagName === 'BUTTON') return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        initLeft = rect.left;
        initTop = rect.top;

        el.style.right = 'auto';
        el.style.left = `${initLeft}px`;
        el.style.top = `${initTop}px`;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initLeft + dx;
        let newTop = initTop + dy;

        const margin = 10;
        if (newLeft < margin) newLeft = margin;
        if (newLeft + el.offsetWidth > window.innerWidth - margin) {
          newLeft = window.innerWidth - margin - el.offsetWidth;
        }
        if (newTop < margin) newTop = margin;
        if (newTop + el.offsetHeight > window.innerHeight - margin) {
          newTop = window.innerHeight - margin - el.offsetHeight;
        }

        el.style.left = `${Math.round(newLeft)}px`;
        el.style.top = `${Math.round(newTop)}px`;
      };

      const onMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // Lưu vị trí
        const rect = el.getBoundingClientRect();
        localStorage.setItem('chinese_ime_pos', JSON.stringify({
          top: Math.round(rect.top),
          left: Math.round(rect.left)
        }));
      };

      el.addEventListener('mousedown', onMouseDown);
    },

    togglePower() {
      this.enabled = !this.enabled;
      localStorage.setItem('chinese_ime_enabled', String(this.enabled));
      if (!this.enabled) {
        this.resetBuffer();
      }
      this.renderToolbar();
      this.showToast(this.enabled ? 'Đã bật Bộ gõ Tiếng Trung (Pinyin IME)' : 'Đã tắt Bộ gõ Tiếng Trung');
    },

    toggleMode() {
      this.mode = this.mode === 'zh' ? 'en' : 'zh';
      localStorage.setItem('chinese_ime_mode', this.mode);
      this.resetBuffer();
      this.renderToolbar();
      this.showToast(this.mode === 'zh' ? 'Đã chuyển sang gõ [Tiếng Trung]' : 'Đã chuyển sang gõ [Tiếng Anh/Việt]');
    },

    togglePunct() {
      this.punctMode = !this.punctMode;
      localStorage.setItem('chinese_ime_punct', String(this.punctMode));
      this.renderToolbar();
      this.showToast(this.punctMode ? 'Dấu câu Tiếng Trung: [，。！？]' : 'Dấu câu Tiếng Anh: [,.?!]');
    },

    showToast(msg) {
      let toast = document.getElementById('chinese-ime-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'chinese-ime-toast';
        toast.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 z-[99999999] px-4 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/60 text-white font-bold text-xs shadow-2xl backdrop-blur-md transition-all duration-300 opacity-0 pointer-events-none transform translate-y-2';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.remove('opacity-0', 'translate-y-2');
      toast.classList.add('opacity-100', 'translate-y-0');

      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-2');
      }, 1500);
    },

    /**
     * Vị trí hiển thị Candidate Box ngay dưới hoặc trên ô input đang gõ
     */
    positionCandidateBox(inputEl) {
      if (!inputEl || !this.candidateBoxEl) return;

      const rect = inputEl.getBoundingClientRect();
      const box = this.candidateBoxEl;
      const boxWidth = box.offsetWidth || 320;
      const boxHeight = box.offsetHeight || 110;

      let top = rect.bottom + 8;
      let left = rect.left;

      // Nếu ô nhập nằm sát đáy màn hình, lật lên trên
      if (top + boxHeight > window.innerHeight - 10) {
        top = rect.top - boxHeight - 8;
      }

      // Giữ không rớt khỏi lề phải
      if (left + boxWidth > window.innerWidth - 12) {
        left = window.innerWidth - 12 - boxWidth;
      }
      if (left < 12) left = 12;

      box.style.top = `${Math.round(top)}px`;
      box.style.left = `${Math.round(left)}px`;
    },

    /**
     * Hiển thị bảng chọn chữ Hán ứng viên
     */
    renderCandidates() {
      if (!this.candidateBoxEl) return;

      if (!this.buffer) {
        this.candidateBoxEl.classList.add('hidden');
        return;
      }

      const { pinyinDisplay, candidates } = this.lookupCandidates(this.buffer);
      this.pinyinDisplay = pinyinDisplay;
      this.candidates = candidates;

      const pyEl = this.candidateBoxEl.querySelector('#ime-pinyin-display');
      const pageEl = this.candidateBoxEl.querySelector('#ime-page-indicator');
      const listEl = this.candidateBoxEl.querySelector('#ime-candidates-list');
      const prevBtn = this.candidateBoxEl.querySelector('#ime-prev-page-btn');
      const nextBtn = this.candidateBoxEl.querySelector('#ime-next-page-btn');

      if (pyEl) pyEl.textContent = pinyinDisplay;

      const totalPages = Math.max(1, Math.ceil(this.candidates.length / this.pageSize));
      if (this.currentPage >= totalPages) this.currentPage = totalPages - 1;
      if (this.currentPage < 0) this.currentPage = 0;

      if (pageEl) pageEl.textContent = `${this.currentPage + 1}/${totalPages}`;
      if (prevBtn) prevBtn.disabled = this.currentPage === 0;
      if (nextBtn) nextBtn.disabled = this.currentPage >= totalPages - 1;

      const startIdx = this.currentPage * this.pageSize;
      const pageCandidates = this.candidates.slice(startIdx, startIdx + this.pageSize);

      if (pageCandidates.length === 0) {
        listEl.innerHTML = `
          <div class="text-xs text-slate-400 italic py-1 px-2">
            Không tìm thấy từ • Nhấn <b>Enter</b> để nhập "${this.buffer}"
          </div>
        `;
      } else {
        listEl.innerHTML = pageCandidates.map((c, i) => {
          const num = i + 1;
          const isFirst = i === 0;
          return `
            <button type="button" data-candidate-idx="${startIdx + i}" class="ime-candidate-item px-2.5 py-1.5 rounded-xl border text-sm font-bold flex items-center gap-1 transition-all ${isFirst ? 'bg-cyan-950/80 border-cyan-500/80 text-white shadow-sm ring-1 ring-cyan-400/40' : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850'}">
              <span class="text-[11px] font-mono ${isFirst ? 'text-cyan-400 font-extrabold' : 'text-slate-400'}">${num}.</span>
              <span class="font-kaiti text-base tracking-wide">${c}</span>
            </button>
          `;
        }).join('');

        // Bắt sự kiện click vào từng ứng viên
        listEl.querySelectorAll('.ime-candidate-item').forEach(btn => {
          const handleSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-candidate-idx'));
            if (!isNaN(idx) && this.candidates[idx]) {
              this.selectCandidate(this.candidates[idx]);
            }
          };
          btn.addEventListener('mousedown', handleSelect);
          btn.addEventListener('touchstart', handleSelect, { passive: false });
        });
      }

      this.positionCandidateBox(this.activeInput);
      this.candidateBoxEl.classList.remove('hidden');
    },

    nextPage() {
      const totalPages = Math.ceil(this.candidates.length / this.pageSize);
      if (this.currentPage < totalPages - 1) {
        this.currentPage++;
        this.renderCandidates();
      }
    },

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.renderCandidates();
      }
    },

    selectCandidate(hanzi) {
      if (!this.activeInput || !hanzi) return;
      this.insertTextAtCaret(this.activeInput, hanzi);
      this.resetBuffer();
    },

    commitRawBuffer() {
      if (!this.activeInput || !this.buffer) return;
      this.insertTextAtCaret(this.activeInput, this.buffer);
      this.resetBuffer();
    },

    resetBuffer() {
      this.buffer = '';
      this.candidates = [];
      this.pinyinDisplay = '';
      this.currentPage = 0;
      if (this.candidateBoxEl) {
        this.candidateBoxEl.classList.add('hidden');
      }
    },

    /**
     * Chèn văn bản tại vị trí con trỏ (Caret) trong input/textarea và kích hoạt sự kiện
     */
    insertTextAtCaret(inputEl, text) {
      const start = inputEl.selectionStart !== null ? inputEl.selectionStart : inputEl.value.length;
      const end = inputEl.selectionEnd !== null ? inputEl.selectionEnd : inputEl.value.length;
      const val = inputEl.value;

      inputEl.value = val.substring(0, start) + text + val.substring(end);
      const newPos = start + text.length;
      inputEl.selectionStart = newPos;
      inputEl.selectionEnd = newPos;

      // Kích hoạt các sự kiện để hệ thống tìm kiếm, dịch thuật và bài tập tự cập nhật
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      inputEl.focus();
    },

    /**
     * Bắt các sự kiện bàn phím toàn cục
     */
    bindEvents() {
      // 1. Theo dõi ô input/textarea đang focus
      document.addEventListener('focusin', (e) => {
        const target = e.target;
        if (this.isEditableTextElement(target)) {
          this.activeInput = target;
        }
      });

      document.addEventListener('focusout', (e) => {
        // Trì hoãn reset để click vào candidate box vẫn bắt được
        setTimeout(() => {
          if (document.activeElement !== this.activeInput && (!this.candidateBoxEl || !this.candidateBoxEl.contains(document.activeElement))) {
            this.resetBuffer();
          }
        }, 200);
      });

      // 2. Chặn và xử lý bàn phím khi đang gõ vào input
      document.addEventListener('keydown', (e) => {
        if (!this.enabled) return;

        const target = e.target;
        if (!this.isEditableTextElement(target)) return;

        // Phím Shift đơn lẻ để đổi nhanh [中] và [EN]
        if (e.key === 'Shift') {
          if (!e.ctrlKey && !e.altKey && !e.metaKey) {
            this.shiftSolo = true;
          }
          return;
        } else {
          // Bất kỳ phím nào khác được nhấn khi giữ Shift thì không phải Shift đơn lẻ
          this.shiftSolo = false;
        }

        // Phím tắt Ctrl + Space để đổi nhanh ngôn ngữ
        if (e.ctrlKey && e.code === 'Space') {
          e.preventDefault();
          this.toggleMode();
          return;
        }

        // Bỏ qua các phím tắt hệ thống (Ctrl+C, Ctrl+V, Ctrl+A, Alt, Meta)
        if (e.ctrlKey || e.altKey || e.metaKey) {
          return;
        }

        // Nếu đang ở chế độ Tiếng Anh/Việt ([EN])
        if (this.mode !== 'zh') {
          return;
        }

        this.activeInput = target;

        // A. KHI ĐANG CÓ CHUỖI PINYIN TRONG BỘ ĐỆM (BUFFER)
        if (this.buffer.length > 0) {
          // Phím số 1 - 5: Chọn ứng viên theo số
          if (e.key >= '1' && e.key <= '5') {
            const num = parseInt(e.key);
            const idx = this.currentPage * this.pageSize + (num - 1);
            if (this.candidates[idx]) {
              e.preventDefault();
              e.stopPropagation();
              this.selectCandidate(this.candidates[idx]);
              return;
            }
          }

          // Phím Space (Cách): Chọn từ số 1
          if (e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            const topCandidate = this.candidates[this.currentPage * this.pageSize] || this.candidates[0];
            if (topCandidate) {
              this.selectCandidate(topCandidate);
            } else {
              this.commitRawBuffer();
            }
            return;
          }

          // Phím Enter: Giữ nguyên chữ Pinyin gốc không đổi
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            this.commitRawBuffer();
            return;
          }

          // Phím Backspace: Xóa lùi từng ký tự pinyin
          if (e.key === 'Backspace') {
            e.preventDefault();
            e.stopPropagation();
            this.buffer = this.buffer.slice(0, -1);
            this.currentPage = 0;
            this.renderCandidates();
            return;
          }

          // Phím Escape: Hủy bảng gõ
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            this.resetBuffer();
            return;
          }

          // Chuyển trang ứng viên: phím [ ] hoặc = - hoặc PageDown/PageUp
          if (e.key === '=' || e.key === ']' || e.key === 'PageDown' || e.key === 'ArrowRight' || e.key === '.') {
            e.preventDefault();
            e.stopPropagation();
            this.nextPage();
            return;
          }
          if (e.key === '-' || e.key === '[' || e.key === 'PageUp' || e.key === 'ArrowLeft' || e.key === ',') {
            e.preventDefault();
            e.stopPropagation();
            this.prevPage();
            return;
          }

          // Ký tự chữ a - z hoặc dấu nháy '
          if (/^[a-zA-Z']$/.test(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            this.buffer += e.key.toLowerCase();
            this.currentPage = 0;
            this.renderCandidates();
            return;
          }
        }

        // B. KHI BỘ ĐỆM ĐANG RỖNG (BẮT ĐẦU GÕ)
        else {
          // Bắt đầu gõ chữ cái a - z
          if (/^[a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            this.buffer = e.key.toLowerCase();
            this.currentPage = 0;
            this.renderCandidates();
            return;
          }

          // Chuyển đổi dấu câu tiếng Trung nếu bật punctMode
          if (this.punctMode && CHINESE_PUNCTUATION_MAP[e.key]) {
            e.preventDefault();
            e.stopPropagation();
            this.insertTextAtCaret(target, CHINESE_PUNCTUATION_MAP[e.key]);
            return;
          }
        }
      }, true);

      // Nhả phím Shift đơn lẻ -> Đổi chế độ [中] <-> [EN]
      document.addEventListener('keyup', (e) => {
        if (e.key === 'Shift' && this.shiftSolo) {
          this.shiftSolo = false;
          if (this.enabled) {
            this.toggleMode();
          }
        }
      });

      // Tắt candidate box khi click ra ngoài
      document.addEventListener('mousedown', (e) => {
        if (this.candidateBoxEl && !this.candidateBoxEl.contains(e.target) && e.target !== this.activeInput) {
          this.resetBuffer();
        }
      });
    },

    isEditableTextElement(el) {
      if (!el || !el.tagName) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === 'textarea') return true;
      if (tag === 'input') {
        const type = (el.getAttribute('type') || 'text').toLowerCase();
        return ['text', 'search', 'url'].includes(type);
      }
      return false;
    }
  };

  window.ChineseIME = ChineseIME;

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ChineseIME.init());
  } else {
    ChineseIME.init();
  }
})();
