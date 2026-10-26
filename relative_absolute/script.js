
// Находим элементы на странице с помощью CSS-селекторов
const colorBtn = document.querySelector('#colorBtn');
const relBox = document.querySelector('.relative-box');
const absBox = document.querySelector('.absolute-box');

let isAltColor = false;

// Обработчик события клика на кнопку
colorBtn.addEventListener('click', () => {
    if (!isAltColor) {
        // Меняем цвета на альтернативные через изменение inline-стилей CSS
        relBox.style.backgroundColor = '#4caf50'; // Зеленый для Relative
        absBox.style.backgroundColor = '#9c27b0'; // Фиолетовый для Absolute

        colorBtn.textContent = 'Сбросить цвета CSS';
        isAltColor = true;
    } else {
        // Возвращаем исходные цвета
        relBox.style.backgroundColor = '#ff9800';
        absBox.style.backgroundColor = '#e91e63';

        colorBtn.textContent = 'Перехватить CSS и изменить цвет';
        isAltColor = false;
    }
});