# Stone Paper Scissors Game

## Project Structure
client/ → React application  
server/ → Express API  

## Setup

### Backend
cd server  
npm install  
npm run dev  

### Frontend
cd client  
npm install  
npm run dev  

## Environment Variables

Create a `.env` file inside `/server` and add:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/stonegame

## Features

- 2-player game  
- 6 rounds gameplay  
- Winner based on game rules  
- Game data stored in database  
- Game history page  

## API

POST /api/games  
GET /api/games  

## Deployment

Hosted on AWS
