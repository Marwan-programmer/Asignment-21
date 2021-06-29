
function render(data) {
  let i=0;
  let result = "";
  for (const media of data) {
    const {index, date, media_type, title, url } = media;
    if (media_type !== 'other') {
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
    i++}
  }
  
  gallery.innerHTML = result;
}

    
export{render}    