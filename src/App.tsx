import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isRunning, setIsRunning] = useState(false); // Starts game cycle, including fullscreen
  const [objects, setObjects] = useState([]); // The gremlins
  const [isGameWindowActive, setIsGameWindowActive] = useState(false); // Runs ending celebration and maintains fullscreen after game end

  // Controls the 20-second session
  useEffect(() => {
    if (!isRunning) return;

    const sessionTimer = setTimeout(() => {
      setIsRunning(false);
    }, 20000);

    return () => clearTimeout(sessionTimer);
  }, [isRunning]);

  //Keep fullscreen for another 3 seconds (ending celebration)
  useEffect(() => {
    if (isRunning || !isGameWindowActive) return;

    const exitTimer = setTimeout(() => {
      setIsGameWindowActive(false);
    }, 3000);

  return () => clearTimeout(exitTimer);
  }, [isRunning, isGameWindowActive]);

  // Spawns objects while the session is active
  useEffect(() => {
    if (!isRunning) return;

    const spawnTimer = setInterval(() => {
      const id = crypto.randomUUID();

      // Create a new object
      setObjects(prev => [
        ...prev,
        { id }
      ]);

      // Despawn that object after 3 seconds
      setTimeout(() => {
        setObjects(prev =>
          prev.filter(object => object.id !== id)
        );
      }, 3000);

    }, 500);

    return () => clearInterval(spawnTimer);
  }, [isRunning]);

  function startSession() {
    if (isRunning) return;

    setObjects([]);
    setIsRunning(true);
    setIsGameWindowActive(true);
  }

  return (
    <>
      <div className="ticker" aria-label="Matcha green is safe, serviceable, boring, and perfect">
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
          <div className="avatar" role="img" aria-label="Profile silhouette">
            <span className="avatar__head"></span>
            <span className="avatar__body"></span>
          </div>
        </header>

        <section className="featured project" aria-labelledby="featured-title">
          <div className="featured__heading">
            <h1 id="featured-title">Project #1</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br className="desktop-break"/>
              Donec ligula felis, laoreet vel aliquam quis, ultricies egestas dui.</p>
          </div>
          <div className="featured__gallery">
            <a className="pill side-link" href="#project-3">Prev</a>
            <div className="featured__image image-placeholder">
              <img src="assets/butterfly.png" alt="Featured project preview"/>
            </div>
            <a className="pill side-link" href="#project-2">Next</a>
          </div>
        </section>

        <section className="project-grid" aria-label="Other projects">
          <article className="project project-card" id="project-2">
            <h2>Project #2</h2>
            <a className="project-card__preview image-placeholder" href="#project-2" aria-label="View Project 2">
              <img src="assets/butterfly.png" alt="Project 2 preview"/>
            </a>
            <a className="pill github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula felis, laoreet vel aliquam quis, ultricies egestas dui.</p>
          </article>

          <article className="project project-card" id="project-3">
            <h2>Project #3</h2>
            <a className="project-card__preview image-placeholder" href="#project-3" aria-label="View Project 3">
              <img src="assets/butterfly.png" alt="Project 3 preview"/>
            </a>
            <a className="pill github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula felis, laoreet vel aliquam quis, ultricies egestas dui.</p>
          </article>
        </section>
        <div className="gremlin-at-rest"></div>

        <footer className="contact">
          <strong>CONTACT ME: </strong>
          <a href="https://website.domain">https://website.domain</a>
          {/*Code for THE THING*/}
          <div>
            <button onClick={startSession} disabled={isRunning}>
              {isRunning ? 'Running...' : 'Start'}
            </button>
        </div>
        </footer>
      </main>

      {/*Code for THE THING*/}
      <div className={isGameWindowActive ? "game-area fullscreen" : "game-area"}>
            {objects.map(object => (
              <div
                className="gremlin-at-rest"
                key={object.id}
              />
            ))}
      </div>
    </>
  )
}

export default App
