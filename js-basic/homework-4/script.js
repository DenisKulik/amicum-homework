/* 1. Написать функцию, преобразующую число в объект.
Передавая на вход число в диапазоне [0, 999],
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны разряды числа:
 - единицы (в свойстве units)
 - десятки (в свойстве tens)
 - сотни (в свойстве hundereds)

Если число было передано вне [0, 999] диапазона, не целое число или вообще не число,
необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект. */

function numberToObj(num) {
    if (typeof num !== 'number' || num < 0 || num > 999) {
        console.log('Incorrect number')
        return {}
    }
    return {
        units: num % 10,
        tens: Math.floor(num / 10) % 10,
        hundreds: Math.floor(num / 100)
    }
}

console.log(numberToObj(123))
console.log(numberToObj(23))

/* 1.1 Сделайте в стиле es5, а затем в стиле es6, конструктор Product,
который принимает параметры name и price, сохраните их как свойства объекта.
Также объекты типа Product должны иметь метод make25PercentDiscount,
который будет уменьшать цену в объекте на 25%. Имейте в виду, что метод make25PercentDiscount
не должен быть внутри функции-конструктора, и также не нужно создавать отдельный объект-прототип. */

function Product(name, price) {
    this.name = name
    this.price = price
}

Product.prototype.make25PercentDiscount = function () {
    this.price = this.price * 0.75
}

const product = new Product('Product', 100)
product.make25PercentDiscount()
console.log(product)

class ProductClass {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    make25PercentDiscount() {
        this.price = this.price * 0.75
    }
}

const productInstance = new ProductClass('Product', 100)
productInstance.make25PercentDiscount()
console.log(productInstance)

/* 1.2 Сделайте в стиле es5, а затем в стиле es6,
а) конструктор Post, который принимает параметры author, text, date и сохраняет
их как свойства объекта. Объекты типа Post должны иметь метод edit, который будет
принимать текст и записывать его в свойство text объекта.
б) конструктор AttachedPost, который принимает параметры author, text, date.
Проинициализируйте эти свойства с помощью конструктора Post, чтобы не
дублировать код. Также в конструкторе AttachedPost должно создаваться свойство
highlighted со значением false. Унаследуйте в объектах типа AttachedPost методы из Post.
Объекты типа AttachedPost должны иметь метод makeTextHighlighted,
который будет назначать свойству highlighted значение true. */

function Post(author, text, date) {
    this.author = author
    this.text = text
    this.date = date
}

Post.prototype.edit = function (text) {
    this.text = text
}

const post = new Post('author', 'text', 'date')
post.edit('new text')
console.log(post)

function AttachedPost(author, text, date) {
    Post.call(this, author, text, date)
    this.highlighted = false
}

AttachedPost.prototype = Object.create(Post.prototype)

AttachedPost.prototype.makeTextHighlighted = function () {
    this.highlighted = true
}

const attachedPost = new AttachedPost('author', 'text', 'date')
attachedPost.makeTextHighlighted()
console.log(attachedPost)

class PostClass {
    constructor(author, text, date) {
        this.author = author
        this.text = text
        this.date = date
    }

    edit(text) {
        this.text = text
    }
}

class AttachedPostClass extends PostClass {
    constructor(author, text, date) {
        super(author, text, date)
        this.highlighted = false
    }

    makeTextHighlighted() {
        this.highlighted = true
    }
}

const postInstance = new PostClass('author', 'text', 'date')
postInstance.edit('new text')
console.log(postInstance)

const attachedPostInstance = new AttachedPostClass('author', 'text', 'date')
attachedPostInstance.makeTextHighlighted()
console.log(attachedPostInstance)


