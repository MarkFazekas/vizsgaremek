import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Validators} from "@angular/forms";
import {Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {InputField} from "../../dynamic-form/model/input-field";
import {FieldBase} from "../../dynamic-form/model/field-base";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  route = 'users';
  entity$: Observable<User> = this.ar.params.pipe(
    switchMap(params => {
      if (params.id === '0') {
        return of(new User());
      }
      return this.entityService.get(params.id);
    })
  );
  entity: User = new User();

  fields: FieldBase<any>[] = [];
  showForm: boolean = false;

  constructor(
    private entityService: UserService,
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.entity$.subscribe(
      entity => {
        this.entity = entity;
        this.setForm();
        this.showForm = true;
      }
    );
  }

  setForm(): void {
    this.fields = [
      new InputField({key: '_id', label: '', type: 'hidden', value: this.entity._id}),
      new InputField({key: 'first_name', label: 'First Name', type: 'text', value: this.entity.first_name as string,
        validators: [Validators.pattern(/^[A-Za-z0-9][ A-Za-z0-9_@./#&+-]{0,19}/)],
        errorMessage: 'The first name of the user must be between 1 and 20 characters.'}),
      new InputField({key: 'last_name', label: 'Last Name', type: 'text', value: this.entity.last_name as string,
        validators: [Validators.pattern(/^[A-Za-z0-9][ A-Za-z0-9_@./#&+-]{0,19}/)],
        errorMessage: 'The last name of the user must be between 1 and 20 characters.'}),
      new InputField({key: 'email', label: 'Email', type: 'text', value: this.entity.email,
        validators: [Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)],
        errorMessage: 'Please enter a valid email address.'}),
      new InputField({key: 'password', label: 'Password', type: 'text', value: this.entity.password as string,
        validators: [Validators.pattern(/^[A-Za-z0-9][ A-Za-z0-9_@./#&+-]{0,19}/)],
        errorMessage: 'The password of the user must be between 1 and 20 characters.'}),
      new InputField({key: 'role', label: 'Role', type: 'number', value: this.entity.role as unknown as number,
        validators: [Validators.required, Validators.pattern(/[1,2,3]/)],
        errorMessage: 'The role of the user must be 1, 2, or 3.'}),
    ];
  }
  onSave(entity: User): void {

    if (entity._id == 0) {
      this.entityService.create(entity).subscribe(
        () => this.router.navigate([this.route])
      );
    } else {
      this.entityService.update(entity).subscribe(
        () => this.router.navigate([this.route])
      );
    }
  }

}
