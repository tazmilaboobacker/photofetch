/*
    Pexels API Authorization: 
*/

const auth = "nXrfNwfZrwt41Yy0Jnuq8sXC6u6me62hcuT3tcbAwIv73ZOkmE7v4JH3";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchLink;
let currentSearch;
let page = 1;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

function updateInput(e) {
    searchValue = e.target.value;
}
async function fetchApi(url){
    const dataFetch =await fetch(url,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:auth,
        },

    });
    const data = await dataFetch.json();
    return(data)
    


}

function generatePicture(data){
    data.photos.forEach((photo)=>{
        const galleryImg = document.createElement("div")

        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);

    
    })
}

async function curatedphoto()  {
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=18&page=1")
    generatePicture(data)
 

    
}
async function searchPhotos(query) {
    clear();
    const data = await fetchApi(
       ` https://api.pexels.com/v1/search?query=${query}&per_page=18&page=1`);
        generatePicture(data)
}
function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
}
curatedphoto();
 async function loadMore () {
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`;
    }
    else{
        fetchLink =` https://api.pexels.com/v1/curated?per_page=16&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePicture(data);


 }
 
 more.addEventListener("click", loadMore)