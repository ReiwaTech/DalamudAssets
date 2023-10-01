/*
 * Based on https://www.npmjs.com/package/shallow-equal
 * Copyright © 2023 Misha Moroshko and Philip Su
 */

function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true
  }
  if (!arrA || !arrB) {
    return false
  }
  const len = arrA.length
  if (arrB.length !== len) {
    return false
  }
  for (let i = 0; i < len; i++) {
    if (!shallowEqual(arrA[i], arrB[i])) {
      return false
    }
  }
  return true
}

function shallowEqualObjects(objA, objB) {
  if (!objA || !objB) {
    return false
  }
  const aKeys = Object.keys(objA)
  const bKeys = Object.keys(objB)
  const len = aKeys.length
  if (bKeys.length !== len) {
    return false
  }
  for (let i = 0; i < len; i++) {
    const key = aKeys[i]
    if (
      !shallowEqual(objA[key], objB[key]) ||
      !Object.prototype.hasOwnProperty.call(objB, key)
    ) {
      return false
    }
  }
  return true
}

function shallowEqual(a, b) {
  if (a === b) {
    return true
  }

  const aType = typeof a
  const bType = typeof b

  if (aType !== bType) {
    return false
  }

  if (aType === 'object') {
    const aIsArr = Array.isArray(a)
    const bIsArr = Array.isArray(b)
    if (aIsArr !== bIsArr) {
      return false
    }
    if (aIsArr && bIsArr) {
      return shallowEqualArrays(a, b)
    }
    return shallowEqualObjects(a, b)
  }

  return false
}

export { shallowEqual, shallowEqualArrays, shallowEqualObjects }
