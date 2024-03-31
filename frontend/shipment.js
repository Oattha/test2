/*const BASE_URL = 'http://localhost:8000'


window.onload = async () => {
   await loadData()
}

const loadData = async () => {
    console.log('loaded');
    const response = await axios.get(`${BASE_URL}/shipments`)
    console.log(response.data);

    const shipmentDOM = document.getElementById('shipment')

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let shipment = response.data[i]
        htmlData += `<div>
        ${shipment.id} ${shipment.product_code} ${shipment.delivery_status}
        <a href='indexshipment.html?id=${shipment.id}'><button>Edit</button></a>
        <button class ='delete' data-id='${shipment.id}'>Delete</button>
        <div>`
    }
    htmlData += '<div>'
    shipmentDOM.innerHTML = htmlData

    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/shipments/${id}`)
                loadData() //recursive function = เรียกฟังก์ชันตัวเองซ้ำ
            } catch (error) {
                console.log(error);
            }
        })
    }
}
*/