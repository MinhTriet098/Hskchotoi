/**
 * MODULE TRA TỪ CHỮ HÁN THÔNG MINH (BI-DIRECTIONAL SYNCED HOVER & TOUCH LOOKUP)
 * Tính năng đột phá:
 *  - Đồng bộ 2 chiều Hán tự <-> Pinyin: Rê chuột vào chữ Hán thì Pinyin tương ứng sáng lên,
 *    và rê chuột vào Pinyin thì chữ Hán tương ứng cũng sáng lên!
 *  - Hiện Tooltip tra từ tức thì (Chữ Hán to, Pinyin, Nghĩa tiếng Việt, Từ loại & Phát âm)
 *  - Hỗ trợ màn hình cảm ứng / iPad / Điện thoại (Chạm là sáng cả đôi và hiện nghĩa)
 */

window.HanziLookup = {
  hoverTimer: null,
  hideTimer: null,
  touchResetTimer: null,
  currentTarget: null,
  currentSyncId: null,
  tooltipEl: null,
  isTouch: false,
  openedByClick: false,
  sortedDictKeys: [],
  HOVER_DELAY: 2800, // Để chuột khoảng ~3s mới hiện (tránh hiện vội vã khi lướt chuột qua)

  init() {
    this.createTooltipElement();
    this.prepareSortedKeys();
    this.bindGlobalEvents();
    this.initObserver();
    this.processAllHanziContainers();
  },

  /**
   * Chuẩn bị danh sách từ khóa sắp xếp theo độ dài giảm dần (để khớp từ ghép trước từ đơn)
   */
  prepareSortedKeys() {
    if (!window.HANZI_HOVER_DICT) return;
    this.sortedDictKeys = Object.keys(window.HANZI_HOVER_DICT).sort((a, b) => b.length - a.length);
  },

  /**
   * Tạo phần tử Tooltip nổi trên giao diện
   */
  createTooltipElement() {
    if (document.getElementById('hanzi-lookup-tooltip')) {
      this.tooltipEl = document.getElementById('hanzi-lookup-tooltip');
      return;
    }

    const tip = document.createElement('div');
    tip.id = 'hanzi-lookup-tooltip';
    tip.className = 'fixed z-[999999] pointer-events-auto bg-slate-950/95 border-2 border-cyan-400 shadow-2xl shadow-cyan-950/90 backdrop-blur-md rounded-2xl p-3.5 max-w-[290px] sm:max-w-[340px] text-left transition-all duration-200 hidden opacity-0 scale-95';
    tip.innerHTML = `
      <div class="flex items-start justify-between gap-2.5 border-b border-slate-800 pb-2 mb-2">
        <div class="flex items-baseline gap-2.5 flex-wrap">
          <span id="hz-tip-hanzi" class="text-3xl font-black text-amber-300 font-kaiti tracking-wide drop-shadow"></span>
          <span id="hz-tip-pinyin" class="text-sm font-bold text-cyan-300 font-mono tracking-wide"></span>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button id="hz-tip-audio-btn" type="button" class="w-7 h-7 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-cyan-300 hover:text-white border border-blue-500/50 flex items-center justify-center transition-all text-xs shadow-sm" title="Phát âm từ này">
            🔊
          </button>
          <button id="hz-tip-close-btn" type="button" class="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center transition-all text-xs" title="Đóng">
            ✕
          </button>
        </div>
      </div>
      <div class="space-y-1.5">
        <p id="hz-tip-meaning" class="text-sm text-slate-100 font-bold leading-relaxed"></p>
        <div id="hz-tip-type-badge" class="inline-block text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 px-2 py-0.5 rounded-md mt-0.5"></div>
      </div>
    `;

    document.body.appendChild(tip);
    this.tooltipEl = tip;

    // Bắt sự kiện nút phát âm & đóng
    const audioBtn = tip.querySelector('#hz-tip-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hz = tip.getAttribute('data-active-hz');
        if (hz) {
          if (typeof speakChinese === 'function') {
            speakChinese(hz);
          } else if (typeof speakChineseText === 'function') {
            speakChineseText(hz);
          }
        }
      });
    }

    const closeBtn = tip.querySelector('#hz-tip-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideTooltip();
      });
    }

    // Giữ tooltip khi chuột hover vào chính tooltip
    tip.addEventListener('mouseenter', () => {
      clearTimeout(this.hideTimer);
    });
    tip.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
  },

  /**
   * Đếm số âm tiết (syllables) trong 1 từ Pinyin dựa vào nguyên âm có dấu
   */
  countPinyinSyllables(token) {
    if (!token) return 0;
    const clean = token.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g, '');
    if (!clean) return 0;
    const matches = clean.match(/(?:[bcdfghjklmnpqrstwxyzBCDFGHJKLMNPQRSTWXYZ]{0,2})(?:[aeiouüv\u00C0-\u024F\u1E00-\u1EFF]+(?:ng|n|r)?)/gi);
    return Math.max(1, matches ? matches.length : 1);
  },

  /**
   * Tra cứu thông tin từ điển thông minh (Dict -> HSK_VOCAB -> Ký tự đơn)
   */
  getDictInfo(hz, py) {
    const dict = window.HANZI_HOVER_DICT || {};
    if (dict[hz]) return dict[hz];

    // Tra trong danh sách HSK 1
    if (window.HSK_VOCAB_LIST && Array.isArray(window.HSK_VOCAB_LIST)) {
      const found = window.HSK_VOCAB_LIST.find(w => w.hanzi === hz);
      if (found) {
        return {
          hz: found.hanzi,
          py: found.pinyin || py,
          vi: found.meaning,
          type: found.type || ''
        };
      }
    }

    // Nếu từ ghép không có, ghép nghĩa các từ đơn
    if (hz && hz.length > 1) {
      const parts = [];
      for (const ch of hz) {
        if (dict[ch] && dict[ch].vi) {
          parts.push(`${ch}: ${dict[ch].vi}`);
        }
      }
      if (parts.length > 0) {
        return {
          hz,
          py: py || '',
          vi: parts.join(' • '),
          type: 'Từ ghép'
        };
      }
    }

    return {
      hz,
      py: py || '',
      vi: 'Từ vựng tiếng Trung',
      type: ''
    };
  },

  /**
   * Tách câu Hán tự và Pinyin thành các cặp từ đồng bộ (Hanzi <-> Pinyin)
   */
  alignSentence(hzText, pyText) {
    if (!hzText || !pyText) return [];

    const pyTokens = pyText.match(/([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+|[^\s\w\u00C0-\u024F\u1E00-\u1EFF])/g) || [];
    const pairs = [];
    let hzIdx = 0;
    const hzLen = hzText.length;

    pyTokens.forEach((token) => {
      if (hzIdx >= hzLen) return;
      while (hzIdx < hzLen && hzText[hzIdx] === ' ') hzIdx++;
      if (hzIdx >= hzLen) return;

      const isAlpha = /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(token);
      if (!isAlpha) {
        // Dấu câu (Punctuation)
        const hzChar = hzText[hzIdx];
        pairs.push({ hz: hzChar, py: token, isPunct: true });
        hzIdx++;
      } else {
        const sylCount = this.countPinyinSyllables(token);
        let hzWord = '';
        for (let i = 0; i < sylCount; i++) {
          if (hzIdx < hzLen) {
            hzWord += hzText[hzIdx];
            hzIdx++;
          }
        }
        pairs.push({ hz: hzWord, py: token, isPunct: false });
      }
    });

    while (hzIdx < hzLen) {
      pairs.push({ hz: hzText[hzIdx], py: '', isPunct: true });
      hzIdx++;
    }

    return pairs;
  },

  /**
   * Render HTML câu Hán tự và Pinyin liên kết tương tác 2 chiều
   */
  renderSyncedSentence(hzText, pyText, scopeId = 's', isAI = false) {
    const pairs = this.alignSentence(hzText, pyText);
    let hzHtml = '';
    let pyHtml = '';

    pairs.forEach((p, idx) => {
      if (p.isPunct) {
        hzHtml += `<span class="punct-char select-none">${p.hz}</span>`;
        if (p.py) pyHtml += `<span class="punct-char select-none">${p.py}</span>`;
      } else {
        const syncId = `sync-${scopeId}-${idx}`;
        const info = this.getDictInfo(p.hz, p.py);
        const escapedVi = (info.vi || '').replace(/"/g, '&quot;');
        const escapedPy = (info.py || p.py).replace(/"/g, '&quot;');
        const escapedType = (info.type || '').replace(/"/g, '&quot;');

        hzHtml += `<span class="sync-word sync-word-hz" data-sync-id="${syncId}" data-hz="${p.hz}" data-py="${escapedPy}" data-vi="${escapedVi}" data-type="${escapedType}" title="Bấm hoặc rê chuột để dịch từ này">${p.hz}</span>`;
        pyHtml += `<span class="sync-word sync-word-py" data-sync-id="${syncId}" data-hz="${p.hz}" data-py="${escapedPy}" data-vi="${escapedVi}" data-type="${escapedType}" title="Bấm hoặc rê chuột để xem chữ Hán và dịch">${p.py}</span> `;
      }
    });

    return { hzHtml, pyHtml };
  },

  /**
   * Phân tích câu tiếng Trung thuần văn bản thành các thẻ <span class="hz-interactive">
   */
  wrapText(text) {
    if (!text || typeof text !== 'string') return text;
    if (!this.sortedDictKeys || !this.sortedDictKeys.length) this.prepareSortedKeys();

    const dict = window.HANZI_HOVER_DICT || {};
    let result = '';
    let i = 0;
    const len = text.length;

    while (i < len) {
      let matched = false;

      // Tìm từ ghép dài nhất khớp từ vị trí i
      for (let k = 0; k < this.sortedDictKeys.length; k++) {
        const word = this.sortedDictKeys[k];
        if (text.startsWith(word, i)) {
          const info = dict[word];
          const py = (info && info.py) ? info.py.replace(/"/g, '&quot;') : '';
          const vi = (info && info.vi) ? info.vi.replace(/"/g, '&quot;') : '';
          const type = (info && info.type) ? info.type.replace(/"/g, '&quot;') : '';

          result += `<span class="hz-interactive" data-hz="${word}" data-py="${py}" data-vi="${vi}" data-type="${type}">${word}</span>`;
          i += word.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        const ch = text[i];
        if (ch >= '\u4e00' && ch <= '\u9fff') {
          const info = dict[ch] || {};
          const py = info.py || (window.PINYIN_MAP ? window.PINYIN_MAP[ch] : '') || '';
          const vi = info.vi || 'Chữ Hán tiếng Trung';
          const type = info.type || '';
          result += `<span class="hz-interactive" data-hz="${ch}" data-py="${py}" data-vi="${vi}" data-type="${type}">${ch}</span>`;
        } else {
          result += ch;
        }
        i++;
      }
    }

    return result;
  },

  /**
   * Xử lý quét các vùng văn bản chưa được gắn thẻ
   */
  processAllHanziContainers() {
    const fullSpeechEl = document.getElementById('full-speech-hanzi');
    if (fullSpeechEl && !fullSpeechEl.hasAttribute('data-hz-processed')) {
      fullSpeechEl.innerHTML = this.wrapText(fullSpeechEl.textContent);
      fullSpeechEl.setAttribute('data-hz-processed', 'true');
    }

    const speechSentences = document.querySelectorAll('.family-speech-hanzi, [id^="family-sent-card-"] p.font-kaiti');
    speechSentences.forEach(el => {
      if (!el.hasAttribute('data-hz-processed') && !el.querySelector('.hz-interactive, .sync-word')) {
        el.innerHTML = this.wrapText(el.textContent);
        el.setAttribute('data-hz-processed', 'true');
      }
    });
  },

  initObserver() {
    const observer = new MutationObserver(() => {
      this.processAllHanziContainers();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  /**
   * Làm nổi bật cả cặp (Chữ Hán & Pinyin đồng bộ)
   */
  highlightSyncedPair(syncId, activeTarget) {
    // Xóa active cũ
    document.querySelectorAll('.sync-word-active').forEach(el => el.classList.remove('sync-word-active'));
    document.querySelectorAll('.hz-interactive.hz-active').forEach(el => el.classList.remove('hz-active'));

    if (syncId) {
      document.querySelectorAll(`[data-sync-id="${syncId}"]`).forEach(el => {
        el.classList.add('sync-word-active');
      });
    } else if (activeTarget) {
      activeTarget.classList.add('hz-active');
    }
  },

  unhighlightSyncedPair(syncId) {
    if (syncId) {
      document.querySelectorAll(`[data-sync-id="${syncId}"]`).forEach(el => {
        el.classList.remove('sync-word-active');
      });
    }
  },

  /**
   * Gắn sự kiện toàn cục: Di chuột & Chạm cảm ứng iPad
   */
  bindGlobalEvents() {
    window.addEventListener('touchstart', () => {
      this.isTouch = true;
      clearTimeout(this.touchResetTimer);
      this.touchResetTimer = setTimeout(() => {
        this.isTouch = false;
      }, 1000);
    }, { passive: true });

    // 1. RÊ CHUỘT (MOUSEOVER):
    // - Sáng ngay lập tức cặp từ đồng bộ (Hán tự <-> Pinyin) để nhận biết Pinyin tương ứng.
    // - CHỈ hiện Tooltip khi để chuột giữ yên khoảng 3 giây (~2800ms) để không che chữ khi lướt chuột qua.
    document.addEventListener('mouseover', (e) => {
      if (this.isTouch) return;

      const target = e.target.closest('.hz-interactive, .sync-word');
      if (!target) return;

      const syncId = target.getAttribute('data-sync-id');
      this.currentSyncId = syncId;
      this.currentTarget = target;

      // Sáng ngay lập tức cả Chữ Hán lẫn Pinyin!
      this.highlightSyncedPair(syncId, target);

      clearTimeout(this.hoverTimer);
      clearTimeout(this.hideTimer);

      // Phải để chuột khoảng 3s mới hiện popup
      this.hoverTimer = setTimeout(() => {
        if (this.currentTarget === target) {
          this.openedByClick = false;
          this.showTooltip(target);
        }
      }, this.HOVER_DELAY);
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('.hz-interactive, .sync-word');
      if (!target) return;

      clearTimeout(this.hoverTimer);
      const syncId = target.getAttribute('data-sync-id');

      // Nếu mở bằng click hoặc chạm iPad, KHÔNG tự tắt khi chuột rời ra ngoài
      if (this.openedByClick) {
        return;
      }

      this.hideTimer = setTimeout(() => {
        if (!this.tooltipEl || !this.tooltipEl.matches(':hover')) {
          this.unhighlightSyncedPair(syncId);
          if (target) target.classList.remove('hz-active');
          this.hideTooltip();
        }
      }, 250);
    });

    // 2. NHẤP CHUỘT HOẶC CHẠM CẢM ỨNG IPAD/ĐIỆN THOẠI (CLICK / TOUCH):
    // Mở Tooltip TỨC THÌ (0ms) mà không cần chờ 3s!
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.hz-interactive, .sync-word');
      if (target) {
        clearTimeout(this.hoverTimer);
        clearTimeout(this.hideTimer);

        const syncId = target.getAttribute('data-sync-id');
        this.currentSyncId = syncId;
        this.currentTarget = target;
        this.openedByClick = true;

        this.highlightSyncedPair(syncId, target);
        this.showTooltip(target); // Hiện ngay lập tức!
        return;
      }

      // Nhấp ra ngoài -> Đóng tooltip
      if (this.tooltipEl && !this.tooltipEl.contains(e.target)) {
        if (this.currentSyncId) {
          this.unhighlightSyncedPair(this.currentSyncId);
        }
        this.hideTooltip();
      }
    });

    window.addEventListener('scroll', () => {
      if (this.tooltipEl && !this.tooltipEl.classList.contains('hidden')) {
        this.repositionTooltip();
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.hideTooltip();
    });
  },

  /**
   * Hiển thị Tooltip tra từ
   */
  showTooltip(target) {
    if (!this.tooltipEl) this.createTooltipElement();

    const hz = target.getAttribute('data-hz') || target.textContent.trim();
    let py = target.getAttribute('data-py') || '';
    let vi = target.getAttribute('data-vi') || '';
    let type = target.getAttribute('data-type') || '';

    // Nếu thông tin rỗng, thử tra cứu động
    if (!vi || vi === 'Chữ Hán HSK 1' || vi === 'Từ vựng tiếng Trung') {
      const info = this.getDictInfo(hz, py);
      if (info) {
        py = py || info.py;
        vi = info.vi;
        type = type || info.type;
      }
    }

    const hzEl = this.tooltipEl.querySelector('#hz-tip-hanzi');
    const pyEl = this.tooltipEl.querySelector('#hz-tip-pinyin');
    const viEl = this.tooltipEl.querySelector('#hz-tip-meaning');
    const typeEl = this.tooltipEl.querySelector('#hz-tip-type-badge');

    if (hzEl) hzEl.textContent = hz;
    if (pyEl) pyEl.textContent = py;
    if (viEl) viEl.textContent = vi || 'Từ vựng HSK 1';
    if (typeEl) {
      if (type) {
        typeEl.textContent = type;
        typeEl.classList.remove('hidden');
      } else {
        typeEl.classList.add('hidden');
      }
    }

    this.tooltipEl.setAttribute('data-active-hz', hz);
    this.currentTarget = target;

    this.repositionTooltip();

    this.tooltipEl.classList.remove('hidden');
    requestAnimationFrame(() => {
      this.tooltipEl.classList.remove('opacity-0', 'scale-95');
      this.tooltipEl.classList.add('opacity-100', 'scale-100');
    });
  },

  repositionTooltip() {
    if (!this.currentTarget || !this.tooltipEl) return;

    const target = this.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Nếu từ này là 1 phần của cặp Hán tự - Pinyin (sync-word), ta lấy bounding rect bao trọn cả cặp
    // để tính khoảng cách an toàn, tránh đè lên cả chữ Hán lẫn Pinyin
    let combinedRect = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };

    const syncId = target.getAttribute('data-sync-id');
    if (syncId) {
      const pairEls = document.querySelectorAll(`[data-sync-id="${syncId}"]`);
      if (pairEls.length > 1) {
        let minTop = Infinity, maxBottom = -Infinity, minLeft = Infinity, maxRight = -Infinity;
        pairEls.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < minTop) minTop = r.top;
          if (r.bottom > maxBottom) maxBottom = r.bottom;
          if (r.left < minLeft) minLeft = r.left;
          if (r.right > maxRight) maxRight = r.right;
        });
        combinedRect = {
          top: minTop,
          bottom: maxBottom,
          left: minLeft,
          right: maxRight,
          width: maxRight - minLeft,
          height: maxBottom - minTop
        };
      }
    }

    const tipRect = this.tooltipEl.getBoundingClientRect();
    const tipWidth = tipRect.width || 300;
    const tipHeight = tipRect.height || 115;
    const margin = 14;
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    let left = 0;
    let top = 0;
    let placement = 'side-right';

    // ƯU TIÊN 1: ĐẶT SANG 1 BÊN (BÊN PHẢI HOẶC BÊN TRÁI) ĐỂ KHÔNG BAO GIỜ CHE DÒNG CHỮ
    const spaceRight = vpWidth - combinedRect.right - margin;
    const spaceLeft = combinedRect.left - margin;

    if (spaceRight >= tipWidth + 14) {
      // Đặt sang bên phải của từ
      left = combinedRect.right + 14;
      top = combinedRect.top + (combinedRect.height / 2) - (tipHeight / 2);
      placement = 'side-right';
    } else if (spaceLeft >= tipWidth + 14) {
      // Đặt sang bên trái của từ
      left = combinedRect.left - tipWidth - 14;
      top = combinedRect.top + (combinedRect.height / 2) - (tipHeight / 2);
      placement = 'side-left';
    } else {
      // ƯU TIÊN 2: NẾU 2 BÊN HẸP (MÀN HÌNH ĐIỆN THOẠI), ĐẶT LÊN CAO HẲN ĐỂ KHÔNG CHE DÒNG CHỮ HÁN
      left = combinedRect.left + (combinedRect.width / 2) - (tipWidth / 2);
      top = combinedRect.top - tipHeight - 24; // Lên cao hơn hẳn 24px so với đỉnh của cả cặp
      placement = 'top';

      // Nếu chạm sát mép trên màn hình, đặt xuống dưới dòng dịch tiếng Việt
      if (top < margin) {
        top = combinedRect.bottom + 24;
        placement = 'bottom';
      }
    }

    // Giữ an toàn trong màn hình (Clamping không bao giờ rớt ngoài viền)
    if (left < margin) left = margin;
    if (left + tipWidth > vpWidth - margin) {
      left = vpWidth - margin - tipWidth;
    }
    if (top < margin) top = margin;
    if (top + tipHeight > vpHeight - margin) {
      top = vpHeight - margin - tipHeight;
    }

    this.tooltipEl.style.left = `${Math.round(left)}px`;
    this.tooltipEl.style.top = `${Math.round(top)}px`;

    // Cập nhật mũi tên
    this.tooltipEl.classList.remove('placed-side', 'flip-bottom');
    if (placement === 'side-right' || placement === 'side-left') {
      this.tooltipEl.classList.add('placed-side');
    } else if (placement === 'bottom') {
      this.tooltipEl.classList.add('flip-bottom');
    }
  },

  hideTooltip() {
    clearTimeout(this.hoverTimer);
    clearTimeout(this.hideTimer);
    this.openedByClick = false;

    if (this.tooltipEl) {
      this.tooltipEl.classList.remove('opacity-100', 'scale-100');
      this.tooltipEl.classList.add('opacity-0', 'scale-95');
      setTimeout(() => {
        if (this.tooltipEl && this.tooltipEl.classList.contains('opacity-0')) {
          this.tooltipEl.classList.add('hidden');
        }
      }, 180);
    }

    if (this.currentSyncId) {
      this.unhighlightSyncedPair(this.currentSyncId);
      this.currentSyncId = null;
    }
    if (this.currentTarget) {
      this.currentTarget.classList.remove('hz-active');
      this.currentTarget = null;
    }
  }
};

// Khởi chạy khi DOM sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.HanziLookup.init());
} else {
  window.HanziLookup.init();
}
