import { useState } from 'react'

import './App.css'

function App() {

  // Вместо document.getElemetById + classList.toggle - состояние React
  const [showOriginal, setShowOriginal] = useState(false)

  // Если true - добавляем класс подсветки к сдвинутым блокам 
  const highlight = showOriginal ? ' show-original' : ''

  return (

    <>
      <h1>Демонстрация позиционирования</h1>

      <div className="container">
        <h2>position: static (по умолчанию) </h2>
        <div className="box static-box">Я static</div>
        <div className={'box static-box shifted' + highlight}>
          У меня top: 20px; left: 30px - но это НЕ работает!
        </div>
        <div className="box static-box">Я соседний блок</div>
      </div>

      <div className="container">
        <h2>position: relative</h2>
        <div className="box relative-box">Я relative</div>
        <div className={'box relative-box shifted-relative' + highlight}>
          у меня top: 20px; left: 30px - сдвинулся!
        </div>
        <div className="box relative-box">
          Я соседний блок (место первого сохранено)
        </div>
      </div>

      <button onClick={() => setShowOriginal(prev => !prev)}>
        Показать/скрыть красную рамку у сдвинутых блоков
      </button>

      <p>
        Нажмите кнопку, чтобы увидеть, какое место блок занимает в потоке документа.
      </p>

    </>
  )



}

export default App
