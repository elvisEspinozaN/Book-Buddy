# Book Buddy

![Home Page](https://i.imgur.com/I1hOXSV.png)

![Searching Books](https://i.imgur.com/19jozlk.png)

![Book Detail Page](https://i.imgur.com/HlzrE4X.png)

![Account Page](https://i.imgur.com/RGe03Ol.png)

## Overview

A modern library management application built with React and Redux Toolkit (RTK). Users can browse books, manage reservations, and maintain their reading history. Features secure authentication and real-time data synchronization.

## Key Features

- Browse available books with search functionality
- Checkout and return books with one click
- User authentication (login/registration)
- Personalized account dashboard
- Real-time book availability updates
- Responsive design with clean UI

## Tech Stack

- React.js
- Redux Toolkit (RTK)
- RTK Query
- React Router
- CSS Modules
- BookBuddy API

## API Endpoints

Base URL: `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | /books             | Get all books           |
| GET    | /books/{id}        | Get single book details |
| POST   | /reservations      | Checkout book           |
| DELETE | /reservations/{id} | Return book             |
| POST   | /users/register    | Register new user       |
| POST   | /users/login       | User login              |
| GET    | /users/me          | Get current user info   |
| GET    | /reservations      | Get user reservations   |

## Live Demo

[Click here!](https://book-buddy-redux.netlify.app/)

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/elvis-espinoza/)  
✉️ elvis.espinoza.navarrete@outlook.com

## Acknowledgments

- RTK Query Documentation
- BookBuddy API
