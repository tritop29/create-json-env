const start =  async () => {

  // Core
  const core = require('@actions/core')
  const fs = require('fs')

  const fileName = core.getInput('file-name')
  const inputPrefix = "INPUT_"
  const path = require("path")
  const fullPath = path.join(process.env.GITHUB_WORKSPACE, fileName)

  var obj = { SERVER: {} }

  Object.keys(process.env).forEach(function(key) {
    if(key.startsWith(inputPrefix) && key != "INPUT_FILE-NAME") {
      if(key === 'INPUT_NAME' || key === 'INPUT_TYPE') {
        obj['SERVER']['QA'][key.substring(inputPrefix.length)] = process.env[key]
      } else {
        console.log('PRUEBA DE METODO')
        console.log(process.env[key])
        console.log(typeof process.env[key])
        console.log('------------')
        // obj['SERVER']['QA'][key.substring(inputPrefix.length)] = JSON.parse(process.env[key])
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