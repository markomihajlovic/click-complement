<?php
//print_r($_POST);
mail('example@gmail.com', 'Valaki játszik a CC-vel ! :D', "");

//$kapcsolat = mysql_connect("localhost", "root");
$kapcsolat = mysql_connect("127.0.0.1", "example", "example");

mysql_select_db("example", $kapcsolat);

if(strlen($_POST[nev]."")>1) {//$_POST[nev]!=null && $_POST[nev]!="" && 
	jatekNepszerusegNovel();
	$kellModositas = false;
	$kellBeillesztes = false;
	$ciklusLefutott=false;
	
	$tabla = "SELECT * FROM toplista WHERE jatekfajta='".$_POST[jatekfajta]."'";	 //cc 4x5  //".$_POST[jatekfajta]."
	$lekerdezes = mysql_query($tabla);

	//echo '<table border=1>';
	while($rekord = mysql_fetch_array($lekerdezes)) {
		$ciklusLefutott = true;
		
		if( $rekord['pont'] < $_POST['pont'] )
			$kellModositas = true;
		/*	
		echo "<tr>";
		echo "<td>".$rekord['nev']."</td>";
		echo "<td align=center>".$rekord['pont']."</td>";
		echo "<td align=center>".$rekord['ido']." s</td>";
		echo "<td align=center>".$rekord['jatekfajta']."</td>";
		echo "<td>".$rekord['mikor']."</td>";
		echo "</tr>";
		*/
	}
	//echo '</table>';
	
	if(!$ciklusLefutott)
		$kellBeillesztes = true;

	// echo " b: ".$kellBeillesztes;
	// echo " m: ".$kellModositas;
	
	//$kellBeillesztes = true;
	if($kellBeillesztes) {//echo " fut a beill";
		$sql =  "INSERT INTO  `toplista` (`nev` ,`pont` ,`ido` ,`jatekfajta` ,`mikor`)VALUES('$_POST[nev]','$_POST[pont]','$_POST[ido]','$_POST[jatekfajta]','$_POST[mikor]')";

		mysql_query($sql);
	}
	else if($kellModositas) {//echo " fut a modos";
		$sql =   "UPDATE  `toplista` SET  `nev` =  '$_POST[nev]',`pont` =  '$_POST[pont]',`ido` =  '$_POST[ido]',`mikor` =  '$_POST[mikor]' WHERE  `jatekfajta` =  '$_POST[jatekfajta]'";

		//echo " Q: ";
		mysql_query($sql);
	}
	
	
}
/*
else if((strlen($_POST[nev])==1  || $_POST[nev]==null) && $_POST[ido]!=null) {// || $_POST[nev]==""
		echo '<br>php: nev rovid!';
		
	}
*/

	function jatekNepszerusegNovel() {
		mysql_query("INSERT INTO  `jatekszam` (`jatekneve`, `jatekos`)VALUES ('$_POST[jatekfajta]', '$_POST[nev]')");
	}
?>

<!DOCTYPE html>
<html>

<head>
<style>
body {
    background-color: lightblue;
}

@media screen and (min-width: 400px) {
    img {
        width: 50px;
    }
}

@media screen and (min-width: 800px) {
    img {
        width: 100px;
    }
}


@media screen and (min-width: 1600px) {
    img {
        width: 135px;
    }
}
</style>
</head>
	<body>
	
	
		<div id="col2">		<!--		Középső panel		------------------------------------------------------------------>
		
		
			
			
			
			<div id="felulet">
			</div>
			
				<br />

			<script>	<!--			SCRIPT		------------------------------------------------------------------>
				var boolFeluletUres=true;
				var utolsoJatek;
				//Name Points	Time	Game	Date
				var nev, points, time, game, date;
				
				var kattintasokSzama = 0;
				var begin = new Date();
				var end = new Date();
				//var toplistaLatszikE;
				//var strKezdetbenElrejtve;
				
				//forrás: http://unixpapa.com/js/dyna.html
				//+ http://www.w3schools.com/js/js_htmldom_elements.asp
				//2013.04.02. 21:43
			   function jatekValaszt(a)
			   {
					// if(document.getElementById("kezdetbenElrejtve").innerHTML != null)
						// strKezdetbenElrejtve = document.getElementById("kezdetbenElrejtve").innerHTML;
					// document.getElementById("kezdetbenElrejtve").innerHTML = null;
				
					kattintasokSzama = 0;
					begin = new Date();
					end = new Date();
					
					if(a==utolsoJatek)
						jatekIndit();
					else {
						var parent=document.getElementById("sriptToBePasted");
						var script= document.createElement('script');
						script.type= 'text/javascript';
						script.src= 'js'+a+'.js';
						parent.appendChild(script); //nem lehet: parent.removeChild(script);
					}
					utolsoJatek=a;
			   }
			   
			   function other() {	//<body bgcolor="#011436">
									//<img src=images/arrow.svg width=200>
					document.getElementById("felulet").innerHTML ="You need Adobe Flash Player to play this game. You can get it <a href=http://www.adobe.com/>here</a><br>";
					document.getElementById("felulet").innerHTML +=  '<embed src="memoria.swf" quality="high" width="500" height=600>';
					boolFeluletUres=false;
					
			   }
			   
			   
			</script>	<!--			SCRIPT		------------------------------------------------------------------>
			<script>	<!--			SCRIPT		------------------------------------------------------------------>
			   //pontszámítás
			   
			   
				// if(document.getElementById("kezdetbenElrejtve").innerHTML != null)
						strKezdetbenElrejtve = document.getElementById("kezdetbenElrejtve").innerHTML;
				document.getElementById("kezdetbenElrejtve").innerHTML = null;
			   
			   // if(toplistaLatszikE)	{
					// toplistaMutat();
					// toplistaLatszikE = false;
			   // }
			   
			   /*
			   <?php
			   if($toplistaLatszikE)	{
					echo '<script>toplistaMutat();<script>';
					$toplistaLatszikE = false; 
			   }
			   ?><?php $toplistaLatszikE = true; ?>
			   */
			   
			   function toplistaKuldheti() {
					toplistaMutat();
					
					 
				   //hidden input-ok beállítása: points, time, game, date;
					document.getElementById("pont").value=points;
					document.getElementById("ido").value=time;
					document.getElementById("jatekfajta").value=game;
					document.getElementById("mikor").value=date;
				}
				
				function toplistaMutat() {
					 document.getElementById("kezdetbenElrejtve").innerHTML = strKezdetbenElrejtve;
					// document.getElementById("kezdetbenElrejtve").innerHTML += "Your score: "+ points + "points " + time + " s ";
				}
								
				function validNev() {//alert("fut1");
					nev = document.getElementById("nev");	
					
					if(nev.value.length > 10 || nev.value.length < 2) {
						alert("incorrect name! (length between 2 and 10, your is: "+nev.value.length);
						return false;
					}//alert("true");
					return true;
				}
				
			</script>	<!--			SCRIPT		------------------------------------------------------------------>	
			
			<div id="sriptToBePasted">
			
			</div>
			
			<table border=0 cellpadding=10>
			<tr>
					<td colspan=7>
						<font color=green><b>Play with
						</td></tr>
				<tr>
					<td>
						 <font color=green><b>♕
					</td>
					<td>
						<a href="javascript:jatekValaszt(0)">traditional 4x5</a>
					</td>
					<td>
						<a href="javascript:jatekValaszt(2)">4x5</a> <!--clickComplementer-->
					</td>
					<td>
						<a href="javascript:jatekValaszt(4)">level 2</a>
					</td>
					<td>
						<a href="javascript:jatekValaszt(6)">infinity</a> <!-- <font size=5>&#8734;</font> -->
					</td>
					<td>						
						<a href="javascript:other()">Other</a>
					</td>
				</tr>
				
				<tr>
					<td>
						 <font color=green><b>♫ ♪
					</td>
					<td>
						<a href="javascript:jatekValaszt(1)">traditional 5x6</a>
					</td>
					<td>
						<a href="javascript:jatekValaszt(3)">4x4</a> <!--clickComplementer-->
					</td>
					<td>
						<a href="javascript:jatekValaszt(5)">4x4 more instruments</a>
					</td>
					<td>
						<a href="javascript:jatekValaszt(7)">level 3</a> <!-- <font size=5>&#8734;</font> -->
					</td>
					<td>
						<a href="javascript:jatekValaszt(8)">5x6</a>
					</td>
					
				</tr>
			</table>
			
			<!-- 
			<a href="#" onclick="jatekValaszt(0)">Play game!</a>
				<img  onclick="play()" id="m" src="images/1.jpg">
				<br />
			-->

		</div>

		

	</body>
</html>
