

let body=document.querySelector("body")
let toggle=document.querySelector(".toggle")

toggle.addEventListener("click",()=>{
  toggle.classList.toggle("active")
  body.classList.toggle("dark")
  if(!body.classList.contains("dark")){
    localStorage.setItem("mode","ligth")
  }else{
    localStorage.setItem("mode","dark")
  }
})
let getmode=localStorage.getItem("mode")
if( getmode==="dark"){
  toggle.classList.toggle("active")
  body.classList.toggle("dark")
}
let countryDetails = document.querySelector('.country-details');
let savedCountryName = localStorage.getItem('countryName');
let img=document.querySelector(".country-details .img");
let namecountry=document.querySelector(".name");
let part1=document.querySelectorAll(".part1 li");
let part2=document.querySelectorAll(".part2 li");
let borderes=document.querySelector(".border_counties .borderes")


fetch('data.json')
  .then(response => response.json())
  .then(data => {
    let country = data.find(country => country.name === savedCountryName);
    updateCountryDetails(country);
    getnamecountry(data);
    
});

function updateCountryDetails(country) {

img.src = country.flags.svg;
namecountry.innerHTML = country.name;
part1[0].innerHTML = `<p>Native Name: <span>${country.nativeName}</span></p>`;
part1[1].innerHTML = `<p>Population: <span>${country.population}</span></p>`;
part1[2].innerHTML = `<p>Region: <span>${country.region}</span></p>`;
part1[3].innerHTML = `<p>Sub Region: <span>${country.subregion}</span></p>`;
part1[4].innerHTML = `<p>Capital: <span>${country.capital}</span></p>`;
part2[0].innerHTML = `<p>Top Level Domain: <span>${country.topLevelDomain}</span></p>`;
part2[1].innerHTML = `<p>Currencies: <span>${country.currencies[0].name}</span></p>`;

let language = "";
for (let i = 0; i < country.languages.length; i++) {
  language += `${country.languages[i].name} `;
}
language = language.trim().split(" ").join(", ");
part2[2].innerHTML = `<p>languages: <span>${language}</span></p>`;

  country.borders.forEach((border) => {
    borderes.innerHTML += `<button>${border}</button>`;
  });

}
  function getnamecountry(data) { 
    let buttoncountry=document.querySelectorAll(".border_counties .borderes button");
    for(let i=0;i<data.length;i++){
      buttoncountry.forEach((button)=>{
        if(button.innerHTML === data[i].alpha3Code){
          button.innerHTML=data[i].name
        }
        
      })
      
    }
  }

