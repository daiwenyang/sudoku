const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, '.', dir)
// }
module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    })
)