import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  listbook: any = [];

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.loadbooks();
  }

  loadbooks() {
    return this.bookService.getAllBooks().subscribe((data: {}) => {
      this.listbook = data;
      console.log(this.listbook);
    });
  }

  detailBook(book) {
    console.log(book);
  }

}
