import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {Book} from './books/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [
    {'id': 1, 'name': 'Python'},
    {'id': 2, 'name': 'Java'},
    {'id': 3, 'name': 'C++'},
    {'id': 4, 'name': 'TypeScript'},
    {'id': 5, 'name': 'Go'},
    {'id': 6, 'name': 'Ruby'},
    {'id': 7, 'name': 'C#'}
  ];

  constructor(private messageSevice: MessageService) {
  }

  getBook(): Observable<Book[]> {
    this.messageSevice.add('fetch book list');
    return of(this.books);
  }

  getBookById(id: number) {
    this.messageSevice.add(`HeroService: fetched hero id=${id}`);
    return of(this.books.find(book => book.id === id));
  }
}
