import React, { useState } from 'react';
import './HomePage.css';  // Si decides personalizar el estilo

const books = [
  {
    id: 1,
    title: 'El Quijote',
    author: 'Miguel de Cervantes',
    category: 'Ficción',
    description: 'Una novela que narra las aventuras de un hidalgo llamado Don Quijote.',
  },
  {
    id: 2,
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    category: 'Realismo mágico',
    description: 'Un relato de la familia Buendía en el pueblo ficticio de Macondo.',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    category: 'Distopía',
    description: 'Un futuro totalitario donde el gobierno controla todos los aspectos de la vida humana.',
  },
];

function HomePage() {
  const [search, setSearch] = useState('');

  // Filtrar libros según la búsqueda
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Bienvenido a la aplicación de reseñas de libros</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por título, autor o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Categoría:</strong> {book.category}</p>
              <p>{book.description}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
