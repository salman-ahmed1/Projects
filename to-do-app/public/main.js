
for (i=0;i<document.querySelectorAll(".list-inside").length;i++) {
document.querySelectorAll(".list-inside")[i].addEventListener("click", function() {

this.firstElementChild.firstElementChild.checked=true ;
this.classList.toggle("crossed")



if ( this.classList.contains("crossed")==false) {
    
    this.firstElementChild.firstElementChild.checked=false ;

}})}
