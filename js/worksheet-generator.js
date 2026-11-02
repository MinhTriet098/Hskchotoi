/**
 * ==============================================================================
 * XƯỞNG IN VỞ LUYỆN CHỮ & BÀI TẬP TỰ VIẾT A4 (WORKSHEET GENERATOR)
 * ==============================================================================
 * Hỗ trợ xuất file PDF và In ấn trực tiếp khổ giấy A4 dọc tiêu chuẩn:
 *  1. ✍️ Vở luyện chữ Hán Ô Mễ Tự Cách (米字格) / Ô Điền (田字格) có chữ đồ nét
 *  2. 🔤 Phiếu bài tập tự điền Pinyin có dấu thanh điệu
 *  3. 🇻🇳 Phiếu bài tập tự dịch nghĩa tiếng Việt & từ loại
 *  4. 🀄 Phiếu kiểm tra trí nhớ: Nhìn tiếng Việt tự viết Chữ Hán
 *  5. 💬 Vở luyện chép câu thoại & đàm thoại thực tế chuẩn SGK
 * ==============================================================================
 */

(function() {
  'use strict';

  // Trạng thái cấu hình của Xưởng In
  window.WORKSHEET_CONFIG = {
    template: 'mizige', // 'mizige' | 'pinyin' | 'meaning' | 'hanzi_recall' | 'dialogue'
    lessonId: 1,
    gridColor: 'red',   // 'red' (Đỏ truyền thống 红米格) | 'gray' (Đen xám tiết kiệm mực)
    gridStyle: 'mizige', // 'mizige' (Ô Mễ 米) | 'tianzige' (Ô Điền 田) | 'kuaige' (Ô Vuông 口)
    gridCount: 8,       // 6, 8, hoặc 10 ô luyện viết mỗi dòng
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
    }

    // Mặc định chọn tất cả từ của bài hiện tại
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

  /**
   * Lấy danh sách từ vựng theo bài
   */
  function getLessonWords(lessonId) {
    if (!window.VOCAB_DATABASE) return [];
    return window.VOCAB_DATABASE.filter(w => w.lesson_id === lessonId);
  }

  /**
   * Lấy thông tin bài học
   */
  function getLessonInfo(lessonId) {
    if (window.HSK_LESSONS) {
      const found = window.HSK_LESSONS.find(l => l.id === lessonId);
      if (found) return found;
    }
    return { id: lessonId, title: `Bài ${lessonId}`, title_vi: '' };
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
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] border border-emerald-500/40">XƯỞNG TẠO BÀI TẬP A4</span>
                <span class="text-xs text-slate-400">In Trực Tiếp / Xuất PDF</span>
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

        <!-- Thân Modal: Chia 2 Cột (Trái: Tùy chọn điều khiển, Phải: Preview A4 sống động) -->
        <div class="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          <!-- Cột Trái: Bảng điều khiển cấu hình (4 cột trên màn hình lớn) -->
          <div class="lg:col-span-4 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-slate-950/40 overflow-y-auto space-y-4" id="worksheet-controls-panel">
            <!-- Render động bằng renderWorksheetControls() -->
          </div>

          <!-- Cột Phải: Xem trước trang giấy in A4 (8 cột) -->
          <div class="lg:col-span-8 p-4 sm:p-6 bg-slate-950 overflow-y-auto flex flex-col items-center">
            <div class="w-full flex items-center justify-between pb-3 text-xs text-slate-400">
              <span class="font-bold flex items-center gap-1.5">
                <span>👁️</span> Xem trước bản in A4 (Tỷ lệ 100%)
              </span>
              <span id="worksheet-page-count-badge" class="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 font-mono font-bold">
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

      <!-- 2. CHỌN MẪU BÀI TẬP (TEMPLATE) -->
      <div class="space-y-2 pt-2 border-t border-slate-800/80">
        <label class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <span>📑</span> Chọn Mẫu Tài Liệu Muốn Tạo:
        </label>
        <div class="grid grid-cols-1 gap-2">
          
          <!-- Mẫu 1: Vở Luyện Chữ Ô Mễ -->
          <button onclick="updateWorksheetOption('template', 'mizige')" class="p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${cfg.template === 'mizige' ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-md shadow-emerald-500/10' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
            <span class="text-xl">✍️</span>
            <div>
              <p class="text-xs font-extrabold text-white">Vở Luyện Chữ Hán (Ô Mễ Tự Cách)</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Chữ mẫu + chữ mờ đồ nét + hàng ô Mễ đỏ để cầm bút viết tay chuẩn nét.</p>
            </div>
          </button>

          <!-- Mẫu 2: Phiếu Điền Pinyin -->
          <button onclick="updateWorksheetOption('template', 'pinyin')" class="p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${cfg.template === 'pinyin' ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-md shadow-cyan-500/10' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
            <span class="text-xl">🔤</span>
            <div>
              <p class="text-xs font-extrabold text-white">Phiếu Tự Điền Pinyin (Kèm Thanh Điệu)</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Cho chữ Hán, chừa 4 dòng kẻ để tự tay viết Pinyin có dấu thanh điệu.</p>
            </div>
          </button>

          <!-- Mẫu 3: Phiếu Dịch Nghĩa Tiếng Việt -->
          <button onclick="updateWorksheetOption('template', 'meaning')" class="p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${cfg.template === 'meaning' ? 'bg-blue-950/50 border-blue-500 text-white shadow-md shadow-blue-500/10' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
            <span class="text-xl">🇻🇳</span>
            <div>
              <p class="text-xs font-extrabold text-white">Phiếu Dịch Nghĩa / Dò Từ Vựng</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Cho chữ Hán & Pinyin, chừa dòng kẻ ngang để tự dịch nghĩa tiếng Việt.</p>
            </div>
          </button>

          <!-- Mẫu 4: Nhớ Mặt Chữ (Từ Tiếng Việt viết Chữ Hán) -->
          <button onclick="updateWorksheetOption('template', 'hanzi_recall')" class="p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${cfg.template === 'hanzi_recall' ? 'bg-purple-950/50 border-purple-500 text-white shadow-md shadow-purple-500/10' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
            <span class="text-xl">🀄</span>
            <div>
              <p class="text-xs font-extrabold text-white">Phiếu Viết Chữ Hán Từ Trí Nhớ</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Cho Tiếng Việt & Pinyin, chừa các ô vuông trống để tự viết Chữ Hán.</p>
            </div>
          </button>

          <!-- Mẫu 5: Luyện Chép Câu Thoại SGK -->
          <button onclick="updateWorksheetOption('template', 'dialogue')" class="p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${cfg.template === 'dialogue' ? 'bg-amber-950/50 border-amber-500 text-white shadow-md shadow-amber-500/10' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
            <span class="text-xl">💬</span>
            <div>
              <p class="text-xs font-extrabold text-white">Vở Luyện Chép Câu Thoại & Hội Thoại SGK</p>
              <p class="text-[11px] text-slate-400 mt-0.5">In câu hội thoại mẫu chuẩn SGK + 2 dòng kẻ ngang để chép cả câu.</p>
            </div>
          </button>

        </div>
      </div>

      <!-- 3. TÙY CHỌN DÀNH RIÊNG CHO VỞ LUYỆN CHỮ -->
      ${cfg.template === 'mizige' || cfg.template === 'hanzi_recall' ? `
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

          <!-- Số ô trên một dòng -->
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-400">Số ô luyện viết / dòng:</span>
            <div class="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              ${[6, 8, 10].map(cnt => `
                <button onclick="updateWorksheetOption('gridCount', ${cnt})" class="px-2.5 py-1 rounded-lg font-bold text-[11px] ${cfg.gridCount === cnt ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">
                  ${cnt} ô
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Chữ mờ đồ nét -->
          ${cfg.template === 'mizige' ? `
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

  /**
   * Cập nhật tùy chọn cấu hình và vẽ lại Preview
   */
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
   * @param {string} style 'mizige' | 'tianzige' | 'kuaige'
   * @param {string} color 'red' | 'gray'
   * @param {string} content Chữ Hán hoặc rỗng
   * @param {boolean} isWatermark Có phải chữ mờ đồ nét hay không
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

    return `
      <div class="mizige-print-cell ${isSample ? 'sample-cell' : ''} ${isWatermark ? 'watermark-cell' : ''}" style="width: 40px; height: 40px; border: 1.5px solid ${borderColor}; position: relative; display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; box-sizing: border-box; flex-shrink: 0;">
        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;" viewBox="0 0 100 100">
          ${innerSvgLines}
        </svg>
        ${content ? `
          <span style="position: relative; z-index: 2; font-family: 'LXGW WenKai Screen R', 'LXGW WenKai Screen', 'KaiTi', '楷体', 'STKaiti', serif; font-size: 26px; line-height: 1; color: ${charColor}; font-weight: ${isSample ? '700' : '400'}; user-select: none;">
            ${content}
          </span>
        ` : ''}
      </div>
    `;
  }

  /**
   * Tạo Header trang giấy A4 (Họ tên, Ngày, Điểm)
   */
  function buildPageHeaderHTML(lessonInfo, pageNum, totalPages, cfg) {
    return `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">
            Giáo Trình HSK 1 Chuẩn 3.0 • Vở Luyện Chữ & Bài Tập Tự Viết A4
          </div>
          <h1 style="font-size: 16px; font-weight: 900; color: #0f172a; margin: 2px 0 0 0;">
            Bài ${lessonInfo.id}: ${lessonInfo.title} <span style="font-size: 13px; font-weight: 500; color: #475569;">(${lessonInfo.title_vi || ''})</span>
          </h1>
        </div>

        <div style="text-align: right; font-size: 10px; font-weight: 600; color: #64748b;">
          Trang ${pageNum} / ${totalPages}
        </div>
      </div>

      ${cfg.includeHeader ? `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 12px; margin-bottom: 14px;">
          <div><b>Họ và tên:</b> ..............................................................</div>
          <div><b>Ngày luyện:</b> ..... / ..... / 202...</div>
          <div><b>Điểm số:</b> .......... / 100</div>
        </div>
      ` : ''}
    `;
  }

  /**
   * Tạo Footer trang giấy A4
   */
  function buildPageFooterHTML() {
    return `
      <div style="border-top: 1px dashed #cbd5e1; padding-top: 6px; margin-top: 12px; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8;">
        <span>HiHSK 3.0 • Hệ Thống Tự Học Tiếng Trung Toàn Diện</span>
        <span>Học - Luyện - Viết Tay Mỗi Ngày</span>
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

    let pagesHTML = [];

    // =========================================================================
    // TEMPLATE 1: VỞ LUYỆN CHỮ Ô MỄ (米字格)
    // =========================================================================
    if (cfg.template === 'mizige') {
      const ITEMS_PER_PAGE = 10; // 10 từ / trang A4
      const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE) || 1;

      for (let p = 0; p < totalPages; p++) {
        const pageWords = words.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE);

        let rowsHTML = pageWords.map((word, wIdx) => {
          const chars = Array.from(word.hanzi);
          
          return `
            <div class="no-break-inside" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 8px; margin-bottom: 8px; background-color: #ffffff; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <!-- Cột 1: Thông tin từ (Hán tự, Pinyin, Nghĩa) -->
              <div style="width: 130px; flex-shrink: 0; line-height: 1.2;">
                <div style="display: flex; align-items: baseline; gap: 6px;">
                  <span style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 20px; font-weight: 900; color: #0f172a;">${word.hanzi}</span>
                  <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #0284c7;">${word.pinyin}</span>
                </div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${word.meaning}">
                  ${word.meaning}
                </div>
              </div>

              <!-- Cột 2: Các ô Mễ Tự Cách (Mẫu + Đồ nét + Ô trống) -->
              <div style="display: flex; align-items: center; gap: 4px; flex-wrap: nowrap; overflow-x: hidden;">
                ${chars.map(c => buildGridCellHTML(cfg.gridStyle, cfg.gridColor, c, false, true)).join('')}
                ${cfg.includeWatermark ? chars.map(c => buildGridCellHTML(cfg.gridStyle, cfg.gridColor, c, true, false)).join('') : ''}
                
                <!-- Các ô trống để tự viết -->
                ${(function() {
                  let emptyCells = '';
                  const usedCount = chars.length * (cfg.includeWatermark ? 2 : 1);
                  const remaining = Math.max(0, cfg.gridCount - usedCount);
                  for (let i = 0; i < remaining; i++) {
                    emptyCells += buildGridCellHTML(cfg.gridStyle, cfg.gridColor, '', false, false);
                  }
                  return emptyCells;
                })()}
              </div>
            </div>
          `;
        }).join('');

        pagesHTML.push(`
          <div class="worksheet-page" style="width: 210mm; min-height: 297mm; background: #ffffff; padding: 12mm 10mm; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); border-radius: 4px; box-sizing: border-box; display: flex; flex-col; justify-content: space-between;">
            <div>
              ${buildPageHeaderHTML(lessonInfo, p + 1, totalPages, cfg)}
              <div style="margin-top: 8px;">
                ${rowsHTML}
              </div>
            </div>
            ${buildPageFooterHTML()}
          </div>
        `);
      }
    }

    // =========================================================================
    // TEMPLATE 2: PHIẾU ĐIỀN PINYIN
    // =========================================================================
    else if (cfg.template === 'pinyin') {
      const ITEMS_PER_PAGE = 12;
      const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE) || 1;

      for (let p = 0; p < totalPages; p++) {
        const pageWords = words.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE);

        let rowsHTML = `
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${pageWords.map((word, idx) => `
              <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 26px; font-weight: 900; color: #0f172a;">${word.hanzi}</div>
                  <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Nghĩa: ${word.meaning}</div>
                </div>
                <div style="text-align: right; width: 140px;">
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 4px;">Tự viết Pinyin kèm thanh điệu:</div>
                  <div style="border-bottom: 1.5px dashed #475569; height: 26px; width: 100%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        pagesHTML.push(`
          <div class="worksheet-page" style="width: 210mm; min-height: 297mm; background: #ffffff; padding: 12mm 10mm; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); border-radius: 4px; box-sizing: border-box; display: flex; flex-col; justify-content: space-between;">
            <div>
              ${buildPageHeaderHTML(lessonInfo, p + 1, totalPages, cfg)}
              <div style="margin-top: 10px;">
                <div style="font-size: 11px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 6px 12px; border-radius: 6px; margin-bottom: 12px;">
                  📝 HƯỚNG DẪN: Đọc chữ Hán và tự tay viết phiên âm Pinyin kèm dấu thanh điệu chuẩn xác vào dòng kẻ đứt.
                </div>
                ${rowsHTML}
              </div>
            </div>
            ${buildPageFooterHTML()}
          </div>
        `);
      }
    }

    // =========================================================================
    // TEMPLATE 3: PHIẾU DỊCH NGHĨA TIẾNG VIỆT
    // =========================================================================
    else if (cfg.template === 'meaning') {
      const ITEMS_PER_PAGE = 12;
      const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE) || 1;

      for (let p = 0; p < totalPages; p++) {
        const pageWords = words.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE);

        let rowsHTML = `
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${pageWords.map((word, idx) => `
              <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 24px; font-weight: 900; color: #0f172a;">${word.hanzi}</div>
                  <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #0284c7; margin-top: 2px;">${word.pinyin}</div>
                </div>
                <div style="text-align: right; width: 140px;">
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 4px;">Dịch nghĩa tiếng Việt:</div>
                  <div style="border-bottom: 1.5px dashed #475569; height: 26px; width: 100%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        pagesHTML.push(`
          <div class="worksheet-page" style="width: 210mm; min-height: 297mm; background: #ffffff; padding: 12mm 10mm; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); border-radius: 4px; box-sizing: border-box; display: flex; flex-col; justify-content: space-between;">
            <div>
              ${buildPageHeaderHTML(lessonInfo, p + 1, totalPages, cfg)}
              <div style="margin-top: 10px;">
                <div style="font-size: 11px; font-weight: 700; color: #15803d; background: #dcfce7; padding: 6px 12px; border-radius: 6px; margin-bottom: 12px;">
                  📝 HƯỚNG DẪN: Nhìn Chữ Hán và Pinyin, tự tay dịch nghĩa tiếng Việt tương ứng vào dòng kẻ đứt.
                </div>
                ${rowsHTML}
              </div>
            </div>
            ${buildPageFooterHTML()}
          </div>
        `);
      }
    }

    // =========================================================================
    // TEMPLATE 4: PHIẾU NHỚ MẶT CHỮ (VIẾT CHỮ HÁN TỪ TRÍ NHỚ)
    // =========================================================================
    else if (cfg.template === 'hanzi_recall') {
      const ITEMS_PER_PAGE = 10;
      const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE) || 1;

      for (let p = 0; p < totalPages; p++) {
        const pageWords = words.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE);

        let rowsHTML = pageWords.map((word, wIdx) => {
          const chars = Array.from(word.hanzi);
          return `
            <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
              <div style="width: 180px; flex-shrink: 0;">
                <div style="font-size: 13px; font-weight: 800; color: #0f172a;">${word.meaning}</div>
                <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #0284c7; margin-top: 2px;">Pinyin: ${word.pinyin}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 10px; color: #94a3b8; margin-right: 6px;">Viết Chữ Hán:</span>
                ${chars.map(() => buildGridCellHTML(cfg.gridStyle, cfg.gridColor, '', false, false)).join('')}
              </div>
            </div>
          `;
        }).join('');

        pagesHTML.push(`
          <div class="worksheet-page" style="width: 210mm; min-height: 297mm; background: #ffffff; padding: 12mm 10mm; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); border-radius: 4px; box-sizing: border-box; display: flex; flex-col; justify-content: space-between;">
            <div>
              ${buildPageHeaderHTML(lessonInfo, p + 1, totalPages, cfg)}
              <div style="margin-top: 10px;">
                <div style="font-size: 11px; font-weight: 700; color: #7e22ce; background: #f3e8ff; padding: 6px 12px; border-radius: 6px; margin-bottom: 12px;">
                  📝 HƯỚNG DẪN THỬ THÁCH: Đọc nghĩa tiếng Việt và Pinyin, tự nhớ và viết Chữ Hán chuẩn xác vào ô trống mà không nhìn tài liệu!
                </div>
                ${rowsHTML}
              </div>
            </div>
            ${buildPageFooterHTML()}
          </div>
        `);
      }
    }

    // =========================================================================
    // TEMPLATE 5: VỞ LUYỆN CHÉP CÂU THOẠI & ĐÀM THOẠI SGK
    // =========================================================================
    else if (cfg.template === 'dialogue') {
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

      const ITEMS_PER_PAGE = 6; // 6 câu thoại / trang
      const totalPages = Math.ceil(allLines.length / ITEMS_PER_PAGE) || 1;

      for (let p = 0; p < totalPages; p++) {
        const pageLines = allLines.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE);

        let rowsHTML = pageLines.map((line, lIdx) => `
          <div class="no-break-inside" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-bottom: 10px; background: #ffffff;">
            <div style="display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px; margin-bottom: 8px;">
              <span style="font-size: 10px; font-weight: 800; color: #d97706; text-transform: uppercase;">${line.dlgTitle} • ${line.role}</span>
              <span style="font-size: 11px; color: #475569; italic">"${line.vi}"</span>
            </div>
            
            <!-- Câu mẫu -->
            <div style="margin-bottom: 8px;">
              <div style="font-family: 'LXGW WenKai Screen R', 'KaiTi', '楷体', serif; font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: 0.05em;">
                ${line.hanzi}
              </div>
              <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #0284c7; margin-top: 2px;">
                ${line.pinyin}
              </div>
            </div>

            <!-- Dòng chép tay -->
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 6px;">
              <div style="font-size: 9px; color: #94a3b8; margin-bottom: 4px;">Dòng luyện chép lại câu:</div>
              <div style="border-bottom: 1.5px dashed #94a3b8; height: 28px; width: 100%;"></div>
            </div>
          </div>
        `).join('');

        pagesHTML.push(`
          <div class="worksheet-page" style="width: 210mm; min-height: 297mm; background: #ffffff; padding: 12mm 10mm; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); border-radius: 4px; box-sizing: border-box; display: flex; flex-col; justify-content: space-between;">
            <div>
              ${buildPageHeaderHTML(lessonInfo, p + 1, totalPages, cfg)}
              <div style="margin-top: 10px;">
                <div style="font-size: 11px; font-weight: 700; color: #b45309; background: #fef3c7; padding: 6px 12px; border-radius: 6px; margin-bottom: 12px;">
                  📝 HƯỚNG DẪN: Luyện viết câu đàm thoại nguyên vẹn để xây dựng phản xạ ngữ pháp và nối từ thành câu hoàn chỉnh.
                </div>
                ${rowsHTML}
              </div>
            </div>
            ${buildPageFooterHTML()}
          </div>
        `);
      }
    }

    // =========================================================================
    // TRANG ĐÁP ÁN (ANSWER KEY) Ở CUỐI NẾU ĐƯỢC CHỌN
    // =========================================================================
    if (cfg.includeAnswerKey) {
      const ansHTML = `
        <div class="worksheet-page" style="width: 210mm; min-height: 297mm; background: #ffffff; padding: 12mm 10mm; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); border-radius: 4px; box-sizing: border-box; display: flex; flex-col; justify-content: space-between;">
          <div>
            ${buildPageHeaderHTML(lessonInfo, pagesHTML.length + 1, pagesHTML.length + 1, cfg)}
            <div style="margin-top: 10px;">
              <div style="font-size: 13px; font-weight: 900; color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 12px;">
                🔑 BẢNG ĐÁP ÁN TRA CỨU & TỰ CHẤM ĐIỂM (ANSWER KEY)
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                ${words.map((w, i) => `
                  <div style="font-size: 11px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; display: flex; justify-content: space-between;">
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
      pagesHTML.push(ansHTML);
    }

    if (badge) {
      badge.textContent = `${pagesHTML.length} Trang A4`;
    }

    previewContainer.innerHTML = pagesHTML.join('');
  }

  /**
   * Kích hoạt in tài liệu (In trực tiếp máy in hoặc Lưu dạng PDF)
   */
  function executePrintWorksheet() {
    let printContainer = document.getElementById('printable-worksheet');
    if (!printContainer) {
      printContainer = document.createElement('div');
      printContainer.id = 'printable-worksheet';
      document.body.appendChild(printContainer);
    }

    // Lấy nội dung từ Preview container
    const previewContainer = document.getElementById('worksheet-preview-container');
    if (!previewContainer) return;

    printContainer.innerHTML = previewContainer.innerHTML;

    // Kích hoạt In trình duyệt
    setTimeout(() => {
      window.print();
    }, 150);
  }

  // Export các hàm toàn cục
  window.openPrintModal = openPrintModal;
  window.closePrintModal = closePrintModal;
  window.updateWorksheetOption = updateWorksheetOption;
  window.executePrintWorksheet = executePrintWorksheet;
})();
