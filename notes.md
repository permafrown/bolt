// NOTES

// RESTful ROUTES:
// INDEX = /things + GET | mongoose method: Thing.find() | show all things
// NEW = /things/new + GET | mongoose method: N/A | show form to create new thing
// CREATE = /things + POST | mongoose method: Thing.create() | add new thing to DB
// SHOW = /things/:id + GET | mongoose method: Thing.findById() | show info on one thing
// EDIT = /things/:id/edit + GET | mongoose method: Thing.findById() | show form to edit one thing
// UPDATE = /things/:id + PUT | mongoose method: Thing.findByIdAndUpdate() | change one thing in DB
// DESTROY = /things/:id + DELETE | mongoose method: Thing.findByIdAndRemove | remove one thing from DB


// var campgrounds = [
//         {name: "Panther Crossing", image: "https://source.unsplash.com/jl2T_E4tUyo/480x288"},
//         {name: "Scruntal Bluffs", image: "https://source.unsplash.com/gcCcIy6Fc_M/480x288"},
//         {name: "Meedly Weavels", image: "https://source.unsplash.com/tRGwX1HcTd4/480x288"},
//         {name: "Awesome Possums", image: "https://source.unsplash.com/SId-lmFXSDU/480x288"},
//         {name: "Serpent Cove", image: "https://source.unsplash.com/sK1hW5knKkw/480x288"},
//         {name: "Happy Lemurs", image: "https://source.unsplash.com/WWb4gn130JI/480x288"},
//         {name: "Gerbil Run", image: "https://source.unsplash.com/WWb4gn130JI/480x288"},
//         {name: "Panther Crossing", image: "https://source.unsplash.com/jl2T_E4tUyo/480x288"},
//         {name: "Scruntal Bluffs", image: "https://source.unsplash.com/gcCcIy6Fc_M/480x288"},
//         {name: "Meedly Weavels", image: "https://source.unsplash.com/tRGwX1HcTd4/480x288"},
//         {name: "Awesome Possums", image: "https://source.unsplash.com/SId-lmFXSDU/480x288"},
//         {name: "Serpent Cove", image: "https://source.unsplash.com/sK1hW5knKkw/480x288"},
//         {name: "Happy Lemurs", image: "https://source.unsplash.com/WWb4gn130JI/480x288"},
//         {name: "Gerbil Run", image: "https://source.unsplash.com/WWb4gn130JI/480x288"}
//         ];


// UNSPLASH CAMPGROUND IMAGES
// https://source.unsplash.com/jl2T_E4tUyo/480x288
// https://source.unsplash.com/gcCcIy6Fc_M/480x288
// https://source.unsplash.com/DgSnapS1itA/480x288
// https://source.unsplash.com/tRGwX1HcTd4/480x288
// https://source.unsplash.com/SId-lmFXSDU/480x288
// https://source.unsplash.com/sK1hW5knKkw/480x288
// https://source.unsplash.com/WWb4gn130JI/480x288


// https://static1.squarespace.com/static/51c3cda0e4b0bea2ecf69bc4/561fc2c1e4b00e50405f46fd/57ed278a2994caa927f998af/1475159971460/shutterstock_242371765+%281%29.jpg?format=1000w
// https://greatist.com/sites/default/files/styles/fb-1200x630/public/Campsite_featured.jpg?itok=UJly7Ji0
// https://www.arenacamps.com/datastore/imagestore/original/1485517050pomer_ground17-090816.jpg?v=1485517050
// http://www.visitnc.com/contents/imgcrop/61803/1200/630/preview
// https://upload.wikimedia.org/wikipedia/commons/0/05/Biskeri-_Camping_I_IMG_7238.jpg
// http://i.dailymail.co.uk/i/pix/2017/05/29/16/40BE655D00000578-4538280-image-a-13_1496072010525.jpg
// https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-hiver.jpg