/*const BASE_URL = 'http://localhost:8000'


window.onload = async () => {
   await loadData()
}

const loadData = async () => {
    console.log('loaded');
    const response = await axios.get(`${BASE_URL}/warehouses`)
    console.log(response.data);

    const warehouseDOM = document.getElementById('warehouse')

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let warehouse = response.data[i]
        htmlData += `<div>
        ${warehouse.id} ${warehouse.warehouse_area} ${warehouse.product_storage} ${warehouse.area_arrangement}
        <a href='indexwarehouse.html?id=${warehouse.id}'><button>Edit</button></a>
        <button class ='delete' data-id='${warehouse.id}'>Delete</button>
        <div>`
    }
    htmlData += '<div>'
    warehouseDOM.innerHTML = htmlData

    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/warehouses/${id}`)
                loadData() //recursive function = เรียกฟังก์ชันตัวเองซ้ำ
            } catch (error) {
                console.log(error);
            }
        })
    }
}
*/