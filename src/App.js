import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [letterPositions, setLetterPositions] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [expandedImagePosition, setExpandedImagePosition] = useState({ x: 0, y: 0 });
  const [shuffledImages, setShuffledImages] = useState([]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Shuffle images array on component mount
  useEffect(() => {
    const images = [
      `${process.env.PUBLIC_URL}/assets/img1.jpeg`,
      `${process.env.PUBLIC_URL}/assets/img2.jpeg`,
      `${process.env.PUBLIC_URL}/assets/img3.jpeg`,
      `${process.env.PUBLIC_URL}/assets/img4.jpeg`,
      `${process.env.PUBLIC_URL}/assets/img5.png`,
      `${process.env.PUBLIC_URL}/assets/img6.png`,
      `${process.env.PUBLIC_URL}/assets/img7.png`,
      `${process.env.PUBLIC_URL}/assets/img8.png`,
      `${process.env.PUBLIC_URL}/assets/img9.png`,
      `${process.env.PUBLIC_URL}/assets/img10.png`,
    ];
    // Shuffle array
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  // Generate random starting positions for letters
  useEffect(() => {
    const letters = ['j', 'e', 'r', 'o', 'm', 'e'];
    const positions = letters.map(() => ({
      x: Math.random() * 200 - 100, // Random x offset between -100px and 100px
      y: Math.random() * 200 - 100, // Random y offset between -100px and 100px
    }));
    setLetterPositions(positions);
  }, [activeSection]); // Regenerate positions when section changes

  const handleImageClick = (imageSrc, index, event) => {
    event.stopPropagation();
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, position at top-left for full screen display
      setExpandedImageIndex(index);
      setExpandedImagePosition({ 
        x: 0, 
        y: 0
      });
    } else {
      // On desktop, position image underneath the text to the left
      const textAreaLeft = 40; // Padding from container
      const textAreaTop = 40; // Padding from top
      // Get the content section height to position image below it
      const contentSection = document.querySelector('.content-section');
      const contentHeight = contentSection ? contentSection.offsetHeight : 200;
      
      setExpandedImageIndex(index);
      setExpandedImagePosition({ 
        x: textAreaLeft, 
        y: textAreaTop + contentHeight + 20 // 20px gap below text
      });
    }
    setExpandedImage(imageSrc);
  };

  const handleOverlayClick = (event) => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, clicking anywhere closes the image
      setExpandedImage(null);
      setExpandedImageIndex(null);
    } else {
      // On desktop, only close when clicking outside (on the overlay, not on the image itself)
      if (event.target === event.currentTarget || event.target.classList.contains('expanded-image-overlay')) {
        setExpandedImage(null);
        setExpandedImageIndex(null);
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="content-section">
          {activeSection === 'about' && (
            <div className="about-content">
              <p> "Music that unites body, movement and warmth while punctuating and exploring synthesised realities & club culture."</p>
              <p>
                contact → <a href="mailto:jeromeisfemale@gmail.com">jeromeisfemale@gmail.com</a>
              </p>
              <p>
                Annalisa Iembo, Bristol  
              </p>
            </div>
          )}
          
          {activeSection === 'upcoming' && (
            <div className="upcoming-content">
              <p>Upcoming shows:</p>
              <p>8/12/2023 Strangebrew - Bristol (supporting Scaler and Daniel Avery)</p>
              <p>18/05/2024 Rough Trade - Bristol (supporting Haal)</p>
              <p>06/06/2024 Shacklewell Arms - London (supporting Drahla)</p>
              <p>07/06/2024 Dareshack - Bristol (supporting Drahla)</p>
              <p>08/06/2024 Where Else? - Margate (supporting Drahla)</p>
              <p>09/06/2024 Quarry - Liverpool (supporting Drahla)</p>
              <p>10/06/2024 YES - Manchester (supporting Drahla)</p>
              <p>12/06/2024 The Old Hairdressers - Glasgow (supporting Drahla)</p>
              <p>13/06/2024 The Tin Music & Arts - Coventry (supporting Drahla)</p>
              <p>27/08/2024 Exchange - Bristol (supporting Gnod)</p>
              <p>24/01/2025 Shacklewell Arms - London</p>
            </div>
          )}
          
          {activeSection === 'music' && (
            <div className="music-content">
              <p>Music:</p>
              <p>→ <a href="https://weightedmyhand.bandcamp.com/album/if"> If  </a> - with Jackson Veil Panther(2025)</p>
              <p>→ <a href="https://www.deliluh.com/jeromecollab?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWXoRKrdVUfwt493SXpCy2SetOa1a5EfiOpJ65xc7fbV7PhQinkcu9e93KAw_aem_Bq-8FkII0fZp8RZqatZX2A"> Black Bomb / Year 2 </a> - with Deliluh (2025)</p>
              <p>→ <a href="https://mapledeathrecords.bandcamp.com/track/wrists-free-feat-jerome"> Wrists Free </a>- with SabaSaba(2024)</p>
              <p>→ <a href="https://mapledeathrecords.bandcamp.com/album/moving">moving</a> (2023)</p>
              <p>→ <a href="https://accidentalmeetings.bandcamp.com/track/jerome-both-and-2"> Both/And </a> on AMF&F003 by Accidental Meetings (2022)</p>
              <p>→ <a href="https://mapledeathrecords.bandcamp.com/album/lp2">LP2</a> (2021)</p>
              <p>→ <a href="https://mapledeathrecords.bandcamp.com/album/moods">Moods</a> (2020)</p>
            </div>
          )}
        </div>

        <div className="navigation-section">
          <div className="radio-group">
            <div className="radio-item">
              <label>
                <input
                  type="radio"
                  name="section"
                  value="about"
                  checked={activeSection === 'about'}
                  onChange={() => handleSectionChange('about')}
                />
                <span className="radio-label">about</span>
              </label>
            </div>
            
            <div className="radio-item">
              <label>
                <input
                  type="radio"
                  name="section"
                  value="upcoming"
                  checked={activeSection === 'upcoming'}
                  onChange={() => handleSectionChange('upcoming')}
                />
                <span className="radio-label">upcoming</span>
              </label>
            </div>

            <div className="radio-item">
              <label>
                <input
                  type="radio"
                  name="section"
                  value="music"
                  checked={activeSection === 'music'}
                  onChange={() => handleSectionChange('music')}/>
                <span className="radio-label">music</span>
              </label>
            </div>
          </div>
          
          <div className="grid-placeholder">
            {shuffledImages.slice(0, 12).map((imageSrc, i) => (
              <img
                key={i}
                src={imageSrc}
                alt={`Gallery ${i + 1}`}
                className="grid-image"
                onClick={(e) => handleImageClick(imageSrc, i, e)}
                data-index={i}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className={`bystella ${activeSection === 'about' ? 'bystella-mobile-visible' : ''}`}>
        <div className="bystella-content">
          <p>website by <a href="https://stellamathioudakis.com">stella</a></p>
        </div>
      </div>
      <div className="decorative-letters">
        {['j', 'e', 'r', 'o', 'm', 'e'].map((letter, index) => (
          <span 
            key={index}
            className="letter"
            style={{
              '--start-x': `${letterPositions[index]?.x || 0}px`,
              '--start-y': `${letterPositions[index]?.y || 0}px`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {expandedImage && expandedImageIndex !== null && (
        <div className="expanded-image-overlay" onClick={handleOverlayClick}>
          <img 
            src={expandedImage} 
            alt="Expanded view" 
            className="expanded-image"
            onClick={(e) => {
              const isMobile = window.innerWidth <= 768;
              if (isMobile) {
                // On mobile, clicking the image also closes it
                handleOverlayClick(e);
              } else {
                // On desktop, prevent closing when clicking the image
                e.stopPropagation();
              }
            }}
            style={{
              left: `${expandedImagePosition.x}px`,
              top: `${expandedImagePosition.y}px`,
            }}
          />
        </div>
      )}
    </div>
  
  
  );
}

export default App;
