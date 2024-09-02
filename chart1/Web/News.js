const news=document.getElementById('News');

news.addEventListener('click',()=>{
    console.log("Let me guid you")
})


let data = null;
async function getdata() {
    try {
        
        const data = await fetch(`http://localhost:3000/data`)

        return await data.json();
    } catch (error) {
        alert("Please entre a valid value")
    }
}

data=getdata()
console.log(data);x
