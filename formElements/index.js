let formComponents = {}

function importAll(r) {
  r.keys().forEach(key => {
    let match = key.match(/^\.\/([^\/(\/|\\\\)]*)\/(index|indexxx)\.vue$/)
    formComponents[match[1]] = r(key).default
  })
}

// require.context 不能用变量
importAll(require.context('./', true, /^\.\/([^\/(\/|\\\\)]*)\/(index|indexxx)\.vue/))

export default formComponents
