# todo-list

# todo-list

## Overview

"Get It Done" is a web app created to work just like a todo list. You can add projects, tasks, delete projects and delete tasks.

## Features

- Task creation
- Task deletion
- Project creation
- Project deletion
- Task delagation to project
- Task mark as complete

## Journey to build it

First I tried to draft some basics classes or modules i would need to make the app, some of the most importants are the Book class, Task class and User Module. The user module stores book objects and the book object stores tasks objects.

Another important module was the UserInterface module which would be in charge of creating DOM objects by mostly getting a project object or task object.

The way i handeled local storage was by creating a function inside the User module that would load data from local storage (a JSON string containing books) and parse it into an object that would be later built again into Book class instances (because they loose their methods when they are converted to JSON). I did that same for tasks inside those book objects.

In order to save it i just created another function that would handle saving data. The easiest way to do this was to convert the books arr inside of User module to a JSON string via stringify and then add it to local storage.

## Conclusion

I learned a lot by doing this app, but I still need to work in things like planning and organizing my code properly. Liked a lot the results.
