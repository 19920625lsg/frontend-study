import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../books/book';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../book.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() book: Book;

  constructor(private router: ActivatedRoute, private bookService: BookService, private location: Location) {

  }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe((data) => {
      this.book = data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
