
export default function NailPageDiagram(props) {

   return (
      <div className="diagram__wrapper">
         <div className="diagram__content">
            <div className="diagram__bars__price">
               <div className="diagram__bars__price__title">Price</div>
               <div className="diagram__bars">
                  {props.bars[0].price}
               </div>
            </div>
            <div className="diagram__bars__amount">
               <div className="diagram__bars__amount__title">Amount of clients</div>
               <div className="diagram__bars">
                  {props.bars[1].clientsAmount}
               </div>
            </div>
            <div className="diagram__bars__averagePrice">
               <div className="diagram__bars__averagePrice__title">Average Price</div>
               <div className="diagram__bars">
                  {props.bars[2].averagePrice}
               </div>
            </div>
         </div>
      </div>
   )
} 