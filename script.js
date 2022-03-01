let contentWrapper = document.querySelector('#content');
let postCounter = 0;
let loadMoreBtn = document.querySelector('#loadMoreBtn')
let popup = document.querySelector('.popup')

async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function generateCard(object, i) {
    console.log(i)
    //create all elements needed for the card
    //adding classes
    //setting attributes
    //adding innerText
    let card = document.createElement('div');
    card.classList.add('card'); // creating the card wrapper
    // top part of the card, containing: profile img, date, name and ig logo
    let topPart = document.createElement('div');
    topPart.classList.add('card_top');
    let profile = document.createElement('div');
    profile.classList.add('profile');
    let profileImage = document.createElement('img');
    profileImage.classList.add('profile_img');
    profileImage.setAttribute('src', object.profile_image);
    profileImage.setAttribute('alt', 'Profile Image');
    let profileInfo = document.createElement('div');// wrapper for name and date
    profileInfo.classList.add('profile_info');
    let profileName = document.createElement('h5');
    profileName.classList.add('profile_name');
    profileName.innerText = object.name;
    let date = document.createElement('small');
    date.innerText = object.date;
    date.classList.add('date')
    let igLogo = document.createElement('img');
    igLogo.setAttribute('src', `./images/${object.source_type}.svg`);
    igLogo.setAttribute('alt', `${object.source_type} Logo`);

    // the post and caption are the middle part of the card
    let imgWrapper = document.createElement('div'); // wrapper for the post itself
    imgWrapper.classList.add('card_img_wrapper');
    imgWrapper.style.backgroundImage = `url(${object.image})`;
    imgWrapper.addEventListener('click', function() {
        generatePopup(object);
        popup.classList.add('active');

    })
    let captionWrapper = document.createElement('div');
    captionWrapper.classList.add('card_caption_wrapper');
    let cardCaption = document.createElement('p');
    cardCaption.classList.add('card_caption');
    cardCaption.innerText = object.caption;
    
    let readMoreBtn = document.createElement('p');
    readMoreBtn.classList.add('read_more_btn');
    readMoreBtn.innerText = '...more';

    if (!object.caption) {
        readMoreBtn.toggleAttribute('hidden');

    }
    readMoreBtn.addEventListener('click', function() {
        this.previousSibling.classList.add('read_more');
        this.toggleAttribute('hidden');

    })
    // bottom part of the card, containing: like button(heart icon) and number of likes
    let bottomPart = document.createElement('div');
    bottomPart.classList.add('card_bottom');
    let likeBtn = document.createElement('img');
    likeBtn.classList.add('card_like');
    likeBtn.setAttribute('src', './images/heart.svg');
    likeBtn.setAttribute('alt', 'Like Icon');
    let likesNumber = document.createElement('p');
    likesNumber.classList.add('card_like_number');
    likesNumber.innerText = object.likes;
    bottomPart.append(likeBtn, likesNumber);
    // imgWrapper.append(instagramImg);
    captionWrapper.append(cardCaption, readMoreBtn);
    profileInfo.append(profileName, date);
    profile.append(profileImage, profileInfo);
    topPart.append(profile, igLogo);
    card.append(topPart, imgWrapper, captionWrapper, bottomPart);
    contentWrapper.append(card);
    //like button function
    likeBtn.addEventListener('click', function() {
        let likes = Number(this.nextSibling.innerText);
        this.classList.toggle('liked');
        let condition = this.classList.contains('liked');
        this.nextSibling.innerText = condition ? likes + 1 : likes - 1;
    }); 
    // let markup = `
    // <div class="card">
    //     <div class="card_top">
    //         <div class="profile">
    //             <img class="profile_img" src="${object.profile_image}" alt="Profile Image">
    //             <div class="profile_info">
    //                 <h5 class="profile_name">${object.name}</h5>
    //                 <small>${object.date}</small>
    //             </div>
    //         </div>
    //         <img class="instagram_img" src="./images/instagram-logo.svg" alt="Instagram Logo">
    //     </div>
    //     <div class="card_img_wrapper">
    //         <img class="card_img" src="${object.image}" alt="Post Image">
    //     </div>
    //     <div class="card_caption_wrapper">
    //         <p class="card_caption">${object.caption}</p>
    //     </div>
    //     <div class="card_bottom">
    //         <img class="card_like" onclick="likePost()" src="./images/heart.svg" alt="Like Icon">
    //         <p class="card_like_number">${object.likes}</p>
    //     </div>
    // </div>`;
    // return markup;
    return card;
}

function generatePopup(object) {
    let popupPost = document.createElement('div');
    popupPost.classList.add('popup_post');
    let popupImage = document.createElement('div');
    popupImage.style.backgroundImage = `url(${object.image})`
    popupImage.setAttribute('alt', 'Post Img')
    popupImage.classList.add('popup_image');
    let popupLeft = document.createElement('div');
    popupLeft.classList.add('popup_left');
    let popupInfoWrapper = document.createElement('div');
    popupInfoWrapper.classList.add('popup_info_wrapper')
    let popupProfileImg = document.createElement('img');
    popupProfileImg.setAttribute('src', `${object.profile_image}`)
    popupProfileImg.setAttribute('alt', 'Profile Img')
    popupProfileImg.classList.add('popup_profile_img')
    let popupInfo = document.createElement('div');
    popupInfo.classList.add('popup_info')
    let popupName = document.createElement('h5');
    popupName.innerText = object.name;
    popupName.classList.add('popup_name')
    let popupDate = document.createElement('p');
    popupDate.innerText = object.date
    popupDate.classList.add('popup_date');
    let popupLogo = document.createElement('img');
    popupLogo.setAttribute('src', `./images/${object.source_type}.svg`);
    popupLogo.setAttribute('alt', `${object.source_type} Logo`);
    popupLogo.classList.add('popup_logo');
    let popupCaption = document.createElement('p');
    popupCaption.innerText = object.caption;
    popupCaption.classList.add('popup_caption');
    let popupLikes = document.createElement('popup_likes');
    popupLikes.classList.add('popup_likes');
    let popupLikeBtn = document.createElement('img');
    popupLikeBtn.setAttribute('src', './images/heart.svg')
    popupLikeBtn.classList.add('popup_likeBtn');
    let popupLikeNumber = document.createElement('p');
    popupLikeNumber.classList.add('popup_like_number');
    popupLikeNumber.innerText = object.likes;
    popupLeft.append(popupInfoWrapper, popupCaption, popupLikes);
    let popupInnerWrapper = document.createElement('div');
    popupInnerWrapper.classList.add('popup_inner_wrapper');
    
    popupInnerWrapper.append(popupProfileImg, popupInfo);
    popupInfoWrapper.append(popupInnerWrapper, popupLogo);
    popupInfo.append(popupName, popupDate);
    popupLikes.append(popupLikeBtn, popupLikeNumber);
    popupPost.append(popupImage, popupLeft);
    popup.append(popupPost);
       popupLikeBtn.addEventListener('click', function() {
        let likes = Number(this.nextSibling.innerText);
        this.classList.toggle('liked');
        let condition = this.classList.contains('liked');
        this.nextSibling.innerText = condition ? likes + 1 : likes - 1;

    });

}

function generatePosts(arr) {
    if (postCounter < arr.length) {
        for (let i = postCounter; i < postCounter + 4; i++) {
            let post = generateCard(arr[i], i)
            contentWrapper.append(post);
        }
        postCounter += 4;
    }
}
getData('./data.json')
    .then(data => {
        generatePosts(data);
        loadMoreBtn.addEventListener('click', function() {
            generatePosts(data);
        })
    });
