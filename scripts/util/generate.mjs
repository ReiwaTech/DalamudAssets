import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { shallowEqual } from './shallow-equal.mjs'

const file = fileURLToPath(new URL('../../asset.json', import.meta.url))

/**
 * @typedef {Object} Asset
 * @property {string} Url
 * @property {string} FileName
 * @property {string|undefined} Hash
 */

/**
 * @typedef {Object} AssetJson
 * @property {number} Version
 * @property {number} UpstreamVersion
 * @property {Asset[]} Assets
 */

/**
 * @returns {AssetJson}
 */
function readOldJson() {
  try {
    const text = readFileSync(file, 'utf-8')
    return JSON.parse(text)
  } catch (e) {
    return {
      Version: 0,
      Assets: [],
    }
  }
}

/**
 * @param {Asset[]} assets
 * @param {number} upstreamVersion
 * @param {boolean} force
 */
export function generate(assets, upstreamVersion, force = false) {
  const oldJson = readOldJson()

  // check changed or not
  const changed =
    force ||
    oldJson.UpstreamVersion !== upstreamVersion ||
    !shallowEqual(oldJson.Assets, assets)

  if (!changed) {
    console.log('Assets not changed, skip.')
    return
  }

  const version = oldJson.Version + 1
  console.log('Writing version', version)

  writeFileSync(
    file,
    JSON.stringify(
      {
        Version: version,
        UpstreamVersion: upstreamVersion,
        Assets: assets,
      },
      null,
      2
    )
  )
}
