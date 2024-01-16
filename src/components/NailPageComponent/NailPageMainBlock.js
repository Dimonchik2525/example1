import { useState } from "react";
import NailPageForm from "./NailPageForm";
import NailPagePagination from "./NailPagePagination";


export default function NailPageMainBlock(props) {
   let [amount, setAmount] = useState(0)
   return (
      <div className="nail__main__wrapper">
         <div className="nail__main__container">
            <div className="nail__main__content">
               {props.clients.map((item) => {
                  return <NailPageForm Edit={props.Edit} addClient={props.addClient} remove={props.remove} key={item.id} clientsBase={props.clientsBase} clients={props.clients} client={item} />
               })}
               <NailPagePagination amount={amount} setAmount={setAmount} show={props.show} setShow={props.setShow} clients={props.clientsReal} />
            </div>
         </div>
      </div>
   )
}