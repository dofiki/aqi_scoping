import { Agenda } from '@hokify/agenda';
import { User } from '../model/user.model';

const DB_CONN_STRING = process.env.DB_CONN_STRING as string;

const agenda = new Agenda({ db: { address: DB_CONN_STRING, collection: 'customjobs' } });

// define job
agenda.define('print logs', async job=>{
    console.log("log: nothing occured yet")
    // line below returns user but trackedLocation are not populated
    //const userWithLocations = await User.find({}) 
    const userWithLocations = await User.find({}).populate('trackedLocaiton').exec();
    console.log(userWithLocations)
    // now we get the user with trackedLocaiton that are also populated
    /*
    [
    {
        _id: new ObjectId('69324fb1eff903011d3ebc7f'),
        username: 'dixit7',
    ->   email: 'dixit7@gmail.com',
        passwordHash: '$2b$10$syOVFpJjTjphWgGzUcqDK.R/an2McXuh4Gr.DNz7YlNcBBEYeSJCG',
        createdAt: 2025-12-05T03:21:21.911Z,
        updatedAt: 2025-12-05T13:55:23.448Z,
        __v: 4,
    ->   trackedLocation: [ [Object], [Object], [Object], [Object] ]
    },
    {...}   
    ]
    */
   // we have a array that contains multiple user object
    const trackedLocationList = userWithLocations.map(user => user.trackedLocation);
    // it returns:
    /*  [
     {
      _id: new ObjectId('6932e05f3e91e3f556406081'),
      name: 'kathmandu',
      aqiHistory: [Array],
      __v: 0
    },
      ...
    ]*/
    // now we have the each location object
    // fetch api for each of those location
    // push fetched data to their location>aqiHistory  
    // save 
});

// Immediately Invoked Function Expression
(async function (){
    await agenda.start();
    // every day 3 times
    await agenda.every('1 minutes', 'print logs');
})();

