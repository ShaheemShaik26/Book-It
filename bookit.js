document.getElementById('listBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const description = document.getElementById('bookDescription').value;

    fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, description }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Book listed successfully!');
        document.getElementById('listBookForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;

    fetch(/api/books?search=${query})
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = ${book.title} by ${book.author};
                bookList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});