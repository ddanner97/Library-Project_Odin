//Array for storing book objects
let myLibrary = [];

var form = document.getElementById('form-id');
var library = document.getElementById('library');
var x = document.getElementById('filter');
var element = x.options[x.selectedIndex].value;
var book;

//form submit event
form.addEventListener('submit', createBookObject);
//Delete event
library.addEventListener('click', removeItem);

if(myLibrary.length == 0){

	book1 = {
		title: 'Hobbit',
		author: 'J.R.R Tolkein',
		pages: 310,
		year: 1937
	}
	
	book2 = {
		title: "Harry Potter and the Sorcerer's Stone",
		author: 'J.K Rowling',
		pages: 293,
		year: 1997
	}
	
	book3 = {
		title: 'Nineteen Eighty-Four',
		author: 'George Orwell',
		pages: 328,
		year: 1949
	}
	
	book4 = {
		title: 'Hamlet',
		author: 'William Shakespeare',
		pages: 210,
		year: 1609
	}
	
	myLibrary.push(book1);
	myLibrary.push(book2);
	myLibrary.push(book3);
	myLibrary.push(book4);
	
	sortAuthor(myLibrary);
	printArray(myLibrary);

}

//createBookObject
function createBookObject(e) {
	//prevent reload from normal form submission
	e.preventDefault();

	//Get input value
	var title = document.getElementById('title').value;
	var author = document.getElementById('author').value;
	var pages = document.getElementById('pages').value;
	var year = document.getElementById('year').value;

	//create book object
	book = new Book(title, author, pages, year);

	//Push object to array
    myLibrary.push(book);
	console.log(myLibrary);
	
	selectFilter(element);

	//reset form
	document.getElementById('form-id').reset();
}

//printArray function
function printArray(myLibrary) {

    //reset library content
    document.getElementById('library').innerHTML = '';

	//create new div element and linebreak
	var bookDisplay;
	var linebreak = document.createElement('br');

	for (i = 0; i < myLibrary.length; i++) {
        bookDisplay = document.createElement('div');
        //add a class
        bookDisplay.className = 'library-books';
		book = myLibrary[i];
		
		//create delete button element
        var deleteBtn = document.createElement('button');

        //add a class to button
        deleteBtn.className = 'btn delete';

        deleteBtn.appendChild(document.createTextNode('x'));

        //Append Button
		bookDisplay.appendChild(deleteBtn);
		
		//create switch
		var switchBtn = document.createElement('input');
		switchBtn.type = 'checkbox';
		//add class to switch
		switchBtn.className = 'switch';
		bookDisplay.appendChild(switchBtn);
		
		//loop through object and insert textNode inside of
		//div with object data
		for (var key in book) {
			if (book.hasOwnProperty(key)) {
				//create div element
				var div2 = document.createElement('div');
				var div3 = document.createElement('div');
				//append new text node to div2 with value from object key
				div2.appendChild(document.createTextNode(key + ': '));
				div2.className = 'label-name';
				div3.appendChild(document.createTextNode(book[key]));
				div3.className = 'input-name';
				//append div2 to parent 'div'
				bookDisplay.appendChild(div2);
				bookDisplay.appendChild(div3);
			}
        }

        library.appendChild(bookDisplay);
        library.appendChild(linebreak);
        
	}
}

//onchange function to function call sort filter
function selectFilter(e){
	var select = document.getElementById('filter').value;
	console.log(select);

	if(select == document.getElementById('author-val').value){
		sortAuthor(myLibrary);
	}
	if(select == document.getElementById('title-val').value){
		sortTitle(myLibrary);
	}
	if(select == document.getElementById('page-val').value){
		sortPage(myLibrary);
	}
	if(select == document.getElementById('year-val').value){
		sortYear(myLibrary);
	}
}

//sort by author
function sortAuthor(myLibrary){
	myLibrary.sort(function(a,b){
		if(a.author.toLowerCase() < b.author.toLowerCase()) return -1;
		if(a.author.toLowerCase() > b.author.toLowerCase()) return 1;
		return 0;
	});

	//print array
	printArray(myLibrary);
}

//sort Title
function sortTitle(myLibrary){
	myLibrary.sort(function(a,b){
		if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
		if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
		return 0;
	});

	printArray(myLibrary);
}

//sort by page //
function sortPage(myLibrary){
	myLibrary.sort(function(a,b){
		//if b is larger than a this will return a negative number
		//meaning 'a' should come before
		//this will also return postive and zero
		//if we are sorting lowest to highest
		return a.pages - b.pages;
	});

	printArray(myLibrary);
}

//sort by year
function sortYear(myLibrary){
	myLibrary.sort(function(a,b){
		return a.year - b.year;
	});

	printArray(myLibrary);
}

//function removeItem
function removeItem(e) {
	//condition that states if object targeted by event
	//contains a class of 'delete' run code
	//keeps us from hitting any element inside bookDisplay div and deleting
	if (e.target.classList.contains('delete')) {
		if (confirm('Are you sure you want to remove this book?')) {
			var object = e.target.parentElement;
			library.removeChild(object);
		}
	}
}

//Constructor to create new Book Objects
function Book(title, author, pages, year) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.year = year;
	//this.read = read;
}

