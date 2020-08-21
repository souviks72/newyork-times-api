//key=4un5toLIoYvd7uZLGjfSNYEhPPPWAYLt
//"https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=yourkey"
let body = document.body;
let main = document.createElement("div");
main.classList.add("container","container-fluid");
body.appendChild(main);

let h1 = document.createElement("h1");
h1.classList.add("h1");
h1.innerText = "The Pertinent Times";
main.appendChild(h1);

let nav = document.createElement("nav");
nav.classList.add("nav","navbar","navbar-fluid");
main.appendChild(nav);

let navTopics = ["home","world","politics","magazine","technology","science","health","sports","arts","fashion","food","travel"];
insertButtons(nav,navTopics);

let news = document.createElement("div");
news.classList.add("news","container","container-fluid");
main.appendChild(news);

getNews("home")
.then(data=>{
    data.forEach(d=>{
        news.appendChild(d);
    })
});

let navButtons = Array.from(document.getElementsByClassName('nav-btn'));
navButtons.forEach(btn=>{
    btn.addEventListener('click',function(e){
        let newsChildren = Array.from(document.getElementsByClassName('news-row'));
        newsChildren.forEach(nws=>{
            news.removeChild(nws);
        });
        getNews(e.target.innerText.toLowerCase())
        .then(data=>{
            data.forEach(d=>{
                news.appendChild(d);
            })
            
        });
    });
})
//-----------UTILITIES-------------------------------
function insertButtons(parent,topics){
    topics.forEach(topic=>{
        let btn = document.createElement("button");
        btn.setAttribute("id",topic);
        btn.classList.add("nav-btn","btn","btn-light");
        btn.innerText = topic;
        parent.appendChild(btn);
    });
}

async function getNews(topic){
    let data = await(await fetch(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=4un5toLIoYvd7uZLGjfSNYEhPPPWAYLt`)).json();
    let results = data.results;
    
    let arr = []
    // let newsContainer = document.createElement("div");
    // newsContainer.classList.add("container","container-fluid","news-container");
    results.forEach(res=>{
        let {title,abstract,published_date,url} = res;
        let urlImage = null;
        try{
            urlImage = res.multimedia[0].url;
        }catch(err){
            console.log(res.multimedia);
        }
        let months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];

        let row = document.createElement("div");
        row.classList.add("card","news-row");

        let sectionCard = document.createElement("h5");
        sectionCard.classList.add("sectionCard","h5");
        sectionCard.innerText = topic;

        let titleCard = document.createElement("h6");
        titleCard.classList.add("titleCard","h6");
        titleCard.innerText = title;

        let dateCard = document.createElement("h6");
        dateCard.classList.add("dateCard","h6");
        let dt = new Date(published_date);
        let day = dt.getDate();
        let month = months[dt.getMonth()];
        let dateString = `${month} ${day}`;
        dateCard.innerText = dateString;

        let abstractCard = document.createElement("p");
        abstractCard.classList.add("abstractCard","p");
        abstractCard.innerText = abstract;

        let a = document.createElement("a");
        a.classList.add("continueReading");
        a.setAttribute("href",url);
        a.innerText = "Continue Reading";

        let leftDiv = document.createElement("div");
        leftDiv.classList.add("leftDiv");
        leftDiv.append(sectionCard,titleCard,dateCard,abstractCard,a);
        row.appendChild(leftDiv);

        let img = document.createElement("img");
        img.setAttribute("src",urlImage);
        img.classList.add("image");
        let rightDiv = document.createElement("div");
        rightDiv.classList.add("rightDiv","img-thumbnail");
        rightDiv.appendChild(img);
        row.appendChild(rightDiv);
        
        arr.push(row);
    });
    return arr;
}