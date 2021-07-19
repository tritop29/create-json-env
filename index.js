const start =  async () => {

  // Core
  const core = require('@actions/core')
  const fs = require('fs')

  const fileName = core.getInput('file-name')
  const type = core.getInput('type')
  const inputPrefix = "INPUT_"
  const path = require("path")
  const fullPath = path.join(process.env.GITHUB_WORKSPACE, fileName)

  var obj = { QA: { SERVER: {} }, PROD: { SERVER: {} } }

  Object.keys(process.env).forEach( (key) => {
    if(key.startsWith(inputPrefix) && key != "INPUT_FILE-NAME") {

      if(key === 'INPUT_NAME' || key === 'INPUT_TYPE') {
        obj[type].SERVER[key.substring(inputPrefix.length)] = process.env[key]
      } else {
        obj[type].SERVER[key.substring(inputPrefix.length)] = JSON.parse(process.env[key].replace(/(?:\r\n|\r|\n)/g, ''))
      }
    }
  })

  await fs.writeFile(fullPath, JSON.stringify(obj), 'utf-8', (error) => {
    if (error) core.setFailed(error.message)
    console.log(`Successfully written file ${fullPath} `)
    core.setOutput("full-path", fullPath)
  })
}

start()