const links = document.querySelectorAll('#sidebar li');
const content = document.querySelector('.main-content');

// links[0].parentNode.removeChild(links[0]);

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000');
xhr.onreadystatechange = xhr.onreadystatechange = function () {

    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        content.innerHTML = xhr.responseText;

        const head = document.getElementsByTagName("head")[0];
        const scripts = content.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement("script");
            script.type = scripts[i].type || "text/javascript";
            if (scripts[i].src) {
                // script.src = scripts[i].src;    
            } else {
                script.text = scripts[i].innerText;
            }
            head.appendChild(script);
        }
    }
};
xhr.send();



links.forEach((link, index) => {
    if (index > 0) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(content)
            const url = link.getAttribute('data-url');
            renderDataInContainer(url, content);
        })
    }
})


renderDataInContainer = (url, content) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            content.innerHTML = xhr.responseText;

            const head = document.getElementsByTagName("head")[0];
            const scripts = content.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                const script = document.createElement("script");
                script.type = scripts[i].type || "text/javascript";
                if (scripts[i].src) {
                    // script.src = scripts[i].src;    
                } else {
                    script.text = scripts[i].innerText;
                }
                head.appendChild(script);
            }
        }
    };
    xhr.send();
}
