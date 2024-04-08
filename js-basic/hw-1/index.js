/* 1. Задать температуру в градусах по Цельсию. Вывести в alert соответствующую
температуру в градусах по Фаренгейту. Подсказка: расчёт идёт по формуле:
Tf = (9 / 5) * Tc + 32;
где Tf – температура по Фаренгейту, Tc – температура по Цельсию */

/**
 * @param {number} celsius
 * @returns {number} fahrenheit
 */
function celsiusToFahrenheit(celsius) {
  console.log((9 / 5) * celsius + 32);
}

celsiusToFahrenheit(30);
/*
Объявить две переменные: admin и name. Записать в name строку
"Василий". Скопировать значение из name в admin. Вывести в
консоль переменную admin (должно вывести "Василий")
 */

let admin,
    name;
name = "Василий";
admin = name;
console.log(admin);

/*
3. Вывести в консоль значения выражений и объяснить почему получились такие
значения используя комментарии к каждому выражению:

10 + 10 + "10";
10 + "10" + 10;
10 + 10 + +"10"; (обратите внимание на пробелы, пишите также)
10 / -"";
10 / +"2,5"; (да здесь запятая, это не опечатка)
 */

console.log(10 + 10 + "10"); // 10 + 10 = 20, 20 конкатенируем со строкой "10" получаем "2010"
console.log(10 + "10" + 10); // аналогично, 10 + "10" = "1010", "1010" + 10 = "101010"
console.log(10 + 10 + +"10"); // 10 + 10 = 20, (+10 - неявное приведение к числу) 20 + 10 = 30
console.log(10 / -""); // 10 делим на -0 (Опять неявное приведение типов, пустая строка приводится в 0), число на -0 = Infinity
console.log(10 / +"2,5"); // Приведение типов приведет к NaN, т.к. в JS дробные числа разделяются точкой. 10 / NaN = NaN