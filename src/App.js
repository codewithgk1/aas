import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

// Typewriter component for left-to-right typing effect
const Typewriter = ({ text, speed = 25, onDone }) => {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  
  // Function to create synthetic typing sound
  const playTypingSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a brief click sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.01);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.02);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.02);
    } catch (e) {
      // Silently handle any audio context issues
      console.log('Audio not supported:', e);
    }
  };
  
  useEffect(() => {
    setDisplayed("");
    setIsDone(false);
    if (!text) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      
      // Play typing sound for each character (skip spaces for more realistic effect)
      if (text[i] && text[i] !== ' ') {
        playTypingSound();
      }
      
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsDone(true);
        if (onDone) onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone]);
  
  return (
    <span>
      {displayed}
      <span className={`typewriter-cursor${isDone ? " done" : ""}`}>|</span>
    </span>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setCurrentParagraph(0); // Reset paragraph when section changes
  }, [currentSection]);

  const sections = [
    {
      id: "who-we-are",
      title: "I. WHO WE ARE",
      content: `The Anti-Alien Society is not a cult. It is not a community. It is not a theory group. It is a classified intelligence structure built to recognize, intercept, and dismantle psychological, spiritual, and biological manipulation programs run by non-human entities operating within our domain.

We are not skeptics. We are not believers. We are the pattern that forms when no one explains the pattern. You are not here by accident. You are here because something didn't track — and you didn't file it away. That doesn't make you lost. That makes you early.`,
    },
    {
      id: "our-position",
      title: "II. OUR POSITION",
      content: `We are not anti-spiritual.
We are pro-discernment.
We recognize that this war is not just in the skies — it is in the psyche, the symbol, the myth, and the memory.
We do not oppose awakening.
We oppose co-opted awakening.
We do not reject the possibility of higher intelligence.
We reject intelligence that demands obedience in the name of light.

We believe in:
• The reality of soul
• The reality of contact
• The danger of spiritual programming`,
    },
    {
      id: "what-we-do",
      title: "III. WHAT WE DO",
      content: `We strip language from lies.
We extract memory from trauma.
We break signals wrapped in light.

We train agents to:
• Detect behavioral engineering
• Identify alien belief systems posing as insight
• Shield the mind, the will, and the internal compass from false alignment

We are not trying to prove aliens exist. We are operating under the assumption that they do — and that they are not being honest.`,
    },
    {
      id: "your-status",
      title: "IV. YOUR STATUS",
      content: `You have been issued gear. You have aligned with a division.
This is not a symbolic gesture — it is a system response.
Your INITIATE sequence has begun.
This file is your first clarity checkpoint.

This is not onboarding. This is activation.`,
    },
    {
      id: "our-creed",
      title: "V. OUR CREED",
      content: `We believe awe is not an answer. We believe discernment is a spiritual act. We believe truth is not a vibe — it's a structure. We believe clarity isn't cruelty — it's defense. And we believe that if you're still asking questions, you're already one of us.`,
    },
    {
      id: "final-directive",
      title: "VI. FINAL DIRECTIVE",
      content: `This is not a brand.
This is not a club.
This is not a warning.
This is a declaration:

We are not waiting for the light.
We are checking what it's plugged into.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="app">
      <div className="background-grid"></div>

      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.header className="header" variants={titleVariants}>
          <h1 className="main-title">ANTI-ALIEN SOCIETY</h1>
          <div className="subtitle">CLASSIFIED INTELLIGENCE STRUCTURE</div>
        </motion.header>

        <nav className="navigation">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`nav-button ${
                currentSection === index ? "active" : ""
              }`}
              onClick={() => setCurrentSection(index)}
            >
              {section.title.split(".")[0]}
            </button>
          ))}
        </nav>

        <motion.div
          className="content"
          key={currentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sections[currentSection].title}
          </motion.h2>

          <motion.div
            className="section-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {sections[currentSection].content
              .split("\n")
              .map((paragraph, index) => {
                if (index < currentParagraph) {
                  // Already typed, show as plain text
                  return (
                    <p key={index} className="paragraph">
                      {paragraph}
                    </p>
                  );
                } else if (index === currentParagraph) {
                  // Currently typing
                  return (
                    <p key={index} className="paragraph">
                      <Typewriter
                        key={currentSection + "-" + index}
                        text={paragraph}
                        speed={36}
                        onDone={() => setCurrentParagraph((p) => p + 1)}
                      />
                    </p>
                  );
                } else {
                  // Not yet typed
                  return <p key={index} className="paragraph"></p>;
                }
              })}
          </motion.div>
        </motion.div>

        <motion.footer className="footer" variants={titleVariants}>
          <div className="status-line">
            <span className="status-indicator">●</span>
            <span className="status-text">SYSTEM ACTIVE</span>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default App;
