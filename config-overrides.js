const { addWebpackAlias, override, useBabelRc } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

module.exports = override(
  addWebpackAlias({
    '@mui/styled-engine': '@mui/styled-engine-sc'
  }),
  addReactRefresh(),
  useBabelRc()
)
