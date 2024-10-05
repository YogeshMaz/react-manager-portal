// src/config.js
let config = {
  PM_EMAIL: null,
};

export const updatePMEmail = (email) => {
  config.PM_EMAIL = email;
};

export const getPMEmail = () => {
  return config.PM_EMAIL;
};

export default config;
