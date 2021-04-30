  // DOM Elements
const previousTrade = document.querySelector('#PreviousTrades');
const peerFarmers = document.querySelector('#PeerFarmers');
const connections = document.querySelector('#Connections');

const section = document.querySelector('.section-preview');

const previousTradeTemplate = document.querySelector('#PreviousTradeTemplate');
const peerFarmersTemplate = document.querySelector('#PeerFarmersTemplate');
const connectionsTemplate = document.querySelector('#ConnectionsTemplate');

// Preprocessing section
section.appendChild(previousTradeTemplate.content.cloneNode(true));

// Helper Functions
const TemplateLoader = (template,templateNumber) => {
    const newContent = template.content.cloneNode(deep=true);
    const prevContent = section.children[0];

    prevContent.remove();
    section.appendChild(newContent);
    
    previousTrade.classList = templateNumber==0 ? ['active'] : [];
    peerFarmers.classList = templateNumber==1 ? ['active'] : [];
    connections.classList = templateNumber==2 ? ['active'] : [];

    // console.log(section.classList);
    // console.log(`${template.id} Loaded!`);
}

// Event Handlers
previousTrade.addEventListener('click',()=>TemplateLoader(previousTradeTemplate,0));

peerFarmers.addEventListener('click',()=>TemplateLoader(peerFarmersTemplate,1));

connections.addEventListener('click',()=>TemplateLoader(connectionsTemplate,2));

// menu toggler
const selectElement = function (element) {
  return document.querySelector(element);
};

let menuToggler = selectElement('.menu-toggle');
let body = selectElement('body');

//toggling menu using nav links in "mobile view" only
const toggle = () => {
  let menu=body.classList[0];
  if(menu==="open")
      body.classList.toggle('open');
}

menuToggler.addEventListener('click' , function(){
  body.classList.toggle('open');
}); 

