import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PetService} from '../pet.service';
import {Pet} from '../pet';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  errorMessage: string = '';
  @Input() pet: Pet;
  pets: Pet[] = [];
  responseStatus: number = 0;
  deleteSuccess = false;
  isInsert: boolean;

  constructor(private router: Router, private petService: PetService) {
    this.pet = {} as Pet;
  }

  ngOnInit() {
    this.petService.getPets().subscribe(
      pets => this.pets = pets,
      error => this.errorMessage = error as any);
  }

  editPet(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'edit']);
  }

  deletePet(pet: Pet) {
    this.petService.deletePet(pet.id.toString()).subscribe(
      response => {
        this.deleteSuccess = true;
        this.pet = {} as Pet;
      },
      error => this.errorMessage = error as any);
  }

  addVisit(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }

  addPet() {
    this.router.navigate(['/pets/add']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }
}
