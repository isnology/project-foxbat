// name: { type: String },
// brand: { type: String },
// model: { type: String },
// partNo: { type: String },
// text: { type: String },
// pictureUrl: { type: String },
// price: { type: Number },
// size: { type: String },
// instrumentClass: 

const instruments = [
  {
    name: "Alti 1000",
    brand: "Falcon",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "3.125",
    instrumentClass: "Altimeter"
  },
  {
    name: "Alti2000",
    brand: "Falcon",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Altimeter"
  },
  {
    name: "Alti5000",
    brand: "IMB",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Altimeter"
  },
  {
    name: "Alti5000-a",
    brand: "IMB",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 1000.00,
    size: "",
    instrumentClass: "Altimeter"
  },
  {
    name: "Alti1000",
    brand: "IMB",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 10.00,
    size: "",
    instrumentClass: "Altimeter"
  },
  {
    name: "Heightometer",
    brand: "Swit",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Altimeter"
  },
  {
    name: "SuperUppyTron",
    brand: "Swift",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Altimeter"
  },
  {
    name: "Pewpewsofast!",
    brand: "Falcon",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "Fastometer",
    brand: "Falcon",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "FalconSpeed",
    brand: "Falcon",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "Speedo for Ido",
    brand: "IMB",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "Whoosh Gauge",
    brand: "IMB",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "ThrottleUp!",
    brand: "IMB",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "Swifty's swift",
    brand: "Swift",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 100.00,
    size: "",
    instrumentClass: "Airspeed"
  },
  {
    name: "SuperAccurometer",
    brand: "Swift",
    model: "",
    partNo: "",
    text: "",
    pictureUrl: "",
    price: 1000.00,
    size: "",
    instrumentClass: "Airspeed"
  }
]

const instrumentsType = 
[
  {_id: 1, title: "Altimeter"}, 
  {_id: 2, title: "Air speed"}, 
  {_id: 3, title: "Compass"}, 
  {_id: 4, title: "Engine gauges"}, 
  {_id: 5, title: "Time"}
]

const instrumentsBrand = 
[
  {_id: 1, title: "IMB"}, 
  {_id: 2, title: "Falcon"}, 
  {_id: 3, title: "IMB"}, 
  {_id: 4, title: "Falcon"}, 
  {_id: 5, title: "IMB"}, 
  {_id: 6, title: "Falcon"}
]

const instrumentsModel = 
[
  {_id: 1, title: "Alti1000"}, 
  {_id: 2, title: "Climonometer"}, 
  {_id: 3, title: "Alti3000"}, 
  {_id: 4, title: "Speedy Joe 10"}, 
  {_id: 5, title: "Hello Nath"}, 
  {_id: 6, title: "Climonometer"}
]

module.exports = {
  instruments,
  instrumentsType,
  instrumentsBrand,
  instrumentsModel
}