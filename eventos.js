const inputName = document.querySelector('#name-input');
const inputPhone = document.querySelector('#phone-input');
const form = document.querySelector('#form');
const formBtn = document.querySelector('#form-btn');
const list = document.querySelector('#list');

const NAME_REGEX = /^[A-Z][a-z]{2,20}$/;
const PHONE_REGEX = /^[0]{1}[42]{1}[12]{1}[4]{1}[0-9]{7}$/;

let nameValidation = false;
let phoneValidation = false;

const validateInput = (input, validation) => {
  // Selecciono el p 
  const helper = input.parentElement.children[2];

  // Verifico las validaciones para quitar el atributo disabled del boton
  if (nameValidation && phoneValidation) {
    formBtn.disabled = false;
  } else {
    formBtn.disabled = true;
  }

  // Valido si el input esta vacio
  // Si la validacion es verdadera
  // Si la validacion es falsa
  if (input.value === '') {
    input.classList.remove('error');
    input.classList.remove('correct');
    helper.classList.remove('show');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('error');
    helper.classList.remove('show');
  } else {
    input.classList.add('error');
    input.classList.remove('correct');
    helper.classList.add('show');
  }
}



const validateInput2 = (input, validation) => {
  // Selecciono el p 
  // const helper = input.parentElement.children[2];

  // Verifico las validaciones para quitar el atributo disabled del boton
  
  const acceptBtn = input.parentElement.children[3];
  
  if (nameValidation && phoneValidation) {
    acceptBtn.disabled = false;
  } else {
    acceptBtn.disabled = true;
  }

  // Valido si el input esta vacio
  // Si la validacion es verdadera
  // Si la validacion es falsa
  if (input.value === '') {
    input.classList.remove('error');
    input.classList.remove('correct');
    // helper.classList.remove('show');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('error');
    // helper.classList.remove('show');
  } else {
    input.classList.add('error');
    input.classList.remove('correct');
    // helper.classList.add('show');
  }
}




inputName.addEventListener('input', e => {
  nameValidation = NAME_REGEX.test(inputName.value);
  // MOSTRAR RESULTADO
  console.log(nameValidation);

  validateInput(inputName, nameValidation)
});

inputPhone.addEventListener('input', e => {
  phoneValidation = PHONE_REGEX.test(inputPhone.value);
  // MOSTRAR RESULTADO

  console.log(phoneValidation);

  validateInput(inputPhone, phoneValidation)
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const newContact = document.createElement('li');
  newContact.classList.add('list-item');
  newContact.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <input type="text" id="listName" value="${inputName.value}" readonly>
  <input type="text" id="listPhone" value="${inputPhone.value}" readonly>
  <button class="accept-btn" hidden>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  </button>
  <button class="edit-btn">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  </button>
  `;

  console.log('edit-icon'),
  console.log('list-btn');

  // CONSULTAR COMANDO LIST.APPEND
  list.append(newContact);
  inputName.value = '';
  inputPhone.value = '';
  nameValidation = false;
  phoneValidation = false;
  validateInput(inputName);
  validateInput(inputPhone);

  // CONTACTS ES UN ITEM DEL ALMACENAMIENTO LOCAL
  // COMO SE CREA ESE ITEM?

  localStorage.setItem('contacts', list.innerHTML);
});

list.addEventListener('click', e => {
  if (e.target.closest('.delete-icon')) {
    e.target.closest('.delete-icon').parentElement.remove();
    localStorage.setItem('contacts', list.innerHTML);
  }

  if (e.target.closest('.edit-btn')) {
    const editBtn = e.target.closest('.edit-btn');
    const editName = editBtn.parentElement.children[1];
    const editPhone = editBtn.parentElement.children[2];
    const acceptBtn = editBtn.parentElement.children[3];
    
    console.log(editName.value);
    console.log(editPhone.value);

    if (!editBtn.classList.contains('editando')) {
      editBtn.classList.add('editando');
      // editBtn.disabled = true;
      editName.removeAttribute('readonly');
      editPhone.removeAttribute('readonly');
      acceptBtn.removeAttribute('hidden');
      editName.classList.add('cambiando');
      editPhone.classList.add('cambiando');
     
      
      console.log('hola')
      
      editPhone.addEventListener('input', e => {
        phoneValidation = PHONE_REGEX.test(editPhone.value);
        // MOSTRAR RESULTADO

        console.log(phoneValidation);
        validateInput2(editPhone, phoneValidation)
      });
      editName.addEventListener('input', e => {
        nameValidation = NAME_REGEX.test(editName.value);
        // MOSTRAR RESULTADO
        console.log(nameValidation);
        validateInput2(editName, nameValidation)
      });
      
      
      console.log(validateInput2)
      


    }
    }
    // else {
    //   editBtn.classList.remove('editando');
    //   editName.setAttribute('readonly', true);
    //   editPhone.setAttribute('readonly', true);
    //   acceptBtn.setAttribute('hidden', true);
    //   editName.classList.remove('cambiando');
    //   editPhone.classList.remove('cambiando');
     

     

    //   console.log('cambiando')



    //   // Guardar valor
    //   editName.setAttribute('value', editName.value);
    //   editPhone.setAttribute('value', editPhone.value);

    //   // COMO ASIGNO VALOR EN EL ARRAY AL MOMENTO DE EDITAR?
    //   localStorage.setItem('contacts', list.innerHTML);
      
    // }
    if (e.target.closest('.accept-btn')) {
      const acceptBtn = e.target.closest('.accept-btn');
      const editBtn = acceptBtn.parentElement.children[4];
      const editName = acceptBtn.parentElement.children[1];
      const editPhone = acceptBtn.parentElement.children[2];
    // const acceptBtn = editBtn.parentElement.children[3];


      editBtn.classList.remove('editando');
      editName.setAttribute('readonly', true);
      editPhone.setAttribute('readonly', true);
      acceptBtn.setAttribute('hidden', true);
      editName.classList.remove('cambiando');
      editPhone.classList.remove('cambiando');
     

     
//  ACEPTAR EDICION EN LOS INPUT
      console.log('cambiando')



      // Guardar valor
      editName.setAttribute('value', editName.value);
      editPhone.setAttribute('value', editPhone.value);

      // COMO ASIGNO VALOR EN EL ARRAY AL MOMENTO DE EDITAR?
      localStorage.setItem('contacts', list.innerHTML);
      
    }
  
});


const loadFromLocal = () => {
  const localList = localStorage.getItem('contacts');
  list.innerHTML = localList;
}

loadFromLocal();