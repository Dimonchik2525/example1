import { useContext, useEffect, useMemo, useState } from "react"
import NailPageHeader from "../components/NailPageComponent/NailPageHeader"
import NailPageMainBlock from "../components/NailPageComponent/NailPageMainBlock"
import NailPageStatistic from "../components/NailPageComponent/statistics/wholeStatistics/NailPageStatistic"
import { MainArray } from "../components/useContext"
import NailPageClientsStat from "../components/NailPageComponent/statistics/clientsStatistics/NailPageClientsStat"


export default function NailPage() {
   let post = useContext(MainArray)
   post.sort((a, b) => a.date - b.date)
   let today = new Date()
   let [clients, setClients] = useState(post)
   let [filter, setFilter] = useState({ year: today.getFullYear(), month: 'all', search: '', date: '', reverse: false, getDate: 15 })
   let [show, setShow] = useState({ start: 0, end: 10 })

   useEffect(() => {
      setClients(clients.sort((a, b) => a.date - b.date))
   }, [clients])

   useEffect(() => {
      if (localStorage.getItem('clients1')) {
         let result = JSON.parse(localStorage.getItem('clients1'))
         result.map((item) => {
            let date = new Date(item.date)
            date.setHours(0, 0, 0, 0)
            item.date = new Date(date)
            return item
         })
         if (result.length > 0) {
            setClients(result)
         }
      }
   }, [])

   useEffect(() => {
      localStorage.setItem('clients1', JSON.stringify(clients))
   }, [clients])
   //console.log(JSON.parse(localStorage.getItem('clients')))
   //localStorage.clear()
   function filterClients() {
      let newArr = []
      for (let item of clients) {
         if (filter.year == 'all' && filter.month == 'all') {
            newArr.push(item)
         }
         if (filter.year == 'all' && item.date.getMonth() == +filter.month) {
            newArr.push(item)
         }
         if (item.date.getFullYear() == filter.year && filter.month == 'all') {
            newArr.push(item)
         }
         if (item.date.getFullYear() == filter.year && item.date.getMonth() == +filter.month) {
            newArr.push(item)
         }
      }
      if (filter.date) {
         let day = new Date(filter.date)
         newArr.map((item, i) => item.date.setHours(0))
         day.setHours(0)
         let example = newArr.filter((item) => (day - item.date) == 0)
         newArr = example
      }
      if (filter.reverse) {
         return newArr.reverse()
      }
      newArr.sort((a, b) => a.date - b.date)
      return newArr
   }
   let searchFilter = useMemo(() => {
      let arr = filterClients()
      let newarr = arr.filter((item) => item.name.toLowerCase().includes(filter.search.toLowerCase()))
      return newarr.slice(show.start, show.end)
   }, [filter, clients, show])

   let searchShow = useMemo(() => {
      let arr = filterClients()
      let newarr = arr.filter((item) => item.name.toLowerCase().includes(filter.search.toLowerCase()))
      return newarr
   }, [filter, clients, show])

   function removeClient(clientID) {
      let arr = clients.filter((item) => item.id != clientID)
      setClients(arr)
   }

   function addClient(client) {
      //console.log(client)
      setClients([...clients, client])
   }

   function Edit(id, client) {
      let arr = clients.filter((item) => item.id != id)
      setClients([...arr, client])
   }
   function getDate() {
      const newArr = clients.slice(); // Clone the clients array

      const filteredArr = newArr.filter((item) => {
         if (item.name !== 'noclients' && (today - item.date) / 3600000 / 24 < filter.getDate) {
            return item;
         }
      });

      const updatedArr = filteredArr.map((item) => {
         const adjustedDate = new Date(item.date.getTime() - item.date.getTimezoneOffset() * 60000);
         // Format the date as "YYYY-MM-DD"
         const formattedDate = adjustedDate.toISOString().split('T')[0];
         // Construct the desired string format
         const dateString = `new Date('${formattedDate}')`;

         return { ...item, date: dateString };
      });

      const stringifiedArr = JSON.stringify(updatedArr);
      return stringifiedArr // Log the modified array with date strings
   }
   return (
      <MainArray.Provider value={{}}>
         <div className="nail__wrapper">
            <NailPageHeader getDate={getDate} addClient={addClient} clients={searchShow} clientsBase={clients} filter={filter} setShow={setShow} setFilter={setFilter}></NailPageHeader>
            <NailPageMainBlock Edit={Edit} addClient={addClient} show={show} setShow={setShow} remove={removeClient} clientsBase={clients} clientsReal={searchShow} clients={searchFilter}></NailPageMainBlock>
            <NailPageStatistic clients={clients} />
            <NailPageClientsStat clients={clients} />
         </div>
      </MainArray.Provider>
   )
}