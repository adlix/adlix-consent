module.exports = ({ env }) => ({
  'users-permissions': {
    enabled: true,
    config: {
      password: {
        min: 6,
      },
    },
  },
});
