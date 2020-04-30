#!/bin/bash
set -e

node="yarn --silent node"
jestArgs=()

if [ "$TEST_DEBUG" ]; then
  node="$node --inspect-brk"
  jestArgs+=("--runInBand")
fi

if [ -n "$CI" ]; then
  jestArgs+=("--maxWorkers=4")
  jestArgs+=("--ci")
fi

if [ -n "$TEST_GREP" ]; then
  jestArgs+=("-t")
  jestArgs+=("$TEST_GREP")
fi

jestArgs+=("babel-node")

$node node_modules/.bin/jest "${jestArgs[@]}"
