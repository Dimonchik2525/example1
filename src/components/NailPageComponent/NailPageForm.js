import { useContext, useState } from "react"
import NailPageAddQuickly from "./add-editClients/NailPageAddQuickly"
import NailPageEdit from "./add-editClients/NailPageEdit"
import { useNavigate, useParams } from "react-router-dom"
import { LoginContext } from "../useContext"
import useShow from "./hooks/show"


export default function NailPageForm(props) {
   let accept = useContext(LoginContext)
   let router = useNavigate()
   let click = (e) => {
      if (props.client.name != 'noClients') {
         accept.setMainPage(false)
         return router(`/nail/${props.client.id}`, { state: { client: props.client, clients: props.clientsBase, clientCoords: window.pageYOffset } })
      }
   }
   let date = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
   }
   let month = ''
   for (let item in date) {
      if (item == props.client.date.getMonth()) {
         month = date[item]
      }
   }

   let [showAdd, setShowAdd] = useShow(false)
   let [edit, setEdit] = useShow(false)


   return (
      <div className="nail__form__wrapper">
         <div className="nail__form__container">
            <div onClick={click} className="nail__form__block">
               <div className="nail__form__content">
                  <div className="nail__form__title">title: {props.client.name}</div>
                  <div className="nail__form__price">price: {props.client.price}</div>
                  <div className="nail__form__date">date: {month} {props.client.date.getDate()} {props.client.date.getFullYear()}</div>
               </div>
               <div onClick={(e) => e.stopPropagation()} className="nail__form__options">
                  <div className="nail__form__options__changes">
                     <div className="nail__form__options__edit">
                        <button onClick={() => setEdit(true)}>Edit</button>
                        {edit && <NailPageEdit Edit={props.Edit} clientsBase={props.clientsBase} client={props.client} setEdit={setEdit} />}
                     </div>
                     <div onClick={() => props.remove(props.client.id)} className="nail__form__options__remove">
                        <button>X</button>
                     </div>
                  </div>
                  <div className="nail__form__options__addClient">
                     <button onClick={() => setShowAdd(true)}>Add</button>
                     {showAdd && <NailPageAddQuickly addClient={props.addClient} clientsBase={props.clientsBase} client={props.client} setShowAdd={setShowAdd} />}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}