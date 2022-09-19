const init = {
    cars: ['BMW']
}

export default function reducer(state = init, action, args) {

    switch (action) {
        case 'ADD':
            const [newCar] = args
            let t = {
                cars: [...state.cars, newCar]
            }
            console.log(t)
            return t
        default:
            return state
    }
}