

export default function NailPageClientFilter(props) {
   return (
      <div className="client__filter__wrapper">
         <div className="client__filter__content">
            <select onChange={(e) => props.setFilter(e.target.value)} value={props.filter} >
               <option value="price">Price</option>
               <option value="visits">Visits</option>
            </select>
         </div>
      </div>
   )
}