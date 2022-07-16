import axios from 'axios'
import {initAdmin} from './admin'

let addtocart = document.querySelectorAll('.add-to-cart')



addtocart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza =  JSON.parse(btn.dataset.pizza) 
        updatecart(pizza)
    })
})

function updatecart(pizza){
    axios.post('/update-cart',pizza).then(res =>{
        console.log(res)
    })
    }

    initAdmin()