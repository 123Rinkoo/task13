// localStorage.clear();
function savetoaxios(event) {
    event.preventDefault();
    const a = event.target.userexpense.value;
    const b = event.target.userdescription.value;
    const c = event.target.usercategory.value;

    var obj = {
        expense: a,
        desc: b,
        category: c
    }
    axios.post("https://crudcrud.com/api/69108ceaeea44f1aa8138d7c5e9aaa28/addexpense", obj)
    .then(res=>showNewExpensesonScreen(res.data))
    .catch(err=>console.log(err))

}
function showNewExpensesonScreen(obj) {
    document.getElementById("ExpenseAmount").value="";
    document.getElementById("Description").value="";//ye dono isliye taaki add expense pe click krne ke baad uper khali ho jaye dabbe.
    
    const parentnode = document.getElementById("newexpense");
    const childHtml = `<li id="${obj. _id}">Rs.${obj.expense} - ${obj.desc} - ${obj.category} 
                    <button onclick="deletefromscreen('${obj._id}')">Delete Expense</button>
                    <button onclick="editexpense('${obj.expense}','${obj.desc}')">Edit Expense</button></li>`;
    parentnode.innerHTML = parentnode.innerHTML + childHtml;
}

window.onload = function () {

    axios.get('https://crudcrud.com/api/69108ceaeea44f1aa8138d7c5e9aaa28/addexpense')
    .then(res=>showOldExpensesonScreen(res.data))
    .catch(err=>console.log(err));
}
function showOldExpensesonScreen(responseArray)
{
    for(let i=0;i<responseArray.length;i++)
    {
        const parentnode = document.getElementById("newexpense");
        const childHtml = `<li id="${responseArray[i]._id}">Rs.${responseArray[i].expense} - ${responseArray[i].desc} - ${responseArray[i].category} 
                            <button onclick="deleteexpenseLOCAL('${responseArray[i]._id}')">Delete Expense</button>
                            <button onclick="editexpense('${responseArray[i].expense}','${responseArray[i].desc}')">Edit Expense</button></li>`;
        parentnode.innerHTML = parentnode.innerHTML + childHtml;
    }
}

function deleteexpenseLOCAL(f) {
    axios.delete(`https://crudcrud.com/api/69108ceaeea44f1aa8138d7c5e9aaa28/addexpense/${f}`)
    deletefromscreen(f);
}
function deletefromscreen(f) {
    const parentnode = document.getElementById("newexpense");
    const childnode = document.getElementById(f);
    parentnode.removeChild(childnode);
}
function editexpense(a,b) {
    document.getElementById("ExpenseAmount").value=a;
    document.getElementById("Description").value=b;
    deletefromscreen(b);
}