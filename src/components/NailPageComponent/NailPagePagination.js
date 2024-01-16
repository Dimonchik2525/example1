import { useState } from "react";


export default function NailPagePagination(props) {

   let amount = Math.ceil(props.clients.length / 10)
   let [number, setNumber] = useState(4)
   let [current, setCurrent] = useState(1)
   let buttons = [];
   for (let i = 1; i <= amount; i++) {
      if (amount > 1) {
         if (i == 1) {
            buttons.push(
               <button className={(current == i) ? 'current' : 'uncurrent'} key={i} onClick={() => {
                  setCurrent(i);
                  setNumber(4)
                  props.setShow({ start: (i - 1) * 10, end: i * 10 })
               }}>{i}</button>
            )
         }
         if (i == amount) {
            buttons.push(
               <button className={(current == i) ? 'current' : 'uncurrent'} key={i} onClick={() => {
                  setCurrent(i);
                  setNumber(amount - 3)
                  props.setShow({ start: (i - 1) * 10, end: i * 10 })
               }}>{i}</button>
            )
         }
         if (i <= number + 2 && i >= number - 2 && i != 1 && i != amount) {
            buttons.push(
               <button className={(current == i) ? 'current' : 'uncurrent'} key={i} onClick={() => {
                  setCurrent(i);
                  (i == amount - 1 || i == amount - 2) ? setNumber(amount - 3) : (i == 2 || i == 3) ? setNumber(4) : setNumber(i);
                  props.setShow({ start: (i - 1) * 10, end: i * 10 })
               }
               }> {i}</button >
            )
         }
      }
      else {
         buttons.push(
            <button className="after" key={i} onClick={() => {
               setNumber(4)
               props.setShow({ start: (i - 1) * 10, end: i * 10 })
            }}>{i}</button>
         )
      }
   }
   return (
      <div className="pagination__wrapper">
         <div className="pagination__container">
            <div className="pagination__content">
               {buttons}
            </div>
         </div>
      </div>
   )
}