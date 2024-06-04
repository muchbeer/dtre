export const END_LOADING = 'END_LOADING';

export const START_LOADING = 'START_LOADING';

export const UPDATE_ALERT = 'UPDATE_ALERT';

export const updateAlertFunction = (dispatch, severity, updateAlertConstant, message) => {
    dispatch({
        type: updateAlertConstant,
        payload: {
          open: true,
          severity: severity,
          message: message,
        },
      });
};

export const countGsmSegments = (message) => {

  const gsm7bitBasicCharset = "£$¥èéùìòÇ\nØø\rÅå_ÆæßÉ \"¤%&'(),./0123456789¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
  const gsm7bitExtendedCharset = '^{}\\[~]|€@#*-=?<>!:;+';

  let messageLength = 0;

  for (let i = 0; i < message.length; i++) {
      if (gsm7bitBasicCharset.includes(message[i])) {
          messageLength += 1;
      } else if (gsm7bitExtendedCharset.includes(message[i])) {
          messageLength += 3; // Each extended character uses two character spaces
      } else {
          throw new Error(`Unsupported character found: ${message[i]}`);
      }
  }

  if (messageLength <= 160) {
      return 1;
  } else {
      return Math.ceil(messageLength / 153);
  }
}