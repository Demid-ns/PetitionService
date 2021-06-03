import {Component, OnInit} from '@angular/core';
import {PetitionService} from '../../shared/services/petition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Petition} from '../../shared/models/petition';
import {VotedUser} from '../../shared/models/votedUser';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/auth.service';

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

  public thisUser: User;

  public votedUsers: VotedUser[];

  constructor(
    private petitionService: PetitionService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
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
      }, error => {
        this.router.navigate(['petitions']);
      }
    );

    this.petitionService.getVotedUsers(this.urlId).subscribe(response => {
      this.votedUsers = response;
    });

    if (this.auth.isAuthenticated()) {
      this.userService.getUserInfo().subscribe(response => {
        this.thisUser = response;
      });
    }
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

  supportPetition(): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth', true]);
    } else {
      this.petitionService.voteForPetition(this.urlId).subscribe(() => {
        window.location.reload();
      });
    }
  }

  alreadySupported(): boolean {
    if (this.auth.isAuthenticated()) {
      const votedUser = this.votedUsers.filter(user => user.id === this.thisUser?.id ||
        user.full_name === this.auth.user?.name);
      if (votedUser.length > 0) {
        return true;
      }
    }
    return false;
  }

  buttonLocked(): boolean {
    if (this.petition.status === 'lock') {
      return true;
    }
    return false;
  }
}
