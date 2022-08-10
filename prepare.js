/**
 * CI环境检查：在非CI环境下才允许husky限定
 */

const isCi = process.env.CI !== undefined
console.log('isC==', isCi)
if (isCi) {
    require('husky').install()
}
