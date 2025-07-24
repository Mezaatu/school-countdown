import React, { useState, useEffect } from "react";
import "./App.css";

const TERM_END = new Date("2025-12-12T15:30:00+09:30"); // Example: End of term (Adelaide timezone)
const YEAR_END = new Date("2025-12-31T23:59:59+10:30"); // End of year (Adelaide timezone)

function getTimeRemaining(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function getEndOfDay() {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
}

function CountdownCard({
  title,
  targetDate,
  gradient,
  icon,
}: {
  title: string;
  targetDate: Date;
  gradient: string;
  icon: string;
}) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className="countdown-card"
      style={{
        background: gradient,
      }}
    >
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <span className="card-title">{title}</span>
      </div>
      <div className="card-timer">
        <div className="timer-group">
          <span className="timer-num">{timeLeft.days}</span>
          <span className="timer-label">days</span>
        </div>
        <div className="timer-group">
          <span className="timer-num">{timeLeft.hours}</span>
          <span className="timer-label">hrs</span>
        </div>
        <div className="timer-group">
          <span className="timer-num">{timeLeft.minutes}</span>
          <span className="timer-label">min</span>
        </div>
        <div className="timer-group">
          <span className="timer-num">{timeLeft.seconds}</span>
          <span className="timer-label">sec</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="main-bg">
      <div className="title-area">
        <h1>Adelaide School Countdown</h1>
        <p>Highschool/Middleschool 2025</p>
      </div>
      <div className="cards-wrapper">
        <CountdownCard
          title="End of the Day"
          targetDate={getEndOfDay()}
          gradient="linear-gradient(135deg, #72edf2 0%, #5151e5 100%)"
          icon="🌅"
        />
        <CountdownCard
          title="End of the Term"
          targetDate={TERM_END}
          gradient="linear-gradient(135deg, #fcb69f 0%, #ff6e7f 100%)"
          icon="🎓"
        />
        <CountdownCard
          title="End of the Year"
          targetDate={YEAR_END}
          gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          icon="🎉"
        />
      </div>
      <footer>
        <span>Made with 💖 for Adelaide Schools - 2025</span>
      </footer>
    </div>
  );
}

export default App;
