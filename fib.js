// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233


const fibonacci = (n) => {
//     10 - 55
//     5 - 5
//     0 - prev, 0 + 1,
    let grandPrev;
    let prev;
    let result;
    for(let i = 0; i < n; i++) {
        if (i === 0) {
            grandPrev = 0;
            prev = 1;
            result = 1
        } else {
            result = grandPrev + prev;
            grandPrev = prev;
            prev = result;
        }
    }

    return result;
}


console.log(fibonacci(7));
