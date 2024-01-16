import { useState } from "react"
import NailPageAdd from "./add-editClients/NailPageAdd"
import NailPAgeFilter from "./NailPageFilter"
import NailPAgeMiniStat from "./NailPageMiniStat"
import useShow from "./hooks/show"


export default function NailPageHeader(props) {
   let [showAdd, setShowAdd] = useShow(false)
   function copyToClipboard(text) {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');

      // Set the value of the textarea to the text you want to copy
      textarea.value = text;

      // Append the textarea to the document
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Execute the "copy" command to copy the selected text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea from the document
      document.body.removeChild(textarea);
   }
   return (
      <div className="nail__header__wrapper">
         <div className="nail__header__container">
            <div className="nail__header__content">
               <div className="nail__header__options">
                  <div className='nail__header__addClient' onClick={() => setShowAdd(true)}>
                     <button>Add client</button>
                  </div>
                  <div className='nail__header__copyInfo' >
                     <button onClick={() => {
                        const copiedString = props.getDate(); // Assuming props.getDate() returns the string
                        copyToClipboard(copiedString);
                     }}>get Info for</button>
                     <input onClick={(e) => e.stopPropagation()} onChange={(e) => props.setFilter({ ...props.filter, getDate: e.target.value })} value={props.filter.getDate} type="number" />
                  </div>
               </div>
               <div className="nail__header__filterStat">
                  <div className='nail__header__filter'>
                     <NailPAgeFilter filter={props.filter} setShow={props.setShow} setFilter={props.setFilter} />
                  </div>
                  <div className="nail__header__miniStat">
                     <NailPAgeMiniStat clients={props.clients} />
                  </div>
               </div>
               {showAdd && <NailPageAdd addClient={props.addClient} clients={props.clientsBase} showAdd={showAdd} setShowAdd={setShowAdd} />}
            </div>
         </div>
      </div>
   )
}