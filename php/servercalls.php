<?php 

//locahost
//DB: onepage
//table: runnerstable
//username: root
//password: root
//fields: id username distance race
$table = "runnerstable";

if(isset($_GET['username']) && isset($_GET['distance'])){
	$name = $_GET['username'];
	$distance = $_GET['distance'];
	addRunner($name,$distance,$table);
}else{
	
returnAllRunners("$table");

}

function returnAllRunners( $runnerTable)
{
	include("dbconnect.php");
	$sql = "SELECT * FROM ".$runnerTable;
	$sql_query = mysqli_query($connect, $sql);

	if(!$sql_query){
		die("Error no data found");
	}

	while($row = mysqli_fetch_assoc($sql_query)){
		$output[] = $row;
	}

	mysqli_free_result($sql_query);
	$connect->close();
	print(json_encode($output));
}

function addRunner($name, $distanceKm, $table, $currentRace = "Race Against Cancer")
{
	include("dbconnect.php");
	$stmt = $connect->prepare("INSERT INTO ".$table." (username, distance, race) VALUES (?,?,?)");
	$stmt->bind_param("sis", $username, $distance, $race);

	$username = $name;
	$distance = $distanceKm;

	if(isset($_GET['race'])){
		$race = $_GET['race'];
	}else{
		$race = $currentRace;		
	}

	$stmt->execute();

	echo "{msg: added}";

	$stmt->close();
	$connect->close();

}


?>