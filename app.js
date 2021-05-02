class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Library{
    static getBooks(){
       let books;
       if(localStorage.getItem('books') === null){
           books = [];
       } else {
           books = JSON.parse(localStorage.getItem('books'));
       }
       return books;
    }
    static addBook(book){
        const books = Library.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Library.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


class Actions {
    static displayBooks(){
        const MyBooks = Library.getBooks();


        const books = MyBooks;

        books.forEach((book) => Actions.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete>X</a></td>`;

        list.appendChild(row)
    }

    static deleteBook(tar) {
        if(tar.classList.contains('delete')) {
            tar.parentElement.parentElement.remove();
        }
    }

    static Alert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


document.addEventListener('DOMContentLoaded', Actions.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;



    if(title === '' || author === '' || isbn === ''){
        Actions.Alert('Please fill the fields', 'danger')
    } else {
        const book = new Book(title, author, isbn);

        Actions.addBookToList(book);

        Library.addBook(book);
    
        Actions.Alert('You have one more book', 'success')

        Actions.clearFields();
    }

    

});

document.querySelector('#book-list').addEventListener('click', (e) => {
    Actions.deleteBook(e.target)
    Library.removeBook(e.target.parentElement.previousElementSibling.textContent);
    Actions.Alert('Removed', 'success')
});
