'use strict'

const data = [
    {
        title       : 'John Wick',
        image       : 'assets/images/John_Wick_Chapter_3_Parabellum.png',
        date        : 'May 9, 2019',
        description : `John Wick makes his way through Manhattan before he is labeled "excommunicado" for the unauthorized killing of High Table crime lord Santino D'Antonio on the grounds of the New York Continental Hotel.[N 1] At the New York Public Library, he retrieves a marker medallion and a crucifix. He is injured in a fight with a hitman named Ernest and seeks medical treatment from an underworld doctor, but his $14 million bounty activates before the doctor can finish. John finishes suturing himself and shoots the doctor in the stomach and shoulder to protect him from repercussions. He is quickly pursued by various gangs of assassins, whom he kills in an antiques store, in a stable, and in a chase while on horseback.`,
        actors      : ['Keany Reevas', 'Halle Berry', 'Ian McShane', 'Lance Reddick'],
    
    },
    {
        title       : 'Captain Marvel',
        image       : 'assets/images/captainmarvel.jpg',
        date        : 'February 27, 2019',
        description : `In 1995, on the Kree Empire's capital planet of Hala, Starforce member Vers suffers from amnesia and recurring nightmares involving an older woman. Yon-Rogg, her mentor and commander, trains her to control her abilities while the Supreme Intelligence, the artificial intelligence that rules the Kree, urges her to keep her emotions in check.

        During a mission to rescue an undercover operative infiltrating a group of Skrulls, alien shapeshifters with whom the Kree are at war, Vers is captured by Skrull commander Talos. A probe of Vers's memories leads them to Earth. Vers escapes and crash-lands in Los Angeles. Her presence attracts S.H.I.E.L.D. agents Nick Fury and Phil Coulson, whose investigation is interrupted by a Skrull attack. Vers recovers a crystal containing her extracted memories in the ensuing chase while Fury kills a Skrull impersonating Coulson. Talos, disguised as Fury's boss Keller, orders Fury to work with Vers and keep tabs on her.`,
        actors      : ['Brie Larson', 'Samuel L. Jackson', 'Ben Mendelsohn', 'Djimon Hounsou'],
    
    },
    {
        title       : 'Venom',
        image       : 'assets/images/Venom.png',
        date        : 'October 1, 2018 ',
        description : `While exploring space for new habitable worlds, a probe belonging to the bio-engineering corporation Life Foundation discovers a comet covered in symbiotic lifeforms. The probe returns to Earth with four samples, but one escapes and causes the ship to crash in Malaysia. The Life Foundation recovers the other three and transports them to their research facility in San Francisco, where they discover that the symbiotes cannot survive without oxygen-breathing hosts, which often fatally reject the symbiosis. Investigative journalist Eddie Brock reads about these human trials in a classified document in the possession of his fiancée Anne Weying, an attorney preparing a lawsuit defense for the Life Foundation. Brock confronts Life Foundation CEO Carlton Drake about the trials, leading to both Brock and Weying losing their jobs. Consequently, Weying ends their relationship.`,
        actors      : ['Tom Hardy', 'Michelle Williams', 'Riz Ahmed', 'Scott Haze'],
    
    },
    {
        title       : 'Captain America: The First Avenger',
        image       : 'assets/images/Captain_America.jpg',
        date        : 'July 19, 2011',
        description : `n the present day, scientists in the Arctic uncover an old, frozen aircraft. In March 1942, Nazi lieutenant general Johann Schmidt and his men steal a mysterious relic called the Tesseract,[N 2] which possesses untold godly powers, from the town of Tønsberg in German-occupied Norway.

        In New York City in 1943, Steve Rogers is rejected for World War II military recruitment due to his various health and physical problems. While attending an exhibition of future technologies with his best friend, Sgt. James "Bucky" Barnes, Rogers again attempts to enlist. Overhearing Rogers' conversation with Barnes about representing his country in the war, Dr. Abraham Erskine allows Rogers to enlist. He is recruited into the Strategic Scientific Reserve as part of a "super-soldier" experiment under Erskine, Colonel Chester Phillips, and British agent Peggy Carter. Phillips is unconvinced by Erskine's claims that Rogers is the right person for the procedure but relents after seeing Rogers jump on a grenade to save his comrades, unaware that it is a test. The night before the treatment, Erskine reveals to Rogers that Schmidt underwent an imperfect or unready version of the procedure and suffered permanent side-effects.`,
        actors      : ['Chris Evans', 'Tommy Lee Jones', 'Hugo Weaving', 'Hayley Atwell'],
    
    },
    {
        title       : 'Hulk',
        image       : 'assets/images/Hulk_movie.jpg',
        date        : 'June 20, 2003',
        description : `David Banner is a genetics researcher trying to improve human DNA by experimenting on himself. His wife, Edith, soon gives birth to their son Bruce. David realizes Bruce inherited his mutant DNA and attempts to find a cure. Representing the government, Thaddeus "Thunderbolt" Ross shuts down David's research after discovering his dangerous experiments. In a fit of rage, David causes the facilities' gamma reactor to explode. He tries to kill Bruce but accidentally stabs Edith, causing a traumatized Bruce to suppress the memories. Ross arrests David, sending him to a mental hospital. Then Ross puts the 4-year-old Bruce into foster care. Mrs. Krenzler adopts him, after which Bruce takes on the name and grows up believing his birth parents are dead.`,
        actors      : ['Eric Bana', 'Jennifer Connelly', 'Sam Elliott', 'Josh Lucas'],
    
    },
    {
        title       : 'The Amazing Spider-Man',
        image       : 'assets/images/The_Amazing_Spider-Man_theatrical_poster.jpeg',
        date        : 'June 30, 2012',
        description : `A young Peter Parker discovers that his father Richard Parker's study has been burglarized. Peter's parents gather hidden documents, take Peter to the home of his Aunt May and Uncle Ben, and then mysteriously depart.

        Years later, a teenage Peter attends Midtown Science High School, where he is bullied by Flash Thompson, and has caught the eye of Gwen Stacy. At home, Peter finds his father's papers, and learns his father worked with fellow scientist Dr. Curt Connors at Oscorp in the field of cross-species genetics. Sneaking into Oscorp, Peter enters a lab where a "biocable" is under development from genetically modified spiders, one of which bites him. He later discovers he has developed spider-like abilities, such as super-strength, sharp senses, reflexes, agility and speed.`,
        actors      : ['Andrew Garfield', 'Emma Stone', 'Rhys Ifans', 'Denis Leary'],
    
    },
    {
        title       : 'Men in Black II',
        image       : 'assets/images/Men_in_Black_II_Poster.jpg',
        date        : 'July 3, 2002',
        description : `In July 2002, Men in Black Agent J is called to investigate the murder of an alien, Ben, at his pizzeria. The waitress, Laura Vasquez, tells him that the murderers are Serleena, a shapeshifting, plant-like Kylothian who has taken the form of a Victoria's Secret lingerie model, and her two-headed servant Scrad and Charlie. Laura says they were looking for something called the Light of Zartha. J is strongly attracted to Laura, and in violation of MiB rules, does not neuralyze her to erase her memories.

        J finds that little is known about the Light of Zartha, except that it is immensely powerful. As he investigates the crime, every lead points to his former partner and mentor, Agent K, who was neuralyzed upon retirement five years previous and remembers nothing of his MiB service. In Truro, Massachusetts, where K is now the town's postmaster, J convinces him by proving that all of his fellow postal workers are aliens. Back in New York City, Serleena along with Scrad and Charlie launch an attack on MiB headquarters before K's neuralyzation can be reversed, but Jack Jeebs has an illegal deneuralyzer in his basement. K regains his memories, but remembers that years before, he neuralyzed himself specifically to erase what he knew of the Light of Zartha and those memories have not returned. As a precaution, he left himself a series of clues.`,
        actors      : ['Tommy Lee Jones', 'Will Smith', 'Lara Flynn Boyle', 'Johnny Knoxville'],
    
    }
];

let card_list = document.querySelector('#card-list');
let card_viev = document.querySelector('#card-view');
let btn_all = document.querySelector('#button-all');
renderOutput(0);




function getView(item, key) {
    let view = `<div class="view__left"><div class="view__title">${item.title}</div>`;
    view += `<div class="view__date">${item.date}</div>`;
    view += `<div class="view__actors">${getActors(item.actors)}</div>`;
    view += `<div class="view__detail">${item.description}</div>`;
    view += `</div>`;
    view += `<div class="view__right"><img class="view__poster" src="${item.image}"></div>`;
    //view += `<div class="view__right"><img class="view__poster" src="http://listup.me/${item.image}"></div>`;

    return view;
}

function getActors(actors) {
    let res = '';
    actors.forEach((i, k, actors) => {
        res += `<div class="view__actors_item">${i}</div>`;
    });

    return res;
}

function showItem() {
    renderOutput(this.id);
}

function renderOutput(data_key) {
    //console.log(data);
    card_list.innerHTML = '';
    card_viev.innerHTML = '';
    data.forEach((item, key, data) => {
        card_list.insertAdjacentHTML('beforeEnd', `<div id="${key}" class="card__list_item${(data_key == key) ? ' list_active' : ''}">${item.title}</div>`);
        card_viev.insertAdjacentHTML('beforeEnd', `<div class="card__view_item${(data_key == key) ? ' view_active' : ''}">${getView(item, key)}</div>`);
    
    });

    document.querySelectorAll('.card__list_item').forEach((item, key, arr) => {
        item.addEventListener('click', showItem);
    });
    document.querySelectorAll('.view__like').forEach((item, key, arr) => {
        item.addEventListener('click', addFavorite);
    });
}


function switchAll() {
    if(btn_fav.classList.contains('button_active')) {
        btn_all.classList.toggle('button_active');
        btn_fav.classList.toggle('button_active');
        renderOutput(0);
    }
}
