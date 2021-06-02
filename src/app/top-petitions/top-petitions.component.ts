import {Component, OnInit} from '@angular/core';
import {PetitionService} from '../shared/services/petition.service';
import {Petition} from '../shared/models/petition';
import {PetitionParameters} from '../shared/params/PetitionParameters';

@Component({
  selector: 'app-top-petitions',
  templateUrl: './top-petitions.component.html',
  styleUrls: ['./top-petitions.component.css']
})
export class TopPetitionsComponent implements OnInit {
  public topPetitions: Petition[];

  constructor(private petitionService: PetitionService) {
  }

  parameters: PetitionParameters = {
    title: '',
    creator: '',
    category: null,
    successful: null
  };

  ngOnInit(): void {
    this.petitionService.getPetitions(this.parameters).subscribe(response => {
      this.topPetitions = response.sort((a, b) => {
        return b.vote_count - a.vote_count;
      }).slice(0, 4);
    });
  }
}
