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
- [Cookied Chrome Extension](https://microsoftedge.microsoft.com/addons/detail/cookied!!/cgechhanngniddkpfejiakhajdiebnbc) - (Store release pending)

## The Motivation behind the Project
We are a team of two developers who are passionate about building cross platform apps. We have been using Appwrite for a while now and we love it. We wanted to build a cross platform app using Appwrite. We had a lot of ideas but we decided to build a cross platform bookmark manager because there are no cross-platform solution to "save" and sync your bookmarks across devices. Cookied is aimed to provide you a way to save you bookmarks on the mobile just like you do it on web like any other bookmark manager through the chrome extension and webapp. But what's the issue in about saving bookmarks on your mobile? Mobile browsers can not install chrome extensions to save bookmarks. For that we had an amazing idea to use Android's "Send Intent" feature to send the URL of the current page of your browser to Cookied mobile app to save the bookmark. You bookmarks will be saved in appwrite databases and you can access them from any device. In near future we are going to roll out awesome features like:
- Saving bookmarks for offline use
- Online Text Search feature using algolia to find bookmarks that you have saved (We often forget the name of the bookmark we saved but we might still remember the some of the content of the page. Fuzzy search will help you find the bookmark you are looking for)
- Similarly, offline Text Search feature using Fuse.js to find your offline bookmarks
- Better client and server state synchronization using React Query.
- Better handling of Loading state using React Query's powerful cache management features
- Importing bookmarks from your browser

## Tech Stack
We made this project as a submission for the [#Appwrite](https://appwrite.io) [#Hashnode](https://hashnode.com) Hackathon. The project is a monorepo project with the following client side apps:
- Appwrite Cloud
  - Authentication - Used Email and Password authentication
  - Database - Used Collections and Documents to store the Bookmarks and Folders
  - Cloud Functions - Node.js 
- Next.js - for [Cookied Web App](http://cookied.vercel.app)
- Expo (React Native) - for [Cookied Android App](https://expo.io/@cookied/projects/cookied)
- React (Vite) - for [Cookied Chrome Extension](https://microsoftedge.microsoft.com/addons/detail/cookied!!/cgechhanngniddkpfejiakhajdiebnbc)
- Other awesome libraries, tools and services we used:q
  - Jotai (atomic state management)
  - Redux Toolkit (reducer client side state management)
  - React query (Detecting offline app state and for server side state sync with client side state)
  - Solito (uses Expo Next.js adapter for cross platform UI and Navigation code sharing)
  - Dripsy (cross-platform theming)
  - react-icons (web) and expo-icons (mobile) (to get cross-platform icon-pack)
  - react-toastify (web) and react-native-snackbar (mobile) (to show cross-platform toast messages)
  - google-fonts (web) and expo-fonts (mobile) (to load fonts)
  - Yarn3 and Turbo (for faster monorepo development)
  - [Figma - for UI/UX design](https://www.figma.com/file/b5820zUOHmCXBpNj7jr2we/Cookied!!?type=design&node-id=31-52)
  - [Vercel](https://vercel.com) (for hosting web app)
## What is Appwrite and how we used it
Appwrite is an awesome BaaS solution backed by an very dedicated OSS community. Checkout their discord! Folks are very helpful there. 
We used Appwrite for Authentication, Database and Cloud Functions. We used the following Appwrite features:
- Authentication - Used Email and Password authentication
- Database - Used Collections and Documents to store the Bookmarks and Folders
- Cloud Functions (Node.js) - We plan on using cloud functions to implement the following features:
  - Currently we can not display some save bookmarked webpages in the webapp because of we need some addition headers (*x-iframe-options*) to display them in an iframe. We plan on using cloud functions to proxy the request to the webpage and add the required headers to the response and send it back to the client.
  - Scraping a clean version of bookmarked webpages to save them in the client side local storage for offline use.
  - When user deletes a bookmark folder, we will use Functions to delete all the bookmarks and folders documents that are inside the folder that is being deleted.
- Storage - We plan on using storage to store avatar images of the users.
  
## Challenges We Faced
We faced a lot of challenges while building the project. The first challenge was to decide if it was a good idea to build a cross platform app using a monorepo. We decided to go with it and setting up a monorepo was a disaster. We jumped from using **Ignite CLI** to **custom yarn workspaces for Expo Development Build project** Expo Yarn workspaces wasn't bad at first until we found weird web only errors (i.e we weren't able to use fetch to fire api calls) because of which we were not able to use Appwrite Web SDK in the web app , and we had two options either to drop the plan of creating web app and focus only on android application or to find an alternative. And we finally found **[Solito](https://solito.dev/)**. Solito provides a way to share UI and Navigation code between Expo and Next.js. It was a life saver. 

We have a shared UI package that is used by both the web app and the mobile app. BUT still there were UI code/packages that cannot be shared between the Web and Mobile app in Solito because we are not using the metro bundler to start bundling for web, we use webpack in Solito for which we need to transpile the packages for webpack. We faced the following UI code sharing challenges:
- **Authentication** - Since Appwrite doesn't have any React Native SDK, we had to use the REST API to authenticate the user for the mobile app. But for the web app and chrome extension, we used the Appwrite Web SDK. We use the REST APIs to make requests and store the cookie received from the Appwrite server in the Android's Async Storage to further use it for making authenticated requests. We know that storing cookies like this is not such a good idea, but we have planned to use *expo-secure-store* to store sensitive data in the future.
- **Theming** - We love to use popular React Native packages like Shopify Restyle & React Native Paper for theming. But in our case only [Dripsy](https://www.dripsy.xyz/) proved to be the best solution for us. We were able to use the same theme for both the web and mobile app without showing any weird errors. Dripsy theme works great for us now.
- **Icons** - We could not share SVGs and SVG icons between the web and mobile app. So we had to use separate icons library which provide the same icon packs for both web and mobile. We used [react-icons](https://react-icons.github.io/react-icons/) for the web app and [expo-icons](https://docs.expo.dev/guides/icons/) for the mobile app. Although you might think that importing icons from both libraries would need a lot of code duplication containing platform specific code, but we import the icons using a custom Higher Order Component (HOC) which takes the icon name as a prop and returns the icon component such that even the important icons prop are almost same for both the web and mobile app with proper TypeScript support 
- Building the Folder-Bookmark tree view Panel was a difficult job. To build the tree view we can not use the folders & bookmarks documents we receive from our Appwrite Databases because it is in a normalized shape. But, the fun part was when I used the usual recursive tree traversal algorithm to de-normalize the normalized document object from the Redux store in O(n) time which was really cool. Because of the well thought-out HTML structure of the folder-bookmark tree view we can easily implement re-orderable drag and drop feature for the tree view (Not yet included in the MVP apps).
- **Redux Toolkit** - When talking about redux, folks think setting up proper actions and reducers needs lot of boiler plate code. But Redux toolkit makes it simpler by providing use with Slices and Entity Adapters. The learning curve to understand how redux works is not that steep but we had to put a little effort to learn and implement them. We are really grateful for redux for providing us with a great state management solution.
  - When used Redux Slices with Entity Adapters, we can easily store normalized data in Redux via entity adapters which are specifically made for that purpose. Because of Slices we get ready made actions, reducers and selectors without boilerplate code. 
  - Redux provides a way to write selectors which we require to derive data from the redux store. The selectors memoize the derived data and only recompute the data when the state changes.
  - Redux Persist is an awesome way persist the Redux store in the Async Storage of the mobile app and Local Storage in web app. We were able to avoid writing platform specific code.
- **Fonts** - Fonts work differently in mobile as compared to web. In web we can directly use font family name "Poppins" to get all the font variants of the font (thanks to google fonts which provides us the @font-face css). But in mobile we have to create a custom font family names for the same font. We have to provide a font family name for each font variant of different font weight and font style. For example "Poppins_Regular", "Poppins_Bold", "Poppins_Italic" etc instead of just "Poppins". We used [expo-fonts](https://docs.expo.dev/guides/using-custom-fonts/) to load the fonts in the mobile app and the good'ol google fonts for web.
## Public Code Repo
Cookied Public Mono Repo - https://github.com/ashuvssut/cookied
Following are the paths to the apps in the monorepo:
- Cookied web app - https://github.com/ashuvssut/cookied/tree/main/apps/web
- Cookied Native mobile app - https://github.com/ashuvssut/cookied/tree/main/apps/expo
- Cookied Chrome Extension - https://github.com/ashuvssut/cookied/tree/main/apps/chrome-extension
- Appwrite Functions - https://github.com/ashuvssut/cookied/tree/main/apps/fx

## Demo Link

We are thankful to the [Appwrite](https://appwrite.io) and [Hashnode](https://hashnode.com) team for providing us with the opportunity to build this project by organizing this awesome hackathon. We are really excited to improve and level up this project and make it an amazing productively tool for the folks out there! There are lots of features coming to improve the User experience! Stay tuned!

<!--- Add a link to the demo recording of your project in this section --->

<!-- Tell us what your project does

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
**** -->
