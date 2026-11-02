/**
 * ==============================================================================
 * XƯỞNG IN VỞ LUYỆN CHỮ & BÀI TẬP TỰ VIẾT A4 (WORKSHEET GENERATOR) - V2.2 GỘP ĐA MẪU
 * ==============================================================================
 * Định dạng chuẩn A4 (210mm x 297mm):
 *  - Khoảng cách lề: Trên/Dưới: 1.7cm | Trái/Phải: 2.0cm
 *  - Tối ưu 100% diện tích: Các ô Mễ trải kín toàn bộ chiều ngang hàng (14 ô)
 *  - HỖ TRỢ IN NHIỀU MẪU GỘP TRONG 1 PDF DUY NHẤT (Vở Ô Mễ + Pinyin + Dịch + Nhớ chữ + Chép thoại)
 *  - Đánh số trang liên tục (Trang X / N) xuyên suốt toàn bộ tài liệu
 * ==============================================================================
 */

(function() {
  'use strict';

  // Định nghĩa 5 mẫu tài liệu hỗ trợ in ấn
  const TEMPLATE_DEFS = [
    {
      id: 'mizige',
      icon: '✍️',
      name: 'Vở Luyện Chữ Hán (Ô Mễ Tự Cách - Tràn Hàng)',
      desc: 'Trải kín 14 ô Mễ đỏ/xám ngang hàng. Chữ mẫu + chữ mờ đồ nét + đầy đủ ô trống.',
      activeBorder: 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-sm shadow-emerald-500/10',
      activeCheck: 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
    },
    {
      id: 'pinyin',
      icon: '🔤',
      name: 'Phiếu Tự Điền Pinyin (Kèm Thanh Điệu)',
      desc: 'Cho chữ Hán, chừa dòng kẻ ngang để tự tay viết Pinyin có dấu thanh điệu.',
      activeBorder: 'border-cyan-500 bg-cyan-950/40 text-cyan-200 shadow-sm shadow-cyan-500/10',
      activeCheck: 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
    },
    {
      id: 'meaning',
      icon: '🇻🇳',
      name: 'Phiếu Dịch Nghĩa / Dò Từ Vựng',
      desc: 'Cho chữ Hán & Pinyin, chừa dòng kẻ ngang để tự dịch nghĩa tiếng Việt.',
      activeBorder: 'border-blue-500 bg-blue-950/40 text-blue-200 shadow-sm shadow-blue-500/10',
      activeCheck: 'bg-blue-500 text-slate-950 border-blue-400 font-black'
    },
    {
      id: 'hanzi_recall',
      icon: '🀄',
      name: 'Phiếu Viết Chữ Hán Từ Trí Nhớ',
      desc: 'Cho Tiếng Việt & Pinyin, chừa các ô vuông trống để tự viết Chữ Hán.',
      activeBorder: 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-sm shadow-purple-500/10',
      activeCheck: 'bg-purple-500 text-slate-950 border-purple-400 font-black'
    },
    {
      id: 'dialogue',
      icon: '💬',
      name: 'Vở Luyện Chép Câu Thoại & Hội Thoại SGK',
      desc: 'In câu hội thoại mẫu chuẩn SGK + 2 dòng kẻ ngang thoáng để chép cả câu.',
      activeBorder: 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-sm shadow-amber-500/10',
      activeCheck: 'bg-amber-500 text-slate-950 border-amber-400 font-black'
    }
  ];

  // Trạng thái cấu hình của Xưởng In
  window.WORKSHEET_CONFIG = {
    template: 'mizige', // fallback tương thích
    templates: ['mizige'], // Hỗ trợ chọn đồng thời nhiều mẫu để gộp vào 1 file PDF duy nhất
    lessonId: 1,
    gridColor: 'red',   // 'red' (Đỏ truyền thống 红米格) | 'gray' (Đen xám tiết kiệm mực)
    gridStyle: 'mizige', // 'mizige' (Ô Mễ 米) | 'tianzige' (Ô Điền 田) | 'kuaige' (Ô Vuông 口)
    gridCount: 14,      // 14 ô luyện viết mỗi dòng (trải kín hàng)
    includeWatermark: true, // Có ô chữ mờ để đồ nét hay không
    includeHeader: true,    // Có in khung Tên / Ngày / Điểm hay không
    includeAnswerKey: false,// Có in trang đáp án ở cuối hay không
    selectedVocabIds: []    // Danh sách ID từ được chọn (rỗng = chọn tất cả)
  };

  /**
   * Mở Modal Xưởng In & Tạo Bài Tập
   * @param {string} initialTemplate 
   */
  function openPrintModal(initialTemplate = 'mizige') {
    const hubLessonId = window.currentLessonId || 1;
    window.WORKSHEET_CONFIG.lessonId = hubLessonId;
    if (initialTemplate) {
      window.WORKSHEET_CONFIG.template = initialTemplate;
      window.WORKSHEET_CONFIG.templates = [initialTemplate];
    } else if (!window.WORKSHEET_CONFIG.templates || window.WORKSHEET_CONFIG.templates.length === 0) {
      window.WORKSHEET_CONFIG.templates = ['mizige'];
    }

    const currentWords = getLessonWords(hubLessonId);
    window.WORKSHEET_CONFIG.selectedVocabIds = currentWords.map(w => w.id);

    const modal = document.getElementById('worksheet-modal');
    if (!modal) {
      createWorksheetModalDOM();
    }

    renderWorksheetControls();
    renderWorksheetPreview();

    const m = document.getElementById('worksheet-modal');
    if (m) m.classList.remove('hidden');
  }

  /**
   * Đóng Modal
   */
  function closePrintModal() {
    const m = document.getElementById('worksheet-modal');
    if (m) m.classList.add('hidden');
  }

  function getLessonWords(lessonId) {
    if (!window.VOCAB_DATABASE) return [];
    return window.VOCAB_DATABASE.filter(w => w.lesson_id === lessonId);
  }

  function getLessonInfo(lessonId) {
    if (window.HSK_LESSONS) {
      const found = window.HSK_LESSONS.find(l => l.id === lessonId);
      if (found) return found;
    }
    return { id: lessonId, title: `Bài ${lessonId}`, title_vi: '' };
  }

  /**
   * Bật / Tắt một mẫu tài liệu trong danh sách in
   */
  function toggleWorksheetTemplate(tmplId) {
    const cfg = window.WORKSHEET_CONFIG;
    if (!Array.isArray(cfg.templates)) {
      cfg.templates = [cfg.template || 'mizige'];
    }

    const idx = cfg.templates.indexOf(tmplId);
    if (idx >= 0) {
      if (cfg.templates.length === 1) {
        // Luôn giữ tối thiểu 1 mẫu
        return;
      }
      cfg.templates.splice(idx, 1);
    } else {
      cfg.templates.push(tmplId);
    }

    cfg.template = cfg.templates[0];
    renderWorksheetControls();
    renderWorksheetPreview();
  }

  /**
   * Chọn nhanh các bộ mẫu phổ biến
   */
  function quickSelectWorksheetTemplates(preset) {
    const cfg = window.WORKSHEET_CONFIG;
    if (preset === 'all') {
      cfg.templates = ['mizige', 'pinyin', 'meaning', 'hanzi_recall', 'dialogue'];
    } else if (preset === 'test_suite') {
      cfg.templates = ['pinyin', 'meaning', 'hanzi_recall'];
    } else if (preset === 'mizige_only') {
      cfg.templates = ['mizige'];
    } else if (preset === 'dialogue_only') {
      cfg.templates = ['dialogue'];
    }
    cfg.template = cfg.templates[0];
    renderWorksheetControls();
    renderWorksheetPreview();
  }

  /**
   * Tạo cấu trúc Modal trong DOM nếu chưa có
   */
  function createWorksheetModalDOM() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'worksheet-modal';
    modalDiv.className = 'fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto hidden';
    modalDiv.innerHTML = `
      <div class="w-full max-w-6xl max-h-[96vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Header Modal -->
        <div class="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-4 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-600/30">
              🖨️
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] border border-emerald-500/40">CHUẨN KHỔ A4 (LỀ TRÊN DƯỚI 1.7CM - TRÁI PHẢI 2.0CM)</span>
                <span class="text-xs text-slate-400">Gộp nhiều mẫu vào 1 PDF</span>
              </div>
              <h3 class="text-base font-black text-white mt-0.5">Vở Luyện Chữ & Phiếu Bài Tập Tự Viết Trên Giấy</h3>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="executePrintWorksheet()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95">
              <span>🖨️</span>
              <span>In Ngay / Lưu PDF</span>
            </button>
            <button onclick="closePrintModal()" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all">
              ✕
            </button>
          </div>
        </div>

        <!-- Thân Modal: Chia 2 Cột -->
        <div class="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          <!-- Cột Trái: Bảng điều khiển cấu hình (4 cột) -->
          <div class="lg:col-span-4 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-slate-950/40 overflow-y-auto space-y-4" id="worksheet-controls-panel">
            <!-- Render động bằng renderWorksheetControls() -->
          </div>

          <!-- Cột Phải: Xem trước trang giấy in A4 (8 cột) -->
          <div class="lg:col-span-8 p-4 sm:p-6 bg-slate-950 overflow-y-auto flex flex-col items-center">
            <div class="w-full flex items-center justify-between pb-3 text-xs text-slate-400">
              <span class="font-bold flex items-center gap-1.5">
                <span>👁️</span> Xem trước bản in A4 (Chuẩn lề 1.7cm x 2.0cm)
              </span>
              <span id="worksheet-page-count-badge" class="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono font-bold">
                1 Trang A4
              </span>
            </div>
            
            <!-- Vùng chứa các trang A4 Preview -->
            <div id="worksheet-preview-container" class="w-full flex flex-col items-center gap-6 py-2">
              <!-- Nội dung render động -->
            </div>
          </div>

        </div>

      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  /**
   * Render bảng điều khiển cấu hình
   */
  function renderWorksheetControls() {
    const panel = document.getElementById('worksheet-controls-panel');
    if (!panel) return;
    const cfg = window.WORKSHEET_CONFIG;
    const lessons = window.HSK_LESSONS || [];

    const activeTemplates = (Array.isArray(cfg.templates) && cfg.templates.length > 0)
      ? cfg.templates
      : [cfg.template || 'mizige'];

    const hasGridTemplate = activeTemplates.some(t => t === 'mizige' || t === 'hanzi_recall');
    const hasMizige = activeTemplates.includes('mizige');

    panel.innerHTML = `
      <!-- 1. CHỌN BÀI HỌC -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <span>📚</span> Chọn Bài Học Muốn In:
        </label>
        <select onchange="updateWorksheetOption('lessonId', parseInt(this.value))" class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer">
          ${lessons.map(l => `
            <option value="${l.id}" ${l.id === cfg.lessonId ? 'selected' : ''}>
              Bài ${l.id}: ${l.title} (${l.title_vi || ''})
            </option>
          `).join('')}
        </select>
      </div>

      <!-- 2. CHỌN MẪU BÀI TẬP (HỖ TRỢ CHỌN NHIỀU MẪU ĐỂ IN GỘP 1 FILE PDF) -->
      <div class="space-y-2 pt-2 border-t border-slate-800/80">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>📑</span> Chọn Mẫu Tài Liệu Muốn Tạo:
          </label>
          <span class="text-[11px] font-extrabold px-2 py-0.5 rounded-full ${activeTemplates.length > 1 ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'}">
            Đã chọn ${activeTemplates.length}/5 mẫu
          </span>
        </div>

        <!-- Thanh chọn nhanh mẫu -->
        <div class="flex items-center gap-1.5 flex-wrap pb-1">
          <button onclick="quickSelectWorksheetTemplates('all')" type="button" class="px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-300 text-[10.5px] font-bold transition-all flex items-center gap-1 shadow-sm" title="Tạo tập tài liệu hoàn chỉnh gồm cả 5 mẫu">
            <span>✨</span> Trọn bộ 5 mẫu
          </button>
          <button onclick="quickSelectWorksheetTemplates('test_suite')" type="button" class="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-[10.5px] font-bold transition-all flex items-center gap-1 shadow-sm" title="Gồm Phiếu Điền Pinyin + Phiếu Dịch Nghĩa + Viết Nhớ Chữ Hán">
            <span>📝</span> Bộ 3 phiếu test
          </button>
          <button onclick="quickSelectWorksheetTemplates('mizige_only')" type="button" class="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[10.5px] font-medium transition-all" title="Chỉ in Vở Luyện Chữ Ô Mễ">
            ✍️ Chỉ Ô Mễ
          </button>
          <button onclick="quickSelectWorksheetTemplates('dialogue_only')" type="button" class="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[10.5px] font-medium transition-all" title="Chỉ in Vở Luyện Chép Câu Thoại">
            💬 Chỉ chép thoại
          </button>
        </div>

        <div class="grid grid-cols-1 gap-2">
          ${TEMPLATE_DEFS.map(t => {
            const isSelected = activeTemplates.includes(t.id);
            return `
              <button onclick="toggleWorksheetTemplate('${t.id}')" type="button" class="w-full p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between gap-3 ${isSelected ? t.activeBorder : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'}">
                <div class="flex items-start gap-2.5 min-w-0">
                  <span class="text-xl shrink-0 mt-0.5">${t.icon}</span>
                  <div class="min-w-0">
                    <p class="text-xs font-extrabold text-white">${t.name}</p>
                    <p class="text-[10.5px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">${t.desc}</p>
                  </div>
                </div>
                <div class="shrink-0 w-5 h-5 rounded-md flex items-center justify-center border text-xs transition-all ${isSelected ? t.activeCheck : 'border-slate-700 bg-slate-800 text-transparent'}">
                  ✓
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 3. TÙY CHỌN DÀNH CHO Ô LUYỆN VIẾT (HIỂN THỊ KHI CÓ Ô MỄ HOẶC NHỚ CHỮ HÁN) -->
      ${hasGridTemplate ? `
        <div class="space-y-3 pt-2 border-t border-slate-800/80">
          <label class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>⚙️</span> Tùy Chỉnh Ô Luyện Viết:
          </label>

          <!-- Kiểu ô lưới -->
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-400">Kiểu ô lưới:</span>
            <div class="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button onclick="updateWorksheetOption('gridStyle', 'mizige')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] ${cfg.gridStyle === 'mizige' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">
                Ô Mễ (米)
              </button>
              <button onclick="updateWorksheetOption('gridStyle', 'tianzige')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] ${cfg.gridStyle === 'tianzige' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">
                Ô Điền (田)
              </button>
              <button onclick="updateWorksheetOption('gridStyle', 'kuaige')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] ${cfg.gridStyle === 'kuaige' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">
                Ô Trống (口)
              </button>
            </div>
          </div>

          <!-- Màu ô lưới -->
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-400">Màu mực ô lưới:</span>
            <div class="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button onclick="updateWorksheetOption('gridColor', 'red')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 ${cfg.gridColor === 'red' ? 'bg-rose-700 text-white' : 'text-slate-400 hover:text-white'}">
                <span class="w-2 h-2 rounded-full bg-rose-400"></span> Đỏ truyền thống
              </button>
              <button onclick="updateWorksheetOption('gridColor', 'gray')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 ${cfg.gridColor === 'gray' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}">
                <span class="w-2 h-2 rounded-full bg-slate-400"></span> Xám tiết kiệm mực
              </button>
            </div>
          </div>

          <!-- Chữ mờ đồ nét (dành cho Ô Mễ) -->
          ${hasMizige ? `
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400">Ô chữ mờ (để đồ đè nét):</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" onchange="updateWorksheetOption('includeWatermark', this.checked)" ${cfg.includeWatermark ? 'checked' : ''} class="sr-only peer">
                <div class="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ` : ''}

        </div>
      ` : ''}

      <!-- 4. TÙY CHỌN CHUNG TRANG IN -->
      <div class="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs">
        <label class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <span>📑</span> Tùy Chọn Trang Giấy A4:
        </label>
        
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Khung Họ tên & Ngày tháng:</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onchange="updateWorksheetOption('includeHeader', this.checked)" ${cfg.includeHeader ? 'checked' : ''} class="sr-only peer">
            <div class="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-slate-400">Trang Đáp Án ở cuối (Tự chấm):</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onchange="updateWorksheetOption('includeAnswerKey', this.checked)" ${cfg.includeAnswerKey ? 'checked' : ''} class="sr-only peer">
            <div class="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>
    `;
  }

  function updateWorksheetOption(key, val) {
    window.WORKSHEET_CONFIG[key] = val;
    if (key === 'lessonId') {
      const currentWords = getLessonWords(val);
      window.WORKSHEET_CONFIG.selectedVocabIds = currentWords.map(w => w.id);
    }
    renderWorksheetControls();
    renderWorksheetPreview();
  }

  /**
   * Tạo chuỗi SVG cho một ô Mễ / Điền / Vuông
   */
  function buildGridCellHTML(style, color, content = '', isWatermark = false, isSample = false) {
    const isRed = color === 'red';
    const borderColor = isRed ? '#e11d48' : '#64748b';
    const mainDashed = isRed ? '#fca5a5' : '#cbd5e1';
    const diagDashed = isRed ? '#fecdd3' : '#e2e8f0';

    let charColor = '#0f172a'; // Đen đậm cho chữ mẫu
    if (isWatermark) {
      charColor = isRed ? '#fda4af' : '#cbd5e1'; // Xám / hồng mờ để đồ nét
    }

    let innerSvgLines = '';
    if (style === 'mizige') {
      innerSvgLines = `
        <line x1="0" y1="50" x2="100" y2="50" stroke="${mainDashed}" stroke-width="1.2" stroke-dasharray="3,3"/>
        <line x1="50" y1="0" x2="50" y2="100" stroke="${mainDashed}" stroke-width="1.2" stroke-dasharray="3,3"/>
        <line x1="0" y1="0" x2="100" y2="100" stroke="${diagDashed}" stroke-width="1" stroke-dasharray="3,4"/>
        <line x1="0" y1="100" x2="100" y2="0" stroke="${diagDashed}" stroke-width="1" stroke-dasharray="3,4"/>
      `;
    } else if (style === 'tianzige') {
      innerSvgLines = `
        <line x1="0" y1="50" x2="100" y2="50" stroke="${mainDashed}" stroke-width="1.2" stroke-dasharray="3,3"/>
        <line x1="50" y1="0" x2="50" y2="100" stroke="${mainDashed}" stroke-width="1.2" stroke-dasharray="3,3"/>
      `;
    }

    // Ô kích thước 36px x 36px chuẩn mực, vừa khít 14 ô trên chiều rộng dòng kẻ A4
    return `
      <div class="mizige-print-cell ${isSample ? 'sample-cell' : ''} ${isWatermark ? 'watermark-cell' : ''}" style="width: 36px; height: 36px; border: 1.5px solid ${borderColor}; position: relative; display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; box-sizing: border-box; flex-shrink: 0;">
        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;" viewBox="0 0 100 100">
          ${innerSvgLines}
        </svg>
        ${content ? `
          <span style="position: relative; z-index: 2; font-family: 'LXGW WenKai Screen R', 'LXGW WenKai Screen', 'KaiTi', '楷体', 'STKaiti', serif; font-size: 24px; line-height: 1; color: ${charColor}; font-weight: ${isSample ? '700' : '400'}; user-select: none;">
            ${content}
          </span>
        ` : ''}
      </div>
    `;
  }

  /**
   * Tạo Header trang giấy A4 (Họ tên, Ngày, Điểm)
   */
  function buildPageHeaderHTML(lessonInfo, pageNum, totalPages, cfg, templateTitle = '') {
    const subTitle = templateTitle ? `Giáo Trình HSK 1 Chuẩn 3.0 • ${templateTitle}` : 'Giáo Trình HSK 1 Chuẩn 3.0 • Vở Luyện Chữ & Bài Tập Tự Viết A4';
    return `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">
            ${subTitle}
          </div>
          <h1 style="font-size: 15px; font-weight: 900; color: #0f172a; margin: 1px 0 0 0;">
            Bài ${lessonInfo.id}: ${lessonInfo.title} <span style="font-size: 12px; font-weight: 500; color: #475569;">(${lessonInfo.title_vi || ''})</span>
          </h1>
        </div>

        <div style="text-align: right; font-size: 9.5px; font-weight: 700; color: #64748b;">
          Trang ${pageNum} / ${totalPages}
        </div>
      </div>

      ${cfg.includeHeader ? `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 10px; margin-bottom: 8px;">
          <div><b>Họ và tên:</b> ..............................................................</div>
          <div><b>Ngày luyện:</b> ..... / ..... / 202...</div>
          <div><b>Điểm số:</b> .......... / 100</div>
        </div>
      ` : ''}
    `;
  }

  function buildPageFooterHTML() {
    return `
      <div style="border-top: 1px dashed #cbd5e1; padding-top: 4px; margin-top: auto; display: flex; justify-content: space-between; font-size: 8.5px; color: #94a3b8;">
        <span>HiHSK 3.0 • Vở Luyện Viết Khổ A4 (Lề: 1.7cm x 2.0cm)</span>
        <span>Học - Luyện - Viết Tay Mỗi Ngày</span>
      </div>
    `;
  }

  /**
   * Phân chia danh sách thành các trang A4 cân đối, chống trang mồ côi
   */
  function paginateItems(items, maxPerSingle = 15) {
    if (items.length <= maxPerSingle) {
      return [items];
    }
    const mid = Math.ceil(items.length / 2);
    return [
      items.slice(0, mid),
      items.slice(mid)
    ];
  }

  // =========================================================================
  // BỘ TẠO TRANG TỪNG MẪU (PAGE GENERATORS)
  // =========================================================================

  /**
   * Mẫu 1: Vở Luyện Chữ Ô Mễ Tràn Hàng
   */
  function generateMizigePages(lessonInfo, words, cfg, pageBoxStyle) {
    const pageBatches = paginateItems(words, 15);
    const pages = [];

    pageBatches.forEach((batchWords) => {
      let rowsHTML = batchWords.map((word) => {
        const chars = Array.from(word.hanzi);
        const TOTAL_CELLS_PER_ROW = 14;
        
        return `
          <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 6px; margin-bottom: 5px; background-color: #ffffff; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <div style="width: 105px; flex-shrink: 0; line-height: 1.2;">
              <div style="display: flex; align-items: baseline; gap: 4px;">
                <span style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 18px; font-weight: 900; color: #0f172a;">${word.hanzi}</span>
                <span style="font-family: monospace; font-size: 10.5px; font-weight: 700; color: #0284c7;">${word.pinyin}</span>
              </div>
              <div style="font-size: 9.5px; color: #475569; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${word.meaning}">
                ${word.meaning}
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 2.5px; flex: 1; min-width: 0;">
              ${chars.map(c => buildGridCellHTML(cfg.gridStyle, cfg.gridColor, c, false, true)).join('')}
              
              ${cfg.includeWatermark ? (function() {
                if (chars.length === 1) {
                  return buildGridCellHTML(cfg.gridStyle, cfg.gridColor, chars[0], true, false) +
                         buildGridCellHTML(cfg.gridStyle, cfg.gridColor, chars[0], true, false);
                } else {
                  return chars.map(c => buildGridCellHTML(cfg.gridStyle, cfg.gridColor, c, true, false)).join('');
                }
              })() : ''}
              
              ${(function() {
                let emptyCells = '';
                let usedCount = chars.length;
                if (cfg.includeWatermark) {
                  usedCount += (chars.length === 1 ? 2 : chars.length);
                }
                const remaining = Math.max(0, TOTAL_CELLS_PER_ROW - usedCount);
                for (let i = 0; i < remaining; i++) {
                  emptyCells += buildGridCellHTML(cfg.gridStyle, cfg.gridColor, '', false, false);
                }
                return emptyCells;
              })()}
            </div>
          </div>
        `;
      }).join('');

      pages.push(`
        <div class="worksheet-page" style="${pageBoxStyle}">
          <div>
            ${buildPageHeaderHTML(lessonInfo, '{{PAGE_NUM}}', '{{TOTAL_PAGES}}', cfg, 'Vở Luyện Chữ Hán Ô Mễ')}
            <div style="margin-top: 4px;">
              ${rowsHTML}
            </div>
          </div>
          ${buildPageFooterHTML()}
        </div>
      `);
    });

    return pages;
  }

  /**
   * Mẫu 2: Phiếu Tự Điền Pinyin
   */
  function generatePinyinPages(lessonInfo, words, cfg, pageBoxStyle) {
    const pageBatches = paginateItems(words, 16);
    const pages = [];

    pageBatches.forEach((batchWords) => {
      let rowsHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          ${batchWords.map((word) => `
            <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 24px; font-weight: 900; color: #0f172a;">${word.hanzi}</div>
                <div style="font-size: 9.5px; color: #64748b; margin-top: 1px;">Nghĩa: ${word.meaning}</div>
              </div>
              <div style="text-align: right; width: 130px;">
                <div style="font-size: 8.5px; color: #94a3b8; margin-bottom: 2px;">Viết Pinyin & thanh điệu:</div>
                <div style="border-bottom: 1.5px dashed #475569; height: 24px; width: 100%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      pages.push(`
        <div class="worksheet-page" style="${pageBoxStyle}">
          <div>
            ${buildPageHeaderHTML(lessonInfo, '{{PAGE_NUM}}', '{{TOTAL_PAGES}}', cfg, 'Phiếu Tự Điền Pinyin (Kèm Thanh Điệu)')}
            <div style="margin-top: 6px;">
              <div style="font-size: 10px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 5px 10px; border-radius: 4px; margin-bottom: 8px;">
                📝 HƯỚNG DẪN: Đọc chữ Hán và tự tay viết phiên âm Pinyin kèm dấu thanh điệu chuẩn xác vào dòng kẻ đứt.
              </div>
              ${rowsHTML}
            </div>
          </div>
          ${buildPageFooterHTML()}
        </div>
      `);
    });

    return pages;
  }

  /**
   * Mẫu 3: Phiếu Dịch Nghĩa / Dò Từ Vựng
   */
  function generateMeaningPages(lessonInfo, words, cfg, pageBoxStyle) {
    const pageBatches = paginateItems(words, 16);
    const pages = [];

    pageBatches.forEach((batchWords) => {
      let rowsHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          ${batchWords.map((word) => `
            <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 22px; font-weight: 900; color: #0f172a;">${word.hanzi}</div>
                <div style="font-family: monospace; font-size: 11px; font-weight: 700; color: #0284c7;">${word.pinyin}</div>
              </div>
              <div style="text-align: right; width: 130px;">
                <div style="font-size: 8.5px; color: #94a3b8; margin-bottom: 2px;">Dịch nghĩa tiếng Việt:</div>
                <div style="border-bottom: 1.5px dashed #475569; height: 24px; width: 100%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      pages.push(`
        <div class="worksheet-page" style="${pageBoxStyle}">
          <div>
            ${buildPageHeaderHTML(lessonInfo, '{{PAGE_NUM}}', '{{TOTAL_PAGES}}', cfg, 'Phiếu Dịch Nghĩa / Dò Từ Vựng')}
            <div style="margin-top: 6px;">
              <div style="font-size: 10px; font-weight: 700; color: #15803d; background: #dcfce7; padding: 5px 10px; border-radius: 4px; margin-bottom: 8px;">
                📝 HƯỚNG DẪN: Nhìn Chữ Hán và Pinyin, tự tay dịch nghĩa tiếng Việt tương ứng vào dòng kẻ đứt.
              </div>
              ${rowsHTML}
            </div>
          </div>
          ${buildPageFooterHTML()}
        </div>
      `);
    });

    return pages;
  }

  /**
   * Mẫu 4: Phiếu Viết Chữ Hán Từ Trí Nhớ
   */
  function generateHanziRecallPages(lessonInfo, words, cfg, pageBoxStyle) {
    const pageBatches = paginateItems(words, 15);
    const pages = [];

    pageBatches.forEach((batchWords) => {
      let rowsHTML = batchWords.map((word) => {
        const chars = Array.from(word.hanzi);
        return `
          <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; margin-bottom: 6px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
            <div style="width: 220px; flex-shrink: 0;">
              <div style="font-size: 12px; font-weight: 800; color: #0f172a;">${word.meaning}</div>
              <div style="font-family: monospace; font-size: 11px; font-weight: 700; color: #0284c7; margin-top: 1px;">Pinyin: ${word.pinyin}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-size: 9px; color: #94a3b8; margin-right: 6px;">Viết Chữ Hán:</span>
              ${chars.map(() => buildGridCellHTML(cfg.gridStyle, cfg.gridColor, '', false, false)).join('')}
            </div>
          </div>
        `;
      }).join('');

      pages.push(`
        <div class="worksheet-page" style="${pageBoxStyle}">
          <div>
            ${buildPageHeaderHTML(lessonInfo, '{{PAGE_NUM}}', '{{TOTAL_PAGES}}', cfg, 'Phiếu Viết Chữ Hán Từ Trí Nhớ')}
            <div style="margin-top: 6px;">
              <div style="font-size: 10px; font-weight: 700; color: #7e22ce; background: #f3e8ff; padding: 5px 10px; border-radius: 4px; margin-bottom: 8px;">
                📝 HƯỚNG DẪN THỬ THÁCH: Đọc nghĩa tiếng Việt và Pinyin, tự nhớ và viết Chữ Hán chuẩn xác vào ô trống mà không nhìn tài liệu!
              </div>
              ${rowsHTML}
            </div>
          </div>
          ${buildPageFooterHTML()}
        </div>
      `);
    });

    return pages;
  }

  /**
   * Mẫu 5: Vở Luyện Chép Câu Thoại SGK
   */
  function generateDialoguePages(lessonInfo, cfg, pageBoxStyle) {
    const dialogueData = (window.HSK_DIALOGUES || []).find(d => d.lesson_id === cfg.lessonId);
    const allLines = [];
    if (dialogueData && dialogueData.dialogues) {
      dialogueData.dialogues.forEach(dlg => {
        (dlg.lines || []).forEach(line => {
          allLines.push({
            dlgTitle: dlg.title_vi || dlg.title,
            role: line.role,
            hanzi: line.hanzi,
            pinyin: line.pinyin,
            vi: line.vi
          });
        });
      });
    }

    if (allLines.length === 0) {
      return [];
    }

    const ITEMS_PER_PAGE = 7;
    const totalPages = Math.ceil(allLines.length / ITEMS_PER_PAGE) || 1;
    const pages = [];

    for (let p = 0; p < totalPages; p++) {
      const pageLines = allLines.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE);

      let rowsHTML = pageLines.map((line) => `
        <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; background: #ffffff;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
            <span style="font-size: 9.5px; font-weight: 800; color: #d97706; text-transform: uppercase;">${line.dlgTitle} • ${line.role}</span>
            <span style="font-size: 10.5px; color: #475569; font-style: italic;">"${line.vi}"</span>
          </div>
          
          <div style="margin-bottom: 6px;">
            <div style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 19px; font-weight: 900; color: #0f172a; letter-spacing: 0.04em;">
              ${line.hanzi}
            </div>
            <div style="font-family: monospace; font-size: 11px; font-weight: 700; color: #0284c7; margin-top: 1px;">
              ${line.pinyin}
            </div>
          </div>

          <div style="border-top: 1px dashed #cbd5e1; padding-top: 4px;">
            <div style="font-size: 8.5px; color: #94a3b8; margin-bottom: 2px;">Dòng luyện chép lại câu:</div>
            <div style="border-bottom: 1.5px dashed #94a3b8; height: 26px; width: 100%;"></div>
          </div>
        </div>
      `).join('');

      pages.push(`
        <div class="worksheet-page" style="${pageBoxStyle}">
          <div>
            ${buildPageHeaderHTML(lessonInfo, '{{PAGE_NUM}}', '{{TOTAL_PAGES}}', cfg, 'Vở Luyện Chép Câu Thoại SGK')}
            <div style="margin-top: 6px;">
              <div style="font-size: 10px; font-weight: 700; color: #b45309; background: #fef3c7; padding: 5px 10px; border-radius: 4px; margin-bottom: 8px;">
                📝 HƯỚNG DẪN: Luyện viết câu đàm thoại nguyên vẹn để xây dựng phản xạ ngữ pháp và nối từ thành câu hoàn chỉnh.
              </div>
              ${rowsHTML}
            </div>
          </div>
          ${buildPageFooterHTML()}
        </div>
      `);
    }

    return pages;
  }

  /**
   * Trang Đáp Án Tra Cứu (Answer Key)
   */
  function generateAnswerKeyPage(lessonInfo, words, cfg, pageBoxStyle) {
    return `
      <div class="worksheet-page" style="${pageBoxStyle}">
        <div>
          ${buildPageHeaderHTML(lessonInfo, '{{PAGE_NUM}}', '{{TOTAL_PAGES}}', cfg, 'Bảng Tra Cứu Đáp Án & Tự Chấm Điểm')}
          <div style="margin-top: 8px;">
            <div style="font-size: 12px; font-weight: 900; color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 10px;">
              🔑 BẢNG ĐÁP ÁN TRA CỨU & TỰ CHẤM ĐIỂM (ANSWER KEY)
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
              ${words.map((w, i) => `
                <div style="font-size: 10px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; display: flex; justify-content: space-between;">
                  <span><b>${i + 1}. ${w.hanzi}</b> <span style="color: #0284c7; font-family: monospace;">[${w.pinyin}]</span></span>
                  <span style="color: #475569;">${w.meaning}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        ${buildPageFooterHTML()}
      </div>
    `;
  }

  /**
   * Render Preview A4 và nạp vào vùng in
   */
  function renderWorksheetPreview() {
    const previewContainer = document.getElementById('worksheet-preview-container');
    const badge = document.getElementById('worksheet-page-count-badge');
    if (!previewContainer) return;

    const cfg = window.WORKSHEET_CONFIG;
    const lessonInfo = getLessonInfo(cfg.lessonId);
    const words = getLessonWords(cfg.lessonId);

    // Kích thước cố định khổ A4 với padding chuẩn: Trên/Dưới 1.7cm, Trái/Phải 2.0cm
    const pageBoxStyle = `
      width: 210mm; 
      min-height: 297mm; 
      background: #ffffff; 
      padding: 1.7cm 2.0cm; 
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); 
      border-radius: 4px; 
      box-sizing: border-box; 
      display: flex; 
      flex-direction: column; 
      justify-content: space-between;
    `;

    const activeTemplates = (Array.isArray(cfg.templates) && cfg.templates.length > 0)
      ? cfg.templates
      : [cfg.template || 'mizige'];

    // Sắp xếp các mẫu theo trình tự học chuẩn: Ô Mễ -> Pinyin -> Dịch nghĩa -> Nhớ chữ -> Chép thoại
    const standardOrder = ['mizige', 'pinyin', 'meaning', 'hanzi_recall', 'dialogue'];
    const sortedTemplates = standardOrder.filter(t => activeTemplates.includes(t));
    if (sortedTemplates.length === 0) {
      sortedTemplates.push('mizige');
    }

    let rawPages = [];

    sortedTemplates.forEach((t) => {
      if (t === 'mizige') {
        rawPages.push(...generateMizigePages(lessonInfo, words, cfg, pageBoxStyle));
      } else if (t === 'pinyin') {
        rawPages.push(...generatePinyinPages(lessonInfo, words, cfg, pageBoxStyle));
      } else if (t === 'meaning') {
        rawPages.push(...generateMeaningPages(lessonInfo, words, cfg, pageBoxStyle));
      } else if (t === 'hanzi_recall') {
        rawPages.push(...generateHanziRecallPages(lessonInfo, words, cfg, pageBoxStyle));
      } else if (t === 'dialogue') {
        rawPages.push(...generateDialoguePages(lessonInfo, cfg, pageBoxStyle));
      }
    });

    // Trang Đáp Án (Nếu được bật)
    if (cfg.includeAnswerKey) {
      rawPages.push(generateAnswerKeyPage(lessonInfo, words, cfg, pageBoxStyle));
    }

    // Đánh số trang tuần tự chính xác trên toàn bộ tài liệu PDF (Trang X / N)
    const totalPages = rawPages.length;
    const finalPagesHTML = rawPages.map((pageHtml, idx) => {
      return pageHtml
        .replaceAll('{{PAGE_NUM}}', String(idx + 1))
        .replaceAll('{{TOTAL_PAGES}}', String(totalPages));
    });

    if (badge) {
      const tmplCount = sortedTemplates.length;
      const countNote = tmplCount > 1 ? ` (${tmplCount} mẫu bài tập gộp vào 1 PDF)` : '';
      badge.textContent = `${totalPages} Trang A4${countNote}`;
      badge.className = totalPages === 1 
        ? "px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono font-bold"
        : "px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono font-bold";
    }

    previewContainer.innerHTML = finalPagesHTML.join('');
  }

  function executePrintWorksheet() {
    let printContainer = document.getElementById('printable-worksheet');
    if (!printContainer) {
      printContainer = document.createElement('div');
      printContainer.id = 'printable-worksheet';
      document.body.appendChild(printContainer);
    }

    const previewContainer = document.getElementById('worksheet-preview-container');
    if (!previewContainer) return;

    printContainer.innerHTML = previewContainer.innerHTML;

    setTimeout(() => {
      window.print();
    }, 150);
  }

  // Export ra window
  window.openPrintModal = openPrintModal;
  window.closePrintModal = closePrintModal;
  window.updateWorksheetOption = updateWorksheetOption;
  window.executePrintWorksheet = executePrintWorksheet;
  window.toggleWorksheetTemplate = toggleWorksheetTemplate;
  window.quickSelectWorksheetTemplates = quickSelectWorksheetTemplates;
})();
