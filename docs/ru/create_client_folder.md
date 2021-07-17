## Создание папки клиента

  1. Создаём папку клиента в папке users (если папки users нет, создаём её в корне проекта). Называем папку по bundleId
      - ./users/client_folder_name (например, com.simtech.multivendor)

  2. Наполняем папку клиента следующим содержимым:
      - src/config
        - index.js
        - theme.js
      - android/app/src/main/res
        - Серия папок mipmap (Точные названия можно взять в [примере](https://github.com/cscart/mobile-app/tree/1-25160/users/com.simtech.multivendor/android/app/src/main/res). Файлы с иконками, иконками для уведомлений и сплэш скринами, внутри этих папок, должны называться точно также, как в [примере](https://github.com/cscart/mobile-app/tree/1-25160/users/com.simtech.multivendor/android/app/src/main/res/mipmap-hdpi))
        - values
          - strings.xml (В тег string должно подставляться название приложения)
          - styles.xml
      - ios/csnative
          - Info.plist (В тег string, под ключом CFBundleDisplayName, должно подставляться название приложения)
          - Images.xcassets
            - AppIcon.appiconset (Должна содержать 21 иконку, названия и размеры должны соответствовать [примерам](https://github.com/cscart/mobile-app/tree/1-25160/users/com.simtech.multivendor/ios/csnative/Images.xcassets/AppIcon.appiconset))
            - LaunchScreen.imageset (Должна содержать 3 сплэш скрина, названия и размеры должны соответствовать [примерам](https://github.com/cscart/mobile-app/tree/1-25160/users/com.simtech.multivendor/ios/csnative/Images.xcassets/LaunchScreen.imageset))

  3. В корне проекта запускаем команду:
      ```sh
        $ make change USER=client_folder_name
      ```

  4. Собираем приложение

## Примечание

  > Пример готовой папки клиента - com.simtech.multivendor

  > Полученные изменения коммитить не надо