
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

let filter=document.querySelector(".region");
let span_region=document.querySelector(".region span");
let filter_re=document.querySelector(".filter_region");

let filter_region=document.querySelectorAll(".filter_region div");

filter.addEventListener("click",()=>{
  filter_re.classList.toggle("visible_hidden");
 
})
 
  filter_region.forEach((e)=>{
    e.addEventListener("click",(f)=>{
      
      filter_region.forEach((d)=>{
        d.classList.remove("active");
      })
      e.classList.add("active");
      if(e.classList.contains("active")){

        span_region.textContent=e.textContent;

      }
    })
  })

 
let list = document.querySelector("#countries-list");

fetch('data.json')
      .then(response => response.json())
      .then(data => {
        
        
        data.forEach(country => {
          
          CreateInformationCountry(country);

        });
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => {
          const searchValue = searchInput.value.toLowerCase();
          list.innerHTML = ''; 
          data.filter(country => country.name.toLowerCase().includes(searchValue))
            .forEach(country => {
              CreateInformationCountry(country);
          
            });
        });

      });

let countryName;

function CreateInformationCountry(country) {
  const li = document.createElement('li');
  li.innerHTML = `
    <img src="${country.flags.svg}" alt="">
    <h6 class="name_country">${country.name}</h6>
    <div class="population">
        <span class="span1">Population:</span>
        <span class="span2">${country.population}</span>
    </div>
    <div class="region">
        <span class="span1">Region:</span>
        <span class="span2">${country.region}</span>
    </div>
    <div class="capital">
        <span class="span1">Capital:</span>
        <span class="span2">${country.capital}</span>
    </div>
  `;
  let h6 = li.querySelector('.name_country');
  h6.addEventListener("click", () => {
    
    countryName = country.name;
    localStorage.setItem('countryName', countryName);
    location.href = "country_if.html";
  })
  list.appendChild(li);
}

filter_region.forEach(continent => {
  continent.addEventListener('click', () => {
    const selectedContinent = continent.innerHTML;
    
    showcontinent(selectedContinent);
  });
});
function showcontinent(continent){
  fetch('data.json')
  .then(response=>response.json())
  .then(data=>{
    
    list.innerHTML = '';

      data.filter(country => country.region === continent)
        .forEach(country => {
          CreateInformationCountry(country)
        });
  })
}


