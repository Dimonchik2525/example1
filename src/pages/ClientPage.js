import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoginContext } from "../components/useContext"


export default function ClientPage(props) {
   let router = useNavigate()
   let accept = useContext(LoginContext)

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
   let location = useLocation()
   let client = location.state.client
   let clients = location.state.clients
   let coords = location.state.clientCoords
   //console.log(coords)

   let today = new Date()
   today.setHours(0, 0, 0, 0)
   let sortedByVisits;
   let sortedByPrice;
   let totalPrice;
   let totalVisits;
   let status;
   let firstVisit;
   let lastVisit;

   let map = new Map()
   for (let client of clients) {
      let arr = clients.sort((a, b) => a.date - b.date)
      arr = clients.filter((item) => item.name == client.name)
      let sum = arr.reduce((cur, item) => +cur + +item.price, 0)
      map.set(client.name, { firstVisit: arr[0].date, lastVisit: client.date, visits: arr.length, price: sum })
   }
   let arr = [...map]
   arr = arr.slice(2)
   arr.sort((a, b) => b[1].visits - a[1].visits).filter((item, i) => {
      if (item[0] == client.name) {
         status = 'no status'
         if (item[1].visits >= 3 && (today - item[1].lastVisit) / 3600000 / 24 < 35) {
            status = 'active'
         }
         else if (item[1].visits >= 2 && (today - item[1].lastVisit) / 3600000 / 24 > 50) {
            status = 'sleppy'
         }
         else if (item[1].visits >= 1 && (today - item[1].firstVisit) / 3600000 / 24 < 15) {
            status = 'new'
         }
         firstVisit = item[1].firstVisit
         lastVisit = item[1].lastVisit
         totalVisits = item[1].visits
         totalPrice = item[1].price
         sortedByVisits = i + 1
      }
   })
   arr.sort((a, b) => b[1].price - a[1].price).filter((item, i) => {
      if (item[0] == client.name) {
         sortedByPrice = i + 1
      }
   })
   function click() {
      accept.setMainPage(true)
      router('/nail')
      //console.log(coords)
      setTimeout(() => {
         window.scrollTo({
            top: coords,
            left: 0,
            behavior: "smooth"
         });
      }, 0)
      window.scrollTo(0, coords)
      //console.log(window.pageYOffset)
   }
   return (
      <div className="client__wrapper">
         <div className="client__container">
            {client.name == 'noName' ?
               <div style={{ fontSize: '30px', color: 'red', fontWeight: '900', textAlign: 'center' }} className="client__content">
                  Sorry, theres no information about noName clients
               </div> :
               <div className="client__content">
                  <div className="client__title">Information about <span>{client.name}</span></div>
                  <div className="client__block">
                     <div className="client__block__status">Status : <span>{status}</span></div>
                     <div className="client__block__price">Total price: <span>{totalPrice}</span></div>
                     <div className="client__block__visits">Amount of visits : <span>{totalVisits}</span></div>
                     <div className="client__block__firstVisit">First visit : <span>{firstVisit.getFullYear()} {firstVisit.getDate()} {date[firstVisit.getMonth()]}</span></div>
                     <div className="client__block__lastVisit">Last visit : <span>{lastVisit.getFullYear()} {lastVisit.getDate()} {date[lastVisit.getMonth()]}</span></div>
                     <div className="client__block__leaderBoard">
                        <div className="client__block__leaderBoard__price">
                           position in leaderBoard (by price) <span>{sortedByPrice}</span>
                        </div>
                        <div className="client__block__leaderBoard__visits">
                           position in leaderBoard (by visits) <span>{sortedByVisits}</span>
                        </div>
                     </div>
                  </div>
               </div>
            }
            <div onClick={click} className="back">
               <div >Back</div>
            </div>
         </div>
      </div>
   )
}