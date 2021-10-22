
# HacktoberFest-2021 🏆 (OLD: This Project is Currently Not Participating)

#### 🎯 HacktoberFest - The month long festival for developers

- This repository aims to give an introduction as to how the Open Source World functions. Use this project to make your first contribution to an open-source project on GitHub. Practice making your first pull request to a public repository before doing the real thing!

- Make sure to grab some cool swags during Hacktoberfest by getting involved in the open-source community and completing some simple tasks in this project.

- This repository is open to all members of the GitHub community. Any member can contribute to this project without being a collaborator. We encourage first time contributors, and also have interesting tasks for experienced developers.


# <b>What is Hacktoberfest?</b> 😕

A month-long celebration from October 1st to October 31st presented by Digital Ocean and DEV Community collaborated with GitHub to get people involved in Open Source. Create your very first pull request to any public repository on GitHub and contribute to the open-source developer community.

https://hacktoberfest.digitalocean.com/

## Rules ⚓

To earn your Hacktoberfest tee or tree reward, you must register and make four valid pull requests (PRs) between October 1-31 (in any time zone). PRs can be made to participating public repos on GitHub, those that have the Hacktoberfest topic. If a maintainer reports your pull request as spam or behavior not in line with the project’s code of conduct, you will be ineligible to participate. This year, the first 70,000 participants who successfully complete the challenge will be eligible to receive a prize.

- <b>Read the participation details to learn how to earn your Hacktoberfest tee or tree reward. </b>

- <b>Those who have not registered yet for hacktoberfest can get themselves registered <a href="https://hacktoberfest.digitalocean.com/register">HERE</a></b>
<hr>

# How to Setup & Contribute 

<details>
 <summary> click here</summary>
 
 ### 0. Star The Repo :star2:

Star the repo by pressing the topmost-right button to start your wonderful journey.


### 1. Fork it :fork_and_knife:

You can get your own fork/copy of [Hacktoberfest-21](https://github.com/ietebitmesra/Hacktoberfest-21) by using the <a href="https://github.com/helios1101/HacktoberFest_20/new/master?readme=1#fork-destination-box"><kbd><b>Fork</b></kbd></a> button on top-right of your screen.

 [![Fork Button](https://help.github.com/assets/images/help/repository/fork_button.jpg)](https://github.com/ietebitmesra/Hacktoberfest-21/)


### 2. Clone it :busts_in_silhouette:

`NOTE: commands are to be executed on Linux, Mac, and Windows(using Powershell)`

You need to clone (download) it to local machine using

```sh
$ git clone https://github.com/Your_Username/Hacktoberfest-21.git
```

> This makes a local copy of the repository in your machine.

Once you have cloned the `Hacktoberfest-21` repository in Github, move to that folder first using change directory command on Linux, Mac, and Windows(PowerShell to be used).

```sh
# This will change directory to a folder Hacktoberfest-21
$ cd Hacktoberfest-21
```

Move to this folder for all other commands.

### 3. Set it up :arrow_up:

Run the following commands to see that *your local copy* has a reference to *your forked remote repository* in Github :octocat:

```sh
$ git remote -v
origin  https://github.com/Your_Username/Hacktoberfest-21.git (fetch)
origin  https://github.com/Your_Username/Hacktoberfest-21.git (push)
```

Now, let's add a reference to the original [Hacktoberfest-21](https://github.com/ietebitmesra/Hacktoberfest-21/) repository using

```sh
$ git remote add upstream https://github.com/ietebitmesra/Hacktoberfest-21.git
```

> This adds a new remote named ***upstream***.

See the changes using

```sh
$ git remote -v
origin    https://github.com/Your_Username/Hacktoberfest-21.git (fetch)
origin    https://github.com/Your_Username/Hacktoberfest-21.git (push)
upstream  https://github.com/Remote_Username/Hacktoberfest-21.git (fetch)
upstream  https://github.com/Remote_Username/Hacktoberfest-21.git (push)
```
`In your case, you will see`
```sh
$ git remote -V
origin    https://github.com/Your_Username/Hacktoberfest-21.git (fetch)
origin    https://github.com/Your_Username/Hacktoberfest-21.git (push)
upstream  https://github.com/ietebitmesra/Hacktoberfest-21.git (fetch)
upstream  https://github.com/ietebitmesra/Hacktoberfest-21.git (push)
```

### 4. Sync it :recycle:

Always keep your local copy of the repository updated with the original repository.
Before making any changes and/or in an appropriate interval, run the following commands *carefully* to update your local repository.

```sh
# Fetch all remote repositories and delete any deleted remote branches
$ git fetch --all --prune

# Switch to `main` branch
$ git checkout main

# Reset local `main` branch to match the `upstream` repository's `main` branch
$ git reset --hard upstream/main

# Push changes to your forked `Hacktoberfest-21` repo
$ git push origin main
```

### 5. Ready Steady Go... :turtle: :rabbit2:

Once you have completed these steps, you are ready to start contributing by checking our `Help Wanted` Issues and creating [pull requests](https://github.com/ietebitmesra/Hacktoberfest-21/pulls).

### 6. Create a new branch :bangbang:

Whenever you are going to contribute. Please create a separate branch using command and keep your `main` branch clean (i.e. synced with remote branch).

```sh
# It will create a new branch with name Branch_Name and switch to branch Folder_Name
$ git checkout -b BranchName
```

Create a separate branch for contribution and try to use the same name of the branch as of folder.

To switch to the desired branch

```sh
# To switch from one folder to other
$ git checkout BranchName
```

To add the changes to the branch. Use

```sh
# To add all files to branch Folder_Name
$ git add .
```

Type in a message relevant for the code reviewer using

```sh
# This message get associated with all files you have changed
$ git commit -m 'relevant message'
```

Now, Push your awesome work to your remote repository using

```sh
# To push your work to your remote repository
$ git push -u origin BranchName
```

Finally, go to your repository in the browser and click on `compare and pull requests`.
Then add a title and description to your pull request that explains your precious effor
 
 
 
 
 
</details>



# Hacktoberfest Tv-series/Movie search app
 
 Link: https://ietebitmesra.github.io/Hacktoberfest_21/

Idea images:
(Final project may or may not look the same)

![enter image description here](https://i.ibb.co/GMDG6BY/Screenshot-2021-10-06-at-11-07-22-PM.png)

![enter image description here](https://i.ibb.co/984dNgX/Screenshot-2021-10-06-at-11-13-43-PM.png)

## About The Project:

This app uses [Movies api](https://developers.themoviedb.org/3/movies/get-movie-details) to get data of Movies and TV Shows. Please use their documentation for reference. We would like the application to be responsive and helpful to it's users by showing complete details.

**Features:**

1.~~Add Navbar (Home, Explore, About, etc..(as needed))~~

2. Better background

3. ~~Popular shows on home page~~

4. ~~Present the searched show with basic details (name, summary, rating)~~

5. ~~Show other details like episodes, seasons, cast, etc. ( Preferably as shown in the last image )~~

6. ~~List all episodes in episode tabs~~

7. ~~List all seasons in season tab~~

8. ~~Also may add movie search functionality~~

9. ~~Add a movie section in nav-bar/ or may do differently.~~

10. ~~Show basic details of movies~~

11. ~~Show cast of movies~~

12. Make UI better

13. ~~Make application responsive.~~

14. ~~Add your favourite tv-series in explore tab :)~~

**Optional Feature:**

1. Add summary for each episode

2. ~~Add date every episode air.~~

3. ~~Present all cast along with photos in cast tag~~

4. ~~Include other images related to show in gallery tab~~

5. ~~Show the platform where the show/movies are streaming~~

6. ~~Link to YouTube trailer.~~ 

**_More features will be added as the project progresses_ **

**Note:**

1. Users may open their own issues and also can implement any other awesome feature if they wish(as long as it is relevant to the project).

2. You may refer to docs of the apis at [https://developers.themoviedb.org/3/tv/get-tv-details](https://developers.themoviedb.org/3/tv/get-tv-details) & [https://developers.themoviedb.org/3/movies/get-movie-details](https://developers.themoviedb.org/3/movies/get-movie-details) respectively. The main data from API is already fetched (using axios) and Important details like show Id, which will later be useful for other API calls is already stored in the JavaScript variables.

3. We are using Bootstrap in this app.

4. You are always welcome to make the code functionality better and faster.

Any small/big but useful changes are welcome. Hope, it would be a great learning experience for you all :D


## Steps To follow: 📜

**(a) Go to the issues tab of this repository and find any issue that you would like to work on. You can also create your own issue.**

**(b) Get yourself assigned to that issue.**

**(c ) Open the cloned repository on your local machine.**

**(d) $cd Hacktoberfest_21**

**(e) Create a separate branch for that issue $git checkout -b issueName/issueNumber**

**(f) Try your best to fix the issue (Good Luck! =))**

**(g) Once the issue is fixed, just give us a Pull Request, and you are done!!**

**Congratulations !!** **🥳**





# Prizes


![Prizes](https://raw.githubusercontent.com/sakpab2602/Hacktoberfest-21/master/Task1/img/prizes.jpeg)

This time around we have different prizes for the top 5 contributors who will be judged on the basis of points distribution criteria in each task!
The special prizes include : -
1. Smart-watches
2. Ear buds
3. Bags

**To be eligible for prizes register <a href="http://bit.ly/hacktober2021">HERE</a>**

**To View contribution ** : [contribution](https://mayukhpankaj.github.io/IETE-hacktoberfest/)

 # Prize distribution criteria

- First 5 contributors who have made pull requests in all 3 mentioned tasks.

- Winners will be selected on the basis of

  - First come first serve (FCFS)
  - QUALITY OF CODE

- Points will be allotted for each task and highest scorers will be selected as winners. Marks distribution criteria will be mentioned in detail in respective task's `readme.md`

- All decisions made by IETE will be final and binding, no changes will be entertained after the result declaration.


View Your contribution at: 

## Points distribution

- Implementing any of the features which are mandatory are important to mark your score in order to be eligible for prizes.
- Also resolving issues will add an extra benefit.
- Optional tasks:
  - Contributing towards optional tasks will give you an edge and extra points.
  - You can also create your own issue and get yourself assigned to it, this will be highly appreciated.
  - Contributing towards making the website responsive.

**Humble Request !important**

All the enthusiastic contributors are requested to add their part carefully following the proper code block which is to be to be copy-pasted and then edited. Also, before sending a PR, it would be great if you yourself render the html page at least once to see how your changes are manifested. There have been instances where a single contribution destroyed the entire layout of the page, even affecting others' contributions.
