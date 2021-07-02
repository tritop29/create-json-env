const start =  async () => {

  // Core
  const core = require('@actions/core')
  const fs = require('fs')

  const fileName = core.getInput('file-name')
  const inputPrefix = "INPUT_"
  const path = require("path")
  const fullPath = path.join(process.env.GITHUB_WORKSPACE, fileName)

  var obj = {TOM: {}, ALE: {}, SERVER: {}}

  Object.keys(process.env).forEach(function(key) {
    if(key.startsWith(inputPrefix) && key != "INPUT_FILE-NAME") {
      if(key === 'NAME' || key === 'TYPE'){
        obj['SERVER']['DEV'][key.substring(inputPrefix.length)] = process.env[key]
        obj['SERVER']['QA'][key.substring(inputPrefix.length)] = process.env[key]
      } else {
        obj['SERVER']['DEV'][key.substring(inputPrefix.length)] = JSON.parse(process.env[key])
        obj['SERVER']['QA'][key.substring(inputPrefix.length)] = JSON.parse(process.env[key])
      }
    }
  })

  console.log(JSON.stringify(obj))

  await fs.writeFile(fullPath, obj, function (error) {
    if (error) core.setFailed(error.message)
    console.log(`Successfully written file ${fullPath} `)
    core.setOutput("full-path", fullPath)
  })
}

start()