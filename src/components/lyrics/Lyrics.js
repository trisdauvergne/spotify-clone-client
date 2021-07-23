import React from 'react';
import './lyrics.scss';

const Lyrics = ({ title, lyrics }) => {
  return (
    <section className="section lyrics">
      <h3 className="lyrics__title">{title}</h3>
      <p className="lyrics__txt">{lyrics}</p>
    </section>
  )
}

export default Lyrics
