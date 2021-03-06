# App: microCMS

MEAN stack based CMS designed specifically for developers. 
microCMS allows a developer to build a fast, poweful website without the limits
of a conventional CMS, no longer needing to worry with the "one size fits all"
solutions, each site can be tailored specifically to a projeject while still
allowing the client to be able to safely edit the sites content without running
the risk of them breaking the site in the process.

Back-end is built with node and express using the Swig tempalting engine.
The UI is built using Bootstrap and will be allowing users to easily add/change
content and upload basic files to de displayed on teh site.

Front-end is built using Angular.JS but is not directly connected to the backend.
This is compltely intentional to allow the developers to create the public 
facing site in whichever language they are most familiar with if they do not wish
to use Angular, all you need to be able to do is fire off API calls to the
defined end-point and strucutre the data as you choose.

The premise behind this is that only the content and other key sections of the
are editable by the end-user/client to keep the structure and other essential
elements safe from accidental harm or PBKAC's. :D

[![Join the chat at https://gitter.im/RemeJuan/microCMS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/RemeJuan/microCMS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![Alpha](https://img.shields.io/badge/Status-Alpha-blue.svg)
![License - MIT](https://img.shields.io/github/license/mashape/apistatus.svg)

## Features

Current feature list is quite small, but this is a very active work in progress
and will increase rapidly from here on out.

* User Authentication

## Dependancies

* Node.JS v12.2
* bower
* MongoDB 3.3

## Setup details

Clone Repo

run:
`npm install`
`bower install`

Setup you mongo DB:
* Add a new DB called micro-cms
* Start you mongo DB

To launch:
Open Command-Line/Terminal and cd to your local repo and run `node web.js`
App will not launch unless you have started your mongo server

## Change Log

### v0.6.0
Display analytics on main dashboard

### v0.5.1:
Updated content section:
* Cleaner 2 column layout
* Details section with etra info about the article when available
* Field validations
* Hover tooltips for each field/label.

### v0.5.0
Password reset:
* New forgotten password screen
* Auto generated tokens/URL for password reset
* Mailchimp setup for handeling reset emails

### v0.4.1
Site Administration - Default site data

### v0.4.0
Site adminstration - User management

### v0.3.2
Gravatar profile pic in user profile page

### v0.3.1
Nav updates for current active state

### v0.3.0
User profile view and modify

### v0.2.1
Localisation - Moved all language data to variables inside a language file

### v0.2.0
Content CRUD

### v0.1.2
Admin Dashboard

### v0.1.1
Logout

### v0.1.0
* Initial commit