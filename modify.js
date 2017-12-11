var path = require('path')
var fs = require('fs')

var r = process.argv[2] === 'restore'

var pkgPath = path.resolve(process.cwd(), './package.json')
var removedPath = path.resolve(process.cwd(), './removed.json')

var pkg = require(pkgPath)

if (r) {
  // restore saved deps
  var removed = require(removedPath)
  for(var k in removed) {
    pkg.dependencies[k] = removed[k]
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  fs.unlinkSync(removedPath)
} else {
  // remove
  var removed = {}
  for(var k in pkg.dependencies) {
    if (k.substr(0, 1) === '@') {
      removed[k] = pkg.dependencies[k]
      delete pkg.dependencies[k]
    }
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  fs.writeFileSync(removedPath, JSON.stringify(removed))
}