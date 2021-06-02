import {Component, OnInit} from '@angular/core';
import {PetitionService} from '../../shared/services/petition.service';
import {Petition} from '../../shared/models/petition';
import {FormControl, FormGroup} from '@angular/forms';
import {PetitionParameters} from '../../shared/params/PetitionParameters';
import {Category} from '../../shared/models/category';

@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.css']
})
export class PetitionsComponent implements OnInit {
  public totalPetitions: number;
  public totalVotes = 0;
  public pageSize = 6;
  public petitions: Petition[];
  public paginatedPetitions: Petition[];
  public pagesCount: number;

  public categories: Category[];

  form: FormGroup = new FormGroup({
    petitionName: new FormControl('', null),
    authorName: new FormControl('', null),
    categoryName: new FormControl(null, null),
    statusName: new FormControl(null, null)
  });

  parameters: PetitionParameters = {
    title: '',
    creator: '',
    category: null,
    successful: null
  };

  constructor(private petitionService: PetitionService) {
  }

  ngOnInit(): void {
    this.petitionService.getPetitions(this.parameters).subscribe(response => {
      this.petitions = response;
      this.paginationInit(this.petitions);
      this.paginatePetitions(1);

      this.petitionService.getCategories().subscribe(response => {
        this.categories = response;
      });

      this.makeStatistics();
    });
  }

  public paginationInit(petitions: Petition[]): void {
    this.pagesCount = Math.ceil(petitions.length / this.pageSize);
  }

  public paginatePetitions(pageNumber: number): void {
    const petitionsToSlice = (pageNumber - 1) * this.pageSize;
    this.paginatedPetitions = this.petitions.slice(petitionsToSlice, petitionsToSlice + this.pageSize);
  }

  searchFiltersChanged(): boolean {
    return this.form.get('petitionName')?.value !== this.parameters.title
      || this.form.get('authorName')?.value !== this.parameters.creator
      || this.form.get('categoryName')?.value !== this.parameters.category
      || this.form.get('categoryName')?.value === 'random'
      || this.form.get('statusName')?.value !== this.parameters.successful;
  }

  public onSearch(): void {
    this.parameters.title = this.form.get('petitionName')?.value;
    this.parameters.creator = this.form.get('authorName')?.value;
    if (this.form.get('categoryName')?.value === 'random') {
      const randomId = this.categories[this.categories[Math.floor(Math.random() * this.categories.length)].id - 1].id;
      this.form.get('categoryName')?.setValue(randomId);
    }
    this.parameters.category = this.form.get('categoryName')?.value;
    this.parameters.successful = this.form.get('statusName')?.value;

    this.petitionService.getPetitions(this.parameters).subscribe(response => {
      this.petitions = response;
      this.paginationInit(this.petitions);
      this.paginatePetitions(1);
    });
  }

  public makeStatistics(): void {
    this.totalPetitions = this.petitions.length;
    this.petitions.forEach(p => {
      this.totalVotes += p.vote_count;
    });
  }
}
