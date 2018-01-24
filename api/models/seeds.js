if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Template = require('./Template')
const Instrument = require('./Instrument')
const InstrumentClass = require('./InstrumentClass')


InstrumentClass.create([
  { name: 'Altimeter' }
])
.then((altimeter) => {
  console.log('Created instrumentClass', altimeter)
  Instrument.create([
    {
      name: 'Altimeter',
      brand: 'UMA Inc.',
      model: '',
      partNo: '10-22965',
      text: 'http://www.umainstruments.com/Altimeter.htm',
      price: 17550,
      size: 'L',
      pictureURL: 'http://www.umainstruments.com/images/Altimeter/3altimeter.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Altimeter and Barometer 3 1/8 INCH / 9-30 VDC',
      brand: 'Swift',
      model: 'ALT3-10M2',
      partNo: '10-06288',
      text: 'https://www.aircraftspruce.com/catalog/inpages/swiftaltimeter10-06256.php',
      price: 33671,
      size: 'L',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-06256a.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Altimeter and Barometer 2 1/4 INCH / 9-30 VDC',
      brand: 'Swift',
      model: 'ALT2-10F1',
      partNo: '10-06284',
      text: 'https://www.aircraftspruce.com/catalog/inpages/swiftaltimeter2.5.php',
      price: 16185,
      size: 'M',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-06283a.JPG',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Radient Multi-function Instrument',
      brand: 'Belite',
      model: '',
      partNo: '10-06258',
      text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
      price: 27595,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Altimeter',
      brand: 'UMA Inc.',
      model: '1',
      partNo: '10-05125',
      text: 'https://www.aircraftspruce.com/catalog/inpages/UMA_altimeters2.php',
      price: 23586,
      size: 'L',
      pictureURL: 'https://www.aircraftspruce.com/catalog/graphics/10-22965.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Radient Multi-function Instrument',
      brand: 'Belite',
      model: '',
      partNo: '10-06260',
      text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
      price: 27595,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Radient Multi-function Instrument',
      brand: 'Belite',
      model: '',
      partNo: '10-06259',
      text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
      price: 27595,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Radient Multi-function Instrument',
      brand: 'Belite',
      model: '',
      partNo: '10-06261',
      text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
      price: 27595,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: '3-1/8 Gauge Non-sensitive Altimeter',
      brand: 'Falcon',
      model: '',
      partNo: '10-02252',
      text: 'https://www.aircraftspruce.com/catalog/inpages/falconlightaltimeter.php',
      price: 21500,
      size: 'L',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-05100m.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: '3-1/8 Sensitive Altimeter',
      brand: 'Falcon',
      model: '',
      partNo: '10-02259',
      text: 'http://www.aircraftspruce.com/catalog/inpages/alt201inf-3n.php',
      price: 47900,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-02259.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: '2-1/4 Gauge Sensitive Altimeter',
      brand: 'Falcon',
      model: '',
      partNo: '10-04071',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falcon214sensitive.php',
      price: 22500,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02205m.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: '3-1/8 Non-sensitive Altimeter',
      brand: 'Swift',
      model: '',
      partNo: '10-05365',
      text: 'http://www.aircraftspruce.com/catalog/inpages/ssp-lightaltimeter.php',
      price: 22095,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-05100m.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Altimeter',
      brand: 'UMA Inc.',
      model: '2',
      partNo: '10-05125',
      text: 'http://www.aircraftspruce.com/catalog/inpages/UMA_altimeters2.php',
      price: 19575,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-22965.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: 'Altimeter',
      brand: 'UMA Inc.',
      model: '',
      partNo: '10-05133',
      text: 'http://www.aircraftspruce.com/catalog/inpages/UMA_altimeters2.php',
      price: 36600,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-22965.jpg',
      instrumentClass_id: altimeter[0]._id
    },
    {
      name: '2-1/4 INCH Altimeter',
      brand: 'Winter',
      model: '',
      partNo: '10-05634',
      text: 'http://www.aircraftspruce.com/catalog/inpages/microminialt.php',
      price: 46200,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05634.jpg',
      instrumentClass_id: altimeter[0]._id
    }
  ])
  .then(() => {
    console.log('Created altimeter instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})



InstrumentClass.create([
  { name: 'Air Speed' }
])
.then((airSpeedIndicator) => {
  console.log('Created instrumentClass', airSpeedIndicator)
  Instrument.create([
    {
      name: 'ASI / VSI 2.25 INCH Round Bezel 35-135 MPH',
      brand: 'Belite',
      model: '',
      partNo: '10-04683',
      text: 'http://www.aircraftspruce.com/catalog/inpages/belitedual3.php',
      price: 18995,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-04683x.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Airspeed Indicator 0-120 MPH',
      brand: 'Falcon',
      model: '',
      partNo: '10-02915',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi120m-3.php',
      price: 18995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02915.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Dual Dial Airspeed Indicator 20-160 MPH / 20-140 KNOTS',
      brand: 'Falcon',
      model: '',
      partNo: '10-02227',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi164mn-3.php',
      price: 19995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02227.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Airspeed Indicator 0-120 KNOTS',
      brand: 'Falcon',
      model: '',
      partNo: '10-02898',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi120n-3.php',
      price: 18995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02898.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Airspeed Indicator 0-140 KNOTS',
      brand: 'Falcon',
      model: '',
      partNo: '10-02899',
      text: 'http://www.aircraftspruce.com/catalog/inpages/FAlconasi140n-3.php',
      price: 19995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02899.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Airspeed Indicator 0-140 KNOTS',
      brand: 'Falcon',
      model: '',
      partNo: '10-02916',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi140m-3.php',
      price: 18995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02916.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Minature Airspeed Indicator 0-120 KNOTS',
      brand: 'Falcon',
      model: '',
      partNo: '10-04069',
      text: 'http://www.aircraftspruce.com/catalog/inpages/asi120n-2.php',
      price: 17995,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-04069.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Airspeed Indicator 0-120 KNOTS',
      brand: 'Falcon',
      model: '',
      partNo: '10-02625',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi120k-3.php',
      price: 18995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02625.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Minature Airspeed Indicator 0-120 KPH',
      brand: 'Falcon',
      model: '',
      partNo: '10-02226',
      text: 'http://www.aircraftspruce.com/catalog/inpages/asi140k-2.php',
      price: 17995,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02226.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    },
    {
      name: 'Airspeed Indicator 0-120 KNOTS with Pitot Kit',
      brand: 'Falcon',
      model: '',
      partNo: 'AS026',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconas026.php',
      price: 19995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02898.jpg',
      instrumentClass_id: airSpeedIndicator[0]._id
    }
  ])
  .then(() => {
    console.log('Created airSpeedIndicator instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})




InstrumentClass.create([
  { name: 'Attitude' }
])
.then((attitudeIndicator) => {
  console.log('Created instrumentClass', attitudeIndicator)
  Instrument.create([
    {
      name: 'D2 Pocket Panel - Portable EFIS',
      brand: 'Dynon',
      model: '',
      partNo: '11-12158',
      text: 'http://www.aircraftspruce.com/catalog/inpages/dynond2_11-12158.php',
      price: 99500,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/11-12158.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    },
    {
      name: 'Avionics AV-2 Attitude Display',
      brand: 'Falcon',
      model: '',
      partNo: '11-05690',
      text: 'http://www.aircraftspruce.com/pages/in/attitude_mgl/1105690.php',
      price: 26000,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/11-05690.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    },
    {
      name: 'Electric Attitude Gyro',
      brand: 'Skysports',
      model: '',
      partNo: '10-05422',
      text: 'http://www.aircraftspruce.com/catalog/inpages/ssp-10-05422.php',
      price: 123600,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02164-s.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    },
    {
      name: 'Electrical 14V Lighted Attitude Gyro with Connector and Clamp',
      brand: 'Skysports',
      model: '',
      partNo: '10-05310',
      text: 'http://www.aircraftspruce.com/catalog/inpages/gh02e-3lcc.php',
      price: 126200,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02164-s.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    },
    {
      name: 'Vacuum Attitude Gyro',
      brand: 'Skysports',
      model: '',
      partNo: '10-05423',
      text: 'http://www.aircraftspruce.com/catalog/inpages/ssp-10-05423.php',
      price: 51900,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-22955.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    },
    {
      name: 'Gemini ADI',
      brand: 'Trutrak',
      model: '',
      partNo: '11-10451',
      text: 'http://www.aircraftspruce.com/pages/in/attitude_trutrak/geminiadi.php',
      price: 97000,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/11-104512013.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    },
    {
      name: 'ADI2',
      brand: 'Trutrak',
      model: '',
      partNo: '11-05736',
      text: 'http://www.aircraftspruce.com/catalog/inpages/trutrakADI2a.php',
      price: 126100,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/11-05735.jpg',
      instrumentClass_id: attitudeIndicator[0]._id
    }
  ])
  .then(() => {
    console.log('Created attitudeIndicator instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})


InstrumentClass.create([
  { name: 'Vertical Speed' }
])
.then((verticalSpeedIndicator) => {
  console.log('Created instrumentClass', verticalSpeedIndicator)
  Instrument.create([
    {
      name: 'Vertical Speed Inidicator with 2.25 INCH Round Bezel',
      brand: 'Belite',
      model: '',
      partNo: '10-04351',
      text: 'http://www.aircraftspruce.com/catalog/inpages/belitevsiadapter.php',
      price: 11995,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-04351x.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
    {
      name: 'Vertical Speed Indicator',
      brand: 'Falcon',
      model: '',
      partNo: '10-05352',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed2.php',
      price: 22095,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05352.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
    {
      name: '2-1/4 Vertical Speed Indicator - 2,000 FT / MIN',
      brand: 'Falcon',
      model: '',
      partNo: '10-01643',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed6.php',
      price: 25795,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05205.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
    {
      name: 'Vertical Speed Indicator - 3-1/8 INCH 10 METER RANGE',
      brand: 'Falcon',
      model: '',
      partNo: '10-02246',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed4.php',
      price: 22395,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02246.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
    {
      name: 'Vertical Speed Indicator - 3-1/8 INCH 3,000 FT RANGE',
      brand: 'Falcon',
      model: '',
      partNo: '10-05210',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed3.php',
      price: 23995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-05210.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
    {
      name: 'Vertical Speed Indicator - 2-1/4 INCH 10 METER RANGE',
      brand: 'Falcon',
      model: '',
      partNo: '10-00983',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed5.php',
      price: 25795,
      size: 'M',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-00983.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
    {
      name: 'Non TSO 3-1/8 Vertical Speed Indicator 2K FT / MIN',
      brand: 'Skysports',
      model: '',
      partNo: '10-05361',
      text: 'http://www.aircraftspruce.com/catalog/inpages/falcon10-05205.php',
      price: 27995,
      size: 'L',
      pictureURL: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05205.jpg',
      instrumentClass_id: verticalSpeedIndicator[0]._id
    },
  ])
  .then(() => {
    console.log('Created verticalSpeedIndicator instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})


InstrumentClass.create([
  { name: 'Oil Pressure Gauge' }
])
.then((oilPressureGauge) => {
  console.log('Created instrumentClass', oilPressureGauge)
  Instrument.create([
    {
      name: 'Oil Pressure Gauge 0 - 10 BAR',
      brand: 'UL Flight Line',
      model: '',
      partNo: '13-16021',
      text: 'https://www.aircraftspruce.com/catalog/inpages/flightline13-16021-5.php',
      price: 8995,
      size: 'S',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/3/13-16021.jpg',
      instrumentClass_id: oilPressureGauge[0]._id
    },
    {
      name: 'Pressure Gauge 0-10 BAR 0-145 PSI',
      brand: 'UL Flight Line',
      model: '',
      partNo: '13-16025',
      text: 'https://www.aircraftspruce.com/catalog/inpages/flightline13-16021-5.php',
      price: 7995,
      size: 'S',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/3/13-16021.jpg',
      instrumentClass_id: oilPressureGauge[0]._id
    }
  ])
  .then(() => {
    console.log('Created oilPressureGauge instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})


InstrumentClass.create([
  { name: 'Oil Tempreture Gauge' }
])
.then((oilTempretureGauge) => {
  console.log('Created instrumentClass', oilTempretureGauge)
  Instrument.create([
    {
      name: 'Temperature Gauge UL/LSA CANaerospace',
      brand: 'Road',
      model: '',
      partNo: 'IH91.2B35.25',
      text: 'https://www.road-online.de/products/article.php?grp=2&art=IH91.2B35.25',
      price: 9867,
      size: 'S',
      pictureURL: 'https://www.road-online.de/produkte/imgkatalog/ih91_2b35_25.jpg',
      instrumentClass_id: oilTempretureGauge[0]._id
    },
    {
      name: 'Temperature Gauge UL/LSA CANaerospace',
      brand: 'Road',
      model: '',
      partNo: 'IH61.2B35.25',
      text: 'https://www.road-online.de/products/article.php?grp=2&art=IH61.2B35.25',
      price: 7534,
      size: 'S',
      pictureURL: 'https://www.road-online.de/produkte/imgkatalog/ih61_2b35_25.jpg',
      instrumentClass_id: oilTempretureGauge[0]._id
    },
  ])
  .then(() => {
    console.log('Created oilTempretureGauge instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})


InstrumentClass.create([
  { name: 'Cylinder Head Temperature Gauge' }
])
.then((cylinderHeadTempretureGauge) => {
  console.log('Created instrumentClass', cylinderHeadTempretureGauge)
  Instrument.create([
    {
      name: '2" CHT 50-150C 150-300F',
      brand: 'UL Flight Line',
      model: '',
      partNo: '13-16017',
      text: 'https://www.aircraftspruce.com/catalog/inpages/flightline13-16017.php?clickkey=1607587',
      price: 6995,
      size: 'S',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/3/13-16017.jpg',
      instrumentClass_id: cylinderHeadTempretureGauge[0]._id
    },
    {
      name: '2" CHT 50-150C 125-300F',
      brand: 'UL Flight Line',
      model: '',
      partNo: '13-16026',
      text: 'https://www.aircraftspruce.com/catalog/inpages/flightline13-16017.php?clickkey=1607587',
      price: 6995,
      size: 'S',
      pictureURL: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/3/13-16017.jpg',
      instrumentClass_id: cylinderHeadTempretureGauge[0]._id
    }
  ])
  .then(() => {
    console.log('Created cylinderHeadTempretureGauge instruments')
  })
  .catch((error) => {
    console.error(error)
  })
})
.catch((error) => {
  console.error(error)
})


Template.create([
  {
    code: 'a22',
    name: 'Analog A-22 Panel',
    pictureUrl: 'images/a22.svg'
  },
  {
    code: 'a22Digital',
    name: 'Digital A-22 Panel',
    pictureUrl: 'images/a22digital.svg'
  },
  {
    code: 'a32',
    name: 'Analog A-32 Panel',
    pictureUrl: 'images/a32.svg'
  },
  {
    code: 'a32Digital',
    name: 'Digital A-32 Panel',
    pictureUrl: 'images/a32digital.svg'
  }
])
.then(() => {
  console.log('Created Tempates')
})
.catch((error) => {
  console.error(error)
})
