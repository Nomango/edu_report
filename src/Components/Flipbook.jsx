// turnjs
import React from 'react'
import { initFlipbook, loadBook, closeBook } from '../assets/js/load_flipbook.js'
import '../assets/css/flipbook.css'

initFlipbook()

class Flipbook extends React.Component {
  constructor(props) {
    super(props)
    let thisbook = this;
    props.books.map((book) => {
      book.open = () => {
        thisbook.open(book);
      }
    })
  }

  render() {
    return (
      <div id="canvas">
        <div className="close-icon" onClick={this.close}></div>
        <div className="zoom-icon zoom-icon-in"></div>
        <div className="flipbook-viewport">
          <div className="container">
            <div className="flipbook"></div>
          </div>
          <div ignore="1" className="next-button">
          </div>
          <div ignore="1" className="previous-button">
          </div>
        </div>
      </div>
    )
  }

  open(book) {
    loadBook(book)
  }

  close() {
    closeBook()
  }
}

export default Flipbook
