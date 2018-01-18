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

const analogSlottedInstruments = [
  
    {instrument:null,
    slotNumber:'slot1'},
    {instrument:null,
    slotNumber:'slot2'},
    {instrument:null,
    slotNumber:'slot3'},
    {instrument:null,
    slotNumber:'slot4'},
    {instrument:null,
    slotNumber:'slot5'},
    {instrument:null,
    slotNumber:'slot6'},
    {instrument:null,
    slotNumber:'slot7'},
    {instrument:null,
    slotNumber:'slot8'},
    {instrument:null,
    slotNumber:'slot9'},
    {instrument:null,
    slotNumber:'slot10'},
    {instrument:null,
    slotNumber:'slot11'},
    {instrument:null,
    slotNumber:'slot12'}
    ] //testing purposes


    const digitalSlottedInstruments = [
  
      {instrument:null,
      slotNumber:'slot1'},
      {instrument:null,
      slotNumber:'slot2'},
      {instrument:null,
      slotNumber:'slot3'},
      {instrument:null,
      slotNumber:'slot4'},
      {instrument:null,
      slotNumber:'slot5'}
      ] //testing purposes
module.exports = {
  instruments,
  analogSlottedInstruments,
  digitalSlottedInstruments

}