import React, { useState, useRef, useEffect } from 'react'

export default function FlashCard( {flashcard }) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial');

    const frontEl = useRef(null);
    const backEl = useRef(null);
  
    function setMaxHeight() {
      if (frontEl.current && backEl.current) {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100)); 
      }
    }
  
    useEffect(() => {
      setMaxHeight();
    }, [flashcard.question, flashcard.answer, flashcard.options]);
  
    useEffect(() => {
      setMaxHeight();
      window.addEventListener('resize', setMaxHeight); 
      return () => window.removeEventListener('resize', setMaxHeight); 
    }, []);
      
  
    return (
    <div 
    className={`card ${flip ? 'flip' : ''}`}
    style={{ height: height }}
    onClick={() => setFlip(!flip)}>
        <div className="front" ref={frontEl}>
            {flashcard.question}
        <div className="flashcard-options">
            {flashcard.options.map(option => {
                return <div className="flashcard-option" key={option}>{option}
                </div>
            })}
        </div>
        </div>
        <div className="back" ref={backEl}> {flashcard.answer } </div>
    </div>
  )
}
