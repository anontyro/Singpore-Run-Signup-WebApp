let raceDate = new Date("Jul 30, 2017 07:00:00").getTime();
const runnerList = [];

//when the user adds themselve into the race this method fires. firstly it takes the data from the form and converts
//to uppercase then it checks to see if it already exists in the page if so it will hide the button to join, else it will
//allow them to add to the page and database.
const onSubmit = () =>{
  let name = $("#form-name").val().toUpperCase();
  const distance = $("#form-distance").val();
  
  if(checkIfUserJoined(name)){
    showForParticipating();
    return ;
  }
  
  addRunner(name, distance);
  addRunnerToDb(name,distance);
  
  formMainExit();
  
}

//animation that brings in the form from the side
const onJoinRace = () =>{  

  if($(".join-form").css("display") === "none"){

    $(".join-button-toggle").addClass("form-displayed");  
    $(".join-form").addClass("bounceInLeft");
    $(".join-form").css("display", "inherit");
    $('.join-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(".join-form").removeClass("bounceInLeft");
    });

  }else{
    formMainExit();
  }


}

//animation controls for the form exit
const formMainExit = () =>{
  $(".join-button-toggle").removeClass("form-displayed");  
  $(".join-form").addClass("bounceOutRight");
  $('.join-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(".join-form").removeClass("bounceOutRight");
  $(".join-form").css("display", "none");
      });
}

//animations for the Join The Race button to hide for users already participating
const showForParticipating = () =>{
  $(".join-button-toggle").addClass("bounceOutRight");
  $(".join-button-toggle").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    
    $(".join-button-toggle").css("display", "none");

  });
  formMainExit();
}

//All added users are added into the globle runnerList[] as [name,distance] this method checks through the array
// if it finds the same user added already then it will return true if they are in the array of false if they are not
const checkIfUserJoined = (username) =>{
  let inArray = 1;
  for(let i = 0; i < runnerList.length;i++){
      if(username === runnerList[i][0]){
        inArray = -1;
        break;
      }
  }  
  if(inArray === -1){ return true;}
  return false;
  
}

//valids to ensure that the user has not been added to the database yet.
const preCheckUserAdded = () =>{

  const user = $("#form-name").val();
  if( checkIfUserJoined(user) ){
    showForParticipating();
  }

}

//Create a new runner in the database by calling the PHP function page, requires both the username
//and distance they will run. it does take an option race which will default to Cancer Run
const addRunnerToDb = (username, distance) =>{
  $.get(
    "/js/runnerTracker/php/servercalls.php?username="+username+
    "&distance="+distance);
}

//Returns a JSON array from the database table with all the values
//this is used to read all the times from the database to be added to the page
const getRunnersFromDb = (callback) =>{

  $.get("/js/runnerTracker/php/servercalls.php", function(data){
    console.log(data);
    let valueFromDb = JSON.parse(data);
    if(callback) callback(valueFromDb);
  })

}

//helper method that is chained with others, this method just adds a runner with no validation that is done elsewhere
//this method should never be called on its own
const addRunner = (name, distance) =>{
    runnerList.push([name,distance]);
  $("#runner-list").append("<li>"+name+" \( "+distance+" KM \) </li>");
}

//inital call to the database to pull all of the data, it also runs a check to ensure
//that the page does not currently have that runner displaying
const seedPage = () =>{

  getRunnersFromDb(function(runnerList){

    for(let i = 0; i < runnerList.length; i++){
      if(!checkIfUserJoined(runnerList[i].username)){
         addRunner(runnerList[i].username, runnerList[i].distance);

      }
    }
  })

}

//function that runs as soon as the page loads to start the countdown timer for the race
//adds to be displayed correctly
let x = setInterval(function(){
  
  const now = new Date().getTime();
  const distance = raceDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));;
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);;
 
  // console.log(days+" - "+hours+":"+minutes+":"+seconds);
  $(".day-clock").text(days);
  $(".day-hours").text(hours);
  $(".day-mins").text(minutes);
  $(".day-secs").text(seconds);

}, 1000);