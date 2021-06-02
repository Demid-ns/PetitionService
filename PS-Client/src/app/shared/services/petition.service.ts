import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Petition} from '../models/petition';
import {PetitionParameters} from '../params/PetitionParameters';
import {Category} from '../models/category';
import {VotedUser} from '../models/votedUser';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.resApi}/api/categories/`);
  }

  public getPetitions(parameters: PetitionParameters): Observable<Petition[]> {
    return this.http.get<Petition[]>(`${environment.resApi}/api/petitions`
      + `?title=${parameters.title}`
      + `&creator=${parameters.creator}`
      + `&category=${parameters.category}`
      + `&successful=${parameters.successful}`);
  }

  public getPetition(id: number): Observable<Petition> {
    return this.http.get<Petition>(`${environment.resApi}/api/petitions/${id}/`);
  }

  public getVotedUsers(id: number): Observable<VotedUser[]> {
    return this.http.get<VotedUser[]>(`${environment.resApi}/api/petitions/${id}/voters`);
  }

  public createPetition(petition: Petition): Observable<Petition> {
    return this.http.post<Petition>(`${environment.resApi}/api/petitions/save/`, petition);
  }

  public voteForPetition(id: number): Observable<any> {
    return this.http.post<any>(`${environment.resApi}/api/petitions/vote/${id}/`, null);
  }
}
