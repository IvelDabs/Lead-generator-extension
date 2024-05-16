let myLeads = []

const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn') 
const deleteBtn2 = document.getElementById('delete-btn2') 

// Code To Ensure that leads are continually stored in local storage and displayed even a session refresh
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById('tab-btn')

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
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
            render(myLeads);
        }
    );
});

function render(leads){
    let listItems = ''
    for(i=0; i < leads.length; i++){
    listItems += `  
        <li>
            <a href = '${leads[i] }'  target = '_blank'> ${leads[i]} </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
})