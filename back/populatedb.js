#! /usr/bin/env node

console.log('This script populates some test articles to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/test?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Post = require('./models/post')


var mongoose = require('mongoose');
//var mongoDB = userArgs[0];
mongoose.connect('mongodb+srv://user:assword@cluster0-adjsh.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true } );
mongoose.Promise = global.Promise; //what is this?
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var posts = []




function postCreate(title, body, published, cb) {
  postdetail = { title: title , body: body, published: false }
  
  var post = new Post(postdetail);
       
  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Post: ' + post);
    posts.push(posts)
    cb(null, post)
  }  );
}

function createBlogPosts(cb) {
    async.series([
        function(callback) {
          postCreate('Patrick', `He was born second of two children: Margie and Herb Star. Sam was lost at sea when she and Patrick were children. He did not see her again until the episode "Big Sister Sam." Patrick met SpongeBob when the two were babies, as shown in "The Secret Box." When he was a kid, Patrick had a tendency to recite poems during gym class, which ruined his reputation and made him a target for dodgeball players, as shown in "Sing a Song of Patrick." When he was an adult, he moved out and rented a rock house eventually to own it. He lives next door to Squidward. As revealed in "Home Sweet Pineapple," Patrick was kicked out of his parents' house at one point and never allowed to come back. He thus created his rock, with the only difference being that he added a satellite antenna to it. At some point, Patrick went to community college with Flats the Flounder, although he forgets what he studied there and likely failed to graduate. Patrick celebrated two unspecified birthdays in the episodes "The Donut of Shame" and "Overbooked." One day, when his neighbor Squidward was gardening, a pineapple fell from a ship into the ocean, landing on Squidward's garden creating the pineapple house. Meanwhile, SpongeBob was looking for a house of his own; when all hope seemed lost, SpongeBob and the real estate agent saw the pineapple house's creation and Patty said she had forgotten about the house. SpongeBob bought it. To this day, they have been neighbors. Later, in the episode “Driven to Tears,” he gained and lost his drivers license, and threw his Bass Blaster 3000 away that he won. At some point, Patrick learned how to put on a diaper. At some point, he met Grandma SquarePants. He once rented out his front yard to a fish named Howard in "New Fish in Town." He, along with SpongeBob, Squidward, Mr. Krabs, Sandy, and Plankton became superheroes while on land to retrieve the Krabby Patty secret formula from Burger Beard.`, false, callback);
        },
        function(callback) {
          postCreate('Ben', `Initially cocky, childish, and arrogant, Ben's immaturity and attention-seeking behavior often led him to joke around, regardless of the situation. His allies often criticized his attitude, unaware of the fact that he used humor to mask his fears. Despite some childish attitude, he was heroic, caring and generally good-natured, always willing to save others at any time. As seen in Heroes United, Ben seems to be oblivious to certain things, such as the fact that he was transported to another dimension, yet he thought he was still in his world. Over the years, Ben has displayed good leadership skills, as well as the ability to adapt his attitude to a situation, becoming serious when it's called for. He became more mature, responsible and sensible. He's kind-hearted, willing to sacrifice even his own life for others. His idealistic views and unwillingness to compromise his values – aspects condemned by Azmuth, yet commended by others – sometimes drive him to act against reason, such as helping his enemies if they need it (most remarkably Vilgax[1]). Professor Paradox has praised Ben's good nature, going so far as to say he had the gift to make the right choices at the right moments. However, when Ben fails to save someone, or if someone gets hurt because of his failures, he becomes angry and much more violent. Perhaps the most notable of these instances is when Kevin willingly mutated himself to succeed where Ben had failed and stop Aggregor, Ben was set on killing Kevin, even fighting Gwen when she refused to help him[3]. He also threatened to hunt down and destroy the Forever Knights once making Driscoll promise to cease the hunting of aliens. Though often stated to be silly or unintelligent because of his immaturity, Ben is cunning and resourceful when needed, quickly adapting when the Omnitrix doesn't provide him with the alien he wanted. Later on, Ben starts thinking of himself as more of a superhero than a Plumber, often remarking that he's not a cop, but a superhero.[5] Although he once again became cocky, he retained his selfless and heroic nature.`, false, callback);
        },
        function(callback) {
            postCreate('JeffreeStar', `JeffreeStar is a makeup mogul person and a Youtuber who is besties with Shane Dawson. I tried to watch their new round of documentaries but found them untenable.`, false, callback);
        },
        ],
        // optional callback
        cb);
}




async.series([
    createBlogPosts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('all nice');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
