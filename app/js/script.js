
// ****************************************************[Sticky Header]

const header = document.querySelector('.header');

window.addEventListener('scroll', ()=>{
    if(window.pageYOffset > 120){
        header.classList.add('add')
    }
    else{
        header.classList.remove('add')
    }
})

const hero = document.querySelector('.hero');
window.addEventListener('load', ()=>{
    hero.classList.add('anim')
})


// *******************************************************[Short Link]

// ***************************************************************************
// *                                                                         *
// * https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html    *                                                                     * 
// *                                                                         *
// *                                                                         *
// ***************************************************************************  


const shortLink = document.querySelector('.shorten-link');
const shortLinkBtn = document.querySelector('.btn')
const urlInput = document.querySelector('.urlInput');
const load = document.querySelector('.loading__content');


const getUrl = async () =>{
    try{
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
        const data = await res.json();
        let shortUrl1 = data.result.short_link;
        getUrlLink(shortUrl1);
    }
    catch(err){
        alert(`Link Cannot be generated ${err} Check your url and try again`)
        valid.innerText = `${err}`
        error()
    }
}

// ******************************************************[Error message]

const error = () =>{
    load.classList.remove('load')
    // let urlContent = document.createElement('div');
    // urlContent.classList.add('links-sec')
    
    // urlContent.innerHTML = `

    //        <p class="link__input">${err}</p>

    // `
    // shortLink.appendChild(urlContent);
}

// ******************************************************[URL link]
const getUrlLink = (link1) =>{
    load.classList.remove('load')
    let urlContent = document.createElement('div');
    urlContent.classList.add('links-sec')
    
    urlContent.innerHTML = `

           <p class="link__input">${urlInput.value}</p>
           <div class="link__short">
                <div class="link">
                     <input class="short-link" value = "${link1}" autocorrect="off" ></input>
                     <button class="copy-btn">Copy</button>
                </div>
           </div>

    `
    shortLink.appendChild(urlContent);

    const copyBtn = document.querySelectorAll('.copy-btn');
    const urlLink = document.querySelectorAll('.short-link');
    copyBtn.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.innerText = "Copied!"
            button.classList.add('copied')
            urlLink.forEach((link)=>{
                link.select();
            })
            document.execCommand('copy');    
        })
    })
}

// **********************************************************[Event listner]

shortLinkBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    validation();
    getUrl();
    if(shortLink.innerText == "Failed to fetch"){
        load.classList.remove('load')
    }
    else{
        load.classList.add('load')
    }
})

urlInput.addEventListener('input', () =>{
    validation();
})


// **********************************************************[Url Validation]

const valid = document.querySelector('.valid')
const validation = () =>{
    if(urlInput.value === ""){
        valid.classList.add('v')
        urlInput.classList.add('input-err')
        valid.innerText = "Please add a link"
    }
    else if(urlInput.value > 4){
        valid.classList.add('v')
        urlInput.classList.add('input-err')
    }
    else{
        valid.classList.remove('v');
        urlInput.classList.remove('input-err')
    }
}





// ***************************************[Mobile Menu]

const mobileMenu = document.querySelector('.header__hamburger');
const mobileNav = document.querySelector('.mobile__nav');
mobileMenu.addEventListener('click',()=>{
    mobileNav.classList.toggle('visible')
    if(mobileMenu.classList.contains('open')){
        mobileMenu.classList.add('close')
        mobileMenu.classList.remove('open')
        document.body.classList.remove('no-scroll')
    }
    else{
        mobileMenu.classList.add('open')
        mobileMenu.classList.remove('close')
        document.body.classList.add('no-scroll')
    }
})
