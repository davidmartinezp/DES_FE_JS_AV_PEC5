import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DogService } from '../services/dog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  viewMode = 'list';
  breeds: any[] = [];
  displayedColumns: string[] = ['name', 'bred_for', 'details'];

  constructor(private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    const limit = 40; 
    this.dogService.getBreeds(limit).subscribe({
      next: (breeds) => {
        const breedObservables = breeds.map(breed => this.loadImageForBreed(breed));
        Promise.all(breedObservables).then(breedsWithImages => {
          this.breeds = breedsWithImages;
          this.loading = false;
        }).catch(error => {
          console.error('Error loading breed images', error);
          this.loading = false;
        });
      },
      error: (error) => {
        console.error('Error fetching dog breeds', error);
        this.loading = false;
      }
    });
  }

  private loadImageForBreed(breed: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dogService.getRandomBreedImage(breed.id).subscribe({
        next: (imageUrl) => {
          resolve({
            ...breed,
            image$: imageUrl
          });
        },
        error: (error) => {
          console.error(`Error fetching image for breed ${breed.name}`, error);
          resolve({
            ...breed,
            image$: ''
          });
        }
      });
    });
  }

  toggleViewMode(mode: string): void {
    this.viewMode = mode;
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/breed', id]);
  }
}
