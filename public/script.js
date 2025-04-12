/*
 to respond to the submit button
*/
function solve(){
    // access the form defined in index and create a form data object using FormData()
    const form = document.getElementById('input_form');
    const formData = new FormData(form);
     // get the name of the celebrant
    console.log(formData.get("name"));
    const name = formData.get('name');
  
    // get and checks the gender
    console.log(formData.get('gender'));
    let gender = formData.get('gender');

  
app.get("/happy", (req, res) => {
  res.render("happy");
});
app.post("/happy", (req, res) => {
  const numGuests = req.body.number;
  const gender = req.body.gender;
  const bdayName = req.body.name;

  let guests = [];
  let attend = []; 
  
  for (let i = 1; i <= numGuests; i++) {
    const guestName = req.body[`name${i}`];
    if (guestName) {
      guests.push(guestName);
      if (req.body[`checkbox${i}`] === "on") {
        attend.push(guestName);
      }}}
  
  let guestList = `Celebrant: ${bdayName}\n Gender: ${gender}\n \nInvited Guests:\n`;
  guests.forEach((guest) => {
    guestList += ` ${guest}: ${attend.includes(guest) ? "Attended" : "Did Not Attend"} \n `;
  });
  const prn = gender === "male" ? "he's" : "she's";
  const goodFellow = `For ${prn} a jolly good fellow. For ${prn} a jolly good fellow. For ${prn} a jolly good fellow, which nobody can deny!`;
 
  const happyBday = `Happy birthday to you. Happy birthday to you. Happy birthday dear ${bdayName}. Happy birthday to you!`.split(' ');

  let song = [];

  if (attend.length > 0) {
    const words = Math.ceil(attend.length/happyBday.length)*happyBday.length;
    for (let i=0; i<words; i++) {
      song.push(`${attend[i%attend.length]}: ${happyBday[i%happyBday.length]}`);
    } 
    let lastSinger = (words - 1)%attend.length;
    let nextSinger = (lastSinger+1)%attend.length;
    song.push(`${attend[nextSinger]}: ${goodFellow}`);
  } else {
    song.push(`Everyone: ${happyBday.join(' ')}`);
    song.push(`Everyone: ${goodFellow}`);
  }
  res.render("happy", { guestList, song });
});


  
}

  // PLEASE STUDY THE CODES BELOW, BUT DO NOT CHANGE ANYTHING 

  // this function will create the needed input fields and corresponding Going checkboxes for the number of expected guests

  
  // A quick data dump on Output div to show users input on the browser.
  function printFormData() {
    const form = document.getElementById('input_form');
    const formData = new FormData(form);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h2> Output <h2>';
    for (let [key, value] of formData.entries()){
      outputDiv.innerHTML += `${key}: ${value} <br>`;
    }
    const myData = Object.fromEntries(formData.entries());
    console.log(myData)
    console.log(formData.entries())
  }
