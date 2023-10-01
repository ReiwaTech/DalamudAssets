import { generate } from './util/generate.mjs'

// Constants
const upstream = 'https://goatcorp.github.io/DalamudAssets/asset.json'

const appendList = {
  'UIRes/NotoSansCJKsc-Regular.otf': {
    url: 'https://mirrors.tuna.tsinghua.edu.cn/ctan/fonts/notocjksc/NotoSansCJKsc-Regular.otf',
    sha1: 'd577bdc302c03212e1d05fd3f808657a71edea0c',
  },
  'UIRes/NotoSansCJKsc-Medium.otf': {
    url: 'https://mirrors.tuna.tsinghua.edu.cn/ctan/fonts/notocjksc/NotoSansCJKsc-Medium.otf',
    sha1: 'c8ac9e680749bf31536971bc51db257ddbaf3e68',
  },
}
const updateList = {
  'UIRes/NotoSansCJKsc-Regular.otf': {
    url: 'https://mirrors.tuna.tsinghua.edu.cn/ctan/fonts/notocjksc/NotoSansCJKsc-Regular.otf',
    sha1: 'd577bdc302c03212e1d05fd3f808657a71edea0c',
  },
  'UIRes/NotoSansCJKsc-Medium.otf': {
    url: 'https://mirrors.tuna.tsinghua.edu.cn/ctan/fonts/notocjksc/NotoSansCJKsc-Medium.otf',
    sha1: 'c8ac9e680749bf31536971bc51db257ddbaf3e68',
  },
}
const removeList = [
  'UIRes/NotoSansCJKjp-Medium.otf',
  'UIRes/NotoSansKR-Regular.otf',
  'UIRes/pdb/ffxiv_dx11.pdb',
]

const githubRaw =
  'https://raw.githubusercontent.com/goatcorp/DalamudAssets/master/'
const githubPage = 'https://goatcorp.github.io/DalamudAssets/'

// Start
const format = (file, { url, sha1 }) => ({
  Url: url,
  FileName: file,
  Hash: sha1,
})

;(async () => {
  const res = await fetch(upstream)

  /** @type {import('./util/generate.mjs').AssetJson} */
  const data = await res.json()

  generate(
    data.Assets.filter((item) => !removeList.includes(item.FileName))
      .map((item) => {
        if (updateList[item.FileName]) {
          return format(item.FileName, updateList[item.FileName])
        }

        if (item.Url.startsWith(githubRaw)) {
          return {
            ...item,
            Url: `${githubPage}${item.Url.slice(githubRaw.length)}`,
          }
        }

        return item
      })
      .concat(Object.entries(appendList).map((args) => format(...args))),
    data.Version
  )
})()
