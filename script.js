// Define the API endpoint
const apiUrl = "./books.json";
// Fetch JSON data from the API
let book_array = [];
let authors_array = [];
let categories_array = [];
let thumbnail_array = [];
let isbn_array = [];
fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {

        book_array = getBooks(data);
        createCards(book_array)
        authors_array = getAuthors(book_array);

        const authors_set = new Set(authors_array.sort())
        populateSelect(authors_set, "author_option", "author_select")
        categories_array = getCategory(book_array)
        const categories_set = new Set(categories_array.sort())
        populateSelect(categories_set, "category_option", "category_select")
        console.log(document.querySelectorAll('#main_titles .card').length)

        document.getElementById("author_select").addEventListener('change', (e) => {
            sortBy("author_select", "data-authors");
        })

        document.getElementById("category_select").addEventListener('change', (e) => {
            sortBy("category_select", "data-categories");
        })

    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

function getBooks(data) {
    let array = [];
    for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            const element = data[i];
            array.push(element);
        }
    }
    return array;
}

function createCards(book_array) {
    book_array.forEach(book => {
        if (book.thumbnailUrl == undefined) {
            book.thumbnailUrl = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png"
        }
        if (book.isbn == undefined) {
            book.isbn = "n/A"
        }
        if (book.publishedDate == undefined) {
            book.publishedDate = "n/A"
        } else {
            book.publishedDate.dt_txt = book.publishedDate.dt_txt.substring(0, 10)
        }
        
        let card = document.createElement("article");
        card.setAttribute("data-authors", JSON.stringify(book.authors));
        card.setAttribute("data-categories", JSON.stringify(book.categories));
        card.className = "card";
        card.id = book.title;
        if (book.shortDescription == undefined) {
            card.innerHTML =
            `<img class="cover" src="${book.thumbnailUrl}" alt="${book.title}">
        <div class="card_text">
        <h1>${book.title}</h1>
        <p>ISBN : ${book.isbn}</p>
        <p>Published : ${book.publishedDate.dt_txt}</p>
        <p>Page count : ${book.pageCount}</p>
        </div>`
        } else {
            card.innerHTML =
            `<img class="cover" src="${book.thumbnailUrl}" alt="${book.title}">
        <div class="card_text">
        <h1>${book.title}</h1>
        <p>ISBN : ${book.isbn}</p>
        <p>Published : ${book.publishedDate.dt_txt}</p>
        <p>Page count : ${book.pageCount}</p>
        <p class="desc">Description : ${book.shortDescription}</p>
        </div>`
        }
        
        document.getElementById("main_titles").appendChild(card)

    });
}

function getAuthors(book_array) {
    let array = new Array();
    let authors_array = new Array();
    for (const i in book_array) {
        if (Object.prototype.hasOwnProperty.call(book_array, i)) {
            const authors = book_array[i].authors;
            authors_array.push(authors);

        }
    }
    authors_array.forEach(authors => {
        authors.forEach(author => {
            if (author != undefined) {
                array.push(author)
            }
        });
    });
    return array;
}

function getCategory(book_array) {
    let array = new Array();
    let categories_array = new Array();
    for (const i in book_array) {
        if (Object.prototype.hasOwnProperty.call(book_array, i)) {
            const categories = book_array[i].categories;
            categories_array.push(categories);

        }
    }
    categories_array.forEach(categories => {
        categories.forEach(category => {
            if (category != undefined) {
                array.push(category)
            }
        });
    });
    return array;
}

function populateSelect(set, className, parent) {
    set.forEach(element => {
        let option = document.createElement("option");
        option.className = className;
        option.innerText = element
        document.getElementById(parent).appendChild(option)
    });
}

function sortBy(select, attribute) {
    let cards = document.querySelectorAll('#main_titles .card');
    let selected = document.getElementById(select).value;
    if (selected == "defaultValue") {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            let dataAttribute = [...JSON.parse(cards[i].getAttribute(attribute))];
            if (!dataAttribute.includes(selected)) {
                cards[i].style.display = "none";
            } else {
                cards[i].style.display = "block";
                // console.log(dataAuthors.length)
            }
        }
    }
    let selectors = document.querySelectorAll('#header .select');
    selectors.forEach(element => {
        if (element.id != select) {
            element.selectedIndex = 0;
            console.log(element.id);
        }
    });

}




