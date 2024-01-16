import { useEffect, useState } from "react"


export default function NailPageShortstatFilter(props) {
   let today = new Date()
   let arr = [
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
   let [selectMonth, setSelectMonth] = useState('January')
   let [showSelect, setShowSelect] = useState(false)
   useEffect(() => {
      function handler2() {
         if (showSelect) {
            setShowSelect(!showSelect)
         }
      }
      document.documentElement.addEventListener('click', handler2)
      return () => {
         return document.documentElement.removeEventListener('click', handler2)
      }
   }, [showSelect])
   return (
      <div className="client__filter__wrapper">
         <div className="client__filter__content">
            <div className="client__filter__content__block">
               <div onClick={(e) => props.setFilter({ ...props.filter, option: 'active' })} className={props.filter.option == 'active' ? "client__filter__active current" : "client__filter__active"}>
                  Active
               </div>
               <div onClick={(e) => props.setFilter({ ...props.filter, option: 'sleepy' })} className={props.filter.option == 'sleepy' ? "client__filter__active current" : "client__filter__active"}>
                  Sleppy
               </div>
               <div onClick={(e) => props.setFilter({ ...props.filter, option: 'new' })} className={props.filter.option == 'new' ? "client__filter__active current" : "client__filter__active"}>
                  New
               </div>
            </div>
            {props.filter.option == 'new' ?
               <div>
                  <select className="client__filter__new" onChange={(e) => props.setFilter({ ...props.filter, newClient: e.target.value })} value={props.filter.newClient}>
                     <option value="month">by months</option>
                     <option value="dayGap">by dayGap</option>
                  </select>
                  {props.filter.newClient == 'dayGap'
                     ?
                     <input className="client__filter__dayGap" onChange={(e) => props.setNewFilter({ ...props.newFilter, dayGap: e.target.value })} value={props.newFilter.dayGap} style={{ backgroundColor: 'red' }} type="number" />
                     :
                     <div className="client__filter__month">
                        <div onClick={(e) => {
                           e.stopPropagation()
                           setShowSelect(!showSelect)
                        }} style={!showSelect ? { overflow: 'hidden' } : {}} className="client__filter__month__select">
                           <ul >
                              <li onClick={() => {
                                 setShowSelect(false)
                              }}>{selectMonth}</li>
                              {showSelect
                                 ?
                                 arr.map((item, i) => {
                                    if (item != selectMonth) {
                                       return <li key={i} onClick={() => {
                                          props.setNewFilter({ ...props.newFilter, month: date[item] })
                                          setSelectMonth(item)
                                          setShowSelect(false)
                                       }}>{item}</li>
                                    }
                                 })
                                 :
                                 ''}
                           </ul>
                        </div>
                        <select className="client__filter__year" onChange={(e) => props.setNewFilter({ ...props.newFilter, year: e.target.value })} value={props.newFilter.year}>
                           <option value="2023">2023</option>
                           <option value="2024">2024</option>
                        </select>
                     </div>
                  }
               </div>
               : ''
            }
         </div>
      </div>
   )
}