const ul = document.getElementById('articlesList');

const API = 'http://localhost:3000/articles';

const request = new  XMLHttpRequest();
function updateUI(data){
  const contentForUL = document.createDocumentFragment();

  data.forEach((article)=>{
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const a = document.createElement('a');
    const i = document.createElement('i');

    li.classList.add('card');

    const fragmentTitle = document.createDocumentFragment();
    const fragmentAuthor = document.createDocumentFragment();
    const content = document.createDocumentFragment();


    span.textContent = "Title: ";
    span.setAttribute('style', 'font-weight: normal');
    h3.appendChild(span);
    fragmentTitle.textContent = article.title;
    h3.appendChild(fragmentTitle);

    i.textContent = "Author: ";
    i.setAttribute('style', 'font-weight: normal');
    p.appendChild(i);
    fragmentAuthor.textContent = article.author;
    p.appendChild(fragmentAuthor);

    a.textContent = "Read More";
    a.setAttribute("href", `/about.html?id=${article.id}`);
    a.style.color = 'black'

    content.append(h3, p, a);
    li.appendChild(content);
    contentForUL.appendChild(li);
  });
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
