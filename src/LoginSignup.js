import React, { useState, useEffect } from 'react';
import './LoginSignup.css';


function LoginSignup({ onLogin, onSignup, errorMessage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '', // Nuevo campo para el nombre
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Cargar usuarios registrados desde localStorage
  const loadUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('registeredUsers'));
    return users || []; // Si no hay usuarios guardados, devolver un array vacío
  };

  // Estado de los usuarios registrados, inicializado con los datos de localStorage
  const [registeredUsers, setRegisteredUsers] = useState(loadUsersFromLocalStorage());

  // Función para actualizar el localStorage cuando los usuarios cambien
  const updateLocalStorage = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  // Actualizar localStorage cuando la lista de usuarios cambie
  useEffect(() => {
    updateLocalStorage(registeredUsers);
  }, [registeredUsers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Verificamos las credenciales de login
      const user = registeredUsers.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        onLogin(user); // Pasamos el usuario completo al login
        setError(''); // Limpiar cualquier error previo
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } else {
      // Registro de usuario: agregamos al "base de datos"
      const existingUser = registeredUsers.find(
        (user) => user.email === formData.email
      );

      if (existingUser) {
        setError('Este correo ya está registrado');
      } else {
        const newUser = { name: formData.name, email: formData.email, password: formData.password };
        setRegisteredUsers((prevUsers) => [...prevUsers, newUser]); // Agregamos al nuevo usuario
        onSignup(newUser); // Llamamos a la función de signup
        setError(''); // Limpiar cualquier error previo
        setIsLogin(true); // Cambiamos a la vista de login después de registrarse
        setFormData({ name: '', email: '', password: '' }); // Limpiamos el formulario
      }
    }
  };

  // Validación simple para el correo
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);

  return (
    <div className="container">
      <div className="form-container">
        <h2>{isLogin ? 'Biblioteca Virtual' : 'Registrarse'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <input
                type="text"
                id="name"
                name="name"
                required={!isLogin} // Requerido solo en el registro
                value={formData.name}
                onChange={handleInputChange}
                placeholder=" "
              />
              <label htmlFor="name">Nombre</label>
            </div>
          )}
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label htmlFor="email">Correo electrónico</label>
            {!isEmailValid && formData.email.length > 0 && (
              <span className="error-text">Por favor, ingresa un correo válido</span>
            )}
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          {error && <div className="error-message">{error}</div>} {/* Muestra el mensaje de error */}
          <input
            type="submit"
            value={isLogin ? 'Iniciar sesión' : 'Registrarse'}
            disabled={
              (!isLogin && (formData.name.length === 0 || formData.password.length === 0)) ||
              !isEmailValid ||
              formData.password.length === 0
            } // Desactivar si hay campos vacíos o inválidos
          />
        </form>
        <p>
          {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes cuenta? '}
          <span
            className="link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
