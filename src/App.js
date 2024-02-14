// src/App.js
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './redux/charactersSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define NextArrow component
const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} style={{ ...props.style, display: 'block', background: 'gray' }} onClick={onClick} />;
};

// Define PrevArrow component
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} style={{ ...props.style, display: 'block', background: 'gray' }} onClick={onClick} />;
};

function App() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const sliderRef = useRef();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slowing down the sliding speed to 1 second
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Delaying the automatic sliding to 5 seconds
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: '-30px', position: 'absolute', width: '100%', textAlign: 'center' }}>
        <ul style={{ margin: '0' }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div style={{ width: '50px', height: 'auto', cursor: 'pointer' }}>
        <img src={characters[i].image} alt={`Thumbnail ${i + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
      </div>
    ),
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: 'center' }}>Rick and Morty Characters</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <Slider ref={sliderRef} {...settings}>
          {characters.map((character) => (
            <div key={character.id}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ margin: '20px' }}> {/* Adding margin for spacing */}
                  <img src={character.image} alt={character.name} style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto' }} />
                </div>
                <h2>{character.name}</h2>
                <p style={{ marginBottom: '20px' }}>Status: {character.status}</p> {/* Adding margin-bottom for separation */}
                <p style={{ marginBottom: '20px' }}>Species: {character.species}</p> {/* Adding margin-bottom for separation */}
                {/* Add additional character information as needed */}
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default App;
