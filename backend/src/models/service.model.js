const { Schema, model } = require('mongoose');
const idValidator = require('mongoose-id-validator');

const AddressSchema = Schema({
  city: String,
  street: String,
  houseNumber: String,
});

const ContactInfoSchema = Schema({
  contactPerson: String,
  available: String,
  tel: String,
  email: String,
  addr: AddressSchema,
  webpageUrl: String,
});

const ServiceSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: String,
  contacts: ContactInfoSchema,
  active: Boolean,
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  collection: 'vizsgaremekServices',
  timestamps: true,
});

ServiceSchema.plugin(idValidator);

// const ServiceModel = model('Service', ServiceSchema);

module.exports = model('Service', ServiceSchema);

/*
export class Address {
  city: String = '',
  street: String = '',
  houseNumber: String = '',
}
export class ContactInfo {
  contactPerson: String = '';
  available: String = '';
  tel: [String] = [];
  email: [String] = [];
  address: Address = new Address();
  webpageUrl: String;
}
export class Service {
  _id: string = '';
  name: string = '';
  type: string = '';
  description: string = '';
  contacts: ContactInfo = new ContactInfo();
  active?: boolean = true;
  uploader: User = new User();
}

const service = new ServiceModel({
  name: "Kőműver Kft.",
  type: "kőműves",
  description: "Beton és falazási munkák",
  contacts: {
    contactPerson: "Kőműves Kelemen",
    available: "H-V: 0-24h"
    tel: [+36-30-1234567, +36-93-123456],
    email: ["kelemen@gmail.com", "contact@komuveskft.hu"],
    address: {
      city: Nagykanizsa,
      street: Béke utca,
      houseNumber: 36/A, 2. em. 12.,
    },
    webpageUrl: "www.komuveskelemen.szolgaltato.hu"
  },
  active: true,
  uploader: "wjklwrjwwotjttjio4uo4w"
});
*/
/*
A szolgáltatások minden adata jelenjen meg
a tárolni kívánt adatok:
a szolgáltató neve (cég vagy vállalkozó)
a szolgáltatás típusa: csak kulcsszavak
a szolgáltatás rövid leírása, jellemzése
elérhetőségek - lehet többet is megani - a szükséges adatok:
elérhetőség típusa (tel., e-mail, személyes)
a kapcsolattartó személy neve
az elérhetőség időpontja
melyik felhasználó rögzítette az adatokat az adatbázisban
az adat státusza: aktív = publikálható a felhasználók számára,
vagy inaktív = a megjelenítés a felhasználók számára le van tiltva
*/

// Display any data from CustomerModel
// https://mongoosejs.com/docs/api.html#model_Model.findOne
/* CustomerModel.findOne({ firstName: "Ashish" }, (err, cust) => {
  if (err) return console.error(err);

  // To print stored data
  console.log(cust.connectInfo.tel[0]); // output 8154080079
}); */

// Update inner record
// https://mongoosejs.com/docs/api.html#model_Model.update
/* CustomerModel.updateOne(
  { firstName: "Ashish" },
  {
    $set: {
      "connectInfo.tel.0": 8154099999,
    },
  }
); */
