const menutog = document.querySelector('.menutoggle');
const navigation = document.querySelector('.navigation');

menutog.addEventListener('click',function(){
    menutog.classList.toggle('active');
    navigation.classList.toggle('active');
    if(menutog.classList.contains('active')){
        menutog.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
        

    }else{
        menutog.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});












document.getElementById('copyyear').textContent = new Date().getFullYear();