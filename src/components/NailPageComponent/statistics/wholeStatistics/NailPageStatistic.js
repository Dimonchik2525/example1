import React, { useCallback, useState } from "react";
import NailPageDiagram from "./NailPAgeDiagram";
import NailPageClientsStat from "../clientsStatistics/NailPageClientsStat";


export default React.memo(function NailPageStatistic(props) {

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
   let [year, setYear] = useState('2023')
   let bars = [{ price: [] }, { clientsAmount: [] }, { averagePrice: [] }]
   //for price
   for (let item in date) {
      let price = 0
      //run of client array to find a price
      for (let client of props.clients) {
         if (client.date.getMonth() == date[item] && client.date.getFullYear() == year) {
            price += +client.price
         }
      }
      let procent = price * 100 / 3500
      bars[0].price.push(
         <div key={date[item]} className="diagram__bar">
            <div className="diagram__bar__price">{price}</div>
            <div className="diagram__bar__empty">
               <div style={{ height: procent + '%' }} className="diagram__bar__empty__red"></div>
            </div>
            <div className="diagram__bar__month">{item}</div>
         </div>
      )
   }
   //for clientsAmount
   for (let item in date) {
      //run of client array to find an amount of clients
      let amount = props.clients.filter((client) => client.date.getMonth() == date[item] && client.date.getFullYear() == year && client.name != 'noClients')
      let procent = amount.length * 100 / 100
      bars[1].clientsAmount.push(
         <div key={date[item]} className="diagram__bar">
            <div className="diagram__bar__price">{amount.length}</div>
            <div className="diagram__bar__empty">
               <div style={{ height: procent + '%' }} className="diagram__bar__empty__red"></div>
            </div>
            <div className="diagram__bar__month">{item}</div>
         </div>
      )
   }
   //for average price
   for (let item in date) {
      let price = 0
      let workDay = new Set()
      //run of client array to find a price for month
      for (let client of props.clients) {
         if (client.date.getMonth() == date[item] && client.date.getFullYear() == year) {
            price += +client.price
         }
      }
      //run of client array to find a work days
      for (let day of props.clients) {
         if (day.date.getMonth() == date[item] && day.date.getFullYear() == year) {
            workDay.add(day.date.toString())
         }
      }
      let procent = +(price / workDay.size).toFixed(1) || 0

      bars[2].averagePrice.push(
         <div key={date[item]} className="diagram__bar">
            <div className="diagram__bar__price">{procent || 0}</div>
            <div className="diagram__bar__empty">
               <div style={{ height: procent * 100 / 170 + '%' }} className="diagram__bar__empty__red"></div>
            </div>
            <div className="diagram__bar__month">{item}</div>
         </div>
      )
   }
   return (
      <div className="statistic__wrapper">
         <div className="statictic__container">
            <div className="statistic__content">
               <div className="statistic__filter">
                  <div className="statistic__filter__year">
                     <div className="statistic__filter__year__title">Choose year</div>
                     <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                     </select>
                  </div>
               </div>
               <NailPageDiagram bars={bars} />
            </div>
         </div>
      </div>
   )
})