import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from './assets/hero.png';
import { Leaf, Snowflake, Footprints, PenTool, Home, Play, Pause, Quote, Heart, Sparkles } from 'lucide-react';

// --- حركات الدخول ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- الخلفية الحالمة ---
const DreamyBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#fbfaf6]">
    <motion.div
      animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#fdf5e6]/50 blur-[120px]"
    />
    <motion.div
      animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-[30%] -right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#e8eedd]/40 blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#fff0f5]/60 blur-[90px]"
    />
  </div>
);

const Section = ({ children, className = "" }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeUp}
    className={`min-h-screen flex flex-col justify-center items-center px-6 py-20 relative ${className}`}
  >
    {children}
  </motion.section>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(255,182,193,0.1)] rounded-[2rem] p-8 md:p-12 ${className}`}>
    {children}
  </div>
);

// --- قسم الأسئلة المدمج (النفسية + اللطيفة) ---
const CombinedQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const questions = [
    {
      text: "هل تدركين أن وجودك يمثل فارقاً حقيقياً وملحوظاً في حياة من حولك؟",
      options: ["نعم", "لا"],
      expected: "نعم",
      successMsg: "إجابة صحيحة... لأنك فعلاً كده وأكتر!",
      errorMsg: "إجابة خاطئة! وجودك هو الفارق نفسه، ومافي زول بيقدر ينكر ده."
    },
    {
      text: "هل تصدقين أن ابتسامتك قادرة على تغيير مزاج المكان وتخلي الدنيا تنور؟",
      options: ["نعم", "لا"],
      expected: "نعم",
      successMsg: "أكيد صح! ضحكتك حياة.",
      errorMsg: "غلط يا إسراء! ضحكتك دي براها عالم تاني وتفاصيلها بتشفي الروح."
    },
    {
      text: "هل تشكين أحياناً في أنك شخصية استثنائية وتستحقين كل هذا الحب؟",
      options: ["نعم", "لا"],
      expected: "لا",
      successMsg: "بالضبط! خليك دايماً واثقة من قيمتك.",
      errorMsg: "إجابة خاطئة ومرفوضة تماماً! إنتي أروع وأعظم من إنك تشكي في نفسك ولو للحظة."
    },
    {
      text: "نجي للجد بقى.. مين احلى كتوت؟",
      options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
      expected: "أنا 🙋‍♀️",
      successMsg: "أكيد إنتي يا أحلى كتوت! 🌸",
      errorMsg: "غلط! طبعاً إنتي احلى كتوت بدون نقاش."
    },
    {
      text: "مين اشطر وحده؟",
      options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
      expected: "أنا 🙋‍♀️",
      successMsg: "شطورة وذكية دايماً! ✨",
      errorMsg: "لا طبعاً، إنتي أشطر وحدة ومفيش زيك!"
    },
    {
      text: "مين امزز بت؟",
      options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
      expected: "أنا 🙋‍♀️",
      successMsg: "مزز المزز كمان! 😎",
      errorMsg: "غلط! مفيش امزز منك أصلاً."
    },
    {
      text: "مين البت الحتحقق احلامها؟",
      options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
      expected: "أنا 🙋‍♀️",
      successMsg: "بإذن الله حتحققي كل أحلامك وأكتر! 🌟",
      errorMsg: "لا حتحققيها غصباً عن أي حاجة، خليك واثقة!"
    },
    {
      text: "مين البت البحبوها الناس؟",
      options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
      expected: "أنا 🙋‍♀️",
      successMsg: "كلنا بنحبك يا صبو! ❤️",
      errorMsg: "غلط! الناس كلها بتحبك وبتموت فيك."
    }
  ];

  const handleAnswer = (answer) => {
    const q = questions[currentQ];
    if (answer !== q.expected) {
      setFeedback({ type: 'error', text: q.errorMsg });
    } else {
      setFeedback({ type: 'success', text: q.successMsg });
      setTimeout(() => {
        setFeedback(null);
        if (currentQ < questions.length - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          setFeedback({ type: 'done', text: "اكتملت الأسئلة! ودائماً خليك متذكرة إنك ميكس رهيب بين العمق واللطافة 🌸✨" });
        }
      }, 2000);
    }
  };

  return (
    <GlassCard className="max-w-2xl text-center w-full relative overflow-hidden">
      <h3 className="text-2xl text-[#7a8b76] mb-8 flex items-center justify-center gap-2">
        <Sparkles size={24} /> مواجهة مع الذات <Sparkles size={24} />
      </h3>

      <div className="min-h-[150px] flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 w-full"
            >
              <p className="text-xl md:text-2xl text-[#4a4a4a] leading-relaxed font-bold">
                {questions[currentQ].text}
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {questions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className={`px-8 py-3 rounded-full text-white transition-all shadow-md font-semibold text-lg ${
                      opt.includes('لا') || opt.includes('مش أنا')
                        ? 'bg-red-400/80 hover:bg-red-400'
                        : 'bg-[#ff9cbd] hover:bg-[#ff7aa3]' // لون وردي للأزرار الإيجابية
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : feedback.type === 'done' ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl text-[#ff7aa3] font-bold leading-relaxed"
            >
              {feedback.text}
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`text-xl md:text-2xl p-6 rounded-2xl border font-semibold ${
                feedback.type === 'error'
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-pink-50 text-[#ff7aa3] border-pink-200'
              }`}
            >
              {feedback.text}
              {feedback.type === 'error' && (
                <button
                  onClick={() => setFeedback(null)}
                  className="block mx-auto mt-4 text-sm underline opacity-80 hover:opacity-100"
                >
                  حاولي مرة أخرى
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

export default function App() {
  // حالة لمعرفة هل بدأنا التصفح ولا لسة
  const [isStarted, setIsStarted] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // دالة تشغيل الموقع والموسيقى لما نضغط على الزر
  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const saboTraits = [
    "البت الجميلة والطيبة والمهذبة",
    "إنتِ قدوة لكل البنات",
    "واضح ليه كل الناس بتحبك",
    "طيبة ما بتحبي تشوفي زول زعلان",
    "اجتماعية لدرجة بعيدة",
    "عندك قبول في أي حتة",
    "إنتِ من أفضل البنات وأجملهم",
    "يا بخت صحباتك بيك جداً",
    "ما حصل يوم استسلمتي أبداً",
    "دائماً بنشوفك محاربة وصامدة",
    "كله كوم وجمالك دا كوم تاني"
  ];

  const soulBeauty = [
    { trait: "مرحة", emoji: "✨" },
    { trait: "اجتماعية", emoji: "🌸" },
    { trait: "طيبة", emoji: "🤍" },
    { trait: "قوية", emoji: "💪" },
    { trait: "حنونة", emoji: "🤗" },
    { trait: "قبول رهيب", emoji: "🌟" }
  ];

  // ==========================================
  // 1. صفحة البداية (تظهر فقط لو isStarted = false)
  // ==========================================
  if (!isStarted) {
    return (
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center font-arabic relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        dir="rtl"
      >
        {/* طبقة شفافة لتوضيح النص فوق الصورة */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

        <div className="relative z-10 bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-2xl text-center border border-white/50 mx-4">
          <h1 className="text-3xl md:text-5xl text-[#ff7aa3] font-bold mb-8 leading-relaxed">
            أهلاً بكِ في مكانكِ الخاص.. <br/> حيث كل تفصيلة هنا صُممت لتشبه رقتكِ وجمالكِ ✨
          </h1>
          <button 
            onClick={handleStart}
            className="bg-[#ff7aa3] hover:bg-[#e91e63] text-white text-xl md:text-2xl font-bold py-4 px-10 rounded-full shadow-[0_4px_15px_rgba(255,122,163,0.4)] transition-all duration-300 hover:scale-105"
          >
            الى اجمل بت في العالم
          </button>
          
          {/* عنصر الموسيقى مخفي هنا عشان يتحمل ويكون جاهز */}
          <audio ref={audioRef} loop>
            <source src="/river-flows.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. باقي صفحات الموقع (تظهر بمجرد الضغط على الزر)
  // ==========================================
  return (
    <div className="text-[#4a4a4a] font-arabic selection:bg-[#fff0f5] selection:text-[#ff7aa3] relative" dir="rtl">
      <DreamyBackground />

      <audio ref={audioRef} loop>
        <source src="/river-flows.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-8 left-8 z-50 p-4 bg-white/80 backdrop-blur-md border border-white shadow-sm rounded-full text-[#ff7aa3] hover:bg-white transition-all duration-500 hover:scale-105"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* القسم الافتتاحي */}
      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-english tracking-widest pointer-events-none select-none text-[#ff7aa3]"
        >
          Israa
        </motion.div>

        <GlassCard className="max-w-3xl text-center relative z-10">
          <div className="w-10 h-[1px] bg-[#ff7aa3]/50 mx-auto mb-8"></div>
          <p className="text-2xl md:text-4xl leading-[2.5] text-[#4a4a4a]/90">
            “هناك أرواح لا تُشبه الضجيج... <br />
            <span className="text-[#ff7aa3] font-bold">تمشي بهدوء</span>، لكنها تترك أثرًا يشبه الطمأنينة.”
          </p>
          <div className="w-10 h-[1px] bg-[#ff7aa3]/50 mx-auto mt-8"></div>
        </GlassCard>
      </Section>

      {/* قسم صبو يا صبو */}
      <Section>
        <div className="text-center mb-10 flex items-center justify-center gap-4">
          <Heart className="text-[#ff7aa3] fill-[#ff7aa3]" size={36} />
          <h2 className="text-4xl md:text-5xl font-bold text-[#ff7aa3]">اسراء يا اسراء</h2>
          <Heart className="text-[#ff7aa3] fill-[#ff7aa3]" size={36} />
        </div>
        
        <GlassCard className="max-w-2xl w-full bg-white/90">
          <motion.ul className="space-y-6 text-xl md:text-2xl text-[#4a4a4a] font-semibold text-center">
            {saboTraits.map((trait, index) => (
              <motion.li key={index} className="flex items-center justify-center gap-3">
                <span className="leading-relaxed">{trait}</span>
                <span className="text-2xl">🌸</span>
              </motion.li>
            ))}
          </motion.ul>
        </GlassCard>
      </Section>

      {/* قسم جمال الروح */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff7aa3] flex items-center justify-center gap-2">
            جزء بسيط من جمال روحك ✨
          </h2>
        </div>
        
        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          {soulBeauty.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-[0_4px_20px_rgba(255,182,193,0.15)] hover:shadow-[0_8px_30px_rgba(255,182,193,0.25)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="text-5xl">{item.emoji}</span>
              <span className="text-2xl font-bold text-[#4a4a4a]">{item.trait}</span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* قسم الرسالة */}
      <Section>
        <GlassCard className="max-w-4xl text-center relative overflow-hidden bg-[#fff0f5]/40 border-pink-100">
          <Heart className="absolute top-4 right-4 text-[#ff7aa3]/20" size={80} />
          <h2 className="text-3xl text-[#ff7aa3] font-bold mb-6">يا بنية زي القمر..</h2>
          <p className="text-2xl md:text-3xl leading-loose text-[#4a4a4a]/90 mb-8">
            "يا إسراء يا بت الأصول، يا السمحة سماحة ما عادية. إنتي حاجة كدة بتشبه الدعاش بعد المطر، روحك طيبة وحضورك برد الروح. كلامك درر، وضحكتك بتنور الدنيا كلها."
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-[#ff7aa3] font-bold bg-white/70 inline-block px-6 py-3 rounded-2xl border border-white">
            وصحبتك <span className="text-[#4a4a4a] text-3xl">"أبرار"</span> بتقول ليك: <br />
            "أنا فخورة بيك شديد، فخورة بقلبك الأبيض، وبكل خطوة بتخطيها، إنتي نعمة في حياة أي زول بيعرفك!"
          </p>
        </GlassCard>
      </Section>

      {/* قسم الغزل */}
      <Section>
        <div className="max-w-3xl text-center space-y-16">
          <Quote className="mx-auto text-[#ff7aa3]/50 mb-6" size={40} />

          <p className="text-3xl md:text-4xl leading-[2.2] text-[#4a4a4a]">
            "أنتِ لستِ مجرد امرأة تمر في البال... <br />
            أنتِ القصيدة التي يتعثر فيها لساني، <br />
            وتفاصيلكِ فتنة تربك نبض القلب."
          </p>

          <div className="flex justify-center gap-3 opacity-50">
            <span className="w-2 h-2 rounded-full bg-[#ff7aa3]"></span>
            <span className="w-2 h-2 rounded-full bg-[#ff7aa3]"></span>
            <span className="w-2 h-2 rounded-full bg-[#ff7aa3]"></span>
          </div>

          <p className="text-3xl md:text-4xl leading-[2.2] text-[#ff7aa3]">
            "ملامحكِ في سكونها تثير عواصف الحب، <br />
            وعيناكِ بحرٌ بلا شطآن، من نظر إليها غرق طوعاً، <br />
            يا سيدةَ الحسن، ويا كل أشواقي."
          </p>
        </div>
      </Section>

      {/* قسم الأسئلة */}
      <Section>
        <CombinedQuiz />
      </Section>

      {/* الخاتمة */}
      <Section className="pb-32">
        <div className="text-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-16 bg-gradient-to-b from-[#ff7aa3]/50 to-transparent mx-auto mb-12"
          ></motion.div>
          <p className="text-2xl md:text-4xl leading-[2.2] max-w-2xl text-[#ff7aa3]">
            “ما زالت الحياة لوحة لم تكتمل... <br />
            لكن بعض الألوان فيها تشبهكِ، <br />
            <span className="text-[#4a4a4a]">هادئة، دافئة، وتمنح المعنى دون كلام.</span>”
          </p>
        </div>
      </Section>

    </div>
  );
}