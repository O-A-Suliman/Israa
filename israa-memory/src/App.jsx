import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-pastel-bg">
    <motion.div
      animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-pastel-yellow/50 blur-[120px]"
    />
    <motion.div
      animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-[30%] -right-[20%] w-[50vw] h-[50vw] rounded-full bg-pastel-green/20 blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-pastel-beige/60 blur-[90px]"
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
  <div className={`bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(122,139,118,0.05)] rounded-3xl p-8 md:p-12 ${className}`}>
    {children}
  </div>
);

// --- قسم الأسئلة التفاعلي ---
const PsychologicalQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const questions = [
    {
      text: "هل تدركين أن وجودك يمثل فارقاً حقيقياً وملحوظاً في حياة من حولك؟",
      expected: true,
      errorMsg: "إجابة خاطئة! وجودك هو الفارق نفسه، ومافي زول بيقدر ينكر ده."
    },
    {
      text: "هل تصدقين أن ابتسامتك قادرة على تغيير مزاج المكان وتخلي الدنيا تنور؟",
      expected: true,
      errorMsg: "غلط يا إسراء! ضحكتك دي براها عالم تاني وتفاصيلها بتشفي الروح."
    },
    {
      text: "هل تشكين أحياناً في أنك شخصية استثنائية وتستحقين كل هذا الحب؟",
      expected: false,
      errorMsg: "إجابة خاطئة ومرفوضة تماماً! إنتي أروع وأعظم من إنك تشكي في نفسك ولو للحظة."
    }
  ];

  const handleAnswer = (answer) => {
    if (answer !== questions[currentQ].expected) {
      setFeedback({ type: 'error', text: questions[currentQ].errorMsg });
    } else {
      setFeedback({ type: 'success', text: "إجابة صحيحة... لأنك فعلاً كده وأكتر!" });
      setTimeout(() => {
        setFeedback(null);
        if (currentQ < questions.length - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          setFeedback({ type: 'done', text: "اكتملت الأسئلة! ودائماً خليك متذكرة إنك حاجة ما بتتكرر." });
        }
      }, 2000);
    }
  };

  return (
    <GlassCard className="max-w-2xl text-center w-full relative overflow-hidden">
      <h3 className="text-2xl text-pastel-green mb-8 flex items-center justify-center gap-2">
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
              <p className="text-xl md:text-2xl text-pastel-text leading-relaxed">
                {questions[currentQ].text}
              </p>
              <div className="flex justify-center gap-6">
                <button onClick={() => handleAnswer(true)} className="px-8 py-3 rounded-full bg-pastel-green text-white hover:bg-pastel-green/80 transition-all shadow-md">نعم</button>
                <button onClick={() => handleAnswer(false)} className="px-8 py-3 rounded-full bg-red-400/80 text-white hover:bg-red-400 transition-all shadow-md">لا</button>
              </div>
            </motion.div>
          ) : feedback.type === 'done' ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl text-pastel-green"
            >
              {feedback.text}
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`text-xl md:text-2xl p-6 rounded-2xl border ${
                feedback.type === 'error' 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : 'bg-green-50 text-pastel-green border-green-200'
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="text-pastel-text font-arabic selection:bg-pastel-yellow selection:text-pastel-green relative" dir="rtl">
      <DreamyBackground />

      <audio ref={audioRef} loop>
        <source src="/river-flows.mp3" type="audio/mpeg" />
      </audio>
      
      <button 
        onClick={toggleMusic}
        className="fixed top-8 left-8 z-50 p-4 bg-white/50 backdrop-blur-md border border-white/50 shadow-sm rounded-full text-pastel-green hover:bg-white/80 transition-all duration-500 hover:scale-105"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* 1. القسم الافتتاحي */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-english tracking-widest pointer-events-none select-none"
        >
          Israa
        </motion.div>
        
        <GlassCard className="max-w-3xl text-center relative z-10">
          <div className="w-10 h-[1px] bg-pastel-green/50 mx-auto mb-8"></div>
          <p className="text-2xl md:text-4xl leading-[2.5] text-pastel-text/90">
            “هناك أرواح لا تُشبه الضجيج... <br />
            <span className="text-pastel-green font-bold">تمشي بهدوء</span>، لكنها تترك أثرًا يشبه الطمأنينة.”
          </p>
          <div className="w-10 h-[1px] bg-pastel-green/50 mx-auto mt-8"></div>
        </GlassCard>
      </Section>

      {/* 2. قسم الرسالة السودانية (كلام من القلب) */}
      <Section>
        <GlassCard className="max-w-4xl text-center relative overflow-hidden bg-pastel-yellow/10">
          <Heart className="absolute top-4 right-4 text-pastel-green/20" size={80} />
          <h2 className="text-3xl text-pastel-green font-bold mb-6">يا بنية زي القمر..</h2>
          <p className="text-2xl md:text-3xl leading-loose text-pastel-text/90 mb-8">
            "يا إسراء يا بت الأصول، يا السمحة سماحة ما عادية. إنتي حاجة كدة بتشبه الدعاش بعد المطر، روحك طيبة وحضورك برد الروح. كلامك درر، وضحكتك بتنور الدنيا كلها."
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-pastel-green font-bold bg-white/50 inline-block px-6 py-3 rounded-2xl border border-white">
            وصحبتك <span className="text-pastel-text text-3xl">"أبرار"</span> بتقول ليك: <br />
            "أنا فخورة بيك شديد، فخورة بقلبك الأبيض، وبكل خطوة بتخطيها، إنتي نعمة في حياة أي زول بيعرفك!"
          </p>
        </GlassCard>
      </Section>

      {/* 3. قسم الغزل الرومانسي العميق */}
      <Section>
        <div className="max-w-3xl text-center space-y-16">
          <Quote className="mx-auto text-pastel-green/50 mb-6" size={40} />
          
          <p className="text-3xl md:text-4xl leading-[2.2] text-pastel-text">
            "أنتِ لستِ مجرد امرأة تمر في البال... <br />
            أنتِ القصيدة التي يتعثر فيها لساني، <br />
            وتفاصيلكِ فتنة تربك نبض القلب."
          </p>
          
          <div className="flex justify-center gap-3 opacity-50">
            <span className="w-2 h-2 rounded-full bg-pastel-green"></span>
            <span className="w-2 h-2 rounded-full bg-pastel-green"></span>
            <span className="w-2 h-2 rounded-full bg-pastel-green"></span>
          </div>

          <p className="text-3xl md:text-4xl leading-[2.2] text-pastel-green">
            "ملامحكِ في سكونها تثير عواصف الحب، <br />
            وعيناكِ بحرٌ بلا شطآن، من نظر إليها غرق طوعاً، <br />
            يا سيدةَ الحسن، ويا كل أشواقي."
          </p>
        </div>
      </Section>

      {/* 4. قسم الأسئلة النفسية */}
      <Section>
        <PsychologicalQuiz />
      </Section>

      {/* 5. قسم الاهتمامات */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-sm tracking-[0.3em] text-pastel-green/70 mb-4 font-english uppercase">Aesthetics</h2>
          <div className="w-px h-12 bg-pastel-green/30 mx-auto"></div>
        </div>
        <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl">
          {[
            { icon: Leaf, label: "الطبيعة" },
            { icon: Snowflake, label: "الشتاء" },
            { icon: Footprints, label: "المشي" },
            { icon: PenTool, label: "التطريز" },
            { icon: Home, label: "الونس" }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeUp} className="group relative bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-3xl flex flex-col items-center gap-6 hover:bg-white/60 transition-colors duration-500">
              <div className="p-4 rounded-full bg-pastel-bg/80 text-pastel-green group-hover:scale-110 transition-transform duration-500">
                <item.icon size={32} strokeWidth={1} />
              </div>
              <span className="text-xl">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 6. قسم الأحلام */}
      <Section>
        <GlassCard className="max-w-3xl w-full text-right">
          <h3 className="text-2xl text-pastel-green mb-8 border-b border-pastel-green/20 pb-4 inline-block">أمنيات وطموحات..</h3>
          <motion.ul variants={staggerContainer} className="space-y-6 text-xl md:text-2xl text-pastel-text/90 mt-6">
            {[
              "زيارة مكة المكرمة والشعور بالسكينة هناك",
              "السفر والعيش في الخارج لاكتشاف مساحات جديدة للنمو",
              "بناء مسار مهني حقيقي يشبه شغفها",
              "ترك أثر دافئ وإيجابي في كل روح تمر بها"
            ].map((dream, index) => (
              <motion.li key={index} variants={fadeUp} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pastel-green/10 flex items-center justify-center text-pastel-green text-sm mt-1">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{dream}</span>
              </motion.li>
            ))}
          </motion.ul>
        </GlassCard>
      </Section>

      {/* 7. الخاتمة */}
      <Section className="pb-32">
        <div className="text-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-16 bg-gradient-to-b from-pastel-green/50 to-transparent mx-auto mb-12"
          ></motion.div>
          <p className="text-2xl md:text-4xl leading-[2.2] max-w-2xl text-pastel-green">
            “ما زالت الحياة لوحة لم تكتمل... <br />
            لكن بعض الألوان فيها تشبهكِ، <br />
            <span className="text-pastel-text">هادئة، دافئة، وتمنح المعنى دون كلام.</span>”
          </p>
        </div>
      </Section>

    </div>
  );
}