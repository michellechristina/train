
var config = {
  apiKey: "AIzaSyCPMZJe9gLBC4asf78-uq_kjBw198t705M",
  authDomain: "bootcamp-e88af.firebaseapp.com",
  databaseURL: "https://bootcamp-e88af.firebaseio.com",
  projectId: "bootcamp-e88af",
  storageBucket: "bootcamp-e88af.appspot.com",
  messagingSenderId: "711663547166"
};
firebase.initializeApp(config);


var database = firebase.database();


// 2. Button for adding Trains
$("#addTrainBtn").on("click", function () {

  // Grabs user input and assign to variables
  var trainName = $("#trainNameInput").val().trim();
  // var lineName = $("#lineInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  var frequencyInput = $("#frequencyInput").val().trim();

  // Test for variables entered
  console.log(trainName);

  console.log(destination);
  console.log(trainTimeInput);
  console.log(frequencyInput);

  // Creates local "temporary" object for holding train data
  // Will push this to firebase
  var newTrain = {
    name: trainName,
    destination: destination,
    trainTime: trainTimeInput,
    frequency: frequencyInput,
  }

  // pushing newTrain object to Firebase
  database.ref().push(newTrain);

  // clear text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainInput").val("");
  $("#frequencyInput").val("");

  // Prevents page from refreshing
  return false;
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // assign variables to snapshots.
  var Name = childSnapshot.val().name;
  var Destination = childSnapshot.val().destination;
  var TrainTimeInput = childSnapshot.val().trainTime;
  var Frequency = childSnapshot.val().frequency;


  // maths

  var diffTime = moment().diff(moment.unix(TrainTimeInput), "minutes");
  var timeRemainder = moment().diff(moment.unix(TrainTimeInput), "minutes") % Frequency;
  var minutes = Frequency - timeRemainder;

  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

  // Test for correct times 
  console.log(minutes);
  console.log(nextTrainArrival);
  console.log(moment().format("hh:mm A"));
  console.log(nextTrainArrival);
  console.log(moment().format("X"));

  // Append train info to table on page
  $("#trainTable > tbody").append("<tr><td>" + Name + "</td>><td>" + Destination + "</td><td>" + Frequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});