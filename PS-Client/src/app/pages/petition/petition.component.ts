import {Component, OnInit} from '@angular/core';
import {PetitionService} from '../../shared/services/petition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Petition} from '../../shared/models/petition';
import {VotedUser} from '../../shared/models/votedUser';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.css']
})
export class PetitionComponent implements OnInit {
  public urlId: number;
  public petition: Petition;

  public informationActivated = true;
  public participatingActivated = false;
  public supportActivated = false;

  public votedUsers: VotedUser[];

  constructor(
    private petitionService: PetitionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.urlId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.urlId)) {
      this.router.navigate(['petitions']);
      return;
    }

    this.petitionService.getPetition(this.urlId).subscribe(response => {
      this.petition = response;
    });

    this.petitionService.getVotedUsers(this.urlId).subscribe(response => {
      this.votedUsers = response;
    });
  }

  activateInformation(): void {
    this.informationActivated = true;
    this.participatingActivated = false;
    this.supportActivated = false;
  }

  activateParticipating(): void {
    this.informationActivated = false;
    this.participatingActivated = true;
    this.supportActivated = false;
  }

  activateSupport(): void {
    this.informationActivated = false;
    this.participatingActivated = false;
    this.supportActivated = true;
  }

}
