import { useIntlayer } from "react-intlayer";

const ParkingTransport = () => {
  const content = useIntlayer("parkingTransport");

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 w-full">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-medium font-serif text-red-900 mb-4">
            {content.pageTitle}
          </h1>

          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            {content.parkingDescription}
          </p>

          <ul className="list-disc list-inside text-gray-600 mt-2">
      {content.parkingList.map((item, i) => (
  <li key={i}>{item}</li>
))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-2/5 bg-yellow-500 rounded-lg shadow-lg px-6 py-4 text-white mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">{content.parkingFees.title}</h2>
          <div className="overflow-x-auto rounded-lg w-full">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-yellow-400 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Duration</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {content.parkingFees.table.map((row: any, i: number) => (
                  <tr key={i} className={i % 2 === 0 ? "border-t" : "border-t bg-gray-50"}>
                    <td className="py-3 px-4">{row.duration}</td>
                    <td className="py-3 px-4">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h1 className="text-4xl font-serif font-semibold text-red-900 mb-8">
            {content.directionsTitle}
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {content.physicalAddressTitle}
            </h2>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              {content.physicalAddressList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}

            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {content.nearbyLandmarksTitle}
            </h2>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              {content.nearbyLandmarksList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-serif font-semibold text-red-900 mb-4">
            {content.publicTransportTitle}
          </h2>

          <p className="text-gray-700 mb-6">{content.publicTransportDescription}</p>

          <ul className="space-y-4 text-gray-700">
            {content.publicTransportList.map((item: any, i: number) => (
              <li key={i}>
                <span className="font-semibold text-gray-900">{item.label} </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParkingTransport;
