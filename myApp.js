require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let Schema = mongoose.Schema

let arrayOfPeople = [{
  name: 'Lugi',
  age: 22,
  favoriteFoods: ['doco', 'ata', 'sauce']
}, {
  name: 'Sonic',
  age: 32,
  favoriteFoods: ['beure', 'tevi', 'legume']
}, {
  name: 'Trails',
  age: 40,
  favoriteFoods: ['croissant', 'wo', 'dja']
}, {
  name: 'Bouba',
  age: 10,
  favoriteFoods: ['pain', 'gali', 'crincrin']
}]

let personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  let doc = new Person({
    name: 'Mario',
    age: 12,
    favoriteFoods: ['abobo', 'maca', 'riz']
  })

  doc.save((error, data) => {
    if (error) return done(error)
    done(null, data);

  })

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) return done(error)
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) return done(error)
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, data) => {
    if (error) return done(error)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (error, data) => {
    if (error) return done(error)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {

    if (error) return done(error)

    person.favoriteFoods.push(foodToAdd)

    person.save((error, data) => {
      if (error) return done(error)
      return done(null, data)
    })

  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (error, person) => {
    if (error) return done(error)
    done(null, person)
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, removedDoc) => {
    if (error) return done(error)

    done(null, removedDoc)

  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (error, changeInfo) => {
    if (error) return done(error)
    done(null, changeInfo)
  })

};


const queryChain = (done) => {
  const foodToSearch = "burrito"; Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec(function(error, data) {
    if (error) return done(error)
    done(null, data)
  })
  }


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
