import {Component, OnInit} from '@angular/core';
import {Book} from './book';
import {BookService} from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;

  /**
   * 通过构造器注入Service
   * @param {BookService} bookService service对象
   */
  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getBookList();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  getBookList(): void {
    this.bookService.getBook().subscribe((data) => {
      this.books = data;
    });
  }
}
