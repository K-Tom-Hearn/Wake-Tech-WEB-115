//newId counter variable
let newId = 1

//tasks list to hold multiple iterations of taskMaster object
let tasks = []

/*event listener to ensure no actions taken prior 
to DOM being loaded*/
document.addEventListener("DOMContentLoaded", () => {

    //Get taskmanager div element and style its display
    let showTask = document.getElementById("taskmanager")
    showTask.style.display = "flex"
    showTask.style.flexDirection = "column"
    showTask.style.alignItems = "center"
    showTask.style.gap = "20px"
    showTask.style.fontSize = "20px"

    //Help button containing app use instructions
    document.getElementById("helpBtn").addEventListener("click", () => {
        alert("Welcome to Task Management Master! " +
            "Get started by entering your task (Enter Task:), selecting the task " +
            "priority from the dropdown, and whether or not the current task is " +
            "an important one. Click submit to have your current task added to the " +
            "list of tasks which appears underneath the original task entry fields. " +
            "Important tasks will be highlighted in red, and once you select that a " +
            "task is completed, a black line will cross it out. You also have the " +
            "option to delete any of the tasks. Thanks for using Task Management Master!"
        )
    })

    //Create taskMaster object when submit button is clicked
    document.getElementById("submitTask").addEventListener("click", () => {
        let taskMaster = {
            id: newId,
            name: document.getElementById("doTask").value,
            priority: document.getElementById("taskPriority").value,
            isImportant: document.getElementById("importantTask").checked,
            isCompleted: false,
            date: new Date().toLocaleDateString()
        }
        
         //Create container for tasks being displayed
        let delcheckContainer = document.createElement("div")
        delcheckContainer.style.display = "flex"
        delcheckContainer.style.alignItems = "center"
        delcheckContainer.style.gap = "5px"

        // Span element holds text for tasks being displayed
        let taskSpan = document.createElement("span")
        taskSpan.style.border = "1px solid #ccc"
        taskSpan.style.padding = "6px 10px"
        taskSpan.style.borderRadius = "4px"
        taskSpan.style.width = "fit-content"
        
        /*Highlights task being displayed in red if user selects
        isImportant checkbox*/
        if (taskMaster.isImportant) {
            taskSpan.style.backgroundColor = "red"
        }

        /*Crosses through the task being displayed with a black line
        if user selects isCompleted checkbox*/
        if (taskMaster.isCompleted) {
            taskSpan.style.textDecoration = "line-through"
        }

        //Current task info gets displayed for taskmanager div
        taskSpan.innerHTML = `
            <strong>Task:</strong> ${taskMaster.name} |
            <strong>Priority:</strong> ${taskMaster.priority} |
            <strong>Date:</strong> ${taskMaster.date} 
        `
        /*input checkbox for isCompleted method
        user can select if task is complete*/
        let taskCheck = document.createElement("input")
        taskCheck.label = "Task Complete?"
        taskCheck.type = "checkbox"
        taskCheck.checked = taskMaster.isCompleted
        taskCheck.id = `taskCompleted_${newId}`

        //Label for task complete input element
        let taskCheckLabel = document.createElement("label")
        taskCheckLabel.textContent = "Task Complete?"
        taskCheckLabel.setAttribute("for", taskCheck.id)

        //Updates console if user clicks task complete checkbox
        taskCheck.addEventListener("change", () => {
            taskSpan.style.textDecoration = taskCheck.checked ? "line-through" : "none"
            taskMaster.isCompleted = taskCheck.checked
            console.log(JSON.stringify(tasks, null, 2))
            console.log("taskMaster objects:\n", tasks)
        })

        /*Delete button to remove task from taskmanager
        and update console log*/
        let deleteTask = document.createElement("button")
        deleteTask.textContent = "Delete"
        deleteTask.addEventListener("click", () =>{
            tasks = tasks.filter(t => t.id !== taskMaster.id)
            showTask.removeChild(delcheckContainer)
            console.log(JSON.stringify(tasks, null, 2))
            console.log("taskMaster objects:\n", tasks)
        })

        // Append elements to container which displays tasks
        delcheckContainer.appendChild(taskSpan)
        delcheckContainer.appendChild(taskCheckLabel)
        delcheckContainer.appendChild(taskCheck)
        delcheckContainer.appendChild(deleteTask)

        /*Appends taskmanager div with container that
        holds tasks to display*/
        showTask.appendChild(delcheckContainer)

        /* Save to tasks array and updates
        newId iteration counter*/
        tasks.push(taskMaster)
        newId++

        //Clears input fields
        document.getElementById("doTask").value = ""
        document.getElementById("importantTask").checked = false

    })
})
