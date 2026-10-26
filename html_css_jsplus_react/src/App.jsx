import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // Вместо DOM-элементов и счётчика elementCounter храним массив данных.
  // Каждый элемент: { id: номер, colored: окрашен ли }
  const [elements, setElements] = useState([])

  // Здесь запоминаем id таймеров setTimeout, чтобы отменить их при очистке
  const timers = useRef([])

  // Добавление нового элемента
  const addNewElement = () => {
    const id = elements.length + 1 // номер = текущее количество + 1
    setElements([...elements, { id, colored: false }])
    console.log(`Добавлен элемент #${id}`)
  }

  // Окрашивание всех элементов по очереди (с задержкой 100 мс)
  const colorElements = () => {
    if (elements.length === 0) {
      alert('Сначала добавьте элементы для окрашивания!')
      return
    }

    elements.forEach((el, index) => {
      const timerId = setTimeout(() => {
        setElements(prev =>
          prev.map(item =>
            item.id === el.id ? { ...item, colored: true } : item
          )
        )
      }, index * 100)
      timers.current.push(timerId)
    })

    console.log(`Окрашено ${elements.length} элементов`)
  }

  // Снятие окраски
  const removeColoring = () => {
    const count = elements.filter(el => el.colored).length
    setElements(elements.map(el => ({ ...el, colored: false })))
    console.log(`Снято окрашивание с ${count} элементов`)
  }

  // Очистка: отменяем незавершённые таймеры и обнуляем массив
  const clearElements = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setElements([])
    console.log('Все элементы удалены')
  }

  // Кнопка «Окрасить элементы»: если всё уже окрашено, снимаем окраску
  const handleColorClick = () => {
    const allColored =
      elements.length > 0 && elements.every(el => el.colored)

    if (allColored) {
      removeColoring()
    } else {
      colorElements()
    }
  }

  // Горячие клавиши (аналог document.addEventListener('keydown', ...))
  // Без второго аргумента эффект перезапускается после каждого рендера,
  // поэтому обработчик всегда видит актуальный массив elements.
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'a':
            e.preventDefault()
            addNewElement()
            break
          case 'c':
            e.preventDefault()
            colorElements()
            break
          case 'x':
            e.preventDefault()
            clearElements()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Функция очистки: убираем старый обработчик перед установкой нового
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  // Аналог DOMContentLoaded: выполняется один раз при появлении компонента
  useEffect(() => {
    console.log('Страница загружена. Готово к демонстрации!')
    console.log(
      'Горячие клавиши: Ctrl+A - добавить, Ctrl+C - окрасить, Ctrl+X - очистить'
    )
  }, [])

  return (
    <div className="container">
      <h1>Демонстрация динамического добавления элементов</h1>

      <div className="controls">
        <button id="addElementBtn" onClick={addNewElement}>
          Добавить элемент
        </button>
        <button id="colorElementBtn" onClick={handleColorClick}>
          Окрасить элементы
        </button>
        <button id="clearBtn" onClick={clearElements}>
          Очистить
        </button>
      </div>

      <div id="elementsContainer" className="elements-container">
        {/* Элементы строятся из массива, а не через createElement */}
        {elements.map(el => (
          <div
            key={el.id}
            id={`element-${el.id}`}
            className={'dynamic-element' + (el.colored ? ' colored-element' : '')}
          >
            <h3>Элемент #{el.id}</h3>
            <p>
              Это динамически добавленный элемент. Нажмите &quot;Окрасить
              элементы&quot; чтобы применить CSS стили.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App