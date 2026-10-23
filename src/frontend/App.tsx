import { useState, useEffect, type CSSProperties } from 'react'
import './App.css'

function App() {
  const [isRunning, setIsRunning] = useState(false); // Starts game cycle, including fullscreen
  const [objects, setObjects] = useState([]); // The gremlins
  const [isGameWindowActive, setIsGameWindowActive] = useState(false); // Runs ending celebration and maintains fullscreen after game end
  const startX = -50;
  const endX = window.innerWidth;
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [score, setScore] = useState(0);

  // Controls the 20-second session
  /*
  useEffect(() => {
    if (!isRunning) return;

    setSecondsLeft(20);

    
    const sessionTimer = setTimeout(() => {
      setIsRunning(false);
    }, 20000);
    
    return () => clearTimeout(sessionTimer);
  }, [isRunning]);
    */
  useEffect(() => {
    if (!isRunning) return;

    setSecondsLeft(30);

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isRunning]);

  //Keep fullscreen for another 5 seconds (ending celebration) [ENDING CELEBRATION SCRAPPED GG]
  useEffect(() => {
    if (isRunning || !isGameWindowActive) return;

    const exitTimer = setTimeout(() => {
      setIsGameWindowActive(false);
    }, 5000);

    // TODO: Change images back

  return () => clearTimeout(exitTimer);
  }, [isRunning, isGameWindowActive]);

  // Spawns objects while the session is active
  useEffect(() => {
    if (!isRunning) return;

    const spawnTimer = setInterval(() => {
      const id = crypto.randomUUID();
      const startY = Math.floor(Math.random() * (window.innerHeight - 100));
      const endY = Math.floor(Math.random() * (window.innerHeight - 100));

      // Create a new object
      setObjects(prev => [
        ...prev,
        { id, startX, endX, startY, endY }
      ]);

      // Despawn that object after 8 seconds (4 second run + 3 second death animation + 1 grace second idk)
      setTimeout(() => {
        setObjects(prev =>
          prev.filter(object => object.id !== id)
        );
      }, 8000);

    }, 500);

    return () => clearInterval(spawnTimer);
  }, [isRunning]);

  // Get coords when clicked
  function handleGremlinClick(e: React.MouseEvent<HTMLDivElement>, id: string) {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.animation = 'none';
    e.currentTarget.offsetWidth;
    e.currentTarget.style.animation = '';

    setObjects(prev =>
      prev.map(object =>
        object.id === id && !object.clicked
          ? { ...object, clicked: true, deadX: rect.left, deadY: rect.top }
          : object
      )
    );

    setScore(score => score + 1);
  }

  function handleGremlinAnimationEnd(e: React.AnimationEvent<HTMLDivElement>, id: string) {
    if (e.animationName !== 'spriteY') return; // when this is over the anim is done

    setObjects(prev => prev.filter(object => object.id !== id));
  }

  function startSession() {
    if (isRunning) return;
    setScore(score => 0);
    // TODO: Add method to change images
    setObjects([]);
    setIsRunning(true);
    setIsGameWindowActive(true);
  }

  return (
    <>
      <div className="ticker" aria-label="PISS GREEN MATCHA BEAN">
        <div className="ticker__track">
          <span>MATCHA GREEN!!! IT'S SAFE!!! IT'S SERVICEABLE!!! IT'S BORING!!! IT'S PERFECT!!! MATCHA GREEN!!! IT'S SAFE!!! IT'S SERVICEABLE!!! IT'S BORING!!! IT'S PERFECT!!!&nbsp;&nbsp;</span>
          <span aria-hidden="true">MATCHA GREEN!!! IT'S SAFE!!! IT'S SERVICEABLE!!! IT'S BORING!!! IT'S PERFECT!!! MATCHA GREEN!!! IT'S SAFE!!! IT'S SERVICEABLE!!! IT'S BORING!!! IT'S PERFECT!!!&nbsp;&nbsp;</span>
        </div>
      </div>

      <main className="page">
        <header className="intro">
          <div className="intro__text">
            <p>I'm <strong>Jason Riedel</strong></p>
            <p>Graphic design is my passion</p>
          </div>
          <div className={`avatar ${isGameWindowActive ? `avatar-active` : ''}`} aria-label="Profile silhouette"></div>
        </header>

        <section className="featured project" aria-labelledby="featured-title">
          <div className="featured__heading">
            <div className="title_and_button">
              <h1 id="featured-title">Project #1</h1>
              <button className={`game_start_button ${isGameWindowActive ? `game_start_button-active` : ''}`} onClick={startSession} disabled={isRunning}></button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br className="desktop-break"/>
              Donec ligula felis, laoreet vel aliquam quis, ultricies egestas dui.</p>
          </div>
          <div className="featured__gallery">
            <button className="pill side-link">Prev</button>
            <div className={`featured__image ${isGameWindowActive ? `featured__image-active` : ''}`} ></div>
            <button className="pill side-link">Next</button>
          </div>
        </section>

        <section className="project-grid" aria-label="Other projects">
          <article className="project project-card" id="project-2">
            <h2>Project #2</h2>
            <a className={`project-card__image ${isGameWindowActive ? `project-card__image-activeOne` : ''}`} href="#project-2" aria-label="View Project 2">
            </a>
            <a className="pill github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula felis, laoreet vel aliquam quis, ultricies egestas dui.</p>
          </article>

          <article className="project project-card" id="project-3">
            <h2>Project #3</h2>
            <a className={`project-card__image ${isGameWindowActive ? `project-card__image-activeTwo` : ''}`} href="#project-3" aria-label="View Project 3">
            </a>
            <a className="pill github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula felis, laoreet vel aliquam quis, ultricies egestas dui.</p>
          </article>
        </section>
        <div className="gremlin-at-rest"></div>

        <footer className="contact">
          <strong>CONTACT ME: </strong>
          <a href="https://website.domain">https://website.domain</a>
        </footer>
      </main>

      {/*Code for THE THING*/}
      <div className={isGameWindowActive ? "game-area fullscreen" : "game-area"}>
        <div className={isGameWindowActive ? "gameTimer" : "gameTimer-hidden"}>{secondsLeft}</div>
        <div className={isGameWindowActive ? "scoreBoard" : "scoreBoard-hidden"}>{score}</div>
            {objects.map(object => (
              <div
                className={object.clicked ? "gremlin-memento-mori" : "gremlin-in-motion"}
                onClick={e => handleGremlinClick(e, object.id)}
                onAnimationEnd={e => handleGremlinAnimationEnd(e, object.id)}
                key={object.id}
                style = {
                  {
                    '--start-x': `${object.startX}px`,
                    '--start-y': `${object.startY}px`,
                    '--end-x': `${object.endX}px`,
                    '--end-y': `${object.endY}px`,
                    '--dead-x': `${object.deadX ?? 0}px`,
                    '--dead-y': `${object.deadY ?? 0}px`,
                  } as CSSProperties 
                }
              >
              </div>
            ))}
      </div>
    </>
  )
}

export default App
