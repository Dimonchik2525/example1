import { useEffect, useState } from "react"


export default function NailPAgeFilter(props) {

   let [selectMonth, setSelectMonth] = useState('all')
   let [showSelect, setShowSelect] = useState(false)
   let arr = [
      'all',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]
   let date = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11,
   }
   useEffect(() => {
      function handler() {
         if (showSelect) {
            setShowSelect(!showSelect)
         }
      }
      document.documentElement.addEventListener('click', handler)
      return () => {
         return document.documentElement.removeEventListener('click', handler)
      }
   }, [showSelect])
   return (
      <div className="filter__wrapper">
         <div className="filter__date">
            <div className="filter__year">
               <select value={props.filter.year} onChange={(e) => {
                  props.setFilter({ ...props.filter, year: e.target.value })
                  props.setShow({ start: 0, end: 10 })
               }}>
                  <option value="all">all years</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
               </select>
            </div>
            <div onClick={(e) => {
               e.stopPropagation()
               setShowSelect(!showSelect)
            }} style={!showSelect ? { overflow: 'hidden' } : {}} className="filter__month">
               <ul >
                  <li onClick={() => {
                     setShowSelect(false)
                  }}>{setShowSelect ? selectMonth : 'all'}</li>
                  {showSelect
                     ?
                     arr.map((item, i) => {
                        if (item != selectMonth) {
                           return <li key={i} onClick={() => {
                              props.setFilter({ ...props.filter, month: date[item] == undefined ? 'all' : date[item] })
                              props.setShow({ start: 0, end: 10 })
                              setSelectMonth(item)
                              setShowSelect(false)
                           }}>{item}</li>
                        }
                     })
                     :
                     ''}
               </ul>
            </div>
            <div className="filter__day">
               <input type="date" value={props.filter.date} onChange={(e) => {
                  props.setFilter({ ...props.filter, date: e.target.value })
                  props.setShow({ start: 0, end: 10 })
               }} />
            </div>
         </div>
         <div className="filter__options">
            <div className="filter__search">
               <input type="text" value={props.filter.search} onChange={(e) => {
                  props.setFilter({ ...props.filter, search: e.target.value })
                  props.setShow({ start: 0, end: 10 })
               }} placeholder="name" />
            </div>
            <div className="filter__reverse">
               {!props.filter.reverse
                  ?
                  <div onClick={() => props.setFilter({ ...props.filter, reverse: true })} className="filter__reverse__false">
                     <img className="filter__reverse__false__img" src="https://static.thenounproject.com/png/563195-200.png" alt="" />
                     <p>from old to newest</p>
                  </div>
                  :
                  <div onClick={() => props.setFilter({ ...props.filter, reverse: false })} className="filter__reverse__true">
                     <img className="filter__reverse__false__img" src="https://static.thenounproject.com/png/563195-200.png" alt="" />
                     <p>from newest to ald</p>
                  </div>}
            </div>
         </div>

      </div>
   )
}