// import React from 'react'
// import { 
//   TrendingUp, 
//   Users, 
//   DollarSign, 
//   Star, 
//   Fuel, 
//   MapPin, 
//   Target,
//   BarChart3,
//   PieChart,
//   Activity,
//   Award,
//   ChevronRight
// } from 'lucide-react'
// function OutletDetailsModal() {
//   return (
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <Users className="h-6 w-6 text-gray-600" />
//             Outlet Performance Details
//           </h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Outlet Details
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Metrics
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Performance
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Rating
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {outlets.map((outlet) => {
//                 const performance = getPerformanceCategory(outlet.id)
//                 const metrics = calculateMetrics(outlet.id)
//                 const performancePercentage = metrics ? metrics.performancePercentage.toFixed(1) : '0.0'
                
//                 return (
//                   <tr key={outlet.id} className="hover:bg-gray-50 transition-colors duration-150 group">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className={`p-2 rounded-lg ${
//                           outlet.type === 'highway' ? 'bg-green-100 text-green-600' :
//                           outlet.type === 'urban' ? 'bg-purple-100 text-purple-600' :
//                           'bg-orange-100 text-orange-600'
//                         }`}>
//                           <MapPin className="h-4 w-4" />
//                         </div>
//                         <div>
//                           <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                             {outlet.name}
//                           </div>
//                           <div className="text-sm text-gray-500 flex items-center gap-1">
//                             <MapPin className="h-3 w-3" />
//                             {outlet.location}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 font-medium">{outlet.sales.toLocaleString()}L</div>
//                       <div className="text-sm text-gray-500">of {outlet.target.toLocaleString()}L target</div>
//                       <div className="text-xs text-gray-400 mt-1">{performancePercentage}% achieved</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="flex-1 bg-gray-200 rounded-full h-2">
//                           <div 
//                             className={`h-2 rounded-full ${
//                               performance === 'exceeding' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
//                               performance === 'meeting' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
//                               performance === 'average' ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
//                               'bg-gradient-to-r from-red-500 to-pink-600'
//                             }`}
//                             style={{ width: `${Math.min(100, performancePercentage)}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-medium text-gray-700">{performancePercentage}%</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <Star className={`h-4 w-4 ${
//                           outlet.customerSatisfaction >= 4.5 ? 'text-yellow-500 fill-yellow-500' :
//                           outlet.customerSatisfaction >= 4 ? 'text-yellow-400 fill-yellow-400' :
//                           outlet.customerSatisfaction >= 3.5 ? 'text-yellow-300 fill-yellow-300' :
//                           'text-gray-300'
//                         }`} />
//                         <span className="text-sm font-medium text-gray-700">{outlet.customerSatisfaction}</span>
//                         <span className="text-xs text-gray-500">/5</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center justify-between">
//                         <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${performanceColors[performance]}`}>
//                           {performanceLabels[performance]}
//                         </span>
//                         <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//   )
// }

// export default OutletDetailsModal