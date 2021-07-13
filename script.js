const inputLink = document.getElementById('inputLink')
const linkBtn = document.getElementById('btn')
const list = document.querySelector('.shortResultList')

function shortenLink() {
    const newCard = document.createElement('div');
    const oldLink = document.createElement('span')
    const newLink = document.createElement('span')
    const copyBtn = document.createElement('span')

    newCard.classList.add('shorterResultContainer')
    newCard.classList.add('widthFlex')
    oldLink.classList.add('oldLink')
    newLink.classList.add('newLink')
    copyBtn.classList.add('copyBtn')
    copyBtn.innerText = "Copy"
    linkBtn.innerText = "Loading..."



    // Activate shorten link API
    const getUrl = inputLink.value;
    const dataPromise = fetch(`https://api.shrtco.de/v2/shorten?url=${getUrl}`);

    console.log(getUrl)

    dataPromise.then((response) => {
        return response.json();
    }).then((data) => {
        if (data.result.original_link.length > 80) {
            oldLink.innerText = `${data.result.original_link.substring(0, 80)}...`

        } else {
            oldLink.innerText = `${data.result.original_link}`
        }

        newLink.innerText = `${data.result.short_link}`
        list.insertAdjacentElement('afterbegin', newCard);
        newCard.insertAdjacentElement('afterbegin', newLink)
        newCard.insertAdjacentElement('afterbegin', oldLink)
        newCard.insertAdjacentElement('beforeend', copyBtn)

        linkBtn.innerText = "Shorten it!"
    })
        .catch(handleError)

    copyBtn.onclick = function () {
        copyBtn.innerText = 'Copied'
        newLink.select()
        document.execCommand("copy")

        setTimeout(() => {
            copyBtn.innerText = 'Copy'
        }, 2000)
    }
}

linkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    shortenLink();
})

function handleError(err) {
    console.log("Error");
    console.log(err);
}