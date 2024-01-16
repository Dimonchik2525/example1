import { useEffect, useRef, useState } from "react"


export default function NailPageAdd(props) {
   let add = useRef()
   let [addClient, setAddClient] = useState({ name: '', price: '', date: '' })
   let [correct, setCorrect] = useState({ name: 'f', price: 'f', date: 'f' })
   useEffect(() => {
      if (props.showAdd) {
         let focus = add.current.querySelectorAll('input')
         focus[0].focus()
         for (let i = 0; i < focus.length; i++) {
            focus[i].addEventListener('keyup', function (e) {
               if (e.key == 'Enter') {
                  if (i == focus.length - 1) {
                     focus[0].focus()
                  }
                  if (i != focus.length - 1) {
                     focus[i + 1].focus()
                  }
               }
            })
         }
      }
   }, [])


   return (
      <div onClick={(e) => props.setShowAdd(false)} className="addClient__wrapper">
         <div className="addClient__container">
            <div ref={add} onClick={(e) => e.stopPropagation()} className="addClient__content">
               <div className="addClient__name">
                  <input onChange={(e) => setAddClient({ ...addClient, name: e.target.value })} value={addClient.name} type="text" placeholder="your name" />
                  {correct.name ? "" : <div className="uncorrect">uncorrect name, please enter the correct name</div>}
               </div>
               <div className="addClient__price">
                  <input onChange={(e) => setAddClient({ ...addClient, price: e.target.value })} value={addClient.price} type="text" placeholder="price" />
                  {correct.price ? "" : <div className="uncorrect">uncorrect price, please enter the correct price</div>}
               </div>
               <div className="addClient__date">
                  <input onChange={(e) => setAddClient({ ...addClient, date: e.target.value })} value={addClient.date} type="date" placeholder="date" />
                  {correct.date ? "" : <div className="uncorrect">uncorrect date, please choose the date</div>}
               </div>
               <div className="addClient__enter">
                  <button onClick={() => {
                     setCorrect({ ...addClient })
                     if (addClient.name && addClient.price && addClient.date) {
                        let date = new Date(addClient.date)
                        date.setHours(0)
                        props.addClient({
                           id: +props.clients[props.clients.length - 1].id + 1,
                           name: addClient.name,
                           price: addClient.price,
                           date: date
                        })
                        props.setShowAdd(false)
                     }
                  }}>Add</button>
               </div>
            </div>
         </div>
      </div>
   )
}