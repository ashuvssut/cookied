<!-- Hashnode blog article of our project: Cookied -->
# Cookied: Appwrite Hashnode Hackathon project

## Team Details
- Ashutosh Khanduala - [@ashuvssut](https://hashnode.com/@ashuvssut)
- Md Arshad Khan - [@adre9](https://hashnode.com/@adre9)

## Description of Project
Cookied is a cross platform bookmark manager that helps you to save and organize your bookmarks in a better way. It is a cross platform app that is available as a web app, android app and chrome extension. It is built using Appwrite, Next.js, React Native and Vite.
We made this project as a submission for the Appwrite Hashnode Hackathon. The project is a monorepo project with the following client side apps:
- [Cookied Web App](http://cookied.vercel.app)
- [Cookied Mobile App](https://expo.io/@cookied/projects/cookied)
- [Cookied Chrome Extension](https://)

## Tech Stack
We made this project as a submission for the Appwrite Hashnode Hackathon. The project is a monorepo project with the following client side apps:
- Next.js - for [Cookied Web App](http://cookied.vercel.app)
- Expo (React Native) - for [Cookied Android App](https://expo.io/@cookied/projects/cookied)
- React (Vite) - for [Cookied Chrome Extension](https://chrome.google.com/webstore/detail/cookied/ohjgjgjgjgjgjgjgjgjgjgjgjgjgjgj)
- Appwrite Cloud
  - Authentication - Used Email and Password authentication
  - Database - Used Collections and Documents to store the Bookmarks and Folders
  - Cloud Functions - Node.js 

## Challenges We Faced
We faced a lot of challenges while building the project. The first challenge was to decide if it was a good idea to build a cross platform app using a monorepo. We decided to go with it and setting up a monorepo was a disaster. We jumped from using **Ignite CLI** to **custom yarn workspaces for Expo Development Build project** Expo Yarn workspaces wasn't bad at first until we found weird web only errors (i.e we weren't able to use fetch to fire api calls) because of which we were not able to use Appwrite Web SDK in the web app , and we had two options either to drop the plan of creating web app and focus only on android application or to find an alternative. And we finally found [Solito](https://solito.dev/). Solito provides a way to share UI and Navigation code between Expo and Next.js. It was a life saver. 

We have a shared UI package that is used by both the web app and the mobile app. BUT still there were UI code/packages that cannot be shared between the Web and Mobile app in Solito because we are not using the metro bundler to start bundling for web, we use webpack in Solito for which we need to transpile the packages for webpack. We faced the following UI code sharing challenges:
- Authentication - Since Appwrite doesn't have any React Native SDK, we had to use the REST API to authenticate the user for the mobile app. But for the web app and chrome extension, we used the Appwrite Web SDK. We use the REST SDK to make requests and store the cookie recieved from the Appwrite server in the Android's Async Storage to further use it for making authenticated requests. We know that storing cookies like this is not such a good idea, but we have planned to use expo-secure-store to store sensitive data in the future.
- Themeing - We love to use popular React Native packages like Shopify Restyle & React Native Paper for theming. But in our case only [Dripsy](https://www.dripsy.xyz/) proved to be the best solution for us. We were able to use the same theme for both the web and mobile app without showing any wierd errors. Dripsy theme works great for us now.
- Icons - We could not share SVGs and SVG icons between the web and mobile app. So we had to use separate icons library which provide the same icon packs for both web and mobile. We used [react-icons](https://react-icons.github.io/react-icons/) for the web app and [expo-icons](https://docs.expo.dev/guides/icons/) for the mobile app. Although you might think that importing icons from both libraries would need a lot of code duplication containing platform specific code, but we import the icons using a custom Higher Order Component (HOC) which takes the icon name as a prop and returns the icon component such that even the important icons prop are almost same for both the web and mobile app with proper TypeScript support 
- Designing the tree 
- 
- Redux Toolkit - Setting up proper reducers needs lot of code. But Redux toolkit makes it simpler by providing use with Slices and Entity Adapters. The learning curve to understand how redux works is not that steep but we had to put a lot of 



## Public Code Repo

<!--- Add a link to a public code repo in this section -->

## Demo Link

<!--- Add a link to the demo recording of your project in this section -->**** -->

Tell us what your project does

(optional) Mention why you chose to tackle this challenge

The tech stack behind the project

Mention the technologies/methods/platforms you used to build your project.

Explain how Appwrite helped you build this project.

(optional) Any challenges faced during the development process and how they were overcome

A public code repository link

A demo recording of the functioning project

The demo recording should only show the running of the project. Any other details must be written in the Hashnode article.

The demo recording can be uploaded to any standard video streaming platform, such as Youtube or Vimeo.

The demo recording must be accessible and visible to us.

Make sure that you add #Appwrite and #AppwriteHackathon hashtags on your Hashnode article.

Additionally, the Appwrite (https://appwrite.io) and Hashnode (https://hashnode.com) domains should be present within the article.

```

# [Name of your Project]: [Appwrite](https://appwrite.io) [Hashnode](https://hashnode.com) Hackathon
****
