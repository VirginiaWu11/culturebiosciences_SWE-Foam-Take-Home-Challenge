# culturebiosciences_SWE-Foam-Take-Home-Challenge

### Video demo:

https://user-images.githubusercontent.com/79432798/156950348-c1d58d02-a988-40dc-8d26-c4307680bcab.mp4

# Deployed Link

https://virginia-culture-take-home.surge.sh/

# Foaming Classification System

Link to challenge:
https://culturebiosciences.notion.site/SWE-Foam-Take-Home-Challenge-94df26a0622048fc87380ca441ca85da

The Foaming Classification System is built to help facilitate Culture's monitoring of reactors for "foaming". When foam starts to build up, the team would add an anti-foaming agent to preserve the run.

## Features:

- View images from the reactor runs with date created and last modified.
- Mark images as foaming or not foaming. Any changes made, the last modified time would update.
- Filter by foaming, non-foaming and unclassified images

## App Navigation:

- When the user first opens the page, the user is brought to the page with images initially filtered by unclassified images. All images are sorted in descending order by date created.
- The user is able to click the buttons on top to filter by unclassified, foaming, not foaming, or all images.
- At the bottom of the page, the user can also select the number of items per page, the page number, or move on to the next page.
- On each card, the user is able to click the thumbs up icon button to classify this image as "foaming", click the thumbs down icon button to classify the image as "not foaming", or the "X" icon button to clear their selection.
- The user can click on the card itself to view the image in a larger size and is able to classify the image within the modal popup.
- At the bottom of the page, the user is able to go to the next page, go back, or select a page number to navigate to.

&nbsp;

## Future goals:

- Add feature with the option to sort the cards by last modified time or date time created.

## Commands to run the project:

Open Visual Studio Code or other code editor's terminal in a new folder and run the below commands:

- `git clone https://github.com/VirginiaWu11/culturebiosciences_SWE-Foam-Take-Home-Challenge.git`
- Have two terminals, one for the front and another for the back end.
- Backend:
- `cd culturebiosciences_SWE-Foam-Take-Home-Challenge/`
- `cd backend/` - navigate to backend folder
- `python3 -m venv venv` - creates virtual environment
- `source venv/bin/activate` - enters virtual environment
- `pip install -r requirements.txt` - installs dependencies
- `createdb reactor` - creates the database
- `python seed.py` - seeds the database
- `flask run` - starts the server

  &nbsp;

- Frontend:
- `cd culturebiosciences_SWE-Foam-Take-Home-Challenge/`
- `cd frontend/` - navigate to frontend folder
- `npm install` - installs dependencies

## Comments:

- Moment.js can be used to format time to local time.
- A non-relational database like MongoDB could probably been used instead of PostgreSQL since there are no relationships and there is only one table. I went with PostgreSQL since it is what I was most comfortable with.
- I noticed that many images have the last modified time and also noticed that the image url has another date which I used as the date created time in the database.

## Technology Stack Used:

- Python
- Javascript
- PostgreSQL
- Flask
- SQL Alchemy
- Material UI
- React JS
