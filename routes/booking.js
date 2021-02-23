var express = require('express');
var router = express.Router();


rooms=[
  {
    "name": "room1",
    "seat": 10,
    "amenities": [
        "tv",
        "AC"
    ],
    "price": 200,
    "status":'booked',
    "id": 1
},
{
  "name": "room2",
  "seat": 10,
  "amenities": [
      "tv",
      "AC"
  ],
  "price": 200,
  "status":'',
  "id": 2
},{
  "name": "room3",
  "seat": 10,
  "amenities": [
      "tv",
      "AC"
  ],
  "price": 200,
  "status":'booked',
  "id": 3
}
]
coustomers=[
  {
    "name": "ABC",
    "date": "20/02/202",
    "start_time": "20-20-30",
    "end_time": 20230,
    "id": "1"
},
{
  name: "ZXY",
  date: "20/02/20",
  start_time: "21:20:30",
  end_time: "12:30:20",
  id: "3"
}
]
booked=[{
  "coust_details": {
      "name": "ABC",
      "date": "20/02/2021",
      "start_time": "20:08:30",
      "end_time": "00:00:00",
      "id": "1"
  },
  "room_name": "room2",
  "room_status":"booked"
},
{
  "coust_details": {
      "name": "ZXY",
      "date": "20/02/20",
      "start_time": "21:20:-0",
      "end_time": "12:30:20",
      "id": "3"
  },
  "room_name": "room3",
  "room_status":"booked"
}]

/* rooms apis */
router.get('/rooms', function(req, res, next) {
  res.send(rooms);
});
router.get('/booked-rooms', function(req, res, next) {
 try {
   
   res.json(booked)
   
 } catch (error) {
   res.json({
     mes:"err"
   })
   
 }
});

router.post('/new-rooms', function (req, res, next) {
  let new_room = {
      name:req.body.name,
      seat:req.body.seat,
      amenities:req.body.amenities,
      price:req.body.price,
      id:rooms.length+1
  }
  rooms.push(new_room)
  res.json(rooms);
});

/* coustomers apis */

router.get('/coustomers', function(req, res, next) {
  res.send(coustomers);
});

router.post('/book-room/:id', function(req, res, next) {
  try {
    const room = rooms.find((ele) => ele.id === parseInt(req.params.id));
    console.log(room.status)
    if(room.status!=="booked"){
      room.status="booked"
      let new_coust = {
        name:req.body.name,
        date:req.body.date,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        id:req.params.id,
    }
    let booking={
      coust_details:new_coust,
      room_name:room.name,
      room_status:"booked"
      
    }
    booked.push(booking)
    coustomers.push(new_coust)
    res.json(coustomers);
    }
    else{
      res.json({
        message:"room booked"
      })
    }
    
  } catch (error) {
    res.json({
      mes:"Someting wemt worgn"
    })
    
  }
});


module.exports = router;
