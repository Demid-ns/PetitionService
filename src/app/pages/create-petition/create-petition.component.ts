import {Component, OnInit} from '@angular/core';
import {PetitionService} from '../../shared/services/petition.service';
import {Category} from '../../shared/models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Petition} from "../../shared/models/petition";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-petition',
  templateUrl: './create-petition.component.html',
  styleUrls: ['./create-petition.component.css']
})
export class CreatePetitionComponent implements OnInit {
  public createDate: Date;
  public expireDate: Date;

  public categories: Category[];

  form: FormGroup = new FormGroup({
    petitionName: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
    categoryName: new FormControl(1, [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
    text: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
  });

  constructor(private petitionService: PetitionService,
              private router: Router) {
    this.createDate = new Date();
    this.expireDate = new Date();
    this.expireDate.setDate(this.expireDate.getDate() + 14);
  }

  ngOnInit(): void {
    this.petitionService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  submit(): void {
    if (this.form.valid) {
      const petitionToSubmit = new Petition();
      petitionToSubmit.title = this.form.get('petitionName')?.value;
      petitionToSubmit.description = this.form.get('description')?.value;
      petitionToSubmit.text = this.form.get('text')?.value;
      petitionToSubmit.category = this.form.get('categoryName')?.value;

      this.petitionService.createPetition(petitionToSubmit).subscribe(response => {
        this.router.navigate(['/petitions', response?.id]);
      });
    }
  }
}
