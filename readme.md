
# SuffixTree Client

Please first install and run the SuffixTree server :

[https://github.com/wuha-io/suffixTree](https://github.com/wuha-io/suffixTree)

## How to use

```js
const { Writable } = require('stream')
const newClient = require('.')

const stream = new Writable({ objectMode: true })
stream.on('data', console.log.bind(console))
stream.on('error', console.error.bind(console))
stream.on('end', () => console.log('End of the stream'))

const client = newClient()
client.request({ stream, str: 'SCMMSTSMCCMMMSSMMS' })
```
