# BugLogger

This is a simple cross-platform desktop application in which you can track bugs by creating, editing and deleting the bugs. To run the application please read the instruction carefully.

## Running locally

### Using yarn

```bash
  $ yarn install
  $ yarn start
```

### Using npm

```bash
  $ npm i
  $ npm start
```

## Building app for different platforms

### Step 1: Package the app

```bash
  $ yarn run package
```

### Step 2: Postpackage

#### Using yarn

##### For Linux:

```bash
  $ yarn run postpackage-linux
```

##### For MacOS:

```bash
  $ yarn run postpackage-mac
```

##### For Windows:

```bash
 $ yarn run postpackage-win
```

#### Using npm

##### For Linux:

```bash
  $ npm run postpackage-linux
```

##### For MacOS:

```bash
  $ npm run postpackage-mac
```

##### For Windows:

```bash
 $ npm run postpackage-win
```

After building ,the build files will be stored in release-builds directory.
