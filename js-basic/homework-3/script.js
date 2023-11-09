/* 1. С помощью цикла for написать алгоритм для вывода чисел (выводите в консоль,
 с помощью console.log) от 0 до 10 включительно, чтобы результат выглядел так:

0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
…
10 – четное число. */

for (let i = 0; i <= 10; i++) {
    if (i === 0) {
        console.log('0 - это ноль')
        continue
    }

    if (i % 2 === 0) {
        console.log(`${i} - четное число`)
    } else {
        console.log(`${i} - нечетное число`)
    }
}

/* Выведите в консоль значения, указанные рядом с комментариями: */
const post = {
    author: 'John', //вывести этот текст
    postId: 23,
    comments: [
        {
            userId: 10,
            userName: 'Alex',
            text: 'lorem ipsum',
            rating: {
                likes: 10,
                dislikes: 2 //вывести это число
            }
        },
        {
            userId: 5, //вывести это число
            userName: 'Jane',
            text: 'lorem ipsum 2', //вывести этот текст
            rating: {
                likes: 3,
                dislikes: 1
            }
        },
    ]
}

console.log(post.comments[0].rating.likes)
console.log(post.comments[1].userId)
console.log(post.comments[1].text)

/* 3. Перед вами находится массив с продуктами, сегодня распродажа и вам нужно на каждый
товар применить скидку 15%. */

const products = [
    {
        id: 3,
        price: 200,
    },
    {
        id: 4,
        price: 900,
    },
    {
        id: 1,
        price: 1000,
    },
]

const productsWithDiscount = products.map(product => ({
    ...product,
    price: product.price - (product.price * 15) / 100
}))

console.log(productsWithDiscount)

/* 4. Перед вами находится массив с продуктами в интернет-магазине. Вам нужно:
1. Получить все товары, у которых есть фотографии
2. Отсортируйте товары по цене (от низкой цены к высокой). */

const newProducts = [
    {
        id: 3,
        price: 127,
        photos: [
            '1.jpg',
            '2.jpg',
        ]
    },
    {
        id: 5,
        price: 499,
        photos: []
    },
    {
        id: 10,
        price: 26,
        photos: [
            '3.jpg'
        ]
    },
    {
        id: 8,
        price: 78,
    },
]

const productsWithPhotos = newProducts.filter(product => product.photos?.length)
const productsSortedByPrice = [ ...newProducts ].sort(
    (a, b) => a.price - b.price)
console.log(productsWithPhotos, productsSortedByPrice)

/* Вывести с помощью цикла
for числа от 0 до 9, НЕ используя тело цикла. То есть выглядеть должно примерно так:
for(…){ здесь пусто }. */

for (let i = 0; i < 10; console.log(i++)) {}

/* 6.  Нарисовать горку с помощью console.log (используя цикл for), как показано на рисунке,
только у вашей горки должно быть 20 рядов. */

for (let i = 1; i <= 20; i++) {
    console.log('x'.repeat(i))
}

