const loadInitialTemplate = () => {
    const template = `
        <h1>Pozos Petroleros</h1>
        <form id='pozo-form' style='display: grid; max-width: 350px;'>
            <div>
                <label>
                    Nombre del pozo:
                </label>
                <input name="name">
            </div>
            <div>
                <label>
                    Medida PSI:
                </label>
                <input name="psi">
            </div>
            <div>
                <label>
                    Fecha de la medición:
                </label>
                <input type="date" name="fecha">
            </div>
            <button type="submit">Enviar</button>
            <br>
            <button type="button" id="get-all">Ver histograma de pozos</button>
        </form>
        <ul id="pozos-list">
            
        </ul>
        <div>
            
        </div>
    `
    // Por nasch: const body = document.getElementByTagName('body')[0];
    const body = document.querySelector('body');
    body.style.fontFamily = 'system-ui';
    body.innerHTML = template;

    document.querySelectorAll('#pozo-form > div').forEach(e => {e.style.display = 'flex'});
    document.querySelectorAll('#pozo-form > div').forEach(e => {e.style.justifyContent = 'space-between'});
    document.querySelectorAll('#pozo-form > div').forEach(e => {e.style.marginBottom = '10px'});
}

const getPozos = async () => {
    const response = await fetch('/pozos');
    const pozos = await response.json();
    const template = pozo => `
        <li>
            ${pozo.name} <button data-id='${pozo._id}'>Ver histórico</button>
        </li>
    `;

    const pozosList = document.getElementById('pozos-list');
    pozosList.innerHTML = pozos.map(pozo => template(pozo)).join('');
    pozos.forEach(pozo => {
        const pozoNode = document.querySelector(`[data-id="${pozo._id}"]`);
        pozoNode.onclick = async () => {
            /* await fetch(`/users/${pozo._id}`, {
                method: 'GET',
            }); */
            alert(`El ID del pozo seleccionado es: ${pozo._id}`);
        }
    })
}

const getAllPozos = async () => {
    const getAll =  document.getElementById('get-all');
    getAll.onclick = async () => {
        const response = await fetch('/data');
        const data = await response.json();
        const template = data => `
            Nombre: ${data.name}, PSI: ${data.psi.$numberDecimal}, Fecha: ${data.fecha}
        `;
        alert(data.map(datos => template(datos)));
    }
}

const addPozo = async () => {
    const pozoForm = document.getElementById('pozo-form');
    pozoForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(pozoForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        await fetch('/pozos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }).catch((e) => {console.log('Error: '+e)})
        pozoForm.reset();
        getPozos();
    }
}



window.onload = () => {
    loadInitialTemplate();
    getPozos();
    getAllPozos();
    addPozo();
}