const _ = require('lodash')
const combinatorics = require('js-combinatorics')
const pieces = [
    ['green', 'red', 'orange', 'white', 'yellow', 'blue'],
    ['orange', 'yellow', 'green', 'white', 'blue', 'red'],
    ['orange', 'white', 'blue', 'green', 'yellow', 'red'],
    ['blue', 'red', 'orange', 'green', 'yellow', 'white'],
    ['red', 'yellow', 'blue', 'orange', 'white', 'green'],
    ['yellow', 'orange', 'green', 'blue', 'white', 'red'],
    ['blue', 'yellow', 'white', 'orange', 'red', 'green']
]
const verifications = [
    [[0, 3], [1, 0]], [[0, 5], [2, 2]], [[0, 4], [3, 1]], [[1, 4], [4, 1]],
    [[1, 5], [3, 2]], [[2, 3], [3, 0]], [[2, 4], [5, 1]], [[3, 3], [4, 0]],
    [[3, 4], [6, 1]], [[3, 5], [5, 2]], [[4, 5], [6, 2]], [[5, 3], [6, 0]]
]

function fix(o) {
    return pieces[0].map(v => {
        let r = _.cloneDeep(o)
        rotate(r[0], 0, v)
        rotate(r[1], 0, r[0][3])
        rotate(r[2], 2, r[0][5])
        rotate(r[3], 0, r[2][3])
        rotate(r[4], 0, r[3][3])
        rotate(r[5], 1, r[2][4])
        rotate(r[6], 0, r[5][3])
        return r
    })
}

function rotate(piece, slot, color) {
    while (piece[slot] !== color) {
        let x = piece.pop()
        piece.unshift(x)
    }
}

_(combinatorics.permutation(pieces).toArray())
    .map(o => fix(o))
    .flatten()
    .filter(o => verifications.every(v => o[v[0][0]][v[0][1]] === o[v[1][0]][v[1][1]]))
    .take(1)
    .forEach(a => console.log(a))
