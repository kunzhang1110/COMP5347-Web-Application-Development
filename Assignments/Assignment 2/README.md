# Full-stack Web Application - WikiLatic

**Assignment 2**

_HTML, Pug, CSS, jQuery, Node.js, Express.js, MongoDB_

## Description

**WikiLatic is a full-stack web application that analyzes revisions on wikipedia articles. Analysis are performed at overall, individual and author level.**

### Main/Landing Page

The landing page displays provides log-in and sign-up options.

### Overall Analytics

- Titles of the three articles with highest/lowest number of revisions.
- The user should be provided with a way to change the number of articles for highest and lowest number of revisions.
- The article edited by largest/smallest group of registered users.
- The article edited by smallest group of registered users.
- The top 3 articles with the longest history (measured by age).
- Article with the shortest history (measured by age).
- A bar chart of revision number distribution by year and by user type across the whole dataset.
- A pie chart of revision number distribution by user type across the whole data set.

### Individual Analytics

- A dropdown for users to select an article from a list
- Query MediaWiki API and pull all possible new revisions made after last update.
- Display the following summary information
  - The title
  - The total number of revisions
  - The top 5 regular users ranked by
- A bar chart of revision number distributed by year and by user type for this article.
- A pie chart of revision number distribution based on user type for this article.
- A bar chart of revision number distributed by year made by one or a few of the top 5 users for this articles.

### Author Analytics

- Allow the end user to an author name in a free text format.
- Display all articles that are changed (or have revisions made) by a specific author with
  - Articles’ names
  - Number of revisions made by the author

## Usage (Windows)

1. Install node modules
   npm install
1. Start the server in shell.
   - start_db_server.bat has a default MongoDB location: "D:\ProgramData\mongo_data"
1. Use import_revisions.bat to import revisions(default in root) MongoDB server
1. Start the web server in a new shell
   node index.js
1. Default local address localhost://3000
