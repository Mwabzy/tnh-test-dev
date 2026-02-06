import { useIntlayer } from "react-intlayer"



const ParkingTransport = () => {
    
  return (
    <div className="py-8 ml-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mt-11 w-full flex-col md:flex-row">
          <div className="w-[80%] md:w-[50%]">
            <h1 className="text-4xl font-medium font-serif text-left text-red-900">
              Parking & Transport Services
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              Parking is available 24 hours a day within The Nairobi Hospital grounds.</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Main Visitor Car Park: Located at the Argwings Kodhek Road Main Entrance</li>

                <li>Additional Parking: Multi-level parking near the Outpatient Wing
                </li>
                <li>Security: All parking areas are monitored by hospital security and CCTV</li>
                 </ul>
          </div>

          <div className="flex mr-10 flex-col items-center justify-center w-[90%] md:w-[40%] bg-orange-400 rounded-lg shadow-lg px-6 py-4 text-white mt-8 md:mt-0">
           <div className="w-full max-w-2xl mx-auto ">
      <h2 className="text-2xl font-semibold  mb-4">
        Parking Fees
      </h2>

      <div className="overflow-x-auto rounded-lg ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">Duration</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Cost</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            <tr className="border-t">
              <td className="py-3 px-4">First 30 minutes</td>
              <td className="py-3 px-4">Free</td>
            </tr>
            <tr className="border-t bg-gray-50">
              <td className="py-3 px-4">1 Hour</td>
              <td className="py-3 px-4">KES 100</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">2–4 Hours</td>
              <td className="py-3 px-4">KES 200</td>
            </tr>
            <tr className="border-t bg-gray-50">
              <td className="py-3 px-4">Daily Maximum</td>
              <td className="py-3 px-4 font-semibold">KES 500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
       </div>
        </div>
<div className="w-full mt-16 px-6">
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">


    <h1 className="text-4xl font-serif font-semibold text-red-900 text-center mb-8">
      Directions to The Nairobi Hospital
    </h1>


    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Physical Address
      </h2>
      <ul className="space-y-1 text-gray-700 list-disc list-inside">
        <li>The Nairobi Hospital</li>
        <li>Argwings Kodhek Road, Nairobi, Kenya</li>
      </ul>
    </div>


    <div>
      <h2 className="text-xl font-semibold ml t-gray-900 mb-3">
        Nearby Landmarks
      </h2>
      <ul className="space-y-1 text-gray-700 list-disc list-inside">
        <li>Opposite Hurlingham Shopping Centre</li>
        <li>Near Upper Hill Business District</li>
      </ul>
    </div>

  </div>
</div>

   <div className="max-w-4xl mx-auto mt-12 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">

        <h2 className="text-3xl font-serif font-semibold text-red-900 mb-4">
          Public Transport
        </h2>

        <p className="text-gray-700 mb-6">
          The hospital is easily accessible via public transport.
        </p>

        <ul className="space-y-4 text-gray-700">
          <li>
            <span className="font-semibold text-gray-900">Bus Routes:</span>{" "}
            Several buses operate along Argwings Kodhek Road and Valley Road.
          </li>

          <li>
            <span className="font-semibold text-gray-900">Nearest Bus Stop:</span>{" "}
            Nairobi Hospital Stage (5-minute walk).
          </li>

          <li>
            <span className="font-semibold text-gray-900">Matatus:</span>{" "}
            Available from CBD routes heading toward Hurlingham and Upper Hill.
          </li>

          <li>
            <span className="font-semibold text-gray-900">Train:</span>{" "}
            Nearest railway access is Nairobi Central Station (approx. 15–20 min by taxi).
          </li>
        </ul>

      </div>
    </div>
</div>



  )
}

export default ParkingTransport
