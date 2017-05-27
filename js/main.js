let raceDate = new Date("Jul 30, 2017 07:00:00").getTime();
const runnerList = [["TEST","5"]];

//
const onJoinRace = () =>{
  
  $(".join-button-toggle").addClass("form-displayed");  
  $(".join-form").addClass("bounceInLeft");
  $(".join-form").css("display", "inherit");
  $('.join-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(".join-form").removeClass("bounceInLeft");
  });

}

//
const onSubmit = () =>{
  let name = $("#form-name").val();
  name = name.toUpperCase();
  const distance = $("#form-distance").val();
  
  if(checkIfUserJoined(name)){
    showForParticipating();
    return ;
  }
  
  addRunner(name, distance);
  
  formMainExit();

  
}

const addRunner = (name, distance) =>{
    runnerList.push([name,distance]);
  $("#runner-list").append("<li>"+name+" \( "+distance+" KM \) </li>");
}

const formMainExit = () =>{
  $(".join-button-toggle").removeClass("form-displayed");  
  $(".join-form").addClass("bounceOutRight");
  $('.join-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(".join-form").removeClass("bounceOutRight");
  $(".join-form").css("display", "none");
      });
}

//
const checkIfUserJoined = (username) =>{
  let inArray = 1;
  for(let i = 0; i < runnerList.length;i++){
      if(username === runnerList[i][0]){
        inArray = -1;
        break;
      }
  }
  console.log("In array? "+ (inArray=== -1) );
  
  if(inArray === -1){ return true;}
  return false;
  
}

const showForParticipating = () =>{
  $(".join-button-toggle").css("display", "none");
  formMainExit();
}

//
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