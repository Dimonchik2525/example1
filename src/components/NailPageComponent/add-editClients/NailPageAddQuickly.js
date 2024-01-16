import { useState } from "react"


export default function NailPageAddQuickly(props) {
   let [addClient, setAddClient] = useState({ name: props.client.name, price: props.client.price, date: '' })
   let [correct, setCorrect] = useState({ name: 'f', price: 'f', date: 'f' })
   return (
      <div onClick={(e) => props.setShowAdd(false)} className="addClient__wrapper">
         <div className="addClient__container">
            <div onClick={(e) => e.stopPropagation()} className="addClient__content">
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
                           id: +props.clientsBase[props.clientsBase.length - 1].id + 1,
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