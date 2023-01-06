# Inscribe


## About the app

This app was cloned from the popular website, Evernote. Users can expect to be able to create notes, and notebooks to store their notes in. However unlike Evernote you don't need to have a notebook to create a note. Right now users can make and save notes, read all of the created notes by navigating to the notes link and update said notes from the pre-populated edit form when clicking on a note. If users would like to group a series of notes around a specific topic they can do so by creating a notebook then subsequently creating notes from within that notebook.

I have much more planned for the future of Inscribe such as:
* adding the ability to create and track tasks.
* adding the ability to add tags to their notes in order to make them much more easily searchable
* adding a rich text editor so users can make their notes more customizable.
* and so much more.

In order to use the app you can either use the live site link listed here [Inscribe](https://inscribe.onrender.com/) or by cloning the repository and following the steps titled "Getting started with Inscribe", below.

## Getting started with Inscribe

1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Wiki Links

The following links offer more details for my database schema, features list, wireframes, and user stories.
[Database Schema](https://github.com/ricalope/inscribe/wiki/Database-Schema)
[Features List](https://github.com/ricalope/inscribe/wiki/Features-List)
[Wireframes](https://github.com/ricalope/inscribe/wiki/Wireframes)
[User Stories](https://github.com/ricalope/inscribe/wiki/User-Stories)

## List of technologies used for this project

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&style=plastic)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white&style=plastic)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white&style=plastic)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&style=plastic)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB&style=plastic)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white&style=plastic)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white&style=plastic)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&&logoColor=white&style=plastic)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54&style=plastic)

## Inscribe Splash Page

## Inscribe Home Page

## Inscribe Notes Page

## Inscribe Notebooks Page
