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