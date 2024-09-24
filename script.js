// Define the API endpoint
const apiUrl = "./books.json";
// Fetch JSON data from the API
let book_array = [];
let titles_array = [];
let thumbnail_array = [];
fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    })
    .then((data) => {
        // Process the JSON data
        console.log("Data from API:", data);

        book_array = getBooks(data);
        titles_array = getTitles(book_array);
        thumbnail_array = getThumbnails(book_array)
        thumbnail_array.forEach(img => {
            console.log(img)
            let thumbnail = document.createElement("div")
            thumbnail.className = "thumbnail"
            thumbnail.innerHTML = `<img class="cover" src="${img}">`
            document.body.appendChild(thumbnail);
        });
        // let object = data;
        // isolate every book element from JSON
        // for (const i in object) {
        //     if (Object.prototype.hasOwnProperty.call(object, i)) {
        //         const book = object[i];
        //         // isolate authors
        //         for (const j in book.authors) {
        //             if (Object.prototype.hasOwnProperty.call(book.authors, j)) {
        //                 const author = book.authors[j];
        //                 if (author != "") {
        //                     let author_option = document.createElement("option");
        //                     author_option.className = "author_option";
        //                     author_option.id = author;
        //                     author_option.innerHTML = author;
        //                     document.getElementById("author_select").appendChild(author_option);
        //                 }
        //             }
        //         }

        //         // isolate categories
        //         for (const j in book.categories) {
        //             if (Object.prototype.hasOwnProperty.call(book.categories, j)) {
        //                 const category = book.categories[j];
        //                 if (category != "") {
        //                     let category_option = document.createElement("option");
        //                     category_option.className = "category";
        //                     category_option.id = category;
        //                     category_option.innerHTML = category;
        //                     document.getElementById("category_select").appendChild(category_option);
        //                 }
        //             }
        //         }


        //         // isolate titles
        //         const title = book.title;
        //         if (title != "") {
        //             let title_h1 = document.createElement("h1");
        //             title_h1.className = "title_card";
        //             title_h1.id = title;
        //             title_h1.innerHTML = title;
        //             document.getElementById("main_titles").appendChild(title_h1);
        //             // document.getElementById(title).appendChild(book.authors.toString());
        //         }




        //     }
        // }

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

function getTitles(input_array) {
    let array = [];
    for (const i in input_array) {
        if (Object.prototype.hasOwnProperty.call(input_array, i)) {
            const element = input_array[i].title;
            array.push(element)
        }
    }
    return array;
}

function getThumbnails(input_array) {
    let array = [];
    for (const i in input_array) {
        if (Object.prototype.hasOwnProperty.call(input_array, i)) {
            const element = input_array[i].thumbnailUrl;
            array.push(element)
        }
    }
    return array;
}

function createCards(titles_array) {

}





