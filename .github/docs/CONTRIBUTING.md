# Contributing to Cookied 🍪

Thank you for your interest in contributing to `cookied`! Whether you're a developer, designer, or enthusiast, there are many ways you can contribute to this project. Cookied is a suite of cross-platform apps designed to revolutionize how you save and organize your bookmarks.

## Prerequisites Before You Start Contributing

Before diving into contributing to our project, ensure you have the following prerequisites:

- **Android Development:**
  - Set up your environment for React Native development. Follow the [React Native official documentation](https://reactnative.dev/docs/environment-setup) for Android.

- **Node.js and Yarn:**
  - Make sure you have Node.js installed. If not, download it from [nodejs.org](https://nodejs.org/).
  - Our repository uses the Yarn package manager. If you don't have Yarn installed, you can get it from [yarnpkg.com](https://yarnpkg.com/).

If you have any questions or need assistance with the setup process, feel free to discuss it in our [GitHub Discussions](https://github.com/ashuvssut/cookied/discussions/).

## How Can I Contribute?

There are numerous ways you can contribute to `cookied`.

### 🐛 Report a Bug

If you encounter any issues or bugs, please report them using the [Bug Report](https://github.com/ashuvssut/cookied/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+Untitled+Bug+Issue) template. To expedite the resolution, kindly read the template and provide the requested information.

### 🛠 File a Feature Request

We welcome all feature requests, whether it's to add new functionality to `Cookied` or suggest modifications to existing features. File your feature request using the [Feature Request](https://github.com/ashuvssut/cookied/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFR%5D+Untitled+Feature+Request+Issue) template.

### 📚 Contribute to Docs

Help us improve the documentation for Cookied! Your contributions to the documentation play a crucial role in making the project more accessible and user-friendly.

### ⚙️ Contribute to Code

Let's collaborate to make Cookied flawless and elevate the user experience! You can contribute by addressing issues tagged as `bug` or `enhancement`.

#### Getting Started

1. **Fork and Clone the Repository:**
   - Fork this repository and clone it to your local machine.

2. **Set Up Environment Files:**
   - In every app directory (`apps/*`), you'll find example env files. Remove the `.example` extension and fill in the env values with your own.

3. **Install Dependencies:**
   - Run `yarn install` to install all the necessary dependencies.

4. **Yarn Scripts:**

   - **For Android Development:**
     ```bash
     yarn workspace native start
     ```

   - **For Web App Development:**
     ```bash
     yarn workspace web dev
     ```

   - **For Chrome Extension Development:**
     ```bash
     yarn workspace ext dev
     ```
     - After running the script, go to your browser's Extension page, turn on Dev mode, and click on 'Load Unpacked'. Load the `dist/` folder (located in `apps/chrome-extension`).

   - **For Backend:**
     ```bash
     yarn convex dev
     ```
     - Note: You need to install Convex CLI first. Visit the [Convex documentation](https://docs.convex.dev/) for more information.

Feel free to dive in and contribute to Cookied's development journey!
