import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginSignup from './LoginSignup';
import { FaEnvelope, FaWhatsapp, FaUser } from 'react-icons/fa';  // Agregar los íconos de FontAwesome

const initialBooks = [
  { title: 'Cien años de soledad', author: 'Gabriel García Márquez', summary: 'Cien años de soledad de Gabriel García Márquez cuenta la historia de la familia Buendía en el pueblo ficticio de Macondo. A lo largo de varias generaciones, la novela aborda temas de amor, soledad y destino, con elementos de realismo mágico, hasta llegar a la desaparición de la familia y la destrucción de Macondo.', category: 'Ficción', image: '/book1.jpg', reviews: [] },
  { title: 'El principito', author: 'Antoine de Saint-Exupéry', summary: 'El principito de Antoine de Saint-Exupéry cuenta la historia de un niño que viaja por planetas y aprende sobre la amistad, el amor y la vida. A través de sus encuentros, la obra reflexiona sobre la importancia de ver con el corazón y cuestiona las prioridades de los adultos.', category: 'Fábula', image: '/book2.jpg', reviews: [] },
  { title: 'Lady Masacre', author: 'Mario Mendoza', summary: 'Lady Masacre de Mario Mendoza sigue a un hombre obsesionado con encontrar respuestas sobre el pasado de su madre, quien fue víctima de violencia política en Colombia. A través de su investigación, se enfrenta a la crueldad de la historia reciente del país, mientras explora temas como la violencia, la identidad y la memoria. La obra ofrece una reflexión profunda sobre los horrores del conflicto colombiano.', category: 'Ficcion', image: '/book3.jpg', reviews: [] },
  { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', summary: 'Don Quijote de la Mancha de Miguel de Cervantes cuenta las aventuras de un caballero loco, Don Quijote, y su fiel escudero, Sancho Panza, mientras luchan contra molinos de viento y viven diversas peripecias. La obra es una reflexión sobre la locura, la realidad y la imaginación, y es considerada una crítica a las novelas de caballería, al tiempo que aborda temas universales como la justicia y la nobleza.', category: 'Clásico', image: '/book4.jpg', reviews: [] },
  { title: 'Más allá de las estrellas', author: 'Matt Dyamond', summary: 'Más allá de las estrellas de Matt Diamond narra la historia de un joven que, tras la muerte de su madre, se embarca en un viaje de autodescubrimiento. A lo largo de su travesía, enfrenta desafíos emocionales y busca respuestas sobre su vida, mientras explora temas de duelo, crecimiento personal y la conexión con el universo.', category: 'Ciencia ficción', image: '/book5.jpg', reviews: [] },
  { title: 'Atlantis: Proyecto Tarsis', author: 'José Enrique Serrano Expósito', summary: 'Atlantis: Proyecto Tarsis de Enrique Serrano Expósito sigue a un grupo de científicos que descubren un proyecto secreto relacionado con la Atlántida, enfrentándose a misterios, peligros y conspiraciones mientras exploran civilizaciones perdidas y tecnología avanzada.', category: 'Ciencia ficción', image: '/book6.jpg', reviews: [] },
  { title: 'A dos centímetros de ti', author: 'Elizabeth Eulberg', summary: 'A dos centímetros de ti de Elizabeth Eulberg narra la historia de dos adolescentes que, a pesar de estar muy cerca físicamente, no logran conocerse profundamente. A través de malentendidos y emociones a flor de piel, la novela explora temas de amistad, amor y la dificultad de comunicarse en una relación.', category: 'Romántico', image: '/book7.jpg', reviews: [] },
  { title: 'Antes de ti', author: 'Jojo Moyes', summary: 'Antes de ti de Jojo Moyes cuenta la historia de Louisa, una joven que se convierte en cuidadora de Will, un hombre tetrapléjico. A lo largo de su relación, Louisa enfrenta desafíos emocionales mientras aprende sobre la vida, el amor y el sacrificio. La novela aborda temas de discapacidad, amor no correspondido y la importancia de vivir plenamente.', category: 'Romántico', image: '/book8.jpg', reviews: [] },
  { title: 'A través de mi ventana', author: 'Ariana Godoy', summary: 'A través de mi ventana de Ariana Godoy narra la historia de Raquel, una joven que está enamorada de su vecino Ares, con quien desarrolla una relación llena de pasión y obstáculos. A medida que descubren más el uno del otro, enfrentan secretos, malentendidos y emociones intensas. La novela trata sobre el amor, la atracción y las dificultades de las relaciones adolescentes.', category: 'Romántico', image: '/book9.jpg', reviews: [] },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    return storedBooks || initialBooks;
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData.name); 
  };

  const handleSignup = (userData) => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    alert('Registro exitoso, por favor inicia sesión.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    navigate('/book-details', { state: { book } });
  };

  const updateBookReviews = (updatedBook) => {
    setBooks(books.map(book => (book.title === updatedBook.title ? updatedBook : book)));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBooks = filter
    ? books.filter(book =>
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.category.toLowerCase().includes(filter.toLowerCase())
      )
    : books;

  const handleBackToList = () => {
    setSelectedBook(null);
    navigate('/');
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1>Bienvenido a Tu Biblioteca Virtual</h1>
          <p>Usuario: {currentUser}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {!selectedBook && (
                    <input
                      type="text"
                      placeholder="Filtrar por título, autor o categoría"
                      value={filter}
                      onChange={handleFilterChange}
                    />
                  )}
                  <BookList books={filteredBooks} onBookClick={handleBookClick} />
                </div>
              }
            />
            <Route
              path="/book-details"
              element={<BookDetails currentUser={currentUser} onUpdateBook={updateBookReviews} onBackToList={handleBackToList} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Información de contacto */}
          <footer className="contact-info">
            <h3>Información de Contacto</h3>
            <p><FaUser /> Nombre: Brayan David Gordo Naranjo</p>
            <p><FaEnvelope /> Correo: gordonaranjo123@gmail.com</p>
            <p><FaWhatsapp /> Celular: 314 4473755</p>
            <p>Ingeniero Electrónico</p>
          </footer>
        </div>
      ) : (
        <LoginSignup onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </div>
  );
}

function BookList({ books, onBookClick }) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div key={index} className="book-item" onClick={() => onBookClick(book)}>
          <img src={book.image} alt={book.title} className="book-image" />
          <h3>{book.title}</h3>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Categoría:</strong> {book.category}</p>
        </div>
      ))}
    </div>
  );
}

function BookDetails({ currentUser, onUpdateBook, onBackToList }) {
  const location = useLocation();
  const { book } = location.state || {};
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(book?.reviews || []);
  const [editMode, setEditMode] = useState(null);  // Indica si estamos en modo edición de una reseña

  const handleAddReview = () => {
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      alert('La calificación debe ser un número entre 1 y 5.');
      return;
    }
    if (!comment.trim()) {
      alert('El comentario no puede estar vacío.');
      return;
    }
  
    const newReview = { user: currentUser, rating, comment, timestamp: new Date().toISOString() };
    const updatedReviews = [newReview, ...reviews].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Agrega la nueva reseña al inicio
    setReviews(updatedReviews);
  
    const updatedBook = { ...book, reviews: updatedReviews };
    onUpdateBook(updatedBook);
  
    setRating('');
    setComment('');
  };
  
  const handleEditReview = (index) => {
    const review = reviews[index];
    setRating(review.rating);
    setComment(review.comment);
    setEditMode(index);  // Activamos el modo de edición
  };

  const handleSaveEditedReview = () => {
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      alert('La calificación debe ser un número entre 1 y 5.');
      return;
    }
    if (!comment.trim()) {
      alert('El comentario no puede estar vacío.');
      return;
    }

    const updatedReviews = [...reviews];
    updatedReviews[editMode] = { user: currentUser, rating, comment };
    setReviews(updatedReviews);

    const updatedBook = { ...book, reviews: updatedReviews };
    onUpdateBook(updatedBook);

    setRating('');
    setComment('');
    setEditMode(null);  // Salimos del modo de edición
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);

    const updatedBook = { ...book, reviews: updatedReviews };
    onUpdateBook(updatedBook);
  };

  if (!book) {
    return <div>No se encontraron detalles del libro.</div>;
  }

  return (
    <div className="book-details">
      <button onClick={onBackToList}>Volver a la lista de libros</button>
      
      <div className="details-left">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p><strong>Categoría:</strong> {book.category}</p>
        <p><strong>Resumen:</strong> {book.summary}</p>
        <img src={book.image} alt={book.title} />
      </div>

      <div className="details-right">
        <h4>Reseñas</h4>
        <div className="review-list">
          {reviews.length === 0 ? (
            <p>No hay reseñas para este libro.</p>
          ) : (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <p><strong>Usuario:</strong> {review.user}</p>
                  <p><strong>Calificación:</strong> {review.rating}</p>
                  <p>{review.comment}</p>
                  {review.user === currentUser && (
                    <div>
                      <button onClick={() => handleEditReview(index)}>Editar</button>
                      <button onClick={() => handleDeleteReview(index)}>Eliminar</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="review-form">
          <h4>{editMode === null ? 'Añadir Reseña' : 'Editar Reseña'}</h4>
          <input
            type="number"
            placeholder="Calificación (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
          <textarea
            placeholder="Escribe tu comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={editMode === null ? handleAddReview : handleSaveEditedReview}>
            {editMode === null ? 'Añadir Reseña' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;