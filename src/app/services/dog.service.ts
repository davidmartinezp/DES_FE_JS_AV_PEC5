import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'https://api.thedogapi.com/v1';
  private apiKey = 'live_EIqrrxITTLZGxezbJi3QAPgQM5nH2XcESH6DW9vnQ0keAdB2kGncT8zWAUsoOaug'; 

  constructor(private http: HttpClient) { }

  getBreeds(limit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/breeds?limit=${limit}&api_key=${this.apiKey}`);
  }

  getRandomBreedImage(breedId: string): Observable<string> {
    return this.http.get<any[]>(`${this.apiUrl}/images/search?limit=1&breed_ids=${breedId}&api_key=${this.apiKey}`).pipe(
      map(images => images.length > 0 ? images[0].url : '')
    );
  }

  getBreedDetails(breedId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/images/search?limit=1&breed_ids=${breedId}&api_key=${this.apiKey}`).pipe(
      map(images => {
        if (images.length > 0 && images[0].breeds.length > 0) {
          const breed = images[0].breeds[0];
          return {
            id: breed.id,
            name: breed.name,
            bred_for: breed.bred_for,
            breed_group: breed.breed_group,
            life_span: breed.life_span,
            temperament: breed.temperament,
            origin: breed.origin,
            reference_image_id: images[0].id,
            image$: images[0].url,
            imwidth: images[0].width,
            imheight: images[0].height,
            weight: breed.weight.metric,
            height: breed.height.metric,
          };
        } else {
          throw new Error('Breed not found');
        }
      })
    );
  }
}

