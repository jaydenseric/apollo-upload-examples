import 'source-map-support/register'
import {spawn} from 'child_process'
import chalk from 'chalk'
import indentString from 'indent-string'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.babel'

let serverProcess
let wasServerMessage

function startServer () {
  serverProcess = spawn('node', [webpackConfig.output.path])
  serverProcess.stdout.on('data', data => {
    console.log((wasServerMessage ? '' : '\n') + indentString(chalk.white(data), 4))
    wasServerMessage = true
  })
  serverProcess.stderr.on('data', data => {
    console.error((wasServerMessage ? '' : '\n') + indentString(chalk.red(data), 4))
    wasServerMessage = true
  })
}

function stopServer () {
  if (serverProcess) serverProcess.kill()
}

const compiler = webpack(webpackConfig)
const watcher = compiler.watch({}, (errors, stats) => {
  const hasErrors = errors || stats.hasErrors()
  console[hasErrors ? 'error' : 'log']((stats.toString('minimal')))
  wasServerMessage = false

  stopServer()
  if (!hasErrors) startServer()
})

function exit () {
  watcher.close()
  stopServer()
}

;[
  'SIGINT',
  'SIGTERM',
  'SIGHUP',
  'SIGQUIT',
  'exit',
  'uncaughtException'
].forEach(event => process.on(event, exit))
