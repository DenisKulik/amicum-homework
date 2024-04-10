/*
1. (это задание делайте по желанию)
Написать функцию, преобразующую число в объект.
Передавая на вход число в диапазоне [0, 999],
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны разряды числа:
 - единицы (в свойстве units)
 - десятки (в свойстве tens)
 - сотни (в свойстве hundereds)
Например, для числа 45 мы должны получить следующий объект:

{
  units: 5, //это единицы
  tens: 4,  //это десятки
  hundreds: 0, //это сотни
}

Если число было передано вне [0, 999] диапазона, не целое число или вообще не число,
необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

Вам может пригодиться:
- Number.isInteger(value) – функция проверяет, является ли переданное число целым, подробнее
здесь https://mzl.la/2XCVSsx
- Math.floor(value) - метод возвращает целое число, которое меньше или равно
данному числу (проще говоря округляет в меньшую сторону), подробнее здесь https://mzl.la/2Qx42SO
- Используйте также остаток от деления на 10, например 123 % 10 будет 3
- Вам также может пригодиться делить число на 100 и на 10.
 */

function numberToObj(number) {
  if (Number.isInteger(number) && number >= 0 && number <= 999) {
    return {
      units: Math.floor(number % 10),
      tens: Math.floor(number / 10) % 10,
      hundreds: Math.floor(number / 100),
    };
  }
  return {};
}

console.log(numberToObj(45));
console.log(numberToObj(150));

/*
1.1 (это обязательное задание) Сделайте в стиле es5, а затем в стиле es6
(по аналогии из дополнительных видео -> 3 примеры наследования -> типы на es5 и es6),
конструктор Product, который принимает параметры name и price, сохраните их как
свойства объекта. Также объекты типа Product должны иметь метод make25PercentDiscount,
который будет уменьшать цену в объекте на 25%. Имейте в виду, что метод make25PercentDiscount
не должен быть внутри функции-конструктора, и также не нужно создавать отдельный объект-прототип
(как объект transport в уроке).
 */

function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.make25PercentDiscount = function () {
  this.price = this.price * 0.75;
};

const product = new Product('Laptop', 1000);
product.make25PercentDiscount();
console.log(product);

class ProductClass {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  make25PercentDiscount() {
    this.price = this.price * 0.75;
  }
}

const productClass = new ProductClass('Laptop', 1000);
productClass.make25PercentDiscount();
console.log(productClass);

/*
1.2 (это обязательное задание) Сделайте в стиле es5, а затем в стиле es6 (по
аналогии из дополнительных видео -> 3 примеры наследования -> механика наследования),
а) конструктор Post, который принимает параметры author, text, date и сохраняет
их как свойства объекта. Объекты типа Post должны иметь метод edit, который будет
принимать текст и записывать его в свойство text объекта.
б) конструктор AttachedPost, который принимает параметры author, text, date.
Проинициализируйте эти свойства с помощью конструктора Post, чтобы не
дублировать код. Также в конструкторе AttachedPost должно создаваться свойство
highlighted со значением false. Унаследуйте в объектах типа AttachedPost методы из Post.
Объекты типа AttachedPost должны иметь метод makeTextHighlighted,
который будет назначать свойству highlighted значение true.
 */
// a
function Post(author, text, date) {
  this.author = author;
  this.text = text;
  this.date = date;
}

Post.prototype.edit = function (text) {
  this.text = text;
};

const post = new Post('John', 'Hello, world!', 'April 10, 2024');
console.log(post);
post.edit('Text updated!');
console.log(post);

class PostClass {
  constructor(author, text, date) {
    this.author = author;
    this.text = text;
    this.date = date;
  }

  edit(text) {
    this.text = text;
  }
}

const postClass = new PostClass('John', 'Hello, world!', 'April 10, 2024');
console.log(postClass);
postClass.edit('Text updated!');
console.log(postClass);


// b

function AttachedPost(author, text, date) {
  Post.call(this, author, text, date);
  this.highlighted = false;
}

AttachedPost.prototype = Object.create(Post.prototype);
AttachedPost.prototype.constructor = AttachedPost;
AttachedPost.prototype.makeTextHighlighted = function () {
  this.highlighted = true;
};

const attachedPost = new AttachedPost('John', 'Hello, world!', 'April 10, 2024');
console.log(attachedPost);
attachedPost.makeTextHighlighted();
console.log(attachedPost);

class AttachedPostClass extends PostClass {
  constructor(author, text, date) {
    super(author, text, date);
    this.highlighted = false;
  }

  makeTextHighlighted() {
    this.highlighted = true;
  }
}

const attachedPostClass = new AttachedPostClass('John', 'Hello, world!', 'April 10, 2024');
console.log(attachedPostClass);
attachedPostClass.makeTextHighlighted();
console.log(attachedPostClass);
