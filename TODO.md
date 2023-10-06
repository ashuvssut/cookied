> packages/app
1. When creating folder, check if the same folder title already exists... as you to rename else if user doesnt rename, add a suffix like (1). This logic is to be implemented in folder.ts create mutation
2. Open TreeView folders recursively. Rewrite TreeWrapper?
   1. Also if empty folder are like /a/b/c/d/bookmark, the should not render the whole tree tiles for a b c d. these should be a single tile with title a/b/c/d
3. drag and drop to rearrange bookmarks/folders
4. Create a GCP VM container image to address the puppeteer issue (see comments of fetchHtml that uses vercel serverless to do scraping using puppeteer.)
5. Import/export bms with browsers
6. folder locks with encrypted folder details (titles, urls, or anything that is readable and might contain private info)
7. TreeView vertical line
8. Automatic eas build (trigger GH action) 
   1. Generate Preview builds to get the APKs(eas build -p android --profile preview)
9.  Upgrade project to latest solito and RN. Use Solito App dir.
10. convert to tamagui with custom compoenents that follow MD3 (maybe start tamamui project first)
11. 404 page
12. Drag to resize left pane in web
13. PROFILE MENU OPTIONS
- Star on GitHub
- Buy me a Coffee
- EXPORT/IMPORT 
- Lock folders
- Theme changer (start tamamui project first)
