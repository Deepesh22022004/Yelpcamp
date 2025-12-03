const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedsHelpers');
const axios = require('axios');


mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
    // useNewUrlParer: true,
    // useCreateIndex: true,
    // useUnifiedTopology:true
  })

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('DataBase connected');
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// async function seedImg() {
//     try {
//         const resp = await axios.get("https://api.unsplash.com/photos/random", {
//             params: {
//                 client_id: "GsJLDRmemR8-wUvDRCEa5dRr0qLE-JnH4wgl0jjmjEQ",
//                 collections: 483251,
//             },
//         });
//         return resp.data.urls.small;
//     } catch (err) {
//         console.error(err);
//     }
// }
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random163 = Math.floor(Math.random() * cities.length);
        const price= Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author : '66753ff3f9b971b6f334cd04',
            location: `${cities[random163].city},${cities[random163].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: await seedImg(),
            // image:'https://source.unsplash.com/collection/483251',
            price: price,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, nobis impedit reiciendis inventore in architecto eaque illum adipisci incidunt odit iusto repellat cupiditate ex aliquid aspernatur excepturi laboriosam corrupti pariatur.',
            geometry: {
              type: 'Point',
              coordinates: [
                  cities[random163].lng,
                  cities[random163].lat,
              ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/dxzffb6br/image/upload/v1719325344/YelpCamp/v8rsgsqcqo0hyaokzrxi.jpg',
                  filename: 'YelpCamp/v8rsgsqcqo0hyaokzrxi',
                },
                {
                  url: 'https://res.cloudinary.com/dxzffb6br/image/upload/v1719334449/YelpCamp/bdj9fnilmk9sqjy80iqz.jpg',
                  filename: 'YelpCamp/bdj9fnilmk9sqjy80iqz',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
// https://source.unsplash.com/collection/483251