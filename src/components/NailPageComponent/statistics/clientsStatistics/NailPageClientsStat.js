import { useState } from "react";
import NailPageClientFilter from "./NailPageClientFilter";
import NailPageLeaderBoard from "./NailPageLeaderBoard";
import NailPageShortStat from "./NailPageShort-stat";


export default function NailPageClientsStat(props) {

   return (
      <div className="clients__wrapper">
         <div className="clients__container">
            <div className="clients__content">
               <div className="clients__block">
                  <div className="clients__title">Clients`s statistics</div>
                  <div className="clients__leaderBoard">
                     <NailPageLeaderBoard clients={props.clients} />
                  </div>
                  <div className="clients__short-stat">
                     <NailPageShortStat clients={props.clients} />
                  </div>
                  <div className="clients__complete-stat"></div>
               </div>
            </div>
         </div>
      </div>
   )
}