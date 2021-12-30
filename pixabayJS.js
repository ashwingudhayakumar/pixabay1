const input=document.getElementById('input');
const grid=document.getElementsByClassName('grid')[0];

window.addEventListener('load',dayNightMode);

input.addEventListener('keydown',function(event){
    if(event.key==='Enter'){
        loadImg();
    }
})


function loadImg(){
    removeImages();
    const url='https://pixabay.com/api/?key=25040834-a9b86887de27587822188ef53&q='+input.value+'&image_type=photo&per_page=9';;

    fetch(url)
    .then((resp)=>{
        if(resp.ok)
            return resp.json()
        else
            alert('api not working properly');
    })

    .then(data=>{
        const imageNodes=[];
       
        for(let i=0;i<data.hits.length;i++){
            data.hits[i].previewWidth='380px';
            data.hits[i].previewHeight='200px';
            imageNodes[i]=document.createElement('div');
            imageNodes[i].className='img';
            imageNodes[i].style.background='url('+data.hits[i].previewURL+')';
            imageNodes[i].addEventListener('dblclick',function(){
                window.open(data.hits[i].previewURL,'_blank');

            })
            grid.appendChild(imageNodes[i]);
        }
    })
}

function removeImages(){
   grid.innerHTML='';
}

function dayNightMode(){
    const date=new Date();
    const hour=date.getHours();

    if(hour >=7 && hour<=17){
        document.body.style.background='whitesmoke';
        document.body.style.color='black';
    }
    else{
        document.body.style.background='black';
        document.body.style.color='white';
    }
}