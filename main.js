
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario
 
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Creo un objeto con los datos del contacto
  const contact = {
    name: name,
    email: email,
    message: message
  };
  // Obtener el array de contactos almacenado en localStorage
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  // Agrego el nuevo contacto al array
  contacts.push(contact);

  // Guardo el array actualizado en localStorage
  localStorage.setItem('contacts', JSON.stringify(contacts));

  
  form.reset();

  // mensaje form enviado correctamente

  alert('¡Mensaje enviado correctamente!');
});