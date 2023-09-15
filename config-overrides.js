const { alias, configPaths } = require('react-app-rewire-alias')

module.exports = function override(config, env) {
  alias(configPaths())(config)
  return config
}
