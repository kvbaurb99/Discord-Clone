# Discord Clone App

Functional Discord Clone App with messages, channels, servers and friends featuers. All features are shown below.

## Requirements

To run your app locally you will have to install Docker Desktop and then you can install and run app with steps below.

## Installation and run with Docker


```javascript
    // 1. Download and install Docker Desktop

    // 2. Clone repository 
    git clone git@github.com:kvbaurb99/Discord-Clone.git
    
    // 3. Run Docker with your bash
    docker-compose -f docker-compose.dev.yml up
```

## List of functions

- Login, signup and logout. Password minimum 6 length, hashed
- Adding servers, name of server, color of server
- Adding channels for server where users can send messages between
- Sending messages on channels
- Deleting global or private messages (you are not able to delete someone message)
- Sending friend request. Receiver can accept or reject request. After accept users are displayed in All Friends bar and can send private messages between
- Deleting friends 
- Sending messages between two users. You can choose user from friends bar click on it and you will be redirectet to private chat
- Changing your username
- Managing your channels, at this moment only option to delete your channels with the servers and messages on
- Notifications for friend requests and private messages
- Typical prevent for a lot of elements e.g. inserting empty fields or channels that already exist

## Technologies

- HTML
- CSS with Tailwind CSS
- Javascript
- React
- NodeJS with Express
- MySQL database
- Docker

## App Architecture Diagram
<br>

![diagram](./images/discord.png)

