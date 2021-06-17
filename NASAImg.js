const inputNumber = document.getElementById('input-number')
const showBtn = document.getElementById('submit-btn')
const imageDetails = document.getElementById('image-details')
const gallery = document.getElementById('gallery');
let information = [];///this is from data inside fetch

// events listeners
inputNumber.addEventListener('input', function () {
  if (Number(inputNumber.value)) {
    showBtn.removeAttribute('disabled')
  } else {
    showBtn.setAttribute('disabled', true)
  }
})


showBtn.addEventListener('click', function (event) {
  event.preventDefault()

  imageDetails.innerHTML = ""; /////if we click showBtn the section imageDetails will be removed 

  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=8PrMHpPeTU4lrZx2fqyzPtV086hewfctfuTEIEDu&count=${inputNumber.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      information=data;
      render(data);
      
     
    })
})



// function of render imgs
function render(data) {
  let i=0;
  let result = "";
  for (const media of data) {
    const {index, date, media_type, title, url } = media;
    
      result += `
      <div class="gallery-item" data-index=${i}>
        <h4>${media_type}</h4>
        <div class="overlay">
          <h3>${title}</h3>
          <p>${date}</p>
        </div>
        <embed src="${url}">
      </div>
    `
    i++
  }
  gallery.innerHTML = result;
}


///// to show the image that you click with Details
gallery.addEventListener('click', function (event) {
  if (event.target.classList.value === "overlay" || event.target.parentElement.classList.value === "overlay") {
    let itemIndex = event.target.parentElement.getAttribute("data-index");
    let item=information[Number(itemIndex)]
    imageDetails.innerHTML = renderItemDetails(item);
    
  }
    
})



function renderItemDetails(item) {
  const { title, explanation, url, copyright,media_type} = item;
  let result = `
    <h2>${title}</h2>
    <p>${explanation}</p>
    <embed
      src="${url}" media_type=${media_type}>
    <button>X</button>
  `

  if (copyright) {
    result += `<p class="copyright">©copyright ${copyright}</p>`;
  }

  return result;
}


///// for close BUTTON 
imageDetails.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    imageDetails.innerHTML = "";
  }
console.log(event.target.getAttribute("media_type"))
  if (event.target.getAttribute("media_type")=== "video") {/////add target _blank for video
   
    const embed = imageDetails.getElementsByTagName("embed")[0];

    embed.setAttribute("target", "_blank");
 }
  
})



