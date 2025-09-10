import Heading from "@/components/Heading";
import { FC } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import northwing from "@/assets/images/image1.png";

type RoomsAndWardsProps = object;

const RoomsAndWards: FC<RoomsAndWardsProps> = () => {
  return (
    <div>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/rooms_and_wards_8fbeb1073c.jpg"
        style="image"
        title="Rooms and Wards"
        description="Explore our comfortable rooms and wards designed for your comfort and recovery."
      />
      {/* <div className="flex flex-col items-center justify-center my-10"></div> */}
      <div className="p-6 space-y-6 max-w-3/4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  NORTH WING
                </h2>
                <h3> History</h3>
                <p>
                  The North Wing was opened in 1974, containing six en-suite
                  rooms and a dedicated nursing team. Due to its first-class
                  facilities and five-star accommodation, the North Wing was
                  aptly dubbed “The Hilton on the Hill”. In 2012, the Board of
                  Management initiated the redevelopment of the North Wing to
                  meet the high-end care sought by our clients. It now has 12
                  suites, developed to the highest international standards with
                  the goal to exceed the guests’ expectations.
                </p>

                <h3>Amenities and Services </h3>
                <ul className="list-disc list-inside text-lg text-gray-600 mt-6 max-w-3xl">
                  <li>ICU-ready rooms for immediate medical care</li>
                  <li>Dedicated chef providing personalized meals</li>
                  <li>Extensive gourmet menu tailored to dietary needs</li>
                  <li>Luxury toiletry gift pack included</li>
                  <li>Wall-mounted HD TV with cable connection</li>
                  <li>Marble bathroom with euro-style walk-in shower</li>
                  <li>Elegant and comfortable furnishings</li>
                  <li>High-speed internet and direct telephone services</li>
                  <li>24/7 security for peace of mind</li>
                  <li>Mini fridge stocked for convenience</li>
                  <li>Egyptian cotton bed linens for ultimate comfort</li>
                </ul>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                  <h2 className="text-xl font-bold text-red-900 mb-3">
                    SOUTH WING
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    The South Wing is made up of 36 luxurious self-contained
                    rooms in the St. Francis, St. Teresa and St. John’s wards.
                  </p>
                  <h3>Amenities and Services </h3>
                  <ul className="list-disc list-inside text-lg text-gray-600 mt-6 max-w-3xl">
                    <li>Extensive menu with a variety of options</li>
                    <li>High-end toiletry gift pack included</li>
                    <li>Wall-mounted HD TV with cable connection</li>
                    <li>Bathroom with bathtub and shower facilities</li>
                    <li>Elegant and comfortable furnishings</li>
                    <li>Internet and telephone services provided</li>
                  </ul>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                  <h3 className="font-semibold text-lg mt-2 text-red-900">
                    OTHER ROOMS/BED TYPES
                  </h3>
                  <h3 className="font-semibold text-lg mt-2">En-suite Rooms</h3>
                  <span>
                    Stay in a self-contained private room with a Wall-mounted HD
                    TV and cable connection.
                  </span>

                  <h3 className="font-semibold text-lg mt-2">Private Rooms</h3>
                  <span>
                    Patients may choose to stay in a private room with access to
                    a shared washroom facility.
                  </span>
                  <h3 className="font-semibold text-lg mt-2">Ward Bed</h3>
                  <span>
                    Our wards can accommodate up to eight patients with access
                    to shared washroom facilities.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  PAEDIATRIC WING – ST. MARY’S WARD
                </h2>
                <h2>
                  The Paediatric Wing has a variety of rooms, all suited to our
                  guest’s comfort
                </h2>

                <h3 className="font-semibold text-lg mt-2">Deluxe Room</h3>
                <span>These are luxurious self-contained rooms</span>

                <h3 className="font-semibold text-lg mt-2">En-suite Room</h3>
                <span>These are self-contained rooms designed for comfort</span>

                <h3 className="font-semibold text-lg mt-2">Duplex Room</h3>
                <span>This is a self-contained room for two patients</span>

                <h3 className="font-semibold text-lg mt-2">Private Room</h3>
                <span>
                  This is a single room that shares a washroom facility
                </span>

                <h2 className="font-semibold text-lg mt-4">
                  Ammenities & Services:
                </h2>
                <ul className="list-disc list-outside text-lg pl-4 text-gray-600 mt-2 max-w-3xl">
                  <li>Child-friendly menu</li>
                  <li>Wall-mounted HD TV with cable connection</li>
                  <li>Bathroom/Bathtub and shower facilities</li>
                  <li>Children’s indoor play area</li>
                  <li>Fish tank and foosball table</li>
                </ul>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  MATERNITY & LABOUR WARDS
                </h2>
                <h2 className="font-bold text-xl text-red-900 underline decoration-2 mt-2">
                  Labour Ward
                </h2>
                <span>
                  The Labour Ward has been designed for the safety and comfort
                  of expectant mothers with the following options available:
                </span>
                <ul className="list-disc list-outside text-lg pl-4 text-gray-600 mt-2 max-w-3xl">
                  <li>12 ward beds with shared washroom facilities</li>
                  <li>4 private rooms with shared washroom facilities</li>
                  <li>4 en-suite rooms (self-contained)</li>
                </ul>

                <h3 className="font-semibold text-lg mt-2">
                  Ammenities & Services
                </h3>
                <ul className="list-disc list-outside text-lg pl-4 text-gray-600 mt-2 max-w-3xl">
                  <li>2 labour rooms</li>
                  <li>1 labour theatre</li>
                  <li>A wall-mounted HD TV with cable connection</li>
                </ul>

                <h2 className="font-bold text-xl text-red-900 underline decoration-2 mt-2">
                  Maternity Ward
                </h2>
                <span>
                  The Maternity Ward has the following options available for our
                  guests:
                </span>
                <ul className="list-disc list-outside text-lg pl-4 text-gray-600 mt-2 max-w-3xl">
                  <li>4 en-suite rooms (self-contained)</li>
                  <li>18 ward beds with shared washroom facilities</li>
                </ul>

                <h3 className="font-semibold text-lg mt-2">
                  Amenities & Services
                </h3>
                <ul className="list-disc list-outside text-lg pl-4 text-gray-600 mt-2 max-w-3xl">
                  <li>Lactation room</li>
                  <li>Main Nursery</li>
                </ul>

                <h3 className="font-semibold text-lg mt-2">Private Room</h3>
                <span>
                  This is a single room that shares a washroom facility
                </span>

                <h2 className="font-semibold text-lg mt-4">
                  Ammenities & Services:
                </h2>
                <ul className="list-disc list-outside text-lg pl-4 text-gray-600 mt-2 max-w-3xl">
                  <li>Child-friendly menu</li>
                  <li>Wall-mounted HD TV with cable connection</li>
                  <li>Bathroom/Bathtub and shower facilities</li>
                  <li>Children’s indoor play area</li>
                  <li>Fish tank and foosball table</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center mt-5">
              <img
                src={northwing}
                alt=""
                className="max-h-[60vh] object-cover rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="bg-red-50 shadow-xl rounded-2xl p-6 border  border-red-200">
              <div className="flex flex-col space-y-2 items-start text-lg">
                <h2 className="text-center text-lg font-semibold mb-3">
                  Have Additional Questions?
                </h2>

                <span className="flex items-center justify-center gap-2">
                  <Phone
                    className="h-5 w-5 text-red-900"
                    aria-label="Phone icon"
                  />{" "}
                  <a href="tel:+254 703082000">+254 703082000</a>
                </span>
                <span className="flex items-center justify-center gap-2">
                  <Mail
                    className="h-5 w-5 text-red-900"
                    aria-label="Mail icon"
                  />
                  <a href="mailto: hosp@nbihosp.org"> hosp@nbihosp.org</a>
                </span>
                <span className="flex items-center justify-center gap-2">
                  <MapPin
                    className="h-5 w-5 text-red-900 space-x-2"
                    aria-label="Location icon"
                  />{" "}
                  Argwings Kodhek Road, Nairobi
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="bg-white  rounded-2xl p-5 border border-gray-200 w-full md:w-2/3">
                <h2 className="text-xl font-bold text-red-900 mb-3 text-center">
                  Visiting Hours
                </h2>
                <p className="text-gray-700 text-center">
                  2.00pm – 4.00pm: One visitor per patient.
                </p>
                <p className="text-gray-700 text-center">
                  *Children under 12 years are not allowed in the wards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsAndWards;
