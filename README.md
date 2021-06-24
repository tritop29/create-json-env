# create-json-env

This action writes environment variables (or anything you want) to a JSON file that can be accessed by future steps.

## Inputs

* **[required] `file-name`**: The name of the file to be written.
* **Other variables**: you must specify any other variable you want written to the JSON as input variables. Pass the variable with the name you want to appear in the JSON.

## Output

* **`full-path`**: The full path to the written file

## Usage

``` yaml
uses: ProsperTo/create-json-env-demo@v1
with:
  file-name: 'env.json'
  name: 'Server'
  type: 'QA'
  checkout: '{"URL_API":"${{secrets.EXTERNAL_CALLAO_URL_API}}","SECRET_KEY_ACCESS":"${{secrets.EXTERNAL_CALLAO_SECRET}}"}'
  aes: '{"KEY":"${{secrets.ENCRYPTED_AES_KEY}}", "IV":"${{secrets.ENCRYPTED_AES_IV}}"}'
  db: '[{"TYPE": "mongo1", "URL": "${{secrets.DATABASE_MONGO1_URL}}", "TIME_CHECK_CONNECTION": 600000}]'
```
