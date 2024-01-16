import { useContext, useState } from "react"
import NailPageClientFilter from "./NailPageClientFilter"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../../../useContext"


export default function NailPageLeaderBoard(props) {
   let accept = useContext(LoginContext)
   let router = useNavigate()
   let [filter, setFilter] = useState('price')
   let map = new Map()
   for (let client of props.clients) {
      let arr = props.clients.filter((item) => item.name == client.name)
      let sum = arr.reduce((cur, item) => +cur + +item.price, 0)
      map.set(client.name, { id: client.id, name: client.name, date: client.date, visits: arr.length, price: sum })
   }
   let arr = [...map]
   arr = arr.slice(2)
   arr.sort((a, b) => b[1][filter] - a[1][[filter]])
   function top(i) {
      if (i == 0) {
         return "leaderBoard__item__position__gold"
      }
      if (i < 3) {
         return "leaderBoard__item__position__top"
      }
      return "leaderBoard__item__position"
   }
   return (
      <div className="leaderBord__wrapper">
         <div className="leaderBoard__content">
            <div className="leaderBoard__title">LeaderBoard</div>
            <NailPageClientFilter filter={filter} setFilter={setFilter} />
            <div className="leaderBoard__block">
               {arr.splice(0, 10).map((item, i) => {
                  return <div onClick={() => {
                     if (item.name != 'noClients') {
                        accept.setMainPage(false)
                        return router(`/nail/${item[1].id}`, { state: { client: item[1], clients: props.clients, clientCoords: window.pageYOffset } })
                     }
                  }} key={i} className="leaderBoard__item">
                     <div className={top(i)} >
                        {i + 1}
                     </div>
                     <div className="leaderBoard__item__block">
                        <div className="leaderBoard__item__title">
                           <div className="leaderBoard__item__name">{item[0]}</div>
                        </div>
                        <div className="leaderBoard__item__info">
                           <div className="leaderBoard__item__price"><span>Price :</span> {item[1].price}</div>
                           <div className="leaderBoard__item__visit"><span>Visits :</span> {item[1].visits}</div>
                        </div>
                     </div>
                  </div>
               })}
            </div>
         </div>
      </div>
   )
}