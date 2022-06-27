import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tableColumns: ITableColumn[] = this.config.userColumns;
  list$: Observable<User[]> = this.userService.getAll();

  entity: string = 'User';

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(user: User): void {
    this.router.navigate(['/', 'users', user._id])
  }

  onDeleteOne(user: User): void {
    this.userService.delete(user).subscribe(
      () => this.list$ = this.userService.getAll()
    )
  }

}
