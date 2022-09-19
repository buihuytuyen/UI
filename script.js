// import html from './core.js'

// const cars = ['BMV', 'Porsche', 'Mercedes']

// const output = html`
//     <h1>${false}</h1>
//     <ul>
//         ${cars.map(car => `<li>${car}</li>`)}
//     </ul>
// `

// console.log(output)

import {attach} from './store.js'
import App from './component/App.js'

attach(App, document.getElementById('root'))