# Системные требования.
- Для сборки релиза и dev-версии a Android подойдет любой PC.
- Для сборки iOS-приложения нужен Mac. Желательно иметь последние версии ОС и Xcode.
- Так-же требуется Node.js версии не ниже 8.6 и npm версии не ниже 5.0.

# Настройка окружения Linux (чистая Ubuntu 18)
## NPM (6.14.8)
1. `sudo apt install npm` — устанавливаем npm.
2. `npm install -g npm` — обновляем npm.

## NodeJs (12.18.3)
1. `sudo apt install curl` — устанавливаем cURL.
2. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash` — устанавливаем NVM.
3. `nvm install 12.18.3` — обновляем Node.js (в данном случае версия 12.18.3).

## React Native Cli (2.0.1)
1. `sudo npm install -g react-native-cli` — устанавливаем React Native CLI.

## Java (11.0.9.1)
1. `sudo apt update`
2. `sudo apt install default-jdk`

## Git (2.17.1)
1. `sudo apt install git`
2. `git config --global user.name "Your Name"`
3. `git config --global user.email "youremail@domain.com"`
4. `cd ~/.ssh && ssh-keygen` — создаём ключ.
5. `cat id_rsa.pub` — выводим ключ в терминал, копируем.
6. Добавляем ключ в свой аккаунт через https://github.com/.

## Android Studio
1. https://developer.android.com/studio/install.html — скачиваем и устанавливаем Android Studio.
2. `sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386` — устанавливаем эту библиотеку, если используете 64-bit версию Linux.
3. Во время установки установите Google APIs, Android SDK Platform 23, Intel x86 Atom_64 System Image, Google APIs Intel x86 Atom_64 System Image.

# Сборка на Linux
1. В корне проекта запускаем `npm i` — устанавливаем зависимости.
2. Запускаем Android Studio
3. Открываем Android Studio идём в `configure/AVD Manager/Create Virtual Device` — создаём дефолтный эмулятор.
4. В корне проекта запускаем `react-native run-android`

# Настройка окружения Mac
## NodeJs (12.18.3)
1. https://nodejs.org/en/download/ — скачиваем и устанавливаем Node.js.

## React Native Cli (2.0.1)
1. `sudo npm install -g react-native-cli` — устанавливаем React Native CLI.

## Java (11.0.9.1)
1. https://www.oracle.com/java/technologies/javase-jdk11-downloads.html — скачиваем и устанавливаем JDK macOS Installer.

## Git (2.17.1)
1. `sudo apt install git`
2. `git config --global user.name "Your Name"`
3. `git config --global user.email "youremail@domain.com"`
4. `cd ~/.ssh && ssh-keygen` — создаём ключ.
5. `cat id_rsa.pub` — выводим ключ в терминал, копируем.
6. Добавляем ключ в свой аккаунт через https://github.com/.

## XCode
1. Скачиваем и устанавливаем XCode.

# Установка и запуск macOS в режиме dev
1. В корне проекта запускаем `npm i` — устанавливаем зависимости.
2. `cd ios` — идём в папку ios.
3. `pod install` — устанавливаем зависимости.
4. `cd ..` — возвращаемся в корень проекта.
5. В корне проекта запускаем `react-native run-ios`.

# Примечания
- Иногда в эмуляторе могут появляться желтые и красные предупреждения, их можно скрыть и обновить приложение: `command + R`.
- Также можно открыть dev-консоль, нажав в эмуляторе `command + shift + Z` и выбрав там пункт.
- При переключении на ветки с другой версией приложения:
  - В корне проекта `rm -rf node_modules` — удалить старые зависимости.
  - В корне проекта `npm i` — установить новые зависимости.
  - Только для iOS: `cd ios` → `rm -rf Pods` → `pod install` — удалить старые зависимости и установить новые.
