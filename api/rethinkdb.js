import rethinkdbdash from 'rethinkdbdash'
import {rethinkdb} from './config'

let driver
export default () => {
  if (!driver) {
    driver = rethinkdbdash(rethinkdb)
  }
  return driver
}
