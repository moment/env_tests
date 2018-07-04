#!/bin/bash

set -eo pipefail

pkg_one() {
    fileName="$1"
    destPath="$2"
    header="$3"
    footer="$4"

    mkdir -p "$(dirname "$destPath")"
    echo -e "$header" > "$destPath"
    cat "$fileName" >> "$destPath"
    echo -e "$footer" >> "$destPath"
}

targ=node_modules/bmoment
rm -rf "$targ"
mkdir -p $targ
echo """
{
    \"name\": \"bmoment\",
    \"version\": \"1.0.0\",
    \"main\": \"bmoment.js\",
    \"module\": \"bmoment.mjs\"
}""" > "$targ/package.json"
pkg_one src/bmoment.js "$targ/bmoment.js" 'module.exports = factory();' ''
pkg_one src/locale/de.js "$targ/locale/de.js" 'factory(require("bmoment"));' ''
pkg_one src/locale/ru.js "$targ/locale/ru.js" 'factory(require("bmoment"));' ''

pkg_one src/bmoment.js "$targ/bmoment.mjs" 'export default factory();\nconsole.log("inside bmoment.mjs");' ''
pkg_one src/locale/de.js "$targ/locale/de.mjs" 'import bmoment from "bmoment";\nfactory(bmoment);\nconsole.log("inside de.mjs");' ''
pkg_one src/locale/ru.js "$targ/locale/ru.mjs" 'import bmoment from "bmoment";\nfactory(bmoment);\nconsole.log("inside ru.mjs");' ''

pkg_one src/test.js bmoment_test_cjs.js '' 'require("bmoment/locale/ru");\nrequire("bmoment/locale/de");\ntestAll(require("bmoment"));'
pkg_one src/test.js bmoment_test_esm.mjs '' 'import "bmoment/locale/ru";\nimport "bmoment/locale/de";\nimport bmoment from "bmoment";\ntestAll(bmoment);'
