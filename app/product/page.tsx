// import { useState } from "react";
// import { fetchDashboardData } from '../dashboard/service/DashboardService';
//
// export default function AddProduct() {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [dashboardData, setDashboardData] = useState<any>(null); // State to hold the fetched data
//
//     const handleClick = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await fetchDashboardData();
//             setDashboardData(data); // Set the fetched data to state
//             console.log('Dashboard Data:', data);
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setError(`An error occurred while fetching dashboard data: ${err}`);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="flex py-4 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-lg w-full space-y-8 bg-white shadow-xl rounded-3x p-8">
//                 <h2 className="text-3xl font-extrabold text-center text-gray-900">
//                     Add a New Product
//                 </h2>
//                 <div>
//                     <button
//                         type="button"
//                         className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                         onClick={handleClick}
//                         disabled={loading} // Optional: Disable button during loading
//                     >
//                         {loading ? 'Loading...' : 'Add Product'}
//                     </button>
//                 </div>
//                 {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message display */}
//
//                 {dashboardData && (
//                     <div className="mt-4">
//                         <h3 className="text-xl font-bold">Dashboard Data</h3>
//                         <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(dashboardData, null, 2)}</pre>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
