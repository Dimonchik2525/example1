


export default function NailPAgeMiniStat(props) {

   let priceAmount = 0;
   let clientsAmount = 0
   let workDay = new Set()

   for (let item of props.clients) {
      workDay.add(item.date.toString())
      if (item.name != 'noClients') {
         clientsAmount += 1;
      }
      priceAmount += +item.price
   }
   return (
      <div className="stat__wrapper">
         <div className="stat__content">
            <div className="stat__amount">
               <div className="stat__amount__title">Total Amount:</div>
               <div className="stat__amount__value">{priceAmount}</div>
            </div>
            <div className="stat__clientsAmount">
               <div className="stat__clientsAmount__title">Clients amount:</div>
               <div className="stat__clientsAmount__value">{clientsAmount}</div>
            </div>
            <div className="stat__workDays">
               <div className="stat__workDays__title">Work days:</div>

               <div className="stat__workDays__value">{workDay.size}</div>
            </div>
            <div className="stat__average-price">
               <div className="stat__average-price__title">Average price:</div>
               <div className="stat__average-price__value">{+(priceAmount / workDay.size).toFixed(2) || 0}</div>
            </div>
         </div>
      </div>
   )
}