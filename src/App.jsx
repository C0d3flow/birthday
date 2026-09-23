import { useState } from "react";
import "./App.css";

import birthdayBackground from "./assets/birthday-background.png";
import envelopeImage from "./assets/envelope.png";
import voucherImage from "./assets/voucher.png";
import {
  playClick,
  playShake,
  playWhoosh,
  playCelebration,
} from "./sounds";

function App() {
  // idle -> shaking -> zooming -> voucher
  const [stage, setStage] = useState("idle");

  const openEnvelope = () => {
    if (stage !== "idle") return;

    // TAP
    playClick();

    // SHAKE
    setStage("shaking");
    playShake();

    // ZOOM
    setTimeout(() => {
      setStage("zooming");
      playWhoosh();
    }, 650);

    // CONFETTI + VOUCHER
    setTimeout(() => {
      setStage("voucher");
      playCelebration();
    }, 1450);
  };

  const showEnvelope =
    stage === "idle" ||
    stage === "shaking" ||
    stage === "zooming";

  return (
    <main
      className={`birthday-page stage-${stage}`}
      style={{
        backgroundImage: `url(${birthdayBackground})`,
      }}
    >
      <div className="background-overlay" />

      <section className="gift-area">
        {showEnvelope && (
          <button
            className={`envelope-button envelope-${stage}`}
            onClick={openEnvelope}
            aria-label="Geburtstagsbrief öffnen"
          >
            <img
              className="envelope-image"
              src={envelopeImage}
              alt="Geburtstagsbrief"
            />
          </button>
        )}

        {stage === "idle" && (
          <div className="tap-hint">
            <span>Tippe auf den Brief!</span>
            <span className="tap-hand">👆</span>
          </div>
        )}

        {(stage === "zooming" || stage === "voucher") && (
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, index) => (
              <span
                key={index}
                className={`confetti-piece confetti-${index % 7}`}
                style={{
                  "--i": index,
                  "--angle": `${(360 / 28) * index}deg`,
                  "--distance": `${130 + (index % 5) * 25}px`,
                  "--delay": `${(index % 4) * 30}ms`,
                }}
              />
            ))}
          </div>
        )}

        {stage === "voucher" && (
          <div className="voucher-reveal">
            <img
              src={voucherImage}
              alt="Geburtstagsgutschein für Emil"
              className="voucher-image"
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default App;