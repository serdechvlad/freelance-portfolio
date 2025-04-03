// document.getElementById(`contact-form`).addEventListener(`submit`, async function (event) {
//   event.preventDefault();
 
//   const formData = new formData(this);
 

//   try {
//     const response = await fetch(`https://portfolio-js.b.goit.study/api-docs`, {
//       method: `POST`,
//       body: formData
//     });
//     if (!response.ok) throw new Error('Failed to send');
//     document.getElementById(`modal`).classList.remove(`hidden`);
//     this.requestFullscreen();

//   } catch (error) {
//     alert(`Error sending message. Please check your input and try again.`);
//   }
  
// });
//  console.log(document.getElementById('contact-form'));
// document.querySelector(`.close-modal`).addEventListener(`click`, () => {
//   document.getElementById(`modal`).classList.add(`hidden`)
// });