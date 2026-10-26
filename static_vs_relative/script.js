
const btn = document.getElementById('toggleBtn');

btn.addEventListener('click', () => {
    // Подсвечиваем оба "сдвинутых" блока, чтобы показать,
    // что static не сдвигается, а relative сдвигается,
    // но его место в потоке остаётся занятым.
    document.querySelectorAll('.shifted, .shifted-relative')
        .forEach(el => el.classList.toggle('show-original'));
});