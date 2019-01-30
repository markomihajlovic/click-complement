			//setTimeout(function(){alert("hi")}, 1000);
			var kartyakTomb = new Array();	//számok
			var strKepTomb = new Array();	//elérési útvonal
			var latszikETomb = new Array();
			var mostani, elozo=4400, megelozo=4400;
			var db=20, sorTores=0, sorToresAktualisErteke=5;
			var felforditottDb=0;
			var megtalaltParDb=0, rosszParForditas=0;
			var leKellVenni = false;
			var kartyakTomb2 = new Array();
			var kartyakTomb3 = new Array();	//a felhasználó alakítja ki
			//var elsoTombHossza=db/2;
			
			function jatekIndit() {
			//document.write(kartyakTomb);document.write(kartyakTomb2);document.write(kartyakTomb3);
			
			//alert(kartyakTomb+" szoveg");
				//document.write(kartyakTomb.length);
				//document.write(elozo + " játék indul<br>");
				if(!boolFeluletUres) {
					document.getElementById("felulet").innerHTML = null;
					valtozokatBeallit();
				}
					

                game = "cc 4x5";
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
				kartyakTomb = new Array();
				kartyakTomb2 = new Array();
				kartyakTomb3 = new Array();
				rosszParForditas=0;
			}
			
			function kartyaFeltolt() {
				//kartyakTomb.length=db/2;
				//kartyakTomb2.length=db/2;
				
				for(i=0; i<db/2; i++) {
					kartyakTomb.push(i);	//document.write(kartyakTomb.pop());
					kartyakTomb2.push(i);
					
					kartyakTomb3.push(-1);	//csak h benne is legyen 2x db/2 elem
					kartyakTomb3.push(-1);	//elõször 0-t tettem be, ez baj volt
				}
				//document.write(kartyakTomb.length);
				//document.write("");
				shuffle(kartyakTomb);
				shuffle(kartyakTomb2);
				//document.write(kartyakTomb);document.write(kartyakTomb2);
			} // function kartyaFeltolt()
			
			function shuffle(mit) {
				for(i=0; i<mit.length; i++) {
					var veletlen = Math.floor(Math.random() * mit.length)
					var csere;
					
					csere = mit[i];
					mit[i] = mit[veletlen];
					mit[veletlen] = csere;
				}
			}
			/*
			function shuffle(mit) {
				for(i=0; i<db; i++) {
					var veletlen = Math.floor(Math.random()*db)
					var csere;
					
					csere = kartyakTomb[i];
					kartyakTomb[i] = kartyakTomb[veletlen];
					kartyakTomb[veletlen] = csere;
				}
				for(i=0; i<db; i++) {
					var veletlen = Math.floor(Math.random()*db)
					var csere;
					
					csere = kartyakTomb2[i];
					kartyakTomb2[i] = kartyakTomb2[veletlen];
					kartyakTomb2[veletlen] = csere;
				}
			}*/
			
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
						strKepTomb[j] = "images/" + kartyakTomb3[j] + ".jpg";
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
				
				//document.getElementById("teszt").innerHTML += "<br>"+ mostani;
kattintasokSzama++;
                if(kattintasokSzama == 1)
                    begin = new Date();
                if(kattintasokSzama == db)
                    end = new Date();
					
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

							if(kartyakTomb3[mostani] == -1) {		//az a kérdés, hogyan kerül elem a 3. tömbbe					
								//if(elsoTombHossza!=0) {
								//	kartyakTomb3[mostani]=kartyakTomb[--elsoTombHossza];
								if(kartyakTomb.length!=0) {
									kartyakTomb3[mostani]=kartyakTomb.pop();
								
									
									//document.getElementById("felulet").innerHTML = kartyakTomb;
									//document.write("ITT");
								}
								else {
									kartyakTomb3[mostani]=kartyakTomb2.pop();
									
								}
							}
							strKepTomb[mostani] = "images/" + kartyakTomb3[mostani] + ".jpg";
							document.getElementById("kep" + mostani).src = strKepTomb[mostani];
							
							
							felforditottDb++;
							latszikETomb[mostani]=true;

							if(felforditottDb==2) {
									//System.out.println("Fut: felforditottDb==2");
									felforditottDb=0;
									if(kartyakTomb3[mostani] == kartyakTomb3[elozo])
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
											
                                            
                                            if(2*megtalaltParDb == db)  {//mindet megtalálta
                                                time = (end - begin)/1000;
                                                
                                                //dátum "2002-05-05" formájú legyen:
                                                date = begin.getFullYear() + '-' + ((begin.getMonth()+1 <10) ? "0" : "") + (begin.getMonth() + 1) + '-' + ((begin.getDate()<10) ? "0" : "") + begin.getDate();
                                                //document.write(date);
                                                
                                                points = 10*(2*megtalaltParDb - 2*rosszParForditas + db/2 + (db/2 % 2 == 1) ? 1 : 0) / time;    //+db/2, mert az elso db/2 a cc játékoknál biztos rossz, plan darabszám esetén még 1 rossz
                                                                        
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