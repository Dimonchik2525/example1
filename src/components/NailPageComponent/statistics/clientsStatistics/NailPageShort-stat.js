import { useContext, useEffect, useState } from "react"
import NailPageShortstatFilter from "./NailPageShort-statFilter"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../../../useContext"


export default function (props) {
   let router = useNavigate()
   let accept = useContext(LoginContext)
   let today = new Date()
   today.setHours(0, 0, 0, 0)
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

   let [filter, setFilter] = useState({ option: 'active', newClient: 'dayGap' })
   let [newFilter, setNewFilter] = useState({ dayGap: 15, month: today.getMonth(), year: today.getFullYear() })

   let map = new Map()
   let arr;
   let clientsArray = []
   if (filter.option == 'active') {
      for (let client of props.clients) {
         let arr = props.clients.sort((a, b) => a.date - b.date)
         arr = props.clients.filter((item) => item.name == client.name)
         map.set(client.name, { id: client.id, name: client.name, lastVisit: client.date, visit: arr.length })
      }
      arr = [...map]
      arr = arr.slice(2)
      arr = arr.filter((item) => {
         if (item[1].visit >= 3 && (today - item[1].lastVisit) / 3600000 / 24 < 35) {
            return item
         }
      })
      arr.sort((a, b) => b[1].visit - a[1].visit)
      arr.map((item) => {
         clientsArray.push(<div onClick={() => {
            if (item.name != 'noClients') {
               accept.setMainPage(false)
               return router(`/nail/${item[1].id}`, { state: { client: item[1], clients: props.clients, clientCoords: window.pageYOffset } })
            }
         }} key={item} className="short-stat__active active">
            <div className="short-stat__active__title">{item[0]}</div>
            <div className="short-stat__active__body">
               <div className="short-stat__active__amount"><span>Amount of visits :</span> {item[1].visit.toString()}</div>
               <div className="short-stat__active__last"><span>Last visit :</span> {new Date(item[1].lastVisit).toLocaleDateString('en-CA')}</div>
            </div>
         </div>)
      })
   }
   if (filter.option == 'sleepy') {
      for (let client of props.clients) {
         let arr = props.clients.sort((a, b) => a.date - b.date)
         arr = props.clients.filter((item) => item.name == client.name)
         map.set(client.name, { id: client.id, name: client.name, lastVisit: client.date, visit: arr.length })
      }
      arr = [...map]
      arr = arr.slice(2)
      arr = arr.filter((item) => {
         //sleppy - 50 days
         if (item[1].visit >= 2 && (today - item[1].lastVisit) / 3600000 / 24 > 50) {
            return item
         }
      })
      arr.sort((a, b) => b[1].lastVisit - a[1].lastVisit)
      arr.map((item) => {
         clientsArray.push(<div onClick={() => {
            if (item.name != 'noClients') {
               accept.setMainPage(false)
               return router(`/nail/${item[1].id}`, { state: { client: item[1], clients: props.clients, clientCoords: window.pageYOffset } })
            }
         }} key={item} className="short-stat__active sleepy">
            <div className="short-stat__active__title">{item[0]}</div>
            <div className="short-stat__active__body">
               <div className="short-stat__active__amount"><span>Amount of visits :</span> {item[1].visit.toString()}</div>
               <div className="short-stat__active__last"><span>Last visit :</span> {new Date(item[1].lastVisit).toLocaleDateString('en-CA')}</div>
            </div>
         </div>)
      })
   }
   if (filter.option == 'new') {
      for (let client of props.clients) {
         let arr = props.clients.sort((a, b) => a.date - b.date)
         arr = props.clients.filter((item) => item.name == client.name)
         map.set(client.name, { id: client.id, name: client.name, firstVisit: arr[0].date, visit: arr.length })
      }
      arr = [...map]
      arr = arr.slice(2)
      if (filter.newClient == 'dayGap') {
         arr = arr.filter((item) => {
            if (item[1].visit >= 1 && (today - item[1].firstVisit) / 3600000 / 24 < newFilter.dayGap) {
               return item
            }
         })
         arr.sort((a, b) => a[1].firstVisit - b[1].firstVisit)
         arr.map((item) => {
            clientsArray.push(
               <div key={item} onClick={() => {
                  if (item.name != 'noClients') {
                     accept.setMainPage(false)
                     return router(`/nail/${item[1].id}`, { state: { client: item[1], clients: props.clients, clientCoords: window.pageYOffset } })
                  }
               }} className="short-stat__active new">
                  <div className="short-stat__active__title">{item[0]}</div>
                  <div className="short-stat__active__body">
                     <div className="short-stat__active__last"><span>First visit :</span> {new Date(item[1].firstVisit).toLocaleDateString('en-CA')}</div>
                  </div>
               </div>
            )
         })
      }
      else {
         arr = arr.filter((item) => {
            if (item[1].visit >= 1 && item[1].firstVisit.getMonth() == newFilter.month && item[1].firstVisit.getFullYear() == newFilter.year) {
               return item
            }
         })
         arr.sort((a, b) => a[1].firstVisit - b[1].firstVisit)
         arr.map((item) => {
            clientsArray.push(
               <div onClick={() => {
                  if (item.name != 'noClients') {
                     accept.setMainPage(false)
                     return router(`/nail/${item[1].id}`, { state: { client: item[1], clients: props.clients, clientCoords: window.pageYOffset } })
                  }
               }} key={item} className="short-stat__active new">
                  <div className="short-stat__active__title">{item[0]}</div>
                  <div className="short-stat__active__body">
                     <div className="short-stat__active__last"><span>First visit :</span> {new Date(item[1].firstVisit).toLocaleDateString('en-CA')}</div>
                  </div>
               </div>
            )
         })
      }
   }

   return (
      <div className="short-stat__wrapper">
         <div className="short-stat__content">
            <div className="short-stat__title">Informatin about clients</div>
            <NailPageShortstatFilter newFilter={newFilter} setNewFilter={setNewFilter} filter={filter} setFilter={setFilter} />
            <div className="short-stat__block">
               <div className="short-stat__active__info__title">
                  {filter.option == 'new' && filter.newClient == 'dayGap' ? < p > Amount of {filter.option} clients for <span>{newFilter.dayGap}</span> days : <span>{arr.length}</span> this is {(arr.length / props.clients.length * 100).toFixed(1)}% from entire amounts</p> : ''}
                  {filter.option == 'new' && filter.newClient == 'month' ? < p > Amount of {filter.option} clients for <span>{date[newFilter.month]}</span> : <span>{arr.length}</span> this is {(arr.length / props.clients.length * 100).toFixed(1)}% from entire amounts</p> : ''}
                  {filter.option !== 'new' && <p>Amount of {filter.option} clients : <span>{arr.length}</span> this is {(arr.length / props.clients.length * 100).toFixed(1)}% from entire amounts</p>}
               </div>
               {clientsArray}
            </div>
         </div>
      </div >
   )
}