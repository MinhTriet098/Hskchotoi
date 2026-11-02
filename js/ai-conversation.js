/**
 * ==============================================================================
 * HỘI THOẠI THỰC TẾ AI (REAL-LIFE CONVERSATION COACH) - HSK 1 CHUẨN 3.0
 * ==============================================================================
 * Trò chuyện đối đáp 2 chiều như người thật với nhân vật bản xứ cho toàn bộ 15 bài học
 * Bắt lỗi phát âm chi tiết từng chữ (Thanh mẫu, Vận mẫu, Thanh điệu) qua Micro
 * ==============================================================================
 */

(function() {
  'use strict';

  // KHO KỊCH BẢN ĐÀM THOẠI THỰC TẾ 15 BÀI HỌC HSK 1
  const REAL_CONVERSATIONS = [
    {
      lessonId: 1,
      title: "Làm quen với AI Tiểu Ngữ",
      persona: {
        name: "AI 小语 (Tiểu Ngữ)",
        role: "Trợ giảng tiếng Trung thông minh",
        avatar: "🤖",
        bgColor: "from-blue-600 to-indigo-600"
      },
      scenario: "Buổi học tiếng Trung đầu tiên, trợ giảng AI Tiểu Ngữ chào đón và làm quen với bạn.",
      turns: [
        {
          aiText: "你好！欢迎学习汉语！",
          aiPy: "Nǐ hǎo! Huānyíng xuéxí hànyǔ!",
          aiVi: "Chào bạn! Chào mừng bạn đến với việc học tiếng Trung!",
          expectedReplies: [
            {
              hanzi: "你好！",
              pinyin: "Nǐ hǎo!",
              vi: "Chào bạn!",
              aiFollowUp: "你今天忙吗？(Hôm nay bạn có bận không?)"
            },
            {
              hanzi: "老师好！",
              pinyin: "Lǎoshī hǎo!",
              vi: "Chào cô giáo!",
              aiFollowUp: "你好！叫我小语就可以啦！你今天忙吗？(Chào bạn, gọi tôi là Tiểu Ngữ là được rồi! Hôm nay bạn có bận không?)"
            }
          ]
        },
        {
          aiText: "你今天忙吗？",
          aiPy: "Nǐ jīntiān máng ma?",
          aiVi: "Hôm nay bạn có bận không?",
          expectedReplies: [
            {
              hanzi: "我不忙。",
              pinyin: "Wǒ bù máng.",
              vi: "Tôi không bận.",
              aiFollowUp: "太好了！那我们一起学习吧！谢谢你的努力！"
            },
            {
              hanzi: "我很忙。",
              pinyin: "Wǒ hěn máng.",
              vi: "Tôi rất bận.",
              aiFollowUp: "辛苦啦！虽然很忙，但每天学一点点就会进步很大哦！"
            }
          ]
        },
        {
          aiText: "谢谢你的努力！今天学得很棒！再见！",
          aiPy: "Xièxie nǐ de nǔlì! Jīntiān xué de hěn bàng! Zàijiàn!",
          aiVi: "Cảm ơn sự nỗ lực của bạn! Hôm nay học rất giỏi! Tạm biệt nhé!",
          expectedReplies: [
            {
              hanzi: "不客气，再见！",
              pinyin: "Bú kèqi, zàijiàn!",
              vi: "Không có gì, tạm biệt!",
              aiFollowUp: "再见！明天见！"
            },
            {
              hanzi: "谢谢老师，再见！",
              pinyin: "Xièxie lǎoshī, zàijiàn!",
              vi: "Cảm ơn cô, tạm biệt!",
              aiFollowUp: "再见！明天见！"
            }
          ]
        }
      ]
    },
    {
      lessonId: 2,
      title: "Làm quen bạn mới ở trường",
      persona: {
        name: "李文 (Lý Văn)",
        role: "Sinh viên năm nhất đại học",
        avatar: "👦",
        bgColor: "from-emerald-600 to-teal-600"
      },
      scenario: "Giờ giải lao ở hành lang lớp học, bạn sinh viên Trung Quốc Lý Văn bước đến chào và hỏi tên bạn.",
      turns: [
        {
          aiText: "你好！请问，你叫什么名字？",
          aiPy: "Nǐ hǎo! Qǐngwèn, nǐ jiào shénme míngzi?",
          aiVi: "Chào bạn! Xin hỏi, bạn tên là gì?",
          expectedReplies: [
            {
              hanzi: "我叫阮文敏。",
              pinyin: "Wǒ jiào Ruǎn Wénmǐn.",
              vi: "Tôi tên là Nguyễn Văn Mẫn. (Hoặc tên của bạn)",
              aiFollowUp: "很好听的名字！很高兴认识你！"
            },
            {
              hanzi: "我叫李文。",
              pinyin: "Wǒ jiào Lǐ Wén.",
              vi: "Tôi tên là Lý Văn.",
              aiFollowUp: "哇，我们的名字一样！太有缘了！很高兴认识你！"
            }
          ]
        },
        {
          aiText: "认识你我也很高兴！你是学生吗？",
          aiPy: "Rènshi nǐ wǒ yě hěn gāoxìng! Nǐ shì xuésheng ma?",
          aiVi: "Quen biết bạn tôi cũng rất vui! Bạn là sinh viên phải không?",
          expectedReplies: [
            {
              hanzi: "是，我是学生。",
              pinyin: "Shì, wǒ shì xuésheng.",
              vi: "Vâng, tôi là sinh viên.",
              aiFollowUp: "我也是学生！以后我们经常一起聊天吧！"
            },
            {
              hanzi: "我不是学生，我工作了。",
              pinyin: "Wǒ bú shì xuésheng, wǒ gōngzuò le.",
              vi: "Tôi không phải học sinh, tôi đi làm rồi.",
              aiFollowUp: "哇，很厉害！以后请多指教！"
            }
          ]
        },
        {
          aiText: "上课铃响了，我先回教室了，再见！",
          aiPy: "Shàngkè líng xiǎng le, wǒ xiān huí jiàoshì le, zàijiàn!",
          aiVi: "Chuông vào lớp reo rồi, tôi về phòng học trước nhé, tạm biệt!",
          expectedReplies: [
            {
              hanzi: "好，再见！",
              pinyin: "Hǎo, zàijiàn!",
              vi: "Được, tạm biệt!",
              aiFollowUp: "再见！"
            }
          ]
        }
      ]
    },
    {
      lessonId: 3,
      title: "Giao lưu với du học sinh quốc tế",
      persona: {
        name: "大卫 (David)",
        role: "Du học sinh nước ngoài",
        avatar: "👱‍♂️",
        bgColor: "from-indigo-600 to-purple-600"
      },
      scenario: "Trong phòng sinh hoạt chung, du học sinh David bắt chuyện hỏi thăm quốc tịch của bạn.",
      turns: [
        {
          aiText: "你好！我叫大卫，我是美国人。你是哪国人？",
          aiPy: "Nǐ hǎo! Wǒ jiào Dàwèi, wǒ shì Měiguórén. Nǐ shì nǎ guó rén?",
          aiVi: "Chào bạn! Tôi tên là David, tôi là người Mỹ. Bạn là người nước nào?",
          expectedReplies: [
            {
              hanzi: "我是越南人。",
              pinyin: "Wǒ shì Yuènánrén.",
              vi: "Tôi là người Việt Nam.",
              aiFollowUp: "越南！我去过河内，那里的风景很美，菜也很好吃！"
            },
            {
              hanzi: "我是中国人。",
              pinyin: "Wǒ shì Zhōngguórén.",
              vi: "Tôi là người Trung Quốc.",
              aiFollowUp: "太好了！你的汉语一定非常棒！"
            }
          ]
        },
        {
          aiText: "你觉得学中文难吗？",
          aiPy: "Nǐ juéde xué zhōngwén nán ma?",
          aiVi: "Bạn thấy học tiếng Trung có khó không?",
          expectedReplies: [
            {
              hanzi: "汉语不难，很有意思。",
              pinyin: "Hànyǔ bù nán, hěn yǒu yìsi.",
              vi: "Tiếng Trung không khó, rất thú vị.",
              aiFollowUp: "我也觉得汉字很有意思！我们一起加油！"
            },
            {
              hanzi: "汉字有点儿难。",
              pinyin: "Hànzì yǒudiǎnr nán.",
              vi: "Chữ Hán có chút khó.",
              aiFollowUp: "没关系，多写多练就会慢慢记住的！"
            }
          ]
        }
      ]
    },
    {
      lessonId: 4,
      title: "Tâm sự gia đình với đồng nghiệp",
      persona: {
        name: "王丽 (Vương Lệ)",
        role: "Đồng nghiệp thân thiện",
        avatar: "👩‍💼",
        bgColor: "from-rose-600 to-pink-600"
      },
      scenario: "Giờ nghỉ trưa ở công ty, đồng nghiệp Vương Lệ cùng bạn uống cà phê và hỏi thăm chuyện gia đình.",
      turns: [
        {
          aiText: "王敏，你家有几口人？",
          aiPy: "Wáng Mǐn, nǐ jiā yǒu jǐ kǒu rén?",
          aiVi: "Vương Mẫn ơi, nhà bạn có mấy người?",
          expectedReplies: [
            {
              hanzi: "我家有四口人。",
              pinyin: "Wǒ jiā yǒu sì kǒu rén.",
              vi: "Nhà tôi có 4 người.",
              aiFollowUp: "都有谁呢？(Gồm có những ai thế?)"
            },
            {
              hanzi: "我家有三口人。",
              pinyin: "Wǒ jiā yǒu sān kǒu rén.",
              vi: "Nhà tôi có 3 người.",
              aiFollowUp: "都有谁呢？(Gồm có những ai thế?)"
            }
          ]
        },
        {
          aiText: "你家都有谁呢？",
          aiPy: "Nǐ jiā dōu yǒu shéi ne?",
          aiVi: "Nhà bạn gồm những ai thế?",
          expectedReplies: [
            {
              hanzi: "爸爸、妈妈和我。",
              pinyin: "Bàba, māma hé wǒ.",
              vi: "Bố, mẹ và tôi.",
              aiFollowUp: "很温馨的三口之家！你爸爸妈妈身体好吗？"
            },
            {
              hanzi: "爸爸、妈妈、哥哥和我。",
              pinyin: "Bàba, māma, gēge hé wǒ.",
              vi: "Bố, mẹ, anh trai và tôi.",
              aiFollowUp: "有哥哥真好！你哥哥多大了？"
            }
          ]
        },
        {
          aiText: "你平时工作忙吗？",
          aiPy: "Nǐ píngshí gōngzuò máng ma?",
          aiVi: "Bình thường bạn đi làm có bận không?",
          expectedReplies: [
            {
              hanzi: "我很忙，但是很高兴。",
              pinyin: "Wǒ hěn máng, dànshì hěn gāoxìng.",
              vi: "Tôi rất bận, nhưng rất vui.",
              aiFollowUp: "心态真棒！工作之余也要好好照顾身体哦！"
            },
            {
              hanzi: "工作不太忙。",
              pinyin: "Gōngzuò bú tài máng.",
              vi: "Công việc không bận lắm.",
              aiFollowUp: "太羡慕你啦！有空多出来聚聚！"
            }
          ]
        }
      ]
    },
    {
      lessonId: 5,
      title: "Hẹn lịch đi siêu thị mua sắm",
      persona: {
        name: "张亮 (Trương Lượng)",
        role: "Bạn thân hẹn đi chơi",
        avatar: "🧑‍💻",
        bgColor: "from-amber-600 to-orange-600"
      },
      scenario: "Bạn thân Trương Lượng nhắn tin hỏi ngày tháng và lịch nghỉ để rủ bạn đi siêu thị mua đồ mới.",
      turns: [
        {
          aiText: "嗨！今天几月几号？",
          aiPy: "Hāi! Jīntiān jǐ yuè jǐ hào?",
          aiVi: "Ê bạn! Hôm nay là ngày mấy tháng mấy vậy?",
          expectedReplies: [
            {
              hanzi: "今天10月5号。",
              pinyin: "Jīntiān shí yuè wǔ hào.",
              vi: "Hôm nay ngày 5 tháng 10.",
              aiFollowUp: "啊，时间过得真快！你哪天休息？"
            },
            {
              hanzi: "今天星期四。",
              pinyin: "Jīntiān xīngqīsì.",
              vi: "Hôm nay là thứ Năm.",
              aiFollowUp: "对哦！那这周你哪天休息？"
            }
          ]
        },
        {
          aiText: "你哪天休息？",
          aiPy: "Nǐ nǎ tiān xiūxi?",
          aiVi: "Bạn ngày nào được nghỉ?",
          expectedReplies: [
            {
              hanzi: "我星期四休息。",
              pinyin: "Wǒ xīngqīsì xiūxi.",
              vi: "Tôi được nghỉ vào thứ Năm.",
              aiFollowUp: "星期四我也休息！你去超市买东西吗？"
            },
            {
              hanzi: "我星期六休息。",
              pinyin: "Wǒ xīngqīliù xiūxi.",
              vi: "Tôi được nghỉ vào thứ Bảy.",
              aiFollowUp: "星期六好啊！星期六我们去超市逛逛吗？"
            }
          ]
        },
        {
          aiText: "你去超市买东西吗？我想买一台新电脑！",
          aiPy: "Nǐ qù chāoshì mǎi dōngxi ma? Wǒ xiǎng mǎi yì tái xīn diànnǎo!",
          aiVi: "Bạn có đi siêu thị mua sắm không? Tôi muốn mua một chiếc máy tính mới!",
          expectedReplies: [
            {
              hanzi: "去，我也想买东西。",
              pinyin: "Qù, wǒ yě xiǎng mǎi dōngxi.",
              vi: "Đi chứ, tôi cũng muốn mua đồ.",
              aiFollowUp: "太棒啦！新电脑真好看，那我们休息日见！"
            },
            {
              hanzi: "我不去，我想在家休息。",
              pinyin: "Wǒ bú qù, wǒ xiǎng zài jiā xiūxi.",
              vi: "Tôi không đi đâu, tôi muốn ở nhà nghỉ ngơi.",
              aiFollowUp: "好吧，那你在家好好休息，下次再约！"
            }
          ]
        }
      ]
    },
    {
      lessonId: 6,
      title: "Hẹn đi ăn cơm & hỏi số điện thoại",
      persona: {
        name: "白家月 (Bạch Gia Nguyệt)",
        role: "Bạn cùng lớp đại học",
        avatar: "👩‍🎓",
        bgColor: "from-cyan-600 to-blue-600"
      },
      scenario: "Bạch Gia Nguyệt muốn xin số điện thoại của bạn và bàn cách đi đến nhà hàng Tây An ăn trưa.",
      turns: [
        {
          aiText: "请问，你的手机号是多少？",
          aiPy: "Qǐngwèn, nǐ de shǒujī hào shì duōshao?",
          aiVi: "Xin hỏi, số điện thoại của bạn là bao nhiêu?",
          expectedReplies: [
            {
              hanzi: "我的手机号是13800138000。",
              pinyin: "Wǒ de shǒujī hào shì yāo sān bā líng líng yāo sān bā líng líng líng.",
              vi: "Số điện thoại của tôi là 13800138000.",
              aiFollowUp: "好，我记下了！中午我们一起去西安饭店吃饭吧！"
            },
            {
              hanzi: "我的电话是987654321。",
              pinyin: "Wǒ de diànhuà shì jiǔ bā qī liù wǔ sì sān èr yāo.",
              vi: "Số điện thoại của tôi là 987654321.",
              aiFollowUp: "好的！中午我们一起去饭店吃饭吧！"
            }
          ]
        },
        {
          aiText: "你怎么去西安饭店？",
          aiPy: "Nǐ zěnme qù Xī'ān Fàndiàn?",
          aiVi: "Bạn đi đến nhà hàng Tây An bằng phương tiện gì?",
          expectedReplies: [
            {
              hanzi: "我坐出租车去。",
              pinyin: "Wǒ zuò chūzūchē qù.",
              vi: "Tôi đi taxi đến đó.",
              aiFollowUp: "那我们一起打车吧，更快！"
            },
            {
              hanzi: "我坐公交车去。",
              pinyin: "Wǒ zuò gōngjiāochē qù.",
              vi: "Tôi đi xe buýt đến đó.",
              aiFollowUp: "好呀，绿色出行，很环保！"
            }
          ]
        }
      ]
    }
  ];

  // Trạng thái phiên đàm thoại hiện tại
  let currentSession = {
    lessonId: 1,
    turnIndex: 0,
    chatHistory: [], // [{ sender: 'ai'|'user', hanzi, pinyin, vi, score, passed, diagnosis }]
    isRecording: false,
    selectedBranch: null,
    speechRec: null
  };

  /**
   * Mở Modal Đàm Thoại AI Thực Tế
   * @param {number} lessonId 
   */
  function openRealConversationModal(lessonId = null) {
    const targetLessonId = lessonId || window.currentLessonId || 1;
    initConversationSession(targetLessonId);

    const modal = document.getElementById('ai-conversation-modal');
    if (!modal) {
      createConversationModalDOM();
    }

    renderConversationUI();

    const m = document.getElementById('ai-conversation-modal');
    if (m) m.classList.remove('hidden');

    // Chào câu đầu tiên
    triggerAITurn();
  }

  function closeRealConversationModal() {
    stopConversationSpeech();
    const m = document.getElementById('ai-conversation-modal');
    if (m) m.classList.add('hidden');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function initConversationSession(lessonId) {
    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === lessonId) || REAL_CONVERSATIONS[0];
    currentSession = {
      lessonId: convoData.lessonId,
      turnIndex: 0,
      chatHistory: [],
      isRecording: false,
      selectedBranch: convoData.turns[0]?.expectedReplies[0] || null,
      speechRec: null
    };
  }

  function createConversationModalDOM() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'ai-conversation-modal';
    modalDiv.className = 'fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto hidden';
    modalDiv.innerHTML = `
      <div class="w-full max-w-4xl max-h-[96vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Header: Avatar Nhân vật & Trạng thái -->
        <div class="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div id="ai-persona-avatar-box" class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg ring-2 ring-blue-500/30">
              🤖
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 id="ai-persona-name" class="text-base font-black text-white">AI 小语</h3>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Đang trực tuyến
                </span>
              </div>
              <p id="ai-scenario-desc" class="text-xs text-slate-400 mt-0.5 line-clamp-1">Tình huống đàm thoại thực tế theo bài học</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- Chọn bài học nhanh -->
            <select id="ai-convo-lesson-select" onchange="switchConversationLesson(parseInt(this.value))" class="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              ${REAL_CONVERSATIONS.map(c => `
                <option value="${c.lessonId}" ${c.lessonId === currentSession.lessonId ? 'selected' : ''}>
                  Bài ${c.lessonId}: ${c.title}
                </option>
              `).join('')}
            </select>

            <button onclick="restartConversation()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all" title="Bắt đầu lại cuộc trò chuyện">
              🔄
            </button>
            <button onclick="closeRealConversationModal()" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all">
              ✕
            </button>
          </div>
        </div>

        <!-- Khung Cuộc Trò Chuyện (Chat Bubbles Scrollable) -->
        <div id="ai-chat-messages-container" class="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60 min-h-[300px] max-h-[50vh]">
          <!-- Render tin nhắn qua renderChatMessages() -->
        </div>

        <!-- Khung Điều Khiển Tương Tác Dưới Cùng (Luyện Nói & Chẩn Đoán Lỗi) -->
        <div class="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 space-y-3.5 flex-shrink-0" id="ai-convo-input-panel">
          <!-- Render qua renderInputPanel() -->
        </div>

      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  function renderConversationUI() {
    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === currentSession.lessonId) || REAL_CONVERSATIONS[0];
    
    // Cập nhật Header
    const nameEl = document.getElementById('ai-persona-name');
    const avatarEl = document.getElementById('ai-persona-avatar-box');
    const descEl = document.getElementById('ai-scenario-desc');
    const selectEl = document.getElementById('ai-convo-lesson-select');

    if (nameEl) nameEl.textContent = convoData.persona.name;
    if (avatarEl) {
      avatarEl.textContent = convoData.persona.avatar;
      avatarEl.className = `w-12 h-12 rounded-2xl bg-gradient-to-tr ${convoData.persona.bgColor} text-white flex items-center justify-center text-2xl shadow-lg ring-2 ring-blue-500/30`;
    }
    if (descEl) descEl.textContent = convoData.scenario;
    if (selectEl) selectEl.value = convoData.lessonId;

    renderChatMessages();
    renderInputPanel();
  }

  function renderChatMessages() {
    const container = document.getElementById('ai-chat-messages-container');
    if (!container) return;

    if (currentSession.chatHistory.length === 0) {
      container.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
          <span class="text-4xl animate-bounce">💬</span>
          <p class="text-sm font-semibold">Đang kết nối cuộc trò chuyện với bạn người bản xứ...</p>
        </div>
      `;
      return;
    }

    container.innerHTML = currentSession.chatHistory.map((msg, idx) => {
      const isAI = msg.sender === 'ai';
      return `
        <div class="flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200">
          ${isAI ? `
            <div class="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 text-lg flex items-center justify-center flex-shrink-0 shadow-md">
              🤖
            </div>
          ` : ''}

          <div class="max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 ${isAI ? 'bg-slate-900 border border-slate-800 text-white rounded-tl-sm' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-lg shadow-blue-600/20'} space-y-1.5">
            <div class="flex items-center justify-between gap-3">
              <span class="text-xs font-bold ${isAI ? 'text-cyan-400' : 'text-blue-200'}">
                ${isAI ? 'Bạn người bản xứ' : 'Bạn (Học viên)'}
              </span>
              <button onclick="speakChinese('${msg.hanzi}')" class="text-xs ${isAI ? 'text-slate-400 hover:text-white' : 'text-blue-200 hover:text-white'} flex items-center gap-1" title="Nghe câu này">
                🔊
              </button>
            </div>

            <!-- Câu Hán tự to nét -->
            <p class="text-xl sm:text-2xl font-black chinese-font leading-snug tracking-wide">${msg.hanzi}</p>
            <p class="text-xs font-mono font-bold ${isAI ? 'text-cyan-300' : 'text-blue-100'}">${msg.pinyin}</p>
            <p class="text-[11px] ${isAI ? 'text-slate-400' : 'text-blue-100/90'} italic pt-0.5 border-t ${isAI ? 'border-slate-800' : 'border-blue-500/50'}">
              "${msg.vi}"
            </p>

            ${!isAI && msg.score !== undefined ? `
              <div class="pt-1.5 flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-black ${msg.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
                  ${msg.passed ? '✅ Phát âm đạt chuẩn' : '⚠️ Cần phát âm rõ hơn'}: ${msg.score}đ
                </span>
              </div>
            ` : ''}
          </div>

          ${!isAI ? `
            <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-md">
              👤
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Tự động cuộn xuống tin nhắn mới nhất
    container.scrollTop = container.scrollHeight;
  }

  /**
   * AI phát biểu lượt thoại
   */
  function triggerAITurn() {
    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === currentSession.lessonId);
    if (!convoData) return;

    const currentTurn = convoData.turns[currentSession.turnIndex];
    if (!currentTurn) {
      // Đã hoàn thành toàn bộ kịch bản!
      currentSession.chatHistory.push({
        sender: 'ai',
        hanzi: "太棒了！今天的对话练习圆满完成！你进步非常大！",
        pinyin: "Tài bàng le! Jīntiān de duìhuà liànxí yuánmǎn wánchéng! Nǐ jìnbù fēicháng dà!",
        vi: "Xuất sắc! Bài luyện tập đối thoại hôm nay đã hoàn thành trọn vẹn! Bạn tiến bộ rất lớn!"
      });
      renderChatMessages();
      renderInputPanel();
      speakChinese("太棒了！今天的对话练习圆满完成！");
      return;
    }

    currentSession.chatHistory.push({
      sender: 'ai',
      hanzi: currentTurn.aiText,
      pinyin: currentTurn.aiPy,
      vi: currentTurn.aiVi
    });

    currentSession.selectedBranch = currentTurn.expectedReplies[0] || null;

    renderChatMessages();
    renderInputPanel();

    setTimeout(() => {
      speakChinese(currentTurn.aiText);
    }, 300);
  }

  /**
   * Render bảng điều khiển nhập giọng nói & chẩn đoán lỗi
   */
  function renderInputPanel() {
    const panel = document.getElementById('ai-convo-input-panel');
    if (!panel) return;

    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === currentSession.lessonId);
    const currentTurn = convoData?.turns[currentSession.turnIndex];

    if (!currentTurn) {
      panel.innerHTML = `
        <div class="text-center py-2 space-y-3">
          <p class="text-emerald-400 font-extrabold text-sm flex items-center justify-center gap-2">
            <span>🎉</span> Chúc mừng bạn đã hoàn thành xuất sắc cuộc đối thoại đời thực!
          </p>
          <div class="flex items-center justify-center gap-3">
            <button onclick="restartConversation()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all">
              🔄 Luyện lại cuộc trò chuyện này
            </button>
            <button onclick="switchConversationLesson(currentSession.lessonId + 1)" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all">
              Bài tiếp theo ▶
            </button>
          </div>
        </div>
      `;
      return;
    }

    const branch = currentSession.selectedBranch || currentTurn.expectedReplies[0];

    panel.innerHTML = `
      <!-- Gợi ý các nhánh câu trả lời thực tế -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-400 font-bold flex items-center gap-1.5">
            <span>💡</span> Chọn hướng trả lời của bạn:
          </span>
          <span class="text-[11px] text-amber-400">Bấm câu bạn muốn nói rồi giữ Mic</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${currentTurn.expectedReplies.map((r, idx) => {
            const isSelected = branch && branch.hanzi === r.hanzi;
            return `
              <button onclick="selectConversationBranch(${idx})" class="p-3 rounded-2xl text-left border transition-all ${isSelected ? 'bg-blue-950/80 border-blue-500 text-white shadow-md shadow-blue-500/20' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-black chinese-font text-white">${r.hanzi}</span>
                  <span class="text-[10px] font-mono text-cyan-300 font-bold">${r.pinyin}</span>
                </div>
                <div class="text-[11px] text-slate-400 mt-0.5 italic">"${r.vi}"</div>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Khung Thu Âm & Bắt Lỗi Phát Âm -->
      <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div class="flex items-center gap-3">
          <!-- Nút Micro lớn -->
          <button id="convo-mic-btn" onclick="toggleConversationRecording()" class="w-14 h-14 rounded-full ${currentSession.isRecording ? 'bg-red-600 animate-pulse ring-8 ring-red-500/30' : 'bg-gradient-to-tr from-blue-600 to-indigo-600 hover:scale-105 active:scale-95'} text-white flex items-center justify-center text-2xl shadow-xl transition-all flex-shrink-0">
            ${currentSession.isRecording ? '⏹️' : '🎙️'}
          </button>
          <div>
            <p id="convo-mic-status" class="text-xs font-bold text-white">
              ${currentSession.isRecording ? 'Đang lắng nghe giọng bạn nói...' : 'Bấm Micro và đọc to câu tiếng Trung ở trên'}
            </p>
            <p class="text-[11px] text-slate-400 mt-0.5">
              Mục tiêu đọc: <b class="text-cyan-300 font-mono">${branch ? branch.hanzi : ''}</b> (${branch ? branch.pinyin : ''})
            </p>
          </div>
        </div>

        <!-- Các nút bổ trợ: Nghe câu mẫu, Bỏ qua / Tiếp tục -->
        <div class="flex items-center gap-2 self-end sm:self-auto">
          <button onclick="speakChinese('${branch ? branch.hanzi : ''}')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm">
            <span>🔊</span> Nghe mẫu
          </button>
          <button onclick="manualPassConversationTurn()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-950/80 hover:border-emerald-500/50 text-slate-400 hover:text-emerald-300 text-xs font-bold border border-slate-700 transition-all" title="Bỏ qua thu âm và cho câu này đúng">
            <span>Bỏ qua ▶</span>
          </button>
        </div>

      </div>

      <!-- Khung hiển thị chẩn đoán lỗi phát âm chi tiết (Ẩn/Hiện động) -->
      <div id="convo-diagnose-result-box" class="hidden"></div>
    `;
  }

  function selectConversationBranch(idx) {
    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === currentSession.lessonId);
    const currentTurn = convoData?.turns[currentSession.turnIndex];
    if (!currentTurn) return;

    currentSession.selectedBranch = currentTurn.expectedReplies[idx];
    renderInputPanel();
  }

  /**
   * Bật / Tắt thu âm nhận diện giọng nói
   */
  function toggleConversationRecording() {
    if (currentSession.isRecording) {
      stopConversationSpeech();
    } else {
      startConversationSpeech();
    }
  }

  function startConversationSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API. Vui lòng dùng Chrome, Edge hoặc Safari trên iPad.");
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'zh-CN';
      rec.continuous = false;
      rec.interimResults = false;

      currentSession.speechRec = rec;
      currentSession.isRecording = true;

      const micBtn = document.getElementById('convo-mic-btn');
      const micStatus = document.getElementById('convo-mic-status');
      if (micBtn) micBtn.className = "w-14 h-14 rounded-full bg-red-600 animate-pulse ring-8 ring-red-500/30 text-white flex items-center justify-center text-2xl shadow-xl transition-all flex-shrink-0";
      if (micStatus) micStatus.textContent = "Đang lắng nghe... Hãy nói to câu tiếng Trung!";

      rec.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        console.log("Nhận diện tiếng Trung:", spokenText);
        handleUserSpokenResult(spokenText);
      };

      rec.onerror = function(event) {
        console.warn("Lỗi nhận diện âm thanh:", event.error);
        stopConversationSpeech();
        const micStatus = document.getElementById('convo-mic-status');
        if (micStatus) micStatus.textContent = "Không thu được âm thanh. Vui lòng bấm Micro và nói lại!";
      };

      rec.onend = function() {
        stopConversationSpeech();
      };

      rec.start();
    } catch (err) {
      console.error("Không thể khởi động SpeechRecognition:", err);
      stopConversationSpeech();
    }
  }

  function stopConversationSpeech() {
    currentSession.isRecording = false;
    if (currentSession.speechRec) {
      try { currentSession.speechRec.stop(); } catch(e) {}
      currentSession.speechRec = null;
    }

    const micBtn = document.getElementById('convo-mic-btn');
    const micStatus = document.getElementById('convo-mic-status');
    if (micBtn) micBtn.className = "w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-xl transition-all flex-shrink-0";
    if (micStatus) micStatus.textContent = "Bấm Micro và đọc to câu tiếng Trung ở trên";
  }

  /**
   * Chẩn đoán và bắt lỗi phát âm từ chuỗi người học nói
   */
  function handleUserSpokenResult(spokenText) {
    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === currentSession.lessonId);
    const currentTurn = convoData?.turns[currentSession.turnIndex];
    if (!currentTurn) return;

    const branch = currentSession.selectedBranch || currentTurn.expectedReplies[0];
    const targetHanzi = branch.hanzi;
    const targetPinyin = branch.pinyin;

    // Sử dụng module chẩn đoán lỗi âm vị học bách khoa nếu có
    let diagnosis = null;
    if (typeof window.diagnoseSpeechDetails === 'function') {
      try {
        diagnosis = window.diagnoseSpeechDetails(targetHanzi, targetPinyin, spokenText);
      } catch (e) {
        console.warn("Lỗi diagnoseSpeechDetails:", e);
      }
    }

    // Nếu không có, so sánh trực tiếp
    const cleanTarget = targetHanzi.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
    const cleanSpoken = (spokenText || "").replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
    const isPassed = diagnosis ? diagnosis.isPassed : (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken));
    const score = diagnosis ? diagnosis.score : (isPassed ? 95 : 55);

    // Hiển thị bảng bắt lỗi chi tiết
    renderDiagnosisBox(targetHanzi, targetPinyin, spokenText, score, isPassed, diagnosis);

    if (isPassed) {
      // Thành công! Thêm vào lịch sử chat
      setTimeout(() => {
        currentSession.chatHistory.push({
          sender: 'user',
          hanzi: targetHanzi,
          pinyin: targetPinyin,
          vi: branch.vi,
          score: score,
          passed: true
        });

        currentSession.turnIndex++;
        renderChatMessages();

        // AI đối đáp tiếp
        setTimeout(() => {
          triggerAITurn();
        }, 800);
      }, 1500);
    }
  }

  /**
   * Render hộp chẩn đoán lỗi phát âm chi tiết
   */
  function renderDiagnosisBox(targetHanzi, targetPinyin, spokenText, score, isPassed, diagnosis) {
    const box = document.getElementById('convo-diagnose-result-box');
    if (!box) return;

    box.classList.remove('hidden');

    let errorsHTML = '';
    if (diagnosis && diagnosis.errorPoints && diagnosis.errorPoints.length > 0) {
      errorsHTML = `
        <div class="mt-2 space-y-1 text-xs">
          ${diagnosis.errorPoints.map(err => `
            <div class="p-2 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200">
              ${err}
            </div>
          `).join('')}
        </div>
      `;
    }

    box.innerHTML = `
      <div class="p-3.5 rounded-2xl ${isPassed ? 'bg-emerald-950/60 border-emerald-500/50' : 'bg-rose-950/60 border-rose-500/50'} border text-xs space-y-2 animate-in fade-in duration-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 font-bold ${isPassed ? 'text-emerald-300' : 'text-rose-300'}">
            <span>${isPassed ? '🎉' : '⚠️'}</span>
            <span>${isPassed ? 'Phát âm rất tốt! (+10đ)' : 'Phát âm chưa chuẩn, cần luyện lại:'}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full font-mono font-black ${isPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">
            Điểm: ${score}/100
          </span>
        </div>

        <div class="text-slate-300">
          <span>Bạn vừa đọc:</span> <b class="text-white">"${spokenText || '(Chưa nghe rõ)'}"</b>
          <span class="mx-1">•</span>
          <span>Mẫu chuẩn:</span> <b class="text-cyan-300 font-mono">${targetHanzi}</b>
        </div>

        ${errorsHTML}

        ${!isPassed ? `
          <div class="pt-1 flex items-center justify-end gap-2">
            <button onclick="speakChinese('${targetHanzi}', 0.75)" class="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1">
              🐢 Nghe mẫu chậm 0.75x
            </button>
            <button onclick="startConversationSpeech()" class="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-rose-600/30">
              🎤 Bấm để đọc lại
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  function manualPassConversationTurn() {
    const convoData = REAL_CONVERSATIONS.find(c => c.lessonId === currentSession.lessonId);
    const currentTurn = convoData?.turns[currentSession.turnIndex];
    if (!currentTurn) return;

    const branch = currentSession.selectedBranch || currentTurn.expectedReplies[0];

    currentSession.chatHistory.push({
      sender: 'user',
      hanzi: branch.hanzi,
      pinyin: branch.pinyin,
      vi: branch.vi,
      score: 100,
      passed: true
    });

    currentSession.turnIndex++;
    renderChatMessages();

    setTimeout(() => {
      triggerAITurn();
    }, 600);
  }

  function restartConversation() {
    initConversationSession(currentSession.lessonId);
    renderConversationUI();
    triggerAITurn();
  }

  function switchConversationLesson(newLessonId) {
    if (newLessonId < 1) newLessonId = 1;
    if (newLessonId > 15) newLessonId = 15;
    initConversationSession(newLessonId);
    renderConversationUI();
    triggerAITurn();
  }

  window.openRealConversationModal = openRealConversationModal;
  window.closeRealConversationModal = closeRealConversationModal;
  window.toggleConversationRecording = toggleConversationRecording;
  window.selectConversationBranch = selectConversationBranch;
  window.manualPassConversationTurn = manualPassConversationTurn;
  window.restartConversation = restartConversation;
  window.switchConversationLesson = switchConversationLesson;
})();
