const Database = require("./dataBase.js")
const Book = require("./entitie/Book.js")
const Order = require("./entitie/Order.js")
const Author = require("./entitie/Author.js")
const Poster = require("./entitie/Poster.js")
const User = require("./entitie/User.js")

module.exports = class  App {
    static #database = new Database()

    createUser(name, email, password){
        const user = new User(name, email, password)
        App.#database.saveUser(user)
    }

    getUsers(){
        return App.#database.find('users')
    }

    createAuthor(name, nationality, bio){
        const author = new Author(name, nationality, bio)
        App.#database.saveAuthor(author)
    }

    getAuthors(){
        return App.#database.find('authors')
    }

    createBook(title, synopsis, genre, pages, author, description, price, inStock){
        const book = new Book(title, synopsis, genre, pages, author, description, price, inStock)
        App.#database.saveBook(book)
    }

    addBook(bookName, quantity){
        App.#database.addBooksToStock(bookName, quantity)
    }

    getBooks(){
        return App.#database.find('books')
    }

    createPoster(name, description, height, width, price, inStock){
        const poster = new Poster(name, description, height, width, price, inStock)
        App.#database.savePoster(poster)
    }

    addPoster(posterName, quantity){
        App.#database.addPostersToStock(posterName, quantity)
    }

    getPosters(){
        return App.#database.find('posters')
    }

    createOrder(items, user){
        const order = new Order(items, user)
        App.#database.saveOrder(order)
        order.data.items.forEach(({product, quantity}) => {
            if(product instanceof Book){
                App.#database.removeBooksFromStock(product.name, quantity)
            } else if(product instanceof Poster){
                App.#database.removePosterFromStock(product.name, quantity)
            }
        })
    }

    getOrders(){
        return App.#database.find('orders')
    }

    showDatabase(){
        App.#database.showStorage()
    }
}