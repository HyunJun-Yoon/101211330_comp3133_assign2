import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ADD_USERS = gql`
  mutation addUser(
    $user_id: Int!
    $username: String!
    $password: String!
    $email: String!
  ) {
    addUser(
      userInput: {
        user_id: $user_id
        username: $username
        password: $password
        email: $email
      }
    ) {
      email
    }
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router
  ) {}
  user_id = 1;
  ngOnInit(): void {}

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cpassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerUser(event: any) {
    if (!this.registerForm.valid) {
      return;
    }
    event.preventDefault();
    const errors = [];
    const target = event.target;
    const user_id = this.user_id;
    this.user_id++;
    const username = target.querySelector('#username').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;
    if (password != cpassword) {
      errors.push('Password do not match');
    } else {
      this.apollo
        .mutate({
          mutation: ADD_USERS,
          variables: {
            user_id: user_id,
            username: username,
            password: password,
            email: email,
          },
        })
        .subscribe(() => {
          console.log('User Added');
          this.router.navigate(['/login']);
        });
    }
  }
}
