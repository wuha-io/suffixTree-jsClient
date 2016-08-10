
const R = require('ramda')
const net = require('net')

const splitLine = R.pipe(String, R.split('\n'), R.map(String), R.map(R.trim), R.filter(R.prop('length')))
const splitPatternLine = R.split(':')

module.exports = (clientOpts = { port: 3010 }) => {

  const patternLineToObject = patternLine => {
    const [ support, pattern ] = splitPatternLine(patternLine)
    return { support: Number(support), pattern }
  }

  const dataHandler = stream => line => {
    const processPatternLine = patternLine => stream.emit('data', patternLineToObject(patternLine))
    R.forEach(processPatternLine)(splitLine(line))
  }

  const request = ({ stream, str, minLength = 1, minSupport = 1 }) => {
    net.connect({ port: clientOpts.port }, function () {
      this.on('data', dataHandler(stream))
      this.on('error', err => stream.emit('error', err))
      this.on('end', () => stream.emit('end'))
      this.write(`${str.replace(/\n/g, '')}\n`)
      this.write(`${Number(minLength)}\n`)
      this.write(`${Number(minSupport)}\n`)
    })
  }

  return { request }
}
