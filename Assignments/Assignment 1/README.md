# Front End Implementation of a Bookstore System

**Assignment 1**

_HTML, CSS, JavaScript_

## Basic Functionality:

1. Display the main information of each book including a thumbnail picture, title, author, year, price, publisher and category.
2. End users can search books with their titles. The rows that match the search term will be highlighted with a colored background.
3. End users should be able to filter books through their categories. The list of category works like a dropdown and should cover an extra category that is currently not in the bookstore for boundary test use.
4. End users should always have the option to return to the default status.
5. The functions of the search and filter should be able to work together and combine the result of each other.
6. End users should be able to select books and add them to the “Shopping Cart” through the checkbox ahead of them with the button “Add to cart”.
7. End users can clear the shopping cart through the “Reset the Cart” button. Users should be prompted with a message box to confirm their desired action.
8. The “Shopping Cart” should always show the correct number of books in the cart based on the end user actions.

## Boundary Cases:

1. A book can be added into cart multiple times.
2. Cart number can extend to multiple digits without collapsing
3. Search term does not appear in any title.
4. Users select the category that does not contain any books.
5. Reset cart will also reset any checked items
6. Search result will not display if it is not in the current filtered results
7. Clicking filter button will reset all checked state
