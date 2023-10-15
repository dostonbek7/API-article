const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id')

const API = `http://localhost:3000/articles/${id}`;

const ul = document.getElementById('articlesList');

const request = new  XMLHttpRequest();
function updateUI(article){
  const contentForUL = document.createDocumentFragment();
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const a = document.createElement('a');
    const i = document.createElement('i');
    const pBody = document.createElement('p');
    const img = document.createElement('img');

    img.src = article.image;
    img.style.height = '350px';

    li.classList.add('card');

    const fragmentTitle = document.createDocumentFragment();
    const fragmentAuthor = document.createDocumentFragment();
    const content = document.createDocumentFragment();


    span.textContent = "Title: ";
    span.setAttribute('style', 'font-weight: normal');
    h3.appendChild(span);
    fragmentTitle.textContent = article.titl;
    h3.appendChild(fragmentTitle);

    i.textContent = "Author: ";
    i.setAttribute('style', 'font-weight: normal');
    p.appendChild(i);
    fragmentAuthor.textContent = article.author;
    p.appendChild(fragmentAuthor);
    pBody.textContent = article.body;

    a.textContent = "Home";
    a.setAttribute("href", "/index.html");

    content.append(img,h3, p, pBody, a);
    li.appendChild(content);
    contentForUL.appendChild(li);

  ul.appendChild(contentForUL);
}

request.addEventListener('readystatechange',()=>{
  if(request.readyState !==4){
    console.log('Loading ...');
  }else if(request.readyState == 4 && request.status == 200){
    const data = JSON.parse(request.responseText);
    updateUI(data);
  }else if(request.readyState == 4){
    console.log('something went wrong');
  }
})

request.open('GET', API)
request.send()
