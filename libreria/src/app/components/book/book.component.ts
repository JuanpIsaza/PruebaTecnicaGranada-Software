import { Component, OnInit, NgZone } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  listbook: any = [];
  newBook = false;

  idBook = 300;

  newBookForm: FormGroup;
  submitted = false;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private bookService: BooksService, private formBuilder: FormBuilder, private ngZone: NgZone,
              private router: Router, ) { }

  ngOnInit() {
    this.loadbooks();

    this.newBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      publishDate: ['', Validators.required],
      pageCount: [''],
      description: ['', [Validators.required]],
      excerpt: [''],
    });

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

  doNewBook() {
    this.newBook = true;
  }

  onSubmit() {

    this.submitted = true;

    if (this.newBookForm.invalid) {
      return;
    }
    // console.log(this.newBookForm.value);
    this.createBook(this.newBookForm.value);
  }

  createBook(book) {
    book.id = this.idBook;
    console.log('Crear libro');
    this.bookService.createBook(book).subscribe(res => {
      console.log('Libro agregado!');
      this.idBook++;
      console.log(this.idBook);
      location.reload();
    });
  }

  get f() { return this.newBookForm.controls; }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Selecciona una imagen.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
  }
}
