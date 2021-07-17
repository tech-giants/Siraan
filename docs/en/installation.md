# System Requirements.
- To build release version and an Android version, any PC is suitable.
- To build iOS applications, you will need a Mac. Is preferable to have the latest OS and Xcode versions.
- Node.js at least 8.6v. and npm at least 5.0v. are also required.

# Setting up Linux Environment (clean Ubuntu 18)
## NPM (6.14.8)
1. `sudo apt install npm`
2. `npm install -g npm` — updates npm.

## NodeJs (12.18.3)
1. `sudo apt install curl`
2. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash` — installs NVM.
3. `nvm install 12.18.3` - updates Node.js (in this case it is version 12.18.3).

## React Native Cli (2.0.1)
1. `sudo npm install -g react-native-cli`

## Java (11.0.9.1)
1. `sudo apt update`
2. `sudo apt install default-jdk`

## Git (2.17.1)
1. `sudo apt install git`
2. `git config --global user.name "Your Name"`
3. `git config --global user.email "youremail@domain.com"`
4. `cd ~/.ssh && ssh-keygen` — creates a key.
5. `cat id_rsa.pub` — output the key to the terminal and copy the key.
6. Add the key to your account on https://github.com/.

## Android Studio
1. https://developer.android.com/studio/install.html — download and install Android Studio.
2. `sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386` — install this library if you are using 64-bit Linux.
3. During the installation, aslo install Google APIs, Android SDK Platform 23, Intel x86 Atom_64 System Image, Google APIs Intel x86 Atom_64 System Image.

# Building on Linux
1. In the root of the project, run `npm i` — installs dependencies.
2. Run Android Studio.
3. Open Android Studio, go to `configure/AVD Manager/Create Virtual Device` — and create a default emulator.
4. In the root of the project, run `react-native run-android`.

# Setting up Mac Environment
## NodeJs (12.18.3)
1. https://nodejs.org/en/download/ — download and install Node.js.

## React Native Cli (2.0.1)
1. `sudo npm install -g react-native-cli` — install React Native CLI.

## Java (11.0.9.1)
1. https://www.oracle.com/java/technologies/javase-jdk11-downloads.html — download and install JDK macOS Installer.

## Git (2.17.1)
1. `sudo apt install git`
2. `git config --global user.name "Your Name"`
3. `git config --global user.email "youremail@domain.com"`
4. `cd ~/.ssh && ssh-keygen` — create a key.
5. `cat id_rsa.pub` — output the key to the terminal and copy the key.
6. Add the key to your account on https://github.com/.

## XCode
1. Download and install Xcode.

# Installing and Running macOS in Development Mode
1. In the root of the project, run `npm i` — install dependencies.
2. `cd ios` — go to the ios folder.
3. `pod install` — installs dependencies.
4. `cd ..` — return to the root of the project.
5. In the root of the project, run `react-native run-ios`.

# Notes
- Sometimes yellow and red notes may appear in the emulator, you can hide them and update the application using `command + R`.
- You can also open the dev console by pressing `command + shift + Z` in the emulator and selecting the item there.
- When switching to branches with a different version of the app:
  - In the root of the project `rm -rf node_modules` — removes old dependencies.
  - At the root of the project `npm i` — installs new dependencies.
  - iOS only: `cd ios` → ` rm -rf Pods` → `pod install` — removes old dependencies and installs the new ones.