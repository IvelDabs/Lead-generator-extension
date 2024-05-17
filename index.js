let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const ulEl2 = document.getElementById('ul-el-2')
const deleteAllBtn = document.getElementById('delete-btn') 
const deleteFistEntryBtn = document.getElementById('delete-btn2') 
const followUpBtn = document.getElementById('to-follow-up')
const tabBtn = document.getElementById('tab-btn')

// Code To Ensure that leads are continually stored in local storage and displayed even a session refresh
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderToGenerated(myLeads)
}

tabBtn.addEventListener('click', () => {
    // Query for the browser's active tab
    chrome.tabs.query(
        {
            active: true, 
            currentWindow: true 
        }, 
        function(tabs) {
            myLeads.push(tabs[0].url);
            inputEl.value = "";
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            renderToGenerated(myLeads);
        }
    );
});

function renderToGenerated(leads){
    let listItems = ''
    for(i=0; i < leads.length; i++){
    listItems += `  
        <li>
            <a href = '${leads[i] }'  target = '_blank'> ${leads[i]} </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    renderToGenerated(myLeads)
})

deleteAllBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    renderToGenerated(myLeads)
    renderToFocus(myLeads)
})

deleteFistEntryBtn.addEventListener('dblclick', () => {
    myLeads.shift()
    renderToGenerated(myLeads)
})

function renderToFocus(leads){
    let listItems = ''
    for(i=0; i < leads.length; i++){
    listItems += `  
        <li>
            <a href = '${leads[i] }'  target = '_blank'> ${leads[i]} </a>
        </li>`
    }
    ulEl2.innerHTML = listItems
}

followUpBtn.addEventListener('click', () => {
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    renderToFocus(myLeads)
    ulEl.innerHTML = ' '
})
