
function createimgdiv() {
  let imgdiv = document.createElement('div')
  // imgdiv.id = 'unsplashglobe'
  // using proto objects to add id and style values
  imgdiv.style = `
  height: 50vh;
  max-width: 100vw;
  background-image: url("https://images.unsplash.com/photo-1521685468847-de0a1a3c41a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-position: center;
  `
  document.body.appendChild(imgdiv)
}
createimgdiv()