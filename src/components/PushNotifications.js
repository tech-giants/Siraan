import { Platform } from 'react-native';
import { get } from 'lodash';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
import { registerDrawerDeepLinks } from '../utils/deepLinks';

import store from '../store';
import * as authActions from '../actions/authActions';

/**
 * Registers a notification listeners. (get, open, post)
 *
 * @param {string} componentId - Component id where notification was received.
 */
function RegisterPushListener(componentId) {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground(
    (notification, completion) => {
      completion({ alert: true, sound: true, badge: true });
    },
  );

  Notifications.events().registerNotificationOpened(
    (notification, completion) => {
      const targetScreen = get(
        notification,
        'payload.data.targetScreen',
        false,
      );
      if (targetScreen) {
        registerDrawerDeepLinks(
          {
            link: targetScreen,
            payload: notification.payload,
          },
          componentId,
        );
      }
      completion();
    },
  );

  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    Notifications.postLocalNotification({
      ...remoteMessage.notification,
      data: remoteMessage.data,
    });
  });

  return unsubscribe;
}

/**
 * Initializes notifications.
 * Requests permissions.
 * Gets token and set it to store.
 */
async function Init() {
  await messaging().requestPermission({
    badge: true,
    sound: true,
    alert: true,
  });

  const token = await messaging().getToken();
  console.log('TOKEN (getFCMToken)', token);

  const { auth, settings } = store.getState();
  if (auth.deviceToken !== token) {
    store.dispatch(
      authActions.deviceInfo({
        token,
        platform: Platform.OS,
        locale: settings.selectedLanguage.langCode,
        device_id: auth.uuid,
      }),
    );
  }
}

export default {
  Init,
  RegisterPushListener,
};
