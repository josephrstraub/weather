export const LOCATION = 'LOCATION';
// export const askAsync = jest.fn((permissionType) => {
//   return { status: 'granted' };
//   if (permissionType === LOCATION) {
//     return { status: 'granted' };
//   }
//   return { status: 'denied' };
// });

// export const askAsync = jest.fn((permissionType) => {
//   if (permissionType === LOCATION) {
//     Promise.resolve({ status: 'granted' });
//   }
//   Promise.resolve({ status: 'denied' });
// });

export const askAsync = jest.fn().mockResolvedValueOnce({ status: 'granted' });
