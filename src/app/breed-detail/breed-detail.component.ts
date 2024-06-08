import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService } from '../services/dog.service';

@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.component.html',
  styleUrls: ['./breed-detail.component.scss']
})
export class BreedDetailComponent implements OnInit {
  breed: any;
  breedId: number | null = null;
  showAllDetails = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dogService: DogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.breedId = +id;
        this.loadBreedDetails();
      }
    });
  }

  loadBreedDetails(): void {
    if (this.breedId !== null) {
      this.dogService.getBreedDetails(this.breedId).subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }

  toggleDetails(): void {
    this.showAllDetails = !this.showAllDetails;
  }

  private handleUpdateResponse(breed: any): void {
    this.breed = breed;
  }

  private handleError(error: any): void {
    console.error('Error fetching breed details', error);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
