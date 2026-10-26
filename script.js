
// Счетчик для нумерации элементов
let elementCounter = 0;

// Получаем ссылки на DOM элементы
const addElementBtn = document.getElementById('addElementBtn');
const colorElementBtn = document.getElementById('colorElementBtn');
const clearBtn = document.getElementById('clearBtn');
const elementsContainer = document.getElementById('elementsContainer');

// Функция для добавления нового элемента
function addNewElement() {
    elementCounter++;

    // Создаем новый div элемент
    const newElement = document.createElement('div');

    // Добавляем базовый CSS класс
    newElement.className = 'dynamic-element';

    // Устанавливаем уникальный ID
    newElement.id = `element-${elementCounter}`;

    // Добавляем содержимое
    newElement.innerHTML = `
        <h3>Элемент #${elementCounter}</h3>
        <p>Это динамически добавленный элемент. Нажмите "Окрасить элементы" чтобы применить CSS стили.</p>
    `;

    // Добавляем элемент в контейнер
    elementsContainer.appendChild(newElement);

    // Логируем действие в консоль
    console.log(`Добавлен элемент #${elementCounter}`);
}
//------------------------------------------------------------------
// Функция для окрашивания всех элементов
function colorElements() {
    // Получаем все динамически добавленные элементы
    const dynamicElements = document.querySelectorAll('.dynamic-element');

    if (dynamicElements.length === 0) {
        alert('Сначала добавьте элементы для окрашивания!');
        return;
    }

    // Применяем CSS класс для окрашивания к каждому элементу
    dynamicElements.forEach((element, index) => {
        // Добавляем класс с задержкой для красивого эффекта
        setTimeout(() => {
            element.classList.add('colored-element');
        }, index * 100);
    });

    console.log(`Окрашено ${dynamicElements.length} элементов`);
}

// Функция для очистки контейнера
function clearElements() {
    // Очищаем контейнер
    elementsContainer.innerHTML = '';

    // Сбрасываем счетчик
    elementCounter = 0;

    console.log('Все элементы удалены');
}

// Функция для снятия окраски (бонусная функция)
function removeColoring() {
    const coloredElements = document.querySelectorAll('.colored-element');

    coloredElements.forEach(element => {
        element.classList.remove('colored-element');
    });

    console.log(`Снято окрашивание с ${coloredElements.length} элементов`);
}

// Добавляем обработчики событий
addElementBtn.addEventListener('click', addNewElement);

colorElementBtn.addEventListener('click', () => {
    // Если все элементы уже окрашены, снимаем окраску
    const allElements = document.querySelectorAll('.dynamic-element');
    const coloredElements = document.querySelectorAll('.colored-element');

    if (allElements.length > 0 && allElements.length === coloredElements.length) {
        removeColoring();
    } else {
        colorElements();
    }
});

clearBtn.addEventListener('click', clearElements);

// Добавляем обработчик для клавиатурных сокращений (бонус)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'a':
                e.preventDefault();
                addNewElement();
                break;
            case 'c':
                e.preventDefault();
                colorElements();
                break;
            case 'x':
                e.preventDefault();
                clearElements();
                break;
        }
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена. Готово к демонстрации!');
    console.log('Горячие клавиши: Ctrl+A - добавить, Ctrl+C - окрасить, Ctrl+X - очистить');
});