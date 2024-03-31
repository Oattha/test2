/*const BASE_URL = 'http://localhost:8000'


window.onload = async () => {
   await loadData()
}

const loadData = async () => {
    console.log('loaded');
    const response = await axios.get(`${BASE_URL}/operation_reports`)
    console.log(response.data);

    const operation_reportDOM = document.getElementById('operation_report')

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let operation_report = response.data[i]
        htmlData += `<div>
        ${operation_report.id} ${operation_report.product_code} ${operation_report.delivery_efficiency}
        <a href='indexoperation_report.html?id=${operation_report.id}'><button>Edit</button></a>
        <button class ='delete' data-id='${operation_report.id}'>Delete</button>
        <div>`
    }
    htmlData += '<div>'
    operation_reportDOM.innerHTML = htmlData

    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/operation_reports/${id}`)
                loadData() //recursive function = เรียกฟังก์ชันตัวเองซ้ำ
            } catch (error) {
                console.log(error);
            }
        })
    }
}
*/