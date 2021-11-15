// funtioner til det specifikke projekt
import { myFetch } from "./helpers.js";

let goalContainer = document.querySelector('.goalContainer');
let modalWrapper = document.querySelector('.modalWrapper');


// Goal List
const getGoalList = async () => {
    const data = await myFetch('https://api.mediehuset.net/sdg/goals');
    //kan først køre map når data er på plads (for at være sikker på at den ikke laver en fejl)
    //selv om at vi har lavet et catch i vores fetch så den aldrig ville kunne komme til dette punkt før 
    // data er indlæst (data && data skriver vi for at vende os til react)
    // data && data.items.map()

    data.items.map(function(item, key){
        //wrapper
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.style.backgroundColor = `#${item.color}`;
        //title
        const h2 = document.createElement('h2');
        h2.innerText = item.title;
        wrapper.append(h2);
        //icon
        const icon = document.createElement('div');
        icon.innerHTML = `${item.icon}`;
        wrapper.append(icon);
        //read more
        const readMore = document.createElement('a');
        readMore.setAttribute('class', 'read');
        readMore.innerText = 'Læs mere';
        readMore.addEventListener('click',() => {
            getGoalDetails(item.id);
            document.body.classList.add('noScoll');
        })
        wrapper.append(readMore);
        goalContainer.append(wrapper);
    });
}
getGoalList();
//

//Goal Details
const getGoalDetails = async goal_id => {
    //denne linje gør at den sletter indholdet i modalWrapper og indsætter nyt indhold når der bliver klikket på læs mere
    //den sletter indholdet da vi har været innerHTML med tom ''
    document.querySelector('.modalWrapper').innerHTML = '';
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);


    //modalWrapper
    const wrapper = document.querySelector('.modalWrapper');
    wrapper.style.backgroundColor = `#` + data.item.color;
    
    //modalContainer
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modalContainer');

    //close
    const close = document.createElement('span');
    close.setAttribute('class', 'close');
    close.innerHTML = '&times;';
    close.onclick = function(){
        modal.style.display = 'none';
        document.body.classList.remove('noScoll');
    }
    modal.append(close);

    //title
    const title = document.createElement('h2');
    title.innerText = data.item.title;
    modal.append(title);

    //icon
    const icon = document.createElement('div');
    icon.innerHTML = data.item.icon;
    modal.append(icon);

    //byLine
    const byLine = document.createElement('h3');
    byLine.innerText = data.item.byline;
    modal.append(byLine);

    //description
    const description = document.createElement('p');
    description.innerText = data.item.description;
    modal.append(description);

    //img
    const modalImg = document.createElement('img');
    modalImg.setAttribute('src', data.item.image);
    modal.append(modalImg);

    //targets
    data.item.targets.map(function(item){
        const targets = document.createElement('li');
        targets.innerText = `${item.title} ${item.description}`;
        modal.append(targets);
    });



    modalWrapper.append(modal);


}
//

