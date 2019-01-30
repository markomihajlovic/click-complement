			var kartyakTomb = new Array();	//számok
			var strKepTomb = new Array();	//elérési útvonal
			var latszikETomb = new Array();
			var mostani, elozo=4400, megelozo=4400;
			var db=20, sorTores=0, sorToresAktualisErteke=5; //db=20
			var felforditottDb=0;
			var megtalaltParDb=0, rosszParForditas=0;
			var leKellVenni = false; //a visszaKellForditani talán jobb név lett volna
						
			function jatekIndit() {
				
				//document.write(elozo + " játék indul<br>");
				if(!boolFeluletUres) {
					document.getElementById("felulet").innerHTML = null;
					valtozokatBeallit();
				}
				
				game = "traditional 4x5";
				kartyaFeltolt();
				latszikETombFeltolt();
				kirajzol();
				boolFeluletUres=false;
			}
			
			function valtozokatBeallit() {
				elozo=4400;
				megelozo=4400;
				sorTores=0;
				felforditottDb=0;
				megtalaltParDb=0;
				leKellVenni = false;
				rosszParForditas=0;
			}
			
			function kartyaFeltolt() {
				for(i=0; i<db/2; i++) {
					kartyakTomb.push(i);
					kartyakTomb.push(i);
				}
				//document.write("");
				shuffle(kartyakTomb);
			} // function kartyaFeltolt()
			
			function shuffle(mit) {
				for(i=0; i<db; i++) {
					var veletlen = Math.floor(Math.random()*db)
					var csere;
					
					csere = mit[i];
					mit[i] = mit[veletlen];
					mit[veletlen] = csere;
				}
			}
			
			function latszikETombFeltolt() {
				for(i=0; i<db; i++)
					latszikETomb[i]=false;
				//document.write("<br />" + latszikETomb);
			}
			
			function kirajzol() {
				var j;
				for(j=0; j<db; j++) {
					if(latszikETomb[j]) {
						//document.write("<br>" + "latszikETomb[j] - igen");
						strKepTomb[j] = "images/" + kartyakTomb[j] + ".jpg";
					}
					else {
						strKepTomb[j] = "images/b.jpg";
						//document.write("<br>" + "latszikETomb[j] - nem");
					}
						
						
					var str = '<img id="kep' + j + '" onclick="kepreKattintott(' + j + ')" src = "' + strKepTomb[j] + '"> ';
					
					
					sorTores++;
					if(sorTores % sorToresAktualisErteke==0)
						str+="<br />";
					
					document.getElementById("felulet").innerHTML +=  str;
					//alert(str);
					//
					
				}
			} // function kirajzol() 
			
			
			
			function kepreKattintott(kepSorszama) {
				mostani = kepSorszama;
				
				//forrás: http://www.w3schools.com/jsref/jsref_obj_date.asp
				//2013.05.18 18:22
				kattintasokSzama++;
				if(kattintasokSzama == 1)
					begin = new Date();
				if(kattintasokSzama == db)
					end = new Date();
						
				//document.getElementById("teszt").innerHTML += "<br>"+ mostani;

					if(mostani != elozo) {
							if(leKellVenni) {
									//System.out.println("Fut: leKellVenni");
									strKepTomb[elozo] = "images/b.jpg";
									strKepTomb[megelozo] = "images/b.jpg";
									document.getElementById("kep" + elozo).src = strKepTomb[elozo];
									document.getElementById("kep" + megelozo).src = strKepTomb[megelozo];
									
									
									leKellVenni = false;
									latszikETomb[elozo] = false;
									latszikETomb[megelozo] = false;

							}

							strKepTomb[mostani] = "images/" + kartyakTomb[mostani] + ".jpg";
							document.getElementById("kep" + mostani).src = strKepTomb[mostani];
							
							felforditottDb++;
							latszikETomb[mostani]=true;

							if(felforditottDb==2) {
									//System.out.println("Fut: felforditottDb==2");
									felforditottDb=0;
									if(kartyakTomb[mostani] == kartyakTomb[elozo])
									{
											//strKepTomb[elozo].removeActionListener(this);
											//strKepTomb[mostani].removeActionListener(this);
											
											strKepTomb[elozo] = "images/found.jpg";
											strKepTomb[mostani] = "images/found.jpg";
											document.getElementById("kep" + elozo).src = strKepTomb[elozo];
											document.getElementById("kep" + mostani).src = strKepTomb[mostani];
											document.getElementById("kep" + elozo).onclick = "";
											document.getElementById("kep" + mostani).onclick = "";
											
											// vagy:
											//strKepTomb[elozo].setEnabled(false);
											//strKepTomb[mostani].setEnabled(false);

											megtalaltParDb++;
											//System.out.println("megtalaltParDb: " + megtalaltParDb);
											
											
											if(2*megtalaltParDb == db)	{//mindet megtalálta
												time = (end - begin)/1000;
												
												//dátum "2002-05-05" formájú legyen:
												date = begin.getFullYear() + '-' + ((begin.getMonth()+1 <10) ? "0" : "") + (begin.getMonth() + 1) + '-' + ((begin.getDate()<10) ? "0" : "") + begin.getDate();
												//document.write(date);
												
												points = 10*(2*megtalaltParDb - 2*rosszParForditas + db/2 + (db/2 % 2 == 1) ? 1 : 0) / time;	//+db/2, mert az elso db/2 a cc játékoknál biztos rossz, plan darabszám esetén még 1 rossz
																		
												points = points.toFixed(2);
												//alert("win");
												document.getElementById("felulet").innerHTML += "<br><b>Your score:</b><br> " + "points: "+ points  + "<br>time: " + time + " s";
												toplistaKuldheti();
											}
									}
									else {
											leKellVenni = true;
											rosszParForditas++;
									}
							}
							
							megelozo=elozo;
							elozo=mostani;
					}

					//for(i=0; i<20; i++)
							//System.out.print((latszikETomb[i]) + ", ");
					//System.out.print("\n");

					
					
					
			} // function kepreKattintott() 
			
jatekIndit();