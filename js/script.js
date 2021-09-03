

// Get the modal
var modal = document.getElementById("modalBox");

// Get the button that opens the modal
var button = document.getElementById("detail-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function moveLeft(sliderid) {
    let slider, slidercontent, textIndent;

    slider = document.getElementById(sliderid);

    if (!slider) return false;

    slidercontent = slider.getElementsByClassName('slidercontent')[0]; 

    textIndent = parseInt(slider.style.textIndent || 0);
    
    slider.style.textIndent=(textIndent-25)+"%";

    slider.getElementsByClassName('arrow left')[0].style.visibility = "visible";


    if (slider.style.textIndent >= -50+"%")  {
       slider.style.textIndent= -50+"%";
       slider.getElementsByClassName('arrow right')[0].style.visibility = "hidden";    
    };

    return true;
};

function moveRight(sliderid) {
    let slider, slidercontent, textIndent;

    slider = document.getElementById(sliderid);

    if (!slider) return false;

    slidercontent = slider.getElementsByClassName('slidercontent')[0];

    textIndent = parseInt(slider.style.textIndent || 0);
    
    slider.style.textIndent=(textIndent+25)+"%";

    slider.getElementsByClassName('arrow right')[0].style.visibility = "visible";

    if (slider.style.textIndent >= 0+"%")  {
        slider.style.textIndent=(0)+"%";
        slider.getElementsByClassName('arrow left')[0].style.visibility = "hidden";
    };

    return true;
};

setTimeout(function(){ document.getElementById('loading').style.display = 'none'; }, 1000);