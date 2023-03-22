console.log('Our JavaScript is running!');

const myP = document.getElementById('purple-text');

console.log(myP);

myP.addEventListener('click', function() {
    myP.classList.add('italic-text');
});
