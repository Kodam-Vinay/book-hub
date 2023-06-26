# BOOKS HUB

#

#

## In this project there are 4 Routes Login, Home, BookShelves, BookCompleteDetails

#

#### **_LOGIN ROUTE_**

- in login route the user need to provide the user details such as usename and password its fetch the results from this ***https://apis.ccbp.in/login*** with method **_post_**

- if the user enter wrong details the respective error message shows.

- if the user tries to access the other roots home/books without authentication then it redirect to login path

- ![The San Juan Mountains are beautiful!](https://res.cloudinary.com/dwgpba5n2/image/upload/v1687770392/book%20hub/Readme/error-login.png 'Login Error')

#### **_HOME ROUTE_**

- when the user enter valid userdetails the login will replaced by home by history.replace('/')

- the popular books shown in home component in the carousel using **_"react-slick" npm third party package_**

- the popular booksList will got using api call ***https://apis.ccbp.in/book-hub/top-rated-books***

- here only the authenticated user will get this list of data

- ![The San Juan Mountains are beautiful!](https://res.cloudinary.com/dwgpba5n2/image/upload/v1687794925/book%20hub/Readme/carousel-image.png 'carousel items')

- when the user click on specific item it redirect to that bookCompleteDetails route and return entire details of book

-![The San Juan Mountains are beautiful!](https://res.cloudinary.com/dwgpba5n2/image/upload/v1687795979/book%20hub/Readme/book%20complete%20details.png 'book complete details')

### **_BOOKSHELVES ROUTE_**

- In this route the user get owl book details list

- here the authenticated user will get this list of books

- the user can filter the results(books list) based on searchInput and shelf type(all, read, already reader ..etc)

- when the user click specific item it renders the complete details of book

- ![The San Juan Mountains are beautiful!](https://res.cloudinary.com/dwgpba5n2/image/upload/v1687796601/book%20hub/Readme/all%20%20books.png 'all books')

- api url: ***https://apis.ccbp.in/book-hub/books?shelf={filterItem}&search={searchInput}***

- if no results found after applying filters then it render not found view

### **_BOOK COMPLETE DETAILS_**

- api url: ***https://apis.ccbp.in/book-hub/books/{bookId}***

- in this route it render the complete details of book

#

## NAVIGATION

- navigation is based on user clicks either home/bookshelves
