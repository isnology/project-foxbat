const mongoose = require('./init')
const Panel = require('./Panel')
const Template = require('./Template')
const Instrument = require('./Instrument')
const InstrumentClass = require('./InstrumentClass')
const User = require('./User')


Panel.deleteMany()
.then(() => {
 console.log('Deleted panels')
})

Template.deleteMany()
.then(() => {
 console.log('Deleted templates')
})

Instrument.deleteMany()
.then(() => {
 console.log('Deleted instruments')
})

InstrumentClass.deleteMany()
.then(() => {
 console.log('Deleted users')
})


User.deleteMany()
.then(() => {
 console.log('Deleted users')
 process.exit()
})

// mongoose.connection.collections['Panel'].drop( function(err) {
//   console.log('Panel dropped');
// });

// mongoose.connection.collections['Template'].drop( function(err) {
//   console.log('Template dropped');
// });

// mongoose.connection.collections['Instrument'].drop( function(err) {
//   console.log('Instrument dropped');
// });

// mongoose.connection.collections['InstrumentClass'].drop( function(err) {
//   console.log('InstrumentClass dropped');
// });

// mongoose.connection.collections['User'].drop( function(err) {
//   console.log('User dropped');
// });


