const inputedText = document.getElementById('input-field');
const srarchBtn = document.getElementById('search-btn');
const Found = document.getElementById('found');

srarchBtn.addEventListener('click', async() =>{
    const searchText = inputedText.value;
    if(searchText ===''){
        inputedText.value = '';
        alert('Search field can not me emty')
        Found.innerText = "Please Search Something";
        Found.classList.remove('d-none');
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.docs);
        displaySearchResult(data) 
    }
});

// const obj = {
// 	name:'x'
        
// }

// obj.name?obj.name:'not fount'
// obj.yera?obj.year:' not found'
const displaySearchResult = (books) => {

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(books.numFound === 0){
        inputedText.value = '';
        Found.innerText = "Sorry, Can't Find Anything For You";
        Found.classList.remove('d-none');
        // console.log('found nothing');
    }
    else{
        const usertSearchText = document.getElementById('input-field');
        const searchedWith = usertSearchText.value;
        Found.innerText = `We Found ${books.numFound} Result For You Containing ${searchedWith}. Showing ${books.docs.length} Result Now`;
        inputedText.value = '';
        Found.classList.remove('d-none');
        
            const book = books.docs;
            // console.log(book);
           
            book.forEach(book =>{

            const title = book?.title?book.title:'not found';
            const writer = book?.author_name?book.author_name:'not found';
            const publisher = book?.publisher?book.publisher: 'not found';
            console.log(publisher);
            const year = book?.first_publish_year?book.first_publish_year:'not found';
            const publish = book?.publish_place?book.publish_place:'not found';
            const language = book?.language?book.language:'not found';
            const subject = book?.subject?book.subject:'not found';
            
    
            const images = () => {
                let img;
                if(book.hasOwnProperty('cover_i') === true){
                    img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                    return img;
                }
                else{
                    img = 'image/notfoundimage.jpg ';
                    return img;
                }
            }

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                <img height="280" src="${images()}" class="card-img-top mb-3" alt="This image is not found">
                    <h5 class="card-title"><span class="text-success">Name: </span>${title}</h5>
                    <p><span class="text-success">Writer: </span>${writer}</p>
                    <p><span class="text-success">First Published In: </span>${year}</p>
                    <p><span class="text-success">Published Place: </span>${publish}</p>
                    <p><span class="text-success">Publisher: </span>${publisher[0]}</p>
                    <p><span class="text-success">Language: </span>${language}</p>
                    <p><span class="text-success">Book Subject: </span>${subject}</p>

                </div>
            </div>`;
            searchResult.appendChild(div);
        });
    }
};